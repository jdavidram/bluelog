import { FaBluetooth, FaDatabase, FaPeriscope } from "react-icons/fa";
import { CiWavePulse1 } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import "./Settings.scss";

function Settings({ sensor, setSensor }) {
    let navigate = useNavigate();

    const handleBluetoothClick = () => {
        navigate('/set/bluetooth');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí puedes manejar los datos del formulario
        console.log('Frecuencia:', sensor.frecuency);
        console.log('Muestreo:', sensor.muestreo);
        setSensor(sensor);

        // Limpiar campos después de enviar
        // setFrecuencia('');
        // setMuestreo('');
    };

    return (
        <section className="settings">
            <form action="get" method="get" onSubmit={ handleSubmit }>
                <label htmlFor="bluetooth">
                    <button type="button" onClick={ handleBluetoothClick }>
                        <FaBluetooth />
                        <h4>Bluetooth</h4>
                    </button>
                    <h4>{ sensor.bluetooth }</h4>
                </label>
                <label htmlFor="Frecuency">
                    <span>
                        <CiWavePulse1 />
                        <h4>Frecuencia</h4>
                    </span>
                    <input type="number" name="frecuency" id="frecuency" onChange={ (e) => sensor.frecuency = e.target.value } min="1" max="5000" />
                </label>
                <label htmlFor="Muestreo">
                    <span>
                        <FaDatabase />
                        <h4>Muestreo</h4>
                    </span>
                    <input type="number" name="muestreo" id="muestreo" onChange={ (e) => sensor.muestreo = e.target.value } />
                </label>
                <label htmlFor="Muestreo">
                    <span>
                        <FaPeriscope />
                        <h4>Periodo</h4>
                    </span>
                    <input type="number" name="periodo" id="periodo" onChange={ (e) => sensor.periodo = e.target.value } />
                </label>
            </form>
            <NavLink to="/anal">
                    <button className="start-button" onClick={ setSensor(sensor) }>Enviar</button>
            </NavLink>
        </section>
    );
}

export { Settings };
