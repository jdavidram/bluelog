// FolderView.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../Layout/Layout';

function FolderView() {
  const { folderName } = useParams();

  return (
    <div>
      <Layout title={folderName} />
      <div className="folder-content">
        {/* Add content specific to this folder */}
      </div>
    </div>
  );
}

export { FolderView };
