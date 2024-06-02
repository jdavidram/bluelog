import { NavLink } from "react-router-dom";
import "./Projects.scss";
import dataJSON from "./database.json";
import { AddForm } from "./AddForm";
import { useState } from "react";

function ProjectItem({ id, children }) {
    return (
        <div className="project">
            <NavLink to={ "/anal" }>{ children }</NavLink>
        </div>
    );
}

function Projects() {
    const [data, setData] = useState(dataJSON["projects"])
    return (
        <>
        <AddForm data={ data } setData={ setData } />
        <section className="projects">
            { data.map((item) => (
                <ProjectItem key={ item.id } >{ item.title }</ProjectItem>
            )) }
        </section>
        </>
    );
}

export { Projects };