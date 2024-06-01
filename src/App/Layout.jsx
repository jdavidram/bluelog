import { FaPlus, FaChartLine } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import { ReactComponent as Logo } from "./logo.svg";

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
    const reactIcons = {
        "projects": <FaPlus id="plus" onClick={() => showForm(add, setAdd)} />,
        "analysis": <FaChartLine />,
        "settings": <IoMdSettings />
    }
    return (
        <header>
            <Logo />
            <h2>{ title }</h2>
            { reactIcons[title] }
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

export { Layout }