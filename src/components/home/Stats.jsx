import AnimatedCounter from '../ui/AnimatedCounter';
import { Calendar, Users, UserCheck } from 'lucide-react';
import './Stats.css';

export default function Stats({ settings }) {
  const stats = [
    { end: settings?.eventsConducted || 26, suffix: '+', label: 'Events Conducted', icon: Calendar },
    { end: settings?.communityMembers || 2200, suffix: '+', label: 'Community Members', icon: Users },
    { end: settings?.eventAttendees || 600, suffix: '+', label: 'Event Attendees', icon: UserCheck },
  ];

  return (
    <section className="stats section" id="stats">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">Community Impact</span>
          <h2>Built by founders &amp; entrepreneurs.<br/><span className="text-brand">Growing every month.</span></h2>
          <p>
            Over the past few months, EBC has brought together founders, students, business owners and professionals through networking events, startup discussions and community meetups.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className={`animate-on-scroll delay-${i + 1}`}>
              <AnimatedCounter
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
              />
            </div>
          ))}
        </div>

        <div className="stats-tagline animate-on-scroll delay-4">
          <span className="stats-location-badge">📍 Growing Across Hyderabad</span>
          <p>Founders, Students, Business Owners & Professionals</p>
        </div>
      </div>
    </section>
  );
}
