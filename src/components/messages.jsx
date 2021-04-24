import { Component } from "preact"

export default class Messages extends Component {
    constructor(props) {
        super(props)

        this.messagesKey = "/Dashboard/Messages"
    }

    render() {
        return (
            <div className="shadow row-span-2 col-span-6 bg-orange rounded-lg p-2 mb-1">
                <h2 className="font-main text-lg font-light tracking-wider mb-0.5">Messages</h2>
                <hr />
                <div className="h-24 overflow-y-scroll">
                    {this.messagesKey in this.props.nt ? this.props.nt[this.messagesKey].map(val => <div>{val}</div>) : ""}
                </div>
            </div>
        )
    }
}