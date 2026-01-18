import React from 'react';

const QuestionCard = ({ question, instruction }) => {
  return (
    <div className="d-flex flex-column gap-4 bg-background-light dark:bg-background-dark">
      {/* Carte de la Question */}
      <div 
        className="bg-background-light dark:bg-background-dark p-4 p-md-5 rounded-4 shadow-sm border-start border-5"
        style={{ borderLeftColor: 'var(--primary-dark) !important' }}
      >
        <div className=" bg-background-light dark:bg-background-dark d-flex justify-content-between align-items-center mb-4">
          <span 
            className="badge px-3 py-2 rounded-pill d-flex align-items-center gap-2"
            style={{ 
              backgroundColor: 'rgba(13, 242, 89, 0.15)', 
              color: 'var(--primary-color)' 
            }}
          >
            <span className="material-symbols-outlined fs-6">visibility</span> Observation
          </span>
          <button className="bg-background-light dark:bg-background-dark btn  rounded-pill d-flex align-items-center gap-2 border">
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-dark)' }}>volume_up</span>
            <span className="small fw-bold">Écouter la question</span>
          </button>
        </div>
        <h2 className="h2 fw-bold mb-3">{question}</h2>
        <p className="text-muted">{instruction}</p>
      </div>

      {/* Zone de Réponse */}
      <div className="row g-4">
        {/* Entrée Vocale */}
        <div className="col-md-5">
          <div 
            className="card h-100 border-2 border-dashed p-4 d-flex flex-column align-items-center justify-content-center text-center cursor-pointer transition-all hover-green-border rounded-4"
          >
            <div 
              className="rounded-circle p-4 mb-3 text-dark shadow-lg"
              style={{ backgroundColor: 'var(--primary-dark)' }}
            >
              <span className="material-symbols-outlined fs-1">mic</span>
            </div>
            <h5 className="fw-bold">Appuyez pour parler</h5>
            <p className="small text-muted">Décrivez ce qu'il se passe avec vos propres mots.</p>
          </div>
        </div>

        {/* Entrée Texte */}
        <div className="col-md-7 ">
          <div className="card h-100 p-4 shadow-sm rounded-4 ">
            <label className="fw-bold mb-2 d-flex align-items-center gap-2">
              <span className="material-symbols-outlined fs-5" style={{ color: 'var(--primary-color)' }}>edit</span> Votre réponse
            </label>
            <textarea 
              className="form-control border-0 bg-background-light dark:bg-background-dark p-3 flex-grow-1" 
              rows="5" 
              placeholder="Exemple: Parfois il regarde, mais surtout quand il ne joue pas avec ses jouets..."
            ></textarea>
            <div className="text-end mt-2">
              <span className="text-muted x-small">Min. 10 caractères</span>
            </div>
          </div>
        </div>
        <p className="bg-background-light dark:bg-background-dark ">Ce test est un outil de prédépistage informatif basé sur des questions fréquentes. Les résultats ne constituent en aucun cas un diagnostic médical. Ce test ne remplace pas l'avis d'un professionnel de santé ; <span className='p-warn'>seul un médecin spécialisé est habilité à poser un diagnostic officiel.</span></p>
      </div>
    </div>
  );
};

export default QuestionCard;