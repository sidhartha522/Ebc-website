import { Quote } from 'lucide-react';
import './Stories.css';

export default function Stories({ stories }) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="stories section" id="stories">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">Success Stories</span>
          <h2>Real People. <span className="text-brand">Real Outcomes.</span></h2>
          <p>Don't just take our word for it — hear from community members who found real value through EBC.</p>
        </div>

        <div className="stories-track">
          <div className="stories-scroll">
            {[...stories, ...stories].map((story, i) => (
              <div key={`${story.id}-${i}`} className="story-card">
                <Quote className="story-quote-icon" size={24} />
                <p className="story-text">{story.story}</p>
                <div className="story-author">
                  <div className="story-avatar">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <div className="story-name">{story.name}</div>
                    <div className="story-designation">{story.designation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
