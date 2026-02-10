import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';

const QuestionCard = ({ 
  question, 
  instruction, 
  stepName, 
  stepNumber, 
  questionNumber, 
  totalInStep, 
  onNext, 
  onPrev, 
  isFirst, 
  onCancel ,
  value,
  onChange
}) => {
  const progress = (questionNumber / totalInStep) * 100;

  return (
    <div className="d-flex flex-column gap-4 bg-background-light dark:bg-background-dark animate__animated animate__fadeIn">
      <span
        className="bg-background-light dark:bg-background-dark cursor-pointer d-flex align-items-center gap-2"
        onClick={onCancel}
        style={{ cursor: 'pointer' }}
      >
        <FaArrowLeftLong /> Annulez le test
      </span>

      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-end mb-2">
          <div>
            <p className="card-color-text fw-bold text-uppercase small mb-1">
              Étape {stepNumber}: {stepName}
            </p>
            <h3 className="h4 fw-bold mb-0">Question {questionNumber} sur {totalInStep}</h3>
          </div>
          <p className="h5 fw-bold card-color mb-0">{Math.round(progress)}%</p>
        </div>
        <div className="progress" style={{ height: "12px", borderRadius: "10px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%`, backgroundColor: "var(--primary-dark)" }}
          ></div>
        </div>
      </div>

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
          <button 
            onClick={()=>{alert('Fonctionnalité non disponible pour le moment.')}}
            className="bg-background-light dark:bg-background-dark btn rounded-pill d-flex align-items-center gap-2 border">
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-dark)' }}>volume_up</span>
            <span className="small fw-bold">Écouter la question</span>
          </button>
        </div>
        <h2 className="h2 fw-bold mb-3">{question}</h2>
        <p className="text-muted">{instruction}</p>
      </div>

      <div className="row g-4">
        <div className="col-md-5">
          <div onClick={() => {alert("Fonctionnalité non disponible pour le moment.")}}
            className="card h-100 border-2 border-dashed p-4 d-flex cursor-pointer flex-column align-items-center justify-content-center text-center transition-all hover-green-border rounded-4 ">
            <div 
              className="rounded-circle p-4 mb-3 text-dark shadow-lg d-flex align-items-center justify-content-center"
              style={{ backgroundColor: 'var(--primary-dark)', width: 'fit-content' }}
            >
              <span className="material-symbols-outlined fs-1">mic</span>
            </div>
            <h5 className="fw-bold">Appuyez pour parler</h5>
            <p className="small text-muted">Décrivez ce qu'il se passe avec vos propres mots.</p>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card h-100 p-4 shadow-sm rounded-4">
            <label className="fw-bold mb-2 d-flex align-items-center gap-2">
              <span className="material-symbols-outlined fs-5" style={{ color: 'var(--primary-color)' }}>edit</span> Votre réponse
            </label>
            <textarea 
              className="form-control border-0 bg-background-light dark:bg-background-dark p-3 flex-grow-1" 
              rows="5" 
              minLength={10} 
              value={value}
          onChange={(e) => onChange(e.target.value)}
              required                                                                                                                                                                                                                      
              placeholder="Exemple: Parfois il regarde, mais surtout quand il ne joue pas avec ses jouets..."
            ></textarea>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            <div className="text-end mt-2">
              <span className="text-muted x-small"> {value.length} /Min. 10 caractères</span>
            </div>
          </div>                                                                                        
        </div>
        <p className="bg-background-light dark:bg-background-dark">
          Ce test est un outil de prédépistage informatif... <span className='p-warn fw-bold text-danger'>seul un médecin spécialisé est habilité à poser un diagnostic officiel.</span>
        </p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      </div>

      <div className="mt-5 pt-4 border-top d-flex flex-column flex-sm-row justify-content-between gap-3">
        <button                                                                                                                           
          className="btn btn-outline-secondary px-4 py-2 rounded-3 d-flex align-items-center gap-2"
          onClick={onPrev}
          disabled={isFirst}
        >                 
          <span className="material-symbols-outlined">arrow_back</span> Question précédente
        </button>
        <button 
    className="btn btn-primary-custom px-5 py-2 rounded-3 d-flex align-items-center gap-2"
    onClick={onNext}
    /* On désactive le bouton si le texte est trop court ou vide */
    disabled={!value || value.trim().length < 10}
    style={{ opacity: (!value || value.trim().length < 10) ? 0.6 : 1 }}
  >
    Question suivante <span className="material-symbols-outlined">arrow_forward</span>
  </button>
      </div>
    </div>
  );
};              

export default QuestionCard;                                                                                                                      