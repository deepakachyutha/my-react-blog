import React from 'react';

function Navbar({ onLogout, setRoute }) {
  return (
    <nav className="nav">
      <div className="nav__container">
        <div className="nav__brand"><h2>Words</h2></div>
        <div className="nav__menu">
          <button className="nav__link" onClick={() => setRoute('dashboard')}>Home</button>
          <button className="nav__link" onClick={() => setRoute('write')}>Write</button>
          <button className="nav__link" onClick={() => setRoute('explore')}>Explore</button>
          <button className="nav__link" onClick={() => setRoute('profile')}>Profile</button>
          <button className="btn btn--outline btn--sm" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
