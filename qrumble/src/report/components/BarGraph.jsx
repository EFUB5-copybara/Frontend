import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarGraph({ data }) {
  const labels = ['일', '월', '화', '수', '목', '금', '토'];

  // 목요일(index 2)만 다른 색상으로 설정
  const barColors = data.map((_, index) =>
    index === 2 ? '#FF5B5B' : '#A97B50'
  );
  
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: barColors,
        borderRadius: 5,
        maxBarThickness: 25,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#A97B50',
        bodyColor: '#A97B50',
        bodyFont: {
          family: 'Pretendard',
          size: 12,
        },
        padding: 10,
        boxPadding: 5,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.raw}회`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...data, 5),
        ticks: {
          color: '#A97B50',
          font: {
            family: 'Pretendard',
            size: 10,
          },
          callback: function(value) {
            return value + '회';
          },
          stepSize: 1,
        },
        grid: {
          color: 'rgba(169, 123, 80, 0.1)',
        }
      },
      x: {
        ticks: {
          color: '#A97B50',
          font: {
            family: 'Pretendard',
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
      <ChartContainer>
        <Bar data={chartData} options={options} />
      </ChartContainer>  );
}

const ChartContainer = styled.div`
  height: 200/px;
  width: 100%;
  padding: 10px;
`;

export default BarGraph;