import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import "./Login.scss";

function LoginForm() {
    return (
        <form action="" method="get">
            <label htmlFor="">
                <input type="email" placeholder="name@email.com" name="" id="" />
            </label>
            <label htmlFor="">
                <input type="password" placeholder="password" name="" id="" />
            </label>
            <NavLink to="/home">
                <div className="button">Login</div>
            </NavLink>
        </form>
    );
}

function Login() {
    return (
        <div id="login">
            <Logo />
            <LoginForm />
        </div>
    );
}

export { Login };