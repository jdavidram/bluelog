import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.scss';
import { Animation } from './Layout/Animation';
import { Login } from './Login/Login';
import { Layout } from './Layout/Layout';
import { Projects } from './Projects/Projects';
import { Settings } from './Settings/Settings';
import { Bluetooth } from './Settings/Bluetooth';
import { Analyst } from './Analyst/Analyst';
import { Estadistics } from './Analyst/Estadistics';
import { Graphics } from './Analyst/Graphics';
import { UserProvider } from './Context/UserContext';
import {ProtectedRoute} from './ProtectedRoute'; 

function App() {
  const [sensor, setSensor] = useState({
    "bluetooth": "",
    "frecuency": "",
    "muestreo": "",
    "periodo": ""
  });

  return (
    <UserProvider>
      <HashRouter>
        <Animation />
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route element={<ProtectedRoute />}> Envuelve las rutas protegidas */}
            <Route path="/projects" element={ 
              <Layout title="proyectos">
                <Projects />
              </Layout>
            } />
          {/* </Route> ... otras rutas que también quieras proteger */}
          <Route path="/anal" element={
            <Layout title="análisis">
              <Analyst />
            </Layout>
          } />
          <Route path="/estadistics" element={
            <Layout title="Estadísticos">
              <Estadistics />
            </Layout>
          } />
          <Route path="/graphics" element={
            <Layout title="Gráficos">
              <Graphics />
            </Layout>
          } />
          <Route path="/config" element={
            <Layout title="Configuración">
              <Settings />
            </Layout>
          } />
          <Route path="/set" element={
            <Layout title="configuración">
              <Settings sensor={ sensor } setSensor={ setSensor } />
            </Layout>
          } />
          <Route path="/set/bluetooth" element={
            <Layout title="Bluetooth">
              <Bluetooth sensor={ sensor } setSensor={ setSensor } />
            </Layout>
          } />
          <Route path="/*" element={<h1 id="error">ERROR 404</h1>} />
        </Routes>
      </HashRouter>
    </UserProvider>
  );
}

export default App;