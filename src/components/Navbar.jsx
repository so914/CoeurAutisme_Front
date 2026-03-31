import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoSunny } from "react-icons/io5"; 
import { FiMoon } from "react-icons/fi";
import Cookies from 'js-cookie';

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_data');
    const token = Cookies.get('auth_token');
    return (savedUser && token) ? JSON.parse(savedUser) : null;
  });

  const [isClicked,setClicked]=useState(false);
  const showMenu=()=>{
    setClicked(!isClicked);
    console.log(isClicked);
  }

  useEffect(() => {
  if (isClicked) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [isClicked]);

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user_data');
      const token = Cookies.get('auth_token');
      if (savedUser && token) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', checkAuth);
    checkAuth();

    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST"
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.remove('auth_token');
        localStorage.removeItem('user_data');
        setUser(null);
        navigate('/login');
      } else {
        alert("Erreur : " + (data.message || "Échec"));
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <header className={`navbar navbar-expand-lg sticky-top custom-navbar ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
      
      <div className="container d-flex align-items-center justify-content-between">

        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img 
            src="/images/Screenshot_2025-12-22_at_15-34-17_Google_Gemini-removebg-preview.png" 
            alt="logo"
            style={{ height: "40px" }}
          />
          <span className="fw-bold">
            Coeur<span style={{color: 'var(--primary-dark)'}}>Autisme</span>
          </span>
        </NavLink>


        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          onClick={showMenu}
        >
          {!isClicked ? <span className="navbar-toggler-icon"></span> : <span>X</span>}
        </button>

        {isClicked && (
                    <div className="mobile-menu position-fixed background-light top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
       style={{  zIndex: 999 }}>
          <ul className="navbar-nav list-style text-center w-100">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Accueil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tests">Tests</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ressources">Ressources</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/infrastructures">Infrastructures</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/communaute">Communauté</NavLink>
            </li>
          </ul> </div>
                )}
                <div id="MobileNav" className='d-none'>

          </div>


        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Accueil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tests">Tests</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ressources">Ressources</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/infrastructures">Infrastructures</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/communaute">Communauté</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">

            {user ? (
              <>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-sm btn-outline-danger rounded-pill px-3"
                >
                  Se déconnecter
                </button>

                <NavLink className="nav-link btn btn-primary-custom px-4 py-1 rounded-pill" to="/communaute">
                  S'engager
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/login">
                  Se connecter
                </NavLink>

                <NavLink className="nav-link btn btn-primary-custom px-4 py-1 rounded-pill" to="/communaute">
                  S'engager
                </NavLink>
              </>
            )}


            <button 
              onClick={toggleTheme}
              className="btn border-0"
            >
              {theme === 'dark' ? (
                <IoSunny className="fs-4 text-warning" />
              ) : (
                <FiMoon className="fs-4" />
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;