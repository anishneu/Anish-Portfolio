import skillIconData from './skillIconData.json';

/** Brand color overrides when pack hex is too dark for this UI. */
const HEX_OVERRIDE = {
  AWS: 'FF9900',
  Express: 'E39774',
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
};

/** Returns inline SVG data for a skill icon (bundled — no network fetch). */
export function getSkillIconSvg(name) {
  if (CUSTOM[name]) {
    return { ...CUSTOM[name], title: name };
  }

  const icon = skillIconData[name];
  if (!icon?.path) {
    return { fallback: true, title: name, hex: 'E39774' };
  }

  return {
    path: icon.path,
    hex: HEX_OVERRIDE[name] || icon.hex || 'E39774',
    title: icon.title || name,
    viewBox: '0 0 24 24',
  };
}
