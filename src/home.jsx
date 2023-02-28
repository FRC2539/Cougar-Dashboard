import { Component } from "preact"

import CameraFeed from "./components/camerafeed"
import Mechanisms from "./components/mechanisms"
import Robot from "./components/robot"
import ConfigurableAutos from "./components/configurable-autos"

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="grid grid-cols-12 w-full max-h-full h-full bg-gray text-black">
                <div className="max-h-full col-span-3 grid grid-rows-8 grid-cols-1 p-3">
                    <Mechanisms nt={this.props.nt} />
                    <ConfigurableAutos nt={this.props.nt} ntMap={this.props.ntMap} putValueNT={this.props.putValueNT}/>
                </div>
                <div className="col-span-6 flex flex-row justify-around p-3">
                    <CameraFeed cameraIP={"http://10.25.39.11:5800"} isThumbnail={false}/>
                </div>
                <div className="col-span-3 flex flex-col justify-between p-3">
                    <CameraFeed cameraIP={"http://photonvision.local:1182/stream.mjpg"} isThumbnail={true}/>
                    <Robot nt={this.props.nt} /> 
                </div>
            </div>
        )
    }
}