import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import "./css/Chart1.css";

function PolarAreaChart() {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = new Chart(chartRef.current, {
                type: 'polarArea',
                data: {
                    labels: ['Red', 'Green', 'Blue', 'Yellow', 'Grey'],
                    datasets: [{
                        label: 'My Dataset',
                        data: [11, 16, 7, 18, 14],
                        backgroundColor: [
                            'rgba(255,99,132,0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(201, 203, 207, 0.8)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 206, 86)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    }
                }
            });

            return () => chart.destroy();
        }
    }, []);

    return (
        <div className="card2">
            <p>Total des émissions de carbone : kg</p>
            <canvas
                ref={chartRef}
                id="carbonChart"
                width="400"
                height="200"
                aria-label="Hello ARIA World"
                role="img"
            ></canvas>
        </div>
    );
}

export default PolarAreaChart;