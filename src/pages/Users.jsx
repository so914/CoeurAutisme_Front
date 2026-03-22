import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useOutletContext } from 'react-router-dom';
import TopHeader from '../components/Topheader'

const Users = () => {
    const { theme, toggleTheme } = useOutletContext();

    const users = [
        {
            id: 1,
            nom: "sophia",
            email: "ibaranaidesophia@gmail.com",
            password: "**********",
            genre: "féminin",
            profil: "parent d'un enfant autiste",
            pays: "Congo",
            data_naissance: "11-05-2006"
        },
        {
            id: 2,
            nom: "elda",
            email: "elda@gmail.com",
            password: "**********",
            profil: "enfant autiste",
            genre: "féminin",
            pays: "RDC",
            data_naissance: "10-05-2002"
        },
        {
            id: 3,
            nom: "Junior",
            email: "Juniorty@gmail.com",
            password: "**********",
            genre: "masculin",
            profil: "spécialiste",
            pays: "USA",
            data_naissance: "14-03-2002"
        }
    ];

    const termes = ["tout", "email", "profil", "genre", "data_naissance"];
    const [isActif, setActif] = useState("tout");
    const [search, setSearch] = useState("");

    // Filtre les users selon le terme actif et la recherche
    const filteredUsers = users.filter((u) => {
        if (!search) return true;
        if (isActif === "tout") {
            // Cherche dans tous les champs
            return Object.values(u).some(val =>
                String(val).toLowerCase().includes(search.toLowerCase())
            );
        }
        // Cherche uniquement dans le champ sélectionné
        return String(u[isActif]).toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <TopHeader theme={theme} toggleTheme={toggleTheme} />

            <div className="d-flex flex-grow-1">
                <Sidebar theme={theme} toggleTheme={toggleTheme} />

                <main className={`flex-grow-1 p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
                    
                    {/* En-tête */}
                    <div className="d-flex justify-content-between align-items-center gap-4 flex-wrap">
                        <h3 className='text-color my-4 fw-bolder'>Gestion des utilisateurs</h3>

                        <div className="d-flex gap-2">
                            {/* Sélecteur de filtre */}
                            <select
                                name="filtre"
                                id="filtre"
                                className='py-2 px-2 border light:bg-light border-light-subtle rounded-2 dark:bg-dark'
                                value={isActif}
                                onChange={(e) => {
                                    setActif(e.target.value);
                                    setSearch(""); // reset la recherche au changement de filtre
                                }}
                            >
                                {termes.map((c) => (
                                    <option value={c} key={c}>{c}</option>
                                ))}
                            </select>

                            {/* Barre de recherche */}
                            <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder={`Rechercher par ${isActif}...`}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* En-tête du tableau */}
                    <div className={`row my-4 fw-bold px-2 ${theme === 'dark' ? 'text-white' : 'text-muted'}`}>
                        <div className="col-md-1">#Id</div>
                        <div className="col-md-2">Nom</div>
                        <div className="col-md-2">Email</div>
                        <div className="col-md-2">Profil</div>
                        <div className="col-md-1">Genre</div>
                        <div className="col-md-2">Naissance</div>
                        <div className="col-md-1">Pays</div>
                        <div className="col-md-1">Actions</div>
                    </div>

                    {/* Liste des users */}
                    {filteredUsers.length === 0 ? (
                        <div className="text-center text-muted mt-5">
                            Aucun utilisateur trouvé.
                        </div>
                    ) : (
                        filteredUsers.map((u) => (
                            <div
                                className={`card p-2 border-0 shadow-sm mb-2 ${theme === 'dark' ? 'bg-secondary-custom text-white' : ''}`}
                                key={u.id}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-1">{u.id}</div>
                                    <div className="col-md-2">{u.nom}</div>
                                    <div className="col-md-2 text-truncate">{u.email}</div>
                                    <div className="col-md-2">{u.profil}</div>
                                    <div className="col-md-1">{u.genre}</div>
                                    <div className="col-md-2">{u.data_naissance}</div>
                                    <div className="col-md-1">{u.pays}</div>
                                    <div className="col-md-1 d-flex gap-1">
                                        {/* Voir */}
                                        <button
                                            className="btn btn-sm btn-outline-primary p-1"
                                            title="Voir"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>visibility</span>
                                        </button>
                                        {/* Supprimer */}
                                        <button
                                            className="btn btn-sm btn-outline-danger p-1"
                                            title="Supprimer"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Compteur */}
                    <div className="text-muted small mt-3">
                        {filteredUsers.length} utilisateur(s) affiché(s) sur {users.length}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Users;