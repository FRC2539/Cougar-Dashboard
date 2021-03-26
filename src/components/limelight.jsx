import { Component } from "preact"

export default class Limelight extends Component {
    constructor(props) {
        super(props)

        this.limelightKey = "/SmartDashboard/limelight_Stream"
    }

    render() {
        return (
            <div className="h-3/4 w-full">
                    {/* <img id="limelight-feed" className="" src={this.props.nt[this.limelightKey]} /> */}
            </div>
        )
    }
}