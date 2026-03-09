import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDiversity1 } from "react-icons/md";
import { LuSquareSplitHorizontal } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";



const ChatSide = ({ isVisible, toggle }) => {
    // Si 'isVisible' est faux, on applique 'd-none' pour libérer l'espace
    // Sinon on affiche en flex-column avec une largeur fixe
    return (
        <aside 
            className={`bg-background-light dark:bg-background-dark border-end p-4 h-100 
            ${!isVisible ? 'd-none' : 'd-lg-flex flex-column'}`} 
            style={{ 
                height: "100vh", 
                maxWidth: "300px",
                transition: "all 0.3s ease" 
            }}
        >
    
            <div className='d-flex mb-2'>
                    <span className="text-primary-custom mt-2"><MdDiversity1 size={32} /></span>
                    
                    {/* L'icône qui déclenche la fermeture via la prop 'toggle' */}
                    <span 
                    onClick={toggle} 
                    className="logo-separateur cursor-pointer ms-auto"
                    title="Fermer la barre latérale"
                    >
                    <LuSquareSplitHorizontal size={28}/>
                    </span>
                    </div>
                    <h6>CoeurAustim Support</h6>


            <div className='mt-4 px-3'>
                <div className='d-flex align-items-center mb-3 cursor-pointer'>
                    <span className="me-2"><FiEdit size={20}/></span>
                    <span>Nouveau chat</span>
                </div>
                <div className='d-flex align-items-center cursor-pointer'>
                    <span className="me-2"><IoMdSearch size={22} /></span>
                    <span>Rechercher des chats</span>
                </div>
            </div>

            <hr className="mx-3" />

            <div className='my-3 px-3 flex-grow-1 overflow-auto'>
                <h6 className="text-muted small text-uppercase fw-bold">Vos chats</h6>
                <div className="cart-chat mt-3">
                    <p className="p-2 rounded hover-effect cursor-pointer" >Signes alertants</p>
                    <p className="p-2 rounded hover-effect cursor-pointer" >Centres locaux</p>
                    <p className="p-2 rounded hover-effect cursor-pointer" >Stratégies en cas de crise</p>
                </div>
            </div>

            <hr className="mx-3" />
            <div className="mt-auto px-3">
                 <div className="d-flex align-items-center">
                                <nav className="nav flex-column gap-2 flex-grow-1">
                                    {[
                                        { to: "/accueil", icon: <MdTravelExplore />, label: "Accueil",exact: true },
                                        { to: "/tests", icon: <MdOutlineSubject/>, label: "Tests" },
                                        { to: "/ressources", icon: <MdOutlineMenuBook/>, label: "Ressources" },
                                        { to: "/communaute/all", icon: <MdOutlineDiversity1 />, label: "Mes communautés" },
                                        { to: "/infrastructures", icon: <IoAddSharp />, label: "Infrastructures" }
                                    ].map((link) => (
                                        <NavLink 
                                          key={link.to}
                                          to={link.to} 
                                          end={link.exact}
                                          className={({ isActive }) => `nav-link d-flex align-items-center gap-3 p-3 rounded-3 ${isActive ? 'active-custom' : 'text-muted'}`}
                                        >
                                          <span >{link.icon}</span> {link.label}
                                        </NavLink>
                                    ))}
                                </nav>
                 </div>
            </div>
        </aside>
    );
};

export default ChatSide;