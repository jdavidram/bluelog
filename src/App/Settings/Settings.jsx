import { FaBluetooth, FaWifi, FaDatabase } from "react-icons/fa6";
import { CiWavePulse1 } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import "./Settings.scss";

function Settings() {
    return (
        <section className="settings">
            <article>
                <span>
                    <FaBluetooth />
                    <h4>Bluetooth</h4>
                </span>
            </article>
            <article>
                <span>
                    <FaWifi />
                    <h4>Wifi</h4>
                </span>
            </article>
            <article>
                <span>
                    <CiWavePulse1 />
                    <h4>Frecuencia</h4>
                </span>
                <label htmlFor="frecuency">
                    <input type="range" name="frecuency" id="frecuency" min="0" max="10" />
                </label>
            </article>
            <article>
                <span>
                    <FaDatabase />
                    <h4>Database</h4>
                </span>
                <label htmlFor="database">
                    <input type="file" name="database" id="database" />
                </label>
            </article>
            <NavLink to="/anal">
                <button>Start</button>
            </NavLink>
        </section>
    );
}

export { Settings };