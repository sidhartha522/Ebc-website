import { useEffect } from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { useAnimateOnScroll } from '../hooks/useInView';
import Button from '../components/ui/Button';
import './JoinCommunity.css';

export default function JoinCommunity() {
  useAnimateOnScroll();
  const { data: groups } = useJsonData('whatsapp-groups.json');

  useEffect(() => {
    document.title = 'Join Community — EBC Hyderabad';
  }, []);

  const activeGroups = groups?.filter(g => g.active) || [];

  return (
    <main className="join-page">
      <div className="page-hero-bg">
        <div className="page-hero-blob" />
      </div>
      <section className="section">
        <div className="container">
          <div className="wa-groups animate-on-scroll">
            <h1 className="wa-groups-page-title">
              <MessageCircle size={32} /> Join WhatsApp Communities
            </h1>
            <p className="wa-groups-subtitle">
              Select your local area and join the whatsapp community to stay updated with the meetups near you.
            </p>

            {activeGroups.length > 0 ? (
              <div className="wa-groups-grid">
                {activeGroups.map((group) => (
                  <div key={group.id} className="wa-group-card glass-card">
                    <h4 className="wa-group-name">{group.name}</h4>
                    <p className="wa-group-area">📍 {group.area}</p>
                    <p className="wa-group-desc">{group.description}</p>
                    <Button href={group.whatsappLink} size="sm" iconRight={ExternalLink}>
                      Join Group
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No WhatsApp groups available.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

