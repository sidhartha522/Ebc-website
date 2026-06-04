import { useEffect } from 'react';
import { Clock, ExternalLink, Zap } from 'lucide-react';
import { useJsonData } from '../hooks/useJsonData';
import { useAnimateOnScroll } from '../hooks/useInView';
import Button from '../components/ui/Button';
import './Opportunities.css';

export default function Opportunities() {
  const { data: roles, loading } = useJsonData('opportunities.json');
  useAnimateOnScroll([roles]);

  useEffect(() => {
    document.title = 'Opportunities — Help Build EBC';
  }, []);

  if (loading) return <div className="page-loading"><div className="loader" /></div>;

  const activeRoles = roles?.filter(r => r.active) || [];

  return (
    <main className="opportunities-page">
      <section className="page-hero">
        <div className="page-hero-bg"><div className="page-hero-blob" /></div>
        <div className="container">
          <div className="page-hero-content animate-on-scroll">
            <span className="section-label">
              <Zap size={12} /> Volunteer
            </span>
            <h1>Help Build <span className="text-gradient">EBC</span></h1>
            <p className="page-hero-subtitle">
              Work directly with founders, build practical skills and help grow one of Hyderabad's fastest-growing builder communities.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="roles-grid">
            {activeRoles.map((role, i) => (
              <div key={role.id} className={`role-card glass-card animate-on-scroll delay-${(i % 3) + 1}`}>
                <div className="role-card-header">
                  <h3 className="role-title">{role.role}</h3>
                  <div className="role-time">
                    <Clock size={14} />
                    <span>{role.timeCommitment}</span>
                  </div>
                </div>

                <p className="role-desc">{role.description}</p>

                {role.responsibilities && role.responsibilities.length > 0 && (
                  <div className="role-responsibilities">
                    <h4>What You'll Do</h4>
                    <ul>
                      {role.responsibilities.map((r, j) => (
                        <li key={j}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="role-skills">
                  {role.skills.map((skill, j) => (
                    <span key={j} className="role-skill-tag">{skill}</span>
                  ))}
                </div>

                <div className="role-card-footer">
                  <Button href={role.formLink} size="sm" iconRight={ExternalLink}>
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
