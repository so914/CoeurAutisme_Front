import {React , useState} from 'react';
import Sidebar from '../components/Sidebar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NavLink, useOutletContext } from 'react-router-dom';
import TopHeader from '../components/Topheader';
import { IoMdAdd } from "react-icons/io";
// Correction icône
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';



const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const Map = () => {
    const { theme, toggleTheme } = useOutletContext();

    

const infrastructures = [
    // --- CÔTE D'IVOIRE ---
    { 
        id: 1, 
        name: "Centre Action Autisme - Abidjan", 
        lat: 5.3484, 
        lng: -4.0305, 
        country: "Côte d'Ivoire", 
        flag: "https://flagcdn.com/w40/ci.png" 
    },
    { 
        id: 2, 
        name: "Institut National de Santé Publique", 
        lat: 5.3320, 
        lng: -4.0160, 
        country: "Côte d'Ivoire", 
        flag: "https://flagcdn.com/w40/ci.png" 
    },
    
    // --- SÉNÉGAL ---
    { 
        id: 3, 
        name: "Centre Aminata Mbaye - Dakar", 
        lat: 14.7167, 
        lng: -17.4677, 
        country: "Sénégal", 
        flag: "https://flagcdn.com/w40/sn.png" 
    },
    
    // --- CONGO BRAZZAVILLE ---
    { 
        id: 5, 
        name: "Hôpital de Base de Poto-Poto", 
        lat: -4.2634, 
        lng: 15.2832, 
        country: "Congo-Brazzaville", 
        flag: "https://flagcdn.com/w40/cg.png" 
    },

    // --- RDC (KINSHASA) ---
    { 
        id: 7, 
        name: "Centre de Référence pour Autisme - Kinshasa", 
        lat: -4.3224, 
        lng: 15.3070, 
        country: "RDC", 
        flag: "https://flagcdn.com/w40/cd.png" 
    }
];

const [selectedCountry, setSelectedCountry] = useState(null);
    // On filtre les données globales pour n'avoir que celles du pays cliqué
const filteredInfras = selectedCountry 
    ? infrastructures.filter(infra => infra.country === selectedCountry)
    : [];

const grouped = infrastructures.reduce((acc, curr) => {
    // On récupère le nom du pays de l'infrastructure actuelle (curr)
    const pays = curr.country;

    // Est-ce que ce pays est déjà dans notre panier (acc) ?
    if (!acc[pays]) {
        // Non ? Alors on crée une entrée toute neuve pour ce pays
        acc[pays] = {
            country: pays,
            flag: curr.flag,
            count: 1
        };
    } else {
        // Oui ? Alors on augmente juste le compteur du pays dans le panier
        acc[pays].count += 1;
    }

    return acc;
}, {}); // <--- Le "{}" ici dit que le panier est un objet vide au départ

//convertis l'objet en tableau
 const statsCountries = Object.values(grouped);

    // avec un zoom faible (4) pour voir l'Afrique 
    const initialCenter = [3.0, 5.0]; 

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <TopHeader theme={theme} toggleTheme={toggleTheme} />
            
            <div className="d-flex flex-grow-1">
                <Sidebar theme={theme} toggleTheme={toggleTheme} />
                
                <main className={`flex-grow-1 p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
                    <div className="row">
                        <div className="col-md-10">
                            <h3 className="my-4">Gestion des infrastructures en Afrique Francophone</h3>     
                        </div>
                        <div className="col-md-2 d-flex justify-content-end">
                            <h6 className='my-4 text-color'><NavLink to='/register/infrastructures'><IoMdAdd /></NavLink></h6>
                        </div>
                    </div>
                    <div style={{ height: "700px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                        <MapContainer 
                            center={initialCenter} 
                            zoom={4} 
                            scrollWheelZoom={true}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {infrastructures.map((infra) => (
                                <Marker 
                                    key={infra.id} 
                                    position={[infra.lat, infra.lng]} 
                                    icon={defaultIcon}
                                >
                                    <Popup>
                                        <div className="text-center">
                                            <h6 className="fw-bold mb-1">{infra.name}</h6>
                                            <span className=" mb-2">{infra.country}</span>
                                            <br />
                                            <button className="btn btn-sm btn-outline-primary mt-1">
                                                Voir les détails
                                            </button>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                    <div className='mt-5'>
                        <h4>Pays couverts</h4>
                        <div className="row">
    {/* COLONNE GAUCHE : La liste des pays (Résumé) */}
    <div className="col-md-4">
        {statsCountries.map((item) => (
            <div 
                className={`card mb-2 cp ${selectedCountry === item.country ? 'border-primary' : ''}`} 
                key={item.country}
                onClick={() => setSelectedCountry(item.country)} // On définit le pays au clic
                style={{ cursor: 'pointer' }}
            >
                <div className="card-body d-flex align-items-center gap-3">
                    <img src={item.flag} width="30" alt="" />
                    <div className="flex-grow-1">
                        <h6 className="mb-0">{item.country}</h6>
                        <small className="text-muted">{item.count} Institutions</small>
                    </div>
                    <span className="material-symbols-outlined">
                        {selectedCountry === item.country ? 'expand_less' : 'expand_more'}
                    </span>
                </div>
            </div>
        ))}
    </div>

    {/* COLONNE DROITE : Le menu déroulant des détails */}
    <div className="col-md-8">
        {selectedCountry ? (
            <div className="card shadow-sm rounded-4 animate__animated animate__fadeIn">
                <div className="card-header bg-white fw-bold py-3 d-flex justify-content-between">
                    <span>Institutions en {selectedCountry}</span>
                    <button className="btn-close" onClick={() => setSelectedCountry(null)}></button>
                </div>
                <div className="list-group list-group-flush">
                    {filteredInfras.map(infra => (
                        <div key={infra.id} className="list-group-item p-3">
                            <h6 className="fw-bold text-primary mb-1">{infra.name}</h6>
                            <p className="small text-muted mb-0">
                                <span className="material-symbols-outlined align-middle fs-6">location_on</span>
                                Lat: {infra.lat}, Lng: {infra.lng}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="h-100 d-flex align-items-center justify-content-center border rounded-4 border-dashed">
                <p className="text-muted">Cliquez sur un pays pour voir les détails</p>
            </div>
        )}
    </div>
</div>                 </div>
                </main>
            </div>
        </div>
    );
};

export default Map;