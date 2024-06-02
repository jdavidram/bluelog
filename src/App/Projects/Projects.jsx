import { NavLink } from "react-router-dom";
import "./Projects.scss";
import dataJSON from "./database.json";
import { AddForm } from "./AddForm";
import { useState } from "react";

function ProjectItem({ title, image }) {
    return (
        <div className="project">
            <img src={ image } alt={ title } />
            <NavLink to={ "/anal" }>{ title }</NavLink>
        </div>
    );
}

function Projects() {
    console.log(dataJSON["projects"]);
    const [folders, setFolders] = useState(dataJSON["projects"]);
    return (
        <>
        <AddForm folders={ folders } setFolders={ setFolders } />
        <section className="projects">
            { folders.map((i) => (
                <ProjectItem 
                    key={ i.id }
                    title={ i.title }
                    image={ i.image }
                />
            )) }
        </section>
        </>
    );
}

export { Projects };