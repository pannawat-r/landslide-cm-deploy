'use client'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);

export const BarChart = (props) => {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: "ปริมาณน้ำฝนรายสถานี (มม.)",
                data: props.data,
                borderWidth: 1,
            }],
    }
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }
    return (
        <div className="w-full">
            <Bar data={data} options={options} />
        </div>
    )
}