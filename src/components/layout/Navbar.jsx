import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import InstagramIcon from '../ui/InstagramIcon';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Events' },
  { path: '/opportunities', label: 'Opportunities' },
  { path: '/join', label: 'Join Community' },
  { path: '/about', label: 'About' },
  { path: '/admin', label: 'Admin Panel' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`} id="main-nav">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" id="nav-logo">
          <div className="logo-icon logo-img-wrapper">
            <img src="/images/logo.jpg" alt="EBC Logo" className="ebc-logo-img" />
          </div>
          <span className="logo-text">EBC</span>
          <span className="logo-badge">Hyderabad</span>
        </Link>

        <div className="navbar-links" id="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
            >
              {link.label}
              {location.pathname === link.path && <span className="nav-link-indicator" />}
            </Link>
          ))}
        </div>

        <div className="navbar-right">
          <a 
            href="https://instagram.com/ebc.comm.unity" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-instagram"
            id="nav-instagram"
          >
            <InstagramIcon size={18} />
            <span>@ebc.comm.unity</span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileOpen ? 'mobile-menu-open' : ''}`} id="mobile-menu">
        <div className="mobile-menu-inner">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-link ${location.pathname === link.path ? 'mobile-link-active' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-divider" />
          <a 
            href="https://instagram.com/ebc.comm.unity" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mobile-instagram"
          >
            <InstagramIcon size={18} />
            <span>@ebc.comm.unity</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
