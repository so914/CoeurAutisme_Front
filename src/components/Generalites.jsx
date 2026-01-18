import React, { useState } from "react";

const Generalites = () => {
  const [actifCommunity, setActif] = useState(null);
  if (actifCommunity) {
    return (
      <div>
        <button
          className="btn btn-outline-custom mb-4 rounded-pill"
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
                            {" "}
                            <span className="material-symbols-outlined mx-1">
                              favorite_border
                            </span>
                            {p.likes}
                          </p>
                          <p className="d-flex my-3">
                            <span className="material-symbols-outlined mx-1">
                              chat_bubble
                            </span>
                            25
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
                {actifCommunity.isPrivate && (
                  <p>
                    Cette communauté est privée , rejoignez-la pour y voir son
                    contenu.
                  </p>
                )}
              </div>
              <div
                className="col-md-5 shadow-lg rounded-4 p-4"
                style={{ top: "20px", zIndex: 10 }}
              >
                <div className="d-flex gap-3">
                  <button className="border btn rounded-5 d-flex text-muted">
                    <span className="material-symbols-outlined">add</span>Créer
                    une publication
                  </button>
                  <button className="btn btn-primary-custom rounded-5">
                    Rejoindre
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
  const autismCommunities = [
    {
      id: "com_001",
      slug: "entraide-parents-autisme",
      name: "Entraide Parents Autisme",
      description:
        "Un espace de soutien et d'échange pour les parents d'enfants autistes. Partage d'expériences, de conseils et de ressources locales.",
      category: "Soutien Familial",
      coverImage:
        "https://mrmondialisation.org/wp-content/uploads/2016/02/Mont-Valin-2si-2-e1456448123336.jpg",
      isPrivate: false,
      createDate: "7/01/2026",
      reglement: [
        "Respect mutuel : Aucune insulte ou jugement.",
        "Confidentialité : Protection de la vie privée des enfants.",
        "Pas de conseils médicaux : Consultez un professionnel.",
        "Soutien bienveillant : Écoute active.",
        "Pas de publicité : Interdiction de démarchage.",
      ],
      posts: [
        {
          id: "p_1",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Julie_M",
          title: "Besoin de conseils pour le dossier MDPH",
          content:
            "Bonjour à tous, je suis un peu perdue avec le volet vie quotidienne...",
          likes: 24,
          date: "2026-01-11",
        },
        {
          id: "p_5",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Julie_M",
          title: "Besoin de conseils pour le dossier MDPH",
          content:
            "Bonjour à tous, je suis un peu perdue avec le volet vie quotidienne...",
          likes: 24,
          date: "2026-01-11",
        },
        {
          id: "p_2",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Thomas_Dad",
          title: "Succès à l'école aujourd'hui !",
          content:
            "Mon fils a réussi à rester calme pendant toute la récréation...",
          likes: 56,
          date: "2026-01-10",
        },
        {
          id: "p_3",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Marie_S",
          title: "Rencontre locale à Nantes",
          content:
            "On organise un café-rencontre samedi prochain, qui est partant ?",
          likes: 12,
          date: "2026-01-08",
        },
        {
          id: "p_1",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Julie_M",
          title: "Besoin de conseils pour le dossier MDPH",
          content:
            "Bonjour à tous, je suis un peu perdue avec le volet vie quotidienne...",
          likes: 24,
          date: "2026-01-11",
        },
        {
          id: "p_2",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Thomas_Dad",
          title: "Succès à l'école aujourd'hui !",
          content:
            "Mon fils a réussi à rester calme pendant toute la récréation...",
          likes: 56,
          date: "2026-01-10",
        },
        {
          id: "p_3",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Marie_S",
          title: "Rencontre locale à Nantes",
          content:
            "On organise un café-rencontre samedi prochain, qui est partant ?",
          likes: 12,
          date: "2026-01-08",
        },
      ],
      stats: { membersCount: 1250, postsCount: 3400, activeToday: 45 },
      topTags: ["Diagnostic", "Scolarité", "MDPH"],
      lastActivity: "2026-01-11T10:30:00Z",
      moderators: [
        { id: "u_1", name: "Marie_S" },
        { id: "u_2", name: "Jean_Support" },
      ],
    },
    {
      id: "com_002",
      slug: "neurodiversite-adultes",
      name: "Neuro-Adultes : Le Salon",
      description:
        "Communauté dédiée aux adultes autistes. Discussions sur l'emploi, la vie sociale et l'auto-représentation.",
      category: "Auto-représentation",
      coverImage:
        "https://www.sciencesetavenir.fr/assets/img/2018/05/04/cover-r4x3w1200-5aebf9b34a11b-5af01206665b73eb4c7127e3e27e50a1c7b1378b-jpg.jpg",
      isPrivate: true,
      createDate: "10/04/2024",
      reglement: [
        "Auto-représentation : Priorité à la parole des concernés.",
        "Tone Policing interdit : Respect des émotions.",
        "Pas de validisme : Propos discriminatoires interdits.",
        "Avertissement de contenu (TW) : Pour les sujets sensibles.",
        "Espace sécurisé : Tolérance zéro pour le harcèlement.",
      ],
      posts: [
        {
          id: "p_4",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Alex_Neuro",
          title: "Gérer le burn-out autistique au travail",
          content: "Voici quelques stratégies qui m'ont aidé cette année...",
          likes: 89,
          date: "2026-01-11",
        },
        {
          id: "p_5",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Lila_Aspie",
          title: "Casque à réduction de bruit : vos avis ?",
          content: "J'hésite entre deux modèles pour prendre les transports...",
          likes: 42,
          date: "2026-01-09",
        },
        {
          id: "p_6",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Sam_H",
          title: "Sortir seul au cinéma : un défi relevé",
          content: "J'ai enfin sauté le pas malgré l'anxiété sensorielle !",
          likes: 110,
          date: "2026-01-07",
        },
      ],
      stats: { membersCount: 890, postsCount: 12000, activeToday: 120 },
      topTags: ["Emploi", "Relations", "Sensorialité"],
      lastActivity: "2026-01-11T09:15:00Z",
      moderators: [{ id: "u_5", name: "Alex_Neuro" }],
    },
    {
      id: "com_003",
      slug: "recherche-et-innovations",
      name: "Recherche & Innovations TSA",
      description:
        "Suivi des dernières études scientifiques et avancées technologiques autour du TSA.",
      category: "Scientifique",
      coverImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQzo-Qf8zV3dNq691VlF4ODMdyGGKxXI5aw&s",
      isPrivate: false,
      createDate: "17/05/2025",
      reglement: [
        "Sources obligatoires : Études sérieuses uniquement.",
        "Pas de pseudoscience : Thérapies validées uniquement.",
        "Débats constructifs : Objectivité requise.",
        "Vulgarisation : Rendre les termes accessibles.",
        "Intégrité : Déclarer les conflits d'intérêts.",
      ],
      posts: [
        {
          id: "p_7",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Dr_Kovacs",
          title: "Nouvelle étude sur le microbiote",
          content:
            "Une analyse intéressante publiée dans Nature cette semaine...",
          likes: 35,
          date: "2026-01-10",
        },
        {
          id: "p_8",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Inno_Tech",
          title: "Application de communication par IA",
          content:
            "On teste un nouvel outil de synthèse vocale émotionnelle...",
          likes: 28,
          date: "2026-01-09",
        },
        {
          id: "p_9",
          avatar:
            "https://img.freepik.com/vecteurs-premium/pensez-vecteur-plat-bulle-vert-isole-fond-blanc_1120563-23213.jpg?semt=ais_hybrid&w=740&q=80",
          author: "Lab_A",
          title: "Recrutement participants étude sommeil",
          content:
            "Nous recherchons des volontaires pour un protocole non invasif...",
          likes: 15,
          date: "2026-01-05",
        },
      ],
      stats: { membersCount: 450, postsCount: 850, activeToday: 12 },
      topTags: ["Neuroscience", "Études", "Thérapies"],
      lastActivity: "2026-01-10T22:00:00Z",
      moderators: [{ id: "u_9", name: "Dr_Kovacs" }],
    },
  ];
  return (
    <div>
      <div className="container ">
        <div className="text-center mb-5 mt-5">
          <h3>Découvrez votre prochaine Communauté</h3>
        </div>
        <form className="d-flex input-group mb-3" role="search">
          <span className="input-group-text bg-surface border-end-0 rounded-start-5">
            <span className="material-symbols-outlined text-muted">search</span>
          </span>

          <input
            className="form-control border-start-0 rounded-end-5 shadow-none py-3"
            type="search"
            placeholder="Filtrer pour les forums fabuleux ..."
            aria-label="Search"
          />
        </form>
        <div className="d-flex flex-wrap gap-4">
          {autismCommunities.map((com) => (
            <div
              key={com.id}
              className="card cart-community rounded-5 p-2 shadow-sm border-0"
              style={{ width: "18rem", cursor: "pointer" }}
            >
              <img
                src={com.coverImage}
                alt={com.name}
                className="card-img-top rounded-5"
                style={{ height: "140px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h6 className="fw-bold">{com.name}</h6>
                <p className="text-muted small">{com.category}</p>
                <div className="d-flex flex-column gap-1 mt-3">
                  {Object.entries(com.stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="d-flex justify-content-between border-bottom pb-1 mb-1"
                    >
                      <span className="text-capitalize small fw-medium">
                        {key.replace(/([A-Z])/g, " $1")} :
                      </span>
                      <span className="badge secondary-custom rounded-pill">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="btn btn-primary-custom w-100 rounded-pill mt-3"
                  onClick={() => {
                    setActif(com);
                  }}
                >
                  Voir plus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generalites;
