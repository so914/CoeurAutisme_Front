import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfilSide = () => {
  return (
    <div>
        <div className="card border-0 shadow-sm" style={{height:"100vh"}}>
            <img  className='rounded-pill m-auto mt-5' src="./Gemini_Generated_Image_d3cwmhd3cwmhd3cw.png" alt="photo_profil" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
            <h5 className='mt-3 text-center'>Sophia Carson </h5>
            <div className="card-body px-4">
              <NavLink to='/profil' className={({ isActive }) => `nav-link card-body-profil d-flex ${isActive ? 'active-custom' : 'text-muted'}`}> <span className="material-symbols-outlined fs-5 mx-2 mt-1">people</span>Informations personnelles</NavLink>
              <NavLink to='/communaute/all' className={({ isActive }) => `nav-link card-body-profil ${isActive ? 'active-custom' : 'text-muted'}`}><span className="material-symbols-outlined fs-5 mx-2 mt-1">diversity_1</span>Mes communautés</NavLink>
              <NavLink to='/profil/telechargements' className={({ isActive }) => `nav-link card-body-profil d-flex ${isActive ? 'active-custom' : 'text-muted'}`}><span className="material-symbols-outlined fs-5 mx-2 mt-1">download</span>Mes téléchargements  </NavLink>
              <NavLink to='/profil/historique' className={({ isActive }) => `nav-link card-body-profil d-flex ${isActive ? 'active-custom' : 'text-muted'}`}><span className="material-symbols-outlined fs-5 mt-1 mx-2">history</span>Mes activtés </NavLink>
            </div>
        </div>
    </div>
  )
}

export default ProfilSide