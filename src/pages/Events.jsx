import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { useAnimateOnScroll } from '../hooks/useInView';
import Button from '../components/ui/Button';
import EventGallery from '../components/events/EventGallery';
import './Events.css';

export default function Events() {
  const { data: events, loading } = useJsonData('events.json');
  useAnimateOnScroll([events]);

  useEffect(() => {
    document.title = 'Events — EBC Hyderabad';
  }, []);

  const upcomingEvents = events?.filter(e => e.status === 'upcoming') || [];
  const pastEvents = events?.filter(e => e.status === 'past') || [];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getDay = (d) => new Date(d).getDate();
  const getMonth = (d) => new Date(d).toLocaleDateString('en-IN', { month: 'short' }).toUpperCase();

  if (loading) {
    return <div className="page-loading"><div className="loader" /></div>;
  }

  return (
    <main className="events-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <div className="page-hero-blob" />
        </div>
        <div className="container">
          <div className="page-hero-content animate-on-scroll">
            <span className="section-label">Events</span>
            <h1>Where <span className="text-gradient">Builders</span> Meet</h1>
            <p className="page-hero-subtitle">
              From networking nights to startup showcases — every EBC event is designed to help you build real connections and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="events-section-title animate-on-scroll">
              <span className="dot dot-green" /> Upcoming Events
            </h2>
            <div className="events-list">
              {upcomingEvents.map((event, i) => (
                <div key={event.id} className={`event-row glass-card animate-on-scroll delay-${(i % 3) + 1}`}>
                  <div className="event-row-date">
                    <span className="event-row-day">{getDay(event.date)}</span>
                    <span className="event-row-month">{getMonth(event.date)}</span>
                  </div>
                  <div className="event-row-content">
                    <h3 className="event-row-title">{event.name}</h3>
                    <div className="event-row-meta">
                      <span><Calendar size={13} /> {formatDate(event.date)}</span>
                      <span><Clock size={13} /> {event.time}</span>
                      <span><MapPin size={13} /> {event.venue}</span>
                    </div>
                    <p className="event-row-desc">{event.description}</p>
                  </div>
                  <div className="event-row-actions">
                    {event.registrationLink && (
                      <Button href={event.registrationLink} size="sm">Register</Button>
                    )}
                    <Link to={`/events/${event.id}`} className="event-detail-link">
                      Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="events-section-title animate-on-scroll">
              <span className="dot dot-gray" /> Past Events
            </h2>
            <div className="events-list">
              {pastEvents.map((event, i) => (
                <div key={event.id} className={`event-row glass-card event-row-past animate-on-scroll delay-${(i % 3) + 1}`}>
                  <div className="event-row-date">
                    <span className="event-row-day">{getDay(event.date)}</span>
                    <span className="event-row-month">{getMonth(event.date)}</span>
                  </div>
                  <div className="event-row-content">
                    <h3 className="event-row-title">{event.name}</h3>
                    <div className="event-row-meta">
                      <span><Calendar size={13} /> {formatDate(event.date)}</span>
                      <span><MapPin size={13} /> {event.venue}</span>
                    </div>
                    <p className="event-row-desc">{event.description}</p>
                  </div>
                  <div className="event-row-actions">
                    <Link to={`/events/${event.id}`} className="event-detail-link">
                      View Recap <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Community in Action Gallery */}
      <EventGallery />
    </main>
  );
}
