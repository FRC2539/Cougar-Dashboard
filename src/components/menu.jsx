import { Component } from "preact"

export default class Menu extends Component {
    /**
     * @param props Consists of currentPage, pages, setPage(page)
     */
    constructor(props) {
        super(props)

        this.state = {
            collapsed: true,

            props: props
        }
      
    }

    wrapAround(num, arrayLength) {
        if (num < 0) return arrayLength - 1
        else if (num >= arrayLength) return 0
        else return num
    }

    render({currentPage, pages, setPage}) {
        return (
            <div className="fixed top-2 right-3">
        
                <div className={!this.state.collapsed ? "hidden" : "block"}>
                    <a onClick={() => this.setState({collapsed: false})} className="cursor-pointer">
                        <svg viewBox="0 0 100 80" width="30" height="30" fill="white" className="shadow-svg">
                            <rect width="100" height="18" rx="10"></rect>
                            <rect y="30" width="100" height="18" rx="10"></rect> 
                            <rect y="60" width="100" height="18" rx="10"></rect>
                            <rect y="90" width="100" height="18" rx="10"></rect>
                        </svg> 
                    </a>
                </div>
                <div className={"px-2 bg-orange rounded-lg relative shadow-svg " + (this.state.collapsed ? "hidden" : "block")} style={{width: "90px"}}>
                    <a onClick={() => this.setState({collapsed: true})} className="cursor-pointer absolute top-1 right-1">
                        <svg width="1rem" height="1rem" viewBox="0 0 329.26933 329" fill="white">
                            <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
                        </svg>
                    </a>
                    <ul className="unstyled-list color-white">
                        {pages.map(page => {
                            return <li><a className={"cursor-pointer " + (currentPage == page ? "font-bold" : "font-normal")} onClick={() => setPage(page)}>{this.capitalize(page)}</a></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }

    capitalize(string) {
        const wordArray = string.split(" ")
        const capitalizedArray = wordArray.map(word => word.slice(0, 1).toUpperCase() + word.slice(1))

        return capitalizedArray.join(" ")
    }
}