import { FaPlus, FaChartLine } from "react-icons/fa6";
import { IoMdSettings, IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { ReactComponent as Logo } from "../logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

function showForm(add, setAdd) {
    var plus = document.getElementById("plus");
    var addForm = document.getElementById("addForm");
    plus.style.rotate = add;
    if (add === "225deg") {
        addForm.style.top = "60px";
        addForm.style.opacity = "1";
        setAdd("0deg");
    } else {
        addForm.style.top = "calc(70px - 100vh)";
        addForm.style.opacity = "0";
        setAdd("225deg");
    }
}

function Header({ title }) {
    const [add, setAdd] = useState("225deg");
    const location = useLocation();
    const navigate = useNavigate();

    const reactIcons = {
        "proyectos": <FaPlus id="plus" onClick={() => showForm(add, setAdd)} />,
        "analisis": <FaChartLine />,
        "configuracion": <IoMdSettings onClick={() => navigate('/set')} />
    };

    // Determina si mostrar el ícono de retroceder o el ícono correspondiente a la vista actual
    const showBackButton = location.pathname.startsWith('/analyst/') || 
                          location.pathname.startsWith('/graphics/') || 
                          location.pathname.startsWith('/estadistics/') ||
                          location.pathname === '/set'; // Incluye la ruta '/set'

    const currentIcon = showBackButton ? <IoMdArrowBack onClick={() => navigate(-1)} /> : reactIcons[title];

    return (
        <header>
            <Logo />
            <h2>{ title }</h2>
            {currentIcon}
        </header>
    );
}

function Layout({ children, title }) {
    return (
        <main id="main">
            <Header title={ title } />
            { children }
        </main>
    );
}

export { Layout };