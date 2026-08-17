import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
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
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
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

function PanelHead({ index, kicker, title, sub, action }) {
  return (
    <header className={`site-panel-head${action ? ' site-panel-head--with-action' : ''}`}>
      <p className="site-panel-head__kicker">
        <span className="site-panel-head__index">{index}</span>
        <span className="site-panel-head__slash" aria-hidden="true" />
        <span>{kicker}</span>
      </p>
      <div className="site-panel-head__row">
        <div className="site-panel-head__copy">
          <h2>{title}</h2>
          {sub ? <p className="site-panel-head__sub">{sub}</p> : null}
        </div>
        {action}
      </div>
    </header>
  );
}

function HomePanel({ onOpenTab }) {
  const reduceMotion = useReducedMotion();
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);
  const focusLanes = [
    { label: 'Shipping', value: 'PLM · commerce · recipe platforms' },
    { label: 'Stack', value: 'Java · Python · React · Spring Boot' },
    { label: 'Next', value: 'Cloud systems · AI-assisted delivery' },
  ];
  const signalChips = ['FastAPI', 'Spring Boot', 'React', 'Keycloak', 'Docker', 'AWS'];

  return (
    <section className="site-home">
      <motion.div
        className="site-home__hero"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="site-home__hero-media" aria-hidden="true">
          <img src="/images/home-coder-city.webp" alt="" />
          <span className="site-home__hero-veil" />
          <span className="site-home__hero-scan" />
        </div>

        <div className="site-home__hero-copy">
          <h2 className="site-home__brand">{profile.name}</h2>
          <p className="site-home__role">Software Engineer · Full-Stack &amp; AI/ML</p>
          <p className="site-home__pitch">
            I design APIs and interfaces that feel intentional — from enterprise PLM workflows to playable Unity demos.
          </p>
          <div className="site-home__banner-actions">
            <button type="button" className="site-btn site-btn--primary" onClick={downloadResume}>
              <DownloadRounded fontSize="small" /> Download resume
            </button>
            <button type="button" className="site-btn site-btn--ghost site-btn--on-dark" onClick={() => onOpenTab('about')}>
              About me
            </button>
          </div>
          <div className="site-home__chip-row" aria-label="Core stack">
            {signalChips.map((chip, index) => (
              <motion.span
                key={chip}
                className="site-home__chip"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.05, duration: 0.35 }}
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="site-home__signal"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
      >
        <div className="site-home__signal-head">
          <p className="site-home__eyebrow">Transmission</p>
          <h3>What I’m optimizing for right now</h3>
        </div>
        <div className="site-home__lanes">
          {focusLanes.map((lane, index) => (
            <motion.div
              className="site-home__lane"
              key={lane.label}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <span>{lane.label}</span>
              <strong>{lane.value}</strong>
            </motion.div>
          ))}
        </div>
        <button type="button" className="site-home__signal-cta" onClick={() => onOpenTab('projects')}>
          Explore builds <ArrowForwardRounded fontSize="small" />
        </button>
      </motion.div>

      <div className="site-home__featured">
        <div className="site-home__featured-head">
          <div>
            <p className="site-home__eyebrow">Featured work</p>
            <h3>Selected projects</h3>
          </div>
          <button type="button" className="site-btn site-btn--ghost" onClick={() => onOpenTab('projects')}>
            View projects
          </button>
        </div>
        <div className="site-home__scroller" role="list">
          {featuredProjects.map((project) => (
            <article className="site-home__card" role="listitem" key={project.id}>
              <div className="site-home__card-media">
                <img src={project.image} alt="" loading="lazy" />
              </div>
              <div className="site-home__card-body">
                <p className="site-home__card-meta">
                  {project.year}
                  {project.role ? ` · ${project.role}` : ''}
                </p>
                <h4>{project.shortTitle || project.title}</h4>
                <p>{project.summary}</p>
                <div className="site-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span className="site-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <RouterLink className="site-home__card-link" to={`/projects/${project.id}`}>
                  Case study →
                </RouterLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPanel() {
  return (
    <section>
      <PanelHead
        index="02"
        kicker="About"
        title="About me"
        sub="A bit about me, the work I do, and how I got here."
      />
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
      <header className="site-panel-head site-panel-head--nested">
        <h3>Education</h3>
        <p className="site-panel-head__sub">Degrees and coursework.</p>
      </header>
      <ol className="site-edu-tree">
        {education.map((edu) => (
          <li className="site-edu-tree__branch" key={edu.school}>
            <article className="site-edu-tree__node">
              <div className="site-edu-tree__info">
                <p className="site-edu-tree__when">{edu.dates}</p>
                <h3>{edu.school}</h3>
                <h4>{edu.degree}</h4>
                <p className="site-edu-tree__place">{edu.location}</p>
              </div>
              <ul className="site-edu-tree__leaves">
                {edu.courses.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ExperiencePanel() {
  return (
    <section>
      <PanelHead
        index="04"
        kicker="Experience"
        title="Work experience"
        sub="Roles and internships."
      />
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
    </section>
  );
}

const CATEGORY_LABELS = {
  'full-stack': 'Full-stack',
  games: 'Games',
  ml: 'AI / ML',
  design: 'Design',
  healthcare: 'Healthcare',
};

const PROJECT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured' },
  { id: 'full-stack', label: 'Full-stack' },
  { id: 'games', label: 'Games' },
  { id: 'ml', label: 'AI / ML' },
  { id: 'design', label: 'Design' },
  { id: 'healthcare', label: 'Healthcare' },
];

function ProjectsPanel() {
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState('all');
  const active = projects.find((project) => project.id === activeId) || null;

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    if (filter === 'featured') return projects.filter((project) => project.featured);
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  const filterCounts = useMemo(() => {
    const counts = { all: projects.length, featured: 0 };
    projects.forEach((project) => {
      if (project.featured) counts.featured += 1;
      counts[project.category] = (counts[project.category] || 0) + 1;
    });
    return counts;
  }, []);

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
    <section className="site-projects">
      <PanelHead
        index="05"
        kicker="Projects"
        title="Projects"
        sub="Selected builds across product, games, and research."
      />

      <div className="site-project-filters" role="tablist" aria-label="Filter projects">
        {PROJECT_FILTERS.filter((item) => item.id === 'all' || item.id === 'featured' || filterCounts[item.id]).map(
          (item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`site-project-filter${filter === item.id ? ' is-active' : ''}`}
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          )
        )}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="site-project-empty">No projects in this filter yet.</p>
      ) : (
        <div className="site-project-grid">
          {filteredProjects.map((project) => (
            <button
              type="button"
              className="site-project-tile"
              key={project.id}
              onClick={() => setActiveId(project.id)}
            >
              <div className="site-project-tile__media">
                <img src={project.image} alt="" loading="lazy" />
                <span className="site-project-tile__hover">
                  <span className="site-project-tile__hover-meta">
                    {project.year}
                    {project.featured ? ' · Featured' : ''}
                  </span>
                  <span className="site-project-tile__hover-cta">
                    View project <ArrowForwardRounded fontSize="inherit" />
                  </span>
                </span>
              </div>
              <h3>{project.title}</h3>
              <p>{CATEGORY_LABELS[project.category] || project.category}</p>
            </button>
          ))}
        </div>
      )}

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
                  {CATEGORY_LABELS[active.category] || active.category} · {active.year}
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
  const [activeGroup, setActiveGroup] = useState(skillGroups[0]?.title || '');
  const current = skillGroups.find((group) => group.title === activeGroup) || skillGroups[0];

  return (
    <section className="site-skills">
      <PanelHead
        index="03"
        kicker="Skills"
        title="Skills"
        sub="Pick a lane to inspect the stack."
      />

      <div className="site-skills__board">
        <div className="site-skills__rail" role="tablist" aria-label="Skill categories">
          {skillGroups.map((group, index) => (
            <button
              key={group.title}
              type="button"
              role="tab"
              className={`site-skills__rail-btn${activeGroup === group.title ? ' is-active' : ''}`}
              aria-selected={activeGroup === group.title}
              onClick={() => setActiveGroup(group.title)}
            >
              <em>{String(index + 1).padStart(2, '0')}</em>
              <span>{group.title}</span>
              <strong>{group.items.length}</strong>
            </button>
          ))}
        </div>

        <div className="site-skills__stage" role="tabpanel">
          <div className="site-skills__orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="site-skills__stage-head">
            <p className="site-home__eyebrow">Lane {String(skillGroups.findIndex((g) => g.title === current.title) + 1).padStart(2, '0')}</p>
            <h3>{current.title}</h3>
          </div>
          <div className="site-skills__constellation">
            {current.items.map((item, index) => (
              <div
                className="site-skills__node"
                key={item}
                style={{ '--i': index }}
              >
                <span className="site-skills__node-icon">
                  <SkillIcon name={item} />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
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
      <PanelHead
        index="06"
        kicker="Contact"
        title="Open a channel"
        sub="Open to software, full-stack, and AI roles."
        action={(
          <button type="button" className="site-btn site-btn--ghost" onClick={downloadResume}>
            <DownloadRounded fontSize="small" /> Resume
          </button>
        )}
      />

      <div className="site-channel">
        <aside className="site-channel__board">
          <div className="site-channel__radar" aria-hidden="true">
            <span />
            <span />
            <span />
            <i />
          </div>
          <p className="site-channel__live">
            <span className="site-channel__pulse" aria-hidden="true" />
            Line is open
          </p>
          <h3>Direct frequencies</h3>
          <p className="site-channel__note">
            Prefer email for recruiting notes. I usually reply within a day.
          </p>
          <ul className="site-channel__freqs">
            <li>
              <a href={`mailto:${profile.emails.primary}`}>
                <EmailIcon fontSize="small" />
                <span>
                  <strong>Primary</strong>
                  <em>{profile.emails.primary}</em>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.emails.school}`}>
                <EmailIcon fontSize="small" />
                <span>
                  <strong>School</strong>
                  <em>{profile.emails.school}</em>
                </span>
              </a>
            </li>
            <li>
              <div>
                <PhoneIcon fontSize="small" />
                <span>
                  <strong>Phone</strong>
                  <em>{profile.phone}</em>
                </span>
              </div>
            </li>
            <li>
              <div>
                <PlaceIcon fontSize="small" />
                <span>
                  <strong>Location</strong>
                  <em>{profile.location}</em>
                </span>
              </div>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon fontSize="small" />
                <span>
                  <strong>LinkedIn</strong>
                  <em>Connect</em>
                </span>
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon fontSize="small" />
                <span>
                  <strong>GitHub</strong>
                  <em>Code</em>
                </span>
              </a>
            </li>
          </ul>
        </aside>

        <div className="site-channel__compose">
          <div className="site-channel__compose-bar">
            <span>New transmission</span>
            <span>SMTP · Boston</span>
          </div>
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
              <textarea id="message" rows={6} value={form.message} onChange={onChange('message')} />
            </div>
            <div className="site-contact-form__actions">
              <button type="submit" className="site-btn site-btn--primary" disabled={sending}>
                <SendRounded fontSize="small" />
                {sending ? 'Sending…' : 'Transmit'}
              </button>
            </div>
            {status.text ? (
              <p className={`site-toast site-toast--${status.type === 'ok' ? 'ok' : 'err'}`}>{status.text}</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

function BootSplash({ onDone }) {
  const [phase, setPhase] = useState('load'); // load -> charge -> strike -> hold -> split -> done
  const [progress, setProgress] = useState(0);
  const letters = profile.name.split('');

  useEffect(() => {
    const start = performance.now();
    const loadMs = 2100;
    let frame = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / loadMs);
      const eased = 1 - (1 - t) ** 2.2;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setProgress(100);
      }
    };
    frame = window.requestAnimationFrame(tick);

    // load (2.1s) → brief charge → strike → hold → split → done
    const timers = [
      window.setTimeout(() => setPhase('charge'), 2150),
      window.setTimeout(() => setPhase('strike'), 2450),
      window.setTimeout(() => setPhase('hold'), 3050),
      window.setTimeout(() => setPhase('split'), 3450),
      window.setTimeout(() => {
        setPhase('done');
        onDone();
      }, 4700),
    ];
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
    };
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
        <div className="site-boot__loader" aria-hidden={phase === 'done'}>
          <div className="site-boot__percent">{progress}%</div>
          <div className="site-boot__track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <div className="site-boot__fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HiringTicker({ active, onDismiss }) {
  if (!active) return null;
  const line = `${profile.status} · Software · Full-stack · AI/ML · Boston`;
  return (
    <div className="site-ticker" role="status">
      <div className="site-ticker__viewport">
        <div className="site-ticker__rail">
          <span>{line}</span>
          <span>{line}</span>
        </div>
      </div>
      <button type="button" className="site-ticker__close" onClick={onDismiss} aria-label="Dismiss notice">
        <CloseRounded fontSize="inherit" />
      </button>
    </div>
  );
}

export default function SiteShell() {
  const location = useLocation();
  const [booting, setBooting] = useState(true);
  const [gameOpen, setGameOpen] = useState(false);
  const [tab, setTab] = useState(() => location.state?.openTab || 'home');
  const [glider, setGlider] = useState({ x: 0, w: 0 });
  const [tickerOn, setTickerOn] = useState(false);
  const railRef = useRef(null);
  const finishBoot = useCallback(() => setBooting(false), []);

  const updateGlider = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const active = rail.querySelector('.site-tab.is-active');
    if (!active) return;
    setGlider({ x: active.offsetLeft, w: active.offsetWidth });
  }, []);

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

  useEffect(() => {
    updateGlider();
    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(updateGlider);
    observer.observe(rail);
    window.addEventListener('resize', updateGlider);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateGlider);
    };
  }, [tab, updateGlider]);

  useEffect(() => {
    if (booting) return undefined;
    let hideId = 0;
    const showMs = 16000;
    const everyMs = 3 * 60 * 1000;

    const reveal = () => {
      setTickerOn(true);
      window.clearTimeout(hideId);
      hideId = window.setTimeout(() => setTickerOn(false), showMs);
    };

    const firstId = window.setTimeout(reveal, 900);
    const loopId = window.setInterval(reveal, everyMs);
    return () => {
      window.clearTimeout(firstId);
      window.clearTimeout(hideId);
      window.clearInterval(loopId);
    };
  }, [booting]);

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
          <div className="site-chrome">
          <nav className="site-tabs" aria-label="Primary">
            <div className="site-tabs__inner">
              <div className="site-tabs__track" ref={railRef} role="tablist">
                <span
                  className="site-tabs__glider"
                  style={{ width: glider.w, transform: `translateX(${glider.x}px)` }}
                  aria-hidden="true"
                />
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
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="site-game-btn"
                aria-label="Play Sky Rush"
                title="Play Sky Rush"
                onClick={() => setGameOpen(true)}
              >
                <SportsEsportsRounded fontSize="small" />
                <span>Play</span>
              </button>
            </div>
          </nav>
          <HiringTicker active={tickerOn} onDismiss={() => setTickerOn(false)} />
          </div>
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
