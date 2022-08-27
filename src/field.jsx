import { Component } from "preact"

export default class Field extends Component {
    constructor(props) {
        super(props)

        this.robotXKey = '/Swerve/X'
        this.robotYKey = '/Swerve/Y'
        this.robotAngleKey = '/Swerve/Angle'
        this.pathPointsKey = ''
    }
    render() {
        if (this.props.nt[this.robotXKey] == null) {
            this.robotPose = {
                x: 0,
                y: 0,
                angle: 0
            }
            this.pathPoints = ['0.5,1', '1,3', '1.5,4', '4,4.5']
        } else {
            this.robotPose = {
                x: this.props.nt[this.robotXKey],
                y: this.props.nt[this.robotYKey],
                angle: this.props.nt[this.robotAngleKey],
            }
            this.pathPoints = this.props.nt[this.pathPointsKey]
        }

        return (
            <div className="flex items-center justify-center h-screen">

                <svg viewBox="0 0 16.4846 8.1026" className="w-4/6 max-h-3/4" transform="scale(1, -1)" >
                    <rect style="fill:black;" width="16.4846" height="8.1026" />
                    <circle stroke="white" stroke-width=".05" cx="8.2423" cy="4.0513" r="1.355852" />
                    <rect stroke="white" stroke-width=".07" x="0" y="0" width="0.762" height="0.762" transform={`translate(${this.robotPose.x},${this.robotPose.y}) rotate(${this.robotPose.angle}, .381, .381)`} />
                    <line x1={this.robotPose.x + .381} y1={this.robotPose.y + .8} x2={this.robotPose.x + 0.381} y2={this.robotPose.y + 0.381} style="stroke:rgb(255,0,0);stroke-width:0.08" transform={`rotate(${this.robotPose.angle}, ${this.robotPose.x + .381}, ${this.robotPose.y + .381})`} />
                    <polyline points={this.pathPoints} stroke='red' stroke-width='.08' />

                </svg>
            </div>
        )
    }
}