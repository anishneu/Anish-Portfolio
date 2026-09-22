import skillIconData from './skillIconData.json';

/** Brand color overrides when pack hex is too dark for this UI. */
const HEX_OVERRIDE = {
  AWS: 'FF9900',
  Express: 'E39774',
  'Unreal Engine': 'A8B4C8',
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
  'Unreal Engine': {
    path: "M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 23.52A11.52 11.52 0 1123.52 12 11.52 11.52 0 0112 23.52zm7.13-9.791c-.206.997-1.126 3.557-4.06 4.942l-1.179-1.325-1.988 2a7.338 7.338 0 01-5.804-2.978 2.859 2.859 0 00.65.123c.326.006.678-.114.678-.66v-5.394a.89.89 0 00-1.116-.89c-.92.212-1.656 2.509-1.656 2.509a7.304 7.304 0 012.528-5.597 7.408 7.408 0 013.73-1.721c-1.006.573-1.57 1.507-1.57 2.29 0 1.262.76 1.109.984.923v7.28a1.157 1.157 0 00.148.256 1.075 1.075 0 00.88.445c.76 0 1.747-.868 1.747-.868V9.172c0-.6-.452-1.324-.905-1.572 0 0 .838-.149 1.484.346a5.537 5.537 0 01.387-.425c1.508-1.48 2.929-1.902 4.112-2.112 0 0-2.151 1.69-2.151 3.96 0 1.687.043 5.801.043 5.801.799.771 1.986-.342 3.059-1.441Z",
    hex: '0E1128',
    viewBox: '0 0 24 24',
  },
  Balsamiq: {
    path: 'M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5zm3.2 3.1 3.4 2.2-1.2 4.2 3.6-2.1 3.6 2.1-1.2-4.2 3.4-2.2h-4.2L12 5.8 10.4 8.6z',
    hex: 'CC0000',
    viewBox: '0 0 24 24',
  },
  Moqups: {
    path: 'M4 4h7v7H4zm9 0h7v4h-7zM4 13h4v7H4zm6 3h10v4H10zm0-3h10v2H10z',
    hex: '7B61FF',
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
