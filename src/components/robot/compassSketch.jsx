import "../../libraries/p5.min.js"
import { Component } from "preact"

export default class CompassSketch extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {        
        const sketchElement = document.getElementById('compass-section')

        const getGeneralAngle = () => {
            const generalAngleKey = "/Swerve Drive/robotVector"
            const defaultValue = 0

            if(!(generalAngleKey in this.props.nt)) return defaultValue

            const angle = this.props.nt[generalAngleKey][1]

            return angle
        }

        const getSpeedPercent = () => {
            const generalSpeedKey = "/Swerve Drive/joystickPercent"
            const defaultValue = 1

            if(!(generalSpeedKey in this.props.nt)) return defaultValue

            const speed = this.props.nt[generalSpeedKey]

            return speed
        }

        const drawCompassCircle = (p, diameter, circleCenter) => {
            p.noFill()
            p.stroke(0)
            p.strokeWeight(4)
            p.circle(circleCenter.x, circleCenter.y, diameter)
        }

        const drawRobotVectorArrow = (p, circleCenter, radius, {angle = 0, speedPercent = 1} = {}) => {
            const percent = p.constrain(speedPercent, 0, 1)
            const arrowTriangleWidth = radius * 0.1

            const arrowLength = (radius * percent) - 1 // -1 to accomodate for the stroke
            
            p.fill(0)
            p.stroke(0)
            p.strokeWeight(2)

            p.push()
            p.translate(circleCenter)
            p.rotate(angle)
            p.line(0, 0, 0, -arrowLength)
            p.triangle(
                0, // x1
                -arrowLength, // y1 
                -arrowTriangleWidth / 2, // x2 
                -arrowLength + arrowTriangleWidth, // y2
                arrowTriangleWidth / 2, // x3
                -arrowLength + arrowTriangleWidth // y3
            )
            p.pop()
        }

        const drawCompassInfo = (p, position, canvasWidthOrHeight, {angle = 0, speedPercent = 1} = {}) => {
            const percent = p.constrain(speedPercent, 0, 1)

            const angleString = `${p.round(angle)}°`
            const speedString = `${p.round(percent * 100)}%`
            
            p.fill(0)
            p.textSize(canvasWidthOrHeight * 0.075)
            p.textAlign(p.CENTER, p.CENTER)
            p.noStroke()

            p.text(angleString, position.x, position.y - p.textLeading())
            p.text(speedString, position.x, position.y)
        }

        const sketchObject = p => {
            p.setup = () => {
                p.createCanvas(sketchElement.clientWidth, sketchElement.clientHeight)
            }

            p.draw = () => {
                p.clear()

                const circleCenter = p.createVector(p.width / 2, p.height * 3/5)
                const mainCircleDiameter = p.min(p.width, p.height) * 0.6

                drawCompassCircle(p, mainCircleDiameter, circleCenter)

                // Draw a line from the center of the circle to the edge to serve as "0"
                p.stroke(0)
                p.strokeWeight(1)
                p.line(circleCenter.x, circleCenter.y, circleCenter.x, circleCenter.y - mainCircleDiameter / 2)
            
                drawRobotVectorArrow(p, circleCenter, mainCircleDiameter / 2, {angle: p.radians(getGeneralAngle()), speedPercent: getSpeedPercent()})

                const infoPosition = p.createVector(p.width / 2, p.height * 1/5)

                drawCompassInfo(p, infoPosition, p.min(p.width, p.height), {angle: getGeneralAngle(), speedPercent: getSpeedPercent()})
            }
        }

        new p5(sketchObject, sketchElement)

        return true
    }

    render() {
        return (
            <div id="compass-section" className="col-span-1"></div>
        )
    }   
}