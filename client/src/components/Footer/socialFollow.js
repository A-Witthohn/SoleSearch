import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const SocialFollow = () => {
  const [showSocialContainer, setShowSocialContainer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;

      // Calculate the distance from the bottom of the visible content area
      const distanceFromBottom = scrollHeight - (scrollPosition + clientHeight);

      // Set the threshold to a percentage of the clientHeight
      const threshold = clientHeight * 0.2;

      // Show or hide the social container based on the distance from the bottom
      setShowSocialContainer(distanceFromBottom <= threshold);

      // Add or remove the loading state based on scroll position
      if (scrollPosition === 0) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {!isLoading && (
        <div className={`social-container${showSocialContainer ? ' active' : ''}`}>
          <p className="follow-text">Follow us for latest shoes @SoleSearch ❤️</p>
          <div className="social-icons">
            <a href="https://www.Facebook.com" className="facebook social">
              <FontAwesomeIcon icon={faFacebook} size="3x" />
            </a>

            <a href="https://www.Twitter.com" className="twitter social">
              <FontAwesomeIcon icon={faTwitter} size="3x" />
            </a>

            <a href="https://www.Instagram.com" className="instagram social">
              <FontAwesomeIcon icon={faInstagram} size="3x" />
            </a>

            <a href="https://www.Youtube.com" className="youtube social">
              <FontAwesomeIcon icon={faYoutube} size="3x" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialFollow;