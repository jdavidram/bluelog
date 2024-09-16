import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom'; // Para obtener el folderId
import axios from 'axios'; // Asegúrate de tener axios importado para hacer las peticiones al backend

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const Graphics = () => {
  const [chartData, setChartData] = useState(null);
  const { folderId } = useParams(); // Obtener el folderId desde la URL

  useEffect(() => {
    const loadCSV = async () => {
      if (folderId) {
        try {
          const response = await axios.get(`http://localhost:5000/get_csv/${folderId}`);
          const { csv_data } = response.data;
          console.log('Datos CSV recibidos:', csv_data);  // Verifica la estructura de los datos
          
          if (csv_data && Array.isArray(csv_data)) {
            const labels = [];
            const values = [];
            csv_data.forEach((row, index) => {
              if (index > 0) {
                labels.push(row[0]);
                values.push(parseFloat(row[3]));
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
          } else {
            console.error('Los datos CSV no son válidos');
          }
        } catch (error) {
          console.error('Error al cargar los datos del CSV:', error);
        }
      }
    };

    loadCSV();
  }, [folderId]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>
      <div style={{ width: '80%', maxWidth: '800px', height: '80%' }}>
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Tiempo horario [h]',
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Profundidad [m]',
                  },
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
        ) : (
          <p>No hay datos para mostrar</p>
        )}
      </div>
    </div>
  );
};

export { Graphics };
