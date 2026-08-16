/** Profile + resume-sourced content for the portfolio shell */

export const profile = {
  name: 'Anish Kuila',
  headline:
    'Software Engineer | Full-Stack & AI/ML | Java, Python, React, Spring Boot, SQL | MS @ Northeastern University | RVCE ’22',
  tagline: 'Building production-grade full-stack systems with FastAPI, Spring Boot, React, and Node.js.',
  status: 'Open to 2026 SWE/Full-Stack roles',
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
    'MS Software Engineering Systems graduate from Northeastern University. I build user-friendly, efficient software with Java, Python, and JavaScript — and frameworks like React, Spring Boot, and FastAPI.',
    'Recent work spans enterprise PLM systems, wholesale commerce platforms, role-based recipe apps, and Unity WebGL games. I care about clean APIs, RBAC, and products that feel accessible.',
    'Currently deepening cloud and enterprise software skills, and looking to contribute on teams that ship thoughtfully.',
  ],
  languages: [
    { name: 'English', level: 100 },
    { name: 'Hindi', level: 90 },
    { name: 'Bengali', level: 70 },
  ],
  technicalProficiency: [
    {
      name: 'Programming Languages',
      level: 95,
      items: ['Java', 'Python', 'C/C++', 'HTML', 'CSS', 'JavaScript', 'SQL', 'TypeScript', 'Go'],
    },
    {
      name: 'Frontend & UI',
      level: 90,
      items: [
        'React',
        'Vite',
        'Framer Motion',
        'Java Swing',
        'Bootstrap',
        'Material UI',
        'Kendo UI',
        'AG Grid',
        'Chakra UI',
      ],
    },
    {
      name: 'Backend & Frameworks',
      level: 92,
      items: [
        'Node.js',
        'Express.js',
        'Spring',
        'Spring Boot',
        'Hibernate',
        'Django',
        'FastAPI',
        'REST APIs',
      ],
    },
    {
      name: 'Databases & Cloud',
      level: 85,
      items: [
        'MySQL',
        'MongoDB',
        'Docker',
        'AWS',
        'GCP',
        'Terraform',
        'CI/CD (GitHub Actions)',
        'Netlify',
        'Render',
      ],
    },
    {
      name: 'Tools & Design',
      level: 88,
      items: [
        'Git',
        'Linux',
        'Postman',
        'Swagger',
        'Keycloak (OAuth2/RBAC)',
        'Figma',
        'Moqups',
        'Android Studio',
        'VS Code',
      ],
    },
    {
      name: 'AI Tooling & Dev Speed',
      level: 90,
      items: ['Cursor', 'Claude Code', 'ChatGPT', 'GitHub Copilot', 'Google Gemini'],
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
    items: ['Git', 'Linux', 'Postman', 'Swagger', 'Figma', 'VS Code'],
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
