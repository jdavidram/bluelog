import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import axios from 'axios';
import "./Login.scss";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            if (response.data.status === "success") {
                navigate("/projects");// Redirige al usuario a la página de proyectos
                //setMessage('Login exitoso')  
            } else {
                setError("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            setError("Error al comunicarse con el servidor");
        }
    };

    return (
        <div id="login">
            <Logo />
            <form onSubmit={handleLogin}>
                <label htmlFor="username">
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button className="button" type="submit">Login</button>
                {/* {error && <p>{error}</p>} */}
            </form>
        </div>
    );
}

export { Login };
