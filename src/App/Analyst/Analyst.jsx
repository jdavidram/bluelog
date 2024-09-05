import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import './Analyst.scss';

function Analyst() {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();  // Definir navigate

    
    // Cargar los datos del archivo CSV desde localStorage al inicio
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('csvData'));
        if (storedData) {
            setTableData(storedData);
        }
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                complete: (results) => {
                    const data = results.data;
                    setTableData(data);
                    // Guardar los datos del archivo CSV en localStorage
                    localStorage.setItem('csvData', JSON.stringify(data));
                    uploadFile(file);  // Llamar a la función para enviar el archivo
                },
                header: true,
            });
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File uploaded successfully');
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
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
            {tableData.length > 0 && (
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
            )}
            <div className="button-container">
                <button className="action-button" onClick={() => navigate('/estadistics')}>Estadísticos</button>
                <button className="action-button" onClick={() => navigate('/graphics')}>Gráficos</button>
                <button className="action-button" onClick={() => navigate('/set')}>Configuración</button>
            </div>
        </div>
    );
}

export { Analyst };
