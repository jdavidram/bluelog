import { FaBluetooth, FaDatabase, FaPeriscope } from "react-icons/fa";
import { CiWavePulse1 } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Settings.scss";

function Settings({ sensor, setSensor }) {
    let navigate = useNavigate();

    const handleBluetoothClick = () => {
        navigate('/set/bluetooth');
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
                        <FaBluetooth />
                        <h4>Bluetooth</h4>
                    </button>
                    <h4>{sensor.bluetooth}</h4>
                </label>
                <label htmlFor="Frecuency">
                    <span>
                        <CiWavePulse1 />
                        <h4>Frecuencia</h4>
                    </span>
                    <input type="number" name="frecuency" id="frecuency" onChange={(e) => sensor.frecuency = e.target.value} min="1" max="5000" />
                </label>
                <label htmlFor="Muestreo">
                    <span>
                        <FaDatabase />
                        <h4>Muestreo</h4>
                    </span>
                    <input type="number" name="muestreo" id="muestreo" onChange={(e) => sensor.muestreo = e.target.value} />
                </label>
                <label htmlFor="Periodo">
                    <span>
                        <FaPeriscope />
                        <h4>Periodo</h4>
                    </span>
                    <input type="number" name="periodo" id="periodo" onChange={(e) => sensor.periodo = e.target.value} />
                </label>
                <button type="submit" className="start-button">Enviar</button>
            </form>
        </section>
    );
}

export { Settings };
