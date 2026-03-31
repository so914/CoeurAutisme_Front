import React from 'react';


const BadgeOverlay = ({ badge, onClose }) => (
  <div className="badge-overlay show">
    <div className="badge-icon">🏅</div>
    <div className="badge-label">Badge débloqué !</div>
    <div className="badge-name">{badge.name}</div>
    <div className="badge-sublabel">{badge.sub}</div>
    <button className="btn-primary" onClick={onClose}>Continuer →</button>
  </div>
);

export default BadgeOverlay;