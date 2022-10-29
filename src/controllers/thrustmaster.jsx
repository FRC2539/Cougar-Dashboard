import { Component } from "preact";
import splitNewLines from "./split-text";

const POSITIONS = {
    trigger: {x: 779, y: 196},
    bottomThumb: {x: 300, y: 158},
    leftThumb: {x: 300, y: 90},
    rightThumb: {x: 779, y: 110},
    leftTopLeft: {x: 21, y: 210},
    leftTopMiddle: {x: 21, y: 155},
    leftTopRight: {x: 21, y: 98},
    leftBottomRight: {x: 10, y: 482},
    leftBottomMiddle: {x: 10, y: 425},
    leftBottomLeft: {x: 10, y: 368},
    rightTopRight: {x: 779, y: 506},
    rightTopMiddle: {x: 779, y: 448},
    rightTopLeft: {x: 779, y: 388},
    rightBottomLeft: {x: 779, y: 565},
    rightBottomMiddle: {x: 779, y: 625},
    rightBottomRight: {x: 779, y: 685},
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
    rightTopLeft: "right top middle",
    rightBottomLeft: "right bottom left",
    rightBottomMiddle: "right bottom middle",
    rightBottomRight: "right bottom right"
}

export default class ThrustmasterJoystickController extends Component {
constructor(props) {
    super(props)
}

    
    render () {
        let boxes = []
        for (let [key, value] of Object.entries(this.props.data)) {
            if (key === 'type') continue;
            let cordinates =  POSITIONS[key]
            boxes.push(splitNewLines(value, cordinates.x, cordinates.y))
        }
        return (
        <svg viewBox="0 0 960 720" className="bg-orange rounded-lg flex-initial p-1"> 
            <image href="/src/assets/thrustmaster-joystick.png"/>
            { boxes }
        </svg>
        )
    }
}