import { Component } from "preact"

export default class Mechanisms extends Component {
    constructor(props) {
        super(props)

        this.driveTemperaturesKey = "/SwerveDriveSubsystem/Drive Temperatures"

        // this.shooterRPM1 = "/Shooter/Shooter RPM"
        // this.shooterRPM2 = "/Shooter/Shooter RPM2"

        // this.hoodPosition = "/Hood/Hood Position"

        // this.conveyorBall = "/BallSystem/Conveyor Ball"
        // this.chamberBall = "/BallSystem/Chamber Ball"

        // this.mechanisms = {
        //     "ML Target": "/ML/targetAcquired"
        // }
    }

    average(array) {
        let sum = 0;

        for (const value of array) {
            sum += value
        }

        return sum / array.length
    }

    render() {
        const driveMotorTemps = this.props.nt[this.driveTemperaturesKey] ?? []
        const averageMotorTemp = this.average(driveMotorTemps)
        const motorTempThreshold = 70;

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
                    <div className={"text-right w-1/4 h-7 rounded-md border-black border " + (false ? "bg-green" : " bg-black")}></div>
                </div>

                <div className="flex flex-row font-medium justify-between items-center mb-2">
                    <div className="text-left self-start">Is Under Pressure:</div>
                    <div className={"text-right w-1/4 h-7 rounded-md border-black border " + (false ? "bg-purple" : " bg-black")}></div>
                </div>

                <hr className="mb-2"></hr>

                <div className="flex flex-row font-medium justify-between items-center mb-2">
                    <div className="text-left self-start">Vision Updated:</div>
                    <div className="text-right self-end">0 seconds ago</div>
                </div>
            </div>
        )
    }
}