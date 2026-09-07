# Anish Kuila — Personal Portfolio

Personal portfolio site with a working contact pipeline, a structured single-page app shell, and an embedded playable game.

This isn't a static template — the frontend is built around a dedicated `SiteShell` component that renders profile, experience, education, and skills from structured data files (`profileData.js`, `projectsData.js`) rather than hardcoded markup, with a real animation layer (GSAP reveal-on-scroll, Framer Motion, and a small custom "magic UI" component set — border beams, blur-fade, shimmer buttons, marquees) built on top. The backend is a real (if small) service: a dedicated Express API handles contact-form submissions through Resend, with a fallback SMTP path and a secrets-loading layer that reads credentials from mounted files in production rather than only `.env`. It also serves a full Unity WebGL build (Agent Berk: Sky Rush) directly from the frontend, so visitors can play a game the author built rather than just read about it.

**Stack:** React 19 · Node.js / Express · Resend (email) · Three.js · GSAP · Unity WebGL

**Author:** Anish Kuila

🚀**Live:** https://anishkuila.netlify.app

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
                  ├──▶ GET /content   (live About, Skills, Experience, Projects, resume)
                  ├──▶ profileData.js / projectsData.js  (fallback if the API is down)
                  ├──▶ skillIcons.js   (38 skill icon SVGs)
                  ├──▶ magic/          (BorderBeam, BlurFade, ShimmerButton, Marquee)
                  └──▶ SkyRushLauncher ──▶ embedded Unity WebGL build
                  │
                  ▼
        [Express API] ──▶ /email (Resend / SMTP)
                       ──▶ /content + /resume (public reads)
                       ──▶ /admin (TOTP + JWT CMS writes)
```

The public site loads About, Skills, Experience, Projects, and the resume from the Express API at render time (`GET /content`, `GET /resume`). If the API is down, it falls back to `profileData.js` / `projectsData.js`. Owner edits go through a hidden TOTP-gated admin desk and persist without a frontend redeploy (MongoDB when `MONGODB_URI` is set; otherwise files under `backend/data/`).

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
- Owner-only CMS (Ctrl+Alt+L or `?owner=1`) with TOTP unlock, CRUD for site copy, and resume upload

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
cd backend && npm start        # serves /health, /email, /content, /resume, /admin

# Frontend
cd frontend && npm start       # CRA dev server
```

Production build runs image optimization and favicon generation automatically as part of `npm run build`.

## Project structure

```
Anish-Portfolio/
├── backend/
│   └── src/
│       ├── server.js          Boot + secrets + listen
│       ├── createApp.js       Express app, CORS, routing
│       ├── loadSecrets.js      File-based secrets loader (prod-safe)
│       ├── auth/               TOTP + JWT session
│       ├── store/              Mongo or file content store
│       └── routes/             email, content, resume, admin
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
| GET | `/content` | Live profile, skills, experience, projects, resume metadata |
| GET | `/resume` | Latest uploaded resume PDF (404 if none) |
| POST | `/admin/otp` | Verify a 6-digit TOTP; issues a 15-minute JWT (rate-limited) |
| GET | `/admin/session` | Check the admin JWT/cookie |
| PUT | `/admin/:section` | Owner write for `about`, `skills`, `experience`, `projects` |
| POST/DELETE | `/admin/resume` | Replace or remove the uploaded resume |

Owner setup: `cd backend && npm run totp:setup`, add `TOTP_SECRET` and `JWT_SECRET` to `backend/.env` and Render secret files, then scan the otpauth URL in Google Authenticator. The lock control is hidden until `?owner=1` or Ctrl+Alt+L. All writes are checked server-side; the TOTP secret never ships to the frontend.

## Unity WebGL integration

The portfolio embeds a full Unity WebGL build (Agent Berk: Sky Rush) directly inside a React component, launched from the project showcase rather than linked out to an external page.

To add another Unity build:
1. Build the Unity project with the WebGL target.
2. Copy the generated build output into `frontend/public/games/<name>/`.
3. Point a launcher component (see `SkyRushLauncher.js`) at the build's `index.html`.

## Contact

- 💼 LinkedIn: [linkedin.com/in/anish-kuila](https://www.linkedin.com/in/anish-kuila/)
- 💻 GitHub: [github.com/anishneu](https://github.com/anishneu)
- 📧 Email: kuila.a@northeastern.edu

## Limitations

- Frontend tests are unused (CRA default). Backend CMS auth/content is covered by `backend` `npm test`.
- CI builds the frontend and syntax-checks / tests the backend on `main` and `develop`.
- No rate limiting on `/email/send` — a known gap flagged for hardening.
- Without `MONGODB_URI`, admin edits live in `backend/data/` and reset when Render's disk is replaced.
- Engagement metrics (e.g., hero-section interaction rates) aren't currently instrumented; any such numbers would need real analytics wired up first.

---

### Author

**Anish Kuila** — Graduate Student in Software Engineering Systems at Northeastern University.
Full-stack developer building end-to-end products across web, cloud, and game development.
