import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';


const RegisterForm = () => {
  const login = useGoogleLogin({
  onSuccess: tokenResponse => console.log(tokenResponse),
});
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
        <div className="mx-auto w-100" style={{ maxWidth: '480px' }}>
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-2">Bienvenue parmi nous</h1>
        <p className="text-success small">Veuillez entrer vos informations pour créer votre compte.</p>
      </div>

      <form className="d-flex flex-column gap-3">
        <div className="form-group">
          <label className="small fw-bold mb-1">Email ou Nom d'utilisateur</label>
          <div className="input-group custom-pass-group">
            <input type="email" className="form-control border-end-0 rounded-start-4" placeholder="Entrez votre email" />
            <button className="input-group-text bg-transparent rounded-end-4">
              <span className="material-symbols-outlined fs-5">mail</span>
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="small fw-bold mb-1">Profil</label>
          <div className="input-group custom-pass-group">
            <select name="profil" className="form-control border-end-0 rounded-start-4" >
              <option value="">--- Quel profil vous correspond le mieux? ---</option>
              <option value="Personne autiste">Personne autiste</option>
              <option value="Parent d'un enfant autiste">Parent d'un enfant autiste</option>
              <option value="Aide/Spécialiste">Aide/Spécialiste de l'autisme</option>
              <option value="autre">Autre</option>
            </select>
            <button className="input-group-text bg-transparent rounded-end-4">
              <span className="material-symbols-outlined fs-5">account_circle</span>
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="small fw-bold mb-1">Date de naissance</label>
          <div className="input-group custom-pass-group">
            <input type="date" className="form-control border-end-0 rounded-start-4" placeholder="Entrez votre date de naissance" />
          </div>
        </div>

        <div className="form-group">
          <label className="small fw-bold mb-1">Genre</label>
          <div className="input-group custom-pass-group">
            <select name='genre' className="form-control border-end-0 rounded-start-4">
              <option value="">--- Sélectionnez votre genre ---</option>
              <option value="Femme">Femme</option>
              <option value="Homme">Homme</option>
              <option value="Autre">Autre</option>
            </select>
            <button className="input-group-text bg-transparent rounded-end-4">
              <span className="material-symbols-outlined fs-5">wc</span>
            </button>
          </div>
        </div>
        <div className="form-group">
          <label className="small fw-bold mb-1">Pays de résidence</label>
          <div className="input-group custom-pass-group">
            <select name='genre' className="form-control border-end-0 rounded-start-4">
              <option value="">--- Sélectionnez votre pays ---</option>
                <optgroup label="Afrique">
                  <option value="DZ">Algérie</option>
                  <option value="AO">Angola</option>
                  <option value="BJ">Bénin</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="CM">Cameroun</option>
                  <option value="CI">Côte d’Ivoire</option>
                  <option value="CD">Congo (RDC)</option>
                  <option value="CG">Congo (Brazzaville)</option>
                  <option value="EG">Égypte</option>
                  <option value="GA">Gabon</option>
                  <option value="GH">Ghana</option>
                  <option value="KE">Kenya</option>
                  <option value="MA">Maroc</option>
                  <option value="NG">Nigeria</option>
                  <option value="SN">Sénégal</option>
                  <option value="TN">Tunisie</option>
                  <option value="ZA">Afrique du Sud</option>
                </optgroup>


                <optgroup label="Europe">
                  <option value="DE">Allemagne</option>
                  <option value="AT">Autriche</option>
                  <option value="BE">Belgique</option>
                  <option value="ES">Espagne</option>
                  <option value="FR">France</option>
                  <option value="IT">Italie</option>
                  <option value="NL">Pays-Bas</option>
                  <option value="PL">Pologne</option>
                  <option value="PT">Portugal</option>
                  <option value="UK">Royaume-Uni</option>
                  <option value="CH">Suisse</option>
                </optgroup>

              <optgroup label="Amérique du Nord et centrale">
                <option value="CA">Canada</option>
                <option value="US">États-Unis</option>
                <option value="MX">Mexique</option>
                <option value="HT">Haïti</option>
                <option value="DO">République dominicaine</option>
              </optgroup>

            <optgroup label="Amérique du Sud">
              <option value="AR">Argentine</option>
              <option value="BO">Bolivie</option>
              <option value="BR">Brésil</option>
              <option value="CL">Chili</option>
              <option value="CO">Colombie</option>
              <option value="PE">Pérou</option>
              <option value="VE">Venezuela</option>
            </optgroup>

            <optgroup label="Moyen-Orient">
              <option value="AE">Émirats arabes unis</option>
              <option value="IL">Israël</option>
              <option value="JO">Jordanie</option>
              <option value="LB">Liban</option>
              <option value="SA">Arabie saoudite</option>
              <option value="TR">Turquie</option>
            </optgroup>

            <optgroup label="Asie">
              <option value="CN">Chine</option>
              <option value="IN">Inde</option>
              <option value="ID">Indonésie</option>
              <option value="JP">Japon</option>
              <option value="KR">Corée du Sud</option>
              <option value="PH">Philippines</option>
              <option value="TH">Thaïlande</option>
              <option value="VN">Vietnam</option>
            </optgroup>

            <optgroup label="Océanie">
              <option value="AU">Australie</option>
              <option value="NZ">Nouvelle-Zélande</option>
              <option value="FJ">Fidji</option>
            </optgroup>
            </select>
            <button className="input-group-text bg-transparent rounded-end-4">
              <span className="material-symbols-outlined fs-5">location_on</span>
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
        <button onClick={() => login()} className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-4">
           <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="18" alt="Google" /> Google
        </button>
        <button className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2 rounded-4">
           <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" width="18" alt="Facebook" /> Facebook
        </button>
      </div>
    </div>
    </div>
  )
}

export default RegisterForm