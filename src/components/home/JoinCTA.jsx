import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import './JoinCTA.css';

export default function JoinCTA() {
  return (
    <section className="join-cta section" id="join-cta">
      <div className="join-cta-bg">
        <div className="join-cta-blob join-cta-blob-1" />
        <div className="join-cta-blob join-cta-blob-2" />
      </div>
      <div className="container">
        <div className="join-cta-content animate-on-scroll">
          <Sparkles className="join-cta-sparkle" size={32} />
          <h2 className="join-cta-title">
            Ready To Meet <span className="text-gradient">Builders</span> Around You?
          </h2>
          <p className="join-cta-subtitle">
            Join 2,200+ founders, students, business owners and professionals who are already part of the EBC community.
          </p>
          <Button href="/join" size="xl" iconRight={ArrowRight}>
            Join EBC Now
          </Button>
        </div>
      </div>
    </section>
  );
}
