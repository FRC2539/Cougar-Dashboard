import { Component } from "preact";
import DebugHeader from "./components/debug-header";
import DebugSidebar from "./components/debug-sidebar";

export default class DebugTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
          };
    }

    render() {
        return (
            <div className="grid grid-cols-2 w-full max-h-full h-full bg-gray text-black p-4">
                <div className="col-1 shadow bg-orange rounded-lg p-2">
                    <h2 className="font-main text-lg font-medium tracking-wider mb-0.5">Debug  2.0</h2>
                    <hr />
                <div className="h-24 overflow-y-scroll">
                    
                </div>
                </div>
            </div>
        )
    }  
}