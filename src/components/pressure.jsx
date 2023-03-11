import { Component } from "preact"

const maxPressure = 120

export default class Pressure extends Component {
    constructor(props) {
        super(props)

        this.pressureKey = "/Robot/Pressure"
        this.minPressureKey = "/Robot/Minimum Pressure"
    }

    render() {
        const minPressure = this.props.nt[this.minPressureKey]

        let pressure = this.props.nt[this.pressureKey]
        let percentPressurized = Math.round((pressure/maxPressure) * 100)

        let minPressurePercentleft = Math.round(((minPressure/maxPressure) * 100) - percentPressurized)
        
        return (
            <div className="shadow row-span-1 w-11/12 col-span-4 bg-orange rounded-lg p-1 mt-3 mb-3 grid grid-cols-1">
                <p>Pressure</p>
                <hr className="mb-2"></hr>

                <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-white">
                    <div style={{ width: percentPressurized + "%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-black justify-center bg-purple">{percentPressurized + "%"}</div>
                    <div style={{width: minPressurePercentleft + "%"}} className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-purple-light"></div>
                </div>
            </div>
        )
    }
}