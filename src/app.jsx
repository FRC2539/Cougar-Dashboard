import { createNetworkTablesInterface } from "./nt-interface.js"
import { Component } from "preact"
import Debug from "./debug"
import Home from "./home"
import Console from "./console"
import Field from "./field"
import Menu from "./components/menu"
import Controller from "./controller"

export default class App extends Component {
    constructor() {
        super()

        this.state = {
            nt: {},
            ntMap: new Map(),
            page: "home"
        }

        this.ntInterface = createNetworkTablesInterface({
            setTableAndMapState: (nt, ntMap) => this.setTableAndMapState(nt, ntMap),
            blacklist: ["LiveWindow"]
        })

        this.pages = [
            "home",
            "debug",
            "console",
            "field",
            "controller"
        ]
    }

    setPage(page) {
        if(!this.pages.includes(page)) return

        this.setState({page})
    }

    setTableAndMapState(nt, ntMap) {
        this.setState({nt, ntMap})
    }

    componentDidMount() {
        this.ntInterface.initialize()
    }

    render() {
        return (
            <span>
                {
                    {
                        "home": <Home nt={this.state.nt} putValueNT={this.ntInterface.putValue} />,
                        "debug": <Debug ntMap={this.state.ntMap} nt={this.state.nt} putValueNT={this.ntInterface.putValue}/>,
                        "console": <Console nt={this.state.nt}/>,
                        "field": <Field nt={this.state.nt}/>,
                        "controller": <Controller nt={this.state.nt}/>
                    }[this.state.page]
                }
                <Menu currentPage={this.state.page} pages={this.pages} setPage={(page) => this.setPage(page)}/>
            </span>
        )
    }
}