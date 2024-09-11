import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import axios from 'axios';
import "./Login.scss";
import { UserContext } from "../Context/UserContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Obtén la función setUser del contexto
    const { setUser } = useContext(UserContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            if (response.data.status === "success") {
                // Actualiza el contexto del usuario aquí
                setUser({ id: response.data.user_id }); 

                navigate("/projects"); 
            } else {
                setError("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            setError("Error al comunicarse con el servidor");
        }
    };

    return (
    <div id="container">    
            <div id="login">
                <Logo />
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Usuario" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Contraseña" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button className="button" type="submit">Iniciar Sesión</button>
                    {error && <p>{error}</p>} {/* Puedes descomentar esto para mostrar el error */}
                </form>
            </div>
        </div>
    );
}

export { Login };