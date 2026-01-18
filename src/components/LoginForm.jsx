import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto w-100" style={{ maxWidth: '480px' }}>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-2">Bon retour parmi nous</h1>
        <p className="text-success small">Veuillez entrer vos informations pour accéder à votre compte.</p>
      </div>

      <form className="d-flex flex-column gap-3">
        <div className="form-group">
          <label className="small fw-bold mb-1">Email ou Nom d'utilisateur</label>
          <div className="input-group custom-pass-group">
            <input type="email" className="form-control border-end-0 rounded-start-4" placeholder="Entrez votre email" />
            <button className="input-group-text rounded-end-4">
              <span className="material-symbols-outlined fs-5">mail</span>
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="small fw-bold mb-1">Mot de passe</label>
            <div className="input-group custom-pass-group">
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control border-end-0 rounded-start-4" 
                placeholder="Entrez votre mot de passe" 
                style={{ boxShadow: 'none' }} 
              />
              <button 
                type="button" 
                className="btn border border-start-0 rounded-end-4 bg-transparent d-flex align-items-center"
                onClick={() => setShowPassword(!showPassword)}
                style={{ borderColor: '#dee2e6' }}
              >
                <span className="material-symbols-outlined fs-5 text-muted">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
        </div>
        </div>

        <div className="d-flex justify-content-between align-items-center small">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">Se souvenir de moi</label>
          </div>
          <a href="#" className="text-primary-custom fw-bold text-decoration-none">Mot de passe oublié ?</a>
        </div>

        <button className="btn btn-primary-custom w-100 py-2 fw-bold shadow-sm">Se connecter</button>
      </form>

      {/* Séparateur */}
      <div className="text-center my-4 position-relative">
        <hr />
        <span className="position-absolute top-50 start-50 translate-middle bg-white separateur-form dark:bg-dark px-2 small text-muted">Ou continuer avec</span>
      </div>

      {/* Boutons Sociaux */}
      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-4">
           <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="18" alt="Google" /> Google
        </button>
        <button className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-4">
           <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" width="18" alt="Facebook" /> Facebook
        </button>
      </div>

      {/* Lien d'inscription */}
      <div className="mt-4 text-center">
        <p className="small text-muted">
          Vous n'avez pas de compte ? 
          <NavLink to="/register" className="text-primary-custom fw-bold text-decoration-none ms-1">Créer un compte</NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;