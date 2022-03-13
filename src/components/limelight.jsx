import { Component } from "preact"

export default class LimelightFeed extends Component {
    constructor(props) {
        super(props)

        this.limelightKey = "/SmartDashboard/limelight_Stream"
        this.limelightPipeline = "/limelight/pipeline"
    }

    render() {
        return (
            <div className="h-full w-10/12 relative">
                <img id="limelight-feed" className="" src={this.props.nt[this.limelightKey]} />
                <div className="grid grid-cols-2 gap-2 mt-2 justify-center items-center">
                    <a onClick={() => this.props.putValueNT(this.limelightPipeline, 0)} className={"grid text-center text-medium text-orange h-10 rounded-l-lg border-black border bg-black cursor-pointer flex justify-center items-center "}>Driving</a>
                    <a onClick={() => this.props.putValueNT(this.limelightPipeline, 1)} className={"grid text-center text-medium text-orange h-10 rounded-r-lg border-black border bg-black cursor-pointer flex justify-center items-center"}>Aiming</a>
                </div>
            </div>
        )
    }
}