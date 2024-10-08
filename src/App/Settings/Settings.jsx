import { FaBluetooth, FaDatabase, FaPeriscope } from "react-icons/fa";
import { CiWavePulse1 } from "react-icons/ci";
import { FaCreativeCommonsSampling } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import "./Settings.scss";

function Settings({ sensor, setSensor }) {
    let navigate = useNavigate();

    const [frecuency, setFrecuency] = useState(sensor.frecuency);
    const [muestreo, setMuestreo] = useState(sensor.muestreo);
    const [periodo, setPeriodo] = useState(sensor.periodo);

    const handleBluetoothClick = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true
            });
            if (device.gatt.connected) {
                var blue = document.getElementById("bluetooth");
                blue.style.color = "#008DDA"
                console.log('Bluetooth está encendido y conectado');
            } else {
                console.log('Bluetooth está encendido pero no conectado');
            }
        } catch (error) {
            console.error('Error al verificar el estado del Bluetooth:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            frecuency: frecuency,
            muestreo: muestreo,
            periodo: periodo
        };

        // Mostrar los datos enviados por consola y en un alert
        console.log("Datos enviados:", formData);
        alert(`Datos enviados:\n${JSON.stringify(formData, null, 2)}`);

        try {
            const response = await axios.post('http://localhost:5000/submit-form', formData);
            console.log(response.data);  // Puedes manejar la respuesta del backend aquí
        } catch (error) {
            console.error('Error al enviar los datos', error);
        }

        setSensor({ ...sensor, frecuency, muestreo, periodo });
    };

    return (
        <section className="settings">
            <form onSubmit={handleSubmit}>
                <label htmlFor="bluetooth" id="bluetooth">
                    <FaBluetooth style={{ fontSize: '72px' }} />
                    <h4>{sensor.bluetooth}</h4>
                </label>
                <div id="frecuency">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <CiWavePulse1 style={{ fontSize: '36px' }} />
                        <h4>Frecuencia</h4>
                    </span>
                    <ul>
                        <li>
                            <input type="radio" id="a" name="frecuency" value="0.5" onChange={() => setFrecuency(0.5)} />
                            <label htmlFor="a">0.5 Hz</label>
                        </li>
                        <li>
                            <input type="radio" id="b" name="frecuency" value="1" onChange={() => setFrecuency(1)} />
                            <label htmlFor="b">1.0 Hz</label>
                        </li>
                        <li>
                            <input type="radio" id="c" name="frecuency" value="2" onChange={() => setFrecuency(2)} />
                            <label htmlFor="c">2.0 Hz</label>
                        </li>
                        <li>
                            <input type="radio" id="d" name="frecuency" value="3" onChange={() => setFrecuency(3)} />
                            <label htmlFor="d">3.0 Hz</label>
                        </li>
                        <li>
                            <input type="radio" id="e" name="frecuency" value="5" onChange={() => setFrecuency(5)} />
                            <label htmlFor="e">5.0 Hz</label>
                        </li>
                    </ul>
                </div>

                <label htmlFor="Muestreo" id="muestra">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <FaCreativeCommonsSampling style={{ fontSize: '24px' }} />
                        <h3>Muestreo: {muestreo}</h3>
                    </span>
                    <input type="range" min="0" max="1" step="0.1" name="muestreo" id="muestreo" value={muestreo} onChange={(e) => setMuestreo(parseFloat(e.target.value))} />
                </label>

                <div id="period">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <RxLapTimer style={{ fontSize: '24px' }} />
                        <h4>Periodo</h4>
                    </span>
                    <ul>
                        <li>
                            <input type="radio" id="a" name="period" value="0.5" onChange={() => setPeriodo(0.5)} />
                            <label htmlFor="a">0.5 h</label>
                        </li>
                        <li>
                            <input type="radio" id="b" name="period" value="1" onChange={() => setPeriodo(1)} />
                            <label htmlFor="b">1.0 h</label>
                        </li>
                        <li>
                            <input type="radio" id="c" name="period" value="2" onChange={() => setPeriodo(2)} />
                            <label htmlFor="c">2.0 h</label>
                        </li>
                        <li>
                            <input type="radio" id="d" name="period" value="4" onChange={() => setPeriodo(4)} />
                            <label htmlFor="d">4.0 h</label>
                        </li>
                    </ul>
                </div>
                <button type="submit" className="start-button">Enviar</button>
            </form>
        </section>
    );
}

export { Settings };
