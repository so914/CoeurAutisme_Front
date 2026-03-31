import React from 'react';

const loadingImage = '/images/Gemini_Generated_Image_lk6g2qlk6g2qlk6g-removebg-preview.png';
const schoolIcon = '/images/icons/school.png';
const marketIcon = '/images/icons/market.png';
const churchIcon = '/images/icons/church.png';
const transportIcon = '/images/icons/transport.png';
const familyIcon = '/images/icons/family.png';


const ENVIRONMENTS = {
  school: { label: 'École', icon: schoolIcon },
  market: { label: 'Marché', icon: marketIcon },
  church: { label: 'Église', icon: churchIcon },
  transport: { label: 'Transport', icon: transportIcon },
  family: { label: 'Famille', icon: familyIcon }
};

const WelcomeScreen = ({ mode, setMode, environment, setEnvironment, onStart }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <div className="logo-section">
          <div className="logo-circle">
            <img src={loadingImage} alt="UniKids" className="logo-image" />
          </div>
          <h1 className="game-title">UniKids</h1>
          <p className="game-tagline">Comprendre, Agir et S'adapter</p>
        </div>
        
        <div className="mode-section">
          <h3 className="section-title">Choisir un mode</h3>
          <div className="mode-grid">
            <div 
              className={`mode-card ${mode === 'solo' ? 'selected' : ''}`}
              onClick={() => setMode('solo')}
            >
              <div className="mode-icon solo-icon"></div>
              <h4 className="mode-title">Mode Solo</h4>
              <p className="mode-desc">Je joue mon propre rôle et apprends à réagir</p>
            </div>
            <div 
              className={`mode-card ${mode === 'duo' ? 'selected' : ''}`}
              onClick={() => setMode('duo')}
            >
              <div className="mode-icon duo-icon"></div>
              <h4 className="mode-title">Mode Duo</h4>
              <p className="mode-desc">Deux joueurs apprennent à interagir ensemble</p>
            </div>
          </div>
        </div>
        
        <div className="env-section">
          <h3 className="section-title">Choisir un environnement</h3>
          <div className="env-grid">
            {Object.entries(ENVIRONMENTS).map(([key, env]) => (
              <div 
                key={key}
                className={`env-card ${environment === key ? 'selected' : ''}`}
                onClick={() => setEnvironment(key)}
              >
                <img src={env.icon} alt={env.label} className="env-icon" />
                <span className="env-label">{env.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <button className="btn-start" onClick={onStart}>
          Commencer ▶
        </button>
        
        <p className="game-stats">10 scénarios · 5 environnements · badges à débloquer</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
