import React from 'react'
import { useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import MaVoixMagique from "../components/MaVoixMagique"

const RessourcesGames = () => {
    const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
        <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <main>
          <MaVoixMagique />
        </main>
        <Footer/>
    </div>
  )
}
export default RessourcesGames;
