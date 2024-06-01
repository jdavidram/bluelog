import { HashRouter, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
import './App.scss';
import { Animation } from './Animation';
import { Login } from './Login/Login';
import { Layout } from './Layout';

function App() {
  return (
    <HashRouter>
      <Animation />
      <Routes>
        <Route path="/" element={
          <Login />
        } />
        <Route path="/projects" element={
          <Layout title="projects"></Layout>
        } />
        <Route path="/anal/{id}" element={
          <Layout title="analysis"></Layout>
        } />
        <Route path="/set/{id}" element={
          <Layout title="settings"></Layout>
        } />
        <Route path="/*" element={<h1 id="error">ERROR 404</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
