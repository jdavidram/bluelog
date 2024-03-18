import { NavLink } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { ReactComponent as Logo } from "../logo.svg";
import "./layout.scss";

function Layout({ state, setState }) {
    return (
        <nav className={ state }>
            <span>
                <Logo />
                <h3>BlueLog</h3>
            </span>
            <span>
                <NavLink to="/">
                    <FaPowerOff onClick={() => setState("out")} />
                </NavLink>
            </span>
        </nav>
    );
}

export { Layout };