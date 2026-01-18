import React from 'react';

const LoginHero = () => {
  return (
    <div className="w-100 w-lg-50 h-200 h-lg-100 position-relative bg-dark overflow-hidden">
      <div className="position-absolute inset-0 bg-cover bg-center login-card"/>
      <div className="position-absolute bottom-0 start-0 login-info w-100 p-4 p-lg-5 bg-gradient-to-t from-black opacity-90 ">
        <div className="text-white texte-write max-w-440">
          <div className="mb-3 d-inline-flex align-items-center justify-content-center icone-bg rounded-circle bg-opacity-25 p-3">
            <span className="material-symbols-outlined">diversity_3</span>
          </div>
          <h2 className="h3 fw-bold mb-2">Connecter le spectre à travers <span style={{color:'var(--primary-color)'}}>l'Afrique</span></h2>
          <p className="text-white">Rejoignez notre plateforme de sensibilisation et de soutien à l'autisme, célébrant la neurodiversité avec fierté.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginHero;