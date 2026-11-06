const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const U1_DIR = path.join(ROOT, 'warm_comic_modern', 'unit1');
const U2_DIR = path.join(ROOT, 'warm_comic_modern', 'unit2');

if (!fs.existsSync(U1_DIR)) {
  fs.mkdirSync(U1_DIR, { recursive: true });
}

// 1. Process CSS
let css = fs.readFileSync(path.join(U2_DIR, 'unit2_comic.css'), 'utf8');

const compactHeaderRules = `/* =============================================================
   Header & Navigation — Compact Single-Screen Header Overrides
   (RETRO_COMIC_BIOWARM_2026_SPEC.md §4.3)
   ============================================================= */
.app-header, .main-header {
  position: relative !important;
  top: auto !important;
  background: var(--snow) !important;
  border-bottom: 2.5px solid var(--ink) !important;
  box-shadow: 0 3px 0 0 var(--ink) !important;
  padding: 6px 0 8px !important;
  margin-bottom: 14px !important;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4px 20px !important;
}

.top-nav-row, .header-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px !important;
  padding-bottom: 6px !important;
  border-bottom: 2px dashed rgba(15, 23, 42, 0.2);
}

.header-hero, .header-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center !important;
  flex-wrap: wrap;
  gap: 10px !important;
  padding: 2px 0 6px !important;
  margin-bottom: 4px !important;
}

.title-wrap, .hero-text-wrap {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.main-title {
  font-size: clamp(1.3rem, 2.2vw, 1.6rem) !important;
  line-height: 1.1;
  margin: 0 !important;
}

.sub-title {
  font-size: 0.82rem !important;
  margin: 0 !important;
}`;

// Replace the old Header & Navigation section in unit2_comic.css
const oldHeaderRegex = /\/\* =+\s*Header & Navigation\s*=+\s*\*\/[\s\S]*?\.top-nav-row[\s\S]*?border-bottom: 2px dashed rgba\(15, 23, 42, 0\.2\);\s*\}/;

if (oldHeaderRegex.test(css)) {
  css = css.replace(oldHeaderRegex, compactHeaderRules);
  fs.writeFileSync(path.join(U2_DIR, 'unit2_comic.css'), css, 'utf8');
}

let u1Css = css.replace(/Unit 2/g, 'Unit 1').replace(/unit2/g, 'unit1');
fs.writeFileSync(path.join(U1_DIR, 'unit1_comic.css'), u1Css, 'utf8');

console.log('Successfully written unit1_comic.css and updated unit2_comic.css');

