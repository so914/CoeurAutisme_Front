import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import TopHeader from '../components/Topheader'
import Sidebar from '../components/Sidebar'
import { NavLink } from 'react-router-dom';


const Modules = () => {
    const { theme, toggleTheme } = useOutletContext();

    const categories=["Tout","Vidéos","Images"];

    const fakeModules = [
  {
    id: 1,
    nom: "Comprendre les signes précoces de l'autisme",
    type: "Vidéos",
    public: "parents",
    photo_couverture: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000",
    description: "Une série de vidéos explicatives pour identifier les premiers signes du TSA chez le jeune enfant (0-3 ans).",
    objectif: "Apprendre à observer les interactions sociales, identifier les stéréotypies et savoir quand consulter un spécialiste."
  },
  {
    id: 2,
    nom: "Kit de communication : La Routine du Matin",
    type: "Images",
    public: "Enfants",
    photo_couverture: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000",
    description: "Banque d'images et de séquences visuelles pour faciliter l'autonomie lors du réveil et de la préparation matinale.",
    objectif: "Réduire l'anxiété liée aux transitions et favoriser l'indépendance de l'enfant grâce à un support visuel séquentiel."
  }
];

  const [Actif,setActif]=useState("Tout");

  const data=fakeModules.filter(m=>
    Actif==="Tout" || m.type===Actif
  )
  return (
    <div>
             <TopHeader theme={theme} toggleTheme={toggleTheme}/>
            <div className="d-flex flex-grow-1">
                      <Sidebar />                      
                      <main className={`flex-grow-1 p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
                        <div className="container mb-3">
                            <div className="row">
                              <div className="col-md-9">
                                <h3>Gestion des modules</h3>
                              </div>
                              <div className="col-md-3 d-flex justify-content-end">
                                <NavLink to='/register/modules' className="btn btn-primary-custom nav-link d-flex align-items-center rounded-3 p-2" style={{width:"80%"}}>
                                        <span className="material-symbols-outlined fs-5">add</span>Nouveau Module
                                      </NavLink>
                              </div>
                              
                            
                            </div>
                            {categories.map((c)=>(
                                <button className='border-0 m-2 p-2 rounded-4' key={c} onClick={()=>setActif(c)}>{c}</button>
                            ))}
                        </div>
                        <div className="container">
                            {data.map((mod)=>(
                              <NavLink to={`/modules/info/${mod.id}`} className="nav-link">
                                <div className="card_module shadow-sm rounded-4" key={mod.id}>
                              <div className="row">
                                <div className="col-md-3 couverture_module">
                                  <img src={mod.photo_couverture} className='card-img-top' alt="couverture module" />
                                </div>
                                <div className="col-md-9">
                                  <div className="row mt-3 d-flex">
                                    <div className="col-md-7">
                                      <h5>{mod.nom}</h5>
                                      </div>
                                    <div className="col-md-5 col_info d-flex">
                                      <NavLink to={`/register/ressources/${mod.id}/${mod.type}/${mod.nom}`} className="nav-link d-flex btn_new">
                                      <span className="material-symbols-outlined fs-4 fw-bolder">add</span>
                                    </NavLink>
                                    </div>
                                  </div>
                                  <p className='p-mod'>{mod.description}</p>
                                  <small>Nombre de ressources: 4</small>
                                </div>
                              </div>
                            </div>
                              </NavLink>
                            ))}
                        </div>
                      </main>
                    </div>
        </div>
  )
}

export default Modules