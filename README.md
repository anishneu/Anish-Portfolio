# 🌐 Anish Kuila — Portfolio

Personal portfolio site with a working contact pipeline and an embedded playable game.

This isn't a static template — the frontend renders 8 project showcases with a Three.js hero section and Framer Motion animations, and the backend is a real (if small) service: a dedicated Express API handles contact-form submissions through Resend, with a fallback SMTP path and a secrets-loading layer that reads credentials from mounted files in production rather than only `.env`. It also serves a full Unity WebGL build (Agent Berk: Sky Rush) directly from the frontend, so visitors can play a game the author built rather than just read about it.

**🛠️ Stack:** React 19 · Node.js / Express · Resend (email) · Three.js · Unity WebGL

**✍️ Author:** Anish Kuila

**🚀 Live:** https://anishkuila.netlify.app

## 📌 Table of contents
- [🧭 What it does](#-what-it-does)
- [🏗️ Architecture](#️-architecture)
- [✨ Features](#-features)
- [⚙️ Install](#️-install)
- [▶️ Quickstart](#️-quickstart)
- [📂 Project structure](#-project-structure)
- [🔌 API reference](#-api-reference)
- [🎮 Unity WebGL integration](#-unity-webgl-integration)
- [📬 Contact](#-contact)

## 🧭 What it does

```
Visitor ──▶ [React frontend] ──▶ [Express /email API] ──▶ [Resend / SMTP]
                  │
                  ├──▶ Three.js hero section
                  ├──▶ 8 project showcases (projectsData.js)
                  └──▶ Embedded Unity WebGL build (Sky Rush)
```

The contact form doesn't just fire-and-forget an email — the backend exposes a `/health` check and an `/email/status` endpoint reporting which credential source is active, so deployment issues (e.g., a platform blocking outbound SMTP) are diagnosable rather than silent.

## ✨ Features

- 🎨 Modern, responsive UI with dark/light mode
- 🖱️ Interactive project showcase (8 projects)
- 🌀 Smooth Framer Motion + GSAP animations
- 🕹️ Integrated Unity WebGL game (fully playable in-browser)
- ✉️ Working contact form backed by a real email API (Resend + SMTP fallback)
- 🔗 Direct GitHub project links

## 🏗️ Architecture

| Layer | Technology |
|---|---|
| 🖥️ Frontend | React 19, MUI, Framer Motion, GSAP, @react-three/fiber (Three.js) |
| 🔧 Backend | Express 5, CORS-restricted, dotenv + file-based secrets loader |
| 📧 Email | Resend API with SMTP fallback (Nodemailer) |
| 🏭 Build tooling | Custom image optimization + favicon generation scripts run at build time |
| ☁️ Hosting | Netlify (frontend), Render (backend) |

## ⚙️ Install

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

## ▶️ Quickstart

```bash
# Backend
cd backend && npm start        # serves /health, /email/status, /email/send

# Frontend
cd frontend && npm start       # CRA dev server
```

Production build runs image optimization and favicon generation automatically as part of `npm run build`.

## 📂 Project structure

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
    │   ├── Components/          Home, About, Project, ProjectDetail, SkyRushLauncher, etc.
    │   └── projectsData.js       8 showcased projects
    └── scripts/                 Image optimization, favicon generation
```

## 🔌 API reference

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Liveness + email credential status |
| `GET` | `/email/status` | Which email provider is active/configured |
| `POST` | `/email/send` | Send a contact-form message (`fullName`, `senderEmail`, `message`) |

## 🎮 Unity WebGL integration

The portfolio embeds a full Unity WebGL build (**Agent Berk: Sky Rush**) directly inside a React component, launched from the project showcase rather than linked out to an external page.

To add another Unity build:
1. 🎮 Build the Unity project with the **WebGL** target
2. 📁 Copy the generated build output into `frontend/public/games/<name>/`
3. 🚀 Point a launcher component (see `SkyRushLauncher.js`) at the build's `index.html`

## 📬 Contact

- 💼 LinkedIn: [linkedin.com/in/anish-kuila](https://www.linkedin.com/in/anish-kuila/)
- 💻 GitHub: [github.com/anishneu](https://github.com/anishneu)
- 📧 Email: kuila.a@northeastern.edu

### ✨ Author

**Anish Kuila** — Graduate Student in Software Engineering Systems at Northeastern University.
Full-stack developer building end-to-end products across web, cloud, and game development.

