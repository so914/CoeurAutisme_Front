import React from "react";
import { FiDownload } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { PiVideoBold } from "react-icons/pi";
import { SiSecurityscorecard } from "react-icons/si";
import { SlGameController } from "react-icons/sl";
import { IoMdSearch } from "react-icons/io";

const Ressources = () => {
  
  const cartes = [
    {
      title: "Vidéos",
      background: "./images/pexels-karola-g-7269621.jpg",
      path:"/ressources/videos",
      description:"Découvrez tous les aspects de l'autisme en un clic.",
      icone:<PiVideoBold />
    },
    {
      title: "Cartes mentales",
      background: "./images/pexels-karola-g-7296427.jpg",
      path:"/ressources/pictures",
      description:"Découvrez des cartes mentales qui relatent votre quotiden.",
      icone:<SiSecurityscorecard />
    },
    {
      title: "Jeux",
      background: "./images/pexels-pavel-danilyuk-8422207.jpg",
      path:"/ressources/games",
      description:"Apprendre n'a jamais été facile , jouer dès maintenant!",
      icone:<SlGameController />
    },
  ];

  
      const categories = [
        "Tout",
        "Vie de famille",
        "Éducation",
        "Routine"
      ];


  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="d-flex justify-content-end pt-4">
                  <div className="w-45">
            <form className="input-group" role="search">
                    <span className="bg-background-light  dark:bg-background-dark input-group-text border-end-0 rounded-start-5">
                        <IoMdSearch size={28} />
                    </span>
                    
                    <input className="form-control p-2 border-start-0 rounded-end-5 shadow-none" 
                        type="search" 
                        placeholder="Recherchez un mot clé ..." 
                        aria-label="Search"
                        
                        />
                </form>

                </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-7">
            <h2 className="fw-bold mt-4">
              Respirer, comprendre et grandir ensemble
            </h2>
            <p className="text-intro">
              Parce que chaque enfant est une promesse et chaque parent un
              pilier, nous avons créé ce refuge de savoir. Découvrez des outils
              ludiques et des routines apaisantes pour harmoniser votre
              quotidien. Ici, la sensibilisation devient une source de lumière,
              et chaque ressource est un pas de plus vers une sérénité partagée.
            </p>
            
          </div>  

        </div>
           <div className="d-flex gap-4 my-3">
              {cartes.map((carte, index) => (
                <NavLink to={carte.path} className="nav-link">
                    <div
                  key={index}
                  className="card cards card-custom rounded-4 shadow-sm"
                  style={{ width: "22rem"}}
                >
                  <div className="bg-primary-custom fs-3 icone-content rounded-pill text-center text-white">{carte.icone}</div>
                  <img
                    src={carte.background}
                    className="card-img-top rounded-4"
                    alt={carte.title}
                  />
                  <div>
                    <h6 className="card-title text-primary-custom mx-auto py-1 rounded-5 text-center">{carte.title}</h6>
                    <p className="px-2">{carte.description}</p>
                  </div>
                  </div>
                </NavLink>
              ))}
            </div>


      </div>

    </div>
  );
};

export default Ressources;
