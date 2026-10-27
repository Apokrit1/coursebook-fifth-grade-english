const fs = require('fs');
const path = require('path');
const { createComicBadgeSvg } = require('./comic_svg_builder');

const OUTPUT_DIR = 'unit1/assets/images';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const vocab = JSON.parse(fs.readFileSync('unit1/data/vocabulary_data.json', 'utf-8'));

// Thematic definitions for Unit 1
const UNIT1_ARTWORK = {
  // Computer Hardware
  1: { tagColor: '#3182ce', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'TECH!', burstColor: '#63b3ed', burstAngle: 10,
    innerSvg: `<rect x="-34" y="-24" width="68" height="46" rx="4" fill="#2d3748" stroke="#1a202c" stroke-width="3"/><rect x="-30" y="-20" width="60" height="38" rx="2" fill="#4299e1"/><line x1="0" y1="22" x2="0" y2="30" stroke="#1a202c" stroke-width="4"/><ellipse cx="0" cy="30" rx="18" ry="4" fill="#718096" stroke="#1a202c" stroke-width="2"/>` },
  2: { tagColor: '#3182ce', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'HD DISPLAY', burstColor: '#90cdf4', burstAngle: -8,
    innerSvg: `<rect x="-38" y="-24" width="76" height="48" rx="6" fill="#1a202c" stroke="#1a202c" stroke-width="3"/><rect x="-34" y="-20" width="68" height="40" rx="3" fill="#63b3ed"/><line x1="0" y1="24" x2="0" y2="34" stroke="#1a202c" stroke-width="4"/>` },
  3: { tagColor: '#4a5568', bgColors: ['#f7fafc', '#edf2f7'], burstText: 'CLICK!', burstColor: '#cbd5e0', burstAngle: 12,
    innerSvg: `<ellipse cx="0" cy="4" rx="22" ry="32" fill="#e2e8f0" stroke="#1a202c" stroke-width="3.5"/><line x1="0" y1="-28" x2="0" y2="-6" stroke="#1a202c" stroke-width="2.5"/><path d="M 0,-14 Q 4,-38 12,-44" stroke="#1a202c" stroke-width="2.5" fill="none"/>` },
  4: { tagColor: '#4a5568', bgColors: ['#f7fafc', '#edf2f7'], burstText: 'TYPE!', burstColor: '#cbd5e0', burstAngle: -10,
    innerSvg: `<rect x="-44" y="-18" width="88" height="40" rx="6" fill="#4a5568" stroke="#1a202c" stroke-width="3.5"/><rect x="-38" y="-12" width="76" height="6" fill="#718096"/><rect x="-38" y="-2" width="76" height="6" fill="#718096"/><rect x="-24" y="8" width="48" height="6" fill="#cbd5e0"/>` },
  5: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'PRINT!', burstColor: '#90cdf4', burstAngle: 8,
    innerSvg: `<rect x="-34" y="-10" width="68" height="38" rx="4" fill="#cbd5e0" stroke="#1a202c" stroke-width="3.5"/><rect x="-24" y="-28" width="48" height="20" fill="#ffffff" stroke="#1a202c" stroke-width="2"/><line x1="-28" y1="12" x2="28" y2="12" stroke="#1a202c" stroke-width="4"/>` },
  6: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'SCAN!', burstColor: '#63b3ed', burstAngle: -12,
    innerSvg: `<polygon points="-36,12 36,12 28,-14 -28,-14" fill="#cbd5e0" stroke="#1a202c" stroke-width="3.5"/><line x1="-24" y1="-2" x2="24" y2="-2" stroke="#48bb78" stroke-width="4"/>` },
  7: { tagColor: '#2d3748', bgColors: ['#f7fafc', '#e2e8f0'], burstText: 'CPU!', burstColor: '#cbd5e0', burstAngle: 10,
    innerSvg: `<rect x="-20" y="-36" width="40" height="72" rx="4" fill="#2d3748" stroke="#1a202c" stroke-width="3.5"/><circle cx="0" cy="-20" r="5" fill="#4299e1"/><line x1="-12" y1="18" x2="12" y2="18" stroke="#718096" stroke-width="3"/><line x1="-12" y1="26" x2="12" y2="26" stroke="#718096" stroke-width="3"/>` },
  8: { tagColor: '#805ad5', bgColors: ['#faf5ff', '#e9d8fd'], burstText: 'MIC ON!', burstColor: '#d6bcfa', burstAngle: -8,
    innerSvg: `<rect x="-10" y="-30" width="20" height="38" rx="10" fill="#a0aec0" stroke="#1a202c" stroke-width="3"/><path d="M -16,-10 C -16,16 16,16 16,-10" stroke="#1a202c" stroke-width="3" fill="none"/><line x1="0" y1="16" x2="0" y2="28" stroke="#1a202c" stroke-width="4"/><ellipse cx="0" cy="28" rx="14" ry="4" fill="#4a5568"/>` },
  9: { tagColor: '#805ad5', bgColors: ['#faf5ff', '#e9d8fd'], burstText: 'LISTEN!', burstColor: '#b794f4', burstAngle: 12,
    innerSvg: `<path d="M -28,8 A 28,28 0 0,1 28,8" stroke="#1a202c" stroke-width="4.5" fill="none"/><rect x="-34" y="2" width="12" height="22" rx="4" fill="#805ad5" stroke="#1a202c" stroke-width="2.5"/><rect x="22" y="2" width="12" height="22" rx="4" fill="#805ad5" stroke="#1a202c" stroke-width="2.5"/>` },
  10: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'BOOM!', burstColor: '#ecc94b', burstAngle: -10,
    innerSvg: `<rect x="-24" y="-30" width="48" height="60" rx="6" fill="#2d3748" stroke="#1a202c" stroke-width="3.5"/><circle cx="0" cy="-14" r="7" fill="#718096" stroke="#1a202c" stroke-width="2"/><circle cx="0" cy="12" r="14" fill="#cbd5e0" stroke="#1a202c" stroke-width="2.5"/>` },

  // Internet & Online Life
  11: { tagColor: '#3182ce', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'WWW!', burstColor: '#63b3ed', burstAngle: 8,
    innerSvg: `<circle cx="0" cy="0" r="32" fill="#3182ce" stroke="#1a202c" stroke-width="3.5"/><ellipse cx="0" cy="0" rx="14" ry="32" fill="none" stroke="#ffffff" stroke-width="2.5"/><line x1="-32" y1="0" x2="32" y2="0" stroke="#ffffff" stroke-width="2.5"/><line x1="-28" y1="-14" x2="28" y2="-14" stroke="#ffffff" stroke-width="2"/><line x1="-28" y1="14" x2="28" y2="14" stroke="#ffffff" stroke-width="2"/>` },
  12: { tagColor: '#e53e3e', bgColors: ['#fff5f5', '#fed7d7'], burstText: 'INBOX!', burstColor: '#feb2b2', burstAngle: -12,
    innerSvg: `<rect x="-36" y="-24" width="72" height="48" rx="6" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/><polygon points="-36,-24 0,4 36,-24" fill="#feb2b2" stroke="#1a202c" stroke-width="2.5"/>` },
  13: { tagColor: '#319795', bgColors: ['#e6fffa', '#b2f5ea'], burstText: 'ONLINE', burstColor: '#4fd1c5', burstAngle: 10,
    innerSvg: `<rect x="-38" y="-24" width="76" height="48" rx="6" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/><rect x="-38" y="-24" width="76" height="12" rx="3" fill="#cbd5e0"/><circle cx="-30" cy="-18" r="2.5" fill="#e53e3e"/><circle cx="-22" cy="-18" r="2.5" fill="#ecc94b"/><circle cx="-14" cy="-18" r="2.5" fill="#48bb78"/>` },
  14: { tagColor: '#38a169', bgColors: ['#f0fff4', '#c6f6d5'], burstText: 'CONNECTED', burstColor: '#68d391', burstAngle: -8,
    innerSvg: `<circle cx="0" cy="0" r="28" fill="#48bb78" stroke="#1a202c" stroke-width="3.5"/><path d="M -16,0 A 16,16 0 0,1 16,0" stroke="#ffffff" stroke-width="3.5" fill="none"/><path d="M -24,-6 A 24,24 0 0,1 24,-6" stroke="#ffffff" stroke-width="3.5" fill="none"/><circle cx="0" cy="14" r="5" fill="#ffffff"/>` },
  15: { tagColor: '#805ad5', bgColors: ['#faf5ff', '#e9d8fd'], burstText: 'CHAT!', burstColor: '#d6bcfa', burstAngle: 12,
    innerSvg: `<path d="M -30,-22 L 14,-22 C 22,-22 22,6 2,6 L -8,18 L -12,6 L -30,6 Z" fill="#4299e1" stroke="#1a202c" stroke-width="3"/><path d="M 30,16 L -6,16 C -14,16 -14,-4 4,-4 L 14,-14 L 16,-4 L 30,-4 Z" fill="#48bb78" stroke="#1a202c" stroke-width="3"/>` },
  16: { tagColor: '#3182ce', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'SURF!', burstColor: '#63b3ed', burstAngle: -10,
    innerSvg: `<path d="M -42,20 Q -24,8 0,16 Q 24,24 42,14" stroke="#3182ce" stroke-width="6" fill="none"/><ellipse cx="0" cy="2" rx="28" ry="8" fill="#ecc94b" stroke="#1a202c" stroke-width="3" transform="rotate(-15)"/>` },
  17: { tagColor: '#3182ce', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'DATA!', burstColor: '#ecc94b', burstAngle: 8,
    innerSvg: `<circle cx="0" cy="0" r="32" fill="#2b6cb0" stroke="#1a202c" stroke-width="3.5"/><text x="0" y="14" font-family="'Outfit', sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle">i</text>` },
  18: { tagColor: '#38a169', bgColors: ['#f0fff4', '#c6f6d5'], burstText: 'SEND!', burstColor: '#48bb78', burstAngle: -12,
    innerSvg: `<polygon points="-32,24 -24,-24 36,-4 -6,4" fill="#48bb78" stroke="#1a202c" stroke-width="3.5"/><line x1="-24" y1="-24" x2="-6" y2="4" stroke="#1a202c" stroke-width="2.5"/>` },
  19: { tagColor: '#dd6b20', bgColors: ['#fffaf0', '#feebc8'], burstText: 'INBOX!', burstColor: '#f6ad55', burstAngle: 10,
    innerSvg: `<rect x="-30" y="-14" width="60" height="38" rx="6" fill="#e2e8f0" stroke="#1a202c" stroke-width="3.5"/><path d="M 0,-32 L 0,8 M -12,-4 L 0,8 L 12,-4" stroke="#dd6b20" stroke-width="5" fill="none" stroke-linecap="round"/>` },

  // Free Time & Hobbies
  20: { tagColor: '#38a169', bgColors: ['#f0fff4', '#c6f6d5'], burstText: 'CHILL!', burstColor: '#68d391', burstAngle: 12,
    innerSvg: `<circle cx="0" cy="-6" r="30" fill="#faf089" stroke="#1a202c" stroke-width="3.5"/><line x1="0" y1="-6" x2="0" y2="-22" stroke="#1a202c" stroke-width="4"/><line x1="0" y1="-6" x2="16" y2="-6" stroke="#e53e3e" stroke-width="3"/><text x="0" y="32" font-size="18" text-anchor="middle">☀️ 🎮 🎧</text>` },
  21: { tagColor: '#805ad5', bgColors: ['#faf5ff', '#e9d8fd'], burstText: 'HOBBY!', burstColor: '#d6bcfa', burstAngle: -10,
    innerSvg: `<circle cx="-16" cy="-4" r="18" fill="#4299e1" stroke="#1a202c" stroke-width="2.5"/><text x="-16" y="2" font-size="14" text-anchor="middle">🎨</text><circle cx="16" cy="4" r="18" fill="#48bb78" stroke="#1a202c" stroke-width="2.5"/><text x="16" y="10" font-size="14" text-anchor="middle">⚽</text>` },
  22: { tagColor: '#3182ce', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'PICK ME!', burstColor: '#63b3ed', burstAngle: 8,
    innerSvg: `<circle cx="-18" cy="0" r="22" fill="#48bb78" stroke="#1a202c" stroke-width="3.5"/><text x="-18" y="7" font-size="18" text-anchor="middle">★</text><circle cx="20" cy="0" r="16" fill="#cbd5e0" stroke="#1a202c" stroke-width="2.5"/>` },
  23: { tagColor: '#e53e3e', bgColors: ['#fff5f5', '#fed7d7'], burstText: 'LOVE IT!', burstColor: '#feb2b2', burstAngle: -12,
    innerSvg: `<path d="M 0,-14 C -12,-34 -38,-14 -18,12 L 0,28 L 18,12 C 38,-14 12,-34 0,-14 Z" fill="#e53e3e" stroke="#1a202c" stroke-width="3.5"/>` },
  24: { tagColor: '#4a5568', bgColors: ['#f7fafc', '#edf2f7'], burstText: 'NO WAY!', burstColor: '#cbd5e0', burstAngle: 10,
    innerSvg: `<circle cx="0" cy="0" r="32" fill="#fed7d7" stroke="#1a202c" stroke-width="3.5"/><line x1="-18" y1="-18" x2="18" y2="18" stroke="#e53e3e" stroke-width="7"/><line x1="18" y1="-18" x2="-18" y2="18" stroke="#e53e3e" stroke-width="7"/>` },
  25: { tagColor: '#ed64a6', bgColors: ['#fff5f7', '#fed7e2'], burstText: 'SKETCH!', burstColor: '#fbb6ce', burstAngle: -8,
    innerSvg: `<rect x="-24" y="-28" width="48" height="60" rx="4" fill="#ffffff" stroke="#1a202c" stroke-width="3"/><g transform="translate(14, -6) rotate(45)"><rect x="-4" y="-24" width="8" height="38" fill="#ecc94b" stroke="#1a202c" stroke-width="2"/><polygon points="-4,14 4,14 0,24" fill="#1a202c"/></g>` },
  26: { tagColor: '#d69e2e', bgColors: ['#fffaf0', '#feebc8'], burstText: 'SOLVED!', burstColor: '#ecc94b', burstAngle: 12,
    innerSvg: `<rect x="-26" y="-26" width="52" height="52" rx="4" fill="#3182ce" stroke="#1a202c" stroke-width="3.5"/><circle cx="0" cy="-26" r="8" fill="#3182ce"/><circle cx="26" cy="0" r="8" fill="#3182ce"/><circle cx="0" cy="26" r="8" fill="#fffaf0"/><circle cx="-26" cy="0" r="8" fill="#fffaf0"/>` },
  27: { tagColor: '#dd6b20', bgColors: ['#fffaf0', '#feebc8'], burstText: 'GOAL!', burstColor: '#f6ad55', burstAngle: -10,
    innerSvg: `<circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/><polygon points="0,-10 9,-3 6,8 -6,8 -9,-3" fill="#1a202c"/>` },
  28: { tagColor: '#319795', bgColors: ['#e6fffa', '#b2f5ea'], burstText: 'CLEAN!', burstColor: '#4fd1c5', burstAngle: 8,
    innerSvg: `<g transform="translate(10, -6) rotate(35)"><line x1="0" y1="-32" x2="0" y2="14" stroke="#744210" stroke-width="5"/><path d="M -12,14 L 12,14 L 18,34 L -18,34 Z" fill="#ecc94b" stroke="#1a202c" stroke-width="2.5"/></g>` },
  29: { tagColor: '#38a169', bgColors: ['#f0fff4', '#c6f6d5'], burstText: 'RUN!', burstColor: '#68d391', burstAngle: -12,
    innerSvg: `<path d="M -30,12 L 20,12 C 32,12 34,0 26,-4 L 10,-18 L -14,-18 L -24,-2 Z" fill="#e53e3e" stroke="#1a202c" stroke-width="3.5"/><rect x="-32" y="12" width="60" height="8" rx="4" fill="#ffffff" stroke="#1a202c" stroke-width="2"/>` },
  30: { tagColor: '#805ad5', bgColors: ['#faf5ff', '#e9d8fd'], burstText: 'COLORS!', burstColor: '#d6bcfa', burstAngle: 10,
    innerSvg: `<ellipse cx="0" cy="0" rx="36" ry="24" fill="#f6ad55" stroke="#1a202c" stroke-width="3.5"/><circle cx="-16" cy="-6" r="5" fill="#e53e3e"/><circle cx="0" cy="-10" r="5" fill="#3182ce"/><circle cx="16" cy="-6" r="5" fill="#ecc94b"/><circle cx="12" cy="8" r="5" fill="#48bb78"/>` },

  // School & Learning
  31: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'READ!', burstColor: '#90cdf4', burstAngle: -8,
    innerSvg: `<path d="M -40,16 Q 0,4 0,-24 Q 0,4 40,16 L 36,-16 Q 0,-28 0,-28 Q 0,-28 -36,-16 Z" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/><path d="M 0,-24 L 0,10" stroke="#1a202c" stroke-width="3"/>` },
  32: { tagColor: '#805ad5', bgColors: ['#faf5ff', '#e9d8fd'], burstText: 'DONE!', burstColor: '#d6bcfa', burstAngle: 12,
    innerSvg: `<rect x="-26" y="-30" width="52" height="64" rx="4" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/><line x1="-16" y1="-14" x2="16" y2="-14" stroke="#cbd5e0" stroke-width="2.5"/><line x1="-16" y1="-2" x2="16" y2="-2" stroke="#cbd5e0" stroke-width="2.5"/><path d="M -8,14 L 0,22 L 14,8" stroke="#38a169" stroke-width="4.5" fill="none" stroke-linecap="round"/>` },
  33: { tagColor: '#e53e3e', bgColors: ['#fff5f5', '#fed7d7'], burstText: '100% A+!', burstColor: '#feb2b2', burstAngle: -10,
    innerSvg: `<rect x="-28" y="-32" width="56" height="66" rx="4" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/><text x="0" y="8" font-family="'Outfit', sans-serif" font-size="34" font-weight="900" fill="#e53e3e" text-anchor="middle">A+</text>` },
  34: { tagColor: '#3182ce', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'LEARN!', burstColor: '#63b3ed', burstAngle: 8,
    innerSvg: `<circle cx="0" cy="-12" r="18" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><path d="M -22,28 C -22,10 22,10 22,28 Z" fill="#3182ce" stroke="#1a202c" stroke-width="3"/><rect x="-10" y="18" width="20" height="14" fill="#e2e8f0"/>` },
  35: { tagColor: '#805ad5', bgColors: ['#faf5ff', '#e9d8fd'], burstText: 'STUDENT', burstColor: '#b794f4', burstAngle: -12,
    innerSvg: `<circle cx="0" cy="-12" r="18" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><polygon points="-24,-24 0,-34 24,-24 0,-14" fill="#1a202c"/><path d="M -22,28 C -22,10 22,10 22,28 Z" fill="#805ad5" stroke="#1a202c" stroke-width="3"/>` },
  36: { tagColor: '#b7791f', bgColors: ['#fffaf0', '#feebc8'], burstText: 'SCHOOL!', burstColor: '#d69e2e', burstAngle: 10,
    innerSvg: `<rect x="-36" y="-12" width="72" height="42" fill="#dd6b20" stroke="#1a202c" stroke-width="3.5"/><polygon points="-42,-12 0,-34 42,-12" fill="#c53030" stroke="#1a202c" stroke-width="3.5"/><rect x="-8" y="6" width="16" height="24" fill="#ffffff" stroke="#1a202c" stroke-width="2.5"/><circle cx="0" cy="-18" r="5" fill="#faf089"/>` },

  // Countries & Geography
  37: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#90cdf4'], burstText: 'NATION', burstColor: '#63b3ed', burstAngle: -8,
    innerSvg: `<circle cx="0" cy="0" r="32" fill="#4299e1" stroke="#1a202c" stroke-width="3.5"/><path d="M -16,-10 Q 0,-20 18,-6 Q 12,18 -10,14 Z" fill="#48bb78" stroke="#1a202c" stroke-width="2"/>` },
  38: { tagColor: '#319795', bgColors: ['#e6fffa', '#b2f5ea'], burstText: 'CITIZEN', burstColor: '#4fd1c5', burstAngle: 12,
    innerSvg: `<rect x="-26" y="-34" width="52" height="68" rx="6" fill="#2b6cb0" stroke="#1a202c" stroke-width="3.5"/><circle cx="0" cy="-6" r="14" fill="#ecc94b"/><text x="0" y="22" font-family="'Outfit', sans-serif" font-size="8" font-weight="900" fill="#ffffff" text-anchor="middle">PASSPORT</text>` },
  39: { tagColor: '#b7791f', bgColors: ['#fffaf0', '#feebc8'], burstText: 'CAPITAL', burstColor: '#ecc94b', burstAngle: -10,
    innerSvg: `<path d="M 0,-34 L 18,-18 L 10,-18 L 14,24 L -14,24 L -10,-18 L -18,-18 Z" fill="#cbd5e0" stroke="#1a202c" stroke-width="3"/><polygon points="0,-42 -4,-34 4,-34" fill="#ecc94b"/>` },
  40: { tagColor: '#e53e3e', bgColors: ['#fff5f5', '#fed7d7'], burstText: 'FLY HIGH!', burstColor: '#feb2b2', burstAngle: 8,
    innerSvg: `<line x1="-24" y1="-32" x2="-24" y2="34" stroke="#1a202c" stroke-width="4.5"/><rect x="-24" y="-30" width="48" height="32" fill="#e53e3e" stroke="#1a202c" stroke-width="3"/><circle cx="0" cy="-14" r="8" fill="#ffffff"/>` },
  41: { tagColor: '#319795', bgColors: ['#e6fffa', '#b2f5ea'], burstText: 'ISLAND', burstColor: '#4fd1c5', burstAngle: -12,
    innerSvg: `<ellipse cx="0" cy="18" rx="46" ry="14" fill="#319795" stroke="#1a202c" stroke-width="3"/><path d="M -30,16 Q 0,-4 30,16 Z" fill="#ecc94b" stroke="#1a202c" stroke-width="2.5"/><text x="6" y="2" font-size="24">🌴</text>` },
  42: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'MILLIONS', burstColor: '#90cdf4', burstAngle: 10,
    innerSvg: `<circle cx="-16" cy="-6" r="12" fill="#fbd38d" stroke="#1a202c" stroke-width="2"/><circle cx="16" cy="-6" r="12" fill="#fbd38d" stroke="#1a202c" stroke-width="2"/><circle cx="0" cy="-14" r="14" fill="#fbd38d" stroke="#1a202c" stroke-width="2.5"/><path d="M -26,24 C -26,10 26,10 26,24 Z" fill="#3182ce" stroke="#1a202c" stroke-width="3"/>` },
  43: { tagColor: '#c53030', bgColors: ['#fff5f5', '#fed7d7'], burstText: 'BORDER', burstColor: '#feb2b2', burstAngle: -8,
    innerSvg: `<rect x="-38" y="-22" width="36" height="48" fill="#4299e1" stroke="#1a202c" stroke-width="3"/><rect x="2" y="-22" width="36" height="48" fill="#48bb78" stroke="#1a202c" stroke-width="3"/><line x1="0" y1="-30" x2="0" y2="30" stroke="#e53e3e" stroke-width="5" stroke-dasharray="6,4"/>` },
  44: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'UK', burstColor: '#ecc94b', burstAngle: 12,
    innerSvg: `<rect x="-36" y="-24" width="72" height="48" fill="#2b6cb0" stroke="#1a202c" stroke-width="3.5"/><line x1="-36" y1="-24" x2="36" y2="24" stroke="#ffffff" stroke-width="7"/><line x1="-36" y1="24" x2="36" y2="-24" stroke="#ffffff" stroke-width="7"/><line x1="-36" y1="-24" x2="36" y2="24" stroke="#e53e3e" stroke-width="3"/><line x1="-36" y1="24" x2="36" y2="-24" stroke="#e53e3e" stroke-width="3"/><line x1="0" y1="-24" x2="0" y2="24" stroke="#ffffff" stroke-width="12"/><line x1="-36" y1="0" x2="36" y2="0" stroke="#ffffff" stroke-width="12"/><line x1="0" y1="-24" x2="0" y2="24" stroke="#e53e3e" stroke-width="6"/><line x1="-36" y1="0" x2="36" y2="0" stroke="#e53e3e" stroke-width="6"/>` },
  45: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'KINGDOM', burstColor: '#ecc94b', burstAngle: -10,
    innerSvg: `<rect x="-36" y="-24" width="72" height="48" fill="#2b6cb0" stroke="#1a202c" stroke-width="3.5"/><polygon points="-16,-6 -20,-22 -8,-14 0,-24 8,-14 20,-22 16,-6" fill="#ecc94b" stroke="#1a202c" stroke-width="2.5"/><rect x="-16" y="-6" width="32" height="10" fill="#ecc94b" stroke="#1a202c" stroke-width="2"/>` },
  46: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'HELLAS!', burstColor: '#90cdf4', burstAngle: 10,
    innerSvg: `<rect x="-36" y="-24" width="72" height="48" fill="#2b6cb0" stroke="#1a202c" stroke-width="3.5"/><rect x="-36" y="-24" width="30" height="30" fill="#2b6cb0"/><line x1="-21" y1="-24" x2="-21" y2="6" stroke="#ffffff" stroke-width="6"/><line x1="-36" y1="-9" x2="-6" y2="-9" stroke="#ffffff" stroke-width="6"/><line x1="-6" y1="-18" x2="36" y2="-18" stroke="#ffffff" stroke-width="5"/><line x1="-6" y1="-6" x2="36" y2="-6" stroke="#ffffff" stroke-width="5"/><line x1="-36" y1="12" x2="36" y2="12" stroke="#ffffff" stroke-width="5"/>` },
  47: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#fed7d7'], burstText: 'PARIS!', burstColor: '#feb2b2', burstAngle: -12,
    innerSvg: `<rect x="-36" y="-24" width="24" height="48" fill="#2b6cb0"/><rect x="-12" y="-24" width="24" height="48" fill="#ffffff"/><rect x="12" y="-24" width="24" height="48" fill="#e53e3e"/><rect x="-36" y="-24" width="72" height="48" stroke="#1a202c" stroke-width="3.5" fill="none"/>` },
  48: { tagColor: '#c53030', bgColors: ['#fff5f5', '#feebc8'], burstText: 'MADRID!', burstColor: '#ecc94b', burstAngle: 8,
    innerSvg: `<rect x="-36" y="-24" width="72" height="12" fill="#c53030"/><rect x="-36" y="-12" width="72" height="24" fill="#ecc94b"/><rect x="-36" y="12" width="72" height="12" fill="#c53030"/><rect x="-36" y="-24" width="72" height="48" stroke="#1a202c" stroke-width="3.5" fill="none"/>` },

  // Nationalities & Languages
  49: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'BRITISH', burstColor: '#63b3ed', burstAngle: 12,
    innerSvg: `<circle cx="0" cy="-6" r="24" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><polygon points="-24,-4 24,-4 18,-24 -18,-24" fill="#2b6cb0" stroke="#1a202c" stroke-width="2"/><text x="0" y="28" font-size="12" font-weight="bold">🇬🇧</text>` },
  50: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#bee3f8'], burstText: 'GREEK', burstColor: '#90cdf4', burstAngle: -8,
    innerSvg: `<circle cx="0" cy="-6" r="24" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><path d="M -18,-20 Q 0,-28 18,-20" stroke="#ecc94b" stroke-width="5" fill="none"/><text x="0" y="28" font-size="12" font-weight="bold">🇬🇷</text>` },
  51: { tagColor: '#2b6cb0', bgColors: ['#ebf8ff', '#fed7d7'], burstText: 'FRENCH', burstColor: '#feb2b2', burstAngle: 10,
    innerSvg: `<circle cx="0" cy="-6" r="24" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><ellipse cx="0" cy="-24" rx="20" ry="8" fill="#1a202c"/><text x="0" y="28" font-size="12" font-weight="bold">🇫🇷</text>` },
  52: { tagColor: '#c53030', bgColors: ['#fff5f5', '#feebc8'], burstText: 'SPANISH', burstColor: '#ecc94b', burstAngle: -12,
    innerSvg: `<circle cx="0" cy="-6" r="24" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><text x="0" y="28" font-size="12" font-weight="bold">🇪🇸</text>` },
  53: { tagColor: '#38a169', bgColors: ['#f0fff4', '#fed7d7'], burstText: 'ITALIAN', burstColor: '#68d391', burstAngle: 8,
    innerSvg: `<circle cx="0" cy="-6" r="24" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><text x="0" y="28" font-size="12" font-weight="bold">🇮🇹</text>` },
  54: { tagColor: '#b7791f', bgColors: ['#fffaf0', '#feebc8'], burstText: 'GERMAN', burstColor: '#ecc94b', burstAngle: -10,
    innerSvg: `<circle cx="0" cy="-6" r="24" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><text x="0" y="28" font-size="12" font-weight="bold">🇩🇪</text>` },
  55: { tagColor: '#dd6b20', bgColors: ['#fffaf0', '#feebc8'], burstText: 'DUTCH', burstColor: '#f6ad55', burstAngle: 12,
    innerSvg: `<circle cx="0" cy="-6" r="24" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><text x="0" y="28" font-size="12" font-weight="bold">🇳🇱</text>` },
  56: { tagColor: '#c53030', bgColors: ['#fff5f5', '#bee3f8'], burstText: 'RUSSIAN', burstColor: '#63b3ed', burstAngle: -8,
    innerSvg: `<circle cx="0" cy="-6" r="24" fill="#fbd38d" stroke="#1a202c" stroke-width="3"/><text x="0" y="28" font-size="12" font-weight="bold">🇷🇺</text>` },

  // Symbols & Nature
  57: { tagColor: '#b7791f', bgColors: ['#fffaf0', '#feebc8'], burstText: 'EMBLEM', burstColor: '#ecc94b', burstAngle: 10,
    innerSvg: `<polygon points="0,-32 9,-10 32,-10 14,4 20,28 0,14 -20,28 -14,4 -32,-10 -9,-10" fill="#ecc94b" stroke="#1a202c" stroke-width="3"/>` },
  58: { tagColor: '#ed64a6', bgColors: ['#fff5f7', '#fed7e2'], burstText: 'FLOWER', burstColor: '#f687b3', burstAngle: -12,
    innerSvg: `<circle cx="0" cy="0" r="12" fill="#ecc94b" stroke="#1a202c" stroke-width="2.5"/><circle cx="-16" cy="-10" r="10" fill="#ed64a6"/><circle cx="16" cy="-10" r="10" fill="#ed64a6"/><circle cx="-14" cy="14" r="10" fill="#ed64a6"/><circle cx="14" cy="14" r="10" fill="#ed64a6"/><circle cx="0" cy="-20" r="10" fill="#ed64a6"/>` },
  59: { tagColor: '#e53e3e', bgColors: ['#fff5f5', '#fed7d7'], burstText: 'ENGLAND', burstColor: '#feb2b2', burstAngle: 12,
    innerSvg: `<circle cx="0" cy="-8" r="24" fill="#e53e3e" stroke="#1a202c" stroke-width="3"/><path d="M 0,16 L 0,34" stroke="#38a169" stroke-width="5"/><ellipse cx="-12" cy="24" rx="8" ry="4" fill="#38a169" transform="rotate(-30 -12 24)"/>` },
  60: { tagColor: '#d69e2e', bgColors: ['#fffff0', '#fefcbf'], burstText: 'WALES', burstColor: '#faf089', burstAngle: -10,
    innerSvg: `<polygon points="0,-32 18,-6 8,14 -8,14 -18,-6" fill="#ecc94b" stroke="#1a202c" stroke-width="3"/><ellipse cx="0" cy="-12" rx="12" ry="12" fill="#faf089"/><line x1="0" y1="14" x2="0" y2="34" stroke="#38a169" stroke-width="4.5"/>` },
  61: { tagColor: '#805ad5', bgColors: ['#faf5ff', '#e9d8fd'], burstText: 'SCOTLAND', burstColor: '#d6bcfa', burstAngle: 8,
    innerSvg: `<ellipse cx="0" cy="10" rx="16" ry="18" fill="#48bb78" stroke="#1a202c" stroke-width="3"/><path d="M -16,-2 L -12,-24 L 0,-6 L 12,-24 L 16,-2 Z" fill="#805ad5" stroke="#1a202c" stroke-width="2.5"/><line x1="0" y1="28" x2="0" y2="36" stroke="#38a169" stroke-width="4"/>` },
  62: { tagColor: '#38a169', bgColors: ['#f0fff4', '#c6f6d5'], burstText: 'IRELAND', burstColor: '#68d391', burstAngle: -12,
    innerSvg: `<circle cx="-12" cy="-6" r="14" fill="#48bb78" stroke="#1a202c" stroke-width="2.5"/><circle cx="12" cy="-6" r="14" fill="#48bb78" stroke="#1a202c" stroke-width="2.5"/><circle cx="0" cy="-22" r="14" fill="#48bb78" stroke="#1a202c" stroke-width="2.5"/><path d="M 0,-4 Q 8,24 0,34" stroke="#38a169" stroke-width="5" fill="none"/>` }
};

console.log('=== GENERATING UNIT 1 BESPOKE GRAPHIC NOVEL SVGS ===');
let u1Count = 0;
for (const item of vocab) {
  const custom = UNIT1_ARTWORK[item.id];
  if (custom) {
    const padId = String(item.id).padStart(2, '0');
    const safeName = item.word.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const fileName = `${padId}_${safeName}.svg`;
    const fullPath = path.join(OUTPUT_DIR, fileName);

    const svgContent = createComicBadgeSvg({
      category: item.category || 'General',
      word: item.word,
      ipa: item.ipa,
      meaningGr: item.meaning_gr,
      bgColors: custom.bgColors,
      tagColor: custom.tagColor,
      burstText: custom.burstText,
      burstColor: custom.burstColor,
      burstAngle: custom.burstAngle,
      innerSvg: custom.innerSvg
    });

    fs.writeFileSync(fullPath, svgContent);
    item.image = `assets/images/${fileName}`;
    item.image_alt = `Graphic novel illustration of ${item.word}`;
    u1Count++;
  }
}

fs.writeFileSync('unit1/data/vocabulary_data.json', JSON.stringify(vocab, null, 2));
fs.writeFileSync('unit1/data/vocabulary_data.js', 'window.VOCABULARY_DATA = ' + JSON.stringify(vocab, null, 2) + ';');

console.log(`=== COMPLETED UNIT 1! Generated ${u1Count} / ${vocab.length} bespoke graphic novel SVGs ===`);
