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
    <header className="">
      <div className="">
        <div>
          <Link className="companyName" to="/">
            <img className="title"src='FullLogo_Transparent_NoBuffer.png'/>
          </Link>
          <p className="motto">Find your next shoe!</p>
        </div>
        <Navbar/>
        <div>
          {Auth.loggedIn() ? (
            <>
              <span>Hey there, {Auth.getProfile().data.username}!</span>
              <button className="" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="" to="/login">
                Login
              </Link>
              <Link className="" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
