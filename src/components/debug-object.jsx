import { Component } from 'preact'

export default class DebugObject extends Component {
    /**
     * @param props {value, ntkey, putValueNT}
     */
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value
        }
    }

    updateValue(newValue) {
        // Prevent the user from entering invalid objects
        try {
            const json = JSON.parse(newValue)

            this.setState({value: json})
        } catch (e) {
            return
        }
    }

    updateNT() {
        this.props.putValueNT(this.props.ntkey, this.state.value)
    }

    render() {
        const json = JSON.stringify(this.state.value)

        return (
            <input type="text" className="px-1 py-0 rounded-sm border-black bg-orange" onInput={(e) => this.updateValue(e.target.value)} onChange={() => this.updateNT()} value={json}/>
        )
    }
}