import React from 'react';
import './Folder.css';

function Folder({ name, image, onDelete }) {
  return (
    <div className="folder">
      <button className="delete-button" onClick={onDelete}>X</button>
      <img src={image ? URL.createObjectURL(image) : 'default-image-url'} alt={name} className="folder-image" />
      <p className="folder-name">{name}</p>
    </div>
  );
}

export { Folder };
