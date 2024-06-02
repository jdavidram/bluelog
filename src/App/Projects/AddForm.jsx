import { useState } from "react";

function AddForm() {
    // ESTADOS
    const [newFolder, setNewFolder] = useState({
        "name": "",
        "image": "Imagen de la carpeta"
    });
    // FUNCIONES
    const formChangeName = (e) => {
        newFolder["name"] = e.target.value;
    };
    const formChangeImage = (e) => {
        let img = e.target.value.split("\\");
        newFolder["image"] = img[img.length -1];
    };
    return (
        <form id="addForm">
            <h4>Actualmente tienes <strong>{ 5 }</strong> proyectos</h4>
            <span>
                <input type="text" id="itemName" placeholder="NOMBRE DEL PROYECTO" onChange={(e) => formChangeName(e)} />
            </span>
            <span>
                <input type="file" id="image" onChange={(e) => formChangeImage(e)} />
                <label htmlFor="image">{ newFolder["image"] }</label>
            </span>
            <span>
                <button type="submit">Add</button>
            </span>
        </form>
    );
}

export { AddForm };