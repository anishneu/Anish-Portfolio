/** Profile + resume-sourced content for the portfolio shell */

export const profile = {
  name: 'Anish Kuila',
  headline: 'Full-Stack SDE · MS Software Engineering Systems',
  tagline: 'Building production-grade full-stack systems with FastAPI, Spring Boot, React, and Node.js.',
  status: 'Actively seeking Full-Time / Intern opportunities',
  location: 'Boston, MA',
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
    'Graduate student in Software Engineering Systems at Northeastern University. I build user-friendly, efficient software with Java, Python, and JavaScript — and frameworks like React, Spring Boot, and FastAPI.',
    'Recent work spans enterprise PLM systems, wholesale commerce platforms, role-based recipe apps, and Unity WebGL games. I care about clean APIs, RBAC, and products that feel accessible.',
    'Currently deepening cloud and enterprise software skills, and looking to contribute on teams that ship thoughtfully.',
  ],
  languages: [
    { name: 'English', level: 95 },
    { name: 'Hindi', level: 90 },
    { name: 'Bengali', level: 85 },
  ],
  skillBars: [
    { name: 'Full-Stack Web', level: 90 },
    { name: 'APIs & Backend', level: 88 },
    { name: 'React / UI', level: 85 },
    { name: 'Cloud & DevOps', level: 78 },
    { name: 'System Design', level: 80 },
  ],
  sidebarSkills: [
    'Java · Python · TypeScript',
    'React · Spring Boot · FastAPI',
    'MySQL · MongoDB · Keycloak',
    'AWS · Docker · CI/CD',
    'Figma · Unity · Git',
  ],
  stats: [
    { label: 'Featured projects', value: '8' },
    { label: 'REST APIs shipped', value: '100+' },
    { label: 'Live demos', value: '3' },
    { label: 'Graduating', value: 'Dec ’25' },
  ],
};

export const experience = [
  {
    title: 'Intern — CCTV Research',
    company: 'RVCE Centre of Excellence Internship Program',
    location: 'Bangalore, India',
    dates: 'Sep 2021 – Oct 2021',
    bullets: [
      'Engineered a computer vision solution for automated traffic signboard detection and recognition using CCTV data.',
      'Applied detection and recognition pipelines for highway sign-board readings under real-world imaging conditions.',
    ],
  },
];

export const education = [
  {
    school: 'Northeastern University',
    degree: 'M.S. in Software Engineering Systems',
    location: 'Boston, MA',
    dates: 'Expected Dec 2025',
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
    title: 'Languages',
    items: ['Java', 'C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Redux', 'Material UI', 'Bootstrap', 'Chakra UI', 'AG Grid', 'Kendo UI', 'Three.js'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Spring', 'Spring Boot', 'Hibernate', 'FastAPI', 'Django', 'REST APIs'],
  },
  {
    title: 'Data & Cloud',
    items: ['MySQL', 'MongoDB', 'AWS', 'GCP', 'Docker', 'Terraform', 'CI/CD', 'Keycloak'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Postman', 'Swagger', 'Figma', 'Linux', 'VS Code', 'Unity'],
  },
];

export const NAV_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
