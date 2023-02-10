import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartProps = {
  color: string,
  borderColor: string,
  stats: [number,number,number,number,number,number]
}

export default function BarChart({color, borderColor, stats}:BarChartProps) {
  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pokemon stats',
      },
    },
  };
  const labels = ['HP', 'Attack', 'Defense', 'Special-Attck', 'Special-Defense', 'Speed'];
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: stats,
        backgroundColor: color,
        borderColor: borderColor,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
