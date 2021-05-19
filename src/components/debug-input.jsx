import { Component } from 'preact'

export default class DebugInput extends Component {
    /**
     * @param props {type, value, ntkey, putValueNT}
     */
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value()
        }

        // TODO: Make data update live. Basically, store the last value in the state, and rerender if the values change. 
        // Actually, pass the title and key in and then have the value update from that rather than using a passed value.
    }

    updateValue(newValue) {
        // Don't change it if the input would be empty
        if(newValue == "") return

        this.setState({value: newValue})
    }

    updateNT() {
        if(this.state.value == "") return

        // Prevent setting a number input to normal text
        if(this.props.type == "number" && typeof parseInt(this.state.value) != "number") return

        this.props.putValueNT(this.props.ntkey, this.state.value)
    }

    render() {
        return (
            <input style={{width: "130px"}} type={this.props.type} className="px-1 py-0 rounded-sm border-black bg-orange" onInput={(e) => this.updateValue(e.target.value)} onChange={() => this.updateNT()} value={this.state.value}/>
        )
    }
}