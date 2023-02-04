import { Component } from "preact";
import DebugHeader from "./debug-header";

export default class DebugSidebar extends Component {
    constructor(props) {
        super(props)

    }

    useSimpleListView(key, value, html) {
        const keys = []

        for (const [innerKey, _] of value) {
            keys.push(<p className="mb-1 w-full flex flex-row justify-between flex-wrap cursor-pointer">- {innerKey}</p>)
        }

        html.push(
            <div className="bg-orange p-2 mx-2 shadow rounded-lg">
                <p className="text-xl"><strong>{key}</strong></p>
                {keys}
            </div>
        )
    }

    useDebugListView(key, value, html) {
        html.push(
            <DebugHeader ntMap={this.props.ntMap} nt={this.props.nt} title={key} data={value} putValueNt={this.props.putValueNt} />
        )
    }

    render() {
        const html = []

        for (const [key, value] of this.props.ntMap) {
            this.useSimpleListView(key, value, html)
        }

        return (
        <div className="col-1 shadow bg-orange rounded-lg p-2" style={"max-height: 95vh;"}>
            <h2 className="font-main text-lg font-medium tracking-wider mb-0.5">Debug 2.0</h2>
            <hr />
            <div className="overflow-x-hidden overflow-y-auto relative flex flex-col gap-1 mt-1" style={"height: 90%;"}>
                {html}
            </div>
        </div>
        )
    }
}
