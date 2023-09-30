import { Component } from "preact"

const maxColor = 255;
const minColor = 0;

const bound = function (number) {
    return Math.min(maxColor, Math.max(minColor, parseInt(number)))
}

export default class DriverstationLEDS extends Component {
    constructor(props) {
        super(props)

        this.ledColorKeyR = "/Robot/LEDS/r"
        this.ledColorKeyG = "/Robot/LEDS/g"
        this.ledColorKeyB = "/Robot/LEDS/b"
        this.readyToWrite = false;
        this.writer = null;
    }

    render() {
        const numbers = [this.ledColorKeyR, this.ledColorKeyG, this.ledColorKeyB].map(
            (key) => {
                return bound(this.props.nt[key])
            }
        )

        const val1 = (1 << 6) | numbers[0] >> 2
        const val2 = (2 << 6) | numbers[1] >> 2
        const val3 = (3 << 6) | numbers[2] >> 2
        const val4 = (0 << 6) | (numbers[0] & 3 << 4) | (numbers[1] & 3 << 2) | (numbers[2] & 3)

        if (this.writer != null) {
            this.writer.write([val1, val2, val3, val4])
        }

        return <button onClick={() => navigator.serial.requestPort().then(
            (port) => {
                this.ledSerialPort = port;
                port.open(9600).then(
                    (e) => {
                        this.readyToWrite = true;
                        this.writer = this.ledSerialPort.getWriter()
                    }
                )
            }
        )}>Click me</button>
    }
}