import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartContext } from "../../pages/dashboard/charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VertBarChart({ title, info }) {
  const { chartInfo } = useContext(ChartContext);
  const [options, setOptions] = useState(null);
  const [data, setData] = useState(null);
  //   const [show, setShow] = useState(false);
  useEffect(() => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: title,
          //   color: "white",
          font: {
            size: 20,
          },
        },
      },
    };
    const data = {
      labels: info.labels,
      datasets: [
        {
          label: "totales",
          data: info.totals,
          backgroundColor: "#03919b",
        },
      ],
    };
    setData(data);
    setOptions(options);
  }, [, chartInfo]);
  return <>{options && data && <Bar options={options} data={data} />}</>;
}

export default VertBarChart;
