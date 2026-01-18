import React from 'react';
import { NavLink } from 'react-router-dom';

const ModuleCard = ({ title, description, icon, image,link }) => (
  <div className="col-md-6 col-lg-3 mb-4">
    <div className="card h-100 card-custom rounded-4 shadow-sm">
     <NavLink to={link} className="nav-link"> 
      <div className="position-relative p-2">
        <img src={image} className="card-img-top rounded-4" style={{height: '180px', objectFit: 'cover'}} alt={title} />
        <div className="position-absolute top-0 end-0 m-3 bg-white rounded-circle p-2 shadow-sm d-flex align-items-center" style={{color: 'var(--primary-color)'}}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <div className="card-body text-center">
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-muted small">{description}</p>
      </div>
     </NavLink>
    </div>
  </div>
);

const Modules = () => {
  const data = [
    { title: "Sensibilisation", icon: "school", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc-67xr_gCL-usAi42OqxJWl87Ly2S0omICwgEQztg2oREEzHvjZbjgd2FtESykAB9Ye6i5NzOUwgsflV_9UFNwACaGDVu0TKrk_fNvU3gVbCcTbGp-5cD6gc4cyLEdgnS2KM-iDZRgrO4vae3uBVVKae6wLYQB1c_WkV5gXyrzrSwbwC7qP8iGEriMdCVbUZajMyclcU2HlW8ll16qWYK_5wdEL-uJ9Xtkow1gExJDpsjyfBjvXMpeoMA9s3nsCa3e0uGam1JZtGY", description: "Guides adaptés à nos réalités.", link:"/ressources" },
    { title: "Prévention", icon: "medical_services", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxjtBQTdEYRN6a8l97W4AQrWnpH-y6NzkCGNy-ErXN4e3wEFqFZWEDY_mnJJLrJO86YXGXlB4klaIR5TOfKzjukZZfUEtatwC4b5XwmAyZHPjoEgDBlbwUN-2PqLZerWSv1yUgMAao9fPyBTGmndMGPQHVHNwgtoCpGmnq9woudOvWLPW1t0oE3bSAGJcEMYq9T1jPMINa7QOi3xF8lQFjpfMNpliJZCe3Ab4jmPTM2iKpal7FxvFfODX1VcTRn_tZRYVF5J4gOduO", description: "Outils de prédépistage simplifié.",link:"/tests" },
    { title: "Communauté", icon: "diversity_3", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzT8odj3KlfJD1lZsHxgVAji3W_bpSVjnMdWkTDC7vrmrDcOg9YXLFscYTJKSqoDweXu0wspbT3cW-TjcjR1dl7Y1gfaNIyKz_wTyRD4WtGvQCr0pljMdSRwSPIpzMegxlF4r749_DBCCjSrJ5hH93FcwXO39IsqGEEjigu6e4B9yCJqlwkBjxWnP1f8aBWXXTC6A-7Ct6yAUmI4E51syUS2s0FT6uV-BIeVwFOT6aJdrKmhUeyZ3nAEK7B7tkv-n1ODyEPjNbKjpb", description: "Échangez entre parents.",link:"/communaute" },
    { title: "Dons", icon: "volunteer_activism", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUI9O_L8xE4sU49pm2D8pyzaeyS-xLFDS1-9PYeBA_CvSVV5cXxNKskwKSF7IdyiHNVFT0F-_ounWc72Aysv6dRN0rLg-HUVtjfGc8nh9imQ89DCN37xVrwFrDD5U4iAFweNPQpr-JYveOHsHMMRJIHC01-n_fDRf_AFE4vJXtjnPvI8EcynXhzkiFE8xBrbKn-E418eXpV8OCj-ocaTTtwHrN_or0iUwJAhH7X7jAK79zIBx5PGWHvRpvJWRSNNxcHj0xWWWByflM", description: "Soutenez nos actions." }
  ];

  return (
    <section className="container py-5">
      <div className="mb-5">
        <h6 className="text-uppercase fw-bold" style={{color: 'var(--primary-color)', letterSpacing: '2px'}}>Nos Modules</h6>
        <h2 className="fw-bold">Un accompagnement adapté à <span style={{color: 'var(--secondary-color)'}}>nos cultures</span></h2>
      </div>
      <div className="row">
        {data.map((item, index) => <ModuleCard key={index} {...item} />)}
      </div>
    </section>
  );
};

export default Modules;