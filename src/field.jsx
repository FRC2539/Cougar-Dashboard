import { Component } from "preact"

const ROBOT_WIDTH = 0.762
const FIELD_WIDTH = 16.4846
const FIELD_HEIGHT = 8.1026
const TARGET_RADIUS = 1.355852

export default class Field extends Component {
    constructor(props) {
        super(props)

        this.robotXKey = '/Swerve/X'
        this.robotYKey = '/Swerve/Y'
        this.robotAngleKey = '/Swerve/Angle'
        this.pathPointsKey = '/Swerve/Trajectory'
    }
    render() {
        this.robotPose = {
            x: this.props.nt[this.robotXKey] ?? 0,
            y: this.props.nt[this.robotYKey] ?? 0,
            angle: this.props.nt[this.robotAngleKey] ?? 0,
        }
        this.pathPoints = this.props.nt[this.pathPointsKey] ?? []
        // Correct data format: ['0.5,1', '1,3', '1.5,4', '4,4.5']

        return (
            <div className="flex items-center justify-center h-screen">

                <svg viewBox={`0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`} className="w-4/6 max-h-3/4" transform="scale(1, -1)" >
                    <rect style="fill:black;" width={FIELD_WIDTH} height={FIELD_HEIGHT} />
                    <circle stroke="white" stroke-width=".05" cx={FIELD_WIDTH / 2} cy={FIELD_HEIGHT / 2} r={TARGET_RADIUS} />
                    <rect 
                        stroke="white" 
                        stroke-width=".07" 
                        x="0" 
                        y="0" 
                        width={ROBOT_WIDTH} 
                        height={ROBOT_WIDTH} 
                        transform={`translate(${this.robotPose.x - ROBOT_WIDTH / 2},${this.robotPose.y - ROBOT_WIDTH / 2}) rotate(${this.robotPose.angle}, ${ROBOT_WIDTH / 2}, ${ROBOT_WIDTH / 2})`} />
                    <line 
                        x1={this.robotPose.x  - ROBOT_WIDTH / 2 + .8} 
                        y1={this.robotPose.y} 
                        x2={this.robotPose.x} 
                        y2={this.robotPose.y} 
                        style="stroke:rgb(255,0,0);stroke-width:0.08" 
                        transform={`rotate(${this.robotPose.angle}, ${this.robotPose.x}, ${this.robotPose.y})`} />
                    <polyline points={this.pathPoints} stroke='red' stroke-width='.08' />

                </svg>
            </div>
        )
    }
}