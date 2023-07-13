import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const handleProfileClick = (event) => {
    if (!Auth.loggedIn()) {
      // Prevent the default link behavior
      event.preventDefault();

      // Close the dropdown
      setIsDropdownOpen(false);

      // Redirect to signup page
      window.location.href = '/signup';
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setIsDropdownOpen(false); // Close the dropdown whenever the URL path changes
  }, [location.pathname]);

  return (
    <div className='Navbar'>
      <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
        <button className="dropdown-button Menu" onClick={toggleDropdown}>
          Menu &#9662;
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/SoleSurvivor" className="navbar-link">Sole Survivors</Link>
            <Link to="/MyProfile" className="navbar-link" onClick={handleProfileClick}>My Profile</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;