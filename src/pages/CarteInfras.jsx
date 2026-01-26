import React from 'react'
import InfraSide from '../components/InfraSide'
import Carte from '../components/Carte'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {useOutletContext } from "react-router-dom";
import LogoChat from '../components/LogoChat'

const CarteInfras = () => {
  const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <div className="container-fluid px-5">
            <div className="row">
              <div className="col-md-5">
                
              </div>
              <div className="col-md-7">
                <Carte/>
              </div>
              <LogoChat/>
            </div>
        </div>
      <Footer/>
    </div>
  )
}

export default CarteInfras