import { useState } from "react";
import { NavLink } from "react-router-dom";

function addItem(data, setData) {
    var plus = document.getElementById("plus");
    var addForm = document.getElementById("addForm");
    var itemName = document.getElementById("itemName").value;
    var indx = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i]["title"] === itemName) {
            indx = i;
        }
    }
    if (indx === -1) {
        data.push({ "id": data.length, "title": itemName });
        console.log(data); // CONTROL
        setData(data);
        plus.style.rotate = "0deg";
        addForm.style.top = "calc(70px - 100vh)";
        addForm.style.opacity = "0";
        alert("Added " + itemName);
    } else {
        alert("Ya existe " + itemName);
    }
}

function deleteItem(data, setData) {
    var plus = document.getElementById("plus");
    var addForm = document.getElementById("addForm");
    var itemName = document.getElementById("itemName").value;
    var indx = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i]["title"] === itemName) {
            indx = i;
        }
    }
    if (indx >= 0) {
        data.splice(indx, 1);
        console.log(data); // CONTROL
        setData(data);
        plus.style.rotate = "0deg";
        addForm.style.top = "calc(70px - 100vh)";
        addForm.style.opacity = "0";
        alert("Deleted " + itemName);
    } else {
        alert("No existe " + itemName);
    }
}

function AddForm({ folders, setFolders }) {
    // ESTADOS
    const [newFolder, setNewFolder] = useState({
        "name": "",
        "image": "imagen del proyecto"
    });
    const [action, setAction] = useState(true);
    // FUNCIONES
    const handleFormSubmit = () => {
        if (action) {
            setFolders([...folders, newFolder]);
            setNewFolder({
                "name": "",
                "image": "imagen del proyecto"
            });
        } else {
            alert("deleted");
        }
    }
    const handleImageChange = (e) => {
        let img = e.target.value.split("\\");
        newFolder["image"] = img[img.length -1];
        setNewFolder(newFolder);
    }
    return (
        <form id="addForm" onSubmit={handleFormSubmit}>
            <h4>Actualmente tienes <strong>{ folders.length }</strong> proyectos</h4>
            <span>
                <input type="text" id="itemName" placeholder="NOMBRE DEL PROYECTO" onChange={(e) => newFolder["name"] = e.target.value} />
            </span>
            <span>
                <input type="file" id="image" onChange={(e) => handleImageChange(e)} />
                <label htmlFor="image">{ newFolder["image"] }</label>
            </span>
            <span>
                <button type="submit">Add</button>
                <button type="submit" onClick={() => setAction(false)}>Delete</button>
            </span>
        </form>
    );
}

export { AddForm };