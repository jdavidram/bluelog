import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import "./Login.scss";
import data from "./database.json";

function Login() {
    const [user, setUser] = useState("undefined");
    return (
        <div id="login">
            <Logo />
            <form action="" method="get">
                <label htmlFor="password">
                    <input type="password" name="password" id="password" placeholder="PASSWORD" onChange={(event) => { setUser(event.target.value) }} />
                </label>
                <NavLink to={ "/" + data[user] }>
                    <button type="submit">Login</button>
                </NavLink>
            </form>
        </div>
    );
}

export { Login };