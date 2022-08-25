import { Component } from "preact" 

import LimelightOffset from "./robot/limelightOffset"
import ShootingGraph from "./robot/shootingGraph"

export default class Robot extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="shadow row-span-1 w-11/12 col-span-4 bg-orange rounded-lg p-1 mt-3 mb-3 grid grid-cols-1">
                <ShootingGraph nt={this.props.nt}/>
            </div>
        )
    }
}