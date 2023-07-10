import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./navbar"
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="Header">
      <div className="">
        <div className='SignIn'>
          {Auth.loggedIn() ? (
            <>
              <span className='Username'>Welcome back,<Link className='Username' to="/MyProfile">{Auth.getProfile().data.username}</Link></span>
              <button className="logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="login" to="/login">
                Login
              </Link>
              <Link className="signup" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
        <div>
          <div className="companyName" to="/">
            <img className="title" src='FullLogo_Transparent_NoBuffer.png' alt='Sole Search Title' />
          </div>
        </div>
        <Navbar />
        <hr className='break'></hr>
      </div>
    </header>
  );
};

export default Header;
