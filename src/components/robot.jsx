import { Component } from "preact" 

import LimelightOffset from "./robot/limelightOffset"
export default class Robot extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="shadow row-span-1 w-10/12 col-span-4 bg-orange rounded-lg p-2 mt-3 mb-3 grid grid-cols-1">
                <LimelightOffset nt={this.props.nt}/>
            </div>
        )
    }
}