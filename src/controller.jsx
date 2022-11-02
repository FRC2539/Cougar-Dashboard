import { Component } from "preact";
import LogitechController, { DefaultLogitechControllerData } from "./controllers/lojitech";
import ThrustmasterJoystickController, { DefaultThrustmasterJoystickControllerData } from "./controllers/thrustmaster";

function controllerType(type) {
    if (type == "LogitechController") return LogitechController
    if (type === "ThrustmasterJoystick") return ThrustmasterJoystickController
    return LogitechController
}

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

    this.controller0Type = controllerType(this.controller0Data.type)
    this.controller1Type = controllerType(this.controller1Data.type)
    this.controller2Type = controllerType(this.controller2Data.type)


        return (
            <div className="flex flex-row items-center justify-between h-screen w-screen gap-3 p-2">
                    <this.controller0Type data={this.controller0Data}/>
                    <this.controller1Type data={this.controller1Data}/>
                    <this.controller2Type data={this.controller2Data}/>
            </div>
        )
    }
}