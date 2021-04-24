import "../../libraries/p5.min.js"
import { Component } from "preact"

export default class RobotSketch extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {        
        const sketchElement = document.getElementById('robot-section')

        const getRobotWheelAngles = () => {
            const robotWheelAnglesKey = "/Dashboard/Wheel Angles"
            const defaultValue = [[0,0],[0,0]]

            if(!(robotWheelAnglesKey in this.props.nt)) return defaultValue

            return this.props.nt[robotWheelAnglesKey]
        }

        const getRobotWheelSpeeds = () => {
            const robotWheelSpeedsKey = "/Dashboard/Wheel Speeds"
            const defaultValue = [[0,0],[0,0]]

            if(!(robotWheelSpeedsKey in this.props.nt)) return defaultValue

            return this.props.nt[robotWheelSpeedsKey]
        }

        const convertWheelAnglesToP5Angles = (wheelAngles) => {
            const degreesToRadians = (angleInDegrees) => (Math.PI * angleInDegrees) / 180

            return wheelAngles.map(wheels => wheels.map(wheel => degreesToRadians(wheel)))
        }

        const wheelPositionsOnSketch = ({robotSideWidth, robotPosition}) => {
            // Takes the positions tl, tr, bl, br
            const xgapFromWheelToCorner = 0.2 * robotSideWidth
            const ygapFromWheelToCorner = 0.2 * robotSideWidth

            const tl = () => {
                const topLeftPosition = robotPosition.copy()
                topLeftPosition.x -= (robotSideWidth / 2) - xgapFromWheelToCorner
                topLeftPosition.y -= (robotSideWidth / 2) - ygapFromWheelToCorner

                return topLeftPosition
            }

            const tr = () => {
                const topRightPosition = robotPosition.copy()
                topRightPosition.x += (robotSideWidth / 2) - xgapFromWheelToCorner
                topRightPosition.y -= (robotSideWidth / 2) - ygapFromWheelToCorner

                return topRightPosition
            }

            const bl = () => {
                const bottomLeftPosition = robotPosition.copy()
                bottomLeftPosition.x -= (robotSideWidth / 2) - xgapFromWheelToCorner
                bottomLeftPosition.y += (robotSideWidth / 2) - ygapFromWheelToCorner

                return bottomLeftPosition
            }

            const br = () => {
                const bottomRightPosition = robotPosition.copy()
                bottomRightPosition.x += (robotSideWidth / 2) - xgapFromWheelToCorner
                bottomRightPosition.y += (robotSideWidth / 2) - ygapFromWheelToCorner

                return bottomRightPosition
            }

            return { tl, tr, bl, br }
        }

        const drawWheels = ({angles, p, robotPosition, robotSideWidth, speedPercent = 1}) => {
            // Maybe make this a method to get the wheel dimensions

            const percent = p.constrain(speedPercent, 0, 1) // Note: only one speed for all the wheels

            const wheelHeight = 0.22 * robotSideWidth * percent
            const wheelWidth = 0.02 * robotSideWidth
            const arrowTriangleWidth = 0.04 * robotSideWidth

            const wheelPositions = wheelPositionsOnSketch({robotPosition, robotSideWidth})

            const drawWheel = (position, angle) => {
                p.fill(0)
                p.noStroke()

                p.push()
                p.translate(position)
                p.rotate(angle)
                p.rectMode(p.CENTER)
                p.rect(0, 0, wheelWidth, wheelHeight)
                p.triangle(
                    0, // x1
                    -wheelHeight / 2 - arrowTriangleWidth / 1.5, // y1 
                    -arrowTriangleWidth / 1.5, // x2 
                    -wheelHeight / 2 + arrowTriangleWidth / 1.5, // y2
                    arrowTriangleWidth / 1.5, // x3
                    -wheelHeight / 2 + arrowTriangleWidth / 1.5 // y3
                )
                p.pop()
            }

            // Draw top left wheel
            drawWheel(wheelPositions.tl(), angles[0][0])

            // Draw top right wheel
            drawWheel(wheelPositions.tr(), angles[0][1])

            // Draw bottom left wheel
            drawWheel(wheelPositions.bl(), angles[1][0])

            // Draw bottom right wheel
            drawWheel(wheelPositions.br(), angles[1][1])
        }

        const wheelInfoPositionsOnSketch = ({robotSideWidth, robotPosition}) => {
            // Takes the positions tl, tr, bl, br
            const xgapFromCornerToInfo = 0.1 * robotSideWidth
            const ygapFromCornerToInfo = 0.2 * robotSideWidth

            const tl = (infoWidth) => {
                const topLeftPosition = robotPosition.copy()
                topLeftPosition.x -= (robotSideWidth / 2) + xgapFromCornerToInfo + infoWidth
                topLeftPosition.y -= (robotSideWidth / 2) - ygapFromCornerToInfo

                return topLeftPosition
            }

            const tr = () => {
                const topRightPosition = robotPosition.copy()
                topRightPosition.x += (robotSideWidth / 2) + xgapFromCornerToInfo
                topRightPosition.y -= (robotSideWidth / 2) - ygapFromCornerToInfo

                return topRightPosition
            }

            const bl = (infoWidth) => {
                const bottomLeftPosition = robotPosition.copy()
                bottomLeftPosition.x -= (robotSideWidth / 2) + xgapFromCornerToInfo + infoWidth
                bottomLeftPosition.y += (robotSideWidth / 2) - ygapFromCornerToInfo

                return bottomLeftPosition
            }

            const br = () => {
                const bottomRightPosition = robotPosition.copy()
                bottomRightPosition.x += (robotSideWidth / 2) + xgapFromCornerToInfo
                bottomRightPosition.y += (robotSideWidth / 2) - ygapFromCornerToInfo

                return bottomRightPosition
            }

            return { tl, tr, bl, br }
        }

        const drawAllWheelInfo = ({angles, speeds, p, robotPosition, robotSideWidth}) => {
            const infoHeight = 0.2 * robotSideWidth

            const fontSize = infoHeight / 2

            const wheelInfoPositions = wheelInfoPositionsOnSketch({robotSideWidth, robotPosition})

            const getWheelInfoStrings = (angle, speed) => {
                const angleString = `${p.round(angle, 2)}°`
                const speedString = `${p.round(speed * 100, 2)}%`

                return {angleString, speedString}
            } 

            const getWheelInfoWidth = ({angleString, speedString}) => {
                p.textSize(fontSize)

                return p.max(p.textWidth(angleString), p.textWidth(speedString))
            }

            const drawWheelInfo = ({position, angleString, speedString}) => {
                p.fill(0)
                p.noStroke()

                p.textSize(fontSize)

                p.textAlign(p.LEFT, p.BASELINE)
                p.text(angleString, position.x, position.y - (fontSize / 4))

                p.textAlign(p.LEFT, p.TOP)
                p.text(speedString, position.x, position.y + (fontSize / 4))
            }

            // TODO make similar blocks of code loop through arrays with the indices needed rather than repeat code
            // Draw top left info
            { // Start a new scope for constants
                const {angleString, speedString} = getWheelInfoStrings(angles[0][0], speeds[0][0])
                const wheelInfoWidth = getWheelInfoWidth({angleString, speedString})
                const topLeftPosition = wheelInfoPositions.tl(wheelInfoWidth)

                drawWheelInfo({position: topLeftPosition, angleString, speedString})
            }

            // Draw top right info
            {
                const {angleString, speedString} = getWheelInfoStrings(angles[0][1], speeds[0][1])
                const topRightPosition = wheelInfoPositions.tr()

                drawWheelInfo({position: topRightPosition, angleString, speedString})
            }

            // Draw bottom left info
            {
                const {angleString, speedString} = getWheelInfoStrings(angles[1][0], speeds[1][0])
                const wheelInfoWidth = getWheelInfoWidth({angleString, speedString})
                const bottomLeftPosition = wheelInfoPositions.bl(wheelInfoWidth)

                drawWheelInfo({position: bottomLeftPosition, angleString, speedString})
            }

            // Draw bottom right info
            {
                const {angleString, speedString} = getWheelInfoStrings(angles[1][1], speeds[1][1])
                const bottomRightPosition = wheelInfoPositions.br()

                drawWheelInfo({position: bottomRightPosition, angleString, speedString})
            }
        }

        const sketchObject = p => {
            p.setup = () => {
                p.createCanvas(sketchElement.clientWidth, sketchElement.clientHeight)
            }

            p.draw = () => {
                p.clear()

                const robotSideWidth = p.min(p.height * 0.8, p.width * 0.6)
                const robotStrokeWidth = 12

                const robotPosition = p.createVector(p.width / 2, p.height / 2)

                p.noFill()
                p.stroke('#434343')
                p.strokeWeight(robotStrokeWidth)
                p.rectMode(p.CENTER)
                p.rect(robotPosition.x, robotPosition.y, robotSideWidth, robotSideWidth)

                const robotWheelAngles = getRobotWheelAngles()
                const angles = convertWheelAnglesToP5Angles(robotWheelAngles)
                const robotWheelSpeeds = getRobotWheelSpeeds()

                drawWheels({angles, p, robotPosition, robotSideWidth})

                drawAllWheelInfo({angles: robotWheelAngles, speeds: robotWheelSpeeds, p, robotPosition, robotSideWidth})
            }
        }

        new p5(sketchObject, sketchElement)

        return true
    }

    render() {
        return (
            <div id="robot-section" className="col-span-1"></div>
        )
    }   
}