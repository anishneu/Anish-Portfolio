/** Profile + resume-sourced content for the portfolio shell */

export const profile = {
  name: 'Anish Kuila',
  headline:
    'Software Engineer | Full-Stack & AI/ML | Java, Python, React, Spring Boot, SQL | MS @ Northeastern University | RVCE ’22',
  tagline: 'Building production-grade full-stack systems with FastAPI, Spring Boot, React, and Node.js.',
  status: 'Open to 2026 SWE/Full-Stack roles',
  ticker:
    'Open to 2026 SWE/Full-Stack roles — full-time & intern · Willing to relocate to any city in the US',
  location: 'Boston, Massachusetts',
  residence: 'Boston, Massachusetts',
  phone: '(617) 581-5833',
  citizenship: 'US Citizen',
  emails: {
    primary: 'anishkuila006@gmail.com',
    school: 'kuila.a@northeastern.edu',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/anish-kuila/',
    github: 'https://github.com/anishneu',
    portfolio: 'https://anishkuila.netlify.app',
  },
  quote: {
    text: 'The best way to predict the future is to create it.',
    attribution: 'Peter Drucker',
  },
  about: [
    'I’m Anish — a software engineer in Boston who likes building products people can actually pick up and use. I just finished my M.S. in Software Engineering Systems at Northeastern, after a B.E. in Computer Science at R.V. College of Engineering in Bangalore.',
    'Most of my recent work sits between APIs and interfaces: enterprise PLM workflows, a medical wholesale commerce platform, a recipe app with real auth, and a Unity game you can play in the browser. I care about systems that stay clear when they get complicated — clean contracts, sensible access control, and UIs that don’t make you fight them.',
    'Day to day I write a lot of Java, Python, and JavaScript, usually with Spring Boot, FastAPI, and React. Lately I’ve been going deeper on cloud delivery and AI-assisted workflows, because that’s how I want to ship on a team: fast, but not sloppy.',
  ],
  languages: [
    { name: 'English', level: 100 },
    { name: 'Hindi', level: 80 },
    { name: 'Bengali', level: 70 },
  ],
  technicalProficiency: [
    {
      name: 'Programming Languages',
      level: 95,
      items: [
        'Java, Python',
        'C/C++',
        'HTML, CSS',
        'JavaScript, TypeScript',
        'SQL, Go',
      ],
    },
    {
      name: 'Frontend & UI',
      level: 90,
      items: [
        'React, Vite',
        'Framer Motion',
        'Java Swing, Bootstrap',
        'Material UI, Kendo UI, AG Grid, Chakra UI',
      ],
    },
    {
      name: 'Backend & Frameworks',
      level: 92,
      items: [
        'Node.js, Express.js',
        'Spring, Spring Boot, Hibernate',
        'Django, FastAPI',
        'REST APIs',
      ],
    },
    {
      name: 'Databases & Cloud',
      level: 85,
      items: [
        'MySQL, MongoDB',
        'Docker, AWS, GCP',
        'Terraform, CI/CD (GitHub Actions)',
        'Netlify, Render',
      ],
    },
    {
      name: 'Tools & Design',
      level: 88,
      items: [
        'Git, Linux',
        'Postman, Swagger, Cypress',
        'Keycloak (OAuth2/RBAC)',
        'Figma, Moqups',
        'Android Studio, VS Code',
      ],
    },
    {
      name: 'AI Tooling & Dev Speed',
      level: 90,
      items: ['Cursor, Claude Code', 'ChatGPT, GitHub Copilot, Google Gemini'],
    },
  ],
  stats: [
    { label: 'Featured projects', value: '8' },
    { label: 'REST APIs shipped', value: '100+' },
    { label: 'Live demos', value: '3' },
    { label: 'Graduated', value: 'Dec ’25' },
  ],
};

export const experience = [
  {
    title: 'Intern — CCTV Research',
    company: 'RVCE Centre of Excellence Internship Program',
    location: 'Bangalore, India',
    dates: 'Sep 2021 – Dec 2021',
    bullets: [
      'Achieved ~85% accuracy across 40+ traffic sign classes by optimizing a Faster R-CNN pipeline on ~5000 CCTV images.',
      'Trained a vision model using data augmentation to handle blur, lighting variance, and occlusion in actual CCTV footage.',
      'Processed and prepared 5,000 real-world CCTV images for robust model training under noisy field conditions.',
      'Collaborated with a 3-member team to design, evaluate, and fine-tune the high-accuracy detection pipeline.',
    ],
  },
];

export const education = [
  {
    school: 'Northeastern University',
    degree: 'M.S. in Software Engineering Systems',
    location: 'Boston, MA',
    dates: 'Graduated Dec 2025',
    courses: [
      'Object Oriented Design',
      'Web Design',
      'Program Structures and Algorithms',
      'Enterprise Software Design',
      'Network Structures and Cloud Computing',
      'User Experience Design/Testing',
      'Building Virtual Environments',
    ],
  },
  {
    school: 'R.V. College of Engineering',
    degree: 'B.E. in Computer Science Engineering',
    location: 'Bangalore, India',
    dates: 'Aug 2022',
    courses: [
      'Data Structures and its Applications',
      'Design and Analysis of Algorithms',
      'Database Design',
      'Software Engineering',
      'Operating Systems',
      'Artificial Intelligence and Machine Learning',
      'Mobile App Development',
    ],
  },
];

export const skillGroups = [
  {
    title: 'Programming Languages',
    items: ['Java', 'Python', 'C', 'C++', 'HTML', 'CSS', 'JavaScript', 'SQL', 'TypeScript', 'Go'],
  },
  {
    title: 'Frontend & UI',
    items: ['React', 'Vite', 'Framer Motion', 'Bootstrap', 'Material UI', 'Kendo UI', 'AG Grid', 'Chakra UI'],
  },
  {
    title: 'Backend & Frameworks',
    items: ['Node.js', 'Express', 'Spring', 'Spring Boot', 'Hibernate', 'Django', 'FastAPI', 'REST APIs'],
  },
  {
    title: 'Databases & Cloud',
    items: ['MySQL', 'MongoDB', 'Docker', 'AWS', 'GCP', 'Terraform', 'CI/CD', 'Keycloak'],
  },
  {
    title: 'Tools & Design',
    items: ['Git', 'Linux', 'Postman', 'Swagger', 'Cypress', 'Figma', 'VS Code'],
  },
  {
    title: 'AI Tooling',
    items: ['Cursor', 'Claude Code', 'ChatGPT', 'GitHub Copilot', 'Google Gemini'],
  },
];

export const NAV_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
