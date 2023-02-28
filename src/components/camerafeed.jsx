import { Component } from "preact"

export default class CameraFeed extends Component {
    constructor(props) {
        super(props)

        this.ip = this.props.cameraIP

        this.isThumbnail = this.props.isThumbnail
    }

    render() {
        let className = "max-h-full m-auto " + (this.isThumbnail ? "" : "h-full")

        return (
            <div className="h-full w-full relative">
                <img className={className} src={this.ip} />
            </div>
        )
    }
}