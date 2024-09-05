import React, { useState } from "react";
import { FaBluetooth } from "react-icons/fa";
import { CiWavePulse1 } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import "./Settings.scss";

function Settings() {
    let navigate = useNavigate();
    const [frecuencia, setFrecuencia] = useState('');
    const [muestreo, setMuestreo] = useState('');

    const handleBluetoothClick = () => {
        navigate('/bluetooth');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Aquí puedes manejar los datos del formulario
        console.log('Frecuencia:', frecuencia);
        console.log('Muestreo:', muestreo);

        // Limpiar campos después de enviar
        setFrecuencia('');
        setMuestreo('');
    };

    return (
        <section className="settings">
            <Button icon={<FaBluetooth />} name="Bluetooth" onClick={handleBluetoothClick} />
            
            <article className="article">
                <span>
                    <CiWavePulse1 />
                    <h4>Frecuencia</h4>
                </span>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="frecuencia">
                        <input
                            type="number"
                            name="frecuencia"
                            id="frecuencia"
                            value={frecuencia}
                            onChange={(e) => setFrecuencia(e.target.value)}
                            min="1"
                            max="5000"
                            required
                        />
                    </label>
                    <label htmlFor="muestreo">
                        <h4>Muestreo</h4>
                        <input
                            type="number"
                            name="muestreo"
                            id="muestreo"
                            value={muestreo}
                            onChange={(e) => setMuestreo(e.target.value)}
                            required
                        />
                    </label>
                    <NavLink to="/anal">
                    <button className="start-button">Enviar</button>
            </NavLink>
                </form>
            </article>


        </section>
    );
}

function Button({ icon, name, onClick, children }) {
    return (
        <button className="button" onClick={onClick}>
            <span>
                {icon}
                <h4>{name}</h4>
            </span>
            {children} {/* Renderiza el input si está presente */}
        </button>
    );
}

export { Settings };
