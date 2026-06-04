import './WhoIsFor.css';

const audiences = [
  { id: '01', title: 'Startup Founders', desc: 'Find co-founders, team members, first users, feedback and investors.', color: 'var(--brand-primary)' },
  { id: '02', title: 'Business Owners', desc: 'Get leads, referrals, partnerships and business connections.', color: 'var(--accent-violet)' },
  { id: '03', title: 'Students', desc: 'Find mentors, startup exposure, internships and learning opportunities.', color: 'var(--accent-rose)' },
  { id: '04', title: 'Working Professionals', desc: 'Discover side projects, startup opportunities and meaningful networking.', color: 'var(--accent-amber)' },
  { id: '05', title: 'Investors', desc: 'Discover promising startups, connect with founders and find deal flow.', color: 'var(--accent-emerald)' },
  { id: '06', title: 'Freelancers', desc: 'Find clients, collaborators, projects and grow your professional network.', color: 'var(--brand-primary)' },
];

export default function WhoIsFor() {
  return (
    <section className="who-is-for section" id="who-is-for">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">For Everyone</span>
          <h2>Who Should Join EBC?</h2>
          <p>Whether you're building, investing, learning or growing — EBC is for you.</p>
        </div>

        <div className="audience-grid">
          {audiences.map((item, i) => (
            <div
              key={i}
              className={`audience-card animate-on-scroll delay-${(i % 3) + 1}`}
            >
              <div className="audience-number" style={{ color: item.color }}>{item.id}</div>
              <h3 className="audience-title">{item.title}</h3>
              <p className="audience-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
