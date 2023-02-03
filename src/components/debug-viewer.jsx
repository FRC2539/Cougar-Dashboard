import { Component } from "preact";

export default class DebugViewer extends Component {
constructor(props) {
    super(props)
}

    render() {
        return (
        <div className="col-span-3 shadow bg-orange rounded-lg p-2">
            <h2 className="font-main text-lg font-medium tracking-wider mb-0.5">Viewer</h2>
            <hr />
        </div>
        )
    }
}