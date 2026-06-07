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
      <div className="navbar-inner container" style={{ justifyContent: 'space-between' }}>
        
        {/* Left Side: Hamburger Menu */}
        <div className="navbar-left">
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
            style={{ display: 'block', marginRight: 'auto' }}
          >
            {isMobileOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
          </button>
        </div>

        {/* Center: Hidden Desktop Links (optional) */}
        <div className="navbar-links" id="nav-links" style={{ display: 'none' }}>
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

        {/* Right Side: Next Meetup Button */}
        <div className="navbar-right">
          <Link to="/events" className="nav-meetup-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>Next Meetup</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
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
