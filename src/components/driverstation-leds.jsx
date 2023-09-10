import { Component } from "preact"

const maxColor = 255;
const minColor = 0;

const bound = function (number) {
    return Math.min(maxColor, Math.max(minColor, parseInt(number)))
}

export default class Pressure extends Component {
    constructor(props) {
        super(props)

        this.ledColorKeyR = "/Robot/LEDS/r"
        this.ledColorKeyG = "/Robot/LEDS/g"
        this.ledColorKeyB = "/Robot/LEDS/b"
        this.readyToWrite = false;
        this.writer = null;

        navigator.serial.RequestPort().then(
            (port) => {
                this.ledSerialPort = port;
                port.open(9600).then(
                    (e) => {
                        this.readyToWrite = true;
                        this.writer = this.ledSerialPort.getWriter()
                    }
                )
            }
        );
    }

    render() {
        const numbers = [this.ledColorKeyR, this.ledColorKeyG, this.ledColorKeyB].map(
            (key) => {
                return bound(this.props.nt[key])
            }
        )

        if (this.writer != null) {
            this.writer.write(numbers)
        }

        return <></>
    }
}