import React from 'react';

const Footer = () => {
  return (
    <footer className="py-5 custom-footer " style={{ marginTop: '5rem' }}>
      <div className="container">
        <div className="row gy-5 mb-5">

          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-4">
              <div>
                <img className="logo-image d-inline-block align-top" src="./Screenshot_2025-12-22_at_15-34-17_Google_Gemini-removebg-preview.png" alt="logo" />
              </div>
              <h2 className="h4 mb-0 fw-bold">
                Coeur<span style={{ color: 'var(--primary-dark)' }}>Autisme</span>
              </h2>
            </div>
            
            <p className="text-muted mb-4" style={{ maxWidth: '450px', lineHeight: '1.6' }}>
              Nous nous engageons à transformer la vie des personnes autistes en Afrique grâce à une éducation inclusive, des diagnostics accessibles et un soutien communautaire fort.
            </p>
            
           <div className="d-flex gap-3">
        {[
          { id: '1', icon: 'Thumb_up' }, 
          { id: '2', icon: 'photo_camera' }, 
          { id: '3', icon: 'mail' }
        ].map((item) => (
          <a key={item.id} href="#" 
            className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px' }}>
            <span className="material-symbols-outlined fs-5">{item.icon}</span>
          </a>
        ))}
      </div>
          </div>

 
          <div className="col-lg-6">
            <div className="p-4 p-md-5 rounded-5 footer-style" >
              <h3 className="h5 fw-bold mb-2">Restez informé</h3>
              <p className="small text-muted mb-4">
                Recevez les dernières ressources, histoires et mises à jour d'événements directement dans votre boîte mail.
              </p>
              
              <form className="row g-2">
                <div className="col-sm-8">
                  <input 
                    type="email" 
                    className="form-control form-control-lg border-0 shadow-sm rounded-4" 
                    placeholder="Votre adresse email"
                    style={{ fontSize: '0.9rem' }}
                  />
                </div>
                <div className="col-sm-4">
                  <button type="submit" className="btn btn-primary-custom  w-100 rounded-4 shadow-sm ">
                    S'abonner
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Barre de Copyright */}
        <div className="row pt-4 border-top">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-muted small mb-0">© 2025 CoeurAutisme. Tous droits réservés.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-muted small text-decoration-none me-4 hover-primary">Politique de confidentialité</a>
            <a href="#" className="text-muted small text-decoration-none hover-primary">Conditions d'utilisation</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;