import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import { MdOutlineDiversity1 } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { MdAssignment } from "react-icons/md";

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
          <MdAssignment size={20} /> Évaluation
        </NavLink>
        
        <NavLink 
          to="/profil" 
          className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
        >
          <FaRegUser size={20}/> Mon Profil
        </NavLink>

        <NavLink 
          to="/ressources" 
          className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
        >
          <MdMenuBook size={20}/> Ressources
        </NavLink>

        <NavLink 
          to="/communaute" 
          className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
        >
          <MdOutlineDiversity1 size={20}/> Communauté
        </NavLink>
        <NavLink 
          to="/tests/historique" 
          className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
        >
          <LuHistory size={20}/> Historique
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