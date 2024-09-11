import { NavLink } from "react-router-dom";
import "./Projects.scss";
import { AddForm } from "./AddForm";
import { useState, useEffect, useContext } from "react";
import { FaX } from "react-icons/fa6";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

// Importa la imagen por defecto (ruta relativa desde Projects.jsx)
import defaultImage from './imagenes/paisaje.jpg'; 

function ProjectItem({ key, name, onDelete }) { // No necesitas la prop 'image'
    return (
      <div className="project">
        <img src={defaultImage} alt={name} /> 
        <span>
          <NavLink to={"/anal"}>{name}</NavLink>
          <FaX onClick={() => onDelete(key)} /> 
        </span>
      </div>
    );
  }

function Projects() {
  const { user } = useContext(UserContext); 
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setIsLoading(true);

      axios.get(`http://localhost:5000/folders/${user.id}`)
        .then((response) => {
          setFolders(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the folders!", error);
          setError("Error al cargar los proyectos. Por favor, inténtalo de nuevo.");
          setIsLoading(false);
        });
    }
  }, [user]);

  const deleteFolder = (key) => {
    var newFolders = [...folders];
    newFolders.splice(key, 1);
    alert("Carpeta eliminada"); 
    setFolders(newFolders);
  };

  return (
    <>
      <AddForm folders={folders} setFolders={setFolders} />
      {isLoading && <div className="loading-indicator">Cargando...</div>} 
      {error && <div className="error-message">{error}</div>} 
      {!isLoading && folders.length === 0 && (
        <div className="no-projects-message">Aún no tienes proyectos. ¡Crea uno nuevo!</div>
      )} 
      {!isLoading && folders.length > 0 && (
        <section className="projects">
          {folders.map((i, index) => (
            <ProjectItem
              key={index}        
              name={i.name}
              image={i.image_path} 
              onDelete={() => deleteFolder(index)}
            />
          ))}
        </section>
      )}
    </>
  );
}

export { Projects };