import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineDiversity1 } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { HiMiniUsers } from "react-icons/hi2";
import { FiDownload } from "react-icons/fi";

const ProfilSide = () => {
  return (
    <div>
        <div className="card border-0 shadow-sm" style={{height:"100vh"}}>
            <img  className='rounded-pill m-auto mt-5' src="./Gemini_Generated_Image_d3cwmhd3cwmhd3cw.png" alt="photo_profil" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
            <h5 className='mt-3 text-center'>Sophia Carson </h5>
            <div className="card-body px-4">
              <NavLink to='/profil' className={({ isActive }) => `nav-link card-body-profil d-flex ${isActive ? 'active-custom' : 'text-muted'}`}> <HiMiniUsers size={20} className='me-2'/> Informations personnelles</NavLink>
              <NavLink to='/communaute/all' className={({ isActive }) => `nav-link card-body-profil ${isActive ? 'active-custom' : 'text-muted'}`}><MdOutlineDiversity1 size={20} className='me-2'/> Mes communautés</NavLink>
              <NavLink to='/telechargements' className={({ isActive }) => `nav-link card-body-profil d-flex ${isActive ? 'active-custom' : 'text-muted'}`}><FiDownload size={20} className='me-2'/> Mes téléchargements  </NavLink>
              <NavLink to='/profile/historique' className={({ isActive }) => `nav-link card-body-profil d-flex ${isActive ? 'active-custom' : 'text-muted'}`}><LuHistory size={20} className='me-2'/> Mes activtés </NavLink>
            </div>
        </div>
    </div>
  )
}

export default ProfilSide