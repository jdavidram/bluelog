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

        try {
            // Enviar los datos del formulario al backend con axios
            const response = await axios.post('http://localhost:5000/submit-form', {
                frecuency: sensor.frecuency,
                muestreo: sensor.muestreo,
                periodo: sensor.periodo
            });
            console.log(response.data);  // Puedes manejar la respuesta del backend aquí
        } catch (error) {
            console.error('Error al enviar los datos', error);
        }

        setSensor(sensor);
    };
    const [muestreo, setMuestreo] = useState(sensor.muestreo);

    return (
        <section className="settings">
            <form onSubmit={handleSubmit}>
                <label htmlFor="bluetooth" id="bluetooth">
                    <button type="button">
                        <FaBluetooth style={{ fontSize: '64px' }} />
                    </button>
                    <h4>{sensor.bluetooth}</h4>
                </label>
                <div id="frecuency">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <CiWavePulse1 style={{ fontSize: '36px' }} />
                        <h4>Frecuencia</h4>
                    </span>
                    <ul>
                        <li>
                            <input type="radio" id="a" name="frecuency" value="0.5" />
                            <label for="a">0.5 hz</label>
                        </li>
                        <li>
                            <input type="radio" id="b" name="frecuency" value="1" />
                            <label for="b">1 hz</label>
                        </li>
                        <li>
                            <input type="radio" id="c" name="frecuency" value="2" />
                            <label for="c">2 hz</label>
                        </li>
                        <li>
                            <input type="radio" id="d" name="frecuency" value="3" />
                            <label for="b">3 hz</label>
                        </li>
                        <li>
                            <input type="radio" id="e" name="frecuency" value="5" />
                            <label for="c">5 hz</label>
                        </li>
                    </ul>
                </div>
                <label htmlFor="Muestreo" id="muestra">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <FaCreativeCommonsSampling style={{ fontSize: '24px' }} />
                        <h4>Muestreo: { muestreo }</h4>
                    </span>
                    <input type="range" min="0" max="1" step="0.1" name="muestreo" id="muestreo" onChange={(e) => setMuestreo(e.target.value)} />
                </label>
                <div id="period">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <RxLapTimer style={{ fontSize: '24px' }} />
                        <h4>Periodo</h4>
                    </span>
                    <ul>
                        <li>
                            <input type="radio" id="a" name="period" value="0.5" />
                            <label for="a">0.5 h</label>
                        </li>
                        <li>
                            <input type="radio" id="b" name="period" value="1" />
                            <label for="b">1 h</label>
                        </li>
                        <li>
                            <input type="radio" id="c" name="period" value="2" />
                            <label for="c">2 h</label>
                        </li>
                        <li>
                            <input type="radio" id="d" name="period" value="4" />
                            <label for="b">4 h</label>
                        </li>
                    </ul>
                </div>
                <button type="submit" className="start-button">Enviar</button>
            </form>
        </section>
    );
}

export { Settings };
