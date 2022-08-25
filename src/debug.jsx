import { Component } from "preact"
import DebugHeader from "./components/debug-header"

export default class Debug extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: "",
        }
    }

    render() {
        const html = this.dataToHTML(this.props.ntMap)
        
        return (
            <div className="bg-gray h-full py-3 px-4">
                <div className="h-full overflow-y-auto overflow-x-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2">
                    {html}
                </div>
            </div>
        )
    }

    dataToHTML(data) {
        const html = []

        for(const [key, value] of data) {
            html.push(<DebugHeader ntMap={this.props.ntMap} nt={this.props.nt} title={key} data={value} putValueNT={this.props.putValueNT} />)
        }

        return html
    } 
}