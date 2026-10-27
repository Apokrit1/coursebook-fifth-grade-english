const fs = require('fs');
const path = require('path');
const { createComicBadgeSvg } = require('./comic_svg_builder');

const OUTPUT_DIR = 'unit2/assets/images';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Load Unit 2 vocabulary
const vocabPath = 'unit2/data/vocabulary_data.json';
const vocab = JSON.parse(fs.readFileSync(vocabPath, 'utf-8'));

// Define the bespoke graphic novel illustrations for all items that need exact visual fidelity
const SVG_ARTWORK = {
  // --- SNACKS & DRINKS ---
  26: { // doughnut
    tagColor: '#d53f8c',
    bgColors: ['#fff5f7', '#fed7e2'],
    burstText: 'YUM!',
    burstColor: '#ecc94b',
    burstAngle: 12,
    innerSvg: `
      <!-- Doughnut Pastry -->
      <ellipse cx="0" cy="0" rx="52" ry="42" fill="#dd6b20" stroke="#1a202c" stroke-width="3.5"/>
      <ellipse cx="-2" cy="-3" rx="48" ry="38" fill="#ed8936"/>
      <!-- Chocolate/Berry Icing -->
      <path d="M -44,-8 C -40,16 -26,24 -14,16 C -2,24 10,16 20,24 C 32,20 42,12 44,-8 C 46,-24 28,-34 0,-34 C -28,-34 -46,-24 -44,-8 Z" fill="#805ad5" stroke="#1a202c" stroke-width="3"/>
      <!-- Hole -->
      <ellipse cx="0" cy="-2" rx="16" ry="12" fill="#fff5f7" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Colorful Sprinkles -->
      <rect x="-28" y="-18" width="7" height="3" rx="1.5" fill="#ecc94b" transform="rotate(25 -28 -18)" stroke="#1a202c" stroke-width="1"/>
      <rect x="16" y="-20" width="7" height="3" rx="1.5" fill="#48bb78" transform="rotate(-30 16 -20)" stroke="#1a202c" stroke-width="1"/>
      <rect x="-18" y="2" width="7" height="3" rx="1.5" fill="#63b3ed" transform="rotate(40 -18 2)" stroke="#1a202c" stroke-width="1"/>
      <rect x="20" y="2" width="7" height="3" rx="1.5" fill="#ecc94b" transform="rotate(15 20 2)" stroke="#1a202c" stroke-width="1"/>
      <rect x="-2" y="-26" width="7" height="3" rx="1.5" fill="#feb2b2" transform="rotate(-10 -2 -26)" stroke="#1a202c" stroke-width="1"/>
    `
  },
  27: { // orange juice
    tagColor: '#dd6b20',
    bgColors: ['#fffaf0', '#feebc8'],
    burstText: 'FRESH!',
    burstColor: '#f6ad55',
    burstAngle: -8,
    innerSvg: `
      <!-- Glass -->
      <polygon points="-24,-36 24,-36 18,36 -18,36" fill="#e2e8f0" stroke="#1a202c" stroke-width="3.5" opacity="0.6"/>
      <!-- Juice -->
      <polygon points="-21,-12 21,-12 16,34 -16,34" fill="#ed8936" stroke="#1a202c" stroke-width="2.5"/>
      <!-- Straw -->
      <line x1="6" y1="-44" x2="-6" y2="28" stroke="#e53e3e" stroke-width="5" stroke-linecap="round"/>
      <line x1="6" y1="-44" x2="16" y2="-52" stroke="#e53e3e" stroke-width="5" stroke-linecap="round"/>
      <!-- Orange Slice -->
      <g transform="translate(24, -30)">
        <circle cx="0" cy="0" r="18" fill="#dd6b20" stroke="#1a202c" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="15" fill="#fbd38d"/>
        <line x1="0" y1="-15" x2="0" y2="15" stroke="#dd6b20" stroke-width="2"/>
        <line x1="-15" y1="0" x2="15" y2="0" stroke="#dd6b20" stroke-width="2"/>
      </g>
    `
  },
  28: { // apple juice
    tagColor: '#38a169',
    bgColors: ['#f0fff4', '#c6f6d5'],
    burstText: 'SWEET!',
    burstColor: '#68d391',
    burstAngle: 10,
    innerSvg: `
      <!-- Glass -->
      <polygon points="-22,-36 22,-36 17,34 -17,34" fill="#e2e8f0" stroke="#1a202c" stroke-width="3.5" opacity="0.5"/>
      <!-- Apple Juice -->
      <polygon points="-20,-10 20,-10 15,32 -15,32" fill="#ecc94b" stroke="#1a202c" stroke-width="2.5"/>
      <!-- Red Apple beside glass -->
      <g transform="translate(-28, 12)">
        <ellipse cx="0" cy="0" rx="18" ry="17" fill="#e53e3e" stroke="#1a202c" stroke-width="3"/>
        <path d="M 0,-17 Q 4,-24 8,-22" stroke="#744210" stroke-width="3" fill="none"/>
        <ellipse cx="6" cy="-22" rx="6" ry="3" fill="#48bb78" transform="rotate(-30 6 -22)" stroke="#1a202c" stroke-width="1.5"/>
      </g>
      <!-- Straw -->
      <line x1="8" y1="-46" x2="-2" y2="28" stroke="#319795" stroke-width="4.5" stroke-linecap="round"/>
    `
  },
  29: { // water
    tagColor: '#3182ce',
    bgColors: ['#ebf8ff', '#bee3f8'],
    burstText: 'PURE!',
    burstColor: '#63b3ed',
    burstAngle: -10,
    innerSvg: `
      <!-- Clear Glass with water -->
      <polygon points="-24,-36 24,-36 18,36 -18,36" fill="#bee3f8" stroke="#1a202c" stroke-width="3.5"/>
      <polygon points="-22,-14 22,-14 16,34 -16,34" fill="#63b3ed" stroke="#1a202c" stroke-width="2.5" opacity="0.8"/>
      <!-- Ice Cubes -->
      <rect x="-12" y="-4" width="14" height="14" rx="2" fill="#ffffff" stroke="#1a202c" stroke-width="2" transform="rotate(15 -12 -4)"/>
      <rect x="2" y="8" width="12" height="12" rx="2" fill="#ffffff" stroke="#1a202c" stroke-width="2" transform="rotate(-20 2 8)"/>
      <!-- Bubbles -->
      <circle cx="-6" cy="24" r="3" fill="#ffffff" stroke="#1a202c" stroke-width="1.5"/>
      <circle cx="8" cy="28" r="2.5" fill="#ffffff" stroke="#1a202c" stroke-width="1.5"/>
      <circle cx="2" cy="18" r="2" fill="#ffffff" stroke="#1a202c" stroke-width="1.5"/>
    `
  },
  30: { // cereal
    tagColor: '#b7791f',
    bgColors: ['#fffaf0', '#feebc8'],
    burstText: 'CRUNCH!',
    burstColor: '#f6ad55',
    burstAngle: 14,
    innerSvg: `
      <!-- Breakfast Cereal Bowl -->
      <ellipse cx="0" cy="18" rx="46" ry="16" fill="#cbd5e0" stroke="#1a202c" stroke-width="3.5"/>
      <path d="M -46,0 C -46,32 46,32 46,0 Z" fill="#3182ce" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Milk & Flakes -->
      <ellipse cx="0" cy="0" rx="44" ry="14" fill="#ffffff" stroke="#1a202c" stroke-width="2.5"/>
      <ellipse cx="-20" cy="-2" rx="7" ry="5" fill="#d69e2e" stroke="#1a202c" stroke-width="1.5"/>
      <ellipse cx="-4" cy="2" rx="8" ry="5" fill="#d69e2e" stroke="#1a202c" stroke-width="1.5"/>
      <ellipse cx="16" cy="-1" rx="7" ry="5" fill="#d69e2e" stroke="#1a202c" stroke-width="1.5"/>
      <ellipse cx="28" cy="2" rx="6" ry="4" fill="#d69e2e" stroke="#1a202c" stroke-width="1.5"/>
      <ellipse cx="-12" cy="5" rx="6" ry="4" fill="#d69e2e" stroke="#1a202c" stroke-width="1.5"/>
      <!-- Spoon -->
      <path d="M 28,-26 Q 38,-38 46,-42" stroke="#718096" stroke-width="4.5" stroke-linecap="round"/>
      <ellipse cx="26" cy="-24" rx="8" ry="6" fill="#a0aec0" stroke="#1a202c" stroke-width="2"/>
    `
  },
  31: { // toast
    tagColor: '#b7791f',
    bgColors: ['#fffaf0', '#fbd38d'],
    burstText: 'WARM!',
    burstColor: '#ecc94b',
    burstAngle: -8,
    innerSvg: `
      <!-- Two Slices of Toast -->
      <g transform="translate(-10, -6) rotate(-8)">
        <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#d69e2e" stroke="#1a202c" stroke-width="3.5"/>
        <rect x="-20" y="-20" width="40" height="40" rx="6" fill="#ecc94b"/>
        <!-- Butter melting -->
        <rect x="-8" y="-8" width="16" height="12" rx="3" fill="#faf089" stroke="#1a202c" stroke-width="2"/>
      </g>
      <g transform="translate(14, 6) rotate(10)">
        <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#c05621" stroke="#1a202c" stroke-width="3.5"/>
        <rect x="-20" y="-20" width="40" height="40" rx="6" fill="#dd6b20"/>
      </g>
    `
  },
  32: { // butter
    tagColor: '#d69e2e',
    bgColors: ['#fffff0', '#fefcbf'],
    burstText: 'MELT!',
    burstColor: '#f6e05e',
    burstAngle: 10,
    innerSvg: `
      <!-- Butter Dish -->
      <ellipse cx="0" cy="20" rx="52" ry="16" fill="#edf2f7" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Block of Butter -->
      <polygon points="-32,10 18,10 32,-8 -18,-8" fill="#faf089" stroke="#1a202c" stroke-width="3.5"/>
      <polygon points="-32,10 -32,-4 -18,-22 -18,-8" fill="#f6e05e" stroke="#1a202c" stroke-width="3.5"/>
      <polygon points="-18,-22 32,-22 32,-8 -18,-8" fill="#fff9c4" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Butter Knife -->
      <g transform="translate(26, -14) rotate(45)">
        <rect x="-4" y="-24" width="8" height="36" rx="4" fill="#a0aec0" stroke="#1a202c" stroke-width="2"/>
        <rect x="-3" y="12" width="6" height="16" rx="2" fill="#744210" stroke="#1a202c" stroke-width="2"/>
      </g>
    `
  },
  33: { // tea
    tagColor: '#975a16',
    bgColors: ['#fffaf0', '#feebc8'],
    burstText: 'HOT!',
    burstColor: '#ed8936',
    burstAngle: -12,
    innerSvg: `
      <!-- Steaming Mug -->
      <!-- Steam -->
      <path d="M -12,-32 Q -18,-44 -10,-52" stroke="#a0aec0" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 0,-34 Q 6,-46 -2,-56" stroke="#a0aec0" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 12,-32 Q 6,-44 14,-52" stroke="#a0aec0" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Saucer -->
      <ellipse cx="0" cy="30" rx="44" ry="12" fill="#cbd5e0" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Mug Body -->
      <rect x="-26" y="-22" width="52" height="46" rx="6" fill="#e53e3e" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Mug Handle -->
      <path d="M 26,-12 C 40,-12 40,14 26,16" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <!-- Tea Tag String -->
      <line x1="8" y1="-22" x2="16" y2="2" stroke="#718096" stroke-width="2"/>
      <rect x="12" y="2" width="10" height="12" rx="2" fill="#ecc94b" stroke="#1a202c" stroke-width="1.5"/>
    `
  },
  34: { // milk
    tagColor: '#3182ce',
    bgColors: ['#ebf8ff', '#e2e8f0'],
    burstText: 'FRESH!',
    burstColor: '#63b3ed',
    burstAngle: 12,
    innerSvg: `
      <!-- Milk Carton -->
      <polygon points="-20,-20 20,-20 20,34 -20,34" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <polygon points="-20,-20 0,-38 20,-20" fill="#3182ce" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Blue Band with Cow/Label -->
      <rect x="-20" y="-4" width="40" height="20" fill="#3182ce"/>
      <text x="0" y="10" font-family="'Outfit', sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">MILK</text>
      <!-- Glass of Milk beside -->
      <g transform="translate(28, 10)">
        <polygon points="-12,-20 12,-20 9,24 -9,24" fill="#ffffff" stroke="#1a202c" stroke-width="2.5"/>
      </g>
    `
  },

  // --- SCHOOL SUBJECTS ---
  10: { // timetable
    tagColor: '#805ad5',
    bgColors: ['#faf5ff', '#e9d8fd'],
    burstText: 'WEEKLY!',
    burstColor: '#b794f4',
    burstAngle: -8,
    innerSvg: `
      <!-- Timetable Grid Paper -->
      <rect x="-48" y="-36" width="96" height="72" rx="6" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <line x1="-48" y1="-20" x2="48" y2="-20" stroke="#1a202c" stroke-width="2"/>
      <line x1="-48" y1="-4" x2="48" y2="-4" stroke="#cbd5e0" stroke-width="1.5"/>
      <line x1="-48" y1="12" x2="48" y2="12" stroke="#cbd5e0" stroke-width="1.5"/>
      <line x1="-20" y1="-36" x2="-20" y2="36" stroke="#cbd5e0" stroke-width="1.5"/>
      <line x1="8" y1="-36" x2="8" y2="36" stroke="#cbd5e0" stroke-width="1.5"/>
      <!-- Color blocks representing classes -->
      <rect x="-16" y="-16" width="20" height="8" rx="2" fill="#4299e1"/>
      <rect x="12" y="-16" width="28" height="8" rx="2" fill="#48bb78"/>
      <rect x="-16" y="0" width="20" height="8" rx="2" fill="#ed8936"/>
      <rect x="12" y="16" width="28" height="8" rx="2" fill="#9f7aea"/>
      <!-- Header text -->
      <text x="0" y="-26" font-family="'Outfit', sans-serif" font-size="7" font-weight="900" fill="#1a202c" text-anchor="middle">MON • TUE • WED</text>
    `
  },
  35: { // English
    tagColor: '#e53e3e',
    bgColors: ['#fff5f5', '#fed7d7'],
    burstText: 'HELLO!',
    burstColor: '#feb2b2',
    burstAngle: 14,
    innerSvg: `
      <!-- English Book with UK Flag motif -->
      <rect x="-42" y="-32" width="84" height="64" rx="6" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <rect x="-42" y="-32" width="14" height="64" rx="3" fill="#2b6cb0"/>
      <!-- UK Flag detail -->
      <g transform="translate(4, -6)">
        <rect x="-26" y="-18" width="52" height="36" fill="#2b6cb0" stroke="#1a202c" stroke-width="2"/>
        <line x1="-26" y1="-18" x2="26" y2="18" stroke="#ffffff" stroke-width="6"/>
        <line x1="-26" y1="18" x2="26" y2="-18" stroke="#ffffff" stroke-width="6"/>
        <line x1="-26" y1="-18" x2="26" y2="18" stroke="#e53e3e" stroke-width="2.5"/>
        <line x1="-26" y1="18" x2="26" y2="-18" stroke="#e53e3e" stroke-width="2.5"/>
        <line x1="0" y1="-18" x2="0" y2="18" stroke="#ffffff" stroke-width="10"/>
        <line x1="-26" y1="0" x2="26" y2="0" stroke="#ffffff" stroke-width="10"/>
        <line x1="0" y1="-18" x2="0" y2="18" stroke="#e53e3e" stroke-width="5"/>
        <line x1="-26" y1="0" x2="26" y2="0" stroke="#e53e3e" stroke-width="5"/>
      </g>
    `
  },
  36: { // maths
    tagColor: '#3182ce',
    bgColors: ['#ebf8ff', '#bee3f8'],
    burstText: 'π = 3.14',
    burstColor: '#ecc94b',
    burstAngle: -10,
    innerSvg: `
      <!-- Calculator & Geometry Set Square -->
      <!-- Triangle ruler -->
      <polygon points="-44,28 10,28 -44,-26" fill="#ecc94b" stroke="#1a202c" stroke-width="3.5"/>
      <polygon points="-36,20 -4,20 -36,-12" fill="#ebf8ff" stroke="#1a202c" stroke-width="2"/>
      <!-- Calculator -->
      <g transform="translate(18, -4)">
        <rect x="-22" y="-28" width="44" height="60" rx="6" fill="#2d3748" stroke="#1a202c" stroke-width="3.5"/>
        <rect x="-16" y="-22" width="32" height="14" rx="2" fill="#9ae6b4" stroke="#1a202c" stroke-width="1.5"/>
        <text x="12" y="-12" font-family="'Outfit', sans-serif" font-size="9" font-weight="900" fill="#1a202c" text-anchor="end">42</text>
        <!-- Buttons -->
        <circle cx="-10" cy="2" r="3.5" fill="#e2e8f0"/>
        <circle cx="0" cy="2" r="3.5" fill="#e2e8f0"/>
        <circle cx="10" cy="2" r="3.5" fill="#ed8936"/>
        <circle cx="-10" cy="14" r="3.5" fill="#e2e8f0"/>
        <circle cx="0" cy="14" r="3.5" fill="#e2e8f0"/>
        <circle cx="10" cy="14" r="3.5" fill="#48bb78"/>
      </g>
    `
  },
  37: { // geography
    tagColor: '#2b6cb0',
    bgColors: ['#ebf8ff', '#90cdf4'],
    burstText: 'WORLD!',
    burstColor: '#68d391',
    burstAngle: 12,
    innerSvg: `
      <!-- World Globe on Stand -->
      <!-- Stand Base -->
      <ellipse cx="0" cy="34" rx="24" ry="7" fill="#4a5568" stroke="#1a202c" stroke-width="3"/>
      <line x1="0" y1="18" x2="0" y2="34" stroke="#1a202c" stroke-width="4.5"/>
      <!-- Curved Axis -->
      <path d="M -30,-4 C -36,20 10,32 18,22" stroke="#1a202c" stroke-width="4" fill="none"/>
      <!-- Globe Circle -->
      <circle cx="0" cy="-6" r="34" fill="#4299e1" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Continents -->
      <path d="M -22,-14 Q -12,-24 0,-18 Q 14,-14 16,-4 Q 4,6 -8,4 Q -16,14 -24,4 Z" fill="#48bb78" stroke="#1a202c" stroke-width="2"/>
      <path d="M 6,10 Q 16,12 24,18 Q 18,28 6,24 Z" fill="#48bb78" stroke="#1a202c" stroke-width="2"/>
    `
  },
  38: { // history
    tagColor: '#b7791f',
    bgColors: ['#fffaf0', '#feebc8'],
    burstText: 'ANCIENT!',
    burstColor: '#d69e2e',
    burstAngle: -8,
    innerSvg: `
      <!-- Greek Column & Ancient Scroll -->
      <g transform="translate(-24, 0)">
        <!-- Capital -->
        <rect x="-14" y="-30" width="28" height="8" rx="2" fill="#edf2f7" stroke="#1a202c" stroke-width="3"/>
        <ellipse cx="-12" cy="-30" rx="4" ry="4" fill="#cbd5e0"/>
        <ellipse cx="12" cy="-30" rx="4" ry="4" fill="#cbd5e0"/>
        <!-- Shaft -->
        <rect x="-10" y="-22" width="20" height="50" fill="#e2e8f0" stroke="#1a202c" stroke-width="3"/>
        <!-- Base -->
        <rect x="-14" y="28" width="28" height="8" rx="2" fill="#edf2f7" stroke="#1a202c" stroke-width="3"/>
      </g>
      <!-- Hourglass -->
      <g transform="translate(24, 0)">
        <polygon points="-16,-28 16,-28 0,-4" fill="#ecc94b" stroke="#1a202c" stroke-width="3"/>
        <polygon points="-16,28 16,28 0,-4" fill="#d69e2e" stroke="#1a202c" stroke-width="3"/>
        <line x1="-20" y1="-28" x2="20" y2="-28" stroke="#744210" stroke-width="4"/>
        <line x1="-20" y1="28" x2="20" y2="28" stroke="#744210" stroke-width="4"/>
      </g>
    `
  },
  40: { // art
    tagColor: '#ed64a6',
    bgColors: ['#fff5f7', '#fed7e2'],
    burstText: 'DRAW!',
    burstColor: '#f687b3',
    burstAngle: 14,
    innerSvg: `
      <!-- Painter's Palette & Brush -->
      <path d="M -34,16 C -48,0 -38,-28 0,-28 C 38,-28 48,-4 36,20 C 26,36 -4,36 -20,24 C -26,18 -28,24 -34,16 Z" fill="#f6ad55" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Thumb hole -->
      <ellipse cx="-16" cy="14" rx="6" ry="8" fill="#fff5f7" stroke="#1a202c" stroke-width="2.5"/>
      <!-- Paint Dabs -->
      <circle cx="-16" cy="-14" r="5" fill="#e53e3e"/>
      <circle cx="2" cy="-18" r="5" fill="#3182ce"/>
      <circle cx="20" cy="-12" r="5" fill="#ecc94b"/>
      <circle cx="26" cy="4" r="5" fill="#48bb78"/>
      <!-- Paintbrush -->
      <g transform="translate(18, -10) rotate(-35)">
        <rect x="-3" y="-36" width="6" height="42" rx="2" fill="#744210" stroke="#1a202c" stroke-width="2"/>
        <rect x="-4" y="6" width="8" height="12" fill="#a0aec0" stroke="#1a202c" stroke-width="1.5"/>
        <path d="M -4,18 C -4,26 4,26 4,18 Z" fill="#3182ce"/>
      </g>
    `
  },
  41: { // music
    tagColor: '#805ad5',
    bgColors: ['#faf5ff', '#e9d8fd'],
    burstText: '♪ ♫',
    burstColor: '#d6bcfa',
    burstAngle: -10,
    innerSvg: `
      <!-- Treble Clef, Stave & Notes -->
      <g transform="translate(-14, 0)">
        <!-- Headphone Band -->
        <path d="M -32,10 A 32,32 0 0,1 32,10" stroke="#1a202c" stroke-width="5" fill="none"/>
        <rect x="-38" y="4" width="12" height="24" rx="4" fill="#805ad5" stroke="#1a202c" stroke-width="3"/>
        <rect x="26" y="4" width="12" height="24" rx="4" fill="#805ad5" stroke="#1a202c" stroke-width="3"/>
        <!-- Eighth Notes in center -->
        <ellipse cx="-8" cy="8" rx="6" ry="5" fill="#1a202c" transform="rotate(-20 -8 8)"/>
        <ellipse cx="14" cy="2" rx="6" ry="5" fill="#1a202c" transform="rotate(-20 14 2)"/>
        <line x1="-3" y1="8" x2="-3" y2="-18" stroke="#1a202c" stroke-width="3"/>
        <line x1="19" y1="2" x2="19" y2="-24" stroke="#1a202c" stroke-width="3"/>
        <polygon points="-3,-18 19,-24 19,-18 -3,-12" fill="#1a202c"/>
      </g>
    `
  },
  42: { // gym
    tagColor: '#dd6b20',
    bgColors: ['#fffaf0', '#feebc8'],
    burstText: 'MOVE!',
    burstColor: '#f6ad55',
    burstAngle: 12,
    innerSvg: `
      <!-- Basketball, Whistle & Sneakers -->
      <circle cx="-18" cy="2" r="26" fill="#ed8936" stroke="#1a202c" stroke-width="3.5"/>
      <path d="M -44,2 A 26,26 0 0,0 8,2" stroke="#1a202c" stroke-width="2.5" fill="none"/>
      <line x1="-18" y1="-24" x2="-18" y2="28" stroke="#1a202c" stroke-width="2.5"/>
      <!-- Whistle -->
      <g transform="translate(24, -10)">
        <ellipse cx="0" cy="0" rx="14" ry="10" fill="#cbd5e0" stroke="#1a202c" stroke-width="3"/>
        <rect x="-14" y="-4" width="14" height="8" rx="2" fill="#cbd5e0" stroke="#1a202c" stroke-width="2.5"/>
        <line x1="-14" y1="-4" x2="-22" y2="-18" stroke="#718096" stroke-width="3"/>
      </g>
    `
  },

  // --- FEELINGS & EMOTIONS ---
  11: { // happy
    tagColor: '#38a169',
    bgColors: ['#f0fff4', '#c6f6d5'],
    burstText: 'YAY!',
    burstColor: '#f6e05e',
    burstAngle: 10,
    innerSvg: `
      <!-- Beaming Smiley Comic Face -->
      <circle cx="0" cy="0" r="38" fill="#f6e05e" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Joyful squint eyes -->
      <path d="M -20,-8 Q -14,-18 -8,-8" stroke="#1a202c" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 8,-8 Q 14,-18 20,-8" stroke="#1a202c" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Big open grin -->
      <path d="M -22,6 Q 0,32 22,6 Z" fill="#e53e3e" stroke="#1a202c" stroke-width="3.5"/>
      <path d="M -16,8 Q 0,20 16,8 Z" fill="#ffffff"/>
      <!-- Sparkles -->
      <text x="-32" y="-28" font-size="16">✨</text>
      <text x="24" y="-24" font-size="16">⭐</text>
    `
  },
  13: { // bored
    tagColor: '#718096',
    bgColors: ['#f7fafc', '#edf2f7'],
    burstText: 'ZZZ...',
    burstColor: '#cbd5e0',
    burstAngle: -12,
    innerSvg: `
      <!-- Bored Comic Character Face -->
      <circle cx="0" cy="0" r="38" fill="#e2e8f0" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Droopy half-shut eyes -->
      <line x1="-22" y1="-6" x2="-8" y2="-6" stroke="#1a202c" stroke-width="4" stroke-linecap="round"/>
      <line x1="8" y1="-6" x2="22" y2="-6" stroke="#1a202c" stroke-width="4" stroke-linecap="round"/>
      <!-- Flat straight mouth -->
      <line x1="-14" y1="18" x2="14" y2="18" stroke="#1a202c" stroke-width="4" stroke-linecap="round"/>
      <!-- Hand propping chin -->
      <path d="M -12,32 C -18,24 -24,36 -14,40" stroke="#1a202c" stroke-width="3.5" fill="#cbd5e0"/>
    `
  },
  14: { // sad
    tagColor: '#3182ce',
    bgColors: ['#ebf8ff', '#bee3f8'],
    burstText: 'SOB...',
    burstColor: '#90cdf4',
    burstAngle: 8,
    innerSvg: `
      <!-- Sad Face with Tear -->
      <circle cx="0" cy="0" r="38" fill="#90cdf4" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Downward eyebrows -->
      <line x1="-22" y1="-14" x2="-8" y2="-8" stroke="#1a202c" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="22" y1="-14" x2="8" y2="-8" stroke="#1a202c" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Eyes -->
      <circle cx="-14" cy="-2" r="4" fill="#1a202c"/>
      <circle cx="14" cy="-2" r="4" fill="#1a202c"/>
      <!-- Blue Tear Drop -->
      <path d="M -14,8 Q -10,18 -14,24 Q -18,18 -14,8 Z" fill="#3182ce" stroke="#1a202c" stroke-width="2"/>
      <!-- Downward curved mouth -->
      <path d="M -16,22 Q 0,10 16,22" stroke="#1a202c" stroke-width="4" fill="none" stroke-linecap="round"/>
    `
  },
  15: { // angry
    tagColor: '#e53e3e',
    bgColors: ['#fff5f5', '#fed7d7'],
    burstText: '#!@*!',
    burstColor: '#feb2b2',
    burstAngle: -14,
    innerSvg: `
      <!-- Angry Steaming Face -->
      <circle cx="0" cy="0" r="38" fill="#fc8181" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Slanted angry brows -->
      <line x1="-24" y1="-12" x2="-6" y2="-4" stroke="#1a202c" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="24" y1="-12" x2="6" y2="-4" stroke="#1a202c" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Eyes -->
      <circle cx="-14" cy="0" r="4" fill="#1a202c"/>
      <circle cx="14" cy="0" r="4" fill="#1a202c"/>
      <!-- Clenched teeth grimace -->
      <rect x="-16" y="14" width="32" height="12" rx="4" fill="#ffffff" stroke="#1a202c" stroke-width="3"/>
      <line x1="-8" y1="14" x2="-8" y2="26" stroke="#1a202c" stroke-width="2"/>
      <line x1="0" y1="14" x2="0" y2="26" stroke="#1a202c" stroke-width="2"/>
      <line x1="8" y1="14" x2="8" y2="26" stroke="#1a202c" stroke-width="2"/>
      <!-- Steam from ears -->
      <path d="M -38,-10 Q -48,-16 -44,-24" stroke="#a0aec0" stroke-width="3" fill="none"/>
      <path d="M 38,-10 Q 48,-16 44,-24" stroke="#a0aec0" stroke-width="3" fill="none"/>
    `
  },
  16: { // ill
    tagColor: '#38a169',
    bgColors: ['#f0fff4', '#c6f6d5'],
    burstText: 'ACHOO!',
    burstColor: '#9ae6b4',
    burstAngle: 12,
    innerSvg: `
      <!-- Sick Face with Thermometer -->
      <circle cx="0" cy="0" r="38" fill="#9ae6b4" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Droopy sad eyes -->
      <path d="M -18,-6 Q -12,-2 -6,-6" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <path d="M 6,-6 Q 12,-2 18,-6" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <!-- Ice Pack on Head -->
      <ellipse cx="0" cy="-36" rx="20" ry="12" fill="#63b3ed" stroke="#1a202c" stroke-width="3"/>
      <circle cx="0" cy="-44" r="4" fill="#2b6cb0"/>
      <!-- Thermometer in mouth -->
      <g transform="translate(14, 14) rotate(-25)">
        <rect x="-4" y="-24" width="8" height="32" rx="4" fill="#ffffff" stroke="#1a202c" stroke-width="2"/>
        <rect x="-3" y="2" width="6" height="6" rx="3" fill="#e53e3e"/>
        <circle cx="0" cy="8" r="6" fill="#e53e3e" stroke="#1a202c" stroke-width="2"/>
      </g>
    `
  },
  17: { // nervous
    tagColor: '#d69e2e',
    bgColors: ['#fffff0', '#fefcbf'],
    burstText: 'GULP!',
    burstColor: '#faf089',
    burstAngle: -10,
    innerSvg: `
      <!-- Nervous Sweating Face -->
      <circle cx="0" cy="0" r="38" fill="#faf089" stroke="#1a202c" stroke-width="3.5"/>
      <!-- High worried brows -->
      <path d="M -22,-14 Q -14,-20 -6,-12" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <path d="M 22,-14 Q 14,-20 6,-12" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <!-- Big wide eyes -->
      <circle cx="-14" cy="-2" r="5" fill="#1a202c"/>
      <circle cx="14" cy="-2" r="5" fill="#1a202c"/>
      <!-- Wobbly squiggly mouth -->
      <path d="M -16,18 Q -8,12 0,18 Q 8,24 16,18" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <!-- Big sweat drop -->
      <path d="M 28,-18 Q 36,-10 32,-4 Q 26,0 24,-6 Z" fill="#63b3ed" stroke="#1a202c" stroke-width="2"/>
    `
  },
  18: { // scared
    tagColor: '#805ad5',
    bgColors: ['#faf5ff', '#e9d8fd'],
    burstText: 'EEK!',
    burstColor: '#d6bcfa',
    burstAngle: 14,
    innerSvg: `
      <!-- Terrified Shivering Face -->
      <circle cx="0" cy="0" r="38" fill="#b794f4" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Spiky hair standing up -->
      <polygon points="-14,-36 -8,-50 -2,-38 6,-52 14,-36" fill="#1a202c"/>
      <!-- Huge white eyes with tiny pupils -->
      <circle cx="-14" cy="-4" r="8" fill="#ffffff" stroke="#1a202c" stroke-width="2.5"/>
      <circle cx="-14" cy="-4" r="2.5" fill="#1a202c"/>
      <circle cx="14" cy="-4" r="8" fill="#ffffff" stroke="#1a202c" stroke-width="2.5"/>
      <circle cx="14" cy="-4" r="2.5" fill="#1a202c"/>
      <!-- Trembling open O mouth -->
      <ellipse cx="0" cy="18" rx="8" ry="12" fill="#1a202c"/>
    `
  },
  19: { // afraid
    tagColor: '#553c9a',
    bgColors: ['#faf5ff', '#d6bcfa'],
    burstText: 'SPOOKY!',
    burstColor: '#9f7aea',
    burstAngle: -8,
    innerSvg: `
      <!-- Character hiding eyes / ghost shadow -->
      <circle cx="0" cy="2" r="38" fill="#9f7aea" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Hands covering face with peeking eyes -->
      <rect x="-24" y="-8" width="18" height="26" rx="6" fill="#d6bcfa" stroke="#1a202c" stroke-width="3"/>
      <rect x="6" y="-8" width="18" height="26" rx="6" fill="#d6bcfa" stroke="#1a202c" stroke-width="3"/>
      <circle cx="-15" cy="-2" r="4" fill="#1a202c"/>
      <circle cx="15" cy="-2" r="4" fill="#1a202c"/>
    `
  },
  20: { // tired
    tagColor: '#4a5568',
    bgColors: ['#f7fafc', '#e2e8f0'],
    burstText: 'YAWN...',
    burstColor: '#cbd5e0',
    burstAngle: 10,
    innerSvg: `
      <!-- Yawning Sleepy Face -->
      <circle cx="0" cy="0" r="38" fill="#e2e8f0" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Heavy closed eyelids -->
      <path d="M -22,-6 Q -14,-2 -6,-6" stroke="#1a202c" stroke-width="4" fill="none"/>
      <path d="M 6,-6 Q 14,-2 22,-6" stroke="#1a202c" stroke-width="4" fill="none"/>
      <!-- Huge open yawning mouth -->
      <ellipse cx="0" cy="16" rx="14" ry="18" fill="#e53e3e" stroke="#1a202c" stroke-width="3.5"/>
      <ellipse cx="0" cy="18" rx="8" ry="10" fill="#1a202c"/>
    `
  },
  21: { // proud
    tagColor: '#d69e2e',
    bgColors: ['#fffff0', '#fefcbf'],
    burstText: 'A+ TOP!',
    burstColor: '#ecc94b',
    burstAngle: -12,
    innerSvg: `
      <!-- Proud Pupil with Gold Medal -->
      <circle cx="0" cy="-6" r="32" fill="#faf089" stroke="#1a202c" stroke-width="3.5"/>
      <path d="M -18,-10 Q -12,-16 -6,-10" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <path d="M 6,-10 Q 12,-16 18,-10" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <path d="M -14,6 Q 0,22 14,6 Z" fill="#ffffff" stroke="#1a202c" stroke-width="3"/>
      <!-- Gold Medal Ribbon & Star -->
      <polygon points="-8,24 -16,46 0,38 16,46 8,24" fill="#e53e3e" stroke="#1a202c" stroke-width="2"/>
      <circle cx="0" cy="24" r="14" fill="#ecc94b" stroke="#1a202c" stroke-width="2.5"/>
      <text x="0" y="28" font-size="12" text-anchor="middle">★</text>
    `
  },
  22: { // sorry
    tagColor: '#4a5568',
    bgColors: ['#f7fafc', '#edf2f7'],
    burstText: 'FORGIVE ME',
    burstColor: '#e2e8f0',
    burstAngle: 8,
    innerSvg: `
      <!-- Apologetic bowed face & folded hands -->
      <circle cx="0" cy="-8" r="32" fill="#edf2f7" stroke="#1a202c" stroke-width="3.5"/>
      <path d="M -14,-14 Q -8,-10 -2,-14" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <path d="M 2,-14 Q 8,-10 14,-14" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <path d="M -10,8 Q 0,2 10,8" stroke="#1a202c" stroke-width="3.5" fill="none"/>
      <!-- Hands folded in apology -->
      <path d="M -12,18 C -14,28 0,34 0,34 C 0,34 14,28 12,18 Z" fill="#cbd5e0" stroke="#1a202c" stroke-width="3"/>
    `
  },

  // --- FREQUENCY & ADVERBS ---
  55: { // always
    tagColor: '#38a169',
    bgColors: ['#f0fff4', '#9ae6b4'],
    burstText: '100%!',
    burstColor: '#48bb78',
    burstAngle: 12,
    innerSvg: `
      <!-- Speedometer dial pegged at 100% -->
      <path d="M -44,14 A 44,44 0 0,1 44,14 Z" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <path d="M -40,14 A 40,40 0 0,1 40,14 Z" fill="#48bb78" stroke="#1a202c" stroke-width="2"/>
      <!-- Needle pointing all the way to 100% -->
      <line x1="0" y1="14" x2="36" y2="4" stroke="#e53e3e" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="14" r="8" fill="#1a202c"/>
      <!-- 7 out of 7 stars -->
      <text x="0" y="-8" font-family="'Outfit', sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">EVERY TIME</text>
    `
  },
  56: { // usually
    tagColor: '#319795',
    bgColors: ['#e6fffa', '#b2f5ea'],
    burstText: '85%!',
    burstColor: '#4fd1c5',
    burstAngle: -8,
    innerSvg: `
      <path d="M -44,14 A 44,44 0 0,1 44,14 Z" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <path d="M -40,14 A 40,40 0 0,1 28,-22" fill="#319795" stroke="#1a202c" stroke-width="2"/>
      <line x1="0" y1="14" x2="24" y2="-18" stroke="#e53e3e" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="14" r="8" fill="#1a202c"/>
      <text x="0" y="-4" font-family="'Outfit', sans-serif" font-size="11" font-weight="900" fill="#2c7a7b" text-anchor="middle">MOST DAYS</text>
    `
  },
  57: { // often
    tagColor: '#3182ce',
    bgColors: ['#ebf8ff', '#bee3f8'],
    burstText: '70%!',
    burstColor: '#63b3ed',
    burstAngle: 10,
    innerSvg: `
      <path d="M -44,14 A 44,44 0 0,1 44,14 Z" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <line x1="0" y1="14" x2="12" y2="-28" stroke="#e53e3e" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="14" r="8" fill="#1a202c"/>
      <text x="0" y="-4" font-family="'Outfit', sans-serif" font-size="11" font-weight="900" fill="#2b6cb0" text-anchor="middle">FREQUENTLY</text>
    `
  },
  58: { // sometimes
    tagColor: '#d69e2e',
    bgColors: ['#fffff0', '#fefcbf'],
    burstText: '50%!',
    burstColor: '#ecc94b',
    burstAngle: -10,
    innerSvg: `
      <path d="M -44,14 A 44,44 0 0,1 44,14 Z" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Needle right in center 50% -->
      <line x1="0" y1="14" x2="0" y2="-30" stroke="#e53e3e" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="14" r="8" fill="#1a202c"/>
      <text x="0" y="-4" font-family="'Outfit', sans-serif" font-size="11" font-weight="900" fill="#b7791f" text-anchor="middle">NOW & THEN</text>
    `
  },
  59: { // rarely
    tagColor: '#dd6b20',
    bgColors: ['#fffaf0', '#feebc8'],
    burstText: '20%!',
    burstColor: '#f6ad55',
    burstAngle: 8,
    innerSvg: `
      <path d="M -44,14 A 44,44 0 0,1 44,14 Z" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <line x1="0" y1="14" x2="-26" y2="-18" stroke="#e53e3e" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="14" r="8" fill="#1a202c"/>
      <text x="0" y="-4" font-family="'Outfit', sans-serif" font-size="11" font-weight="900" fill="#c05621" text-anchor="middle">NOT OFTEN</text>
    `
  },
  60: { // seldom
    tagColor: '#e53e3e',
    bgColors: ['#fff5f5', '#fed7d7'],
    burstText: '10%!',
    burstColor: '#feb2b2',
    burstAngle: -12,
    innerSvg: `
      <path d="M -44,14 A 44,44 0 0,1 44,14 Z" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <line x1="0" y1="14" x2="-34" y2="-6" stroke="#e53e3e" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="14" r="8" fill="#1a202c"/>
      <text x="0" y="-4" font-family="'Outfit', sans-serif" font-size="11" font-weight="900" fill="#9b2c2c" text-anchor="middle">HARDLY EVER</text>
    `
  },
  61: { // never
    tagColor: '#e53e3e',
    bgColors: ['#fff5f5', '#fed7d7'],
    burstText: '0%!',
    burstColor: '#e53e3e',
    burstAngle: 14,
    innerSvg: `
      <!-- Red Cross Mark -->
      <circle cx="0" cy="0" r="36" fill="#fed7d7" stroke="#1a202c" stroke-width="3.5"/>
      <line x1="-20" y1="-20" x2="20" y2="20" stroke="#e53e3e" stroke-width="8" stroke-linecap="round"/>
      <line x1="20" y1="-20" x2="-20" y2="20" stroke="#e53e3e" stroke-width="8" stroke-linecap="round"/>
    `
  },
  62: { // every day
    tagColor: '#2c7a7b',
    bgColors: ['#e6fffa', '#b2f5ea'],
    burstText: '7 DAYS!',
    burstColor: '#4fd1c5',
    burstAngle: -10,
    innerSvg: `
      <!-- Calendar Row with all days checked -->
      <rect x="-46" y="-30" width="92" height="60" rx="8" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <rect x="-46" y="-30" width="92" height="18" rx="4" fill="#319795"/>
      <text x="0" y="-18" font-family="'Outfit', sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">MON • TUE • WED • THU • FRI • SAT • SUN</text>
      <!-- Big green checkmark -->
      <path d="M -20,10 L -6,22 L 26,-6" stroke="#38a169" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  63: { // how often
    tagColor: '#805ad5',
    bgColors: ['#faf5ff', '#e9d8fd'],
    burstText: '? ? ?',
    burstColor: '#d6bcfa',
    burstAngle: 10,
    innerSvg: `
      <!-- Big question mark with clock face -->
      <circle cx="-16" cy="4" r="26" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <line x1="-16" y1="4" x2="-16" y2="-12" stroke="#1a202c" stroke-width="3"/>
      <line x1="-16" y1="4" x2="-6" y2="4" stroke="#e53e3e" stroke-width="3"/>
      <!-- Giant Comic Question Mark -->
      <text x="22" y="24" font-family="'Outfit', sans-serif" font-size="54" font-weight="900" fill="#805ad5" stroke="#1a202c" stroke-width="2">?</text>
    `
  },
  72: { // on time
    tagColor: '#38a169',
    bgColors: ['#f0fff4', '#c6f6d5'],
    burstText: 'EXACT!',
    burstColor: '#48bb78',
    burstAngle: -8,
    innerSvg: `
      <!-- Wall Clock showing 8:30 AM with checkmark -->
      <circle cx="-14" cy="0" r="30" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <line x1="-14" y1="0" x2="-14" y2="-16" stroke="#1a202c" stroke-width="4" stroke-linecap="round"/>
      <line x1="-14" y1="0" x2="-14" y2="18" stroke="#e53e3e" stroke-width="3" stroke-linecap="round"/>
      <circle cx="-14" cy="0" r="4" fill="#1a202c"/>
      <!-- Green Checkmark Badge -->
      <g transform="translate(26, 4)">
        <circle cx="0" cy="0" r="16" fill="#48bb78" stroke="#1a202c" stroke-width="2.5"/>
        <path d="M -7,-1 L -2,4 L 8,-6" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    `
  },

  // --- HEALTH & HABITS ---
  43: { // habit
    tagColor: '#319795',
    bgColors: ['#e6fffa', '#b2f5ea'],
    burstText: 'DAILY!',
    burstColor: '#4fd1c5',
    burstAngle: 10,
    innerSvg: `
      <!-- Habit Tracker Board with checkmarks -->
      <rect x="-42" y="-32" width="84" height="64" rx="8" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <rect x="-42" y="-32" width="84" height="16" rx="4" fill="#319795"/>
      <text x="0" y="-20" font-family="'Outfit', sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">ROUTINE TRACKER</text>
      <!-- Rows -->
      <circle cx="-26" cy="-2" r="5" fill="#48bb78"/>
      <line x1="-16" y1="-2" x2="32" y2="-2" stroke="#cbd5e0" stroke-width="3"/>
      <circle cx="-26" cy="14" r="5" fill="#48bb78"/>
      <line x1="-16" y1="14" x2="24" y2="14" stroke="#cbd5e0" stroke-width="3"/>
    `
  },
  44: { // good habits
    tagColor: '#38a169',
    bgColors: ['#f0fff4', '#c6f6d5'],
    burstText: 'THUMBS UP!',
    burstColor: '#48bb78',
    burstAngle: -10,
    innerSvg: `
      <!-- Green Shield with Apple and Water -->
      <path d="M 0,-34 L 32,-20 C 32,16 0,36 0,36 C 0,36 -32,16 -32,-20 Z" fill="#48bb78" stroke="#1a202c" stroke-width="3.5"/>
      <text x="0" y="10" font-size="28" text-anchor="middle">🍎</text>
    `
  },
  45: { // bad habits
    tagColor: '#e53e3e',
    bgColors: ['#fff5f5', '#fed7d7'],
    burstText: 'STOP!',
    burstColor: '#feb2b2',
    burstAngle: 12,
    innerSvg: `
      <!-- Red Warning Triangle -->
      <polygon points="0,-36 38,28 -38,28" fill="#e53e3e" stroke="#1a202c" stroke-width="3.5"/>
      <polygon points="0,-28 30,22 -30,22" fill="#fff5f5"/>
      <text x="0" y="16" font-family="'Outfit', sans-serif" font-size="36" font-weight="900" fill="#e53e3e" text-anchor="middle">!</text>
    `
  },
  46: { // healthy eating
    tagColor: '#38a169',
    bgColors: ['#f0fff4', '#c6f6d5'],
    burstText: 'VITAMINS!',
    burstColor: '#68d391',
    burstAngle: -8,
    innerSvg: `
      <!-- Salad bowl with tomato and greens -->
      <path d="M -36,0 C -36,28 36,28 36,0 Z" fill="#ed8936" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Greens spilling over -->
      <circle cx="-16" cy="-4" r="14" fill="#48bb78" stroke="#1a202c" stroke-width="2"/>
      <circle cx="8" cy="-8" r="16" fill="#38a169" stroke="#1a202c" stroke-width="2"/>
      <circle cx="18" cy="-2" r="10" fill="#e53e3e" stroke="#1a202c" stroke-width="2"/>
      <circle cx="-6" cy="-12" r="8" fill="#ecc94b" stroke="#1a202c" stroke-width="2"/>
    `
  },
  47: { // keep fit
    tagColor: '#dd6b20',
    bgColors: ['#fffaf0', '#feebc8'],
    burstText: 'STRONG!',
    burstColor: '#f6ad55',
    burstAngle: 10,
    innerSvg: `
      <!-- Skipping Rope & Dumbbell -->
      <path d="M -34,18 C -34,-24 34,-24 34,18" stroke="#e53e3e" stroke-width="4" fill="none"/>
      <!-- Dumbbell -->
      <rect x="-24" y="-3" width="48" height="6" fill="#a0aec0" stroke="#1a202c" stroke-width="2"/>
      <rect x="-32" y="-14" width="10" height="28" rx="3" fill="#2d3748" stroke="#1a202c" stroke-width="2.5"/>
      <rect x="22" y="-14" width="10" height="28" rx="3" fill="#2d3748" stroke="#1a202c" stroke-width="2.5"/>
    `
  },
  48: { // practise
    tagColor: '#2b6cb0',
    bgColors: ['#ebf8ff', '#bee3f8'],
    burstText: 'REPLAY!',
    burstColor: '#63b3ed',
    burstAngle: -10,
    innerSvg: `
      <!-- Target & Arrow in Bullseye -->
      <circle cx="0" cy="0" r="34" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <circle cx="0" cy="0" r="24" fill="#e53e3e" stroke="#1a202c" stroke-width="2.5"/>
      <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#1a202c" stroke-width="2.5"/>
      <circle cx="0" cy="0" r="6" fill="#e53e3e"/>
      <!-- Arrow in center -->
      <line x1="-36" y1="-28" x2="0" y2="0" stroke="#1a202c" stroke-width="4.5"/>
      <polygon points="-36,-28 -34,-18 -26,-24" fill="#ecc94b"/>
    `
  },
  52: { // exercise
    tagColor: '#e53e3e',
    bgColors: ['#fff5f5', '#fed7d7'],
    burstText: 'ENERGY!',
    burstColor: '#feb2b2',
    burstAngle: 12,
    innerSvg: `
      <!-- Running Sneaker with motion lines -->
      <g transform="translate(0, 4)">
        <path d="M -34,16 L 24,16 C 36,16 38,4 30,0 L 14,-14 L -10,-14 L -20,2 L -34,6 Z" fill="#3182ce" stroke="#1a202c" stroke-width="3.5"/>
        <rect x="-36" y="16" width="70" height="8" rx="4" fill="#ffffff" stroke="#1a202c" stroke-width="2.5"/>
        <!-- Motion lines -->
        <line x1="-44" y1="2" x2="-38" y2="2" stroke="#1a202c" stroke-width="3"/>
        <line x1="-48" y1="12" x2="-40" y2="12" stroke="#1a202c" stroke-width="3"/>
      </g>
    `
  },
  53: { // diet
    tagColor: '#38a169',
    bgColors: ['#f0fff4', '#c6f6d5'],
    burstText: 'BALANCE!',
    burstColor: '#48bb78',
    burstAngle: -8,
    innerSvg: `
      <!-- Nutrition Balance Plate -->
      <circle cx="0" cy="0" r="36" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <!-- 3 Segments: Veg, Protein, Carbs -->
      <path d="M 0,0 L 0,-36 A 36,36 0 0,1 36,0 Z" fill="#48bb78" opacity="0.8"/>
      <path d="M 0,0 L 36,0 A 36,36 0 0,1 -18,31 Z" fill="#ed8936" opacity="0.8"/>
      <path d="M 0,0 L -18,31 A 36,36 0 0,1 0,-36 Z" fill="#ecd599" opacity="0.8"/>
      <circle cx="0" cy="0" r="4" fill="#1a202c"/>
    `
  },
  54: { // advice
    tagColor: '#805ad5',
    bgColors: ['#faf5ff', '#e9d8fd'],
    burstText: 'TIP!',
    burstColor: '#d6bcfa',
    burstAngle: 12,
    innerSvg: `
      <!-- Speech bubble with golden lightbulb -->
      <path d="M -34,-26 L 34,-26 C 40,-26 40,16 10,16 L 0,30 L -6,16 L -34,16 Z" fill="#ffffff" stroke="#1a202c" stroke-width="3.5"/>
      <!-- Lightbulb inside -->
      <circle cx="4" cy="-6" r="10" fill="#ecc94b" stroke="#1a202c" stroke-width="2"/>
      <rect x="1" y="4" width="6" height="5" fill="#a0aec0" stroke="#1a202c" stroke-width="1.5"/>
    `
  },

  // --- WORLD CUSTOMS ---
  65: { // manners
    tagColor: '#2b6cb0',
    bgColors: ['#ebf8ff', '#bee3f8'],
    burstText: 'PLEASE!',
    burstColor: '#63b3ed',
    burstAngle: 10,
    innerSvg: `
      <!-- Two polite speech bubbles: PLEASE & THANK YOU -->
      <g transform="translate(-16, -10)">
        <rect x="-24" y="-18" width="48" height="26" rx="6" fill="#ffffff" stroke="#1a202c" stroke-width="3"/>
        <text x="0" y="-1" font-family="'Outfit', sans-serif" font-size="8" font-weight="900" fill="#2b6cb0" text-anchor="middle">PLEASE</text>
      </g>
      <g transform="translate(18, 12)">
        <rect x="-26" y="-18" width="52" height="26" rx="6" fill="#48bb78" stroke="#1a202c" stroke-width="3"/>
        <text x="0" y="-1" font-family="'Outfit', sans-serif" font-size="8" font-weight="900" fill="#ffffff" text-anchor="middle">THANK YOU</text>
      </g>
    `
  },
  69: { // take off shoes
    tagColor: '#c53030',
    bgColors: ['#fff5f5', '#fed7d7'],
    burstText: 'SHOES OFF!',
    burstColor: '#feb2b2',
    burstAngle: -10,
    innerSvg: `
      <!-- Japanese Wooden Step & Pair of Shoes Taken Off -->
      <!-- Wooden Floor & Step -->
      <rect x="-46" y="-28" width="92" height="26" fill="#d69e2e" stroke="#1a202c" stroke-width="3"/>
      <rect x="-46" y="-2" width="92" height="34" fill="#a0aec0" stroke="#1a202c" stroke-width="3"/>
      <!-- Pair of Shoes on Lower Step -->
      <ellipse cx="-16" cy="14" rx="10" ry="16" fill="#e53e3e" stroke="#1a202c" stroke-width="2.5"/>
      <ellipse cx="16" cy="14" rx="10" ry="16" fill="#e53e3e" stroke="#1a202c" stroke-width="2.5"/>
    `
  },
  70: { // traditional
    tagColor: '#b7791f',
    bgColors: ['#fffaf0', '#feebc8'],
    burstText: 'HERITAGE',
    burstColor: '#d69e2e',
    burstAngle: 8,
    innerSvg: `
      <!-- Ancient Greek Amphora Vase with Meander Pattern -->
      <path d="M 0,-34 C 18,-34 26,-10 22,10 C 18,26 8,32 0,32 C -8,32 -18,26 -22,10 C -26,-10 -18,-34 0,-34 Z" fill="#dd6b20" stroke="#1a202c" stroke-width="3.5"/>
      <ellipse cx="0" cy="-34" rx="10" ry="4" fill="#2d3748" stroke="#1a202c" stroke-width="2"/>
      <!-- Amphora Handles -->
      <path d="M -18,-18 C -30,-12 -28,4 -18,8" stroke="#1a202c" stroke-width="3" fill="none"/>
      <path d="M 18,-18 C 30,-12 28,4 18,8" stroke="#1a202c" stroke-width="3" fill="none"/>
      <!-- Black Meander Belt -->
      <rect x="-21" y="-4" width="42" height="10" fill="#1a202c"/>
      <line x1="-21" y1="1" x2="21" y2="1" stroke="#ffffff" stroke-width="2"/>
    `
  }
};

console.log('=== GENERATING UNIT 2 BESPOKE GRAPHIC NOVEL SVGS ===');

let updatedCount = 0;
for (const item of vocab) {
  const custom = SVG_ARTWORK[item.id];
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
    updatedCount++;
    console.log(`[GENERATED] Card #${item.id} (${item.word}) -> ${item.image}`);
  }
}

// Write back to vocabulary data JSON and JS
fs.writeFileSync(vocabPath, JSON.stringify(vocab, null, 2));
fs.writeFileSync('unit2/data/vocabulary_data.js', 'window.VOCABULARY_DATA = ' + JSON.stringify(vocab, null, 2) + ';');

console.log(`\n=== COMPLETED! Successfully updated ${updatedCount} cards with bespoke graphic novel artwork ===`);
