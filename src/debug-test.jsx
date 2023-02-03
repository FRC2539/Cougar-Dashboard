import { Component } from "preact";
import DebugHeader from "./components/debug-header";
import DebugSidebar from "./components/debug-sidebar";
import DebugViewer from "./components/debug-viewer";

export default class DebugTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
          };
    }

    render() {
        return (
            <div className="grid grid-cols-4 gap-2 w-full max-h-full h-screen bg-gray text-black p-4">
                <DebugSidebar ntMap={this.props.ntMap} nt={this.props.nt} putValueNt={this.props.putValueNt}/>
                <DebugViewer />
                </div>
        )
    }
}