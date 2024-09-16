import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Papa from 'papaparse';
import './Analyst.scss';
import axios from 'axios';

function Analyst() {
    const { folderId } = useParams();  // Obtener el folderId desde la URL
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();  
    console.log('Folder ID:', folderId);

    // Cargar los datos del CSV del backend al inicio
    useEffect(() => {
        if (folderId) {
            axios.get(`http://localhost:5000/get_csv/${folderId}`)
                .then(response => {
                    const { csv_data } = response.data;
                    // Verifica si los datos son un arreglo antes de intentar usarlos
                    if (Array.isArray(csv_data)) {
                        setTableData(csv_data);
                    } else {
                        console.error("Los datos CSV no son un arreglo");
                        setTableData([]); // Asegura que sea un arreglo vacío en caso de error
                    }
                })
                .catch(error => {
                    console.error("Error al cargar los datos del CSV:", error);
                });
        }
    }, [folderId]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && folderId) {
            Papa.parse(file, {
                complete: (results) => {
                    const data = results.data;
                    // Verifica si el resultado de la lectura es un arreglo
                    if (Array.isArray(data)) {
                        setTableData(data);
                        uploadFile(file);  // Enviar el archivo al backend
                    } else {
                        console.error("El archivo CSV no contiene un arreglo válido de datos");
                    }
                },
                header: true,
            });
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:5000/upload_csv/${folderId}`, formData);
            if (response.status === 200) {
                alert('Archivo CSV subido con éxito');
            }
        } catch (error) {
            console.error('Error al subir el archivo:', error);
        }
    };

    return (
        <div className="analyst-container">
            <input
                type="file"
                id="csvInput"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button
                className="upload-button"
                onClick={() => document.getElementById('csvInput').click()}
            >
                +
            </button>
            {Array.isArray(tableData) && tableData.length > 0 ? (
                <div className="csv-table-container">
                    <table className="csv-table">
                        <thead>
                            <tr>
                                {Object.keys(tableData[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No hay datos disponibles</p>
            )}
            <div className="button-container">
                <button className="action-button" onClick={() => navigate(`/estadistics/${folderId}`)}>Estadísticos</button>
                <button className="action-button" onClick={() => navigate(`/graphics/${folderId}`)}>Gráficos</button>
                <button className="action-button" onClick={() => navigate('/set')}>Configuración</button>
            </div>
        </div>
    );
}

export { Analyst };
