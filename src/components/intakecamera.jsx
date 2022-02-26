import { Component } from "preact"

export default class IntakeCameraFeed extends Component {
    constructor(props) {
        super(props)

        this.webcamKey = "/ML/feed"
    }

    render() {
        return (
            <div className="h-full w-full relative">
                <img id="webcam-feed" className="max-h-full h-full m-auto" src={this.props.nt[this.webcamKey]} />
            </div>
        )
    }
}