import { Component } from "preact"

export default class Field extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="flex items-center justify-center h-screen">
                
                <svg viewBox="0 0 16.4846 8.1026" className="w-4/6 max-h-3/4">
                    <rect style="fill:black;" width="16.4846" height="8.1026"/>
                    <circle stroke="white" stroke-width=".05" cx="8.2423" cy="4.0513" r=".5"/>
                    <rect stroke="white" stroke-width=".07" x="4" y="2.5" height=".5" width=".5"/>
                </svg>

            </div>
        )
    }
}