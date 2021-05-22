import { Component } from 'preact'

export default class DebugInput extends Component {
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
        if(this.props.type == "number" && typeof parseInt(this.state.value) != "number") return

        this.props.putValueNT(this.props.ntkey, this.state.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Problem!
        // Basically, you can't change the text in the input without it immediately changing it back.
        // Notes: Stateisbeingupdated returns true before state is changed, and false after.
        // That means it returns false the iteration before it needs to
        // Not sure what the solution. Might need to play around with the logic.

        const propsValuesHaveChanged = this.props.nt[this.props.ntkey] != nextProps.nt[this.props.ntkey]
        const stateIsBeingUpdated = this.state.value != nextState.value
        
        const stateIsDifferentFromProps = this.state.value != nextProps.nt[this.props.ntkey]

        if((propsValuesHaveChanged || stateIsDifferentFromProps) && !stateIsBeingUpdated) this.updateValue(nextProps.nt[this.props.ntkey])
    }

    render() {
        return (
            <input style={{width: "130px"}} type={this.props.type} className="px-1 py-0 rounded-sm border-black bg-orange" onInput={(e) => this.updateValue(e.target.value)} onChange={() => this.updateNT()} value={this.state.value}/>
        )
    }
}