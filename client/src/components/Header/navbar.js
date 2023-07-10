import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className='Navbar'>
            <Link to="/" className="navbar-link">Home </Link>
            <Link to="/SoleSurvivor" className="navbar-link">Sole Survivors</Link>
            <Link to="/MyProfile" className="navbar-link">My Profile</Link>
        </div>
        
    )

}
export default Navbar;