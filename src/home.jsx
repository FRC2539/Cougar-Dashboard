import { Component } from "preact"

import LimelightFeed from "./components/limelight"
import IntakeCameraFeed from "./components/intakecamera"
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
            <div className="grid grid-cols-12 w-full max-h-full h-full bg-gray text-black">
                <div className="max-h-full col-span-3 grid grid-rows-8 grid-cols-1 p-3">
                    <Mechanisms nt={this.props.nt} />
                    <Autos nt={this.props.nt} putValueNT={this.props.putValueNT}/>
                </div>
                <div className="col-span-6 flex flex-row justify-around p-3">
                    <IntakeCameraFeed nt={this.props.nt}/>
                </div>
                <div className="col-span-3 flex flex-col justify-between p-3">
                    <LimelightFeed nt={this.props.nt} putValueNT={this.props.putValueNT}/>
                    <Robot nt={this.props.nt} /> 
                </div>
            </div>
        )
    }
}