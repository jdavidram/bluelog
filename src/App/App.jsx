import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { Layout } from './Layout/Layout';
import { Login } from './Login/Login';
import { Home } from './Home/Home';

function App() {
  const [state, setState] = useState("out");
  return (
    <HashRouter>
      <Layout state={ state } setState={ setState } />
      <Routes>
        <Route path="/" element={
          <Login setState={ setState } />
        } />
        <Route path="/app" element={
          <Home />
        } />
        <Route path="/*" element={<h1 id="error">ERROR 404</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
