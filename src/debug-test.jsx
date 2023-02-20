import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Component } from "preact";
import { useState } from "react";
import DebugHeader from "./components/debug-header";
import DebugSidebar from "./components/debug-sidebar";
import DebugViewer from "./components/debug-viewer";

export default (props) => {
    const [activeId, setActiveId] = useState(null)
    const [droppedKeys, setDroppedKeys] = useState([])

    const handleDragStart = (event) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = (event) => {
        setActiveId(null)
        droppedKeys.push(event.active.id)
        console.log(droppedKeys)
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
                    <DebugSidebar ntMap={props.ntMap} nt={props.nt} />
                    <DebugViewer ntMap={props.ntMap} nt={props.nt} putValueNt={props.putValueNt} activeKeys={droppedKeys}/>
                </DndContext>
            </div>
        )
    
}