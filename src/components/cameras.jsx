import { Component } from "preact"

export default class CameraFeed extends Component {
    constructor(props) {
        super(props)

        this.limelightKey = "/SmartDashboard/limelight_Stream"
        this.webcamKey = "/CameraServer/camera_feed"

        this.feeds = ["limelight", "webcam"]

        this.state = {
            feed: 0
        }
    }

    switchFeed(increment = true) {
        let newFeed = this.state.feed + (increment ? 1 : -1)

        if (newFeed >= this.feeds.length) newFeed = 0
        if (newFeed < 0) newFeed = this.feeds.length - 1
        
        this.setState({feed: newFeed})
    }

    render() {
        return (
            <div className="h-3/4 w-10/12 relative">
                <button onClick={() => this.switchFeed()} className="absolute p-0.5 bg-orange m-1 z-10">Next</button>
                <img id="limelight-feed" className="" style={"display:" + ("limelight" == this.feeds[this.state.feed] ? "block;" : "none;")} src={this.props.nt[this.limelightKey]} />
                <img id="webcam-feed" className="w-10/12 transform rotate-180" style={"display:" + ("limelight" == this.feeds[this.state.feed] ? "none;" : "block;")} src={this.props.nt[this.webcamKey]} />
            </div>
        )
    }
}