import { Component } from "preact"
import DebugHeader from "./components/debug-header"

export default class Debug extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: "",
            data: new Map() // Header => Map(key => value)
                            // E.g. Autonomous => Map("selectedAuto" => "example")
        }
    }

    render() {
        // Convert the network tables data to a header-based map
        const data = this.createDataMap()

        const html = this.dataToHTML(data)
        
        return (
            <div className="bg-gray h-full py-3">
                <div className="h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2">
                    {html}
                </div>
            </div>
        )
    }

    dataToHTML(data) {
        const html = []

        for(const [key, value] of data) {
            html.push(<DebugHeader title={key} data={value} putValueNT={this.props.putValueNT} />)
        }

        return html
    } 

    createDataMap() {
        const data = new Map()

        for(const [key, value] of Object.entries(this.props.nt)) {
            const {header, subkey} = this.getHeader(key)

            if(!data.has(header)) data.set(header, new Map())

            const keysMap = data.get(header)

            keysMap.set(subkey, value)
        }

        return data
    }

    getHeader(key) {
        const path = key.split("/")
        const header = path[1]
        const subkey = key.slice(header.length + 2) // `2` here accounts for the slashes

        return {header, subkey}
    }
}