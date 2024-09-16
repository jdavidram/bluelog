import { NavLink } from "react-router-dom";
import "./Projects.scss";
import { AddForm } from "./AddForm";
import { useState, useEffect, useContext } from "react";
import { FaX } from "react-icons/fa6";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import defaultImage from './imagenes/paisaje.jpg';

function ProjectItem({ id, name, onDelete }) {
  return (
    <div className="project">
      <img src={defaultImage} alt={name} /> 
      <span>
        <NavLink to={`/analyst/${id}`}>{name}</NavLink>
        <FaX onClick={() => onDelete(id)} /> 
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
          console.error("Error al cargar los proyectos:", error);
          setError("Error al cargar los proyectos. Por favor, inténtalo de nuevo.");
          setIsLoading(false);
        });
    }
  }, [user]);

  const deleteFolder = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/folders/${id}`);

      if (response.status === 204) { 
        setFolders(folders.filter(folder => folder.id !== id));
      } else {
        setError("Error al eliminar la carpeta en el servidor.");
      }
    } catch (error) {
      console.error("Error al eliminar la carpeta:", error);
      setError("Error al comunicarse con el servidor.");
    }
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
          {folders.map((folder) => (
            <ProjectItem
              key={folder.id}
              id={folder.id}  // Pasar el ID de la carpeta
              name={folder.name}
              onDelete={() => deleteFolder(folder.id)} 
            />
          ))}
        </section>
      )}
    </>
  );
}

export { Projects };
