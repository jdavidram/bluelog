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
        if (img === "") {
            img = "https://estaticos.elcolombiano.com/binrepository/893x565/57c0/780d565/none/11101/XKEB/documentation-fotos-1-13717159-6ed56232effbbe3127a19d67b2f920b4_43070691_20230817105411.jpg";
        }
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