import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import SportsEsportsRounded from '@mui/icons-material/SportsEsportsRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import profileImage from '../images/my_photo.webp';
import { projects, getProjectBlurb } from '../projectsData';
import { CONTACT_EMAIL_ENDPOINT } from '../config';
import SkyRushLauncher from '../Components/SkyRushLauncher';
import { getSkillIconSvg } from './skillIcons';
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

function SkillIcon({ name }) {
  const icon = getSkillIconSvg(name);
  if (!icon || icon.fallback || !icon.path) {
    return <span className="site-skill-icon site-skill-icon--fallback">{name.slice(0, 1)}</span>;
  }
  const viewBox = icon.viewBox || '0 0 24 24';
  return (
    <svg
      className="site-skill-icon"
      role="img"
      viewBox={viewBox}
      aria-hidden="true"
    >
      <title>{icon.title}</title>
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );
}

function LanguageRing({ name, level }) {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = filled
    ? circumference - (level / 100) * circumference
    : circumference;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const root = el.closest('.site-sidebar');
    const io = new IntersectionObserver(
      ([entry]) => {
        setFilled(entry.isIntersecting && entry.intersectionRatio >= 0.4);
      },
      { root: root || null, threshold: [0, 0.4, 0.7, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`site-lang-ring${filled ? ' is-filled' : ''}`} ref={ref}>
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle className="site-lang-ring__track" cx="36" cy="36" r={radius} />
        <circle
          className="site-lang-ring__progress"
          cx="36"
          cy="36"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <span className="site-lang-ring__value">{level}%</span>
      <span className="site-lang-ring__label">{name}</span>
    </div>
  );
}

function ProfileSidebar() {
  return (
    <aside className="site-sidebar" aria-label="Profile">
      <div className="site-sidebar__photo-wrap">
        <img className="site-sidebar__photo" src={profileImage} alt={profile.name} />
        <span className="site-sidebar__online" aria-hidden="true" />
      </div>

      <div className="site-sidebar__identity">
        <h1 className="site-sidebar__name">{profile.name}</h1>
        <p className="site-sidebar__headline">{profile.headline}</p>
        <div className="site-status-pill" role="status">
          <span className="site-status-pill__dot" aria-hidden="true" />
          {profile.status}
        </div>
      </div>

      <div className="site-sidebar__residence">
        <span>Residence:</span>
        <strong>{profile.residence}</strong>
      </div>

      <div className="site-sidebar__tech">
        <h2 className="site-sidebar__block-title">Technical Proficiency:</h2>
        {profile.technicalProficiency.map((group) => (
          <div className="site-tech-group" key={group.name}>
            <div className="site-tech-group__head">
              <span>{group.name}:</span>
              <strong>{group.level} %</strong>
            </div>
            <div className="site-skill-bar__track" aria-hidden="true">
              <div className="site-skill-bar__fill" style={{ width: `${group.level}%` }} />
            </div>
            <ul className="site-sidebar__skills">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="site-sidebar__languages">
        <h2 className="site-sidebar__block-title">Languages</h2>
        <div className="site-lang-rings" role="list">
          {profile.languages.map((lang) => (
            <div role="listitem" key={lang.name}>
              <LanguageRing name={lang.name} level={lang.level} />
            </div>
          ))}
        </div>
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
    <section className="site-home">
      <div className="site-home__stage">
        <div className="site-home__aurora" aria-hidden="true" />
        <div className="site-home__orbits" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="site-home__banner site-home__banner--coder">
          <div className="site-home__banner-media" aria-hidden="true">
            <img src="/images/home-coder-city.webp" alt="" />
            <span className="site-home__veil" />
            <span className="site-home__sweep" />
            <span className="site-home__bolt-line" />
          </div>
          <div className="site-home__banner-copy">
            <p className="site-kicker">&lt;home&gt;</p>
            <blockquote className="site-home__quote">
              <p>“{profile.quote.text}”</p>
              <cite>— {profile.quote.attribution}</cite>
            </blockquote>
            <p className="site-home__typed">
              <code>
                building systems that ship <span className="site-home__cursor" aria-hidden="true" />
              </code>
            </p>
          </div>
        </div>
      </div>

      <div className="site-home__intro">
        <p className="site-home__eyebrow">Full-stack · AI/ML · Open to 2026</p>
        <h2 className="site-title site-home__title">{profile.tagline}</h2>
        <p className="site-lead">{profile.about[0]}</p>
      </div>

      <div className="site-actions">
        <button type="button" className="site-btn site-btn--primary" onClick={downloadResume}>
          <DownloadRounded fontSize="small" /> Download resume
        </button>
        <button type="button" className="site-btn site-btn--ghost" onClick={() => onOpenTab('projects')}>
          View projects
        </button>
        <button type="button" className="site-btn site-btn--ghost" onClick={() => onOpenTab('about')}>
          About me
        </button>
      </div>

      <div className="site-stats">
        {profile.stats.map((stat, index) => (
          <div className="site-stat" key={stat.label} style={{ '--i': index }}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutPanel() {
  return (
    <section>
      <div className="site-section-head">
        <p className="site-kicker">&lt;about&gt;</p>
        <h2>About me</h2>
        <p className="site-section-sub">Background, focus, and education.</p>
      </div>
      {profile.about.map((para) => (
        <p className="site-lead" key={para.slice(0, 24)}>
          {para}
        </p>
      ))}
      <dl className="site-about-facts">
        <div>
          <dt>Location</dt>
          <dd>{profile.location}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>
            <span className="site-status-pill site-status-pill--inline">
              <span className="site-status-pill__dot" aria-hidden="true" />
              {profile.status}
            </span>
          </dd>
        </div>
        <div>
          <dt>Citizenship</dt>
          <dd>{profile.citizenship}</dd>
        </div>
      </dl>
      <div className="site-section-head" style={{ marginTop: '1.75rem' }}>
        <h2>Education</h2>
        <p className="site-section-sub">Degrees and coursework.</p>
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

function ExperiencePanel() {
  return (
    <section>
      <div className="site-section-head">
        <p className="site-kicker">&lt;experience&gt;</p>
        <h2>Work experience</h2>
        <p className="site-section-sub">Roles and internships.</p>
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
        <p className="site-section-sub">Course and personal builds that function like product experience.</p>
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

function ProjectsPanel() {
  const [activeId, setActiveId] = useState(null);
  const active = projects.find((project) => project.id === activeId) || null;

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section>
      <div className="site-section-head">
        <p className="site-kicker">&lt;projects&gt;</p>
        <h2>Technical projects</h2>
        <p className="site-section-sub">Selected builds and live demos.</p>
      </div>
      <div className="site-project-list">
        {projects.map((project, index) => {
          const blurbs = getProjectBlurb(project);
          const hue = project.spectrum?.hue ?? 20 + index * 28;
          return (
            <button
              type="button"
              className={`site-project-card${project.featured ? ' is-featured' : ''}`}
              key={project.id}
              onClick={() => setActiveId(project.id)}
              style={{ '--project-hue': hue }}
            >
              <div className="site-project-card__media">
                <img src={project.image} alt="" loading="lazy" />
                <span className="site-project-card__glow" aria-hidden="true" />
                {project.featured ? <span className="site-project-card__badge">Featured</span> : null}
              </div>
              <div className="site-project-card__body">
                <p className="site-project-card__meta">
                  {project.category} · {project.year}
                  {project.role ? ` · ${project.role}` : ''}
                </p>
                <h3>{project.title}</h3>
                <p className="site-project-card__summary">{project.summary || blurbs[0]}</p>
                {project.metrics?.length ? (
                  <div className="site-project-card__metrics" aria-label="Project metrics">
                    {project.metrics.map((metric) => (
                      <span key={`${project.id}-${metric.label}`}>
                        <strong>{metric.value}</strong> {metric.label}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="site-tags">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span className="site-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="site-project-card__cta">View details</span>
              </div>
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          className="site-project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setActiveId(null)}
        >
          <div
            className="site-project-modal__panel"
            onClick={(e) => e.stopPropagation()}
            style={{ '--project-hue': active.spectrum?.hue ?? 24 }}
          >
            <button
              type="button"
              className="site-project-modal__close"
              aria-label="Close project details"
              onClick={() => setActiveId(null)}
            >
              <CloseRounded fontSize="small" />
            </button>
            <div className="site-project-modal__hero">
              <img src={active.image} alt="" />
              <div className="site-project-modal__hero-copy">
                <p className="site-project-card__meta">
                  {active.category} · {active.year}
                  {active.role ? ` · ${active.role}` : ''}
                  {active.featured ? ' · Featured' : ''}
                </p>
                <h3 id="project-modal-title">{active.title}</h3>
                {active.spectrum?.band ? <p className="site-project-modal__band">{active.spectrum.band}</p> : null}
              </div>
            </div>
            <div className="site-project-modal__body">
              <p className="site-project-modal__lead">{active.description || active.summary}</p>
              {getProjectBlurb(active).map((line) => (
                <p key={line.slice(0, 40)}>{line}</p>
              ))}
              {active.highlights?.length ? (
                <div className="site-project-modal__block">
                  <h4>Highlights</h4>
                  <ul>
                    {active.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {active.metrics?.length ? (
                <div className="site-project-modal__metrics">
                  {active.metrics.map((metric) => (
                    <div key={`${active.id}-m-${metric.label}`}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="site-tags">
                {active.tags.map((tag) => (
                  <span className="site-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {active.gallery?.length > 1 ? (
                <div className="site-project-modal__gallery">
                  {active.gallery.slice(0, 3).map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" />
                  ))}
                </div>
              ) : null}
              <div className="site-project-modal__links">
                <RouterLink className="site-btn site-btn--primary" to={`/projects/${active.id}`}>
                  Full case study
                </RouterLink>
                {active.liveUrl && active.liveUrl !== '#' ? (
                  active.liveUrl.startsWith('/') ? (
                    <RouterLink className="site-btn site-btn--ghost" to={active.liveUrl}>
                      Live / Play
                    </RouterLink>
                  ) : (
                    <a
                      className="site-btn site-btn--ghost"
                      href={active.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo <OpenInNewRounded fontSize="inherit" />
                    </a>
                  )
                ) : null}
                {active.sourceUrl && active.sourceUrl !== '#' ? (
                  <a
                    className="site-btn site-btn--ghost"
                    href={active.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <OpenInNewRounded fontSize="inherit" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function SkillsPanel() {
  return (
    <section>
      <div className="site-section-head">
        <p className="site-kicker">&lt;skills&gt;</p>
        <h2>Technical skills</h2>
        <p className="site-section-sub">Tools and technologies I use most.</p>
      </div>
      <div className="site-card-grid">
        {skillGroups.map((group) => (
          <article className="site-card" key={group.title}>
            <h3>{group.title}</h3>
            <div className="site-skill-grid">
              {group.items.map((item) => (
                <div className="site-skill-item" key={item}>
                  <SkillIcon name={item} />
                  <span>{item}</span>
                </div>
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
    <section className="site-contact">
      <div className="site-section-head">
        <p className="site-kicker">&lt;contact&gt;</p>
        <h2>Let’s connect</h2>
        <p className="site-section-sub">Open to full-time and internship software roles.</p>
      </div>

      <div className="site-contact-strip" aria-label="Contact details">
        <a className="site-contact-chip" href={`mailto:${profile.emails.primary}`}>
          <EmailIcon fontSize="small" />
          <span>
            <strong>Email</strong>
            <em>{profile.emails.primary}</em>
          </span>
        </a>
        <a className="site-contact-chip" href={`mailto:${profile.emails.school}`}>
          <EmailIcon fontSize="small" />
          <span>
            <strong>School</strong>
            <em>{profile.emails.school}</em>
          </span>
        </a>
        <div className="site-contact-chip" role="group">
          <PhoneIcon fontSize="small" />
          <span>
            <strong>Phone</strong>
            <em>{profile.phone}</em>
          </span>
        </div>
        <div className="site-contact-chip" role="group">
          <PlaceIcon fontSize="small" />
          <span>
            <strong>Location</strong>
            <em>{profile.location}</em>
          </span>
        </div>
      </div>

      <div className="site-contact-panel">
        <form className="site-contact-form" onSubmit={onSubmit}>
          <div className="site-contact-form__row">
            <div className="site-field">
              <label htmlFor="fullName">
                <PersonOutlineRounded fontSize="inherit" /> Full name
              </label>
              <input id="fullName" value={form.fullName} onChange={onChange('fullName')} autoComplete="name" />
            </div>
            <div className="site-field">
              <label htmlFor="email">
                <EmailIcon fontSize="inherit" /> Email
              </label>
              <input id="email" type="email" value={form.email} onChange={onChange('email')} autoComplete="email" />
            </div>
          </div>
          <div className="site-field">
            <label htmlFor="message">
              <SendRounded fontSize="inherit" /> Message
            </label>
            <textarea id="message" rows={5} value={form.message} onChange={onChange('message')} />
          </div>
          <div className="site-contact-form__actions">
            <button type="submit" className="site-btn site-btn--primary" disabled={sending}>
              <SendRounded fontSize="small" />
              {sending ? 'Sending…' : 'Send message'}
            </button>
            <a className="site-btn site-btn--ghost" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize="small" /> LinkedIn
            </a>
            <a className="site-btn site-btn--ghost" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon fontSize="small" /> GitHub
            </a>
            <button type="button" className="site-btn site-btn--ghost" onClick={downloadResume}>
              <DownloadRounded fontSize="small" /> Resume
            </button>
          </div>
          {status.text ? (
            <p className={`site-toast site-toast--${status.type === 'ok' ? 'ok' : 'err'}`}>{status.text}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function BootSplash({ onDone }) {
  const [phase, setPhase] = useState('load'); // load -> charge -> strike -> hold -> split -> done
  const letters = profile.name.split('');

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase('charge'), 1550),
      window.setTimeout(() => setPhase('strike'), 1900),
      window.setTimeout(() => setPhase('hold'), 2550),
      window.setTimeout(() => setPhase('split'), 2900),
      window.setTimeout(() => {
        setPhase('done');
        onDone();
      }, 4200),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [onDone]);

  return (
    <div
      className={`site-boot is-${phase}`}
      aria-live="polite"
      aria-busy={phase !== 'done'}
    >
      <div className="site-boot__door site-boot__door--left" aria-hidden="true" />
      <div className="site-boot__door site-boot__door--right" aria-hidden="true" />
      <div className="site-boot__seam" aria-hidden="true" />

      <div className="site-boot__flash" aria-hidden="true" />

      <svg
        className="site-boot__bolt"
        viewBox="0 0 80 400"
        preserveAspectRatio="xMidYMin meet"
        aria-hidden="true"
      >
        <polyline
          className="site-boot__bolt-glow"
          points="40,0 48,42 32,42 46,98 28,98 44,160 30,160 42,230 34,230 40,310 36,310 40,400"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          className="site-boot__bolt-path"
          points="40,0 48,42 32,42 46,98 28,98 44,160 30,160 42,230 34,230 40,310 36,310 40,400"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          className="site-boot__bolt-branch"
          points="46,98 62,118 54,118"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          className="site-boot__bolt-branch"
          points="30,160 14,184 22,184"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <div className="site-boot__sparks" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>

      <div className="site-boot__inner">
        <h1 className="site-boot__name">
          {letters.map((ch, index) => (
            <span
              key={`${ch}-${index}`}
              className="site-boot__letter"
              style={{ '--i': index }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}

export default function SiteShell() {
  const location = useLocation();
  const [booting, setBooting] = useState(true);
  const [gameOpen, setGameOpen] = useState(false);
  const [tab, setTab] = useState(() => location.state?.openTab || 'home');
  const finishBoot = useCallback(() => setBooting(false), []);

  useEffect(() => {
    if (location.state?.openTab) {
      setTab(location.state.openTab);
      window.history.replaceState({}, '');
    }
    if (location.state?.openGame) {
      setGameOpen(true);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  const panel = useMemo(() => {
    switch (tab) {
      case 'about':
        return <AboutPanel />;
      case 'skills':
        return <SkillsPanel />;
      case 'experience':
        return <ExperiencePanel />;
      case 'education':
        return <AboutPanel />;
      case 'projects':
        return <ProjectsPanel />;
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
      <div className="site-shell">
        <ProfileSidebar />
        <div className="site-main">
          <nav className="site-tabs" aria-label="Primary">
            <button
              type="button"
              className="site-game-btn"
              aria-label="Play Sky Rush"
              title="Play Sky Rush"
              onClick={() => setGameOpen(true)}
            >
              <SportsEsportsRounded fontSize="small" />
            </button>
            <div className="site-tabs__dock">
              <div className="site-tabs__menu" role="tablist">
                {NAV_TABS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    className={`site-tab${tab === item.id ? ' is-active' : ''}`}
                    onClick={() => setTab(item.id)}
                    aria-selected={tab === item.id}
                    aria-current={tab === item.id ? 'page' : undefined}
                  >
                    <span className="site-tab__index" aria-hidden="true">
                      {String(NAV_TABS.findIndex((t) => t.id === item.id) + 1).padStart(2, '0')}
                    </span>
                    <span className="site-tab__label">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
          <div className="site-panel">
            <div className="site-panel__inner" key={tab}>
              {panel}
            </div>
          </div>
        </div>
      </div>
      <SkyRushLauncher hideFab open={gameOpen} onOpenChange={setGameOpen} />
    </>
  );
}
