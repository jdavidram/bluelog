import React, { useState } from 'react';
import './Bluetooth.scss'; // Importa el archivo SCSS

function Bluetooth() {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState(null);

    const handleScan = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: ['battery_service']
            });

            setDevices(prevDevices => [...prevDevices, device]);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bluetooth-container">
            <button className="scan-button" onClick={handleScan}>Buscar dispositivos</button>
            {error && <p>Error: {error}</p>}
            <ul>
                {devices.map((device, index) => (
                    <li key={index}>{device.name || `Device ${index + 1}`}</li>
                ))}
            </ul>
        </div>
    );
}

export { Bluetooth };
