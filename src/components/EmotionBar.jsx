import React from 'react';


const EmotionBar = ({ label, value, color, icon }) => (
  <div className="emotion-row">
    <span className="emotion-icon">{icon}</span>
    <span className="emotion-label">{label}</span>
    <div className="emotion-track">
      <div 
        className="emotion-fill" 
        style={{ width: `${value}%`, backgroundColor: color }}
      ></div>
    </div>
    <span className="emotion-value" style={{ color }}>{value}%</span>
  </div>
);

export default EmotionBar;