// Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder } from '../Folder/Folder';
import { Layout } from '../Layout/Layout';
import './Home.css';

function Home() {
  const [folders, setFolders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderImage, setNewFolderImage] = useState(null);
  const navigate = useNavigate();

  const handleAddFolder = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFolders([...folders, { name: newFolderName, image: newFolderImage }]);
    setShowForm(false);
    setNewFolderName('');
    setNewFolderImage(null);
  };

  const handleImageChange = (e) => {
    setNewFolderImage(e.target.files[0]);
  };

  const handleDeleteFolder = (index) => {
    setFolders(folders.filter((_, i) => i !== index));
  };

  const handleFolderClick = (folderName) => {
    navigate(`/folder/${folderName}`);
  };

  return (
    <div className="home">
      <Layout title="Mis proyectos" onAddFolder={handleAddFolder} />
      {showForm ? (
        <div className="body">
          <form className="folder-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Nombre de la carpeta"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={handleImageChange}
              required
            />
            <button type="submit">Añadir nueva carpeta</button>
          </form>
        </div>
      ) : (
        <div className="folders-container">
          {folders.map((folder, index) => (
            <Folder
              key={index}
              name={folder.name}
              image={folder.image}
              onDelete={() => handleDeleteFolder(index)}
              onClick={() => handleFolderClick(folder.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { Home };
