import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '/Users/JamesACone/bootcamp/SoleSearch/client/src/utils/auth.js';

function Navbar() {
const handleProfileClick = (event) => {
    if (!Auth.loggedIn()) {
        // Prevent the default link behavior
        event.preventDefault();
    
        // Redirect to signup page
        window.location.href = '/signup';
    }
};

  return (
    <div className='Navbar'>
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/SoleSurvivor" className="navbar-link">Sole Survivors</Link>
      <Link to="/MyProfile" className="navbar-link" onClick={handleProfileClick}>My Profile</Link>
    </div>
  );
}

export default Navbar;