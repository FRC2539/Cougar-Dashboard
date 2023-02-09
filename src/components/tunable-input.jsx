import { Component } from 'preact'

export default class TunableInput extends Component {
    /**
     * @param props {type, value, ntkey, putValueNT}
     */
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value
        }
    }

    updateValue(newValue) {
        // Don't change it if the input would be empty
        if(newValue == "") return

        this.setState({value: newValue})
    }

    updateNT() {
        if(this.state.value == "") return

        // Prevent setting a number input to normal text
        if(typeof parseFloat(this.state.value) != "number") return

        this.props.putValueNT(this.props.ntkey, parseFloat(this.state.value))
    }

    render() {
        return (
            <input style={{width: "130px"}} type="number" className="px-1 py-0 rounded-sm border-black bg-orange" onInput={(e) => this.updateValue(e.target.value)} onChange={() => this.updateNT()} value={this.state.value}/>
        )
    }
}