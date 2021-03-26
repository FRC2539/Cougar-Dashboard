import { Component } from "preact" 
// import createSketch from "./robot/createSketch"
import RobotSketch from "./robot/robotSketch"
export default class Robot extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="shadow row-span-3 col-span-6 bg-orange rounded-lg p-1 mt-3 mb-3 grid grid-cols-2">
                <RobotSketch nt={this.props.nt}/>
                <div className="col-span-1 bg-black"></div>
            </div>
        )
    }
}