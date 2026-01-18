import React from "react"
import { NavLink } from "react-router-dom";

const ComSide = () => {
    return (
        <aside className="bg-background-light dark:bg-background-dark d-none d-lg-flex flex-column border-end p-4 side-bar-diagnostic dark:text-white h-auto" style={{minWidth: "300px" }}>
        
            <div className="mb-5">
                <h4 className="fw-bold mb-0 mt-4">Espace Communauté</h4>
                <p className="small fw-bold p-descr">Portail Famille</p>
            </div>
        
            <nav className="nav flex-column gap-2 flex-grow-1">
                {[
                    { to: "/communaute", icon: "diversity_1", label: "Généralités" },
                    { to: "/communaute/sujets", icon: "subject", label: "Sujets" },
                    { to: "/ressources", icon: "menu_book", label: "Ressources" },
                    { to: "/communaute/all", icon: "diversity_1", label: "Mes communautés" }
                ].map((link) => (
                    <NavLink 
                      key={link.to}
                      to={link.to} 
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