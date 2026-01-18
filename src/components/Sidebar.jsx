import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard', active: true },
    { icon: 'group', label: 'Users' },
    { icon: 'menu_book', label: 'Modules' },
    { icon: 'medical_services', label: 'Diagnostics' },
    { icon: 'map', label: 'Regions' },
    { icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="d-none d-md-flex flex-column border-end bg-primary-custom text-white side-bar">
      <div className="p-4 d-flex align-items-center gap-3">
        <div className='text-center'>
          <h1 className="h6 mb-0 fw-bold tracking-wide text-white">CoeurAustisme Admin</h1>
          <p className="small mb-0 opacity-75">Autism Support</p>
        </div>
      </div>

      <nav className="flex-grow-1 px-3 mt-3">
        {menuItems.map((item, idx) => (
          <a key={idx} href="#" 
             className={`nav-link d-flex align-items-center gap-3 px-3 py-2 mb-2 rounded-3 transition-all ${item.active ? 'bg-white bg-opacity-20 shadow-sm' : 'text-white-50 hover-bg-white-10'}`}>
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="fw-medium">{item.label}</span>
          </a>
        ))} 
      </nav>

      <div className="p-3">
        <div className="bg-dark bg-opacity-25 rounded-4 p-3 border border-white border-opacity-10 d-flex align-items-center gap-3">
          <div className="rounded-circle border border-2 border-white border-opacity-25" 
               style={{ width: '40px', height: '40px', background: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBbDHEZv9ef8eH7EgwoNdKzQ6PgzSqgb4d0dPVYlBjLZ-Z_u-i4SUTqPrzolQXSO-X9MBx-8opQPjhPrl5jlaHZWHd4Fdpn5WghY2NJBinUwpAB6B-rpEG9F2rtARdghBjjCDMq8_5Ub7N0p5bbGRCyxakX9bVS18dwD0YCOAmXJvQlG9tLXclY-fh_jhoI-HafQHjkw1PFmNWYM3yaVxLZ8efBwvpIxfdb5z73CQNZSfwNwhu2A2A3y1XW1zetO52S4coqbrvnE7EI) center/cover' }}></div>
          <div className="overflow-hidden">
            <p className="small fw-bold mb-0 text-truncate">Aminata D.</p>
            <p className="text-white-50 mb-0" style={{ fontSize: '0.7rem' }}>Lead Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;