import { Component } from 'preact'

export default class DebugObject extends Component {
    /**
     * @param props {value, ntkey, putValueNT}
     */
    constructor(props) {
        super(props)

        this.state = {
            value: JSON.stringify(this.props.value),
            lastProps: JSON.stringify(this.props.value)
        }
    }

    updateValue(newValue) {
        // Prevent the user from entering invalid objects
        try {
            // const json = JSON.parse(newValue)

            this.setState({value: newValue})
        } catch (e) {
            return
        }
    }

    shouldComponentUpdate(nextProps) {
        const propsValuesHaveChanged = JSON.stringify(nextProps.nt[this.props.ntkey]) != this.state.lastProps
        const propsValuesWillChange = JSON.stringify(this.props.nt[this.props.ntkey]) != JSON.stringify(nextProps.nt[this.props.ntkey])

        if(propsValuesHaveChanged) { // Accounts for when the debug page is left and returned to
            this.updateValue(JSON.stringify(nextProps.nt[this.props.ntkey]))
            this.setState({lastProps: JSON.stringify(nextProps.nt[this.props.ntkey])})
        }
        else if(propsValuesWillChange) this.updateValue(JSON.stringify(nextProps.nt[this.props.ntkey]))
    }

    updateNT() {
        this.props.putValueNT(this.props.ntkey, JSON.parse(this.state.value))
    }

    render() {
        // const json = JSON.stringify(this.state.value)

        return (
            <input style={{width: "130px"}} type="text" className="px-1 py-0 rounded-sm border-black bg-orange" onInput={(e) => this.updateValue(e.target.value)} onChange={() => this.updateNT()} value={this.state.value}/>
        )
    }
}