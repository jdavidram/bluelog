import React from "react";
import { FaBluetooth, FaDatabase } from "react-icons/fa";
import { CiWavePulse1 } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import "./Settings.scss";

function Settings() {
    let navigate = useNavigate();

    const handleBluetoothClick = () => {
        navigate('/bluetooth');
    };

    return (
        <section className="settings">
            <Button icon={<FaBluetooth />} name="Bluetooth" onClick={handleBluetoothClick} />
            <article className="article">
                <span>
                    <CiWavePulse1 />
                    <h4>Frecuencia</h4>
                </span>
                <label htmlFor="frecuency">
                    <input type="range" name="frecuency" id="frecuency" min="0" max="10" />
                </label>
            </article>
            <article className="article">
                <span>
                    <FaDatabase />
                    <h4>Database</h4>
                </span>
                <label htmlFor="database">
                    <input type="file" name="database" id="database" />
                </label>
            </article>
            <NavLink to="/anal">
                <button className="start-button">Start</button>
            </NavLink>
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
