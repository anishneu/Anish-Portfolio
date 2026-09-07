import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddRounded from '@mui/icons-material/AddRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import LockOutlined from '@mui/icons-material/LockOutlined';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import SaveRounded from '@mui/icons-material/SaveRounded';
import UploadFileRounded from '@mui/icons-material/UploadFileRounded';
import { checkSession, fetchAdminContent, logoutAdmin, removeResume, saveSection, uploadResume } from './api';
import { useContent } from '../content/ContentProvider';
import './admin.css';

const TABS = [
  { id: 'about', label: 'About', blurb: 'Public intro copy on the About tab.' },
  { id: 'skills', label: 'Skills', blurb: 'Skill groups shown in the Skills constellation.' },
  { id: 'experience', label: 'Experience', blurb: 'Roles on the Experience timeline.' },
  { id: 'projects', label: 'Projects', blurb: 'Cards, order, and featured work.' },
  { id: 'resume', label: 'Resume', blurb: 'PDF used by Download Resume.' },
];

function lines(value) {
  return (value || []).join('\n');
}

function fromLines(value) {
  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function pad(index) {
  return String(index + 1).padStart(2, '0');
}

function tabCount(id, content) {
  if (id === 'about') return content.profile?.about?.length || 0;
  if (id === 'skills') return content.skillGroups?.length || 0;
  if (id === 'experience') return content.experience?.length || 0;
  if (id === 'projects') return content.projects?.length || 0;
  return content.resume?.available ? 1 : 0;
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
      setOk('Saved. The public site will pick this up on the next load.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const current = TABS.find((item) => item.id === tab) || TABS[0];

  if (!content) {
    return (
      <div className="admin-page">
        <div className="admin-shell">
          <aside className="admin-rail">
            <p className="admin-kicker">Owner</p>
            <h1>Content desk</h1>
          </aside>
          <main className="admin-main">
            <p className={error ? 'admin-error' : 'admin-empty'}>{error || 'Loading desk…'}</p>
            {error ? <Link className="admin-link" to="/">View site</Link> : null}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <aside className="admin-rail">
          <p className="admin-kicker">Owner</p>
          <h1>Content desk</h1>
          <p className="admin-rail__note">Live writes to the API. Visitors see the change on the next load.</p>
          <nav className="admin-nav" aria-label="Content sections">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-tab${tab === item.id ? ' is-on' : ''}`}
                onClick={() => {
                  setTab(item.id);
                  setError('');
                  setOk('');
                }}
              >
                <span>{item.label}</span>
                <span className="admin-tab__count">{tabCount(item.id, content)}</span>
              </button>
            ))}
          </nav>
          <div className="admin-rail__foot">
            <Link className="admin-link" to="/">
              <OpenInNewRounded fontSize="inherit" /> View site
            </Link>
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={async () => {
                await logoutAdmin();
                navigate('/');
              }}
            >
              <LockOutlined fontSize="inherit" /> Lock
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-main__head">
            <div>
              <p className="admin-kicker">{pad(TABS.findIndex((item) => item.id === tab))} / {current.label}</p>
              <h2>{current.label}</h2>
              <p>{current.blurb}</p>
            </div>
            <div className="admin-status" role="status">
              {error ? <p className="admin-error">{error}</p> : null}
              {ok ? <p className="admin-ok">{ok}</p> : null}
            </div>
          </header>

          {tab === 'about' ? (
            <AboutForm about={content.profile.about} busy={busy} onSave={(about) => persist('about', { about })} />
          ) : null}
          {tab === 'skills' ? (
            <SkillsForm groups={content.skillGroups} busy={busy} onSave={(items) => persist('skills', { items })} />
          ) : null}
          {tab === 'experience' ? (
            <ExperienceForm items={content.experience} busy={busy} onSave={(items) => persist('experience', { items })} />
          ) : null}
          {tab === 'projects' ? (
            <ProjectsForm items={content.projects} busy={busy} onSave={(items) => persist('projects', { items })} />
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
        </main>
      </div>
    </div>
  );
}

function IconButton({ label, danger, onClick }) {
  return (
    <button
      type="button"
      className={`admin-btn admin-btn--icon${danger ? ' admin-btn--danger' : ' admin-btn--ghost'}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {label === 'Move up' ? <KeyboardArrowUpRounded fontSize="inherit" /> : null}
      {label === 'Move down' ? <KeyboardArrowDownRounded fontSize="inherit" /> : null}
      {label === 'Delete' ? <DeleteOutlineRounded fontSize="inherit" /> : null}
    </button>
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
      <label className="admin-field">
        Paragraphs
        <textarea value={text} onChange={(event) => setText(event.target.value)} />
      </label>
      <div className="admin-toolbar">
        <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>
          <SaveRounded fontSize="inherit" /> {busy ? 'Saving' : 'Save about'}
        </button>
      </div>
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
      className="admin-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(items);
      }}
    >
      {items.map((group, index) => (
        <div className="admin-item" key={`${group.title}-${index}`}>
          <div className="admin-item__bar">
            <div className="admin-item__meta">
              <span>{pad(index)}</span>
              <strong>{group.title || 'Untitled group'}</strong>
              <span className="admin-chip">{(group.items || []).length} skills</span>
            </div>
            <IconButton label="Delete" danger onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))} />
          </div>
          <div className="admin-grid admin-grid--skills">
            <label className="admin-field">
              Title
              <input value={group.title} onChange={(event) => update(index, { title: event.target.value })} />
            </label>
            <label className="admin-field">
              Skills
              <input
                value={(group.items || []).join(', ')}
                onChange={(event) =>
                  update(index, {
                    items: event.target.value
                      .split(',')
                      .map((skill) => skill.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
          </div>
        </div>
      ))}
      <div className="admin-toolbar">
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={() => setItems((prev) => [...prev, { title: 'New group', items: [] }])}
        >
          <AddRounded fontSize="inherit" /> Add group
        </button>
        <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>
          <SaveRounded fontSize="inherit" /> {busy ? 'Saving' : 'Save skills'}
        </button>
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
      className="admin-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(rows);
      }}
    >
      {rows.map((row, index) => (
        <div className="admin-item" key={`${row.title}-${index}`}>
          <div className="admin-item__bar">
            <div className="admin-item__meta">
              <span>{pad(index)}</span>
              <strong>{row.title || 'Role'}</strong>
            </div>
            <IconButton label="Delete" danger onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))} />
          </div>
          <div className="admin-grid">
            <label className="admin-field">
              Title
              <input value={row.title || ''} onChange={(event) => update(index, { title: event.target.value })} />
            </label>
            <label className="admin-field">
              Company
              <input value={row.company || ''} onChange={(event) => update(index, { company: event.target.value })} />
            </label>
            <label className="admin-field">
              Location
              <input value={row.location || ''} onChange={(event) => update(index, { location: event.target.value })} />
            </label>
            <label className="admin-field">
              Dates
              <input value={row.dates || ''} onChange={(event) => update(index, { dates: event.target.value })} />
            </label>
            <label className="admin-field admin-field--wide">
              Bullets
              <textarea value={lines(row.bullets)} onChange={(event) => update(index, { bullets: fromLines(event.target.value) })} />
            </label>
          </div>
        </div>
      ))}
      <div className="admin-toolbar">
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={() => setRows((prev) => [...prev, { title: '', company: '', location: '', dates: '', bullets: [] }])}
        >
          <AddRounded fontSize="inherit" /> Add role
        </button>
        <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>
          <SaveRounded fontSize="inherit" /> {busy ? 'Saving' : 'Save experience'}
        </button>
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
      className="admin-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(rows);
      }}
    >
      {rows.map((row, index) => (
        <div className="admin-item" key={row.id || index}>
          <div className="admin-item__bar">
            <div className="admin-item__meta">
              <span>{pad(index)}</span>
              <strong>{row.title || 'Project'}</strong>
              {row.featured ? <span className="admin-chip">Featured</span> : null}
            </div>
            <div style={{ display: 'flex', gap: '0.28rem' }}>
              <IconButton label="Move up" onClick={() => move(index, -1)} />
              <IconButton label="Move down" onClick={() => move(index, 1)} />
              <IconButton label="Delete" danger onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))} />
            </div>
          </div>
          <div className="admin-grid">
            <label className="admin-field">
              Title
              <input value={row.title || ''} onChange={(event) => update(index, { title: event.target.value })} />
            </label>
            <label className="admin-field">
              Category
              <input value={row.category || ''} onChange={(event) => update(index, { category: event.target.value })} />
            </label>
            <label className="admin-field">
              Year
              <input value={row.year || ''} onChange={(event) => update(index, { year: event.target.value })} />
            </label>
            <label className="admin-field">
              Role
              <input value={row.role || ''} onChange={(event) => update(index, { role: event.target.value })} />
            </label>
            <label className="admin-field">
              Featured
              <select value={row.featured ? 'yes' : 'no'} onChange={(event) => update(index, { featured: event.target.value === 'yes' })}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
            <label className="admin-field">
              Image URL
              <input value={row.image || ''} onChange={(event) => update(index, { image: event.target.value })} />
            </label>
            <label className="admin-field">
              Live URL
              <input value={row.liveUrl || ''} onChange={(event) => update(index, { liveUrl: event.target.value })} />
            </label>
            <label className="admin-field">
              Source URL
              <input value={row.sourceUrl || ''} onChange={(event) => update(index, { sourceUrl: event.target.value })} />
            </label>
            <label className="admin-field admin-field--wide">
              Summary
              <input value={row.summary || ''} onChange={(event) => update(index, { summary: event.target.value })} />
            </label>
            <label className="admin-field admin-field--wide">
              Description
              <textarea value={row.description || ''} onChange={(event) => update(index, { description: event.target.value })} />
            </label>
            <label className="admin-field admin-field--wide">
              Blurb
              <textarea value={lines(row.blurb)} onChange={(event) => update(index, { blurb: fromLines(event.target.value) })} />
            </label>
            <label className="admin-field admin-field--wide">
              Highlights
              <textarea value={lines(row.highlights)} onChange={(event) => update(index, { highlights: fromLines(event.target.value) })} />
            </label>
            <label className="admin-field admin-field--wide">
              Tags
              <input
                value={(row.tags || []).join(', ')}
                onChange={(event) =>
                  update(index, {
                    tags: event.target.value
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
          </div>
        </div>
      ))}
      <div className="admin-toolbar">
        <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setRows((prev) => [...prev, emptyProject()])}>
          <AddRounded fontSize="inherit" /> Add project
        </button>
        <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>
          <SaveRounded fontSize="inherit" /> {busy ? 'Saving' : 'Save projects'}
        </button>
      </div>
    </form>
  );
}

function ResumeForm({ resume, busy, setBusy, setError, setOk, setContent, refresh }) {
  const [file, setFile] = useState(null);
  return (
    <div className="admin-card admin-resume">
      <div className="admin-resume__file">
        <p className="admin-kicker">Current file</p>
        <p className="admin-resume__name">{resume?.file || 'Bundled public PDF'}</p>
        <p className="admin-resume__hint">
          {resume?.available
            ? `Uploaded ${resume.updatedAt ? new Date(resume.updatedAt).toLocaleString() : 'recently'}. Download Resume uses this file.`
            : 'No owner upload yet. The site is still serving the bundled resume.'}
        </p>
      </div>
      <div className="admin-file">
        <UploadFileRounded sx={{ color: '#b794f6', fontSize: 22 }} />
        <input type="file" accept="application/pdf" onChange={(event) => setFile(event.target.files?.[0] || null)} />
        <div className="admin-toolbar" style={{ position: 'static', padding: 0, background: 'none' }}>
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
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
