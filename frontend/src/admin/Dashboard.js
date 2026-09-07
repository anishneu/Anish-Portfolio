import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkSession, fetchAdminContent, logoutAdmin, removeResume, saveSection, uploadResume } from './api';
import { useContent } from '../content/ContentProvider';
import './admin.css';

const TABS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
];

function lines(value) {
  return (value || []).join('\n');
}

function fromLines(value) {
  return String(value || '').split('\n').map((item) => item.trim()).filter(Boolean);
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { refresh } = useContent();
  const [tab, setTab] = useState('about');
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    checkSession().then((authed) => {
      if (!authed) {
        navigate('/admin/otp', { replace: true });
        return;
      }
      fetchAdminContent()
        .then(setContent)
        .catch((err) => setError(err.message));
    });
  }, [navigate]);

  const persist = async (section, payload) => {
    setBusy(true);
    setError('');
    setOk('');
    try {
      const next = await saveSection(section, payload);
      setContent(next);
      await refresh();
      setOk('Saved. The public site will show this on the next load.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!content) {
    return (
      <div className="admin-page">
        <div className="admin-wrap">
          <p>{error || 'Loading admin…'}</p>
          {error ? <Link className="admin-link" to="/">Back to site</Link> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-wrap">
        <header className="admin-head">
          <div>
            <p className="admin-kicker">Owner</p>
            <h1>Content desk</h1>
            <p className="admin-note">Edits go to the API and show on the public site without a redeploy.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link className="admin-link" to="/">View site</Link>
            <button
              type="button"
              className="admin-btn"
              onClick={async () => {
                await logoutAdmin();
                navigate('/');
              }}
            >
              Lock
            </button>
          </div>
        </header>

        <nav className="admin-tabs">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-tab${tab === item.id ? ' is-on' : ''}`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {tab === 'about' ? (
          <AboutForm
            about={content.profile.about}
            busy={busy}
            onSave={(about) => persist('about', { about })}
          />
        ) : null}
        {tab === 'skills' ? (
          <SkillsForm
            groups={content.skillGroups}
            busy={busy}
            onSave={(items) => persist('skills', { items })}
          />
        ) : null}
        {tab === 'experience' ? (
          <ExperienceForm
            items={content.experience}
            busy={busy}
            onSave={(items) => persist('experience', { items })}
          />
        ) : null}
        {tab === 'projects' ? (
          <ProjectsForm
            items={content.projects}
            busy={busy}
            onSave={(items) => persist('projects', { items })}
          />
        ) : null}
        {tab === 'resume' ? (
          <ResumeForm
            resume={content.resume}
            busy={busy}
            setBusy={setBusy}
            setError={setError}
            setOk={setOk}
            setContent={setContent}
            refresh={refresh}
          />
        ) : null}

        <p className="admin-error">{error}</p>
        <p className="admin-ok">{ok}</p>
      </div>
    </div>
  );
}

function AboutForm({ about, busy, onSave }) {
  const [text, setText] = useState(lines(about));
  useEffect(() => setText(lines(about)), [about]);
  return (
    <form
      className="admin-card admin-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(fromLines(text));
      }}
    >
      <label>
        About paragraphs
        <textarea value={text} onChange={(event) => setText(event.target.value)} />
      </label>
      <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>Save about</button>
    </form>
  );
}

function SkillsForm({ groups, busy, onSave }) {
  const [items, setItems] = useState(groups);
  useEffect(() => setItems(groups), [groups]);
  const update = (index, patch) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };
  return (
    <form
      className="admin-card admin-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(items);
      }}
    >
      {items.map((group, index) => (
        <div className="admin-item" key={`${group.title}-${index}`}>
          <div className="admin-item__bar">
            <strong>{group.title || 'Untitled group'}</strong>
            <button type="button" className="admin-btn admin-btn--danger" onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))}>Delete</button>
          </div>
          <label className="admin-field">
            Title
            <input value={group.title} onChange={(event) => update(index, { title: event.target.value })} />
          </label>
          <label className="admin-field">
            Skills (comma separated)
            <input value={(group.items || []).join(', ')} onChange={(event) => update(index, { items: event.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
          </label>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="button" className="admin-btn" onClick={() => setItems((prev) => [...prev, { title: 'New group', items: [] }])}>Add group</button>
        <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>Save skills</button>
      </div>
    </form>
  );
}

function ExperienceForm({ items, busy, onSave }) {
  const [rows, setRows] = useState(items);
  useEffect(() => setRows(items), [items]);
  const update = (index, patch) => setRows((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  return (
    <form
      className="admin-card admin-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(rows);
      }}
    >
      {rows.map((row, index) => (
        <div className="admin-item" key={`${row.title}-${index}`}>
          <div className="admin-item__bar">
            <strong>{row.title || 'Role'}</strong>
            <button type="button" className="admin-btn admin-btn--danger" onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))}>Delete</button>
          </div>
          <label className="admin-field">Title<input value={row.title || ''} onChange={(event) => update(index, { title: event.target.value })} /></label>
          <label className="admin-field">Company<input value={row.company || ''} onChange={(event) => update(index, { company: event.target.value })} /></label>
          <label className="admin-field">Location<input value={row.location || ''} onChange={(event) => update(index, { location: event.target.value })} /></label>
          <label className="admin-field">Dates<input value={row.dates || ''} onChange={(event) => update(index, { dates: event.target.value })} /></label>
          <label className="admin-field">
            Bullets
            <textarea value={lines(row.bullets)} onChange={(event) => update(index, { bullets: fromLines(event.target.value) })} />
          </label>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="button" className="admin-btn" onClick={() => setRows((prev) => [...prev, { title: '', company: '', location: '', dates: '', bullets: [] }])}>Add role</button>
        <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>Save experience</button>
      </div>
    </form>
  );
}

function emptyProject() {
  return {
    id: Date.now(),
    title: 'New project',
    category: 'full-stack',
    featured: false,
    image: '',
    description: '',
    summary: '',
    blurb: [],
    tags: [],
    year: String(new Date().getFullYear()),
    role: 'Full Stack Developer',
    highlights: [],
    liveUrl: '',
    sourceUrl: '',
  };
}

function ProjectsForm({ items, busy, onSave }) {
  const [rows, setRows] = useState(items);
  useEffect(() => setRows(items), [items]);
  const update = (index, patch) => setRows((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const move = (index, dir) => {
    const next = [...rows];
    const swap = index + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[index], next[swap]] = [next[swap], next[index]];
    setRows(next);
  };
  return (
    <form
      className="admin-card admin-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(rows);
      }}
    >
      {rows.map((row, index) => (
        <div className="admin-item" key={row.id || index}>
          <div className="admin-item__bar">
            <strong>{row.title || 'Project'}</strong>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button type="button" className="admin-btn" onClick={() => move(index, -1)}>Up</button>
              <button type="button" className="admin-btn" onClick={() => move(index, 1)}>Down</button>
              <button type="button" className="admin-btn admin-btn--danger" onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))}>Delete</button>
            </div>
          </div>
          <label className="admin-field">Title<input value={row.title || ''} onChange={(event) => update(index, { title: event.target.value })} /></label>
          <label className="admin-field">Category<input value={row.category || ''} onChange={(event) => update(index, { category: event.target.value })} /></label>
          <label className="admin-field">
            Featured
            <select value={row.featured ? 'yes' : 'no'} onChange={(event) => update(index, { featured: event.target.value === 'yes' })}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
          <label className="admin-field">Year<input value={row.year || ''} onChange={(event) => update(index, { year: event.target.value })} /></label>
          <label className="admin-field">Role<input value={row.role || ''} onChange={(event) => update(index, { role: event.target.value })} /></label>
          <label className="admin-field">Image URL<input value={row.image || ''} onChange={(event) => update(index, { image: event.target.value })} /></label>
          <label className="admin-field">Live URL<input value={row.liveUrl || ''} onChange={(event) => update(index, { liveUrl: event.target.value })} /></label>
          <label className="admin-field">Source URL<input value={row.sourceUrl || ''} onChange={(event) => update(index, { sourceUrl: event.target.value })} /></label>
          <label className="admin-field">Summary<input value={row.summary || ''} onChange={(event) => update(index, { summary: event.target.value })} /></label>
          <label className="admin-field">Description<textarea value={row.description || ''} onChange={(event) => update(index, { description: event.target.value })} /></label>
          <label className="admin-field">Blurb<textarea value={lines(row.blurb)} onChange={(event) => update(index, { blurb: fromLines(event.target.value) })} /></label>
          <label className="admin-field">Highlights<textarea value={lines(row.highlights)} onChange={(event) => update(index, { highlights: fromLines(event.target.value) })} /></label>
          <label className="admin-field">Tags<input value={(row.tags || []).join(', ')} onChange={(event) => update(index, { tags: event.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} /></label>
        </div>
      ))}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="button" className="admin-btn" onClick={() => setRows((prev) => [...prev, emptyProject()])}>Add project</button>
        <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>Save projects</button>
      </div>
    </form>
  );
}

function ResumeForm({ resume, busy, setBusy, setError, setOk, setContent, refresh }) {
  const [file, setFile] = useState(null);
  return (
    <div className="admin-card admin-stack">
      <p>Current file: {resume?.file || 'bundled public PDF (no upload yet)'}</p>
      <input type="file" accept="application/pdf" onChange={(event) => setFile(event.target.files?.[0] || null)} />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          disabled={busy || !file}
          onClick={async () => {
            setBusy(true);
            setError('');
            setOk('');
            try {
              const next = await uploadResume(file);
              setContent(next);
              await refresh();
              setOk('Resume replaced. Download Resume now uses this file.');
              setFile(null);
            } catch (err) {
              setError(err.message);
            } finally {
              setBusy(false);
            }
          }}
        >
          Upload PDF
        </button>
        <button
          type="button"
          className="admin-btn admin-btn--danger"
          disabled={busy || !resume?.available}
          onClick={async () => {
            setBusy(true);
            setError('');
            setOk('');
            try {
              const next = await removeResume();
              setContent(next);
              await refresh();
              setOk('Uploaded resume removed. The site falls back to the bundled PDF.');
            } catch (err) {
              setError(err.message);
            } finally {
              setBusy(false);
            }
          }}
        >
          Remove upload
        </button>
      </div>
    </div>
  );
}
