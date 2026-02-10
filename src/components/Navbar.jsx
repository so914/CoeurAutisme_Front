import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoSunny } from "react-icons/io5"; 
import { FiMoon } from "react-icons/fi";
import Cookies from 'js-cookie';

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  // Initialisation de l'état directement depuis le stockage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_data');
    const token = Cookies.get('auth_token');
    // Si on a le token ET l'utilisateur, on parse le JSON, sinon null
    return (savedUser && token) ? JSON.parse(savedUser) : null;
  });

  // Cette fonction permet de surveiller si l'utilisateur se connecte 
  // sur une autre page pour mettre à jour la Navbar instantanément
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

    // On écoute les changements de stockage (utile si on ouvre plusieurs onglets)
    window.addEventListener('storage', checkAuth);
    
    // On vérifie aussi à chaque changement de route
    checkAuth();

    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout =async () => {
    try {
        const response = await fetch("http://localhost:8000/api/logout");

        const data = await response.json();

        if (response.ok) {
            // Nettoyage du stockage
    Cookies.remove('auth_token');
    localStorage.removeItem('user_data');
    
    // Mise à jour de l'état pour faire disparaître le nom immédiatement
    setUser(null);
    
    // Redirection
    navigate('/login');
            console.log(data);
        } else {
            alert("Erreur : " + (data.message || "Échec de l'inscription"));
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
    }

  };

  return (
    <header className={`navbar navbar-expand-lg sticky-top custom-navbar ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
      <div className='container'>

        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img 
            className="logo-image d-inline-block align-top" 
            src="/images/Screenshot_2025-12-22_at_15-34-17_Google_Gemini-removebg-preview.png" 
            alt="logo" 
            style={{ height: '40px' }}
            />
          <span className="fw-bold">Coeur<span style={{color: 'var(--primary-dark)'}}>Autisme</span></span>
        </NavLink>


        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>


        <nav>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Accueil</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/tests">Tests</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ressources">Ressources</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/infrastructures">Infrastructures</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/communaute">Communauté</NavLink></li>
          </ul>


          <div className="d-flex align-items-center gap-3">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <button 
                  onClick={handleLogout} 
                  className="btn btn-sm rounded-pill px-3"
                >
                  Se déconnecter
                </button>
                 <button className="btn btn-primary-custom px-4 rounded-pill">S'engager</button>

              </div>
            ) : (
              <>
                <NavLink className="nav-link" to='/login'>Se connecter</NavLink>
                <button className="btn btn-primary-custom px-4 rounded-pill ">S'engager</button>
              </>
            )}

            <button 
                onClick={toggleTheme} 
                className="btn btn-link text-decoration-none text-reset p-2 d-flex align-items-center border-0"
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? (
                    <IoSunny className="fs-4" />
                ) : (
                    <FiMoon className='fs-4 text-dark' />
                )}
            </button>
          </div>
        </div>
    </nav>
      </div>
    </header>
  );
};

export default Navbar;