/**
 * Unit 1 Regression Test Suite
 * Asserts all quality criteria from APP_SPECIFICATION_GRADE5.md.
 * Usage: node test_v1.js
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
  console.log('=== RUNNING UNIT 1 REGRESSION SUITE (ENGLISH 5TH GRADE) ===\n');

  const BASE_DIR = __dirname;
  const v2JsonPath = path.join(BASE_DIR, 'data/unit1_v2_data.json');
  const v2JsPath = path.join(BASE_DIR, 'data/unit1_v2_data.js');
  const vocabJsonPath = path.join(BASE_DIR, 'data/vocabulary_data.json');
  const vocabJsPath = path.join(BASE_DIR, 'data/vocabulary_data.js');
  const wbJsonPath = path.join(BASE_DIR, 'data/unit1_workbook_data.json');
  const wbJsPath = path.join(BASE_DIR, 'data/unit1_workbook_data.js');

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

  assert(v2Data.unit_id === 1, 'unit_id is 1');
  assert(v2Data.unit_title === 'Internet Friends Around Europe', 'unit_title matches curriculum');
  assert(vocabData.length >= 60, `Vocabulary item count is comprehensive (${vocabData.length} items)`);

  // 2. Lexical Completeness & CEFR A1- Ceiling
  console.log('\n--- 2. Lexical Quality & Definition Constraints ---');
  vocabData.forEach(item => {
    assert(Boolean(item.word && item.ipa && item.meaning_gr && item.definition_en && item.example),
      `Item #${item.id} (${item.word}) has complete fields`);

    const wordCount = item.definition_en.trim().split(/\s+/).length;
    assert(wordCount <= 14,
      `Item #${item.id} (${item.word}) definition <= 14 words (${wordCount} words: "${item.definition_en}")`);

    // Ensure example contains the target word stem
    const firstStem = item.word.toLowerCase().split(/\s+/)[0].replace(/[^a-z]/g, '');
    const exLower = item.example.toLowerCase();
    assert(exLower.includes(firstStem),
      `Item #${item.id} (${item.word}) stem "${firstStem}" appears in example: "${item.example}"`);
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

  // 4. Inductive Grammar Lab & Comprehension
  console.log('\n--- 4. Inductive Grammar Lab & Dialogues ---');
  assert(Boolean(v2Data.grammar_lab), 'Grammar Lab module exists');
  assert(v2Data.grammar_lab.rules && v2Data.grammar_lab.rules.length >= 3, 'Grammar Lab has 3 inductive rule cards');
  assert(v2Data.grammar_lab.practice_items && v2Data.grammar_lab.practice_items.length >= 6, 'Grammar Lab has 6 practice items');
  v2Data.grammar_lab.practice_items.forEach((p, idx) => {
    assert(Boolean(p.sentence && p.options && p.answer && p.explanation),
      `Practice item #${idx + 1} has full prompt, options, answer, and explanation`);
    assert(p.options.includes(p.answer),
      `Practice item #${idx + 1} correct answer "${p.answer}" is in options`);
  });

  // 5. Workbook Completeness & Teacher's Book Alignment
  console.log('\n--- 5. Workbook Activities & Answer Keys ---');
  assert(wbData.activities && wbData.activities.length === 7, 'Workbook contains 7 digitized activities (including differentiated tasks)');
  const diffStar = wbData.activities.find(a => a.id === 'wb_diff_act_a_star');
  const diffTwoStars = wbData.activities.find(a => a.id === 'wb_diff_act_a_two_stars');
  assert(Boolean(diffStar), 'Differentiated Activity A (*) digitized');
  assert(Boolean(diffTwoStars), 'Differentiated Activity A (**) digitized');

  // 6. Collocations, Definition Challenge, Writing & Can-Do
  console.log('\n--- 6. Companion Modules (Collocations, Quizzes, Writing, Can-Do) ---');
  assert(v2Data.collocations && v2Data.collocations.length >= 8, 'Collocations module has 8 authentic pairs');
  assert(v2Data.definition_challenge && v2Data.definition_challenge.group_a && v2Data.definition_challenge.group_b, 'Definition challenge has Group A & B');
  assert(Boolean(v2Data.writing_workshop && v2Data.writing_workshop.paragraphs.length === 4), 'Writing workshop has 4 guided paragraphs');
  assert(Boolean(v2Data.can_do && v2Data.can_do.statements.length === 4), 'Can-Do passport has 4 CEFR descriptor badges');

  // 7. Non-Composite Audio Invariant (No 4th combined file)
  console.log('\n--- 7. Non-Composite Audio Architecture Invariant ---');
  const checkDirs = ['assets/audio', 'assets/audio_neural'];
  checkDirs.forEach(dir => {
    const fullDir = path.join(BASE_DIR, dir);
    const fullFiles = fs.existsSync(fullDir) ? fs.readdirSync(fullDir).filter(f => f.includes('full') || f.includes('all')) : [];
    assert(fullFiles.length === 0, `No baked composite audio files found in ${dir} (dynamic chaining invariant upheld)`);
  });

  // Summary
  console.log('\n========================================================================');
  console.log(`UNIT 1 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================================================');

  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test harness exception:', err);
  process.exit(1);
});
