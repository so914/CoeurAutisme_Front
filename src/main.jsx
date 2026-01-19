import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import DiagnosticPage from './pages/DiagnosticPage.jsx';
import Ressource from './pages/Ressource.jsx';
import Register from './pages/Register.jsx';
import Chatbot from './pages/Chatbot.jsx';
import Communaute from './pages/Communaute.jsx';
import Infrastructures from './pages/Infrastructures.jsx';
import Generalites from './components/Generalites.jsx';
import Sujets from './components/Sujets.jsx';
import MesCommunautes from './components/MesCommunautes.jsx';
import InfastructuresAll from './pages/InfastructuresAll.jsx';
import InfrasPays from './pages/InfrasPays.jsx';
import Profil from './pages/Profil.jsx';
import Telechargements from './pages/Telechargements.jsx';
import CarteInfras from './pages/CarteInfras.jsx';

createRoot(document.getElementById('root')).render(
  /*<StrictMode>*/
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/tests' element={<DiagnosticPage/>} />
          <Route path='/ressources' element={<Ressource/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/chat' element={<Chatbot/>} />
          <Route path='/infrastructures' element={<Infrastructures/>} />
          <Route path="/communaute" element={<Communaute/>}>
            <Route index element={<Generalites/>} /> 
            <Route path="sujets" element={<Sujets/>} />
            <Route path="all" element={<MesCommunautes />} /> 
          </Route>
          <Route path='infrastructures/all' element={<InfastructuresAll/>}></Route>
          <Route path='/infrastructures/pays/:id' element={<InfrasPays/>}></Route>
          <Route path='/profil' element={<Profil/>}></Route>
          <Route path='/telechargements' element={<Telechargements/>}
          ></Route>
          <Route path='/carte/infras' element={<CarteInfras/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  /*</StrictMode>,*/
)