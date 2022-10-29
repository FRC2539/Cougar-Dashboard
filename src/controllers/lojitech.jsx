import { Component } from "preact";
import splitNewLines from "./split-text";

const POSITIONS = {
    A: {x: 788, y: 420},
    B: {x: 762, y: 321},
    X: {x: 763, y: 257},
    Y: {x: 787, y: 193},
    leftBumper: {x: 313, y: 25},
    rightBumper: {x: 503, y: 25},
    leftTrigger: {x: 25, y: 50},
    rightTrigger: {x: 770, y: 52},
    back: {x: 305, y: 90},
    start: {x: 503, y: 90},
    leftJoystick: {x: 278, y: 603},
    rightJoystick: {x: 503, y: 595},
    dPadUp: {x: 48, y: 187},
    dPadRight: {x: 25, y: 251},
    dPadDown: {x: 48, y: 415},
    dPadLeft: {x: 25, y: 317},
}

export const DefaultLogitechControllerData = {
    A: "A",
    B: "B",
    X: "X",
    Y: "Y",
    leftBumper: "left bumper",
    rightBumper: "right bumper",
    leftTrigger: "left trigger",
    rightTrigger: "right trigger",
    back: "back",
    start: "start",
    leftJoystick: "left joystick",
    rightJoystick: "right joystick",
    dPadUp: "dpad up",
    dPadRight: "dpad right",
    dPadDown: "dpad down",
    dPadLeft: "dpad left",
}

export default class LogitechController extends Component {
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
            <image href="/src/assets/logitech-gamepad.png"/>
            { boxes }
        </svg>
        )
    }
}