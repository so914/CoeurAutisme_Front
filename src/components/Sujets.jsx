import React, { useState } from 'react';
import { MdForum } from "react-icons/md";

const Sujets = () => {
  const [search, setSearch] = useState("");

  const topicsSummary = [
    { title: "Besoin de conseils pour le dossier MDPH", postCount: 3, category: "Soutien Familial" },
    { title: "Succès à l'école aujourd'hui !", postCount: 2, category: "Soutien Familial" },
    { title: "Rencontre locale à Nantes", postCount: 2, category: "Soutien Familial" },
    { title: "Gérer le burn-out autistique au travail", postCount: 1, category: "Auto-représentation" },
    { title: "Casque à réduction de bruit : vos avis ?", postCount: 1, category: "Auto-représentation" },
    { title: "Sortir seul au cinéma : un défi relevé", postCount: 1, category: "Auto-représentation" },
    { title: "Nouvelle étude sur le microbiote", postCount: 1, category: "Scientifique" },
    { title: "Application de communication par IA", postCount: 1, category: "Scientifique" },
  ];

  const filteredTopics = topicsSummary.filter(topic =>
    topic.title.toLowerCase().includes(search.toLowerCase()) ||
    topic.category.toLowerCase().includes(search.toLowerCase())
  );

  const topTopics = [...topicsSummary]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  return (
    <div className="min-vh-100 pb-5">

      <div className="container pt-3">
        <h2 className="display-6 fw-bold text-dark mb-4 tracking-tight">
          Un sujet, mille <span className="text-primary-custom">perspectives</span>.
        </h2>

        <div className="row justify-content-center">
          <p className="fs-5 text-muted mb-5">
            Ici, les regards se croisent et les vécus se complètent. Expertise ou témoignage, chaque voix éclaire le chemin des autres.
            <strong> Explorez les thématiques qui nous rassemblent.</strong>
          </p>
        </div>

        <form className="d-flex input-group" role="search">
          <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-4">
            <span className="material-symbols-outlined text-secondary">search</span>
          </span>
          <input
            className="form-control border-start-0 rounded-end-pill shadow-none py-3"
            type="search"
            placeholder="Recherchez un sujet ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-1">Recommandés pour vous</h4>
            <small className="text-muted">
              Des sujets adaptés à vos intérêts
            </small>
          </div>

          <button className="btn btn-sm btn-outline-primary-custom rounded-pill px-3">
            Voir plus →
          </button>
        </div>

        <div className="row g-4">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="card h-100 border-0 shadow-sm rounded-4 px-4 py-5 topic-card">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-3">
                      <MdForum className="text-primary-custom" size={22}/>
                    </div>

                    <h6 className="fw-semibold mb-3">
                      {topic.title}
                    </h6>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        {topic.postCount} discussions
                      </small>

                      <span className="badge bg-light text-dark rounded-pill px-3">
                        Actif
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">Aucun sujet trouvé</p>
          )}
        </div>
      </div>

      <div className="container pb-5">
        <h5 className="fw-bold mb-4 d-flex align-items-center">
           Top tendances
        </h5>

        <div className="row g-3">
          {topTopics.map((topic, index) => (
            <div className="col-12" key={index}>
              <div className="card border-0 shadow-sm rounded-4 p-3 trend-card">
                <div className="d-flex align-items-center">
                  <div className="trend-rank me-3">
                    {index + 1}
                  </div>

                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-semibold">
                      {topic.title}
                    </h6>

                    <small className="text-muted">
                      {topic.category}
                    </small>
                  </div>

                  <div className="text-end">
                    <small className="text-muted">
                       {topic.postCount} posts
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Sujets;