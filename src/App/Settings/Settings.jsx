import { FaBluetooth, FaDatabase, FaPeriscope } from "react-icons/fa";
import { CiWavePulse1 } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
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

    return (
        <section className="settings">
            <form onSubmit={handleSubmit}>
                <label htmlFor="bluetooth">
                    <button type="button" onClick={handleBluetoothClick}>
                        <FaBluetooth id="bluetooth" style={{ fontSize: '64px' }} />
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
                {/* <div id="muestreo">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <FaDatabase style={{ fontSize: '24px' }} />
                        <h4>Muestreo</h4>
                    </span>
                </div> */}
                <label htmlFor="Muestreo">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <FaDatabase style={{ fontSize: '24px' }} />
                        <h4>Muestreo</h4>
                    </span>
                    <input type="number" name="muestreo" id="muestreo" onChange={(e) => sensor.muestreo = e.target.value} />
                </label>
                <div id="period">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <FaPeriscope style={{ fontSize: '24px' }} />
                        <h4>Periodo</h4>
                    </span>
                    <ul>
                        <li>
                            <input type="radio" id="a" name="period" value="0.5" />
                            <label for="a">0.5 hz</label>
                        </li>
                        <li>
                            <input type="radio" id="b" name="period" value="1" />
                            <label for="b">1 hz</label>
                        </li>
                        <li>
                            <input type="radio" id="c" name="period" value="2" />
                            <label for="c">2 hz</label>
                        </li>
                        <li>
                            <input type="radio" id="d" name="period" value="4" />
                            <label for="b">4 hz</label>
                        </li>
                    </ul>
                </div>
                <button type="submit" className="start-button">Enviar</button>
            </form>
        </section>
    );
}

export { Settings };
