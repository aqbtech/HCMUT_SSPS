// src/components/Footer.js
import React from 'react';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'; 

function Footer() {
  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <div className="container">
        <p>Copyright © 2024 - Phát triển dựa trên Nhóm 5Q-241-CNPM</p>
        <p>Email: ddthu@hcmut.edu.vn</p>
        <p>ĐT (Tel.): (84-8) 38647256 - 5258</p>
        <div className="footer-social">
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white">
            <FaGoogle />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white">
            <FaFacebook />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
