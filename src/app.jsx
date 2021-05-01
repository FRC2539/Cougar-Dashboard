import "./libraries/networktables.js"
import { createNetworkTablesInterface } from "./nt-interface.js"
import testData from "./test.js"
import { Component } from "preact"
import Debug from "./debug"
import Home from "./home"

export default class App extends Component {
    constructor() {
        super()

        this.state = {nt: {}}

        this.ntInterface = createNetworkTablesInterface({
            getNetworkTablesState: () => this.getNetworkTablesState(),
            setNetworkTablesState: (nt) => this.setNetworkTablesState(nt),
            usingTestData: true,
            blacklist: ["LiveWindow"]
        })
    }

    getNetworkTablesState() {
        return Object.assign({}, this.state.nt)
    }

    setNetworkTablesState(nt) {
        this.setState({nt})
    }

    componentDidMount() {
        this.ntInterface.initialize()
    }

    render() {
        return (
            // <Home nt={this.state.nt} putValueNT={this.ntInterface.putValue} />
            <Debug nt={this.state.nt}/>
        )
    }
}