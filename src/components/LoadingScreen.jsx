import React, { useEffect } from 'react';
import loadingImage from '../images/loading-image.png';


const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-image-container">
          <img src={loadingImage} alt="UniKids" className="loading-image" />
        </div>
        <h1 className="loading-title">UniKids</h1>
        <p className="loading-tagline">Comprendre, Agir et S'adapter</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        <p className="loading-text">Chargement...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;