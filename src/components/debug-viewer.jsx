import { useDroppable } from "@dnd-kit/core";
import { Component } from "preact";

export default class DebugViewer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
        const style = isOver ? { borderStyle: 'dashed', borderWidth: 'medium' } : undefined
        const value = this.props.nt[this.props.activeKey]

        console.log(this.props.nt)
        return (
            <div ref={setNodeRef} style={style} className="col-span-3 shadow bg-orange rounded-lg p-2">
                <h2 className="font-main text-lg font-medium tracking-wider mb-0.5">Viewer</h2>
                <hr />
                {this.props.activeKey}
                <br />
                {String(value)}
                {isOver && (<div className="text-center"><p className="text-center text-3xl">Drop key</p></div>)}
            </div>
        )
    }
}