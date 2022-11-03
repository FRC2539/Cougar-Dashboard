import { Component } from "preact";
import splitNewLines from "./split-text";

const POSITIONS = {
    trigger: {x: 779, y: 204},
    bottomThumb: {x: 300, y: 166},
    leftThumb: {x: 300, y: 98},
    rightThumb: {x: 779, y: 116},
    leftTopLeft: {x: 21, y: 216},
    leftTopMiddle: {x: 21, y: 161},
    leftTopRight: {x: 21, y: 104},
    leftBottomRight: {x: 10, y: 488},
    leftBottomMiddle: {x: 10, y: 434},
    leftBottomLeft: {x: 10, y: 378},
    rightTopRight: {x: 779, y: 513},
    rightTopMiddle: {x: 779, y: 456},
    rightTopLeft: {x: 779, y: 395},
    rightBottomLeft: {x: 779, y: 572},
    rightBottomMiddle: {x: 779, y: 634},
    rightBottomRight: {x: 779, y: 690},
}

export const DefaultThrustmasterJoystickControllerData = {
    trigger: "trigger",
    bottomThumb: "bottom thumb",
    leftThumb: "left thumb",
    rightThumb: "right thumb",
    leftTopLeft: "left top left",
    leftTopMiddle: "left top middle",
    leftTopRight: "left top right",
    leftBottomLeft: "left bottom left",
    leftBottomMiddle: "left bottom middle",
    leftBottomRight: "left bottom right",
    rightTopRight: "right top right",
    rightTopMiddle: "right top middle",
    rightTopLeft: "right top left",
    rightBottomLeft: "right bottom left",
    rightBottomMiddle: "right bottom middle",
    rightBottomRight: "right bottom right",
    type: "ThrustmasterJoystick"
}

export default class ThrustmasterJoystickController extends Component {
constructor(props) {
    super(props)
}

    
    render () {
        let boxes = []
        for (let [key, value] of Object.entries(this.props.data)) {
            let cordinates =  POSITIONS[key]
            if (!cordinates) continue;
            boxes.push(splitNewLines(value, cordinates.x, cordinates.y))
        }
        return (
        <svg viewBox="0 0 960 720" className="bg-orange rounded-lg flex-initial p-1"> 
            <image href="/thrustmaster-joystick.png"/>
            { boxes }
        </svg>
        )
    }
}