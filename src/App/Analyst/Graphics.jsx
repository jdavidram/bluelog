import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Graphics = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadCSV = async () => {
      const response = await fetch('./example.csv');
      const text = await response.text();
      const data = text.split('\n').map(row => row.split(','));

      const labels = [];
      const values = [];

      data.forEach((row, index) => {
        if (index > 0) {
          labels.push(row[0]);
          values.push(parseFloat(row[2]));
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

    loadCSV();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>
      <div style={{ width: '80%', maxWidth: '800px', height: '80%' }}>
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