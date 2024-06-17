import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import "./Login.scss";
import data from "../data.json";

function validUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (data[username] !== undefined) {
        if (data[username].password !== password) {
            alert("Contrasena No valida");
        }
    } else {
        alert("Usuario No valido");
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
                        setValid(( data[document.getElementById("username").value].password === event.target.value ) ? "projects" : "");
                     }} />
                </label>
                <NavLink to={ "/" + valid }>
                    <div className="button" onClick={() => validUser()}>Login</div>
                </NavLink>
            </form>
        </div>
    );
}

export { Login };