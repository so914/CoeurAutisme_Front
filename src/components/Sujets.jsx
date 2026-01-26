import React from 'react';

const Sujets = () => {
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

   // Trions par postCount (décroissant) et prendre les 5 premiers
  const topTopics = [...topicsSummary]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);
  return (
    <div className=" min-vh-100 pb-5">
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
              />
            </form>
      </div>

      <div className='container pt-5 mt-5'>
        <div className="row">
          <div className="col-md-9">
            <h4 className='mb-4 mt-5'>Recommandés pour vous</h4>
          </div>
          <div className="col-md-3 d-flex justify-content-end">
            <p className='mb-4 mt-5 text-color'>Voir d'autres</p>
          </div>
        </div>
                <div className="row g-2 justify-content-center mb-5">
          {topicsSummary.map((topic, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div className="card h-100 border rounded-3 shadow-sm p-4 transition-hover">
                <div className="d-flex flex-column h-100">
                  <h6 className="card-title  mb-3 text-dark leading-tight">
                    {topic.title}
                  </h6>
                  <div className="mt-auto d-flex align-items-center text-muted">
                    <span className="material-symbols-outlined fs-6 me-2">chat_bubble_outline</span>
                    <small>{topic.postCount} discussions</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />

        <h5 className="fw-bold mb-4 d-flex align-items-center mt-5">
        <span className="material-symbols-outlined me-2 text-warning">trending_up</span>
        Top 5 des tendances
      </h5>

      <div className="row g-3">
        {topTopics.map((topic, index) => (
          <div className="col-12" key={index}>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden transition-hover">
              <div className="card-body d-flex align-items-center p-3">
                <div 
                  className="rounded-pill bg-primary-custom text-white d-flex align-items-center justify-content-center fw-bold me-3"
                  style={{ width: '40px', height: '40px', minWidth: '40px' }}
                >
                  {index + 1}
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0 fw-semibold text-dark text-truncate" style={{ maxWidth: '80%' }}>
                    {topic.title}
                  </h6>
                  <small className="text-muted">{topic.category}</small>
                </div>
                <div className="text-end ms-2">
                  <small className="text-muted ">
                    {topic.postCount} discussions
                  </small>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Sujets;