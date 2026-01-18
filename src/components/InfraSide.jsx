import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

const InfraSide = () => {

  const Id= useParams();

    const categorie=["Tout","Ecoles","Centres d'aide","Hôpitaux"]
    const [filtreActif, setFiltreActif] = useState("Tout");
  const centresAutisme = [
  {
    id: 1,
    nom: "Centre Éveil de Kinshasa",
    verifie: true,
    note: 4.7,
    localisation: {
      lieu:"Gombe",
      ville: "Kinshasa", 
      pays:"RDC"},
    distance: "2.5 km",
    services: ["Diagnostic précoce", "Orthophonie"],
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400",
    categorie: "Centres d'aide"
  },
  {
    id: 2,
    nom: "Institut de l'Espoir - Brazzaville",
    verifie: true,
    note: 4.6,
    localisation:{ 
    lieu:"Poto-Poto", 
    ville:"Brazzaville", 
    pays:"Congo"},
    distance: "4.1 km",
    services: ["Éducation spécialisée", "Soutien familial"],
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400",
    categorie: "Ecoles"
  },
  {
    id: 3,
    nom: "Clinique Neuro-Diversité Lubumbashi",
    verifie: false,
    note: 4.2,
    localisation: {
    ville:"Lubumbashi",
    pays: "RDC"},
    distance: "1540 km",
    services: ["Ergothérapie", "Intégration sensorielle"],
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400",
    categorie: "Hôpitaux"
  },
  {
    id: 4,
    nom: "Espace Autisme Dakar",
    verifie: true,
    note: 4.9,
    localisation: {
    lieu:"Plateau", 
    ville:"Dakar", 
    pays: "Sénégal"},
    distance: "3200 km",
    services: ["Thérapie ABA", "Ateliers sociaux"],
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400",
    categorie: "Centres d'aide"
  },
  {
    id: 5,
    nom: "Pointe-Noire Blue Center",
    verifie: false,
    note: 4.4,
    localisation: {
    lieu:"Centre-ville",
    ville: "Pointe-Noire", 
    pays:"Congo"},
    distance: "510 km",
    services: ["Suivi psychologique", "Garderie"],
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400",
    categorie: "Centres d'aide"
  },
  {
    id: 6,
    nom: "Abidjan Inclusion School",
    verifie: true,
    note: 4.8,
    localisation: {
    lieu:"Cocody", 
    ville: "Abidjan", 
    pays:"Côte d'Ivoire"
    },
    distance: "1800 km",
    services: ["Scolarité adaptée", "Sport inclusif"],
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400",
    categorie: "Ecoles"
  }
];

  const centresbyPays=centresAutisme.filter((el)=> el.localisation.pays===(Id.id)
)
  
    const centresAffichees = centresbyPays.filter(v => 
        filtreActif === "Tout" || v.categorie === filtreActif
    );
    console.log(centresAffichees)
    const [search,setSearch]=useState("");
      const searchTerm=(e)=>{
        let value=e.target.value;
        value.length >2 && setSearch(value)
      }

  return (
    <div>
        <div className="container">
          <h5 className='my-5'>Une recherche simplifiée pour des résultats plus pertinents grâce aux boutons.</h5>
            <div className="card card-search p-3 shadow">
                <form className="d-flex input-group mb-3" role="search">
                    <span className="bg-background-light dark:bg-background-dark input-group-text border-end-0 rounded-start-4">
                        <span className="material-symbols-outlined text-muted">search</span>
                    </span>
                    
                    <input className="form-control border-start-0 rounded-end-4 shadow-none" 
                        type="search" 
                        placeholder="Ville, services ou nom du centre,..." 
                        aria-label="Search"
                        onChange={searchTerm}
                        />
                </form>
                <div className="d-flex infra gap-2">
                    {categorie.map((c)=>(
                        <button key={c} onClick={() => setFiltreActif(c)}
                            className={`button-filter ${filtreActif === c? "active" : ""}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>
            <div className='mt-5'>
                <p>Affichages des {centresAffichees.length} établissements</p>
                {centresAffichees
                .filter((centres)=>{
                  return centres.nom.includes(search)
                })
                .map((centres)=>(
                    <div className="card shadow border-0 rounded-4 mb-4" key={centres.id} style={{width:'99%',height:"auto"}}>
                        <img src={centres.image} alt="image_infra" className="card-img-top " style={{width:'99%',height:"150px"}}/>
                        <div className="card-body">
                            <div className="row fw-bolder">
                                <div className="col-md-10"><h6>{centres.nom}</h6></div>
                                <div className="bg-background-light dark:bg-background-dark d-flex col-md-2 px-3 rounded-4 span-note"><span >{centres.note}</span><span className="material-symbols-outlined fs-5">star</span></div>
                            </div>
                            <p className='d-flex locate'><span className="material-symbols-outlined fs-5">location_on</span>{centres.localisation.lieu} | {centres.localisation.ville} <span className='mx-4'>Situé à: {centres.distance}</span></p>
                            {centres.services.map((srv,index)=>(
                                <button key={index} className='border-0 rounded-4 p-2 mx-1 fs-petite'>{srv}</button>
                            ))}
                            <hr />
                            <div className="d-flex gap-3">
                                <button className="btn btn-primary-custom fw-bolder px-5 rounded-pill">Contact</button>
                                <button className='btn btn-sec-custom px-5' >Détails</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default InfraSide