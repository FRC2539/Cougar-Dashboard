import { Component } from "preact";
import LogitechController, { DefaultLogitechControllerData } from "./controllers/lojitech";
import ThrustmasterJoystickController, { DefaultThrustmasterJoystickControllerData } from "./controllers/thrustmaster";


export default class Controller extends Component {
    constructor(props) {
        super(props)

        this.controller0Key = '/Controllers/0'
        this.controller1Key = '/Controllers/1'
        this.controller2Key = '/Controllers/2'
    }


    render() {
    this.controller0Data = this.props.nt[this.controller0Key] ?? DefaultThrustmasterJoystickControllerData
    this.controller1Data = this.props.nt[this.controller1Key] ?? DefaultThrustmasterJoystickControllerData
    this.controller2Data = this.props.nt[this.controller2Key] ?? DefaultLogitechControllerData

        return (
            <div className="flex flex-row items-center justify-between h-screen w-screen gap-3">
                    <ThrustmasterJoystickController nt={this.props.nt} data={this.controller0Data}/>
                    <ThrustmasterJoystickController nt={this.props.nt} data={this.controller1Data} />
                    <LogitechController nt={this.props.nt} data={this.controller2Data} />
            </div>
        )
    }
}