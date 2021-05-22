import "./libraries/networktables.js"
import testData from "./test.js"

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
            if(keyIsBlacklisted(key)) continue

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
    
    const keys = () => NetworkTables.getKeys()
    
    const initializeNetworkTables = () => {
        NetworkTables.addWsConnectionListener((connected) => {
            console.log("Websocket connected: " + connected)

            NetworkTables.connect("roborio-2539-frc.local")
        }, true)

        NetworkTables.addRobotConnectionListener((connected) => {
            console.log("Robot connected: " + connected)

            if(!connected) return

            populateNetworkTableFromKeys(keys())
            populateNTMapFromKeys(keys())
        }, true)

        // Synchronously update the local network tables data
        // Note: The rate of async updates from the robot causes a memory leak
        setInterval(() => {
            populateNetworkTableFromKeys(keys())
        }, 500) // Update every 100 milliseconds

        // Next time
        // Fix the inputs on debug page
        // Play around with the populate nt method
            // That means seeing if it can run faster, etc, etc
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