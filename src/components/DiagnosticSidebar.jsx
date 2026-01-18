import React from 'react';
import { NavLink } from 'react-router-dom';

const DiagnosticSidebar = () => {
  return (
    <aside 
      className="bg-background-light dark:bg-background-dark d-none d-lg-flex flex-column border-end p-4 side-bar-diagnostic">

      <div className="mb-5">
        <h4 className="fw-bold mb-0">Test de prédépistage</h4>
        <p className="small fw-bold p-descr">Portail Famille</p>
      </div>

      <nav className="nav flex-column gap-2 flex-grow-1">
        <NavLink 
          to="/tests" 
          className={({ isActive }) => 
            `nav-link d-flex align-items-center gap-3 p-3 ${
              isActive ? 'active-custom' : 'text-dark dark:text-light'
            }`
          }
        >
          <span className="material-symbols-outlined">assignment</span> Évaluation
        </NavLink>
        
        <NavLink 
          to="/profil" 
          className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
        >
          <span className="material-symbols-outlined">person</span> Mon Profil
        </NavLink>

        <NavLink 
          to="/ressources" 
          className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
        >
          <span className="material-symbols-outlined">menu_book</span> Ressources
        </NavLink>

        <NavLink 
          to="/communaute" 
          className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
        >
          <span className="material-symbols-outlined">diversity_1</span> Communauté
        </NavLink>
        <NavLink 
          to="/tests/historique" 
          className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
        >
          <span className="material-symbols-outlined">history</span> Historique
        </NavLink>
      </nav>

      {/* Carte d'aide en bas */}
      <div 
        className="p-3 rounded-4 text-center mt-auto" 
        style={{ backgroundColor: 'rgba(13, 242, 89, 0.1)', border: '1px solid rgba(13, 242, 89, 0.2)' }}
      >
        <p className="small fw-bold mb-2"> Besoin d'aide avec les questions ?</p>
        <button 
          className="btn btn-link p-0 small fw-bold text-decoration-none" 
          style={{ color: 'var(--primary-color)' }}
        >
          <NavLink to='/chat' className='nav-link d-flex'> <span className="material-symbols-outlined me-1">smart_toy</span> Discuter avec notre assistant IA</NavLink>
        </button>
      </div>
    </aside>
  );
};

export default DiagnosticSidebar;