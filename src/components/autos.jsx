import { Component } from "preact"

export default class Autos extends Component {
    constructor(props) {
        super(props)

        this.autos = "/Autonomous/autos"
        this.selectedAuto = "/Autonomous/selectedAuto"
    }

    setCurrentAuto(newAuto) {
        this.props.putValueNT(this.selectedAuto, newAuto)
    }
    
    getBorderRadiusClass(array, i) {
        if(i == 0) return "rounded-l-lg"
        if(i == array.length - 1) return "rounded-r-lg"
    }

    getButtonColorClass(value) {
        if(this.props.nt[this.selectedAuto] == value) return "bg-orange-dark"
        
        return "bg-orange"
    }

    getButtonHTML() {
        if(this.props.nt == null || this.props.nt[this.autos] == null) return []
        
        return this.props.nt[this.autos].map((value, i) => {
            return <a onClick={() => this.setCurrentAuto(value)} class={this.getButtonColorClass(value) + " cursor-pointer p-1 text-center text-xs border border-gray break-all flex justify-center items-center " + this.getBorderRadiusClass(this.props.nt[this.autos], i)}><p>{value}</p></a>
        })
    }

    render() {
        let buttonHTML = this.getButtonHTML()
        let body = <></>
        if (buttonHTML.length != 0) {
            body = (
                <div class="grid grid-cols-3 col-span-2 row-span-2 mt-2 ml-2">
                {buttonHTML}
                </div>
                )
        } else {
            body = (
                <div className="w-full h-full loader flex justify-center space-x-1 anima pt-3">
                  <div className="flex-auto special-gray w-5 h-8 rounded-md"></div>
                  <div className="flex-auto special-gray w-5 h-8 rounded-md"></div>
                  <div className="flex-auto special-gray w-5 h-8 rounded-md"></div>
                </div>
              );
        }

        return (
                body
        )
    }
}