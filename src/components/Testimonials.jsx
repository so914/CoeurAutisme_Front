import React from 'react';

const TestimonyCard = ({ name, role, message, image, date }) => (
  <div className="col-md-4 mb-4">
    <div className="card h-100 border-0 shadow-sm rounded-4 p-4 card-custom transition-all">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="position-relative">
          <img 
            src={image} 
            alt={name} 
            className="rounded-circle border border-2 border-primary-custom"
            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
          />
          <div className="position-absolute bottom-0 end-0 bg-primary-custom rounded-circle d-flex align-items-center justify-content-center" style={{ width: '20px', height: '20px' }}>
            <span className="material-symbols-outlined text-dark" style={{ fontSize: '12px' }}>format_quote</span>
          </div>
        </div>
        <div>
          <h6 className="fw-bold mb-0">{name}</h6>
          <p className="text-muted small mb-0">{role}</p>
        </div>
      </div>
      
      <p className="card-text italic mb-4" style={{ fontStyle: 'italic', color: 'var(--bs-secondary-color)' }}>
        "{message}"
      </p>
      
      <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
        <div className="text-warning d-flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined fs-6" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          ))}
        </div>
        <span className="text-muted small">{date}</span>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const stories = [
    {
      name: "Fatou Diop",
      role: "Maman d'Amadou (6 ans)",
      message: "Grâce aux ressources de CoeurAutisme, j'ai enfin compris comment communiquer avec mon fils. Le guide sur les routines quotidiennes a changé notre vie.",
      image: "https://i.pravatar.cc/150?u=fatou",
      date: "Il y a 2 mois"
    },
    {
      name: "Dr. Koffi Mensah",
      role: "Pédiatre",
      message: "Un outil indispensable pour orienter les familles après un diagnostic. L'approche culturelle africaine fait toute la différence.",
      image: "https://i.pravatar.cc/150?u=koffi",
      date: "Il y a 1 mois"
    },
    {
      name: "Moussa Traoré",
      role: "Éducateur spécialisé",
      message: "La communauté CoeurAutisme permet de briser l'isolement. Les échanges entre parents et professionnels sont d'une richesse incroyable.",
      image: "https://i.pravatar.cc/150?u=moussa",
      date: "Il y a 3 semaines"
    }
  ];

  return (
    <section className="bg-background-light dark:bg-background-dark py-5">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h6 className="text-uppercase fw-bold ls-2" style={{ color: 'var(--primary-dark)', letterSpacing: '2px' }}>
            Histoires d'espoir
          </h6>
          <h2 className="display-6 fw-bold">Ils nous font <span style={{ color: 'var(--secondary-color)' }}>confiance</span></h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Découvrez l'impact de notre communauté sur le quotidien des familles touchées par l'autisme en Afrique.
          </p>
        </div>

        <div className="row">
          {stories.map((story, index) => (
            <TestimonyCard key={index} {...story} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;