import { Component } from "preact" 

import RobotSketch from "./robot/robotSketch"
import CompassSketch from "./robot/compassSketch"
import LimelightOffset from "./robot/limelightOffset"
export default class Robot extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="shadow row-span-2 col-span-4 bg-orange rounded-lg p-2 mt-3 mb-3 grid grid-cols-3">
                <RobotSketch nt={this.props.nt}/>
                <CompassSketch nt={this.props.nt}/>
                <LimelightOffset nt={this.props.nt}/>
            </div>
        )
    }
}