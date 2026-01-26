import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { label: 'Familles Soutenues', value: '12,450', grow: '+5.2%', icon: 'diversity_3' },
    { label: 'Couverture Régionale', value: '14 Pays', grow: '+2 Régions', icon: 'public' },
    { label: 'Utilisateurs Actifs', value: '850', grow: '+8%', icon: 'psychology' },
    { label: 'Nouveaux Diagnostics', value: '215', grow: '+12%', icon: 'clinical_notes' },
  ];

  return (
    <div className="p-4 p-md-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Bienvenue, Aminata</h1>
          <p className="text-muted mb-0">Dernières données de votre réseau de soutien en Afrique.</p>
        </div>
        <div className="d-flex gap-2">
          <NavLink to='/register/ressources' className="btn btn-outline-secondary  nav-link d-flex align-items-center gap-2 rounded-3">
            <span className="material-symbols-outlined fs-5">download</span> Exporter
          </NavLink>
          <NavLink to='/register/modules' className="btn btn-primary-custom nav-link d-flex align-items-center gap-2 rounded-3 p-2">
            <span className="material-symbols-outlined fs-5">add</span>Nouveau Module
          </NavLink>
        </div>
      </div>


      <div className="row g-4 mb-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 position-relative overflow-hidden card-custom">
              
              <p className="small text-muted fw-medium mb-1">{stat.label}</p>
              <div className='d-flex'>
              <h3 className="h2 fw-bold mb-2">{stat.value}</h3>
              <span className="material-symbols-outlined position-absolute end-0 top-0 p-4 opacity-10 fs-2 text-primary-custom mt-4">
                {stat.icon}
              </span>
              </div>
              <div className="text-success small fw-bold d-flex align-items-center gap-1">
                <span className="material-symbols-outlined fs-6 mt-2">trending_up</span> {stat.grow}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tu pourras ajouter ici tes graphiques et tableaux */}
    </div>
  );
};

export default AdminDashboard;