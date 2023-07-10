import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faFacebook,
faTwitter,
faInstagram,
faYoutube
}
from "@fortawesome/free-brands-svg-icons"
export default function SocialFollow() {
    return (
      <div className="social-container">
        <p className="follow-text">Follow us for latest shoes @SoleSearch ❤️</p>
  
        <div className="social-icons">
          <a href="https://www.Facebook.com" className="facebook social">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
  
          <a href="https://www.Twitter.com" className="twitter social">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
  
          <a href="https://www.Instagram.com" className="instagram social">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
  
          <a href="https://www.Youtube.com" className="youtube social">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        </div>
      </div>
    );
  }