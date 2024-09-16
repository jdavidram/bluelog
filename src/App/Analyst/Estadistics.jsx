import React, { useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Estadistics.scss';

function Estadistics() {
    const [statistics, setStatistics] = useState(null);
    const { folderId } = useParams();  // Obtener el folderId desde la URL

    const handleActionClick = async () => {
        try {
            // Hacer una solicitud POST con el folderId
            const response = await axios.post(`http://localhost:5000/estadistics/${folderId}`);

            // La respuesta JSON está en response.data
            setStatistics(response.data);
            alert('Estadísticas generadas con éxito');
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
                        <th>Estadísticas</th>
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
        <div id='juanda'>
            <button className="action-buttonon" onClick={handleActionClick}>
                Calcular las estadísticas
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
