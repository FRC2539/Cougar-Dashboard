import { Component } from 'preact'

export default class DebugInput extends Component {
    /**
     * @param props {value, ntkey, putValueNT}
     */
    constructor(props) {
        super(props)

        // TODO
        // Receive ntkey from higher up, probably from the header, which can generate it
        // There needs to be one for booleans too
    }

    render() {
        return (
            <div></div>
        )
    }
}