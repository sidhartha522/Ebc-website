import './WhyJoin.css';

const reasons = [
  {
    id: '01',
    title: 'Find Co-Founders',
    description: 'Meet ambitious builders and startup founders who share your vision and drive.',
    color: 'var(--brand-primary)',
    bg: 'var(--brand-primary-subtle)',
  },
  {
    id: '02',
    title: 'Launch Faster',
    description: 'Get real feedback, early users and the support you need to ship your product.',
    color: 'var(--accent-violet)',
    bg: 'var(--accent-violet-glow)',
  },
  {
    id: '03',
    title: 'Build Relationships',
    description: 'Meet people who genuinely help you grow — not just exchange business cards.',
    color: 'var(--accent-rose)',
    bg: 'var(--accent-rose-glow)',
  },
  {
    id: '04',
    title: 'Learn From Builders',
    description: 'Connect with experienced founders who have been through the journey before you.',
    color: 'var(--accent-amber)',
    bg: 'var(--accent-amber-glow)',
  },
  {
    id: '05',
    title: 'Get Opportunities',
    description: 'Discover internships, freelance projects, partnerships and collaborations.',
    color: 'var(--accent-emerald)',
    bg: 'rgba(16, 185, 129, 0.15)',
  },
  {
    id: '06',
    title: 'Grow Together',
    description: 'Surround yourself with ambitious people who push you to do more and be more.',
    color: 'var(--brand-primary)',
    bg: 'var(--brand-primary-subtle)',
  },
];

export default function WhyJoin() {
  return (
    <section className="why-join section" id="why-join">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">Why EBC</span>
          <h2>Not Just Networking.<br/><span className="text-brand">Real Outcomes.</span></h2>
          <p>Everything we do is designed to create real value for our members — not just another networking event.</p>
        </div>

        <div className="why-grid">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className={`why-card glass-card animate-on-scroll delay-${(i % 3) + 1}`}
            >
              <div className="why-card-number" style={{ color: reason.color }}>
                {reason.id}
              </div>
              <h3 className="why-card-title">{reason.title}</h3>
              <p className="why-card-desc">{reason.description}</p>
              <div className="why-card-glow" style={{ background: reason.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
