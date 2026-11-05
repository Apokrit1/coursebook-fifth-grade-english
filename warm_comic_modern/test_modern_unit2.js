/**
 * AUTOMATED VERIFICATION TEST SUITE: RETRO COMIC UNIT 2 (BIO-WARM 2026)
 * Validates DOM references, asset resolution, offline font delivery, and bidirectional navigation.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MODERN_ROOT = path.join(ROOT, 'warm_comic_modern');
const MODERN_U2 = path.join(MODERN_ROOT, 'unit2');
const CLASSIC_U2 = path.join(ROOT, 'unit2');

console.log('====================================================');
console.log('RUNNING BIO-WARM 2026 RETRO-COMIC UNIT 2 TEST SUITE');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Files exist and non-empty
console.log('--- 1. Structural File Integrity ---');
const requiredFiles = [
  { p: path.join(MODERN_ROOT, 'index.html'), desc: 'Modern Graphic Novel Hub index.html' },
  { p: path.join(MODERN_ROOT, 'style.css'), desc: 'Bio-Warm 2026 Root style.css' },
  { p: path.join(MODERN_ROOT, 'modern_hub_script.js'), desc: 'Modern Hub script' },
  { p: path.join(MODERN_ROOT, 'fonts', 'fonts.css'), desc: 'Offline fonts.css' },
  { p: path.join(MODERN_U2, 'index.html'), desc: 'Unit 2 Comic Coursebook index.html' },
  { p: path.join(MODERN_U2, 'companion.html'), desc: 'Unit 2 Vocabulary Companion companion.html' },
  { p: path.join(MODERN_U2, 'unit2_comic.css'), desc: 'Unit 2 Retro-Comic theme stylesheet' },
  { p: path.join(MODERN_U2, 'app_v2.js'), desc: 'Unit 2 Coursebook logic app_v2.js' },
  { p: path.join(MODERN_U2, 'app_companion.js'), desc: 'Unit 2 Companion logic app_companion.js' }
];

requiredFiles.forEach(f => {
  const exists = fs.existsSync(f.p);
  const size = exists ? fs.statSync(f.p).size : 0;
  assert(exists && size > 50, `${f.desc} exists and non-empty (${size} bytes)`);
});

// 2. Hub index.html checks
console.log('\n--- 2. Modern Hub Integrity ---');
const hubHtml = fs.readFileSync(path.join(MODERN_ROOT, 'index.html'), 'utf8');
assert(hubHtml.includes('href="unit2/index.html"'), 'Hub links to unit2/index.html (Coursebook)');
assert(hubHtml.includes('href="unit2/companion.html"'), 'Hub links to unit2/companion.html (Companion)');
assert(hubHtml.includes('href="../portal.html"'), 'Hub links back to Classic Portal (../portal.html)');
assert(hubHtml.includes('School Life &amp; The World Around Us'), 'Hub features Unit 2: School Life');
assert(hubHtml.includes('data-filter="term-1"'), 'Hub has Term 1 filter chip');
assert(hubHtml.includes('data-filter="term-2"'), 'Hub has Term 2 filter chip');
assert(hubHtml.includes('data-filter="term-3"'), 'Hub has Term 3 filter chip');

// 3. Modern Unit 2 Coursebook (index.html) integrity
console.log('\n--- 3. Coursebook (index.html) Integrity ---');
const cbHtml = fs.readFileSync(path.join(MODERN_U2, 'index.html'), 'utf8');
assert(cbHtml.includes('unit2_comic.css'), 'Coursebook links to unit2_comic.css');
assert(cbHtml.includes('href="../style.css"'), 'Coursebook links to root style.css');
assert(cbHtml.includes('href="../fonts/fonts.css"'), 'Coursebook links to fonts.css');
assert(cbHtml.includes('href="../../unit2/v2.html"'), 'Coursebook preserves switch link to Classic Edition');
assert(cbHtml.includes('href="companion.html"'), 'Coursebook links to modern companion.html');
assert(cbHtml.includes('href="../index.html"'), 'Coursebook links back to modern Graphic Novel Hub');
assert(cbHtml.includes('../../unit2/data/vocabulary_data.js'), 'Coursebook links to classic vocabulary_data.js');
assert(cbHtml.includes('../../unit2/data/unit2_v2_data.js'), 'Coursebook links to classic unit2_v2_data.js');
assert(cbHtml.includes('../../unit2/data/unit2_workbook_data.js'), 'Coursebook links to classic unit2_workbook_data.js');
assert(cbHtml.includes('id="moduleTabs"'), 'Coursebook has moduleTabs navigation bar');
assert(cbHtml.includes('id="v2Panels"'), 'Coursebook has v2Panels container');

// 4. Modern Unit 2 Companion (companion.html) integrity
console.log('\n--- 4. Vocabulary Companion (companion.html) Integrity ---');
const compHtml = fs.readFileSync(path.join(MODERN_U2, 'companion.html'), 'utf8');
assert(compHtml.includes('unit2_comic.css'), 'Companion links to unit2_comic.css');
assert(compHtml.includes('href="../style.css"'), 'Companion links to root style.css');
assert(compHtml.includes('href="../fonts/fonts.css"'), 'Companion links to fonts.css');
assert(compHtml.includes('href="../../unit2/index.html"'), 'Companion preserves switch link to Classic Companion');
assert(compHtml.includes('href="index.html"'), 'Companion links to modern Coursebook');
assert(compHtml.includes('href="../index.html"'), 'Companion links back to Graphic Novel Hub');
assert(compHtml.includes('id="viewTable"'), 'Companion has Table View panel');
assert(compHtml.includes('id="viewCards"'), 'Companion has Flashcards panel');
assert(compHtml.includes('id="viewQuiz"'), 'Companion has Listening Challenge panel');
assert(compHtml.includes('id="viewDefQuiz"'), 'Companion has Definition Challenge panel');
assert(compHtml.includes('id="viewPrintable"'), 'Companion has Printable Study Sheet panel');
assert(compHtml.includes('id="viewTTS"'), 'Companion has TTS Export panel');

// 5. Asset resolution checks (no 404s)
console.log('\n--- 5. Physical Asset Resolution Check ---');
const u2Data = JSON.parse(fs.readFileSync(path.join(CLASSIC_U2, 'data', 'unit2_v2_data.json'), 'utf8'));

u2Data.stories.forEach(story => {
  const imgRel = story.image;
  const audioRel = story.audio_file;
  
  if (imgRel) {
    const imgPhys = path.resolve(CLASSIC_U2, imgRel);
    assert(fs.existsSync(imgPhys), `Story image exists: ${story.id} -> ${imgRel}`);
  }
  if (audioRel) {
    const audioPhys = path.resolve(CLASSIC_U2, audioRel);
    assert(fs.existsSync(audioPhys), `Story audio exists: ${story.id} -> ${audioRel}`);
  }
});

// Check authentic listening audio
if (u2Data.grammar_lab && u2Data.grammar_lab.authentic_listening) {
  const listeningAudio = path.resolve(CLASSIC_U2, u2Data.grammar_lab.authentic_listening.audio_file);
  assert(fs.existsSync(listeningAudio), `Authentic listening audio exists -> ${u2Data.grammar_lab.authentic_listening.audio_file}`);
}

// Check sample vocabulary audio (first 5 words)
const vocabData = JSON.parse(fs.readFileSync(path.join(CLASSIC_U2, 'data', 'vocabulary_data.json'), 'utf8'));
vocabData.slice(0, 5).forEach(item => {
  const pad = String(item.id).padStart(2, '0');
  const wordMp3 = path.resolve(CLASSIC_U2, 'assets', 'audio_neural', 'words', `${pad}_word.mp3`);
  const defMp3 = path.resolve(CLASSIC_U2, 'assets', 'audio_neural', 'defs', `${pad}_definition.mp3`);
  const exMp3 = path.resolve(CLASSIC_U2, 'assets', 'audio_neural', 'examples', `${pad}_example.mp3`);
  assert(fs.existsSync(wordMp3), `Neural word audio exists for item #${item.id} (${item.word})`);
  assert(fs.existsSync(defMp3), `Neural def audio exists for item #${item.id}`);
  assert(fs.existsSync(exMp3), `Neural example audio exists for item #${item.id}`);
});

console.log('\n====================================================');
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

process.exit(failed > 0 ? 1 : 0);

