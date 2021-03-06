import "../../libraries/p5.min.js"
import { Component } from "preact"

export default class RobotSketch extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {        
        const sketchElement = document.getElementById('robot-section')

        const getRobotWheelAngles = () => {
            const robotWheelAnglesKey = "/Swerve Drive/wheelAngles"
            const defaultValue = [0,0,0,0] // Forward is 180 degrees

            if(!(robotWheelAnglesKey in this.props.nt)) return defaultValue

            return this.props.nt[robotWheelAnglesKey]
        }

        const getRobotWheelSpeeds = () => {
            const robotWheelSpeedsKey = "/Swerve Drive/wheelSpeeds"
            const defaultValue = [0,0,0,0] // Speeds in feet per second

            if(!(robotWheelSpeedsKey in this.props.nt)) return defaultValue

            return this.props.nt[robotWheelSpeedsKey]
        }

        const getRobotWheelPercents = () => {
            const robotWheelPercentsKey = "/Swerve Drive/wheelPercents"
            const defaultValue = [0,0,0,0] // Speeds in feet per seconds

            if(!(robotWheelPercentsKey in this.props.nt)) return defaultValue

            return this.props.nt[robotWheelPercentsKey]
        }

        const convertWheelAnglesToP5Angles = (wheelAngles) => {
            const degreesToRadians = (angleInDegrees) => (Math.PI * angleInDegrees) / 180

            return wheelAngles.map(wheel => degreesToRadians(wheel))
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

        const drawWheels = ({angles, p, robotPosition, robotSideWidth, speedPercents = [0,0,0,0]}) => {
            const wheelWidth = 0.02 * robotSideWidth
            const arrowTriangleWidth = 0.04 * robotSideWidth

            const wheelPositions = wheelPositionsOnSketch({robotPosition, robotSideWidth})

            const drawWheel = (position, angle, percent) => {
                const wheelHeight = 0.22 * robotSideWidth * percent

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
            drawWheel(wheelPositions.tl(), angles[0], speedPercents[0])

            // Draw top right wheel
            drawWheel(wheelPositions.tr(), angles[1], speedPercents[1])

            // Draw bottom left wheel
            drawWheel(wheelPositions.bl(), angles[2], speedPercents[2])

            // Draw bottom right wheel
            drawWheel(wheelPositions.br(), angles[3], speedPercents[3])
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
                const angleString = `${p.round(angle)}??`
                const speedString = `${p.round(speed, 1)}`

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
                const {angleString, speedString} = getWheelInfoStrings(angles[0], speeds[0])
                const wheelInfoWidth = getWheelInfoWidth({angleString, speedString})
                const topLeftPosition = wheelInfoPositions.tl(wheelInfoWidth)

                drawWheelInfo({position: topLeftPosition, angleString, speedString})
            }

            // Draw top right info
            {
                const {angleString, speedString} = getWheelInfoStrings(angles[1], speeds[1])
                const topRightPosition = wheelInfoPositions.tr()

                drawWheelInfo({position: topRightPosition, angleString, speedString})
            }

            // Draw bottom left info
            {
                const {angleString, speedString} = getWheelInfoStrings(angles[2], speeds[2])
                const wheelInfoWidth = getWheelInfoWidth({angleString, speedString})
                const bottomLeftPosition = wheelInfoPositions.bl(wheelInfoWidth)

                drawWheelInfo({position: bottomLeftPosition, angleString, speedString})
            }

            // Draw bottom right info
            {
                const {angleString, speedString} = getWheelInfoStrings(angles[3], speeds[3])
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
                const robotStrokeWidth = 6

                const robotPosition = p.createVector(p.width / 2, p.height / 2)

                p.noFill()
                p.stroke('#434343')
                p.strokeWeight(robotStrokeWidth)
                p.rectMode(p.CENTER)
                p.rect(robotPosition.x, robotPosition.y, robotSideWidth, robotSideWidth)

                const robotWheelAngles = getRobotWheelAngles()
                const angles = convertWheelAnglesToP5Angles(robotWheelAngles)
                const robotWheelSpeeds = getRobotWheelSpeeds()
                const robotWheelPercents = getRobotWheelPercents()

                drawWheels({angles, p, robotPosition, robotSideWidth, speedPercent: robotWheelPercents})

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