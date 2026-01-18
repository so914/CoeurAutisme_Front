import React from 'react';

const TopHeader = ({ theme, toggleTheme }) => {
  return (
    <header className={`navbar sticky-top bg-surface border-bottom px-4 py-3 ${theme==='dark'? 'navbar-dark bg-dark': 'navbar-light bg-white'}`}>
      <div className="d-flex align-items-center gap-3">
        <button className="btn d-md-none p-0 text-muted">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="h5 fw-bold mb-0">Dashboard</h2>
      </div>

      <div className="d-flex align-items-center gap-4">
        <div className="d-none d-sm-flex align-items-center bg-light-subtle border rounded-3 px-3 py-1" style={{ width: '300px' }}>
          <span className="material-symbols-outlined text-muted fs-5">search</span>
          <input type="text" className="form-control border-0 bg-transparent shadow-none py-1 ms-2" placeholder="Rechercher..." />
        </div>

        {/* Actions et Switch Thème */}
        <div className="d-flex align-items-center gap-2">
          <button onClick={toggleTheme} className="btn btn-icon rounded-circle hover-bg">
            <span className="material-symbols-outlined">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
          <button className="btn btn-icon rounded-circle hover-bg position-relative">
            <span className="material-symbols-outlined text-muted">notifications</span>
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-white rounded-circle"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;