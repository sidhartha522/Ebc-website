import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, UserPlus, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Photo Collage Background */}
      <div className="hero-collage-bg">
        <div className="collage-grid">
          <div className="collage-item" style={{ backgroundImage: "url('/images/0a57b67b-45be-43ea-b7f4-03b15e278f3a.jpg')" }}></div>
          <div className="collage-item" style={{ backgroundImage: "url('/images/2b23e345-4553-458a-a051-f38e57432492.jpg')" }}></div>
          <div className="collage-item" style={{ backgroundImage: "url('/images/459a9013-112f-4c26-a8c3-0031321133d8.jpg')" }}></div>
          <div className="collage-item" style={{ backgroundImage: "url('/images/4f5d9909-1457-49a5-a837-5f1d6c81e4fb.jpg')" }}></div>
          <div className="collage-item" style={{ backgroundImage: "url('/images/6e028693-7f05-4469-9090-7b3d9de90ee3.jpg')" }}></div>
          <div className="collage-item" style={{ backgroundImage: "url('/images/893ff658-8e06-4c23-ba00-a20b2674c580.jpg')" }}></div>
        </div>
        <div className="collage-overlay"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          
          <div className="hero-logo-wrapper anim-fade-in-up">
            <img src="/images/logo.png" alt="EBC Logo" className="hero-main-logo" />
            <p className="hero-logo-subtitle">ekthaa business & builder community</p>
          </div>

          <h1 className="hero-main-title anim-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Meet people you'll<br/>actually keep meeting.
          </h1>

          <div className="hero-divider anim-fade-in-up" style={{ animationDelay: '0.15s' }}></div>

          <div className="hero-stats-row anim-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="hero-stat-item">
              <Calendar size={20} className="stat-icon" />
              <div className="stat-number">27+</div>
              <div className="stat-label">Meetups</div>
            </div>
            <div className="stat-vertical-divider"></div>
            <div className="hero-stat-item">
              <Users size={20} className="stat-icon" />
              <div className="stat-number">2300+</div>
              <div className="stat-label">Members</div>
            </div>
            <div className="stat-vertical-divider"></div>
            <div className="hero-stat-item">
              <UserPlus size={20} className="stat-icon" />
              <div className="stat-number">600+</div>
              <div className="stat-label">Attendees</div>
            </div>
          </div>

          <div className="hero-actions-container anim-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button href="/join" className="hero-join-btn">
              <UserPlus size={24} />
              <span>Join Community</span>
              <ArrowRight size={20} />
            </Button>

            <div className="hero-whatsapp-text">
              <MessageCircle size={18} />
              <span>WhatsApp group for meetup updates</span>
            </div>
          </div>

          <div className="hero-avatars-section anim-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="hero-avatars-row">
              <img src="/images/avatar1.png" alt="Member" className="hero-avatar-circle" />
              <img src="/images/avatar2.png" alt="Member" className="hero-avatar-circle" />
              <img src="/images/avatar3.png" alt="Member" className="hero-avatar-circle" />
              <img src="/images/avatar4.png" alt="Member" className="hero-avatar-circle" />
              <img src="/images/avatar5.png" alt="Member" className="hero-avatar-circle" />
              <img src="/images/avatar6.png" alt="Member" className="hero-avatar-circle" />
              <div className="hero-avatar-count">2.3K+</div>
            </div>
            <p className="hero-avatars-text">
              <strong>2300+</strong> members already joined
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
