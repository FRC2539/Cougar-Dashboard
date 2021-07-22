import { Component } from "preact"

export default class LimelightOffset extends Component {
    constructor(props) {
        super(props)

        this.xOffset = "/limelight/xOffset"
        this.yOffset = "/limelight/yOffset"
    }

    roundTwoDecimals(num) {
        if(num == undefined || num == null) return ""

        return +num.toFixed(2)
    }

    render() {
        return (
            <div className="col-span-1 p-2 grid grid-cols-2">
                <div className="col-span-1">
                    <div className="text-left">x Offset:</div>
                    <div className="text-left text-2xl"><strong>{this.roundTwoDecimals(this.props.nt[this.xOffset])}</strong></div>
                </div>
                <div className="col-span-1">
                    <div className="text-left">y Offset:</div>
                    <div className="text-left text-2xl"><strong>{this.roundTwoDecimals(this.props.nt[this.yOffset])}</strong></div>
                </div>
            </div>
        )
    }
}