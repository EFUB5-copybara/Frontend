import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineGraph({ data }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const labels = ['1주차', '2주차', '3주차', '4주차', '5주차'];
  
  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: '#A97B50',
        backgroundColor: '#A97B50',
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#A97B50',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2.5,
        tension: 0.1,
        z: 10,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2, // 더 선명한 렌더링을 위해 추가
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 10
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...data) + 20, // 데이터 최대값에 여유 공간 추가
        border: {
          display: false,
        },
        ticks: {
          color: '#D8C4B1',
          font: {
            family: 'Pretendard',
            size: 10,
            weight: 300,
          },
          padding: 10,
          callback: function(value) {
            return value + '자';
          },
          stepSize: 20,
        },
        grid: {
          color: 'rgba(216, 196, 177, 0.5)',
          lineWidth: 0.5,
          z: 1,
          drawTicks: false,
        },
      },
      x: {
        border: {
          display: false,
        },
        ticks: {
          color: '#AF8F6F',
          font: {
            family: 'Pretendard',
            size: 10,
            weight: 500,
          },
          padding: 8,
        },
        grid: {
          display: false,
        },
      },
    },
    onHover: (event, elements) => {
      if (elements && elements.length) {
        setHoveredPoint(elements[0].index);
      } else {
        setHoveredPoint(null);
      }
    }
  };

  return (
    <GraphContainer>
      <ChartWrapper>
        <ChartContainer>
          <Line data={chartData} options={options} />
        </ChartContainer>
        {data.map((value, index) => (
          <StaticDataLabel
            key={index}
            style={{
              left: `${(index / (labels.length - 1)) * 100}%`,
              top: `calc(${100 - ((value / (Math.max(...data) + 20)) * 100)}% - 16px)`,
              opacity: hoveredPoint === index ? '1' : '0'
            }}
          >
            {value}자
          </StaticDataLabel>
        ))}
      </ChartWrapper>
    </GraphContainer>
  );
}

const GraphContainer = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  z-index: 2;
`;

const StaticDataLabel = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: white;
  color: ${({ theme }) => theme.colors.brown1};
  font-family: ${({ theme }) => theme.fonts.c12M};
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.brown3};
  transition: opacity 0.2s ease;
  pointer-events: none;
  z-index: 10;
`;

export default LineGraph;