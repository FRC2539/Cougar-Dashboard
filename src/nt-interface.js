import "./libraries/networktables.js"
import testData from "./test.js"

export const createNetworkTablesInterface = (
    {getNetworkTablesState, setNetworkTablesState, usingTestData, blacklist}) => {

    const keyIsBlacklisted = (key) => key in blacklist

    const populateNetworkTableFromKeys = (keys) => {
        const nt = {}

        for(const key of keys) {
            if(keyIsBlacklisted(key)) continue
            
            nt[key] = NetworkTables.getValue(key)
        }

        setNetworkTablesState(nt)
    }

    const setStateKey = (key, value) => {
        if(keyIsBlacklisted(key)) return 

        const nt = getNetworkTablesState()

        nt[key] = value

        setNetworkTablesState(nt)
    }

    const putValue = (key, value) => {
        if(keyIsBlacklisted(key)) return

        if(usingTestData) {
            setStateKey(key, value)

            return
        }

        NetworkTables.putValue(key, value) 
    }

    const initializeTestData = () => setNetworkTablesState(testData)
    
    const initializeNetworkTables = () => {
        NetworkTables.addWsConnectionListener((connected) => {
            console.log("Websocket connected: " + connected)

            NetworkTables.connect("roborio-2539-frc.local")
        }, true)

        NetworkTables.addRobotConnectionListener((connected) => {
            console.log("Robot connected: " + connected)

            if(!connected) return 

            populateNetworkTableFromKeys(NetworkTables.getKeys())
        }, true)

        NetworkTables.addGlobalListener((key, value, _) => {
            setStateKey(key, value)
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