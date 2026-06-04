import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight } from 'lucide-react';
import InstagramIcon from '../ui/InstagramIcon';
import './Footer.css';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Events' },
  { path: '/opportunities', label: 'Opportunities' },
  { path: '/join', label: 'Join Community' },
  { path: '/about', label: 'About' },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon footer-logo-img-wrapper">
                <img src="/images/logo.jpg" alt="EBC Logo" className="ebc-logo-img footer-ebc-logo" />
              </div>
              <span className="footer-logo-text">EBC</span>
            </Link>
            <p className="footer-tagline">
              Ekthaa Business & Builders Community — Where founders, students, business owners and professionals connect, collaborate and grow together.
            </p>
            <p className="footer-location">📍 Hyderabad, India</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              {quickLinks.map((link) => (
                <Link key={link.path} to={link.path} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="footer-section">
            <h4 className="footer-heading">Community</h4>
            <div className="footer-links">
              <a 
                href="https://instagram.com/ebc.comm.unity" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link footer-link-external"
              >
                <InstagramIcon size={15} />
                <span>@ebc.comm.unity</span>
                <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://instagram.com/sidhartha.juluri" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-link footer-link-external"
              >
                <InstagramIcon size={15} />
                <span>@sidhartha.juluri</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="footer-section">
            <h4 className="footer-heading">Join Us</h4>
            <p className="footer-cta-text">Ready to meet builders around you?</p>
            <Link to="/join" className="footer-cta-btn">
              Join EBC
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} EBC Hyderabad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
