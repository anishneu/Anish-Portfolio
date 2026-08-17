# Anish Kuila — Personal Portfolio

Personal portfolio site with a working contact pipeline, a structured single-page app shell, and an embedded playable game.

This isn't a static template — the frontend is built around a dedicated `SiteShell` component that renders profile, experience, education, and skills from structured data files (`profileData.js`, `projectsData.js`) rather than hardcoded markup, with a real animation layer (GSAP reveal-on-scroll, Framer Motion, and a small custom "magic UI" component set — border beams, blur-fade, shimmer buttons, marquees) built on top. The backend is a real (if small) service: a dedicated Express API handles contact-form submissions through Resend, with a fallback SMTP path and a secrets-loading layer that reads credentials from mounted files in production rather than only `.env`. It also serves a full Unity WebGL build (Agent Berk: Sky Rush) directly from the frontend, so visitors can play a game the author built rather than just read about it.

**Stack:** React 19 · Node.js / Express · Resend (email) · Three.js · GSAP · Unity WebGL

**Author:** Anish Kuila

**Live:** https://anishkuila.netlify.app

## Table of contents
- [What it does](#what-it-does)
- [Architecture](#architecture)
- [Features](#features)
- [Install](#install)
- [Quickstart](#quickstart)
- [Project structure](#project-structure)
- [API reference](#api-reference)
- [Unity WebGL integration](#unity-webgl-integration)
- [Contact](#contact)
- [Limitations](#limitations)

## What it does

```
Visitor ──▶ [SiteShell] ──▶ Home / About / Skills / Experience / Projects / Contact (tabbed nav)
                  │
                  ├──▶ profileData.js  (profile, experience, education, skill groups)
                  ├──▶ projectsData.js (8 project showcases)
                  ├──▶ skillIcons.js   (38 skill icon SVGs)
                  ├──▶ magic/          (BorderBeam, BlurFade, ShimmerButton, Marquee)
                  └──▶ SkyRushLauncher ──▶ embedded Unity WebGL build
                  │
                  ▼
        [Express /email API] ──▶ [Resend / SMTP]
```

The site is driven by structured content files rather than markup scattered across components — `profileData.js` holds the profile, experience, education, and skill-group data that `SiteShell` renders, and `NAV_TABS` defines the six-section tabbed navigation (Home, About, Skills, Experience, Projects, Contact) in one place.

## Architecture

| Layer | Technology |
|---|---|
| Frontend | React 19, MUI, Framer Motion, GSAP, @react-three/fiber (Three.js) |
| Site shell | `site/SiteShell.js` — tabbed nav, structured content rendering |
| Animation | `useGsapReveal` hook + `magic/` component set (BorderBeam, BlurFade, ShimmerButton, Marquee) |
| Backend | Express 5, CORS-restricted, dotenv + file-based secrets loader |
| Email | Resend API with SMTP fallback (Nodemailer) |
| Build tooling | Custom image optimization + favicon generation scripts run at build time |
| Hosting | Netlify (frontend), Render (backend) |

## Features

- Modern, responsive UI with dark/light mode
- Interactive project showcase (8 projects)
- Layered animation: GSAP scroll-reveal (`useGsapReveal`), Framer Motion, and custom "magic UI" components (border beams, blur-fade, shimmer buttons, marquees)
- 38-icon skill system (`skillIconData.json` + `skillIcons.js`) for a consistent tech-stack visual
- Integrated Unity WebGL game (fully playable in-browser)
- Working contact form backed by a real email API (Resend + SMTP fallback)
- Direct GitHub project links

## Install

Requires Node 18+.

```bash
git clone https://github.com/anishneu/Anish-Portfolio.git
cd Anish-Portfolio

# Backend
cd backend
npm install
cp .env.example .env   # RESEND_API_KEY or SMTP creds, CORS_ORIGINS

# Frontend
cd ../frontend
npm install
```

## Quickstart

```bash
# Backend
cd backend && npm start        # serves /health, /email/status, /email/send

# Frontend
cd frontend && npm start       # CRA dev server
```

Production build runs image optimization and favicon generation automatically as part of `npm run build`.

## Project structure

```
Anish-Portfolio/
├── backend/
│   └── src/
│       ├── server.js          Express app, health check, CORS, routing
│       ├── loadSecrets.js      File-based secrets loader (prod-safe)
│       ├── emailProvider.js    Resend/SMTP abstraction
│       └── routes/
│           └── emailRoutes.js
└── frontend/
    ├── public/games/sky_rush/  Unity WebGL build (Build, StreamingAssets, TemplateData)
    ├── src/
    │   ├── site/                 SiteShell.js, site.css, skillIcons.js, skillIconData.json (38 icons)
    │   ├── magic/                 BorderBeam, BlurFade, ShimmerButton, Marquee (+ magic.css)
    │   ├── hooks/                  useGsapReveal, usePageVisible, useRasterImageSrc
    │   ├── Components/              Home, About, Project, ProjectDetail, SkyRushLauncher, etc.
    │   ├── profileData.js            Profile, experience, education, skill groups, nav tabs
    │   └── projectsData.js           8 showcased projects
    └── scripts/                 Image optimization, favicon generation
```

## API reference

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness + email credential status |
| GET | `/email/status` | Which email provider is active/configured |
| POST | `/email/send` | Send a contact-form message (`fullName`, `senderEmail`, `message`) |

## Unity WebGL integration

The portfolio embeds a full Unity WebGL build (Agent Berk: Sky Rush) directly inside a React component, launched from the project showcase rather than linked out to an external page.

To add another Unity build:
1. Build the Unity project with the WebGL target.
2. Copy the generated build output into `frontend/public/games/<name>/`.
3. Point a launcher component (see `SkyRushLauncher.js`) at the build's `index.html`.

## Contact

- LinkedIn: [linkedin.com/in/anish-kuila](https://www.linkedin.com/in/anish-kuila/)
- GitHub: [github.com/anishneu](https://github.com/anishneu)
- Email: kuila.a@northeastern.edu

## Limitations

- No automated tests currently (CRA's default test script is present but unused).
- No CI/CD pipeline — deploys are manual pushes to Netlify/Render.
- No rate limiting on `/email/send` — a known gap flagged for hardening.
- Engagement metrics (e.g., hero-section interaction rates) aren't currently instrumented; any such numbers would need real analytics wired up first.

---

### Author

**Anish Kuila** — Graduate Student in Software Engineering Systems at Northeastern University.
Full-stack developer building end-to-end products across web, cloud, and game development.
