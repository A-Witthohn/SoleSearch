import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function Navbar() {
    return (
        <div className='Navbar'>
            <Link to="/" className="navbar-link">Home </Link>
            <Link to="/SoleSurvivor" className="navbar-link">SoleSurvivors</Link>
            <Link to="/MyProfile" className="navbar-link">MyProfile</Link>
        </div>
        
    )

}
export default Navbar;