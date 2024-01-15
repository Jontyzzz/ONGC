import React from 'react'
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, defaults } from "chart.js/auto";
// utility start //

const ChartComponent = (chartType, chartData, chartOptions) => {
    switch (chartType) {
        case 'bar':
            return <Bar data={chartData} options={chartOptions} />;
        case 'line':
            return <Line data={chartData} options={chartOptions} />;
        case 'doughnut':
            return <Doughnut data={chartData} options={chartOptions} />;
        case 'pie': 
            return <Pie data={chartData} />; 
        default:
            return null;
    }
}
defaults.maintainAspectRatio = true;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
// utilites end//
// component start //
function Chart(props) {
    return (
        <div>
                {ChartComponent(props.chartType,props.data,props.options)}
        </div>
    )
}
//component end //
export default Chart
