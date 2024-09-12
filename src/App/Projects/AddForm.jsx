import { useState, useContext } from "react";
import axios from 'axios';
import { UserContext } from "../Context/UserContext";

function AddForm({ folders, setFolders }) {
    const [image, setImage] = useState("Imagen de la carpeta");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const { user } = useContext(UserContext);

    const formChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file.name);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const addFolder = async () => {
        const fileInput = document.getElementById("image");
        const file = fileInput.files[0];

        // Validar que el nombre del proyecto no esté vacío
        if (!name.trim()) {
            setError("El nombre del proyecto es obligatorio.");
            return;
        }

        // Validar que se haya subido una imagen
        if (!file) {
            setError("Debe seleccionar una imagen.");
            return;
        }

        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('user_id', user.id);
            formData.append('csv_data', '{}'); 

            const response = await axios.post('http://localhost:5000/folders', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            });

            if (response.status === 201) { 
                setFolders([...folders, response.data]); 

                setName("");
                setImage("Imagen de la carpeta");
                setError("");
                fileInput.value = ''; 
            } else {
                setError("Error al crear la carpeta en el servidor.");
            }
        } catch (error) {
            console.error("Error al crear la carpeta:", error);
            setError("Error al comunicarse con el servidor.");
        }
    };

    return (
        <form id="addForm">
            <h4>Actualmente tienes <strong>{ folders.length }</strong> proyectos</h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <span>
                <input
                    type="text"
                    id="name"
                    placeholder="NOMBRE_PROYECTO"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
            </span>
            <span>
                <input
                    type="file"
                    id="image"
                    onChange={formChangeImage}
                    required
                />
                <label htmlFor="image">{ image }</label>
            </span>
            <span>
                <div className="button" onClick={addFolder} >Añadir</div>
            </span>
        </form>
    );
}

export { AddForm };