import React from 'react';
import { NavLink } from "react-router-dom"

const Hero = () => {
  return (
    <header className="container my-4">
      <div className="position-relative rounded-5 overflow-hidden" style={{minHeight: '500px'}}>
        <img 
          src="./images/ChatGPT Image 8 mars 2026, 12_00_34.png" 
          className="position-absolute w-100 h-100" 
          style={{objectFit: 'cover', zIndex: -1}} 
          alt="garçon autiste souriant"
        />
        <div className="position-absolute w-100 h-100" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 0}}></div>
        
        <div className="position-relative z-1 p-5 d-flex flex-column justify-content-end h-100 text-white" style={{minHeight: '500px'}}>
          <span className="badge rounded-pill mb-3 py-2 px-3 border border-white" style={{width: 'fit-content'}}>SOUTIEN POUR CHAQUE FAMILLE</span>
          <h1 className="display-4 fw-black mb-3">
            Épanouissement pour chaque enfant : <br/> 
            <span style={{color: 'var(--primary-color)'}}>L'Autisme</span> en Afrique
          </h1>
          <p className="lead mb-4 opacity-75">Combler les lacunes de diagnostic et de soins grâce à la communauté.</p>
          <div className="d-flex gap-3">
            <NavLink className="btn btn-primary-custom btn-lg d-flex align-items-center fs-26 justify-content-center px-3 nav-link" to='/tests'>Commencer ici</NavLink>
            <NavLink to="#impact" className="btn btn-outline-custom btn-lg p-2">Notre Impact</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;