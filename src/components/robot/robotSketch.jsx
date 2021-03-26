import "../../libraries/p5.min.js"
import { Component } from "preact"

export default class RobotSketch extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps) {
        const sketchElement = document.getElementById('robot-section')

        const getRobotWheelAngles = () => {
            // In the future, get this from network tables

            return [[0, 0],
                    [0, 0]]
        }

        const sketchObject = p => {
            p.setup = () => {
                p.createCanvas(sketchElement.clientWidth, sketchElement.clientHeight)
            }

            p.draw = () => {
                p.clear()

                const robotSideWidth = p.height * 0.8
                const robotStrokeWidth = 12

                p.noFill()
                p.stroke('#434343')
                p.strokeWeight(robotStrokeWidth)
                p.rectMode(p.CENTER)
                p.square(p.width / 2, p.height / 2, robotSideWidth)

                const robotWheelAngles = getRobotWheelAngles()

                p.push()
                // p.rect()
            }
        }

        new p5(sketchObject, sketchElement)
    }

    render() {
        return (
            <div id="robot-section" className="col-span-1"></div>
        )
    }
    
}


// export default function robotSketch(p) {
//     const draw = (nt) => {
//         const shooterRPMPath = "/Shooter/Shooter RPM"
//         const shooterRPM = nt[shooterRPMPath]

//         p.clear()
//         p.text(shooterRPM, p.width/2, p.height/2)
//     }

//     return { draw }
// }