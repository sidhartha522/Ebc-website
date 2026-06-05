import { ArrowUpRight } from 'lucide-react';
import InstagramIcon from '../ui/InstagramIcon';
import Button from '../ui/Button';
import './Founder.css';

export default function Founder({ settings }) {
  return (
    <section className="founder section" id="founder">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">The Founder</span>
          <h2>Built By Founders &amp; Entrepreneurs,<br/><span className="text-brand">For Visionaries</span></h2>
        </div>

        <div className="founder-card animate-on-scroll">
          <div className="founder-card-inner">
            <div className="founder-avatar">
              <div className="founder-avatar-placeholder">
                {(settings?.founderName || 'S')[0]}
              </div>
              <div className="founder-avatar-ring" />
            </div>

            <div className="founder-info">
              <h3 className="founder-name">{settings?.founderName || 'Sidhartha Juluri'}</h3>
              <p className="founder-role">{settings?.founderRole || 'Founder, EBC'}</p>
              <p className="founder-bio">
                {settings?.founderBio || 'Started EBC to help founders, students, business owners and professionals meet the right people, build meaningful relationships and create opportunities together.'}
              </p>

              <div className="founder-social">
                <a 
                  href={settings?.founderInstagramUrl || 'https://instagram.com/sidhartha.juluri'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="founder-ig-link"
                >
                  <InstagramIcon size={16} />
                  <span>@sidhartha.juluri</span>
                </a>
              </div>

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
      </div>
    </section>
  );
}
