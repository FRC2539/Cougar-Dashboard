import "./libraries/networktables.js"
import testData from "./test.js"

// Memory problem hypotheses
// It could be that I am using a map, and the map is trying to rerender stuff and its mutable so it is passed around everywhere.
// Good to test if only creating an initial map is a better idea
// Fix that next time.

// Shawn's suggestion
// Hinder the speed of updates from the limelight
// It goes too fast
// Like slow it down
// The nt update event is called really fast, so just limit it to milliseconds.

export const createNetworkTablesInterface = (
    {getNetworkTablesState, setNetworkTablesState, setNTMapState, getNTMapState, usingTestData, blacklist}) => {

    const keyIsBlacklisted = (key) => key in blacklist

    const populateNetworkTableFromKeys = (keys) => {
        const nt = {}

        for(const key of keys) {
            if(keyIsBlacklisted(key)) continue
            
            nt[key] = NetworkTables.getValue(key)
        }

        setNetworkTablesState(nt)
    }

    const getHeader = (key) => {
        const path = key.split("/")
        const header = path[1]
        const subkey = key.slice(header.length + 2) // `2` here accounts for the slashes

        return {header, subkey}
    }

    const populateNTMapFromKeys = (keys) => {
        const data = new Map()

        for(const key of keys) {
            const {header, subkey} = getHeader(key)

            if(!data.has(header)) data.set(header, new Map())

            const keysMap = data.get(header)

            const keyValue = NetworkTables.getValue(key)

            keysMap.set(subkey, keyValue)
        }

        setNTMapState(data)
    }

    const createTestNTMap = (testData) => {
        const data = new Map()

        for(const [key, value] of Object.entries(testData)) {
            const {header, subkey} = getHeader(key)

            if(!data.has(header)) data.set(header, new Map())

            const keysMap = data.get(header)

            keysMap.set(subkey, value)
        }

        return data
    }

    const setNTMapKey = (key, value) => {
        if(keyIsBlacklisted(key)) return 

        const data = getNTMapState()

        const {header, subkey} = getHeader(key)

        if(!data.has(header)) data.set(header, new Map())

        const keysMap = data.get(header)

        keysMap.set(subkey, value)

        setNTMapState(data)
    }

    const setStateKey = (key, value) => {
        if(keyIsBlacklisted(key)) return 

        const nt = getNetworkTablesState()

        nt[key] = value

        setNetworkTablesState(nt)
    }

    const setKey = (key, value) => {
        setNTMapKey(key, value)
        setStateKey(key, value)
    }

    const putValue = (key, value) => {
        if(keyIsBlacklisted(key)) return

        if(usingTestData) {
            setKey(key, value)

            return
        }

        NetworkTables.putValue(key, value) 

    }

    const initializeTestData = () => {
        setNetworkTablesState(testData)

        const testMap = createTestNTMap(testData)

        setNTMapState(testMap)
    }
    
    const initializeNetworkTables = () => {
        NetworkTables.addWsConnectionListener((connected) => {
            console.log("Websocket connected: " + connected)

            NetworkTables.connect("roborio-2539-frc.local")
        }, true)

        NetworkTables.addRobotConnectionListener((connected) => {
            console.log("Robot connected: " + connected)

            if(!connected) return 

            const keys = NetworkTables.getKeys()

            populateNetworkTableFromKeys(keys)
            populateNTMapFromKeys(keys)
        }, true)

        NetworkTables.addGlobalListener((key, value, _) => {
            setKey(key, value)
        }, true)
    }

    const useNetworkTables = () => {
        usingTestData = false
        
        initializeNetworkTables()
    }

    const useTestData = () => {
        usingTestData = true

        initializeTestData()
    }

    const initialize = () => {
        if(usingTestData) initializeTestData()
        else initializeNetworkTables()
    }

    const getJSON = () => {
        return JSON.stringify(getNetworkTablesState())
    }
    
    return { initialize, putValue, useTestData, useNetworkTables, getJSON }
}