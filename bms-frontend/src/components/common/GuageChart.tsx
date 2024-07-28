import { Chart, ChartData, ArcElement } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
Chart.register(ArcElement);

export const GaugeChart = ({ value }: { value: number }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    // const rotation = (value / 100) * 180 + 45;

    const data: ChartData<"doughnut", number[], unknown> = {
        labels: ['Spent', 'Remaining'],
        datasets: [
            {
                data: [100 - value, value],
                backgroundColor: [
                    '#ECEFFC',
                    '#3A5AFE',
                ],
                borderColor: [
                    '#ECEFFC',
                    '#ECEFFC',
                ],
                borderWidth: 1,
            },
        ],
    };

    const doughnutLabel = {
        id: 'doughnutLabel',
        afterDatasetsDraw: (chart: Chart<'doughnut'>, args: any, plugins: any) => {
            const { ctx, data } = chart;

            const centerX = chart.getDatasetMeta(0).data[1].x;
            const centerY = chart.getDatasetMeta(0).data[1].y;

            //text
            ctx.save();
            ctx.font = 'bold 15px Montserrat';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${data.datasets[0].data[1]}%`, centerX, centerY);
        },
    }

    const options = {
        aspectRatio: 1.7,
    };

    return (
        <Doughnut data={data} options={options} plugins={[doughnutLabel]} />
    )

};