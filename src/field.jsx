import { Component } from "preact"

const ROBOT_WIDTH = 0.762
const FIELD_WIDTH = 16.4846
const FIELD_HEIGHT = 8.1026
const TARGET_RADIUS = 1.355852

export default class Field extends Component {
    constructor(props) {
        super(props)

        this.robotPoseKey = '/Swerve/robotPose'
        this.ghostPoseKey = '/Swerve/ghostPose'
        this.ghostEnableKey = '/Swerve/enableGhostPose'

        this.pathPointsKey = '/Swerve/Trajectory'
    }

    decodeRobotPoseArray(poseArray) {
        const arrayOrDefault = poseArray ?? [0, 0, 0]
        return {
            x: arrayOrDefault[0],
            y: arrayOrDefault[1],
            angle: arrayOrDefault[2]
        }
    }

    createRobotSvg(robotPose, isGhost) {
        return <>
            <rect 
                stroke={!isGhost ? "white" : "rgb(150, 150, 150)"} 
                stroke-width=".07" 
                x="0" 
                y="0" 
                width={ROBOT_WIDTH} 
                height={ROBOT_WIDTH} 
                transform={`translate(${robotPose.x - ROBOT_WIDTH / 2},${robotPose.y - ROBOT_WIDTH / 2}) rotate(${robotPose.angle}, ${ROBOT_WIDTH / 2}, ${ROBOT_WIDTH / 2})`} />
            <line 
                x1={robotPose.x  - ROBOT_WIDTH / 2 + .8} 
                y1={robotPose.y} 
                x2={robotPose.x} 
                y2={robotPose.y} 
                stroke={!isGhost ? "rgb(255,0,0)" : "rgb(155,0,0)"} 
                style="stroke-width:0.08" 
                transform={`rotate(${robotPose.angle}, ${robotPose.x}, ${robotPose.y})`} />
        </>
    }

    render() {
        this.robotPose = this.decodeRobotPoseArray(this.props.nt[this.robotPoseKey])

        const ghostEnabled = this.props.nt[this.ghostEnableKey] ?? false

        if (ghostEnabled) this.ghostPose = this.decodeRobotPoseArray(this.props.nt[this.ghostPoseKey])

        return (
            <div className="flex items-center justify-center h-screen">

                <svg viewBox={`0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`} className="w-4/6 max-h-3/4" transform="scale(1, -1)" >
                    <rect style="fill:black;" width={FIELD_WIDTH} height={FIELD_HEIGHT} />
                    <circle stroke="white" stroke-width=".05" cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT / 2} r={TARGET_RADIUS} />

                    {this.createRobotSvg(this.robotPose, false)}
                    {ghostEnabled ? this.createRobotSvg(this.ghostPose, true) : <></>}
                    
                    <polyline points={this.pathPoints} stroke='red' stroke-width='.08' />
                </svg>
            </div>
        )
    }
}