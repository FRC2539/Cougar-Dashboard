import { Component } from "preact";

export default class App extends Component {

    constructor() {
        super()
        this.state = { contents: "not yet" }
    }


    async componentDidMount() {
        let directoryContents = await window.api.listDirectory('/')
        this.setState({
            contents: directoryContents
        });
        console.log(this.state)
    }

    render() {


        return (
            <div className="text-center text-white">
                <p>Fancy log downloader popup window</p>
                {this.state.contents}
            </div>
        )
    }
}