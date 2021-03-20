import { Component } from "preact"

import Limelight from "./components/limelight"

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="grid grid-cols-3 w-full h-full bg-gray text-black">
                <div className="col-span-2">
                    <p>Home</p>
                </div>
                <div className="col-span-1 flex flex-col justify-between p-3">
                    <Limelight nt={this.props.nt}/>
                    <p>Hi</p>
                </div>
            </div>
        )
    }
}