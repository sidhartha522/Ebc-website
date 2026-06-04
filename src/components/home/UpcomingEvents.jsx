import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import './UpcomingEvents.css';

export default function UpcomingEvents({ events }) {
  if (!events || events.length === 0) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  const getMonth = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase();
  };

  return (
    <section className="upcoming-events section" id="upcoming-events">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">Upcoming Events</span>
          <h2>Don't Miss <span className="text-brand">What's Next</span></h2>
          <p>Join our upcoming events and meet builders in person. Every event is designed to create real connections.</p>
        </div>

        <div className="events-grid">
          {events.map((event, i) => (
            <div key={event.id} className={`event-card glass-card animate-on-scroll delay-${i + 1}`}>
              <div className="event-date-badge">
                <span className="event-date-day">{getDay(event.date)}</span>
                <span className="event-date-month">{getMonth(event.date)}</span>
              </div>

              <div className="event-card-body">
                <h3 className="event-card-title">{event.name}</h3>
                
                <div className="event-meta">
                  <div className="event-meta-item">
                    <Calendar size={14} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="event-meta-item">
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-meta-item">
                    <MapPin size={14} />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <p className="event-card-desc">{event.description.slice(0, 120)}...</p>

                <div className="event-card-actions">
                  {event.registrationLink && (
                    <Button href={event.registrationLink} size="sm">
                      Register Now
                    </Button>
                  )}
                  <Link to={`/events/${event.id}`} className="event-detail-link">
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="events-cta animate-on-scroll">
          <Button href="/events" variant="outline" iconRight={ArrowRight}>
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
