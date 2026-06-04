import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Map, ArrowLeft, ExternalLink } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import Button from '../components/ui/Button';
import './EventDetail.css';

export default function EventDetail() {
  const { id } = useParams();
  const { data: events, loading } = useJsonData('events.json');
  const event = events?.find(e => e.id === id);

  useEffect(() => {
    if (event) {
      document.title = `${event.name} — EBC Hyderabad`;
    }
  }, [event]);

  if (loading) return <div className="page-loading"><div className="loader" /></div>;
  if (!event) return (
    <div className="page-not-found">
      <h2>Event not found</h2>
      <Link to="/events">← Back to Events</Link>
    </div>
  );

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="event-detail-page">
      <section className="page-hero">
        <div className="page-hero-bg"><div className="page-hero-blob" /></div>
        <div className="container">
          <Link to="/events" className="back-link">
            <ArrowLeft size={16} /> Back to Events
          </Link>

          <div className="ed-header">
            <div className="ed-status-badge" data-status={event.status}>
              {event.status === 'upcoming' ? '● Upcoming' : '● Past Event'}
            </div>
            <h1 className="ed-title">{event.name}</h1>

            <div className="ed-meta-grid">
              <div className="ed-meta-card">
                <Calendar size={18} className="ed-meta-icon" />
                <div>
                  <div className="ed-meta-label">Date</div>
                  <div className="ed-meta-value">{formatDate(event.date)}</div>
                </div>
              </div>
              <div className="ed-meta-card">
                <Clock size={18} className="ed-meta-icon" />
                <div>
                  <div className="ed-meta-label">Time</div>
                  <div className="ed-meta-value">{event.time}</div>
                </div>
              </div>
              <div className="ed-meta-card">
                <MapPin size={18} className="ed-meta-icon" />
                <div>
                  <div className="ed-meta-label">Venue</div>
                  <div className="ed-meta-value">{event.venue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ed-body">
            <div className="ed-description">
              <h2>About This Event</h2>
              <p>{event.description}</p>
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <div className="ed-speakers">
                <h3>Speakers</h3>
                <div className="ed-speakers-grid">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="ed-speaker-card glass-card">
                      <div className="ed-speaker-avatar">{speaker.name[0]}</div>
                      <div className="ed-speaker-name">{speaker.name}</div>
                      <div className="ed-speaker-role">{speaker.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="ed-actions">
              {event.registrationLink && (
                <Button href={event.registrationLink} size="lg" iconRight={ExternalLink}>
                  Register for This Event
                </Button>
              )}
              {event.mapsLink && (
                <Button href={event.mapsLink} variant="secondary" size="lg" icon={Map}>
                  View on Maps
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
