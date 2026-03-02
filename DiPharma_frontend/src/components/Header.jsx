import { useState } from 'react'
import './Header.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import logo from "../assets/brands/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (path === '/contact') {
      return location.pathname === '/contact'
    }
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          {/* <div className="logo-icon">D</div> */}
          <Link to={"/"}>
          <img src={logo} alt="D Pharma Logo" className="logo-image-head" />
          </Link>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}  onClick={handleNavClick}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}  onClick={handleNavClick}>About</Link>
          <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}  onClick={handleNavClick}>Services</Link>
          <Link to="/career" className={`nav-link ${isActive('/career') ? 'active' : ''}`}  onClick={handleNavClick}>Career</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}  onClick={handleNavClick}>Contact Us</Link>

        </nav>

        <button className="book-appointment-btn" onClick={() => navigate('/contact')}>
          Book Appointment
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.69362 12L2.29933 3.27184C2.0631 2.66436 2.65544 2.08343 3.2414 2.28992L3.33375 2.32918L21.3337 11.3292C21.852 11.5883 21.8844 12.2978 21.4309 12.6132L21.3337 12.6708L3.33375 21.6708C2.75077 21.9623 2.11746 21.4263 2.2688 20.8238L2.29933 20.7282L5.69362 12L2.29933 3.27184L5.69362 12ZM4.4021 4.54041L7.01109 11.2494L13.6387 11.25C14.0184 11.25 14.3322 11.5322 14.3818 11.8982L14.3887 12C14.3887 12.3797 14.1065 12.6935 13.7404 12.7432L13.6387 12.75L7.01109 12.7494L4.4021 19.4596L19.3213 12L4.4021 4.54041Z" fill="white"/>
</svg>

        </button>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header

