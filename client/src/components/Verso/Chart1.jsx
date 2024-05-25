import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import "./css/Chart1.css";

function Chart1() {
    const chartRef = useRef(null);

    const data1 = (canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke1 = ctx.createLinearGradient(0, 180, 0, 20);
        gradientStroke1.addColorStop(1, "rgba(175,0,200,0.7)");
        gradientStroke1.addColorStop(0.4, "rgba(175,0,200,0.7)");
        gradientStroke1.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
            datasets: [
                {
                    label: "Dataset 1",
                    fill: true,
                    backgroundColor: gradientStroke1,
                    borderColor: "#af00c8",
                    borderWidth: 1,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: "#af00c8",
                    pointBorderColor: "rgba(255,255,255,0)",
                    pointHoverBackgroundColor: "#af00c8",
                    pointBorderWidth: 20,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 15,
                    pointRadius: 2,
                    data: [1000, 10000, 1000, 100, 5000, 100, 100, 100, 10078, 100, 110, 100],
                },
            ],
        };
    };

    const data2 = (canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke2 = ctx.createLinearGradient(0, 180, 0, 20);

        gradientStroke2.addColorStop(1, "rgba(0,40,200,0.69)");
        gradientStroke2.addColorStop(0.2, "rgba(0,40,200,0.66)");
        gradientStroke2.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
            datasets: [
                {
                    label: "Dataset 2",
                    fill: true,
                    backgroundColor: gradientStroke2,
                    borderColor: "#0028c8",
                    borderWidth: 1,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: "#0028c8",
                    pointBorderColor: "rgba(255,255,255,0)",
                    pointHoverBackgroundColor: "#0028c8",
                    pointBorderWidth: 20,
                    pointHoverRadius: 6,
                    pointHoverBorderWidth: 15,
                    pointRadius: 2,
                    data: [100, 4000, 8000, 4000, 5000, 1000, 5000, 3000, 10078, 100, 1110, 100],
                },
            ],
        };
    };

    useEffect(() => {
        if (chartRef.current) {
            const chart = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: [
                        "JAN",
                        "FEB",
                        "MAR",
                        "APR",
                        "MAY",
                        "JUN",
                        "JUL",
                        "AUG",
                        "SEP",
                        "OCT",
                        "NOV",
                        "DEC",
                    ],
                    datasets: [data1(chartRef.current).datasets[0], data2(chartRef.current).datasets[0]]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            return () => chart.destroy();
        }
    }, []);

    return (
        <>
            <div className="card2">
                <p>Total des émissions de carbone :  kg</p>
                <canvas
                    ref={chartRef}
                    id="carbonChart"
                    width="400"
                    height="200"
                    aria-label="Hello ARIA World"
                    role="img"
                ></canvas>
            </div>
        </>
    );
}

export default Chart1;