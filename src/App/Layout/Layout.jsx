import { FaPlus } from "react-icons/fa6";
import { ReactComponent as Logo } from "../logo.svg";
import "./Layout.scss";

function Layout({ title }) {
    return (
        <header>
            <Logo id="logo" />
            <h2>{ title }</h2>
            <FaPlus />
        </header>
    );
}

export { Layout };