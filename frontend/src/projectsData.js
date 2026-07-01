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
      'TalonVault is a full-stack Asset Management System built with React, FastAPI (Python), MySQL, and Keycloak, designed for managing parts, controlled documents, dynamic forms, training, and PLM-style approval workflows in a single secure workspace.',
    summary:
      'Enterprise asset and operations platform with PLM workflows, document control, and Keycloak-secured APIs.',
    blurb: [
      'Talon Vault centralizes parts inventory, controlled documents, dynamic forms, training, and PLM-style approvals in one secure workspace.',
      'Built with React, FastAPI, MySQL, and Keycloak—featuring workflow states, revision handling, audit logging, dashboard analytics, and global search.',
    ],
    tags: ['React', 'FastAPI', 'Python', 'MySQL', 'REST API', 'JWT'],
    year: '2026',
    role: 'Full Stack Developer',
    highlights: [
      'Built core modules: inventory, document control, form builder, training, approvals, and admin',
      'Implemented PLM-style workflow states, revision handling, and audit logging',
      'Integrated Keycloak authentication and role-based API security',
      'Designed dashboard analytics, global search, and responsive UI for daily operations',
    ],
    metrics: [
      { label: 'Stack', value: 'React + FastAPI' },
      { label: 'Auth', value: 'Keycloak' },
    ],
    imageSeed: 'talonvault',
    shortTitle: 'Talon Vault',
    spectrum: { hue: 220, band: 'Enterprise systems' },
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 6,
    title: 'Agent Berk: Sky Rush Unity Game',
    category: 'games',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A 2D action-based endless runner built in Unity (C#), set in a futuristic sky city. Players control a hawk courier navigating fast-paced obstacles, robotic enemies, and escalating challenges through auto-scrolling gameplay.',
    summary:
      'Unity endless runner with combat, scoring, parallax visuals, and a playable WebGL build embedded in this portfolio.',
    blurb: [
      'Agent Berk: Sky Rush is a 2D endless runner set in a futuristic sky city—players guide a hawk courier through obstacles, enemies, and escalating difficulty.',
      'Built in Unity with C#, featuring core mechanics, UI flow, parallax backgrounds, and AI-assisted asset creation; playable directly from this portfolio via WebGL.',
    ],
    tags: ['Unity', 'C#', 'Game Development', '2D'],
    year: '2025',
    role: 'Game Developer',
    highlights: [
      'Implemented core mechanics: movement, collision detection, combat, scoring, and difficulty scaling',
      'Designed UI, game flow, responsive controls, and parallax backgrounds',
      'Created and integrated assets, sound effects, and music using AI tools and editing software',
      'Exported a WebGL build and embedded it in this portfolio for in-browser play at /play/sky-rush',
      'Focused on performance, player feedback, and engaging gameplay progression',
    ],
    metrics: [
      { label: 'Engine', value: 'Unity' },
      { label: 'Genre', value: '2D Runner' },
    ],
    imageSeed: 'sky-rush',
    shortTitle: 'Sky Rush',
    spectrum: { hue: 268, band: 'Game dev' },
    liveUrl: '/play/sky-rush',
    sourceUrl: '#',
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
      'A full-stack web application built to help Northeastern University students discover, manage, and engage with campus events. The platform supports Students, Organizers, and Admins, enabling a complete event lifecycle from creation and publishing to registration, waitlisting, and completion.',
    summary:
      'End-to-end campus event platform with role-based access, real-time search, and production-grade DevOps.',
    blurb: [
      'HuskyTrack helps Northeastern students discover, register for, and manage campus events in one place—with separate experiences for students, organizers, and admins.',
      'The stack pairs a React + TypeScript client with Express and MongoDB, adding JWT auth, S3 media uploads, and Dockerized CI/CD on AWS for a production-style delivery workflow.',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'AWS S3', 'Docker', 'GitHub Actions'],
    year: '2025',
    role: 'Full Stack Developer',
    highlights: [
      'Built with React + TypeScript, Node.js (Express), and MongoDB',
      'Implemented advanced event search and filtering, role-based access control, and JWT authentication',
      'Integrated debounced search, URL query synchronization, and efficient frontend state management',
      'Designed a scalable backend using a layered architecture (controllers, services, repositories)',
      'Added secure image uploads with AWS S3 and automated event status updates',
      'Applied real-world engineering practices: API documentation, testing (Jest, Supertest), and CI/CD with GitHub Actions, deployed via Docker on AWS EC2',
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
      'A mobile food-ordering app concept designed using Figma and Moqups, focused on delivering a seamless and intuitive experience similar to Uber Eats and DoorDash. The project covers end-to-end user journeys, from onboarding and restaurant discovery to checkout and real-time order tracking.',
    summary:
      'High-fidelity food delivery prototype with complete user journeys and interaction design.',
    blurb: [
      'DeliverEase reimagines mobile food ordering with flows inspired by leading delivery apps—from onboarding and menu browse to checkout and live order tracking.',
      'High-fidelity Figma and Moqups prototypes stress usability, accessibility, and visual consistency so every screen supports fast, confident decisions.',
    ],
    tags: ['Figma', 'Moqups', 'UI/UX', 'Prototyping'],
    year: '2025',
    role: 'Product / UI-UX Designer',
    highlights: [
      'Designed complete user flows: onboarding, browsing, ordering, and order tracking',
      'Created high-fidelity wireframes and interactive prototypes',
      'Emphasized usability, accessibility, visual hierarchy, and design consistency',
      'Focused on user-centered design to improve clarity, efficiency, and overall experience',
    ],
    metrics: [
      { label: 'Flows', value: '4+' },
      { label: 'Focus', value: 'Mobile UX' },
    ],
    imageSeed: 'deliverease',
    shortTitle: 'DeliverEase',
    spectrum: { hue: 32, band: 'Product design' },
    liveUrl: '#',
    sourceUrl: 'https://github.com/anishneu/Deliverease-Figma-UI-Redesign',
  },
  {
    id: 2,
    title: 'MedShop: Healthcare Inventory & Order Management Platform',
    category: 'full-stack',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584308664884-24d665340de4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587854692152260-10b097d7b9e4?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A full-stack web application built to manage medical inventory, customer orders, and stock requests for an online pharmacy platform. The system focuses on reliability, scalability, and efficient backend architecture.',
    summary:
      'Spring MVC pharmacy backend with optimized pooling, secure sessions, and inventory workflows.',
    blurb: [
      'MedShop is an online pharmacy platform for inventory, customer orders, and stock requests—built to stay reliable as catalog and order volume grow.',
      'Spring MVC and Hibernate power secure sessions and transactions, with HikariCP pooling, JSP views, and Tomcat deployment for a maintainable server-side stack.',
    ],
    tags: ['Java', 'Spring MVC', 'Hibernate', 'JSP', 'MySQL', 'HikariCP', 'Tomcat'],
    year: '2024',
    role: 'Backend / Full Stack Developer',
    highlights: [
      'Developed using Spring MVC with Hibernate for secure session handling and database transactions',
      'Optimized database performance and connection pooling using HikariCP',
      'Implemented JSP-based views for server-side rendering',
      'Deployed on Apache Tomcat 9 using NetBeans for a stable and maintainable application',
    ],
    metrics: [
      { label: 'Backend', value: 'Spring' },
      { label: 'DB', value: 'MySQL' },
    ],
    imageSeed: 'medshop',
    shortTitle: 'MedShop',
    spectrum: { hue: 165, band: 'Commerce backend' },
    liveUrl: '#',
    sourceUrl: 'https://github.com/anishneu/Medshop-Online-Medical-Store',
  },
  {
    id: 3,
    title: 'Recipe Hub - Full Stack Recipe Discovery Platform',
    category: 'full-stack',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1466637574441-749b8c194bf1?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A full-stack web application designed to streamline recipe discovery, creation, and management through a role-based platform supporting Admins, Chefs, and General Users.',
    summary:
      'Role-based recipe platform with seasonal themes, REST APIs, and real-time food news.',
    blurb: [
      'Recipe Hub streamlines discovering, creating, and managing recipes with tailored tools for admins, chefs, and everyday cooks.',
      'A React front end with Material UI and Bootstrap talks to Express REST APIs and MongoDB, with seasonal themes and live food news to keep the experience fresh.',
    ],
    tags: ['React', 'Material UI', 'Bootstrap', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    year: '2024',
    role: 'Full Stack Developer',
    highlights: [
      'Built with React.js, Material UI, and Bootstrap for a responsive and accessible frontend',
      'Developed scalable RESTful APIs using Node.js and Express.js, with MongoDB for flexible data storage',
      'Implemented role-based access control and tailored user experiences per role',
      'Integrated real-time food news updates to enhance user engagement',
      'Added seasonal UI elements (autumn, winter, monsoon themes) for an immersive, dynamic experience',
    ],
    metrics: [
      { label: 'Roles', value: '3' },
      { label: 'API', value: 'REST' },
    ],
    imageSeed: 'recipehub',
    shortTitle: 'Recipe Hub',
    spectrum: { hue: 28, band: 'Food platform' },
    liveUrl: '#',
    sourceUrl: 'https://github.com/anishneu/RecipeHub',
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
      'A computer vision project focused on accurately predicting gender from human face images using deep learning techniques.',
    summary:
      'CNN pipeline with Haar-Cascade detection, preprocessing, and gender classification.',
    blurb: [
      'This computer vision pipeline detects faces in images and predicts gender using a trained convolutional neural network.',
      'OpenCV handles localization and preprocessing, while TensorFlow layers—convolution, pooling, and dense classifiers—refine accuracy before results are visualized.',
    ],
    tags: ['Python', 'CNN', 'OpenCV', 'TensorFlow', 'Machine Learning'],
    year: '2022',
    role: 'ML / Software Developer',
    highlights: [
      'Trained a Convolutional Neural Network (CNN) on facial image datasets for gender classification',
      'Applied image pre-processing and noise reduction for improved accuracy',
      'Implemented Haar-Cascade face detection to localize facial regions',
      'Optimized model performance by combining convolution and max-pooling layers',
      'Used a fully connected layer for final gender prediction and result visualization',
    ],
    metrics: [
      { label: 'Model', value: 'CNN' },
      { label: 'Vision', value: 'OpenCV' },
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
      'A web-based hospital management platform designed to simplify access to patient records, doctor information, appointments, and diagnostic reports.',
    summary:
      'Django hospital portal with appointments, dashboards, and downloadable diagnostic reports.',
    blurb: [
      'CovidCare is a hospital management site that centralizes patient records, doctor profiles, appointments, and diagnostic reports.',
      'Django and MySQL back patient and clinician dashboards, online booking with live updates, and downloadable reports designed for clarity under pressure.',
    ],
    tags: ['Django', 'Python', 'MySQL', 'PhpMyAdmin', 'HTML', 'CSS'],
    year: '2020',
    role: 'Full Stack Developer',
    highlights: [
      'Developed a user-friendly hospital website with patient and doctor dashboards',
      'Implemented appointment booking with real-time updates',
      'Enabled downloadable diagnostic reports for improved accessibility',
      'Built a scalable database using MySQL and phpMyAdmin to enhance performance and data management',
      'Focused on usability, efficiency, and reliable system functionality',
    ],
    metrics: [
      { label: 'Stack', value: 'Django' },
      { label: 'Year', value: '2020' },
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
