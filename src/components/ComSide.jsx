import React from "react"
import { NavLink } from "react-router-dom";
import { MdOutlineDiversity1,MdOutlineSubject,MdTravelExplore ,MdOutlineMenuBook } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";


const ComSide = () => {
    return (
        <aside className="bg-background-light dark:bg-background-dark d-none d-lg-flex flex-column border-end p-4 side-bar-diagnostic dark:text-white h-auto" style={{minWidth: "300px" }}>
        
            <div className="mb-5">
                <h4 className="fw-bold mb-0 mt-4">Espace Communauté</h4>
                <p className="small fw-bold p-descr">Portail Famille</p>
            </div>
        
            <nav className="nav flex-column gap-2 flex-grow-1">
                {[
                    { to: "/communaute", icon: <MdTravelExplore />, label: "Explorer",exact: true },
                    { to: "/communaute/sujets", icon: <MdOutlineSubject/>, label: "Sujets" },
                    { to: "/ressources", icon: <MdOutlineMenuBook/>, label: "Ressources" },
                    { to: "/communaute/all", icon: <MdOutlineDiversity1 />, label: "Mes communautés" },
                    { to: "register/communaute", icon: <IoAddSharp />, label: "Créer une communauté" }
                ].map((link) => (
                    <NavLink 
                      key={link.to}
                      to={link.to} 
                      end={link.exact}
                      className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
                    >
                      <span className="material-symbols-outlined">{link.icon}</span> {link.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default ComSide;