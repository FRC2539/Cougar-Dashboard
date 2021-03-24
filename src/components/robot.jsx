import { Component } from "preact" 
// import "../libraries/p5.min.js"

export default class Robot extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="shadow row-span-3 col-span-6 bg-orange rounded-lg p-2 mt-3 mb-3">
                robot
            </div>
        )
    }
}