import { useEffect } from 'react';
import { Target, TrendingUp, Users, Handshake, GraduationCap, Rocket, ArrowUpRight } from 'lucide-react';
import InstagramIcon from '../components/ui/InstagramIcon';
import { useSettings } from '../hooks/useJsonData';
import { useAnimateOnScroll } from '../hooks/useInView';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import Button from '../components/ui/Button';
import './About.css';

const outcomes = [
  { icon: Users, text: 'Founders found co-founders' },
  { icon: GraduationCap, text: 'Students discovered internships' },
  { icon: TrendingUp, text: 'Members met investors' },
  { icon: Handshake, text: 'Businesses built partnerships' },
  { icon: Rocket, text: 'Startups found their first users' },
];

export default function About() {
  useAnimateOnScroll();
  const { data: settings } = useSettings();

  useEffect(() => {
    document.title = 'About — EBC Hyderabad';
  }, []);

  return (
    <main className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg"><div className="page-hero-blob" /></div>
        <div className="container">
          <div className="page-hero-content animate-on-scroll">
            <span className="section-label">About EBC</span>
            <h1>Our <span className="text-gradient">Mission</span></h1>
            <p className="page-hero-subtitle">
              Create Hyderabad's most active builder community for founders, students, business owners and professionals. A space where ambitious people find opportunities, build relationships and grow together.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Stats */}
      <section className="section" id="our-journey">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-label">Our Journey</span>
            <h2>From Zero to <span className="text-brand">Community</span></h2>
            <p>What started as a simple meetup has grown into Hyderabad's most vibrant builder community.</p>
          </div>

          <div className="about-stats-grid">
            <div className="animate-on-scroll delay-1">
              <AnimatedCounter end={settings?.eventsConducted || 26} suffix="+" label="Events Conducted" icon={Target} />
            </div>
            <div className="animate-on-scroll delay-2">
              <AnimatedCounter end={settings?.communityMembers || 2200} suffix="+" label="Community Members" icon={Users} />
            </div>
            <div className="animate-on-scroll delay-3">
              <AnimatedCounter end={settings?.eventAttendees || 600} suffix="+" label="Event Attendees" icon={TrendingUp} />
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section" id="outcomes">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-label">Community Outcomes</span>
            <h2>Real Impact, <span className="text-brand">Real Stories</span></h2>
          </div>

          <div className="outcomes-grid">
            {outcomes.map((item, i) => (
              <div key={i} className={`outcome-card glass-card animate-on-scroll delay-${(i % 3) + 1}`}>
                <item.icon size={24} className="outcome-icon" />
                <span className="outcome-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section" id="founder-about">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-label">The Founder</span>
            <h2>Built By Builders, <span className="text-brand">For Builders</span></h2>
          </div>

          <div className="about-founder-card glass-card animate-on-scroll">
            <div className="about-founder-avatar">
              {(settings?.founderName || 'S')[0]}
            </div>
            <h3 className="about-founder-name">{settings?.founderName || 'Sidhartha Juluri'}</h3>
            <p className="about-founder-role">{settings?.founderRole || 'Founder, EBC'}</p>
            <p className="about-founder-bio">
              {settings?.founderBio || 'Started EBC to help founders, students, business owners and professionals meet the right people, build meaningful relationships and create opportunities together.'}
            </p>
            <a 
              href={settings?.founderInstagramUrl || 'https://instagram.com/sidhartha.juluri'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="about-founder-ig"
            >
              <InstagramIcon size={16} />
              @sidhartha.juluri
            </a>
            <div style={{ marginTop: 'var(--space-5)' }}>
              <Button 
                href={settings?.founderInstagramUrl || 'https://instagram.com/sidhartha.juluri'} 
                variant="outline" 
                size="sm" 
                iconRight={ArrowUpRight}
              >
                Connect With Founder
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
