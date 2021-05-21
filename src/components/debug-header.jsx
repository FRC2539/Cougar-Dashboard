import { Component } from "preact"
import DebugInput from "./debug-input"
import DebugCheckbox from "./debug-checkbox"
import DebugObject from "./debug-object"

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
            const ntkey = `/${title}/${key}`

            const commonClasses = "mb-1 w-full flex flex-row justify-between flex-wrap"

            // const getValue = () => this.props.ntMap.get(title).get(key)

            switch(typeof value) {
                case "string": {
                    infoHTML.push(<p className={commonClasses}>{key}: <DebugInput type={"text"} title={title} key={key} value={value} ntkey={ntkey} putValueNT={this.props.putValueNT} nt={this.props.nt} ntMap={this.props.ntMap}/></p>)
                    break
                }
                case "number": {
                    infoHTML.push(<p className={commonClasses}>{key}: <DebugInput type={"number"} title={title} key={key} value={value} ntkey={ntkey} putValueNT={this.props.putValueNT} nt={this.props.nt} ntMap={this.props.ntMap}/></p>)
                    break
                }
                case "boolean": {
                    infoHTML.push(<p className={commonClasses}>{key}: <DebugCheckbox title={title} key={key} value={value} ntkey={ntkey} putValueNT={this.props.putValueNT} nt={this.props.nt} ntMap={this.props.ntMap}/></p>)
                    break
                }
                case "object": {
                    infoHTML.push(<p className={commonClasses}>{key}: <DebugObject title={title} key={key} value={value} ntkey={ntkey} putValueNT={this.props.putValueNT} nt={this.props.nt} ntMap={this.props.ntMap}/></p>)
                    break
                }
                default: {
                    infoHTML.push(<p className={commonClasses}>{key}: {JSON.stringify(value)}</p>)
                    break
                }
            }
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