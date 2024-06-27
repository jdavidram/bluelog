import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import './Analyst.scss';

function Analyst() {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();  // Definir navigate

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                complete: (results) => {
                    setTableData(results.data);
                },
                header: true,
            });
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
                <button className="action-button" onClick={() => navigate('/config')}>Configuración</button>
            </div>
        </div>
    );
}

export { Analyst };
