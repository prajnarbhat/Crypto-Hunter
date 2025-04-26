import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

// REGISTER CHART.JS MODULES
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartData = ({ historyData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (historyData && Array.isArray(historyData.prices) && 
         historyData.prices.length > 0) {
      const labels = historyData.prices.map((item) =>
        new Date(item[0]).toLocaleDateString()
      );
      const data = historyData.prices.map((item) => item[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: "Prices",
            data,
            borderColor: "rgba(75, 192, 192, 1)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    }
  }, [historyData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Line Chart Example" },
    },
  };

  if (!chartData) return <div>Loading chart data...</div>;

  return (
    <div className="w-full h-[400px] md:h-[500px]">
        <Line options={options} data={chartData} />
    </div>
  )
};

export default LineChartData;
