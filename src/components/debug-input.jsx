import { Component } from 'preact'

export default class DebugInput extends Component {
    /**
     * @param props {type, value, ntkey, putValueNT}
     */
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value,
            lastProps: this.props.value
        }
    }

    updateValue(newValue) {
        // Don't change it if the input would be empty
        if(newValue == "") return

        if(this.isNumberInput()) {
            if(Number.isInteger(parseFloat(newValue))) newValue = parseInt(newValue)
            else newValue = parseFloat(newValue)
        }

        this.setState({value: newValue})
    }

    isNumberInput() {
        return this.props.type == "number"
    }

    updateNT() {
        if(this.state.value == "") return

        // Prevent setting a number input to normal text
        if(this.props.type == "number" && typeof parseInt(this.state.value) != "number") return

        this.props.putValueNT(this.props.ntkey, this.state.value)
    }

    shouldComponentUpdate(nextProps) {
        const propsValuesHaveChanged = nextProps.nt[this.props.ntkey] != this.state.lastProps
        const propsValuesWillChange = this.props.nt[this.props.ntkey] != nextProps.nt[this.props.ntkey]

        if(propsValuesHaveChanged) { // Accounts for when the debug page is left and returned to
            this.updateValue(nextProps.nt[this.props.ntkey])
            this.setState({lastProps: nextProps.nt[this.props.ntkey]})
        }
        else if(propsValuesWillChange) this.updateValue(nextProps.nt[this.props.ntkey])
    }

    render() {
        return (
            <input style={{width: "130px"}} type={this.props.type} className="px-1 py-0 rounded-sm border-black bg-orange" onInput={(e) => this.updateValue(e.target.value)} onChange={() => this.updateNT()} value={this.state.value}/>
        )
    }
}