import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDiversity1 } from "react-icons/md";
import { LuSquareSplitHorizontal } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineDiversity1,MdOutlineMenuBook } from "react-icons/md";
import { LuBrain } from "react-icons/lu";
import { TbMap2 } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";


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
                    <form className="input-group" role="search">
                                        <span className="bg-background-light ps-2 pe-1 dark:bg-background-dark input-group-text border-end-0 rounded-start-5">
                                            <IoMdSearch size={18} />
                                        </span>
                                        
                                        <input className="form-control py-2 border-start-0 rounded-end-5 shadow-none" 
                                            type="search" 
                                            placeholder="Recherchez des chats" 
                                            aria-label="Search"
                                            
                                            />
                                    </form>
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

                                <nav className="nav flex-column gap-2 flex-grow-1">
                                    {[
                                        { to: "/", icon: <IoMdHome size={20} />, label: "Accueil", exact: true },
                                        { to: "/tests", icon:<LuBrain size={20} /> , label: "Tests" },
                                        { to: "/ressources", icon: <MdOutlineMenuBook size={20} />, label: "Ressources" },
                                        { to: "/communaute/all", icon: <MdOutlineDiversity1 size={20} />, label: "Mes communautés" },
                                        { to: "/infrastructures", icon: <TbMap2 size={20} />, label: "Infrastructures" }
                                    ].map((link) => (
                                        <NavLink 
                                          key={link.to}
                                          to={link.to} 
                                          end={link.exact}
                                          className={({ isActive }) => `nav-link d-flex gap-3 p-2  align-items-center rounded-3 cursor-pointer ${isActive ? 'active-custom' : 'text-muted'}`}
                                        >
                                          <span>{link.icon}</span> {link.label}
                                        </NavLink>
                                    ))}
                                </nav>
            </div>
        </aside>
    );
};

export default ChatSide;