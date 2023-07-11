import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SocialFollow from './socialFollow';

const Footer = () => {
  return (
    <footer>
    <div>
        <h4>
          <SocialFollow/>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
