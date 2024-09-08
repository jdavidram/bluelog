import { NavLink } from "react-router-dom";
import "./Projects.scss";
import { AddForm } from "./AddForm";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { log } from "@tensorflow/tfjs";

function ProjectItem({ key, name, image, onDelete }) {
    return (
        <div className="project">
            <img src={ image } alt={ name } />
            <span>
                <NavLink to={ "/anal" }>{ name }</NavLink>
                <FaX onClick={() => onDelete(key)} />
            </span>
        </div>
    );
}

function Projects() {
    const [folders, setFolders] = useState([{
        "name": "Medellin",
        "image": "https://th.bing.com/th/id/OIP.BQ4vJL3KnH3hJN3R1Q2z3gHaE8?rs=1&pid=ImgDetMain"
    }]);
    const deleteFolder = (key) => {
        var newFolders = [...folders];
        console.log(key);
        newFolders.splice(key, 1);
        console.log(newFolders);
        alert("Haz eliminado una carpeta");
        setFolders(newFolders);
    };
    return (
        <>
        <AddForm folders={ folders } setFolders={ setFolders } />
        <section className="projects">
            { folders.map((i) => (
                <ProjectItem 
                    key={ folders.indexOf(i) }
                    index={ folders.indexOf(i) }
                    name={ i.name }
                    image={ i.image }
                    onDelete={() => deleteFolder(folders.indexOf(i))}
                />
            )) }
        </section>
        </>
    );
}

export { Projects };