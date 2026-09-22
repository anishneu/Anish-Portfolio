/** Profile + resume-sourced content for the portfolio shell */

export const profile = {
  name: 'Anish Kuila',
  headline:
    'Software Engineer | Full-Stack & AI/ML | Java, Python, React, Spring Boot, SQL | MS @ Northeastern University | RVCE ’22',
  tagline: 'Building production-grade full-stack systems with FastAPI, Spring Boot, React, and Node.js.',
  status: 'Open to 2026 Software Engineer/Full-Stack roles',
  ticker:
    'Open to 2026 Software Engineer/Full-Stack roles — full-time & intern · Willing to relocate to any city in the US',
  location: 'Boston, Massachusetts',
  residence: 'Boston, Massachusetts',
  phone: '+1 (617) 581-5833',
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
      name: 'Languages',
      level: 95,
      badges: ['Java', 'Python', 'C++', 'TypeScript', 'JavaScript', 'SQL', 'Go', 'Shell'],
    },
    {
      name: 'Frontend',
      level: 90,
      badges: ['React', 'Vite', 'Tailwind', 'Material UI', 'Chakra UI', 'Java Swing', 'Figma'],
    },
    {
      name: 'Backend',
      level: 92,
      badges: ['Spring Boot', 'FastAPI', 'Django', 'Node.js', 'Express', 'Keycloak', 'JWT'],
    },
    {
      name: 'AI / ML',
      level: 88,
      badges: ['TensorFlow', 'Keras', 'scikit-learn', 'OpenCV', 'Hugging Face', 'Ollama', 'RAG', 'Agentic AI'],
    },
    {
      name: 'Data & Cloud',
      level: 85,
      badges: ['MySQL', 'MongoDB', 'Docker', 'AWS', 'GCP', 'Terraform', 'GitHub Actions', 'Netlify'],
    },
    {
      name: 'Tools',
      level: 90,
      badges: ['Git', 'GitHub', 'Linux', 'Postman', 'Cypress', 'Maven', 'Android Studio', 'VS Code'],
    },
  ],
  certifications: [
    {
      title: 'Problem Solving (Intermediate)',
      issuer: 'HackerRank',
      issued: 'Mar 2026',
      url: 'https://www.hackerrank.com/certificates/ed4e7fc70fcd',
    },
    {
      title: 'AI Engineer Bootcamp 2025',
      issuer: 'Udemy',
      issued: 'Sep 2025',
    },
    {
      title: 'Spring Boot 3, Spring 6 & Hibernate',
      issuer: 'Udemy',
      issued: 'Jul 2024',
    },
    {
      title: 'Complete Web Development Bootcamp',
      issuer: 'Udemy',
      issued: 'Jan 2024',
    },
    {
      title: 'Java For Beginners',
      issuer: 'Scaler',
      issued: 'Nov 2022',
    },
    {
      title: 'Joy of Computing using Python',
      issuer: 'NPTEL',
      issued: 'Dec 2020',
    },
    {
      title: 'GCP Fundamentals: Core Infrastructure',
      issuer: 'Coursera',
      issued: 'Nov 2020',
    },
    {
      title: 'Software Development Processes',
      issuer: 'Coursera',
      issued: 'Nov 2020',
    },
  ],
  stats: [
    { label: 'Featured projects', value: '13' },
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
    items: ['Java', 'Python', 'C', 'C++', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'SQL', 'Go', 'Shell'],
  },
  {
    title: 'Frontend & UI',
    items: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'Material UI',
      'Chakra UI',
      'Bootstrap',
      'Kendo UI',
      'AG Grid',
      'Java Swing',
      'Framer Motion',
      'Figma',
    ],
  },
  {
    title: 'Backend & Frameworks',
    items: [
      'Spring Boot',
      'Hibernate',
      'FastAPI',
      'Django',
      'Node.js',
      'Express',
      'REST APIs',
      'JWT',
      'Keycloak',
      'Maven',
    ],
  },
  {
    title: 'AI / Machine Learning',
    items: [
      'TensorFlow',
      'Keras',
      'scikit-learn',
      'OpenCV',
      'pandas',
      'NumPy',
      'CNN',
      'Hugging Face',
      'Ollama',
      'RAG',
      'Agentic AI',
    ],
  },
  {
    title: 'Databases & Cloud',
    items: ['MySQL', 'MongoDB', 'SQLite', 'Docker', 'AWS', 'GCP', 'Terraform', 'CI/CD', 'GitHub Actions'],
  },
  {
    title: 'Tools & Fundamentals',
    items: [
      'Git',
      'GitHub',
      'Linux',
      'Unix',
      'Postman',
      'Swagger',
      'Cypress',
      'JUnit',
      'Android Studio',
      'VS Code',
    ],
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
