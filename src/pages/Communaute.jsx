import React from 'react'
import { useOutletContext } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LogoChat from '../components/LogoChat'
import ComSide from '../components/ComSide'
import ComInterface from '../components/ComInterface'

const Communaute = () => {
  // On récupère le thème et la fonction depuis App.jsx via le contexte
    const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
        <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <div className="d-flex flex-grow-1 overflow-hidden position-relative">
          <ComSide/>
          <main className="flex-grow-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-5">
              <ComInterface/>
          </main>
        </div>
        <LogoChat/>
        <Footer/>
    </div>
  )
}

export default Communaute