import { FaPlus, FaChartLine } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { ReactComponent as Logo } from "./logo.svg";

function Header({ title }) {
    const ReactIcons = {
        "projects": <FaPlus />,
        "analysis": <FaChartLine />,
        "settings": <IoMdSettings />
    }
    return (
        <header>
            <Logo />
            <h2>{ title }</h2>
            { ReactIcons[title] }
        </header>
    );
}

function Layout({ children, title }) {
    return (
        <main id="main">
            <Header title={ title } />
        </main>
    );
}

export { Layout }