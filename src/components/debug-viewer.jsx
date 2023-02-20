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
        const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
        const style = isOver ? { borderStyle: 'dashed', borderWidth: 'medium' } : undefined
        const value = props.nt[props.activeKeys[0]]

        const datasets = []

    for (const key of props.activeKeys) {
        datasets.push(
            {
                label: key,
                data: [1, 2, 3, 4, 5],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        )
    }

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
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

        return (
            <div ref={setNodeRef} style={style} className="col-span-3 shadow bg-orange rounded-lg p-2">
                <h2 className="font-main text-lg font-medium tracking-wider mb-0.5">Viewer</h2>
                <hr />
                {props.activeKeys}
                <br />
                {value != undefined && String(value)}
                <Line options={options} data={data}/>
                {isOver && (<div className="text-center"><p className="text-center text-3xl">Drop key</p></div>)}
            </div>
        )
    }