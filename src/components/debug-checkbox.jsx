import { Component } from 'preact'

export default class DebugCheckbox extends Component {
    /**
     * @param props {value, ntkey, putValueNT}
     */
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value
        }
    }

    updateValue() {
        this.setState({value: !this.state.value})
    }

    updateNT() {
        this.props.putValueNT(this.props.ntkey, this.state.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        const propsValuesHaveChanged = this.props.nt[this.props.ntkey] != nextProps.nt[this.props.ntkey]
        const stateIsBeingUpdated = this.state.value != nextState.value
        
        const stateIsDifferentFromProps = this.state.value != nextProps.nt[this.props.ntkey]

        if((propsValuesHaveChanged || stateIsDifferentFromProps) && !stateIsBeingUpdated) this.updateValue(nextProps.nt[this.props.ntkey])
    }

    render() {
        return (
            <input type="checkbox" className="rounded-sm border-black bg-orange" onInput={() => this.updateValue()} onChange={() => this.updateNT()} checked={this.state.value}/>
        )
    }
}