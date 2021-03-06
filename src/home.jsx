import { Component } from "preact"

import CameraFeed from "./components/cameras"
import Mechanisms from "./components/mechanisms"
import Messages from "./components/messages"
import Robot from "./components/robot"
import Autos from "./components/autos"
import Climber from "./components/climber"
export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="grid grid-cols-3 w-full h-full bg-gray text-black">
                <div className="max-h-full col-span-2 grid grid-rows-6 grid-cols-6 p-3">
                    <Messages nt={this.props.nt} />
                    <Mechanisms nt={this.props.nt} />
                    <Climber nt={this.props.nt} />
                    {/* <div className="mt-1 col-span-2 row-span-2 bg-team-logo bg-center bg-contain bg-no-repeat"></div> */}
                    <Robot nt={this.props.nt} /> 
                    <Autos nt={this.props.nt} putValueNT={this.props.putValueNT}/>
                </div>
                <div className="col-span-1 flex flex-col justify-between p-3">
                    <CameraFeed nt={this.props.nt}/>
                </div>
            </div>
        )
    }
}