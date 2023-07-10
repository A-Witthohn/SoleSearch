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
              <span>Hey there, {Auth.getProfile().data.username}!</span>
              <button className="" onClick={logout}>
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
            <img className="title" src='FullLogo_Transparent_NoBuffer.png' />
          </div>
        </div>
        <Navbar />
        <hr className='break'></hr>
      </div>
    </header>
  );
};

export default Header;
