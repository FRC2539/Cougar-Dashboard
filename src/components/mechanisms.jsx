import { Component } from "preact"

export default class Mechanisms extends Component {
    constructor(props) {
        super(props)

        this.driveTemperaturesKey = "/SwerveDriveSubsystem/Drive Temperatures"
        this.hasGamePieceKey = "/Robot/Has Game Piece"
        this.pressureKey = "/Robot/Pressure"
        this.minPressureKey = "/Robot/Minimum Pressure"
        this.secondsSinceVisionUpdateKey = "/VisionSubsystem/Last Update"
    }

    average(array) {
        let sum = 0;

        for (const value of array) {
            sum += value
        }

        return sum / array.length
    }

    round(num, decimalPlaces = 0) {
        var p = Math.pow(10, decimalPlaces);
        var n = (num * p) * (1 + Number.EPSILON);
        return Math.round(n) / p;
    }

    render() {
        const driveMotorTemps = this.props.nt[this.driveTemperaturesKey] ?? []
        const averageMotorTemp = this.average(driveMotorTemps)
        const motorTempThreshold = 70;

        const lastVisionUpdate = this.round(this.props.nt[this.secondsSinceVisionUpdateKey], 2)

        return (
            <div className="shadow bg-orange col-span-4 row-span-2 rounded-lg p-2 mt-1">
                <p className="text-lg font-bold mb-1">General Mechanisms</p>

                <hr className="mb-2"></hr>

                <div className="flex flex-row font-medium justify-between items-center mb-2">
                    <div className="text-left self-start">Swerve Temperatures:</div>
                    <div className={"text-right w-1/4 h-7 rounded-md border-black border " + (averageMotorTemp > motorTempThreshold ? "bg-red" : "bg-black")}></div>
                </div>

                <div className="flex flex-row font-medium justify-between items-center mb-2">
                    <div className="text-left self-start">Has Game Piece:</div>
                    <div className={"text-right w-1/4 h-7 rounded-md border-black border " + (this.props.nt[this.hasGamePieceKey] ? "bg-green" : " bg-black")}></div>
                </div>

                <div className="flex flex-row font-medium justify-between items-center mb-2">
                    <div className="text-left self-start">Is Under Pressure:</div>
                    <div className={"text-right w-1/4 h-7 rounded-md border-black border " + (this.props.nt[this.pressureKey] < this.props.nt[this.minPressureKey] ? "bg-purple" : " bg-black")}></div>
                </div>

                <hr className="mb-2"></hr>

                <div className="flex flex-row font-medium justify-between items-center mb-2">
                    <div className="text-left self-start text-sm">Vision Updated:</div>
                    <div className="text-right self-end text-sm">{lastVisionUpdate} seconds ago</div>
                </div>
            </div>
        )
    }
}