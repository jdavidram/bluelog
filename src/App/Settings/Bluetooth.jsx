import React, { useState } from 'react';
import './Bluetooth.scss';

function Bluetooth({ sensor, setSensor }) {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState(null);

    const connectBluetooth = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true
                // filters: [{ name: "MyDevice" }]
            })
            sensor.bluetooth = device.name;
            setSensor(sensor);
            console.log(sensor);
        } catch (error) {
            console.error("Error requesting device:", error);
        }
    }

    // const handleScan = async () => {
    //     try {
    //         const device = await navigator.bluetooth.requestDevice({
    //             acceptAllDevices: true
    //         });

    //         setDevices(prevDevices => [...prevDevices, device]);
    //         setError(null);
    //     } catch (err) {
    //         setError(err.message);
    //     }
    // };

    return (
        <div className="bluetooth-container">
            <button className="scan-button" onClick={connectBluetooth}>Buscar Dispositivos</button>
            {error && <p>Error: {error}</p>}
            {sensor.bluetooth && (
                <div>
                    <h3>Dispositivo Conectado: {sensor.bluetooth}</h3>
                </div>
            )}
        </div>
    );
}

export { Bluetooth };
