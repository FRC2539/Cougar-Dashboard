import "./libraries/networktables.js"
import testData from "./test.js"

export const createNetworkTablesInterface = (
    {getNetworkTablesState, setNetworkTablesState, setNTMapState, getNTMapState, usingTestData, blacklist}) => {

    let tempNT = {}

    const keyIsBlacklisted = (key) => blacklist.includes(key)

    const setNetworkTables = (nt) => tempNT = nt
    const getNetworkTables = () => tempNT

    const populateNetworkTableFromKeys = (keys) => {
        const nt = {}

        for(const key of keys) {
            const {header, _} = getHeader(key)

            if(keyIsBlacklisted(header)) continue
            
            nt[key] = NetworkTables.getValue(key)
        }

        setNetworkTables(nt)
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

            if(keyIsBlacklisted(header)) continue

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
        const nt = getNetworkTables()

        nt[key] = value

        setNetworkTables(nt)
    }

    const setKey = (key, value) => {
        const {header, _} = getHeader(key)

        if(keyIsBlacklisted(header)) return 

        setStateKey(key, value)
    }

    const putValue = (key, value) => {
        const {header, _} = getHeader(key)

        if(keyIsBlacklisted(header)) return 

        if(usingTestData) {
            setKey(key, value)

            return
        }

        NetworkTables.putValue(key, value) 
    }

    const initializeTestData = () => {
        setNetworkTables(testData)

        const testMap = createTestNTMap(testData)

        setNTMapState(testMap)

        // Mimic the continuous updates from live data
        setInterval(() => {
            setNetworkTablesState(tempNT)
        }, 250) 
    }
    
    const keys = () => NetworkTables.getKeys()
    
    const initializeNetworkTables = () => {
        NetworkTables.addWsConnectionListener((connected) => {
            console.log("Websocket connected: " + connected)

            // const teamNumber = ipcRenderer.sendSync("team-number")
            // if(!localStorage.getItem("team")) localStorage.setItem("team", "2539")

            // const teamNumber = localStorage.getItem("team")

            NetworkTables.connect("")
            // NetworkTables.connect(`roborio-${teamNumber}-frc.local`)
        }, true)

        NetworkTables.addRobotConnectionListener((connected) => {
            console.log("Robot connected: " + connected)

            if(!connected) return

            populateNetworkTableFromKeys(keys())
            populateNTMapFromKeys(keys())
        }, true)

        // Update the local network table every time the network tables changes
        NetworkTables.addGlobalListener((key, value) => {
            setKey(key, value)
        }, true)
        
        // Update the stateful network tables object every 250 ms
        setInterval(() => {
            const lastState = getNetworkTablesState()

            setNetworkTablesState(tempNT)

            // Update the debugging page map if keys are added or removed
            if(Object.keys(lastState).length != Object.keys(tempNT).length) {
                populateNTMapFromKeys(keys())
            }
        }, 250) 
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
        return JSON.stringify(getNetworkTables())
    }
    
    return { initialize, putValue, useTestData, useNetworkTables, getJSON }
}