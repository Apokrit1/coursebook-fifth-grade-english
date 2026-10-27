/**
 * Unit 2 Master Test Suite
 * Asserts all quality criteria from APP_SPECIFICATION_GRADE5.md and DEFINITION_OF_DONE.md.
 * Usage: node test_v2.js
 */

const fs = require('fs');
const path = require('path');

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

async function runTests() {
  console.log('=== RUNNING UNIT 2 MASTER QUALITY & INTEGRITY SUITE ===\n');

  const BASE_DIR = __dirname;
  const v2JsonPath = path.join(BASE_DIR, 'data/unit2_v2_data.json');
  const v2JsPath = path.join(BASE_DIR, 'data/unit2_v2_data.js');
  const vocabJsonPath = path.join(BASE_DIR, 'data/vocabulary_data.json');
  const vocabJsPath = path.join(BASE_DIR, 'data/vocabulary_data.js');
  const wbJsonPath = path.join(BASE_DIR, 'data/unit2_workbook_data.json');
  const wbJsPath = path.join(BASE_DIR, 'data/unit2_workbook_data.js');

  // 1. Core Data Files & Twin Parity
  console.log('--- 1. Data Files & Twin Parity ---');
  assert(fs.existsSync(v2JsonPath), `V2 JSON exists: ${v2JsonPath}`);
  assert(fs.existsSync(v2JsPath), `V2 JS twin exists: ${v2JsPath}`);
  assert(fs.existsSync(vocabJsonPath), `Vocabulary JSON exists: ${vocabJsonPath}`);
  assert(fs.existsSync(vocabJsPath), `Vocabulary JS twin exists: ${vocabJsPath}`);
  assert(fs.existsSync(wbJsonPath), `Workbook JSON exists: ${wbJsonPath}`);
  assert(fs.existsSync(wbJsPath), `Workbook JS twin exists: ${wbJsPath}`);

  const v2Data = JSON.parse(fs.readFileSync(v2JsonPath, 'utf-8'));
  const vocabData = JSON.parse(fs.readFileSync(vocabJsonPath, 'utf-8'));
  const wbData = JSON.parse(fs.readFileSync(wbJsonPath, 'utf-8'));

  assert(v2Data.unit_id === 2, 'unit_id is 2');
  assert(v2Data.unit_title === 'School Life & The World Around Us', 'unit_title matches curriculum');
  assert(vocabData.length === 72, `Vocabulary item count matches catalog exactly (72 items, found: ${vocabData.length})`);

  // 2. Lexical Quality, Definition Constraints & Distractor Matrix
  console.log('\n--- 2. Lexical Quality, Definition Constraints & Distractor Matrices ---');
  vocabData.forEach(item => {
    assert(Boolean(item.word && item.ipa && item.meaning_gr && item.definition_en && item.example && item.category),
      `Item #${item.id} (${item.word}) has complete fields`);

    const wordCount = item.definition_en.trim().split(/\s+/).length;
    assert(wordCount <= 14,
      `Item #${item.id} (${item.word}) definition <= 14 words (${wordCount} words: "${item.definition_en}")`);

    // Verify stem in example
    const firstStem = item.word.toLowerCase().split(/\s+/)[0].replace(/[^a-z]/g, '');
    const exLower = item.example.toLowerCase();
    assert(exLower.includes(firstStem) || (item.word === 'keep fit' && exLower.includes('fit')),
      `Item #${item.id} (${item.word}) stem appears in example: "${item.example}"`);

    // Calibrated distractor checks
    assert(Array.isArray(item.distractors_word) && item.distractors_word.length === 3,
      `Item #${item.id} (${item.word}) has 3 word distractors`);
    assert(Array.isArray(item.distractors_greek) && item.distractors_greek.length === 3,
      `Item #${item.id} (${item.word}) has 3 Greek distractors`);
    assert(Array.isArray(item.distractors_def) && item.distractors_def.length === 3,
      `Item #${item.id} (${item.word}) has 3 definition distractors`);

    // Distinctness check
    assert(!item.distractors_word.includes(item.word),
      `Item #${item.id} (${item.word}) word distractors do not include target word`);
    assert(!item.distractors_greek.includes(item.meaning_gr),
      `Item #${item.id} (${item.word}) Greek distractors do not include target meaning`);
  });

  // 3. Landmark Bindings & Lexical Ownership
  console.log('\n--- 3. Landmark Lexical Bindings & Story Ownership ---');
  assert(v2Data.stories && v2Data.stories.length === 4, 'Contains 4 core story dossiers');
  v2Data.stories.forEach(story => {
    assert(fs.existsSync(path.join(BASE_DIR, story.image)), `Story image exists: ${story.image}`);
    (story.landmarks || []).forEach(lm => {
      let vItem = null;
      if (lm.word_key) {
        vItem = vocabData.find(v => v.word.toLowerCase() === lm.word_key.toLowerCase());
      }
      if (!vItem && lm.word_id) {
        vItem = vocabData.find(v => v.id === lm.word_id);
      }
      assert(vItem !== null && vItem !== undefined,
        `Landmark "${lm.name}" in "${story.title}" resolves to valid vocabulary item: ${lm.word_key || lm.word_id}`);

      if (vItem && story.vocabulary_ids) {
        assert(story.vocabulary_ids.includes(vItem.id),
          `Target word "${vItem.word}" (id:${vItem.id}) is owned in story vocabulary_ids`);
      }
    });
  });

  // 4. Inductive Grammar Lab & Dialogues
  console.log('\n--- 4. Inductive Grammar Lab, Speedometer & Dialogues ---');
  assert(Boolean(v2Data.grammar_lab), 'Grammar Lab module exists');
  assert(v2Data.grammar_lab.rules && v2Data.grammar_lab.rules.length >= 3, 'Grammar Lab has 3 inductive rule cards');
  assert(v2Data.grammar_lab.frequency_spectrum && v2Data.grammar_lab.frequency_spectrum.length === 6,
    'Grammar Lab includes 6-level frequency speedometer (always 100% to never 0%)');
  assert(v2Data.grammar_lab.practice_items && v2Data.grammar_lab.practice_items.length >= 6,
    'Grammar Lab has 6 interactive practice items');
  v2Data.grammar_lab.practice_items.forEach((p, idx) => {
    assert(Boolean(p.sentence && p.options && p.answer && p.explanation),
      `Practice item #${idx + 1} has full prompt, options, answer, and explanation`);
    assert(p.options.includes(p.answer),
      `Practice item #${idx + 1} correct answer "${p.answer}" is in options`);
  });

  // 5. Workbook Completeness & Differentiated Tasks
  console.log('\n--- 5. Workbook Activities & Differentiated Tasks ---');
  assert(wbData.activities && wbData.activities.length === 8, `Workbook contains 8 digitized activities (found: ${wbData.activities.length})`);
  const diffStar = wbData.activities.find(a => a.id === 'wb_u2_diff_star1');
  const diffTwoStars = wbData.activities.find(a => a.id === 'wb_u2_diff_star2');
  assert(Boolean(diffStar), 'Differentiated Task (*) digitized (Weekly School Timetable)');
  assert(Boolean(diffTwoStars), 'Differentiated Task (**) digitized (Henry Memory Game)');

  // 6. Collocations, Definition Challenge, Writing & Can-Do
  console.log('\n--- 6. Companion Modules (Collocations, Quizzes, Writing, Can-Do) ---');
  assert(v2Data.collocations && v2Data.collocations.length >= 8, 'Collocations module has 8 authentic pairs');
  assert(v2Data.definition_challenge && v2Data.definition_challenge.group_a && v2Data.definition_challenge.group_b,
    'Definition challenge has Group A & B');
  assert(Boolean(v2Data.writing_workshop && v2Data.writing_workshop.paragraphs.length === 4),
    'Writing workshop has 4 guided paragraphs');
  assert(Boolean(v2Data.can_do && v2Data.can_do.statements.length === 4),
    'Can-Do passport has 4 CEFR descriptor badges');

  // 7. Non-Composite Audio Invariant & Verbatim Sidecars
  console.log('\n--- 7. Audio Architecture Invariant & Verbatim Sidecars ---');
  const checkDirs = ['assets/audio', 'assets/audio_neural'];
  checkDirs.forEach(dir => {
    const fullDir = path.join(BASE_DIR, dir);
    if (fs.existsSync(fullDir)) {
      const fullFiles = fs.readdirSync(fullDir).filter(f => f.includes('full') || f.includes('all'));
      assert(fullFiles.length === 0, `No baked composite audio files found in ${dir} (dynamic chaining invariant upheld)`);
    }
  });

  // Verify that audio files have matching .txt sidecars
  const audioWordsDir = path.join(BASE_DIR, 'assets/audio/words');
  if (fs.existsSync(audioWordsDir)) {
    const mp3s = fs.readdirSync(audioWordsDir).filter(f => f.endsWith('.mp3'));
    let sidecarsOk = true;
    mp3s.forEach(mp3 => {
      const txt = mp3.replace(/\.mp3$/, '.txt');
      if (!fs.existsSync(path.join(audioWordsDir, txt))) {
        sidecarsOk = false;
      }
    });
    assert(sidecarsOk && mp3s.length > 0, `Audio words have 100% matching .txt sidecars (${mp3s.length} files verified)`);
  }

  // Summary
  console.log('\n========================================================================');
  console.log(`UNIT 2 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================================================');

  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test harness exception:', err);
  process.exit(1);
});
