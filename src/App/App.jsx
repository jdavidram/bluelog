import { HashRouter, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
import './App.scss';
import { Animation } from './Animation';
import { Login } from './Login/Login';

function App() {
  return (
    <HashRouter>
      <Animation />
      <Routes>
        <Route path="/" element={
          <Login />
        } />
        <Route path="/projects" element={
          <h1>Hola Projects!!</h1>
        } />
        <Route path="/anal/{id}" element={
          <h1>Hola Analysis!!</h1>
        } />
        <Route path="/set/{id}" element={
          <h1>Hola Settings</h1>
        } />
        <Route path="/*" element={<h1 id="error">ERROR 404</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
