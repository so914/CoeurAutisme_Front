import React, {useState } from "react";
import LogoChat from "../components/LogoChat";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardCountry from "../components/CardCountry";
import { NavLink, useOutletContext, useNavigate } from "react-router-dom";

const Infrastructures = () => {
  const navigate=useNavigate()
  
  function locateMe() {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        navigate("/carte/infras", {
          state: { lat, lng}
        });
      },
      (err) => {
        console.error(err);
        alert("Impossible de récupérer votre position");
      },
    );
  }
  
  
    const paysAfrique = [
        {
          nom: "RDC",
          code: "RDC",
          drapeau: "https://flagcdn.com/w320/cd.png",
          nombreInfrasAutisme: 12,
          continent: "Afrique Centrale"
        },
        {
          nom: "Congo",
          code: "RC",
          drapeau: "https://flagcdn.com/w320/cg.png",
          nombreInfrasAutisme: 5,
          continent: "Afrique Centrale"
        },
        {
          nom: "Sénégal",
          code: "SN",
          drapeau: "https://flagcdn.com/w320/sn.png",
          nombreInfrasAutisme: 8,
          continent: "Afrique de l'Ouest"
        },
        {
          nom: "Côte d'Ivoire",
          code: "CI",
          drapeau: "https://flagcdn.com/w320/ci.png",
          nombreInfrasAutisme: 10,
          continent: "Afrique de l'Ouest"
        }
    ];

  const [search,setSearch]=useState("");
  const searchTerm=(e)=>{
    let value=e.target.value;
    value.length >2 && setSearch(value)
  }

  // On récupère le thème et la fonction depuis App.jsx via le contexte
  const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="container-fluid">
      <div className="row p-3">
        <div className="col-md-5 overflow-hidden position-relative">
          <div className="m-5 p-3 text-intro">
            <h3 className="fw-bolder mb-3">
              Trouvez un soutien pour l'autisme près de chez vous
            </h3>
            <h6 className="text-doux">
              Sélectionnez votre pays pour découvrir des institutions
              spécialisées, des thérapeutes et des groupes communautaires
              adaptées à vos besoins.
            </h6>
            <form className="d-flex input-group mb-3 mt-5" role="search">
              <span className="bg-background-light dark:bg-background-dark input-group-text border-end-0 rounded-start-5">
                <span className="material-symbols-outlined text-color">
                  search
                </span>
              </span>

              <input
                className="form-control border-start-0 rounded-end-5 shadow-none p-3"
                type="search"
                placeholder="Recherchez votre pays..."
                aria-label="Search"
                onChange={searchTerm}
              />
            </form>
            <button className="inline-flex rounded-5 p-3 background-flou shadow-sm text-color w-100">
              <span className="d-flex justify-content-center align-items-center" onClick={locateMe}>
                <span className="material-symbols-outlined me-2">
                  my_location
                </span>
                Utiliser ma position actuelle
              </span>
            </button>
            <div className="row mt-5 mb-3">
              <div className="col-md-6">
                    <h4 className="mb-4 text-doux">Lieux populaires</h4>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <NavLink to='/infrastructures/all' className='text-color2 fw-bold'>Voir tout</NavLink>
                </div>
            </div>
            <div className="row">
              {paysAfrique
                .filter((val)=>{
                  return val.nom.toLowerCase().includes(search.toLowerCase())
              })
                .map((val)=>(
                    
                    <div className="col-12 col-md-6" key={val.code}>
                        <CardCountry country={val}/>
                    </div>
                ))
              }
            </div>
            <div className=" mt-5">
            <h6 className="bg-background-white dark:bg-background-dark text-doux w-100 d-flex border shadow-sm rounded-4 p-4 mt-5">
                <span className="material-symbols-outlined me-2">info</span>
                <span>Vous ne trouvez pas votre pays? Nous élargissons constamment notre réseau. <NavLink className='fw-bolder'>Contactez-nous</NavLink> pour suggérer un lieu.</span></h6>
          </div>
          </div>
          
          
        </div>

        <div className="col-md-7 mt-5  overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-5">
          <div className="overflow-y-auto carte_afrique" style={{ maxWidth: "900px" }}>
            <img className="" src="./Gemini_Generated_Image_lk6g2qlk6g2qlk6g-removebg-preview.png" alt="carte_photo" />
          </div>
        </div>
        <LogoChat />
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Infrastructures;
