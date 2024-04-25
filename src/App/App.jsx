import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.scss';
import { Login } from './Login/Login';
import { Home } from './Home/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <Login />
        } />
        <Route path="/home" element={
          <Home />
        } />
        <Route path="/proj/{id}" element={
          <Home />
        } />
        <Route path="/*" element={<h1 id="error">ERROR 404</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
