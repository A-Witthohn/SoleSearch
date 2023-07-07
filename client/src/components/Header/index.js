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
            <h1 className="title">SoleSearch</h1>
          </Link>
          <p className="motto">Find your next shoe!</p>
          <Navbar/>
        </div>
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
