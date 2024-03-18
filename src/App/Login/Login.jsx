import { FaUser, FaLock } from "react-icons/fa";
import { ReactComponent as Logo } from "../logo.svg";
import "./login.scss";
import { NavLink } from "react-router-dom";

function FormLogin({ setState }) {
    return (
        <form action="" method="get">
            <span>
                <label htmlFor="">
                    <FaUser />
                </label>
                <input type="email" name="" id="" placeholder="user@unal.edu.co" />
            </span>
            <span>
                <label htmlFor="">
                    <FaLock />
                </label>
                <input type="password" name="" id="" placeholder="password" />
            </span>
            <button type="submit" onClick={() => setState("in")}><NavLink to="/app">Login</NavLink></button>
        </form>
    );
}

function Login({ setState }) {
    return (
        <main className="login">
            <Logo />
            <h1>BlueLog</h1>
            <FormLogin setState={ setState } />
        </main>
    );
}

export { Login };