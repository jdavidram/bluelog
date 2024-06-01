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

function AddForm({ data, setData }) {
    return (
        <form action="" method="post" id="addForm">
            <h4>Actualmente tienes <strong>{ data.length }</strong> proyectos</h4>
            <label htmlFor="itemName">
                <input type="text" name="itemName" id="itemName" placeholder="NOMBRE DEL PROYECTO" />
            </label>
            <span>
                <NavLink to={ "/projects" }>
                    <button type="submit" onClick={() => addItem(data, setData)}>Add</button>
                </NavLink>
                <NavLink to={ "/projects" }>
                    <button type="submit" onClick={() => deleteItem(data, setData)}>Delete</button>
                </NavLink>
            </span>
        </form>
    );
}

export { AddForm };