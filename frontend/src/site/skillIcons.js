import skillIconData from './skillIconData.json';

/** Brand color overrides when pack hex is too dark for this UI. */
const HEX_OVERRIDE = {
  AWS: 'FF9900',
  Express: 'E39774',
};

/** Alias skill labels to pack keys. */
const ALIAS = {
  'Java Swing': 'Java',
  'Express.js': 'Express',
  'Tailwind CSS': 'Tailwind',
  'Node': 'Node.js',
};

/** Compact custom marks for brands missing from the icon pack. */
const CUSTOM = {
  'VS Code': {
    path: 'M17.25 2.1 9.9 7.65 5.1 4.05 2.25 5.7v12.6l2.85 1.65 4.8-3.6 7.35 5.55L21.75 19.5V4.5zm0 3.3v13.2l-6.3-4.65V9.9zM5.1 7.35l2.7 1.95v5.4l-2.7 1.95z',
    hex: '007ACC',
    viewBox: '0 0 24 24',
  },
  'REST APIs': {
    path: 'M4 7h16v2H4zm0 4h10v2H4zm0 4h16v2H4z',
    hex: '009688',
    viewBox: '0 0 24 24',
  },
  'AG Grid': {
    path: 'M3 4h18v4H3zm0 6h11v4H3zm0 6h18v4H3z',
    hex: 'FF5A00',
    viewBox: '0 0 24 24',
  },
  'Kendo UI': {
    path: 'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z',
    hex: 'FF6358',
    viewBox: '0 0 24 24',
  },
  Cypress: {
    path: 'M12 2a10 10 0 1 0 9.2 13.9l-2.2-1.3A7.8 7.8 0 1 1 12 4.2c2.1 0 4 .85 5.4 2.2l1.7-1.7A10 10 0 0 0 12 2zm.1 6.4c2.2 0 3.9 1.5 4.2 3.6H8c.3-2.1 2-3.6 4.1-3.6zm-4.4 5.2h8.6c-.4 2-2.1 3.5-4.3 3.5s-3.9-1.5-4.3-3.5z',
    hex: '69D3A7',
    viewBox: '0 0 24 24',
  },
  RAG: {
    path: 'M4 4h7v5H4zm9 0h7v9h-7zM4 11h7v9H4zm9 11 3.5-5H21l-3.5 5z',
    hex: 'B794F6',
    viewBox: '0 0 24 24',
  },
  'Agentic AI': {
    path: 'M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4zm-1 8.5a1.5 1.5 0 1 0-0.001 0zm2 0a1.5 1.5 0 1 0-0.001 0zM9 16.2c.8.8 1.8 1.3 3 1.3s2.2-.5 3-1.3',
    hex: 'E39774',
    viewBox: '0 0 24 24',
  },
  Express: {
    path: 'M24 18.316h-4.528l.762.762c.415.415.415 1.086 0 1.501a1.06 1.06 0 0 1-1.501 0l-2.566-2.566a1.06 1.06 0 0 1 0-1.501l2.566-2.566a1.06 1.06 0 0 1 1.501 0c.415.415.415 1.086 0 1.501l-.762.762H24zM0 6.5h7.5v1.75H0zm0 4.5h5.5v1.75H0zm0 4.5h7.5v1.75H0z',
    hex: 'E39774',
    viewBox: '0 0 24 24',
  },
};

/** Returns inline SVG data for a skill icon (bundled — no network fetch). */
export function getSkillIconSvg(name) {
  const resolved = ALIAS[name] || name;
  if (CUSTOM[resolved] || CUSTOM[name]) {
    return { ...(CUSTOM[resolved] || CUSTOM[name]), title: name };
  }

  const icon = skillIconData[resolved] || skillIconData[name];
  if (!icon?.path) {
    return { fallback: true, title: name, hex: 'E39774' };
  }

  return {
    path: icon.path,
    hex: HEX_OVERRIDE[resolved] || HEX_OVERRIDE[name] || icon.hex || 'E39774',
    title: icon.title || name,
    viewBox: '0 0 24 24',
  };
}
