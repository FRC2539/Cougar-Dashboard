import { NT4_Client } from "./libraries/nt4.ts"

export const createNetworkTablesInterface = (
    {setTableAndMapState, blacklist}) => {

    let tempNT = {}
    let tempMap = new Map()

    let host = ""

    let client = null

    const resetInternalState = () => {
        tempNT = {}
        tempMap = new Map()
    }

    const connect = () => {
        client?.disconnect()

        client = new NT4_Client(host, "Cougar-Dashboard", 
            (topic) => {
                // Topic Announce
                client.publishTopic(topic.name, topic.type)
            },
            (topic) => {
                // Topic Unannounce
                client.unpublishTopic(topic.name)
            },
            (topic, timestamp_us, value) => {
                // New Data
                setKey(topic.name, value)
                setNTMapKey(topic.name, value)
            },
            () => {
                // On Connect
                window.api.setWindowTitle(`Connected to ${host}`)

                resetInternalState()
            },
            () => {
                // On Disconnect
                window.api.setWindowTitle(`Waiting for connection to ${host}`)
            }
        )

        client.connect()
        
        client.subscribe(["/"], true, true, 0)
    }

    const convertTeamNumberToIP = (teamNumber) => {
        const teamNumberString = `${teamNumber}`.padStart(4, "0")

        const firstNumber = parseInt(teamNumberString.substring(0, 2))
        const secondNumber = parseInt(teamNumberString.substring(2))

        return `10.${firstNumber}.${secondNumber}.2`
    }

    const initialize = async () => {
        //const teamNumber = await window.api.getTeamNumber()
        const teamNumber = 9539

        if (host === "") host = convertTeamNumberToIP(teamNumber)

        connect()

        window.api.handleConnect(async (mode) => {
            // const teamNumber = await window.api.getTeamNumber()
            const teamNumber = 9539

            switch (mode) {
                case "robot":
                    host = convertTeamNumberToIP(teamNumber)   
                    break;
                case "practice":
                    host = `roborio-${teamNumber}-frc.local`
                    break;
                case "simulation":
                    host = "localhost"
                    break;
            }

            connect()
        })

        setInterval(() => {
            setTableAndMapState(tempNT, tempMap)
        }, 100)
    }

    const keyIsBlacklisted = (key) => blacklist.includes(key)

    const getNetworkTables = () => tempNT

    const getHeader = (key) => {
        const path = key.split("/")
        const header = path[1]
        const subkey = key.slice(header.length + 2) // `2` here accounts for the slashes

        return {header, subkey}
    }

    const setNTMapKey = (key, value) => {
        const data = tempMap

        const {header, subkey} = getHeader(key)

        if(keyIsBlacklisted(header)) return 

        if(!data.has(header)) data.set(header, new Map())

        const keysMap = data.get(header)

        keysMap.set(subkey, value)
    }

    const setKey = (key, value) => {
        const {header, _} = getHeader(key)

        if(keyIsBlacklisted(header)) return 

        const nt = getNetworkTables()

        nt[key] = value
    }

    const putValue = (key, value) => {
        const {header, _} = getHeader(key)

        if(keyIsBlacklisted(header)) return 

        client.addSample(key, value)
        setKey(key, value)
    }
    
    return { initialize, putValue }
}