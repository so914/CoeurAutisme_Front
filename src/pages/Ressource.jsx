import React from 'react'
import { useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Ressources from '../components/Ressources';
import LogoChat from '../components/LogoChat';

const Ressource = () => {
    // On récupère le thème et la fonction depuis App.jsx via le contexte
    const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
        <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <LogoChat/>
        <Ressources/>
        <Footer/>
    </div>
  )
}

export default Ressource