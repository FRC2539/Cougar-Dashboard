import { Component } from "preact"

export default class Console extends Component {
    constructor(props) {
        super(props)

        this.messages = "/Messages/messages"
    }

    render() {
        return (
            <div className="grid w-full max-h-full h-full bg-gray text-black p-4">
                <div className="shadow bg-orange rounded-lg p-2">
                    <h2 className="font-main text-lg font-medium tracking-wider mb-0.5">Messages</h2>
                    <hr />
                    <div className="absolute top-14 bottom-5 left-10 right-10 overflow-y-scroll">
                        {this.messages in this.props.nt ? this.props.nt[this.messages].map(val => <div>{val}</div>) : ""}
                    </div>
                </div>
            </div>
        )
    }  
}