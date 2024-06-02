// Folder.jsx
import React from 'react';
import './Folder.css';

function Folder({ name, image, onDelete, onClick }) {
  return (
    <div className="folder" onClick={onClick}>
      <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(); }}>X</button>
      <img src={image ? URL.createObjectURL(image) : 'default-image-url'} alt={name} className="folder-image" />
      <p className="folder-name">{name}</p>
    </div>
  );
}

export { Folder };
