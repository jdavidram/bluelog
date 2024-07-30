import { useState } from "react";

function AddForm({ folders, setFolders }) {
    const [image, setImage] = useState("Imagen de la carpeta");
    const formChangeImage = (e) => {
        let img = e.target.value.split("\\");
        setImage(img[img.length -1]);
    };
    const addFolder = () => {
        let name = document.getElementById("name").value;
        let img = document.getElementById("image").value.replaceAll("\\", "/");
        setFolders([...folders, {
            "name": name,
            "image": img
        }]);
        console.log(folders);
    };
    return (
        <form id="addForm">
            <h4>Actualmente tienes <strong>{ folders.length }</strong> proyectos</h4>
            <span>
                <input type="text" id="name" placeholder="NOMBRE DEL PROYECTO" />
            </span>
            <span>
                <input type="file" id="image" onChange={(e) => formChangeImage(e)} />
                <label htmlFor="image">{ image }</label>
            </span>
            <span>
                <div className="button" onClick={() => addFolder()} >Add</div>
            </span>
        </form>
    );
}

export { AddForm };