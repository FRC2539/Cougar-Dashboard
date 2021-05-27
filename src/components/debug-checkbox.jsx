import { Component } from 'preact'

export default class DebugCheckbox extends Component {
    /**
     * @param props {value, ntkey, putValueNT}
     */
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value,
            lastProps: this.props.value
        }
    }

    updateValue(value = null) {
        this.setState({value: value == null ? !this.state.value : value})
    }

    updateNT() {
        this.props.putValueNT(this.props.ntkey, this.state.value)
    }

    shouldComponentUpdate(nextProps) {
        const propsValuesHaveChanged = this.props.nt[this.props.ntkey] != this.state.lastProps
        const propsValuesWillChange = this.props.nt[this.props.ntkey] != nextProps.nt[this.props.ntkey]

        if(propsValuesHaveChanged) { // Accounts for when the debug page is left and returned to
            this.updateValue(nextProps.nt[this.props.ntkey])
            this.setState({lastProps: nextProps.nt[this.props.ntkey]})
        }
        else if(propsValuesWillChange) this.updateValue(nextProps.nt[this.props.ntkey])
    }

    render() {
        return (
            <input type="checkbox" className="rounded-sm border-black bg-orange" onInput={() => this.updateValue()} onChange={() => this.updateNT()} checked={this.state.value}/>
        )
    }
}