import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoSchoolOutline } from "react-icons/io5";
import { MdOutlineDiversity3 } from "react-icons/md";
import { MdOutlineMedicalServices } from "react-icons/md";
import { MdOutlineVolunteerActivism } from "react-icons/md";



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
    { title: "Sensibilisation", icon: <IoSchoolOutline /> , image: "./images/Gemini_Generated_Image_asg0wgasg0wgasg0.png", link:"/ressources" },
    { title: "Prévention", icon: <MdOutlineMedicalServices />   , image: "./images/Gemini_Generated_Image_d5iwvld5iwvld5iw.png", description: "Guides adaptés à nos réalités",link:"/tests" },
    { title: "Communauté", icon: <MdOutlineDiversity3 /> , image: "./images/Gemini_Generated_Image_31b3bo31b3bo31b3.png", description: "Échangez entre parents.",link:"/communaute" },
    { title: "Dons", icon: <MdOutlineVolunteerActivism /> , image: "./images/", description: "Soutenez nos actions." }
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