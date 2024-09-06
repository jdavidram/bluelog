import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import "./Login.scss";
import data from "../data.json";

function validUser(targetValue) {
    var username = document.getElementById("username").value;
    if (data[username] !== undefined && data[username].password === targetValue) {
        return "projects";
    } else {
        return "";
    }
}

function Login() {
    const [valid, setValid] = useState("");
    return (
        <div id="login">
            <Logo />
            <form action="" method="get">
                <label htmlFor="username">
                    <input type="text" name="username" id="username" placeholder="username" />
                </label>
                <label htmlFor="password">
                    <input type="password" name="password" id="password" placeholder="password" onChange={(event) => { 
                        setValid(validUser(event.target.value));
                     }} />
                </label>
                <NavLink to={ "/" + valid }>
                    <div className="button">Login</div>
                </NavLink>
            </form>
        </div>
    );
}

export { Login };