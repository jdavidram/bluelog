import { NavLink } from "react-router-dom";
import "./Projects.scss";
import dataJSON from "../data.json";
import { AddForm } from "./AddForm";
import { useState } from "react";
import { FaX } from "react-icons/fa6";

function ProjectItem({ index, name, image, folders, setFolders }) {
    const deleteFolder = (index) => {
        folders.splice(index, 1);
        // console.log(folders);
        setFolders(folders);
    };
    return (
        <div className="project">
            <img src={ image } alt={ name } />
            <span>
                <NavLink to={ "/anal" }>{ name }</NavLink>
                <FaX onClick={() => deleteFolder(index)} />
            </span>
        </div>
    );
}

function Projects() {
    const [folders, setFolders] = useState(dataJSON["username"]["projects"]);
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
                    folders={ folders }
                    setFolders={ setFolders }
                />
            )) }
        </section>
        </>
    );
}

export { Projects };