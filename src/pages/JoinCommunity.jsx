import { useState, useEffect } from 'react';
import { Send, MessageCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { useAnimateOnScroll } from '../hooks/useInView';
import Button from '../components/ui/Button';
import './JoinCommunity.css';

export default function JoinCommunity() {
  useAnimateOnScroll();
  const { data: groups } = useJsonData('whatsapp-groups.json');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', profession: '', area: '',
    whyJoin: '', expectations: '', contribute: '',
    linkedin: '', instagram: '', company: '', website: '',
  });

  useEffect(() => {
    document.title = 'Join Community — EBC Hyderabad';
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeGroups = groups?.filter(g => g.active) || [];

  return (
    <main className="join-page">
      <section className="page-hero">
        <div className="page-hero-bg"><div className="page-hero-blob" /></div>
        <div className="container">
          <div className="page-hero-content animate-on-scroll">
            <span className="section-label">Join Us</span>
            <h1>Become Part of <span className="text-gradient">EBC</span></h1>
            <p className="page-hero-subtitle">
              Fill out the form below to join Hyderabad's most active builder community. Connect with founders, students, and professionals who are building something meaningful.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {submitted ? (
            <div className="join-success animate-on-scroll">
              <div className="join-success-card glass-card">
                <CheckCircle size={48} className="join-success-icon" />
                <h2>Welcome to EBC! 🎉</h2>
                <p>Thank you for joining. Now join our WhatsApp communities to stay connected with builders in your area.</p>
              </div>

              {activeGroups.length > 0 && (
                <div className="wa-groups">
                  <h3 className="wa-groups-title">
                    <MessageCircle size={20} /> Join WhatsApp Communities
                  </h3>
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
                </div>
              )}
            </div>
          ) : (
            <div className="join-form-wrapper animate-on-scroll">
              <form className="join-form glass-card" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3 className="form-section-title">Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input type="text" name="fullName" className="form-input" value={formData.fullName} onChange={handleChange} required placeholder="Your full name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Profession *</label>
                      <select name="profession" className="form-input form-select" value={formData.profession} onChange={handleChange} required>
                        <option value="">Select your profession</option>
                        <option value="Startup Founder">Startup Founder</option>
                        <option value="Business Owner">Business Owner</option>
                        <option value="Student">Student</option>
                        <option value="Working Professional">Working Professional</option>
                        <option value="Investor">Investor</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group form-group-full">
                      <label className="form-label">Area / Location *</label>
                      <input type="text" name="area" className="form-input" value={formData.area} onChange={handleChange} required placeholder="e.g., Dilsukhnagar, Hyderabad" />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">About You</h3>
                  <div className="form-grid">
                    <div className="form-group form-group-full">
                      <label className="form-label">Why do you want to join EBC? *</label>
                      <textarea name="whyJoin" className="form-input form-textarea" value={formData.whyJoin} onChange={handleChange} required placeholder="Tell us what brings you here..." rows={3} />
                    </div>
                    <div className="form-group form-group-full">
                      <label className="form-label">What are you expecting from EBC? *</label>
                      <textarea name="expectations" className="form-input form-textarea" value={formData.expectations} onChange={handleChange} required placeholder="What outcomes are you looking for..." rows={3} />
                    </div>
                    <div className="form-group form-group-full">
                      <label className="form-label">How can you contribute? *</label>
                      <textarea name="contribute" className="form-input form-textarea" value={formData.contribute} onChange={handleChange} required placeholder="What skills or value can you bring..." rows={3} />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Social & Company <span className="form-optional">(Optional)</span></h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">LinkedIn URL</label>
                      <input type="url" name="linkedin" className="form-input" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Instagram URL</label>
                      <input type="url" name="instagram" className="form-input" value={formData.instagram} onChange={handleChange} placeholder="https://instagram.com/..." />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company / Startup Name</label>
                      <input type="text" name="company" className="form-input" value={formData.company} onChange={handleChange} placeholder="Your company name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Website</label>
                      <input type="url" name="website" className="form-input" value={formData.website} onChange={handleChange} placeholder="https://..." />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <Button type="submit" size="lg" icon={Send} fullWidth>
                    Submit & Join EBC
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
