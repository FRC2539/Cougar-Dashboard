import { Component } from "preact"

/**
 * A header for keys from the network table on the debug page.
 */
export default class DebugHeader extends Component {
    /**
     * @param props Props should contain a map with network table key value pairs (`data`).
     *              Props should also contain the name of the header (`title`)
     */
    constructor(props) {
        super(props)

        this.state = {collapsed: true}
    }

    toggleCollapse() {
        this.setState({collapsed: !this.state.collapsed})
    }

    render({ data, title }) {
        const infoHTML = []

        // Generate the text for each value in the data
        for(const [key, value] of data) {
            infoHTML.push(<p>{key}: {JSON.stringify(value)}</p>)
        }

        return (
            <div className="bg-orange p-2 mx-2 shadow rounded-lg">
                <a onClick={() => this.toggleCollapse()} className="text-xl cursor-pointer"><strong>{title}</strong></a>
                <div className={this.state.collapsed ? "hidden" : "block"}>
                    {infoHTML}
                </div>
            </div>
        )
    }
}