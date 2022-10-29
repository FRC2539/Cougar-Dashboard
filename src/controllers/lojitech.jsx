import { Component } from "preact";

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

    splitNewLines (text, X, Y) {
        const splitText = text.match(/.{1,18}/g)
        let output = []
        let nextY = Y

        for (let segment of splitText) {
            output.push(<text x={X} y={nextY}>{segment}</text>)
            nextY = nextY + 12
        }
        return output
    }

constructor(props) {
    super(props)
}

    
    render () {
        let boxes = []
        for (let [key, value] of Object.entries(this.props.data)) {
            if (key === 'type') continue;
            let cordinates =  POSITIONS[key]
            boxes.push(this.splitNewLines(value, cordinates.x, cordinates.y))
        }
        return (
        <svg preserveAspectRatio="xMidYMid meet" width="960" height="720" viewBox="0 0 960 720"> 
            <image href="/src/assets/logitech-gamepad.png"/>
            { boxes }
        </svg>
        )
    }
}