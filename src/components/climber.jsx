import { Component } from "preact"

export default class Climber extends Component {
    constructor(props) {
        super(props)

        this.climberLockedKey = "/Climber/locked"
    }

    render() {
        return (
            <div className="mt-1 col-span-2 row-span-2 bg-orange shadow rounded-lg p-2 ml-2">
                <div className="text-left">Climber Locked:</div>
                <div className={"mt-2 mb-1 w-full h-3/4 rounded-lg border-black border " + (this.props.nt[this.climberLockedKey] == true ? " bg-green" : " bg-red")}></div>
            </div>
        )
    }
}