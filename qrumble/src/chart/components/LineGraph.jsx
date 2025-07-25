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

function LineGraph({ data, title = "글자수" }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const labels = ['1주차', '2주차', '3주차', '4주차', '5주차'];
  
  // Find the highest value for label positioning
  const highestValue = Math.max(...data);
  const highestIndex = data.indexOf(highestValue);

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
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        border: {
          display: false,
        },
        ticks: {
          color: '#D8C4B1',
          font: {
            family: 'Pretendard',
            size: 12,
            weight: 300,
          },
          padding: 10,
          callback: function(value) {
            return value + '자';
          },
          count: 6,
          stepSize: 20,
        },
        grid: {
          color: '#D8C4B1',
          lineWidth: 1,
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
            size: 12,
            weight: 500,
          },
          padding: 8,
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        z: 20,
      }
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
        {hoveredPoint && (
          <DataLabel
            style={{
              left: `${(hoveredPoint / (labels.length - 1)) * 100}%`,
              top: `calc(${100 - ((data[hoveredPoint] / 100) * 100)}% - 20px)`
            }}
          >
            {data[hoveredPoint]}자
          </DataLabel>
        )}
      </ChartWrapper>
    </GraphContainer>
  );
}

const GraphContainer = styled.div`
  width: 293px;
  height: 159px;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 159px;
  width: 293px;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  z-index: 2;
`;

const DataLabel = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: white;
  color: ${({ theme }) => theme.colors.brown3};
  font-family: ${({ theme }) => theme.fonts.c12L};
  gap: 6px;
  pointer-events: none;
`;

export default LineGraph;