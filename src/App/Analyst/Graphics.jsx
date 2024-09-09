import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Graphics = () => {
  const [chartData, setChartData] = useState(null);

  const handleFileLoaded = (data) => {
    const labels = [];
    const values = [];

    data.forEach((row, index) => {
      if (index > 0) {
        labels.push(row[0]);
        values.push(parseFloat(row[1]));
      }
    });

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Profundidad en el tiempo',
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>
      <div style={{ width: '80%', maxWidth: '800px', height: '80%' }}>
        <CSVReader onFileLoaded={handleFileLoaded} />

        {chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                  },
                },
                y: {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                },
              },
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.dataset.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed.y !== null) {
                        label += context.parsed.y.toFixed(2);
                      }
                      return label;
                    },
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export { Graphics };
