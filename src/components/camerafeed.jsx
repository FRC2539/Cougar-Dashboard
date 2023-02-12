import { Component } from "preact"

export default class CameraFeed extends Component {
    constructor(props) {
        super(props)

        this.ip = this.props.cameraIP
    }

    render() {
        return (
            <div className="h-full w-full relative">
                <img className="max-h-full h-full m-auto" src={this.ip} />
            </div>
        )
    }
}