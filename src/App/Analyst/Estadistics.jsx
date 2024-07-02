import React, { useState } from 'react';
import './Estadistics.scss';

function Estadistics() {
    const [statistics, setStatistics] = useState(null);

    const handleActionClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/do-something-with-csv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                const statisticsData = await response.json();
                setStatistics(statisticsData);
                alert('Acción completada con éxito');
            } else {
                alert('Error al realizar la acción');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al comunicarse con el servidor');
        }
    };

    const renderTable = (data) => {
        const keys = Object.keys(data);
        const columns = Object.keys(data[keys[0]]);

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Statistic</th>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {keys.map((key, index) => (
                        <tr key={index}>
                            <td>{key}</td>
                            {columns.map((column, idx) => (
                                <td key={idx}>{data[key][column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <button className="action-button" onClick={handleActionClick}>
                Calcular los estadisticos
            </button>
            {statistics && (
                <>
                    <h2>Estadísticas Generadas:</h2>
                    {renderTable(statistics)}
                </>
            )}
        </div>
    );
}

export { Estadistics };
