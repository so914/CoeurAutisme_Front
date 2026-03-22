import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiArrowLeft, FiMessageSquare, FiHeart } from "react-icons/fi";

const MesCommunautes = () => {
  const [actifCommunity, setActif] = useState(null);


  const myCommunities = [
    {
      id: "com_001",
      name: "Entraide Parents Autisme",
      category: "Soutien Familial",
      coverImage:
        "https://mrmondialisation.org/wp-content/uploads/2016/02/Mont-Valin-2si-2-e1456448123336.jpg",
      isPrivate: false,
      border:"brown",
      posts: [
        {
          id: "p_1",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg",
          author: "Julie_M",
          title: "Besoin de conseils pour le dossier MDPH",
          content: "Bonjour à tous, je suis un peu perdue avec le volet vie quotidienne...",
          likes: 24,
          date: "2026-01-11",
          comments:10
        },
      ],
      reglement: [
        "Respect mutuel : Aucune insulte ou jugement.",
        "Confidentialité : Protection de la vie privée des enfants.",
        "Pas de conseils médicaux : Consultez un professionnel.",
        "Soutien bienveillant : Écoute active.",
        "Pas de publicité : Interdiction de démarchage.",
      ],
      stats: { membersCount: 1250, postsCount: 3400, activeToday: 45 },
      topTags: ["Diagnostic", "Scolarité", "MDPH"],
      lastActivity: "2026-01-11T10:30:00Z",
      createDate: "7/01/2026",
      moderators: [
        { id: "u_1", name: "Marie_S" },
        { id: "u_2", name: "Jean_Support" },
      ]
    },
    {
      id: "com_002",
      name: "Neuro-Adultes",
      category: "Auto-représentation",
      coverImage:
        "https://www.sciencesetavenir.fr/assets/img/2018/05/04/cover-r4x3w1200-5aebf9b34a11b.jpg",
      isPrivate: true,
      border:"red",
      posts: [
        {
          id: "p_2",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg",
          author: "Alex_Neuro",
          title: "Gérer le burn-out autistique au travail",
          content: "Voici quelques stratégies qui m'ont aidé cette année...",
          likes: 89,
          date: "2026-01-11",
          comments:55
        },
      ],
      reglement: [
        "Auto-représentation : Priorité à la parole des concernés.",
        "Tone Policing interdit : Respect des émotions.",
        "Pas de validisme : Propos discriminatoires interdits.",
        "Avertissement de contenu (TW) : Pour les sujets sensibles.",
        "Espace sécurisé : Tolérance zéro pour le harcèlement.",
      ],
      stats: { membersCount: 890, postsCount: 12000, activeToday: 120 },
      topTags: ["Emploi", "Relations", "Sensorialité"],
      lastActivity: "2026-01-11T09:15:00Z",
      createDate: "10/04/2024",
      moderators: [{ id: "u_5", name: "Alex_Neuro" }]
    },
    {
      id: "com_003",
      name: "Recherche TSA",
      category: "Scientifique",
      border:"blue",
      coverImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQzo",
      isPrivate: false,
      posts: [
        {
          id: "p_3",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg",
          author: "Dr_Kovacs",
          title: "Nouvelle étude sur le microbiote",
          content: "Une analyse intéressante publiée dans Nature...",
          likes: 35,
          date: "2026-01-10",
          comments:5
        },
      ],
      reglement: [
        "Sources obligatoires : Études sérieuses uniquement.",
        "Pas de pseudoscience : Thérapies validées uniquement.",
        "Débats constructifs : Objectivité requise.",
        "Vulgarisation : Rendre les termes accessibles.",
        "Intégrité : Déclarer les conflits d'intérêts.",
      ],
       stats: { membersCount: 450, postsCount: 850, activeToday: 12 },
      topTags: ["Neuroscience", "Études", "Thérapies"],
      lastActivity: "2026-01-10T22:00:00Z",
      createDate: "17/05/2025",
      moderators: [{ id: "u_9", name: "Dr_Kovacs" }]
    },
  ];

  if (actifCommunity) {
    return (
      <div>
              <button
                className="btn btn-outline mb-4 rounded-pill"
                onClick={() => setActif(null)} // On remet à null pour revenir à la liste
              >
                <span className="material-symbols-outlined align-middle">
                  arrow_back
                </span>{" "}
                Retour à la liste
              </button>
      
              <div className="card border-0 overflow-hidden">
                <img
                  src="https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80"
                  className="card-img-top rounded-4 shadow border-1"
                  style={{ height: "250px", objectFit: "cover" }}
                  alt={actifCommunity.name}
                />
                <div className="community-logo">
                  <img
                    src={actifCommunity.coverImage}
                    className="card-img-top"
                    alt={actifCommunity.name}
                    style={{border: `4px solid ${actifCommunity.border}`}}
                  />
                </div>
                <div className="card-body pt-5">
                  <div className="justify-content-between align-items-center mb-3 mt-4">
                    <span className="badge btn-primary-custom text-dark px-3 py-2 rounded-pill">
                      {actifCommunity.category}
                    </span>
                  </div>
                  <div className="row g-5 mt-2">
                    <div className="col-md-7 sideright">
                      <h4 className="fw-bold">{actifCommunity.name}</h4>
                      <p className="text-muted mt-4">{actifCommunity.description}</p>
                      <hr />
                      {!actifCommunity.isPrivate && (
                        <>
                          <h5>Le meilleur de nous</h5>
                          {actifCommunity.posts.map((p) => (
                            <div key={p.id} className="card p-3 mb-3 rounded-4">
                              <div className="d-flex gap-4">
                                <div className="d-flex gap-2">
                                  <div className="img-author rounded-5">
                                    <img
                                      src={p.avatar}
                                      className="border rounded-5"
                                    />
                                  </div>
                                  <p className="my-3">{p.author}</p>
                                </div>
                                <p className="d-flex my-3">
                                  <span className="material-symbols-outlined mx-1">
                                    favorite_border
                                  </span>
                                  {p.likes}
                                </p>
                                <p className="d-flex my-3">
                                  <span className="material-symbols-outlined mx-1">
                                    chat_bubble
                                  </span>
                                  {p.comments}
                                </p>
                                <p className="d-flex my-3">
                                  <span className="material-symbols-outlined mx-1">
                                    calendar_month
                                  </span>
                                  {p.date}
                                </p>
                              </div>
                              <p>Sujet: {p.title}</p>
                              <p className="text-muted">{p.content}</p>
                            </div>
                          ))}{" "}
                        </>
                      )}
                    </div>
                    <div
                      className="col-md-5 shadow-lg rounded-4 p-4"
                      style={{ top: "20px", zIndex: 10 }}
                    >
                      <div className="d-flex gap-3">
                        <button className="border btn rounded-5 d-flex text-muted">
                          <NavLink to='/register/publications' className="nav-link d-flex" ><span className="material-symbols-outlined ">add</span>Créer
                          une publication </NavLink>
                        </button>
                          <button className="btn btn-primary-custom rounded-5">
                          Membre
                        </button>
                        
                      </div>
                      <p className="mt-4 d-flex">
                        <span className="material-symbols-outlined mx-1">
                          calendar_month
                        </span>{" "}
                        Créé le: {actifCommunity.createDate}
                      </p>
                      {actifCommunity.isPrivate && (
                        <p className="d-flex">
                          <span className="material-symbols-outlined mx-1">lock</span>
                          Privé
                        </p>
                      )}
                      {!actifCommunity.isPrivate && (
                        <p className="d-flex">
                          <span className="material-symbols-outlined mx-1">
                            public
                          </span>
                          Public
                        </p>
                      )}
                      <h5 className="fw-bold mt-4">Tags populaires</h5>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {actifCommunity.topTags.map((tag) => (
                          <span
                            key={tag}
                            className="badge  text-primary rounded-pill px-3"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h5 className="fw-bold mt-4">Modérateurs</h5>
                      <div className="d-flex gap-2">
                        {actifCommunity.moderators.map((mod) => (
                          <span key={mod.id} className="small text-muted">
                            • {mod.name}
                          </span>
                        ))}
                      </div>
                      <h5 className="fw-bold mt-4">Statistiques clés</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between">
                          Membres <span>{actifCommunity.stats.membersCount}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          Publications <span>{actifCommunity.stats.postsCount}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          Actifs aujourd'hui{" "}
                          <span>{actifCommunity.stats.activeToday}</span>
                        </li>
                      </ul>
                      <hr />
                      <h6>Régles de la communauté</h6>
                      {actifCommunity.reglement.map((r) => (
                        <p key={r} className="p-1">
                          {r}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
        </div>      
    );
  }
  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Mes communautés</h3>

      <div className="d-flex gap-3 mb-5 overflow-auto">
        {myCommunities.map((com) => (
          <div
            key={com.id}
            onClick={() => setActif(com)}
            className="text-center"
            style={{ cursor: "pointer", minWidth: "120px" }}
          >
            <div
              className="rounded-4 overflow-hidden mb-2 shadow-sm"
              style={{
                width: "180px",
                height: "230px",
                border: "2px solid lightgray",
                background:"c"}}
                >
              <img
                src={com.coverImage}
                alt={com.name}
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                className="rounded-pill mt-4"
              />
            <small className="d-block text-justify px-3 mt-1">{com.name}</small>
            </div>
          </div>
        ))}
      </div>

      <h5 className="fw-bold mb-4">Activités récentes</h5>
      <div>
        {myCommunities
          .flatMap((com) => com.posts)
          .map((p) => (
            <div
              key={p.id}
              className="card border-0 shadow-sm rounded-4 p-3 mb-3 post-card"
            >
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-2">
                  <img
                    src={p.avatar}
                    className="rounded-circle"
                    width="40"
                    alt=""
                  />
                  <div>
                    <small className="fw-semibold">{p.author}</small>
                  </div>
                </div>
                <div className="text-muted small d-flex align-items-center gap-1">
                  {p.date}
                </div>
              </div>

              <h6 className="mt-3 fw-semibold">{p.title}</h6>
              <p className="text-muted">{p.content}</p>

              <div className="d-flex gap-3 text-muted small align-items-center">
                <span className="d-flex align-items-center gap-1">
                  <FiHeart size={20}/> {p.likes}
                </span>
                <span className="d-flex align-items-center gap-1">
                  <FiMessageSquare size={20} /> {p.comments} 
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MesCommunautes;