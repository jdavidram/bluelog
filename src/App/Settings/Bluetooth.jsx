import React, { useState } from 'react';
import './Bluetooth.scss';

function Bluetooth() {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState(null);
    const [connectedDevice, setConnectedDevice] = useState(null);

    const connectBluetooth = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true
                // filters: [{ name: "MyDevice" }]
            })
            console.log(device);
            setConnectedDevice(device);
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

    const handleConnect = async (device) => {
        try {
            // const server = await device.gatt.connect();
            // const services = await server.getPrimaryServices();
            // setConnectedDevice(device);
            console.log(device);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bluetooth-container">
            <button className="scan-button" onClick={connectBluetooth}>Buscar Dispositivos</button>
            {error && <p>Error: {error}</p>}
            <ul>
                {devices.map((device, index) => (
                    <li key={index}>
                        {device.name || `Dispositivo ${index + 1}`}
                        <button onClick={() => handleConnect(device)}>Conectar</button>
                    </li>
                ))}
            </ul>
            {connectedDevice && (
                <div>
                    <h3>Dispositivo Conectado: {connectedDevice.name}</h3>
                </div>
            )}
        </div>
    );
}

export { Bluetooth };
