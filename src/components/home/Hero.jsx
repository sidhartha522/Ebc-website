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
            <div className="hero-badge anim-fade-in-up">
              <Sparkles size={14} />
              <span>Hyderabad's Founder & Entrepreneur Community</span>
            </div>

          <h1 className="hero-title anim-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Meet <span className="text-gradient">Founders &amp; Entrepreneurs</span>, Founders &amp; <span className="text-gradient">Opportunities</span> Around You
          </h1>

          <p className="hero-subtitle anim-fade-in-up" style={{ animationDelay: '0.2s' }}>
            EBC is a community where startup founders, business owners, students, aspiring founders, investors and professionals connect, collaborate and grow together.
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
              {[1,2,3,4,5].map(i => (
                <div key={i} className="hero-avatar">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
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
