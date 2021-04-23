import "./libraries/networktables.js"
import testData from "./test.js"
import { Component } from "preact"
import Debug from "./debug"
import Home from "./home"

export default class App extends Component {
    constructor() {
        super()

        this.state = {nt: {}, ntHeadings: new Set(), useTestData: true, blackList: ["LiveWindow"]}
    }

    populateNetworkTablesMap(keys) {
        let nt = {}

        for(const key of keys) {
            if(!this.keyIsBlackListed(key)) {
                nt[key] = NetworkTables.getValue(key)
            }
        }

        this.setState({nt})

        this.getHeadingsFromNT()
    }

    putValueNT(key, value) {
        if(!this.state.useTestData) NetworkTables.putValue(key, value)

        if(this.state.useTestData) {
            const _nt = this.state.nt

            _nt[key] = value

            this.setState({nt: _nt})
        }
    }

    // getHeadingsFromNT() {
    //     let ntHeadings = new Set()

    //     for(const [key, _] of Object.entries(this.state.nt)) {
    //         if(!ntHeadings.has(this.getHeading(key))) {
    //             ntHeadings.add(this.getHeading(key))
    //         }
    //     }

    //     this.setState({ntHeadings})
    // }

    // getHeading(key) {
    //     let path = key.split("/")
    //     return path[1]
    // }

    // splitKeyToPath(key) {
    //     let path = key.split("/")
    //     return path.slice(1, path.length)
    // }

    changeMapKey(key, value) {
        if(!this.keyIsBlackListed(key)) {
            // Add the key to the map or change the value.
            let nt = Object.assign({}, this.state.nt)

            nt[key] = value

            this.setState({nt})
        }

        this.getHeadingsFromNT()
    }

    saveDataToJSON() {
        console.log(JSON.stringify(this.state.nt))
    }

    keyIsBlackListed(key) {
        for(const s of this.state.blackList) {
            if(key.includes(s)) return true
        }

        return false
    }

    componentDidMount() {
        if(!this.state.useTestData) {
            NetworkTables.addWsConnectionListener((connected) => {
                console.log("Websocket connected: " + connected);
                NetworkTables.connect("roborio-2539-frc.local");
            }, true);

            NetworkTables.addRobotConnectionListener((connected) => {
                console.log("Robot connected: " + connected);
                if(connected){
                    this.populateNetworkTablesMap(NetworkTables.getKeys());
                }
            }, true);

            NetworkTables.addGlobalListener((key, value, isNew) => {
                this.changeMapKey(key, value);
            }, true);
        } else {
            this.setState({nt: testData})
        }
    }

    render() {
        return (
            <Home nt={this.state.nt} putValueNT={this.putValueNT.bind(this)} />
            // <Debug nt={this.state.nt} ntHeadings={this.state.ntHeadings}/>
        )
    }
}