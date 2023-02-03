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
        <div className="col-1 shadow bg-orange rounded-lg p-2" style={"max-height: 95vh;"}>
            <h2 className="font-main text-lg font-medium tracking-wider mb-0.5">Debug 2.0</h2>
            <hr />
            <div className="overflow-x-hidden overflow-y-auto relative" style={"height: 90%;"}>
                {html}
            </div>
        </div>
        )
    }
}
