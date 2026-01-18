import React, { useState } from "react";
import VideoCard from "./VideoCard";
import VideoLine from "./VideoLine";

const Ressources = () => {
  const [videoPrincipale, setVideoPrincipale] = useState(null);
  const [filtreActif, setFiltreActif] = useState("Tout");

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
    (v) => filtreActif === "Tout" || v.categorie === filtreActif
  );

  // Vidéos pour la barre de droite
  const prochainesVideos = videoPrincipale
    ? allVideos.filter((v) => v.id !== videoPrincipale.id)
    : [];

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container py-5">
        <div className="row mt-5">
          <div className="col-md-7">
            <h2 className="fw-bold">
              Respirer, comprendre et grandir ensemble
            </h2>
            <p className="text-intro">
              Parce que chaque enfant est une promesse et chaque parent un
              pilier, nous avons créé ce refuge de savoir. Découvrez des outils
              ludiques et des routines apaisantes pour harmoniser votre
              quotidien. Ici, la sensibilisation devient une source de lumière,
              et chaque ressource est un pas de plus vers une sérénité partagée.
            </p>
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
          </div>
            <div className="col-md-2 photo_coeur">
              <img src="file_00000000639071fd9e85d753d003dd4f-removebg-preview.png" alt="photo_amour" />
            </div>

        </div>
        {videoPrincipale && (
          <button
            onClick={() => setVideoPrincipale(null)}
            className="btn btn-sm  mb-4"
          >
            ← Retour à la grille
          </button>
        )}
      </div>

      <div className="container pb-5">
        {!videoPrincipale ? (
          <div className="video-grid">
            {videosAffichees.map((video) => (
              <VideoCard
                className="VideoCard"
                key={video.id}
                video={video}
                onClick={(v) => setVideoPrincipale(v)}
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
                <p className="text-muted">
                  {videoPrincipale.auteur} • {videoPrincipale.pays}
                </p>
                <h5>
                  {videoPrincipale.likes} Likes •{" "}
                  {videoPrincipale.commentaires.length} Commentaires
                </h5>
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
                      </div>
                    ))}
                  </div>
                </div>
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
  );
};

export default Ressources;
