import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGoogle, FaPinterest } from 'react-icons/fa'; // FontAwesome icons
import logo from '../../assets/image/logo.png';
function Header() {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
          
          <img src={logo} alt="BK Logo" style={{ width: '300px' }} />
    

          </Link>

          {/* Thanh điều hướng */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
     
            <li className="nav-item">
               <Link className="nav-link" to="/register">ĐĂNG KÍ</Link>
             </li>
          
             <li className="nav-item">
               <Link className="nav-link" to="/AboutUsSPSO">ABOUT US </Link>
             </li>
             
             <li className="nav-item">
             <Link className="nav-link" to="/SignIn">ĐĂNG NHẬP</Link>
            </li>
            </ul>

          </div>
        </nav>

        {/* Ngôn ngữ và Chia sẻ */}
        <div className="d-flex justify-content-between">
          
          <div className="social-media-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={25} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={25} />
            </a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <FaGoogle size={25} />
            </a>
            <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
              <FaPinterest size={25} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
