import { useDroppable } from "@dnd-kit/core";
import { Component } from "preact";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const labels = []
let increment = 0

while (increment <= 1000) {
    labels.push(increment)
    increment++
}


export default (props) => {
    const [theData, setTheData] = useState(new Map());

    const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
    const style = isOver ? { borderStyle: 'dashed', borderWidth: 'medium' } : undefined

    /**
     * Item structure
     * {
     *  name: string,
     *  values: int[]
     * }
     */


    const datasets = []

    for (const key of props.activeKeys) {
        const exists = theData.get(key)
        if (!exists) {
            theData.set(key, {
                name: key,
                values: [props.nt[key]]
            });
        } else {
            exists.values.push(props.nt[key])
        }
    }

    for (const [key, value] of theData.entries()) {
        datasets.push(
            {
                label: value.name,
                data: value.values,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        )
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Epic Line Chart',
            },
        },
    }

    const data = {
        labels: labels,
        datasets: datasets
    };
    console.log(theData);
    return (
        <div ref={setNodeRef} style={style} className="col-span-3 shadow bg-orange rounded-lg p-2">
            <h2 className="font-main text-lg font-medium tracking-wider mb-0.5">Viewer</h2>
            <hr />
            {props.activeKeys}
            <br />
            <Line options={options} data={data} />
            {isOver && (<div className="text-center"><p className="text-center text-3xl">Drop key</p></div>)}
        </div>
    )
}