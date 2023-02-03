import { Component } from "preact";
import DebugHeader from "./debug-header";

export default class DebugSidebar extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const html = [];
        for (const [key, value] of this.props.ntMap) {
            html.push(
                <DebugHeader ntMap={this.props.ntMap} nt={this.props.nt} title={key} data={value} putValueNt={this.props.putValueNt} />
            )
        }

        return (
        <div className="col-1 shadow h-full max-h-screen bg-orange rounded-lg p-2">
            <h2 className="font-main text-lg font-medium tracking-wider mb-0.5">Debug 2.0</h2>
            <hr />
            <div className="overflow-auto h-full max-h-full">
                {html}
            </div>
        </div>
        )
    }
}
