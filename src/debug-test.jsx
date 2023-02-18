import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Component } from "preact";
import { useState } from "react";
import DebugHeader from "./components/debug-header";
import DebugSidebar from "./components/debug-sidebar";
import DebugViewer from "./components/debug-viewer";

export default class DebugTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
        };
    }

    render() {
        const [activeId, setActiveId] = useState(null)
        const [droppedKey, setDroppedKey] = useState(null)

        const handleDragStart = (event) => {
            setActiveId(event.active.id)
        }

        const handleDragEnd = (event) => {
            setActiveId(null)
            setDroppedKey(event.active.id)
        }
        const overlayStyle = {
            borderStyle: 'dashed',
            borderWidth: '1px' ,
            padding:' 0.25rem'
        } 

        return (
            <div className="grid grid-cols-4 gap-2 w-full max-h-full h-screen bg-gray text-black p-4">
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <DragOverlay>
                        {activeId && (
                          <>
                            <p style={overlayStyle}>{activeId}</p>
                          </>
                        ) }
                    </DragOverlay>
                    <DebugSidebar ntMap={this.props.ntMap} nt={this.props.nt} />
                    <DebugViewer ntMap={this.props.ntMap} nt={this.props.nt} putValueNt={this.props.putValueNt} activeKey={droppedKey} timestamp={this.props.timestamp}/>
                </DndContext>
            </div>
        )
    }
}