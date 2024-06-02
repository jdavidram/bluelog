import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Animation } from './Animation';
import { Login } from './Login/Login';
import { Layout } from './Layout';
import { Projects } from './Projects/Projects';
import { Settings } from './Settings/Settings';

function App() {
  return (
    <HashRouter>
      <Animation />
      <Routes>
        <Route path="/" element={
          <Login />
        } />
        <Route path="/projects" element={
          <Layout title="projects">
            <Projects />
          </Layout>
        } />
        <Route path="/anal" element={
          <Layout title="analysis"></Layout>
        } />
        <Route path="/set" element={
          <Layout title="settings">
            <Settings />
          </Layout>
        } />
        <Route path="/*" element={<h1 id="error">ERROR 404</h1>} />

      </Routes>
    </HashRouter>
  );
}

export default App;
