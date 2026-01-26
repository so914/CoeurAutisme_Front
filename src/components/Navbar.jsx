import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoSunny} from "react-icons/io5"; 
import { FiMoon } from "react-icons/fi";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className={`navbar navbar-expand-lg sticky-top custom-navbar ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div>
            <img className="logo-image d-inline-block align-top" src="/images/Screenshot_2025-12-22_at_15-34-17_Google_Gemini-removebg-preview.png" alt="logo" />
          </div>
          <span className="fw-bold">Coeur<span style={{color: 'var(--primary-dark)'}}>Autisme</span></span>
        </NavLink>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Accueil</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/tests">Tests</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ressources">Ressources</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/infrastructures">Infrastructures</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/communaute">Communauté</NavLink></li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3">
          <NavLink className="nav-link" to='/login'>Se connecter</NavLink>
          <button className="btn btn-primary-custom px-4 rounded-pill">S'engager</button>
        </div>
        <div className="d-flex">
          <button 
    onClick={toggleTheme} 
    className="btn btn-link text-decoration-none text-reset p-2 d-flex align-items-center"
    aria-label="Toggle Theme"
>
    {theme === 'dark' ? (
        <IoSunny className="fs-4" />
    ) : (
        <FiMoon className='fs-3' />
    )}
</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;