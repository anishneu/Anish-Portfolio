const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

/** Devicon paths for project tag chips */
export const TAG_ICONS = {
  React: `${DEVICON}/react/react-original.svg`,
  TypeScript: `${DEVICON}/typescript/typescript-original.svg`,
  'Node.js': `${DEVICON}/nodejs/nodejs-original.svg`,
  Express: `${DEVICON}/express/express-original.svg`,
  MongoDB: `${DEVICON}/mongodb/mongodb-original.svg`,
  Java: `${DEVICON}/java/java-original.svg`,
  'Spring MVC': `${DEVICON}/spring/spring-original.svg`,
  Hibernate: `${DEVICON}/hibernate/hibernate-original.svg`,
  MySQL: `${DEVICON}/mysql/mysql-original.svg`,
  Python: `${DEVICON}/python/python-original.svg`,
  Django: `${DEVICON}/django/django-plain.svg`,
  TensorFlow: `${DEVICON}/tensorflow/tensorflow-original.svg`,
  Docker: `${DEVICON}/docker/docker-original.svg`,
  'GitHub Actions': `${DEVICON}/githubactions/githubactions-original.svg`,
  Bootstrap: `${DEVICON}/bootstrap/bootstrap-original.svg`,
  'Material UI': `${DEVICON}/materialui/materialui-original.svg`,
  Figma: `${DEVICON}/figma/figma-original.svg`,
  HTML: `${DEVICON}/html5/html5-original.svg`,
  CSS: `${DEVICON}/css3/css3-original.svg`,
  'REST API': `${DEVICON}/nestjs/nestjs-original.svg`,
  JWT: `${DEVICON}/json/json-original.svg`,
  'AWS S3': `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  OpenCV: `${DEVICON}/opencv/opencv-original.svg`,
  Tomcat: `${DEVICON}/tomcat/tomcat-original.svg`,
  JSP: `${DEVICON}/java/java-original.svg`,
  HikariCP: `${DEVICON}/java/java-original.svg`,
  Moqups: `${DEVICON}/figma/figma-original.svg`,
  PhpMyAdmin: `${DEVICON}/mysql/mysql-original.svg`,
  CNN: `${DEVICON}/tensorflow/tensorflow-original.svg`,
  'Machine Learning': `${DEVICON}/tensorflow/tensorflow-original.svg`,
  Prototyping: `${DEVICON}/figma/figma-original.svg`,
  'UI/UX': `${DEVICON}/figma/figma-original.svg`,
};

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All work' },
  { id: 'full-stack', label: 'Full stack' },
  { id: 'design', label: 'UI / UX' },
  { id: 'ml', label: 'Machine learning' },
  { id: 'healthcare', label: 'Healthcare' },
];

export function getTagIcon(tag) {
  return TAG_ICONS[tag] || null;
}

export function getCategoryLabel(categoryId) {
  return PROJECT_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId;
}

export function filterProjects(projects, categoryId) {
  if (!categoryId || categoryId === 'all') return projects;
  return projects.filter((p) => p.category === categoryId);
}

export function formatProjectIndex(index) {
  return String(index + 1).padStart(2, '0');
}
