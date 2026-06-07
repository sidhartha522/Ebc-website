import { Link } from 'react-router-dom';
import { ArrowRight, Users, Sparkles, Rocket, Briefcase } from 'lucide-react';
import Button from '../ui/Button';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Animated background */}
      <div className="hero-bg">
        <div className="hero-grid-overlay" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
            <div className="hero-logo anim-fade-in-up">
              <img src="/images/logo.png" alt="EBC Logo" className="hero-logo-img" />
            </div>

            <div className="hero-badge anim-fade-in-up" style={{ animationDelay: '0.05s' }}>
              <Sparkles size={14} />
              <span>Hyderabad's Founder & Entrepreneur Community</span>
            </div>

          <h1 className="hero-title anim-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Meet people you'll actually keep meeting.
          </h1>

          <p className="hero-subtitle anim-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A community for founders, professionals, students, and curious people to connect in real life, right around you.
          </p>

          <div className="hero-actions anim-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button href="/join" size="lg" icon={Users}>
              Join Community
            </Button>
            <Button href="/events" variant="secondary" size="lg" iconRight={ArrowRight}>
              View Events
            </Button>
          </div>

          <div className="hero-proof anim-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="hero-avatars">
              <div className="hero-avatar"><img src="/images/avatar1.png" alt="Community member" className="hero-avatar-img" /></div>
              <div className="hero-avatar"><img src="/images/avatar2.png" alt="Community member" className="hero-avatar-img" /></div>
              <div className="hero-avatar"><img src="/images/avatar3.png" alt="Community member" className="hero-avatar-img" /></div>
              <div className="hero-avatar"><img src="/images/avatar4.png" alt="Community member" className="hero-avatar-img" /></div>
              <div className="hero-avatar"><img src="/images/avatar5.png" alt="Community member" className="hero-avatar-img" /></div>
            </div>
            <p className="hero-proof-text">
              <strong>2,200+</strong> founders & entrepreneurs already joined
            </p>
          </div>
        </div>


      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
