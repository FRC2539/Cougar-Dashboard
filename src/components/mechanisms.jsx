import { Component } from "preact"

export default class Mechanisms extends Component {
    constructor(props) {
        super(props)

        this.shooterRPM1 = "/Shooter/Shooter RPM"
        this.shooterRPM2 = "/Shooter/Shooter RPM2"

        this.hoodPosition = "/Hood/Hood Position"

        this.conveyorBall = "/BallSystem/Conveyor Ball"
        this.chamberBall = "/BallSystem/Chamber Ball"

        this.mechanisms = {
            "ML Target": "/ML/targetAcquired"
        }
    }

    render() {
        return (
            <div className="shadow bg-orange col-span-4 row-span-2 rounded-lg p-2 mt-1">
                <div className="flex flex-row font-medium justify-between items-center">
                    <div className="text-left self-start">RPM1:</div>
                    <div className="text-right self-end">{Math.round(this.props.nt[this.shooterRPM1])}</div>
                </div>
                <div className="flex flex-row font-medium justify-between items-center">
                    <div className="text-left self-start">RPM2:</div>
                    <div className="text-right self-end">{Math.round(this.props.nt[this.shooterRPM2])}</div>
                </div>

                <hr/>

                <div className="flex flex-row font-medium justify-between items-center">
                    <div className="text-left self-start">Hood Position:</div>
                    <div className="text-right self-end">{Math.round(this.props.nt[this.hoodPosition])}</div>
                </div>

                <hr/>

                {Object.entries(this.mechanisms).map(([key, value]) => {
                    return (
                        <div className="flex flex-row font-medium justify-between items-center mb-0.5">
                            <div className="text-left self-start">{key}:</div>
                            <div className={"text-right self-end w-1/5 h-4 rounded-full border-black border " + (this.props.nt[value] == true ? " bg-green" : " bg-red")}></div>
                        </div>
                    )
                })}

                <hr/>

                <div className="flex flex-row font-medium justify-center items-center mt-3">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill={(this.props.nt[this.conveyorBall])? "orange" : "black"}/>
                    </svg>
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill={(this.props.nt[this.chamberBall])? "orange" : "black"}/>
                    </svg>
                </div>
            </div>
        )
    }
}