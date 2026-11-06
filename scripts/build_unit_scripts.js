const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const U1_DIR = path.join(ROOT, 'warm_comic_modern', 'unit1');
const U2_DIR = path.join(ROOT, 'warm_comic_modern', 'unit2');

// --- Process app_v2.js ---
let v2Code = fs.readFileSync(path.join(U2_DIR, 'app_v2.js'), 'utf8');

// Parameterize resolveAsset
v2Code = v2Code.replace(
  /function resolveAsset\(p\) \{[\s\S]*?return p;\s*\}/,
  `function resolveAsset(p) {
    if (!p) return p;
    if (typeof p === 'string' && p.startsWith('assets/')) {
      return \`../../unit\${unitNum || '2'}/\` + p;
    }
    return p;
  }`
);

// Parameterize loadData paths
v2Code = v2Code.replace(/\`\.\.\/\.\.\/unit2\/data\/unit\$\{unitNum\}_v2_data\.js\`/g, '`../../unit${unitNum}/data/unit${unitNum}_v2_data.js`');
v2Code = v2Code.replace(/\`\.\.\/\.\.\/unit2\/data\/unit\$\{unitNum\}_v2_data\.json\`/g, '`../../unit${unitNum}/data/unit${unitNum}_v2_data.json`');
v2Code = v2Code.replace(/\`\.\.\/\.\.\/unit2\/data\/\$\{workbookSrc\}\`/g, '`../../unit${unitNum}/data/${workbookSrc}`');
v2Code = v2Code.replace(/\`\.\.\/\.\.\/unit2\/assets\/audio_neural\`/g, '`../../unit${unitNum}/assets/audio_neural`');
v2Code = v2Code.replace(/\`\.\.\/\.\.\/unit2\/assets\/audio\`/g, '`../../unit${unitNum}/assets/audio`');

// Safe stopAudio teardown
v2Code = v2Code.replace(
  /function stopAudio\(\) \{[\s\S]*?if \(currentAudio\) \{[\s\S]*?currentAudio = null;\s*\}/,
  `function stopAudio() {
    if (audioTimer) clearTimeout(audioTimer);
    audioTimer = null;
    audioQueue = [];
    if (currentAudio) {
      currentAudio.onended = null;
      currentAudio.onerror = null;
      currentAudio.pause();
      currentAudio.removeAttribute('src');
      currentAudio.load();
      currentAudio = null;
    }`
);

fs.writeFileSync(path.join(U2_DIR, 'app_v2.js'), v2Code, 'utf8');

let u1V2Code = v2Code.replace(/const unitNum = body\.dataset\.unit \|\| '';/, "const unitNum = body.dataset.unit || '1';");
fs.writeFileSync(path.join(U1_DIR, 'app_v2.js'), u1V2Code, 'utf8');

// --- Process app_companion.js ---
let compCode = fs.readFileSync(path.join(U2_DIR, 'app_companion.js'), 'utf8');

// Parameterize resolveAsset
compCode = compCode.replace(
  /function resolveAsset\(p\) \{[\s\S]*?return p;\s*\}/,
  `function resolveAsset(p) {
    if (!p) return p;
    if (typeof p === 'string' && p.startsWith('assets/')) {
      return \`../../unit\${unitNum || '2'}/\` + p;
    }
    return p;
  }`
);

// Parameterize paths
compCode = compCode.replace(/\`\.\.\/\.\.\/unit2\/data\/unit\$\{unitNum\}_v2_data\.js\`/g, '`../../unit${unitNum}/data/unit${unitNum}_v2_data.js`');
compCode = compCode.replace(/\`\.\.\/\.\.\/unit2\/data\/unit\$\{unitNum\}_v2_data\.json\`/g, '`../../unit${unitNum}/data/unit${unitNum}_v2_data.json`');
compCode = compCode.replace(/\`\.\.\/\.\.\/unit2\/assets\/audio_neural\`/g, '`../../unit${unitNum}/assets/audio_neural`');
compCode = compCode.replace(/\`\.\.\/\.\.\/unit2\/assets\/audio\`/g, '`../../unit${unitNum}/assets/audio`');

// Safe stopAudio teardown
compCode = compCode.replace(
  /function stopAudio\(\) \{[\s\S]*?if \(currentAudio\) \{[\s\S]*?currentAudio = null;\s*\}/,
  `function stopAudio() {
    if (audioTimer) clearTimeout(audioTimer);
    audioTimer = null;
    audioQueue = [];
    if (currentAudio) {
      currentAudio.onended = null;
      currentAudio.onerror = null;
      currentAudio.pause();
      currentAudio.removeAttribute('src');
      currentAudio.load();
      currentAudio = null;
    }`
);

fs.writeFileSync(path.join(U2_DIR, 'app_companion.js'), compCode, 'utf8');

let u1CompCode = compCode.replace(/const unitNum = body\.dataset\.unit \|\| '';/, "const unitNum = body.dataset.unit || '1';");
fs.writeFileSync(path.join(U1_DIR, 'app_companion.js'), u1CompCode, 'utf8');

console.log('Successfully written warm_comic_modern/unit1 and unit2 app_v2.js and app_companion.js');

