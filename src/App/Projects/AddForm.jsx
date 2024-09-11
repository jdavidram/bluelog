import { useState } from "react";

function AddForm({ folders, setFolders }) {
    const [image, setImage] = useState("Imagen de la carpeta");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const formChangeImage = (e) => {
        let img = e.target.value.split("\\");
        setImage(img[img.length - 1]);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const addFolder = () => {
        let img = document.getElementById("image").value.replaceAll("\\", "/");

        // Validar que el nombre del proyecto no esté vacío
        if (!name.trim()) {
            setError("El nombre del proyecto es obligatorio.");
            return;
        }

        // Validar que se haya subido una imagen
        if (img === "" || img === "Imagen de la carpeta") {
            setError("Debe seleccionar una imagen.");
            return;
        }

        // Si no se ha subido una imagen válida, se asigna una imagen por defecto
        if (img === "") {
            img = "https://estaticos.elcolombiano.com/binrepository/893x565/57c0/780d565/none/11101/XKEB/documentation-fotos-1-13717159-6ed56232effbbe3127a19d67b2f920b4_43070691_20230817105411.jpg";
        }

        // Añadir la carpeta
        setFolders([...folders, {
            "name": name,
            "image": img
        }]);

        // Limpiar los campos
        setName("");
        setImage("Imagen de la carpeta");
        setError("");
        console.log(folders);
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
                />
            </span>
            <span>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => formChangeImage(e)}
                />
                <label htmlFor="image">{ image }</label>
            </span>
            <span>
                <div className="button" onClick={() => addFolder()} >Añadir</div>
            </span>
        </form>
    );
}

export { AddForm };
