import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { ReactComponent as Logo } from '../logo.svg';
import './Layout.scss';

function Layout({ title, onAddFolder }) {
  return (
    <header>
      <Logo id="logo" />
      <h2>{title}</h2>
      <FaPlus className="add-folder-icon" onClick={onAddFolder} />
    </header>
  );
}

export { Layout };
