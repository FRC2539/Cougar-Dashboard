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
        const pressure = this.props.nt[this.pressureKey]
        const percentPressurized = (pressure/maxPressure) * 100
        const minPressurePercent = (minPressure/maxPressure) * 100
        
        return (
            <div className="shadow row-span-1 w-11/12 col-span-4 bg-orange rounded-lg p-1 mt-3 mb-3 grid grid-cols-1">
                <p className="text-lg font-bold mb-1">Pressure</p>
                <hr className="mb-2"></hr>

                <div className="overflow-hidden h-8 relative mb-1 z-0 text-s flex rounded bg-white border-black border-r-2 border-2">
                    <div style={{width: percentPressurized + "%"}} className="shadow-none flex flex-col text-left whitespace-nowrap text-white justify-center absolute inset-y-0 left-0 z-1 border-r-2 bg-purple">
                        <p className="pl-3">{Math.round(pressure) + " psi"}</p>
                    </div>
                    <div style={{width: minPressurePercent + "%"}} className="shadow-none flex flex-col text-center whitespace-nowrap justify-center absolute inset-y-0 left-0 z-2 border-r-2 border-black"></div>
                </div>
            </div>
        )
    }
}