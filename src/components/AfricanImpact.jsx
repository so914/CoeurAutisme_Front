import React from 'react';

const AfricanImpact = () => {
  return (
    <section className="py-5 overflow-hidden">
      <div className="container py-4">
        <div className="row align-items-center g-5">
          
          {/* Côté Gauche : L'image de la carte */}
          <div className="col-lg-6 text-center">
            <div className="position-relative p-4">
              <div className="position-absolute top-50 start-50 translate-middle opacity-10 rounded-circle" 
                   style={{ width: '120%', paddingTop: '120%', zIndex: -1 }}></div>
              
              <img 
                src="/images/ChatGPT Image 26 janv. 2026, 02_41_42.png"
                alt="Carte de l'Afrique impact Jali" 
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: '450px', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Côté Droit : Le texte et les compteurs */}
          <div className="col-lg-6">
            <h6 className="text-uppercase fw-bold text-success ls-2 mb-3">Notre Présence</h6>
            <h2 className="display-5 fw-bold mb-4">Un mouvement pour <span style={{color: 'var(--secondary-color)'}}>toute l'Afrique</span></h2>
            <p className="lead text-muted mb-5">
              Nous travaillons sans relâche pour que chaque enfant africain, peu importe son pays, ait accès à un diagnostic précoce et un soutien adapté.
            </p>

            <div className="row g-4">
              <div className="col-sm-6">
                <div className="border-start border-4 border-primary-custom ps-3">
                  <h3 className="fw-bold mb-0">15+</h3>
                  <p className="text-muted mb-0">Pays couverts</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="border-start border-4 border-warning ps-3">
                  <h3 className="fw-bold mb-0">50k</h3>
                  <p className="text-muted mb-0">Membres actifs</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="border-start border-4 border-info ps-3">
                  <h3 className="fw-bold mb-0">200+</h3>
                  <p className="text-muted mb-0">Experts locaux</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="border-start border-4 border-danger ps-3">
                  <h3 className="fw-bold mb-0">24/7</h3>
                  <p className="text-muted mb-0">Support disponible</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AfricanImpact;