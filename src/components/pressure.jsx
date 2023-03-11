import { Component } from "preact"

const maxPressure = 120

export default class Pressure extends Component {
    constructor(props) {
        super(props)

        this.pressureKey = "/Robot/Pressure"
        this.minPressureKey = "/Robot/Minimum Pressure"
    }

    render() {
        // const minPressure = this.props.nt[this.minPressureKey]
        const minPressure = 80


        // let pressure = this.props.nt[this.pressureKey]
        let pressure = 100

        let percentPressurized = Math.round((pressure/maxPressure) * 100)

        let minPressurePercent = Math.round((minPressure/maxPressure) * 100)
        
        return (
            <div className="shadow row-span-1 w-11/12 col-span-4 bg-orange rounded-lg p-1 mt-3 mb-3 grid grid-cols-1">
                <p className="text-lg font-bold mb-1">Pressure</p>
                <hr className="mb-2"></hr>

                <div className="overflow-hidden h-6 mb-4 relative z-0 text-xs flex rounded bg-white border-black border">
                    <div style={{ width: percentPressurized + "%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-black justify-center absolute inset-y-0 left-0 z-5 bg-purple">{pressure + " psi"}</div>
                    <div style={{width: minPressurePercent + "%"}} className="shadow-none flex flex-col text-center whitespace-nowrap justify-center absolute inset-y-0 left-0 z-10 border-r-2 border-black"></div>
                </div>
            </div>
        )
    }
}