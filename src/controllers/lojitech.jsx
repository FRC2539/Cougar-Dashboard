import { Component } from "preact";
import splitNewLines from "./split-text";

const POSITIONS = {
    A: {x: 788, y: 426},
    B: {x: 762, y: 327},
    X: {x: 763, y: 263},
    Y: {x: 787, y: 199},
    leftBumper: {x: 313, y: 31},
    rightBumper: {x: 503, y: 31},
    leftTrigger: {x: 25, y: 56},
    rightTrigger: {x: 770, y: 58},
    back: {x: 305, y: 98},
    start: {x: 503, y: 98},
    leftJoystick: {x: 278, y: 609},
    rightJoystick: {x: 503, y: 602},
    dPadUp: {x: 48, y: 193},
    dPadRight: {x: 25, y: 257},
    dPadDown: {x: 48, y: 421},
    dPadLeft: {x: 25, y: 323},
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
    type: "LogitechController"
}

export default class LogitechController extends Component {
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
            <image href="/src/assets/logitech-gamepad.png"/>
            { boxes }
        </svg>
        )
    }
}