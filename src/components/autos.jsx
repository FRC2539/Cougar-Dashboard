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
        if(this.props.nt == null || this.props.nt[this.autos] == null) return <span></span> 
        
        return this.props.nt[this.autos].map((value, i) => {
            return <a onClick={() => this.setCurrentAuto(value)} class={this.getButtonColorClass(value) + " cursor-pointer p-2 text-center border border-gray " + this.getBorderRadiusClass(this.props.nt[this.autos], i)}>{value}</a>
        })
    }

    render() {
        return (
            <div class="grid grid-flow-auto">
                {this.getButtonHTML()}
            </div>
        )
    }
}