import "./libraries/networktables.js"
import { createNetworkTablesInterface } from "./nt-interface.js"
import { Component } from "preact"
import Debug from "./debug"
import Home from "./home"
import Menu from "./components/menu"

export default class App extends Component {
    constructor() {
        super()

        this.state = {
            nt: {},
            ntMap: new Map(),
            page: "home"
        }

        this.ntInterface = createNetworkTablesInterface({
            getNetworkTablesState: () => this.getNetworkTablesState(),
            setNetworkTablesState: (nt) => this.setNetworkTablesState(nt),
            getNTMapState: () => this.getNTMapState(),
            setNTMapState: (ntMap) => this.setNTMapState(ntMap),
            usingTestData: true,
            blacklist: ["LiveWindow"]
        })

        this.pages = [
            "home",
            "debug"
        ]
    }

    setPage(page) {
        if(!this.pages.includes(page)) return

        this.setState({page})
    }

    getNetworkTablesState() {
        return Object.assign({}, this.state.nt)
    }

    setNetworkTablesState(nt) {
        this.setState({nt})
    }

    getNTMapState() {
        return this.state.ntMap
    }

    setNTMapState(ntMap) {
        this.setState({ntMap})
    }

    componentDidMount() {
        this.ntInterface.initialize()
    }

    render() {
        return (
            <div className="relative">
                {
                    {
                        "home": <Home nt={this.state.nt} putValueNT={this.ntInterface.putValue} />,
                        "debug": <Debug ntMap={this.state.ntMap} nt={this.state.nt} putValueNT={this.ntInterface.putValue}/>
                    }[this.state.page]
                }
                <Menu currentPage={this.state.page} pages={this.pages} setPage={(page) => this.setPage(page)}/>
            </div>
        )
    }
}