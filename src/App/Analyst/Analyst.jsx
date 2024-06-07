import React, { useState } from 'react';
import Papa from 'papaparse';
import './Analyst.scss';

function Analyst() {
    const [tableData, setTableData] = useState([]);

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
            )}
        </div>
    );
}

export {Analyst} ;
