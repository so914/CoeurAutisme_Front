import {React, useState} from 'react'
import VideoCard from "./VideoCard";
import VideoLine from "./VideoLine";
import { FiDownload } from "react-icons/fi";

const RessourceVideo = () => {

    // Charger la vidéo principale depuis le localStorage au démarrage
      const [videoPrincipale, setVideoPrincipale] = useState(() => {
        const saved = localStorage.getItem("last_watched_video");
        return saved ? JSON.parse(saved) : null;
      });
    
      const [filtreActif, setFiltreActif] = useState("Tout");
      const [showCommentInput, setShowCommentInput] = useState(false);
    
      // Fonction pour gérer le clic sur une vidéo
      const handleVideoSelect = (video) => {
        setVideoPrincipale(video);
        setShowCommentInput(false);
    
        // Sauvegarder pour le rafraîchissement
        localStorage.setItem("last_watched_video", JSON.stringify(video));
    
        // Gérer l'historique
        const historySaved = localStorage.getItem("video_history");
        let history = historySaved ? JSON.parse(historySaved) : [];
    
        // Éviter les doublons (on retire la vidéo si elle existe déjà pour la remettre en haut)
        history = history.filter((v) => v.id !== video.id);
    
        // Ajouter au début de la liste avec la date actuelle
        const videoWithDate = { ...video, watchedAt: new Date().toISOString() };
        history.unshift(videoWithDate);
    
        // stocker seulement les 20 dernières vidéos
        localStorage.setItem("video_history", JSON.stringify(history.slice(0, 20)));
      };
    
      //quitter le lecteur
      const handleBackToGrid = () => {
        setVideoPrincipale(null);
        localStorage.removeItem("last_watched_video");
      };
    
      const categories = [
        "Tout",
        "Vie de famille",
        "Éducation",
        "Thérapie",
        "Routine",
      ];
    
      const allVideos = [
        {
          id: 2,
          titre: "Briser les barrières à Nairobi",
          categorie: "Éducation",
          auteur: "Amara K.",
          pays: "Kenya",
          duree: "8:15",
          url: "https://www.youtube.com/embed/e30lKOwMgx8",
          likes: 124,
          commentaires: [
            {
              id: 101,
              auteur: "Moussa S.",
              texte:
                "L'inclusion scolaire est primordiale, merci pour ce partage !",
              date: "Il y a 1 jour",
            },
            {
              id: 102,
              auteur: "Fatou B.",
              texte: "Très inspirant pour les éducateurs en Afrique.",
              date: "Il y a 3 heures",
            },
          ],
        },
        {
          id: 3,
          titre: "Le point de vue d'un père",
          categorie: "Thérapie",
          auteur: "David O.",
          pays: "Ghana",
          duree: "6:10",
          url: "https://www.youtube.com/embed/if5sbZHNHUc",
          likes: 89,
          commentaires: [
            {
              id: 201,
              auteur: "Kofi A.",
              texte:
                "En tant que père, je me reconnais totalement dans ce témoignage.",
              date: "Il y a 5 jours",
            },
            {
              id: 202,
              auteur: "Ama M.",
              texte: "Le courage de ce père est exemplaire.",
              date: "Il y a 2 jours",
            },
          ],
        },
        {
          id: 4,
          titre: "Art-thérapie : S'exprimer",
          categorie: "Thérapie",
          auteur: "Sarah M.",
          pays: "Afrique du Sud",
          duree: "5:42",
          url: "https://www.youtube.com/embed/BsGVUxb9la4",
          likes: 215,
          commentaires: [
            {
              id: 301,
              auteur: "Zanele L.",
              texte: "Les couleurs parlent quand les mots manquent. Magnifique.",
              date: "Il y a 1 semaine",
            },
            {
              id: 302,
              auteur: "Jean P.",
              texte: "Est-ce qu'il existe des centres similaires à Dakar ?",
              date: "Il y a 4 jours",
            },
          ],
        },
      ];
    
      // Logique de filtrage pour la grille
      const videosAffichees = allVideos.filter(
        (v) => filtreActif === "Tout" || v.categorie === filtreActif,
      );
    

     // Vidéos pour la barre de droite
  const prochainesVideos = videoPrincipale
    ? allVideos.filter((v) => v.id !== videoPrincipale.id)
    : []; 

  return (
    <div className='container'>
        <div className="d-flex gap-2 flex-wrap mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltreActif(cat)}
                  className={`button-filter ${
                    filtreActif === cat ? "active" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

                    {videoPrincipale && (
          <button
            onClick={() => handleBackToGrid()}
            className="btn btn-sm  mb-4"
          >
            ← Retour à la grille
          </button>
        )}


<div className="container pb-5">
        {!videoPrincipale ? (
          <div className="video-grid">
            {videosAffichees.map((video) => (
              <VideoCard
                className="VideoCard"
                key={video.id}
                video={video}
                onClick={(v) => handleVideoSelect(v)}
              />
            ))}
          </div>
        ) : (
          /* --- MODE LECTEUR --- */
          <div className="row lecture-container g-4">
            {/* Colonne de Gauche : Vidéo Principale */}
            <div className="col-lg-8">
              <div className="ratio ratio-16x9">
                <iframe
                  className="video-frame shadow-sm"
                  src={videoPrincipale.url}
                  title={videoPrincipale.titre}
                  frameBorder="0"
                  allowFullScreen
                  style={{ borderRadius: "20px" }}
                ></iframe>
              </div>
              <div className="mt-4">
                <span className="badge rounded-pill bg-light text-success mb-2 px-3 py-2 border">
                  {videoPrincipale.categorie}
                </span>
                <h1 className="main-video-title h2">{videoPrincipale.titre}</h1>
                <div className="text-muted d-flex justify-content-between">
                  <p>
                    {videoPrincipale.auteur} • {videoPrincipale.pays}
                  </p>

                  <div className="d-flex gap-2">
                    <p>
                      {videoPrincipale.likes}{" "}
                      <span className="material-symbols-outlined mx-1">
                        favorite_border
                      </span>
                    </p>
                    <p>
                      {" "}
                      {videoPrincipale.commentaires.length}{" "}
                      <button className="border-0 ">
                        <span className="material-symbols-outlined mx-1">
                          chat_bubble
                        </span>
                      </button>
                    </p>
                    <p>
                      <FiDownload size={20} className="me-2" />
                    </p>
                  </div>
                </div>
                <h6>Tous les avis</h6>
                <div className="mt-4">
                  <div className="comment-list mt-3">
                    {videoPrincipale.commentaires.map((avis) => (
                      <div key={avis.id} className="mb-3 p-2 border-bottom">
                        <div className="d-flex justify-content-between">
                          <strong>{avis.auteur}</strong>
                          <small className="text-muted">{avis.date}</small>
                        </div>
                        <p className="mb-0">{avis.texte}</p>
                        <div className="d-flex gap-2">
                            <p>
                              {avis.likes}{" "}
                              <span className="material-symbols-outlined mx-1">
                                favorite_border
                              </span>
                            </p>
                            <p>
                              {" "}
                              {videoPrincipale.commentaires.length}{" "}
                              <button className="border-0 ">
                                <span className="material-symbols-outlined mx-1">
                                  chat_bubble
                                </span>
                              </button>
                            </p>
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
                <form id="monFormulaire">
                  <input
                    type="text"
                    id="moncommentaire"
                    className="d-none"
                    placeholder="Entrez votre commentaire ..."
                  />
                </form>
              </div>
            </div>

            {/* Colonne de Droite*/}
            <div className="col-lg-4">
              <div className="sidebar-next p-3 border-start">
                <h4 className="mb-4 fw-bold">À suivre</h4>
                <div className="d-flex flex-column gap-3">
                  {prochainesVideos.map((video) => (
                    <VideoLine
                      key={video.id}
                      video={video}
                      onClick={(v) => {
                        setVideoPrincipale(v);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
            
    </div>
  )
}

export default RessourceVideo