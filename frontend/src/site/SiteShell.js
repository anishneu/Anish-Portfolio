import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import profileImage from '../images/my_photo.webp';
import { projects, getProjectBlurb } from '../projectsData';
import { CONTACT_EMAIL_ENDPOINT } from '../config';
import {
  profile,
  experience,
  education,
  skillGroups,
  NAV_TABS,
} from '../profileData';
import './site.css';

async function downloadResume() {
  try {
    const res = await fetch('/uploads/resume.json');
    const data = await res.json();
    const filename = data?.file || 'Resume - Anish Kuila.pdf';
    const link = document.createElement('a');
    link.href = `/uploads/${encodeURIComponent(filename)}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch {
    const link = document.createElement('a');
    link.href = '/uploads/Resume%20-%20Anish%20Kuila.pdf';
    link.download = 'Resume - Anish Kuila.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

function ProfileSidebar() {
  return (
    <aside className="site-sidebar" aria-label="Profile">
      <img className="site-sidebar__photo" src={profileImage} alt={profile.name} />
      <div>
        <h1 className="site-sidebar__name">{profile.name}</h1>
        <p className="site-sidebar__headline">{profile.headline}</p>
        <p className="site-sidebar__meta">
          {profile.location}
          <br />
          {profile.status}
        </p>
      </div>

      <div>
        <h2 className="site-sidebar__block-title">Languages</h2>
        {profile.languages.map((lang) => (
          <div className="site-lang-row" key={lang.name}>
            <span>
              {lang.name} · {lang.level}%
            </span>
            <div className="site-lang-row__track">
              <div className="site-lang-row__fill" style={{ width: `${lang.level}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="site-sidebar__block-title">Proficiency</h2>
        {profile.skillBars.map((skill) => (
          <div className="site-skill-bar" key={skill.name}>
            <span>
              {skill.name} · {skill.level}%
            </span>
            <div className="site-skill-bar__track">
              <div className="site-skill-bar__fill" style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="site-sidebar__block-title">Skills</h2>
        <ul className="site-sidebar__skills">
          {profile.sidebarSkills.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="site-sidebar__socials">
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon fontSize="small" />
        </a>
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon fontSize="small" />
        </a>
        <a href={`mailto:${profile.emails.primary}`} aria-label="Email">
          <EmailIcon fontSize="small" />
        </a>
      </div>
    </aside>
  );
}

function HomePanel({ onOpenTab }) {
  return (
    <section>
      <p className="site-kicker">&lt;home&gt;</p>
      <div className="site-quote">
        <p>“{profile.quote.text}”</p>
        <cite>— {profile.quote.attribution}</cite>
      </div>
      <h2 className="site-title">{profile.tagline}</h2>
      <p className="site-lead">{profile.about[0]}</p>
      <div className="site-actions">
        <button type="button" className="site-btn site-btn--primary" onClick={downloadResume}>
          <DownloadRounded fontSize="small" /> Download resume
        </button>
        <button type="button" className="site-btn site-btn--ghost" onClick={() => onOpenTab('projects')}>
          View projects
        </button>
        <RouterLink className="site-btn site-btn--ghost" to="/play/sky-rush">
          Play Sky Rush
        </RouterLink>
      </div>
      <div className="site-stats">
        {profile.stats.map((stat) => (
          <div className="site-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <div className="site-section-head">
        <h2>About</h2>
      </div>
      {profile.about.slice(1).map((para) => (
        <p className="site-lead" key={para.slice(0, 24)}>
          {para}
        </p>
      ))}
      <p className="site-kicker" style={{ marginTop: '1.25rem' }}>
        &lt;/home&gt;
      </p>
    </section>
  );
}

function ExperiencePanel() {
  return (
    <section>
      <div className="site-section-head">
        <p className="site-kicker">&lt;experience&gt;</p>
        <h2>Work experience</h2>
        <p>Roles and internships from LinkedIn / resume.</p>
      </div>
      <div className="site-timeline">
        {experience.map((job) => (
          <article className="site-timeline__item site-card" key={`${job.company}-${job.dates}`}>
            <h3>{job.title}</h3>
            <h4>
              {job.company} · {job.location}
            </h4>
            <p className="site-card__meta">{job.dates}</p>
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="site-section-head" style={{ marginTop: '1.75rem' }}>
        <h2>Selected project work</h2>
        <p>Course and personal builds that function like product experience.</p>
      </div>
      <div className="site-card-grid">
        {projects.slice(0, 4).map((project) => (
          <article className="site-card" key={project.id}>
            <h3>{project.shortTitle || project.title}</h3>
            <p className="site-card__meta">
              {project.role} · {project.year}
            </p>
            <p>{project.summary}</p>
            <RouterLink className="site-card__link" to={`/projects/${project.id}`}>
              Open case study →
            </RouterLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function EducationPanel() {
  return (
    <section>
      <div className="site-section-head">
        <p className="site-kicker">&lt;education&gt;</p>
        <h2>Education</h2>
        <p>Academic background from LinkedIn / resume.</p>
      </div>
      <div className="site-timeline">
        {education.map((edu) => (
          <article className="site-timeline__item site-card" key={edu.school}>
            <h3>{edu.school}</h3>
            <h4>{edu.degree}</h4>
            <p className="site-card__meta">
              {edu.location} · {edu.dates}
            </p>
            <div className="site-tags">
              {edu.courses.map((course) => (
                <span className="site-tag" key={course}>
                  {course}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectsPanel() {
  return (
    <section>
      <div className="site-section-head">
        <p className="site-kicker">&lt;projects&gt;</p>
        <h2>Technical projects</h2>
        <p>Synced from GitHub repositories and live demos.</p>
      </div>
      <div className="site-card-grid">
        {projects.map((project) => {
          const blurb = getProjectBlurb(project)[0];
          return (
            <article className="site-card" key={project.id}>
              <h3>{project.title}</h3>
              <p className="site-card__meta">
                {project.category} · {project.year}
                {project.featured ? ' · Featured' : ''}
              </p>
              <p>{blurb}</p>
              <div className="site-tags">
                {project.tags.slice(0, 5).map((tag) => (
                  <span className="site-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="site-actions" style={{ marginBottom: 0 }}>
                <RouterLink className="site-card__link" to={`/projects/${project.id}`}>
                  Details →
                </RouterLink>
                {project.liveUrl && project.liveUrl !== '#' && (
                  project.liveUrl.startsWith('/') ? (
                    <RouterLink className="site-card__link" to={project.liveUrl}>
                      Live / Play →
                    </RouterLink>
                  ) : (
                    <a
                      className="site-card__link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo <OpenInNewRounded sx={{ fontSize: 14 }} />
                    </a>
                  )
                )}
                {project.sourceUrl && project.sourceUrl !== '#' && (
                  <a
                    className="site-card__link"
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <OpenInNewRounded sx={{ fontSize: 14 }} />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SkillsPanel() {
  return (
    <section>
      <div className="site-section-head">
        <p className="site-kicker">&lt;skills&gt;</p>
        <h2>Technical skills</h2>
        <p>Aligned with resume and GitHub tech stack.</p>
      </div>
      <div className="site-card-grid">
        {skillGroups.map((group) => (
          <article className="site-card" key={group.title}>
            <h3>{group.title}</h3>
            <div className="site-chip-cloud">
              {group.items.map((item) => (
                <span className="site-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPanel() {
  const [form, setForm] = useState({ fullName: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  const onChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'err', text: 'Please fill in name, email, and message.' });
      return;
    }
    setSending(true);
    setStatus({ type: '', text: '' });
    try {
      const res = await fetch(CONTACT_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: form.fullName.trim(),
          senderEmail: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error('send_failed');
      setForm({ fullName: '', email: '', message: '' });
      setStatus({ type: 'ok', text: 'Message sent. Thanks for reaching out!' });
    } catch {
      setStatus({
        type: 'err',
        text: `Could not send via API. Email ${profile.emails.primary} directly.`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section>
      <div className="site-section-head">
        <p className="site-kicker">&lt;contact&gt;</p>
        <h2>Let’s connect</h2>
        <p>Open to full-time and internship software roles.</p>
      </div>
      <div className="site-contact-grid">
        <form className="site-card" onSubmit={onSubmit}>
          <div className="site-field">
            <label htmlFor="fullName">Full name</label>
            <input id="fullName" value={form.fullName} onChange={onChange('fullName')} autoComplete="name" />
          </div>
          <div className="site-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={onChange('email')} autoComplete="email" />
          </div>
          <div className="site-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={6} value={form.message} onChange={onChange('message')} />
          </div>
          <button type="submit" className="site-btn site-btn--primary" disabled={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </button>
          {status.text ? (
            <p className={`site-toast site-toast--${status.type === 'ok' ? 'ok' : 'err'}`}>{status.text}</p>
          ) : null}
        </form>
        <aside className="site-card">
          <h3>Direct</h3>
          <p>
            <a href={`mailto:${profile.emails.primary}`} style={{ color: 'var(--site-accent)' }}>
              {profile.emails.primary}
            </a>
          </p>
          <p>
            <a href={`mailto:${profile.emails.school}`} style={{ color: 'var(--site-accent)' }}>
              {profile.emails.school}
            </a>
          </p>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
          <div className="site-actions" style={{ marginBottom: 0 }}>
            <a className="site-btn site-btn--ghost" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="site-btn site-btn--ghost" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <button type="button" className="site-btn site-btn--primary" onClick={downloadResume}>
              Resume
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function BootSplash({ onDone }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fadeAt = window.setTimeout(() => setDone(true), 1500);
    const removeAt = window.setTimeout(onDone, 2050);
    return () => {
      window.clearTimeout(fadeAt);
      window.clearTimeout(removeAt);
    };
  }, [onDone]);

  return (
    <div className={`site-boot${done ? ' is-done' : ''}`} aria-live="polite" aria-busy={!done}>
      <div className="site-boot__inner">
        <h1 className="site-boot__name">{profile.name}</h1>
        <p className="site-boot__tag">{profile.headline}</p>
        <div className="site-boot__track" aria-hidden="true">
          <div className="site-boot__fill" />
        </div>
      </div>
    </div>
  );
}

export default function SiteShell() {
  const location = useLocation();
  const [booting, setBooting] = useState(true);
  const [tab, setTab] = useState(() => location.state?.openTab || 'home');
  const finishBoot = useCallback(() => setBooting(false), []);

  useEffect(() => {
    if (location.state?.openTab) {
      setTab(location.state.openTab);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  const panel = useMemo(() => {
    switch (tab) {
      case 'experience':
        return <ExperiencePanel />;
      case 'education':
        return <EducationPanel />;
      case 'projects':
        return <ProjectsPanel />;
      case 'skills':
        return <SkillsPanel />;
      case 'contact':
        return <ContactPanel />;
      case 'home':
      default:
        return <HomePanel onOpenTab={setTab} />;
    }
  }, [tab]);

  return (
    <>
      {booting ? <BootSplash onDone={finishBoot} /> : null}
      <div className={`site-shell${booting ? ' is-booting' : ''}`}>
        <ProfileSidebar />
        <div className="site-main">
          <nav className="site-tabs" aria-label="Primary">
            {NAV_TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`site-tab${tab === item.id ? ' is-active' : ''}`}
                onClick={() => setTab(item.id)}
                aria-current={tab === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="site-panel">{panel}</div>
        </div>
      </div>
    </>
  );
}
