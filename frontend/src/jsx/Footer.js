import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3">
      <div className="container-fluid">
        <p>&copy; 2024 Your Blog. All rights reserved.</p>
        <div>
          <a href="https://twitter.com" className="text-light me-3">
            <TwitterIcon fontSize="large" />
          </a>
          <a href="https://facebook.com" className="text-light me-3">
            <FacebookIcon fontSize="large" />
          </a>
          <a href="https://instagram.com" className="text-light">
            <InstagramIcon fontSize="large" />
          </a>
        </div>
        <p>Designed with ❤️ by Rhydham Bhalodia</p>
      </div>
    </footer>
  );
};

export default Footer;
