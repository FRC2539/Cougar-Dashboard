import { Component } from "preact"

export default class Debug extends Component {
    constructor(props) {
        super(props)

        this.state = {search: ""}

        // this.headings = new Set()

        // for(const [key, value] of Object.entries(this.props.nt)) {
        //     if(!this.headings.has(this.getHeading(key))) {
        //         this.headings.put(this.getHeading(key))
        //     }
        // }

        // console.log(this.headings)
    }

    getHeading(key) {
        let path = key.split("/")
        return path[1]
    }

    updateSearch(e) {
        this.setState({search: e.target.value})
    }

    mapToHTML() {
        const sortedNt = Object.entries(this.props.nt).map(([key, value]) => key).sort(this.compareStrings)
        const filteredNt = sortedNt.filter((key) => key.toLowerCase().includes(this.state.search.toLowerCase()))
        return filteredNt.map((key) => <p>{key} : <span className="font-bold">{this.props.nt[key]}</span></p>);
    }

    compareStrings(a, b) {
        return a > b ? 1 : (b > a ? -1 : 0)
    }

    render() {
        return (
            <div className="grid grid-cols-1 gap-y-2 mx-2 mt-3">
                {/* <img src="http://10.25.39.11:5800" /> */}
                <input type="text" onInput={this.updateSearch.bind(this)}/>
                {this.mapToHTML()}
            </div>
        )
    }
}