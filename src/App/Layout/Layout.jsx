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
        "projects": <FaPlus id="plus" onClick={() => showForm(add, setAdd)} />,
        "analysis": <FaChartLine />,
        "settings": <IoMdSettings onClick={() => navigate('/set')} />
    };

    const currentIcon = location.pathname === '/anal' ? reactIcons['settings'] : reactIcons[title];

    return (
        <header>
            <Logo />
            <h2>{ title }</h2>
            { (location.pathname === '/bluetooth' || location.pathname === '/set' || location.pathname === '/estadistics'|| location.pathname === '/graphics'|| location.pathname === '/anal') ? (
                <IoMdArrowBack onClick={() => navigate(-1)} />
            ) : (
                currentIcon
            )}
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
