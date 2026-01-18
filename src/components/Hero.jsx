import React from 'react';

const Hero = () => {
  return (
    <header className="container my-4">
      <div className="position-relative rounded-5 overflow-hidden" style={{minHeight: '500px'}}>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9BQ4O-txaiqO2zJeDVsI1AT-Tmav2y2KNrjfa1-cYpbKTL_Hs0Md9tDTnMajBX71Af8g6mplG5vvJzo4XVINtohmCI-_cPLgGP2Hma_Y60JE-O1jErtVPs2L-cvtQCGnTz8GqTInMrCjTpq1nopFLqi5qp196hf2VhnhqcJUyNiHP9dGQs9KD7NNpiHsozQ4pvGsXCrseyri05r7zzQCs6edz4NIAgsFVH0wzERVpdirEKgyy7E0sUwhi7pxr8WSF0AxVwP7iKvb3" 
          className="position-absolute w-100 h-100" 
          style={{objectFit: 'cover', zIndex: -1}} 
          alt="Héros"
        />
        <div className="position-absolute w-100 h-100" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 0}}></div>
        
        <div className="position-relative z-1 p-5 d-flex flex-column justify-content-end h-100 text-white" style={{minHeight: '500px'}}>
          <span className="badge rounded-pill mb-3 py-2 px-3 border border-white" style={{width: 'fit-content'}}>SOUTIEN POUR CHAQUE FAMILLE</span>
          <h1 className="display-4 fw-black mb-3">
            Épanouissement pour chaque enfant : <br/> 
            <span style={{color: 'var(--primary-color)'}}>L'Autisme</span> en Afrique
          </h1>
          <p className="lead mb-4 opacity-75">Combler les lacunes de diagnostic et de soins grâce à la communauté.</p>
          <div className="d-flex gap-3">
            <button className="btn btn-primary-custom btn-lg px-4">Commencer ici</button>
            <button className="btn btn-outline-custom btn-lg px-4">Notre Impact</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;