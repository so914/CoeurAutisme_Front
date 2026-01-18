import React from 'react';
import { useOutletContext } from 'react-router-dom';
import DiagnosticSidebar from '../components/DiagnosticSidebar';
import QuestionCard from '../components/QuestionCard';
import Navbar from '../components/Navbar';

const DiagnosticPage = () => {
   const { theme, toggleTheme } = useOutletContext();
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen d-flex flex-column transition-colors duration-200">
      <Navbar theme={theme} toggleTheme={toggleTheme}/> 
      <div className="d-flex flex-grow-1 overflow-hidden position-relative">
        <DiagnosticSidebar />
        
        <main className="flex-grow-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-5">
          <div className="mx-auto" style={{ maxWidth: '900px' }}>
            {/* Barre de Progression */}
            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-end mb-2">
                <div>
                  <p className="card-color-text fw-bold text-uppercase small mb-1">Étape 3: Communication Sociale</p>
                  <h3 className="h4 fw-bold mb-0">Question 3 sur 15</h3>
                </div>
                <p className="h5 fw-bold card-color mb-0">20%</p>
              </div>
              <div className="progress" style={{ height: '12px', borderRadius: '10px' }}>
                <div className="progress-bar " role="progressbar" style={{ width: '20%', backgroundColor:'var(--primary-dark)'}}></div>
              </div>
            </div>

            <QuestionCard 
              question="Est-ce que votre enfant vous regarde quand vous l'appelez par son nom ?"
              instruction="Essayez d'appeler son nom depuis l'autre bout de la pièce sans faire de gestes. Établit-il un contact visuel ?"
            />

            {/* Navigation du Questionnaire */}
            <div className="mt-5 pt-4 border-top d-flex flex-column flex-sm-row justify-content-between gap-3">
              <button className="btn btn-outline-secondary px-4 py-2 rounded-3 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined">arrow_back</span> Question précédente
              </button>
              <button className="btn btn-primary-custom px-5 py-2 rounded-3 fw-bold d-flex align-items-center gap-2">
                Question suivante <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DiagnosticPage;