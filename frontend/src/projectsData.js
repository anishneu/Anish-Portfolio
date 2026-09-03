export const projects = [
  {
    id: 7,
    title: 'Talon Vault - Enterprise Asset & Operations Management System',
    category: 'full-stack',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Enterprise-grade asset and operations platform with PLM workflows, five-tier RBAC via Keycloak, multi-step approvals, and immutable audit trails across parts, documents, forms, and training.',
    summary:
      'React + FastAPI PLM system with Keycloak RBAC, 66 REST endpoints, and full audit/workflow history.',
    blurb: [
      'Talon Vault centralizes parts inventory, controlled documents, dynamic forms, training, and PLM-style approvals in one secure workspace.',
      'Built with React 19, FastAPI, MySQL, and Keycloak—featuring Draft → Released lifecycles, 35+ permission flags, dashboard analytics, and Cypress end-to-end tests.',
    ],
    tags: ['React', 'FastAPI', 'Python', 'MySQL', 'Keycloak', 'Cypress', 'REST API', 'JWT'],
    year: '2026',
    role: 'Full Stack Developer',
    highlights: [
      'Built core modules: inventory, document control, form builder, training, approvals, and admin',
      'Implemented PLM-style workflow states, revision handling, and immutable audit logging',
      'Integrated Keycloak authentication with a five-tier RBAC model (35+ permission flags)',
      'Delivered 66 REST endpoints across 11 route modules over 24 MySQL tables',
      'Designed dashboard analytics, AG Grid / Kendo grids, and responsive UI for daily operations',
      'Covered core PLM workflows with Cypress end-to-end tests',
    ],
    metrics: [
      { label: 'APIs', value: '66' },
      { label: 'Auth', value: 'Keycloak' },
    ],
    imageSeed: 'talonvault',
    shortTitle: 'Talon Vault',
    spectrum: { hue: 220, band: 'Enterprise systems' },
    liveUrl: '#',
    sourceUrl: 'https://github.com/anishneu/Enterprise-Asset-Management-System-PLM',
  },
  {
    id: 2,
    title: 'Medicence Supplies - Medical Wholesale Commerce Platform',
    category: 'full-stack',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584308664884-24d665340de4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587854692152260-10b097d7b9e4?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Modern medical wholesale commerce platform for catalog browsing, carts, fulfillment, supplier replenishment, and support tickets—rebuilt as a REST API + SPA from a legacy Spring MVC store.',
    summary:
      'Spring Boot 3 + React/TypeScript commerce app with JWT roles, live demo, and CI/CD.',
    blurb: [
      'Medicence Supplies modernizes medical inventory and ordering with customer catalog/checkout, supplier stock requests, and admin fulfillment plus support queues.',
      'React + TypeScript (Vite) talks to Spring Boot 3 APIs with JWT auth, MySQL persistence, OpenAPI docs, and Dockerized CI/CD—deployed live on Netlify + Render.',
    ],
    tags: [
      'React',
      'TypeScript',
      'Spring Boot',
      'Java',
      'MySQL',
      'JWT',
      'Docker',
      'GitHub Actions',
    ],
    year: '2026',
    role: 'Full Stack Developer',
    highlights: [
      'Rebuilt legacy Medshop into a Spring Boot 3 REST API with a React/TypeScript SPA',
      'Implemented three roles (Admin, Customer, Supplier) with server-side Spring Security enforcement',
      'Delivered catalog search/filter, orders, stock requests, support tickets, and admin dashboards (26 endpoints)',
      'Added OpenAPI/Swagger docs, JUnit + Vitest tests, and GitHub Actions CI/CD',
      'Deployed frontend to Netlify and backend to Render with Docker Compose support',
    ],
    metrics: [
      { label: 'APIs', value: '26' },
      { label: 'Roles', value: '3' },
    ],
    imageSeed: 'medicence',
    shortTitle: 'Medicence',
    spectrum: { hue: 165, band: 'Commerce platform' },
    liveUrl: 'https://anish-medicencesupplies.netlify.app/',
    sourceUrl: 'https://github.com/anishneu/MedicenceSupplies-Medical-Store-Platform',
  },
  {
    id: 3,
    title: 'Recipe Hub - Full Stack Recipe Discovery Platform',
    category: 'full-stack',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1466637574441-749b8c194bf1?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Full-stack, role-based recipe discovery and publishing platform with chef publishing tools, saved collections, culinary news, and seasonal UI theming.',
    summary:
      'React + Express + MongoDB recipe platform with JWT auth, Swagger docs, and a live demo.',
    blurb: [
      'Recipe Hub lets general users, chefs, and admins interact with a shared catalog differently—discover and save, publish and manage, or administer the hub.',
      'React 18 with Redux/Chakra/MUI talks to Express REST APIs on MongoDB Atlas, with JWT + bcrypt auth, Swagger docs, and live culinary news.',
    ],
    tags: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API', 'Material UI'],
    year: '2024',
    role: 'Full Stack Developer',
    highlights: [
      'Built role-based experiences for Admin, Chef, and General User over 24 REST endpoints',
      'Implemented tag/ingredient/rating search, per-user saved recipes, and aggregated ratings',
      'Documented the API with Swagger and secured auth with JWT + bcrypt',
      'Added culinary news feed, Nodemailer email flows, and seasonal UI themes',
      'Deployed live on Netlify (frontend), Render (backend), and MongoDB Atlas',
    ],
    metrics: [
      { label: 'Roles', value: '3' },
      { label: 'APIs', value: '24' },
    ],
    imageSeed: 'recipehub',
    shortTitle: 'Recipe Hub',
    spectrum: { hue: 28, band: 'Food platform' },
    liveUrl: 'https://anish-recipehub.netlify.app/',
    sourceUrl: 'https://github.com/anishneu/RecipeHub-Full-Stack-Recipe-Discovery-Platform',
  },
  {
    id: 6,
    title: 'Agent Berk: Sky Rush Unity Game',
    category: 'games',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A 2D action endless runner built in Unity (C#) with shooting, boss encounters, parallax visuals, and a playable WebGL build embedded in this portfolio.',
    summary:
      'Unity 6 endless runner with boss fights, scoring systems, and in-browser WebGL play.',
    blurb: [
      'Agent Berk: Sky Rush is a side-scrolling runner where players fly automatically, dodge and shoot obstacles, and face milestone boss encounters.',
      'Built in Unity 6 with C#—23 gameplay scripts covering combat, spawning, audio, settings persistence, and WebGL deployment for in-portfolio play.',
    ],
    tags: ['Unity', 'C#', 'Game Development', '2D'],
    year: '2025',
    role: 'Game Developer',
    highlights: [
      'Implemented movement, shooting, collision, scoring multipliers, and distance-based difficulty',
      'Designed boss encounters at distance milestones with paused obstacle spawning and resume flow',
      'Built pause/settings UI, tutorials, story intro, parallax camera, and PlayerPrefs persistence',
      'Exported a WebGL build and embedded it in this portfolio at /play/sky-rush',
      'Course project for CSYE7270 — Building Virtual Environments (Northeastern University)',
    ],
    metrics: [
      { label: 'Engine', value: 'Unity 6' },
      { label: 'Scripts', value: '23' },
    ],
    imageSeed: 'sky-rush',
    shortTitle: 'Sky Rush',
    spectrum: { hue: 268, band: 'Game dev' },
    liveUrl: '/play/sky-rush',
    sourceUrl: 'https://github.com/anishneu/2D-Endless-Runner-Unity-Game',
  },
  {
    id: 0,
    title: 'HuskyTrack: Campus Life Tracker',
    category: 'full-stack',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A full-stack web application built to help Northeastern University students discover, manage, and engage with campus events. The platform supports Students, Organizers, and Admins across the full event lifecycle.',
    summary:
      'End-to-end campus event platform with role-based access, real-time search, and production-grade DevOps.',
    blurb: [
      'HuskyTrack helps Northeastern students discover, register for, and manage campus events—with separate experiences for students, organizers, and admins.',
      'React + TypeScript pairs with Express and MongoDB, adding JWT auth, S3 media uploads, and Dockerized CI/CD on AWS for a production-style delivery workflow.',
    ],
    tags: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'JWT',
      'AWS S3',
      'Docker',
      'GitHub Actions',
    ],
    year: '2025',
    role: 'Full Stack Developer',
    highlights: [
      'Built with React + TypeScript, Node.js (Express), and MongoDB',
      'Implemented advanced event search and filtering, role-based access control, and JWT authentication',
      'Integrated debounced search, URL query synchronization, and efficient frontend state management',
      'Designed a scalable backend using layered architecture (controllers, services, repositories)',
      'Added secure image uploads with AWS S3 and automated event status updates',
      'Applied real-world practices: API docs, Jest/Supertest testing, GitHub Actions CI/CD, Docker on AWS EC2',
    ],
    metrics: [
      { label: 'User roles', value: '3' },
      { label: 'Stack', value: 'MERN+' },
    ],
    imageSeed: 'huskytrack',
    shortTitle: 'HuskyTrack',
    spectrum: { hue: 210, band: 'Campus systems' },
    liveUrl: '#',
    sourceUrl: 'https://github.com/CSYE7230-group4/huskytrack',
  },
  {
    id: 1,
    title: 'DeliverEase: UI/UX Application',
    category: 'design',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A mobile food-ordering app concept designed in Figma, covering end-to-end journeys from onboarding and restaurant discovery to checkout and real-time order tracking.',
    summary:
      'High-fidelity food delivery prototype with 12 screens across 7 full user-journey areas.',
    blurb: [
      'DeliverEase reimagines mobile food ordering with connected high-fidelity flows—from onboarding and menu browse to checkout and live order tracking.',
      'Twelve exported Figma screens plus custom icon sets emphasize usability, accessibility, and visual consistency across discovery, cart, tracking, profile, and support.',
    ],
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    year: '2026',
    role: 'Product / UI-UX Designer',
    highlights: [
      'Designed complete user flows: onboarding, browsing, ordering, tracking, profile, and support',
      'Exported 12 high-fidelity screens covering 7 journey areas',
      'Included 11 custom icon assets (Iconly + Linear sets)',
      'Focused on clearer checkout and tracking UX improvements vs. typical delivery apps',
    ],
    metrics: [
      { label: 'Screens', value: '12' },
      { label: 'Focus', value: 'Mobile UX' },
    ],
    imageSeed: 'deliverease',
    shortTitle: 'DeliverEase',
    spectrum: { hue: 32, band: 'Product design' },
    liveUrl: '#',
    sourceUrl: 'https://github.com/anishneu/Deliverease-Figma-UI-Redesign',
  },
  {
    id: 4,
    title: 'Face Detection and Gender Identification using Deep Learning',
    category: 'ml',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Computer vision pipeline that locates faces with Haar cascades, then classifies gender with a from-scratch CNN trained on CelebA.',
    summary:
      'OpenCV + TensorFlow/Keras CNN pipeline with strong CelebA validation accuracy.',
    blurb: [
      'A two-stage vision pipeline detects faces, crops each region to 96×96, and predicts male/female with a hand-built Keras CNN.',
      'Trained on a CelebA subset with augmentation, BatchNorm, and Dropout—handling multi-face images without a pretrained backbone.',
    ],
    tags: ['Python', 'CNN', 'OpenCV', 'TensorFlow', 'Machine Learning'],
    year: '2022',
    role: 'ML / Software Developer',
    highlights: [
      'Trained a Sequential CNN on CelebA (2,400 images, 80/20 split) with Adam + data augmentation',
      'Achieved 99.97% male and 94.18% female classification accuracy on the validation set',
      'Used OpenCV Haar cascades for multi-face localization before classification',
      'Applied BatchNormalization, Dropout, and geometric augmentation for regularization',
      'Kept detection simple so the focus stayed on classifier design and evaluation',
    ],
    metrics: [
      { label: 'Male acc.', value: '99.97%' },
      { label: 'Female acc.', value: '94.18%' },
    ],
    imageSeed: 'face-cnn',
    shortTitle: 'Face CNN',
    spectrum: { hue: 280, band: 'Computer vision' },
    liveUrl: '#',
    sourceUrl: 'https://github.com/anishneu/Face-Detection-and-Gender-Recognition',
  },
  {
    id: 5,
    title: 'CovidCare: Healthcare Service System',
    category: 'healthcare',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Django hospital management system with admin approval workflows for doctors, patients, and appointments, plus PDF discharge summaries.',
    summary:
      'Server-rendered Django portal with 55 routes, role dashboards, and xhtml2pdf discharge exports.',
    blurb: [
      'CovidCare manages doctor/patient signup approvals, appointment approve/reject flows, and discharge summaries in one hospital admin workflow.',
      'Classic Django templates extend contrib.auth via Doctor/Patient profiles—54 views, 58 templates, and PDF discharge generation with xhtml2pdf.',
    ],
    tags: ['Django', 'Python', 'SQLite', 'HTML', 'CSS'],
    year: '2020',
    role: 'Full Stack Developer',
    highlights: [
      'Built doctor and patient dashboards gated behind admin approve/reject workflows',
      'Implemented appointment booking with the same approve/reject pattern',
      'Generated downloadable PDF discharge summaries with xhtml2pdf',
      'Delivered 55 URL routes across 4 core models and 58 HTML templates',
      'Focused on clear admin controls and reliable server-rendered UX',
    ],
    metrics: [
      { label: 'Routes', value: '55' },
      { label: 'Stack', value: 'Django' },
    ],
    imageSeed: 'covidcare',
    shortTitle: 'CovidCare',
    spectrum: { hue: 195, band: 'Health services' },
    liveUrl: '#',
    sourceUrl: 'https://github.com/anishneu/Covidcare-Healthcare-Service-System',
  },
];

/** Reliable fallback if remote image fails */
export function getProjectFallbackCover(project) {
  const seed = project?.imageSeed ?? `project-${project?.id ?? 0}`;
  return `https://picsum.photos/seed/${seed}/1200/750`;
}

/** Cover for cards — use `.jpg` or `.png`; the other extension is tried automatically on load failure */
export function getProjectCover(project) {
  if (project?.image) return project.image;
  return getProjectFallbackCover(project);
}

export function getProjectGallery(project) {
  if (project?.gallery?.length) return project.gallery;
  return [getProjectCover(project)];
}

/** Short paragraphs for the portfolio project section */
export function getProjectBlurb(project) {
  if (project?.blurb?.length) return project.blurb;
  if (project?.summary) return [project.summary];
  return [project?.description ?? ''];
}

export const projectStats = {
  count: projects.length,
  techCount: new Set(projects.flatMap((p) => p.tags)).size,
  yearSpan: `${Math.min(...projects.map((p) => Number(p.year)))}–${Math.max(...projects.map((p) => Number(p.year)))}`,
};
