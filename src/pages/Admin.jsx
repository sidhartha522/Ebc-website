import { useState, useEffect } from 'react';
import {
  Calendar, MessageSquare, Users, Briefcase, Settings, LogOut,
  Plus, Trash2, Edit3, Save, X, Star, Download,
  CheckCircle, AlertCircle, Loader
} from 'lucide-react';
import { useJsonData, useSettings } from '../hooks/useJsonData';
import './Admin.css';

const ADMIN_PASS = 'ebc-admin-2026';

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [err, setErr] = useState('');

  useEffect(() => {
    document.title = 'Admin — EBC';
    if (localStorage.getItem('ebc_admin_auth') === 'true') setAuth(true);
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASS) { setAuth(true); localStorage.setItem('ebc_admin_auth', 'true'); setErr(''); }
    else setErr('Invalid password');
  };

  if (!auth) return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo"><Star size={24} fill="currentColor" /></div>
        <h2>EBC Admin</h2>
        <p>Enter password to access the admin panel.</p>
        <form onSubmit={login} className="admin-login-form">
          <input type="password" className="form-input" value={pw} onChange={e => setPw(e.target.value)} placeholder="Admin password" autoFocus />
          {err && <p className="admin-error">{err}</p>}
          <button type="submit" className="btn btn-primary btn-md btn-full">Login</button>
        </form>
      </div>
    </main>
  );

  const tabs = [
    { id: 'dashboard',     label: 'Dashboard',    icon: Settings  },
    { id: 'events',        label: 'Events',        icon: Calendar  },
    { id: 'stories',       label: 'Stories',       icon: MessageSquare },
    { id: 'groups',        label: 'Groups',        icon: Users     },
    { id: 'opportunities', label: 'Roles',         icon: Briefcase },
    { id: 'settings',      label: 'Settings',      icon: Settings  },
    { id: 'export',        label: 'Export',        icon: Download  },
  ];

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Star size={20} fill="currentColor" className="text-brand" />
          <span>EBC Admin</span>
        </div>
        <nav className="admin-nav">
          {tabs.map(t => (
            <button key={t.id} className={`admin-nav-item ${tab === t.id ? 'admin-nav-active' : ''}`} onClick={() => setTab(t.id)}>
              <t.icon size={18} /><span>{t.label}</span>
            </button>
          ))}
        </nav>
        <button className="admin-logout" onClick={() => { setAuth(false); localStorage.removeItem('ebc_admin_auth'); }}>
          <LogOut size={18} /><span>Logout</span>
        </button>
      </aside>

      <div className="admin-content">
        {tab === 'dashboard'     && <Dashboard />}
        {tab === 'events'        && <CRUD filename="events.json" label="Event" fields={[
          { key: 'name',             label: 'Event Name',        type: 'text'     },
          { key: 'description',      label: 'Description',       type: 'textarea' },
          { key: 'date',             label: 'Date',              type: 'date'     },
          { key: 'time',             label: 'Time',              type: 'text'     },
          { key: 'venue',            label: 'Venue',             type: 'text'     },
          { key: 'mapsLink',         label: 'Maps Link',         type: 'url'      },
          { key: 'registrationLink', label: 'Registration Link', type: 'url'      },
          { key: 'status',           label: 'Status',            type: 'select', options: ['upcoming', 'past'] },
        ]} />}
        {tab === 'stories'       && <CRUD filename="stories.json" label="Story" fields={[
          { key: 'name',        label: 'Name',        type: 'text'     },
          { key: 'designation', label: 'Designation', type: 'text'     },
          { key: 'story',       label: 'Story',       type: 'textarea' },
        ]} />}
        {tab === 'groups'        && <CRUD filename="whatsapp-groups.json" label="Group" fields={[
          { key: 'name',         label: 'Group Name',    type: 'text'     },
          { key: 'area',         label: 'Area',          type: 'text'     },
          { key: 'description',  label: 'Description',   type: 'textarea' },
          { key: 'whatsappLink', label: 'WhatsApp Link', type: 'url'      },
          { key: 'active',       label: 'Active',        type: 'checkbox' },
        ]} />}
        {tab === 'opportunities' && <CRUD filename="opportunities.json" label="Role" fields={[
          { key: 'role',           label: 'Role Name',             type: 'text'     },
          { key: 'description',    label: 'Description',           type: 'textarea' },
          { key: 'timeCommitment', label: 'Time Commitment',       type: 'text'     },
          { key: 'skills',         label: 'Skills (comma separated)', type: 'text'  },
          { key: 'formLink',       label: 'Form Link',             type: 'url'      },
          { key: 'active',         label: 'Active',                type: 'checkbox' },
        ]} />}
        {tab === 'settings' && <SiteSettings />}
        {tab === 'export'   && <ExportFiles />}
      </div>
    </main>
  );
}

/* ── Dashboard ───────────────────────────────────────────────── */
function Dashboard() {
  const { data: e } = useJsonData('events.json');
  const { data: s } = useJsonData('stories.json');
  const { data: g } = useJsonData('whatsapp-groups.json');
  const { data: r } = useJsonData('opportunities.json');

  const stats = [
    { label: 'Events',  value: e?.length || 0, icon: Calendar     },
    { label: 'Stories', value: s?.length || 0, icon: MessageSquare },
    { label: 'Groups',  value: g?.length || 0, icon: Users         },
    { label: 'Roles',   value: r?.length || 0, icon: Briefcase     },
  ];

  return (
    <div>
      <h2 className="admin-page-title">Dashboard</h2>
      <div className="admin-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="admin-stat-card">
            <s.icon size={24} className="admin-stat-icon" />
            <div className="admin-stat-value">{s.value}</div>
            <div className="admin-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="admin-dashboard-tip">
        <CheckCircle size={16} />
        <span>Changes you make here are saved directly to the JSON files — permanent after every save, visible to all users instantly.</span>
      </div>
    </div>
  );
}

/* ── CRUD ────────────────────────────────────────────────────── */
function CRUD({ filename, label, fields }) {
  const { data, saveData, saving, saveError } = useJsonData(filename);
  const [editId, setEditId]   = useState(null);
  const [form, setForm]       = useState({});
  const [adding, setAdding]   = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const items = data || [];

  const startAdd = () => {
    const blank = { id: `${Date.now()}` };
    fields.forEach(f => { blank[f.key] = f.type === 'checkbox' ? true : ''; });
    setForm(blank); setAdding(true); setEditId(null);
  };

  const startEdit = (item) => {
    setForm({ ...item, skills: Array.isArray(item.skills) ? item.skills.join(', ') : item.skills || '' });
    setEditId(item.id); setAdding(false);
  };

  const save = async () => {
    let p = { ...form };
    if (typeof p.skills === 'string') p.skills = p.skills.split(',').map(s => s.trim()).filter(Boolean);
    await saveData(adding ? [...items, p] : items.map(i => i.id === editId ? p : i));
    setEditId(null); setAdding(false); setForm({});
    setJustSaved(true); setTimeout(() => setJustSaved(false), 2500);
  };

  const del = (id) => { if (window.confirm('Delete this item?')) saveData(items.filter(i => i.id !== id)); };

  return (
    <div className="admin-crud">
      <div className="admin-crud-header">
        <h2 className="admin-page-title">{label}s</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <SaveStatus saving={saving} saved={justSaved} error={saveError} />
          <button className="btn btn-primary btn-sm" onClick={startAdd}><Plus size={16} /> Add</button>
        </div>
      </div>

      {(adding || editId) && (
        <div className="admin-edit-form">
          <h3>{adding ? `Add ${label}` : `Edit ${label}`}</h3>
          <div className="admin-form-grid">
            {fields.map(f => (
              <div key={f.key} className={`form-group ${f.type === 'textarea' ? 'form-group-full' : ''}`}>
                <label className="form-label">{f.label}</label>
                {f.type === 'textarea'
                  ? <textarea className="form-input form-textarea" rows={3} value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                  : f.type === 'select'
                  ? <select className="form-input form-select" value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })}>
                      <option value="">Select</option>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  : f.type === 'checkbox'
                  ? <label className="admin-checkbox">
                      <input type="checkbox" checked={form[f.key] || false} onChange={e => setForm({ ...form, [f.key]: e.target.checked })} />
                      <span>Enabled</span>
                    </label>
                  : <input type={f.type} className="form-input" value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                }
              </div>
            ))}
          </div>
          <div className="admin-form-actions">
            <button className="btn btn-primary btn-sm" onClick={save} disabled={saving}>
              {saving ? <><Loader size={14} className="spin" /> Saving...</> : <><Save size={16} /> Save</>}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setEditId(null); setAdding(false); }}>
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="admin-items-list">
        {items.map(item => (
          <div key={item.id} className="admin-item-row">
            <div className="admin-item-info">
              <div className="admin-item-title">{item.name || item.role || item.id}</div>
              <div className="admin-item-sub">{item.date || item.area || item.designation || ''}</div>
            </div>
            <div className="admin-item-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => startEdit(item)}><Edit3 size={16} /></button>
              <button className="btn btn-ghost btn-sm admin-delete-btn" onClick={() => del(item.id)}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="admin-empty">No {label.toLowerCase()}s yet.</p>}
      </div>
    </div>
  );
}

/* ── Site Settings ───────────────────────────────────────────── */
function SiteSettings() {
  const { data: settings, saveData, saving, saveError } = useSettings();
  const [form, setForm]       = useState({});
  const [justSaved, setJustSaved] = useState(false);
  useEffect(() => { if (settings) setForm(settings); }, [settings]);

  const fields = [
    { key: 'eventsConducted',  label: 'Events Conducted',   type: 'number' },
    { key: 'communityMembers', label: 'Community Members',  type: 'number' },
    { key: 'eventAttendees',   label: 'Event Attendees',    type: 'number' },
    { key: 'partnerships',     label: 'Partnerships',       type: 'number' },
    { key: 'startupsLaunched', label: 'Startups Launched',  type: 'number' },
    { key: 'internshipsCreated', label: 'Internships Created', type: 'number' },
    { key: 'instagramUrl',       label: 'Instagram URL',    type: 'url'    },
    { key: 'founderInstagramUrl', label: 'Founder Instagram', type: 'url' },
    { key: 'founderName',        label: 'Founder Name',     type: 'text'   },
    { key: 'founderRole',        label: 'Founder Role',     type: 'text'   },
    { key: 'founderBio',         label: 'Founder Bio',      type: 'textarea' },
  ];

  const handleSave = async () => {
    await saveData(form);
    setJustSaved(true); setTimeout(() => setJustSaved(false), 2500);
  };

  return (
    <div>
      <h2 className="admin-page-title">Site Settings</h2>
      <div className="admin-edit-form">
        <div className="admin-form-grid">
          {fields.map(f => (
            <div key={f.key} className={`form-group ${f.type === 'textarea' ? 'form-group-full' : ''}`}>
              <label className="form-label">{f.label}</label>
              {f.type === 'textarea'
                ? <textarea className="form-input form-textarea" rows={3} value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                : <input type={f.type} className="form-input" value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value })} />
              }
            </div>
          ))}
        </div>
        <div className="admin-form-actions">
          <button className="btn btn-primary btn-md" onClick={handleSave} disabled={saving}>
            {saving ? <><Loader size={14} className="spin" /> Saving...</> : <><Save size={16} /> Save Settings</>}
          </button>
          <SaveStatus saving={saving} saved={justSaved} error={saveError} />
        </div>
      </div>
    </div>
  );
}

/* ── Export Files ────────────────────────────────────────────── */
function ExportFiles() {
  const { data: events }        = useJsonData('events.json');
  const { data: stories }       = useJsonData('stories.json');
  const { data: groups }        = useJsonData('whatsapp-groups.json');
  const { data: opportunities } = useJsonData('opportunities.json');
  const { data: settings }      = useJsonData('settings.json');
  const [done, setDone] = useState(null);

  const allData = {
    'events.json': events,
    'stories.json': stories,
    'whatsapp-groups.json': groups,
    'opportunities.json': opportunities,
    'settings.json': settings,
  };

  const download = (filename, data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: filename });
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    setDone(filename); setTimeout(() => setDone(null), 2000);
  };

  return (
    <div className="admin-export">
      <h2 className="admin-page-title">Export Files</h2>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-dim)', marginBottom: 'var(--space-6)' }}>
        Download current JSON files as a backup or to move to a different server.
      </p>
      <div className="export-files-grid">
        {Object.entries(allData).map(([filename, data]) => (
          <div key={filename} className="export-file-card">
            <div className="export-file-header">
              <div>
                <div className="export-file-name">{filename}</div>
                <div className="export-file-count">
                  {Array.isArray(data) ? `${data?.length || 0} items` : 'Settings object'}
                </div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => download(filename, data)} disabled={!data}>
                {done === filename ? <><CheckCircle size={14} /> Done!</> : <><Download size={14} /> Download</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Save Status ─────────────────────────────────────────────── */
function SaveStatus({ saving, saved, error }) {
  if (saving) return <span className="admin-save-status admin-save-status-saving"><Loader size={13} className="spin" /> Saving...</span>;
  if (error)  return <span className="admin-save-status admin-save-status-error" title={error}><AlertCircle size={13} /> Save failed</span>;
  if (saved)  return <span className="admin-save-status admin-save-status-ok"><CheckCircle size={13} /> Saved ✓</span>;
  return null;
}
