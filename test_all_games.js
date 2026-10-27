const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('================================================================');
console.log('   COMPREHENSIVE ALL-GAMES VERIFICATION SUITE (UNIT 1 & UNIT 2)  ');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${testName} ${details ? '(' + details + ')' : ''}`);
  }
}

// -------------------------------------------------------------
// PART 1: STYLING & PORTAL THEMING AUDIT
// -------------------------------------------------------------
console.log('--- TEST 1: THEMING AUDIT (PORTAL DESIGN HARMONIZATION) ---');

function checkThemeStyles(cssPath, unitLabel) {
  const content = fs.readFileSync(cssPath, 'utf-8');
  assert(content.includes('--primary: #2b6cb0;'), `${unitLabel} has --primary: #2b6cb0 (Portal Royal Slate Blue)`);
  assert(content.includes('--primary-hover: #1e4e8c;'), `${unitLabel} has --primary-hover: #1e4e8c`);
  assert(content.includes('--primary-light: #ebf8ff;'), `${unitLabel} has --primary-light: #ebf8ff`);
  assert(content.includes('--secondary: #2c7a7b;'), `${unitLabel} has --secondary: #2c7a7b (Portal Deep Teal)`);
  assert(content.includes('--secondary-light: #e6fffa;'), `${unitLabel} has --secondary-light: #e6fffa`);
  assert(!content.includes('--primary: #dd6b20;'), `${unitLabel} has NO brown #dd6b20 as primary variable`);
  assert(!content.includes('--border-focus: #dd6b20;'), `${unitLabel} has NO brown #dd6b20 as border-focus`);
}

checkThemeStyles('unit2/style_v2.css', 'unit2/style_v2.css');
checkThemeStyles('unit1/style_v2.css', 'unit1/style_v2.css');

function checkV1ThemeStyles(cssPath, unitLabel) {
  const content = fs.readFileSync(cssPath, 'utf-8');
  assert(content.includes('--primary-color: #2b6cb0;'), `${unitLabel} has --primary-color: #2b6cb0`);
  assert(content.includes('--primary-light: #ebf8ff;'), `${unitLabel} has --primary-light: #ebf8ff`);
  assert(content.includes('--secondary-color: #2c7a7b;'), `${unitLabel} has --secondary-color: #2c7a7b`);
  assert(!content.includes('--primary-color: #c05621;'), `${unitLabel} has NO rust/brown #c05621 as primary-color`);
}

checkV1ThemeStyles('unit2/style.css', 'unit2/style.css');
checkV1ThemeStyles('unit1/style.css', 'unit1/style.css');

// -------------------------------------------------------------
// PART 2: LIGHTWEIGHT FULL-TREE DOM EMULATOR WITH STACK PARSER
// -------------------------------------------------------------
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function createDOM(htmlString, unitNum = '2') {
  const idMap = new Map();
  const allElements = [];

  function makeElement(tagName) {
    const el = {
      tagName: tagName.toUpperCase(),
      id: '',
      className: '',
      style: {},
      dataset: {},
      attributes: {},
      childNodes: [],
      children: [],
      parentNode: null,
      listeners: {},
      hidden: false,
      value: '',
      disabled: false,

      get textContent() {
        return this.childNodes.map(c => typeof c === 'string' ? c : c.textContent).join('');
      },
      set textContent(val) {
        this.childNodes = [String(val ?? '')];
        this.children = [];
      },

      get innerHTML() {
        return this.childNodes.map(c => typeof c === 'string' ? c : (c.outerHTML || c.innerHTML)).join('');
      },
      set innerHTML(html) {
        // Remove old IDs
        function unregister(node) {
          if (node.id) idMap.delete(node.id);
          node.children.forEach(unregister);
        }
        this.children.forEach(unregister);

        this.childNodes = [];
        this.children = [];
        parseHtmlInto(html, this);
      },

      classList: {
        add: (...classes) => {
          const cur = el.className.split(/\s+/).filter(Boolean);
          classes.forEach(c => { if (!cur.includes(c)) cur.push(c); });
          el.className = cur.join(' ');
        },
        remove: (...classes) => {
          const cur = el.className.split(/\s+/).filter(Boolean);
          el.className = cur.filter(c => !classes.includes(c)).join(' ');
        },
        toggle: (c, force) => {
          const cur = el.className.split(/\s+/).filter(Boolean);
          const has = cur.includes(c);
          const state = typeof force === 'boolean' ? force : !has;
          if (state && !has) cur.push(c);
          if (!state && has) cur.splice(cur.indexOf(c), 1);
          el.className = cur.join(' ');
          return state;
        },
        contains: (c) => el.className.split(/\s+/).includes(c)
      },

      setAttribute: (k, v) => {
        el.attributes[k] = String(v);
        if (k === 'id') {
          el.id = String(v);
          idMap.set(el.id, el);
        }
        if (k === 'class') el.className = String(v);
        if (k.startsWith('data-')) {
          const camel = k.slice(5).replace(/-([a-z])/g, (_, g) => g.toUpperCase());
          el.dataset[camel] = String(v);
        }
      },
      getAttribute: (k) => el.attributes[k] || (k === 'id' ? el.id : k === 'class' ? el.className : null),
      removeAttribute: (k) => {
        delete el.attributes[k];
        if (k === 'id') { idMap.delete(el.id); el.id = ''; }
        if (k === 'class') el.className = '';
      },

      appendChild: (child) => {
        if (typeof child === 'object') {
          child.parentNode = el;
          el.children.push(child);
        }
        el.childNodes.push(child);
        return child;
      },

      addEventListener: (evt, fn) => {
        if (!el.listeners[evt]) el.listeners[evt] = [];
        el.listeners[evt].push(fn);
      },

      removeEventListener: (evt, fn) => {
        if (el.listeners[evt]) el.listeners[evt] = el.listeners[evt].filter(f => f !== fn);
      },

      closest: (sel) => {
        let cur = el;
        while (cur) {
          if (matchesSelector(cur, sel)) return cur;
          cur = cur.parentNode;
        }
        return null;
      },

      querySelector: (sel) => {
        const found = el.querySelectorAll(sel);
        return found.length ? found[0] : null;
      },

      querySelectorAll: (sel) => {
        const results = [];
        function recurse(node) {
          node.children.forEach(c => {
            if (matchesSelector(c, sel)) results.push(c);
            recurse(c);
          });
        }
        recurse(el);
        return results;
      },

      click: () => {
        const event = { target: el, currentTarget: null, bubbles: true, cancelBubble: false, stopPropagation: () => { event.cancelBubble = true; } };
        let cur = el;
        while (cur && !event.cancelBubble) {
          event.currentTarget = cur;
          const list = cur.listeners['click'] || [];
          for (const fn of list) {
            fn(event);
            if (event.cancelBubble) break;
          }
          cur = cur.parentNode;
        }
      },

      focus: () => {}
    };

    allElements.push(el);
    return el;
  }

  function matchesSelector(el, sel) {
    if (!sel || !el || !el.tagName) return false;
    const parts = sel.trim().split(/\s+/);
    if (parts.length > 1) {
      let cur = el;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        while (cur && !singleMatch(cur, p)) {
          cur = cur.parentNode;
        }
        if (!cur) return false;
        cur = cur.parentNode;
      }
      return true;
    }
    return singleMatch(el, sel.trim());
  }

  function singleMatch(el, s) {
    if (s.startsWith('#')) return el.id === s.slice(1);
    if (s.startsWith('.')) return el.classList.contains(s.slice(1));
    if (s.startsWith('[') && s.endsWith(']')) {
      const attrExpr = s.slice(1, -1);
      if (attrExpr.includes('=')) {
        const [k, v] = attrExpr.split('=');
        const cleanV = v.replace(/^['"]|['"]$/g, '');
        return el.getAttribute(k) === cleanV;
      }
      return el.getAttribute(attrExpr) !== null;
    }
    return el.tagName.toLowerCase() === s.toLowerCase();
  }

  function parseHtmlInto(html, parent) {
    let cursor = 0;
    const stack = [parent];

    while (cursor < html.length) {
      if (html.startsWith('<!--', cursor)) {
        const endComment = html.indexOf('-->', cursor);
        cursor = endComment === -1 ? html.length : endComment + 3;
        continue;
      }

      if (html[cursor] === '<') {
        const endTag = html.indexOf('>', cursor);
        if (endTag === -1) break;
        const tagContent = html.slice(cursor + 1, endTag).trim();

        if (tagContent.startsWith('/')) {
          const tagName = tagContent.slice(1).trim().toUpperCase();
          for (let i = stack.length - 1; i > 0; i--) {
            if (stack[i].tagName === tagName) {
              stack.length = i;
              break;
            }
          }
        } else {
          const isSelfClosing = tagContent.endsWith('/');
          const cleanContent = isSelfClosing ? tagContent.slice(0, -1).trim() : tagContent;
          const spaceIdx = cleanContent.search(/\s/);
          const tagName = (spaceIdx === -1 ? cleanContent : cleanContent.slice(0, spaceIdx)).toUpperCase();
          const attrStr = spaceIdx === -1 ? '' : cleanContent.slice(spaceIdx);

          const el = makeElement(tagName);
          parseAttributes(attrStr, el);
          stack[stack.length - 1].appendChild(el);

          if (!isSelfClosing && !voidElements.has(tagName.toLowerCase())) {
            stack.push(el);
          }
        }
        cursor = endTag + 1;
      } else {
        const nextTag = html.indexOf('<', cursor);
        const text = nextTag === -1 ? html.slice(cursor) : html.slice(cursor, nextTag);
        if (text.length > 0) {
          stack[stack.length - 1].appendChild(text);
        }
        cursor = nextTag === -1 ? html.length : nextTag;
      }
    }
  }

  function parseAttributes(attrStr, el) {
    if (!attrStr) return;
    const attrRegex = /([a-zA-Z0-9\-:]+)(?:=(?:"([^"]*)"|'([^']*)'|([^>\s]+)))?/g;
    let m;
    while ((m = attrRegex.exec(attrStr)) !== null) {
      const name = m[1];
      const val = m[2] !== undefined ? m[2] : (m[3] !== undefined ? m[3] : (m[4] !== undefined ? m[4] : ''));
      el.setAttribute(name, val);
    }
  }

  const documentElement = makeElement('html');
  const head = makeElement('head');
  const body = makeElement('body');
  body.setAttribute('data-unit', unitNum);
  documentElement.appendChild(head);
  documentElement.appendChild(body);

  const document = {
    documentElement,
    head,
    body,
    title: '',
    getElementById: (id) => idMap.get(id) || null,
    querySelector: (sel) => {
      if (sel.startsWith('#') && !sel.includes(' ') && !sel.includes('.')) {
        return idMap.get(sel.slice(1)) || null;
      }
      return documentElement.querySelector(sel);
    },
    querySelectorAll: (sel) => documentElement.querySelectorAll(sel),
    createElement: makeElement,
    addEventListener: (evt, fn) => {
      if (!body.listeners[evt]) body.listeners[evt] = [];
      body.listeners[evt].push(fn);
    }
  };

  parseHtmlInto(htmlString, body);

  const playedAudios = [];

  const window = {
    document,
    location: { href: '', hash: '' },
    Audio: function(src) {
      this.src = src;
      this.playbackRate = 1;
      this.play = () => {
        playedAudios.push({ src: this.src, time: Date.now() });
        return Promise.resolve();
      };
      this.pause = () => {};
    },
    setTimeout: (fn, ms) => {
      fn();
      return 1;
    },
    clearTimeout: () => {},
    scrollTo: () => {},
    print: () => {},
    prompt: () => 'Test Student',
    addEventListener: () => {}
  };

  return { window, document, playedAudios };
}

// -------------------------------------------------------------
// MAIN ASYNC RUNNER
// -------------------------------------------------------------
async function runTests() {
  // -------------------------------------------------------------
  // PART 3: TEST UNIT 2 DIGITAL COMPANION (V2) GAMES
  // -------------------------------------------------------------
  console.log('\n--- TEST 2: UNIT 2 COMPANION (V2) GAMES & ARENA ---');

  const u2V2Html = fs.readFileSync('unit2/v2.html', 'utf-8');
  const u2VocabJs = fs.readFileSync('unit2/data/vocabulary_data.js', 'utf-8');
  const u2V2DataJs = fs.readFileSync('unit2/data/unit2_v2_data.js', 'utf-8');
  const u2WbDataJs = fs.readFileSync('unit2/data/unit2_workbook_data.js', 'utf-8');
  const u2AppV2Js = fs.readFileSync('unit2/app_v2.js', 'utf-8');

  const { window: win2, document: doc2, playedAudios: audios2 } = createDOM(u2V2Html, '2');

  const sandbox2 = {
    ...win2,
    window: win2,
    document: doc2,
    console: { log: () => {}, warn: () => {}, error: () => {} },
    setTimeout: win2.setTimeout,
    clearTimeout: win2.clearTimeout
  };
  vm.createContext(sandbox2);

  vm.runInContext(u2VocabJs, sandbox2);
  vm.runInContext(u2V2DataJs, sandbox2);
  vm.runInContext(u2WbDataJs, sandbox2);

  vm.runInContext(u2AppV2Js, sandbox2);
  const domLoaded = doc2.body.listeners['DOMContentLoaded'] || [];
  await Promise.all(domLoaded.map(fn => fn()));

  // 1. Check Practice Arena Tab
  console.log('   Checking Practice Arena module rendering...');
  const practiceTab = doc2.querySelector('[data-tab="practice"]');
  assert(practiceTab !== null, 'Practice tab is present in module tabs');
  practiceTab.click();

  const practicePanel = doc2.querySelector('#panel-practice');
  assert(practicePanel !== null && !practicePanel.hidden, 'Practice panel is rendered and visible');

  const modeButtons = doc2.querySelectorAll('.ch-mode-btn');
  assert(modeButtons.length >= 4, `Practice arena renders 4 challenge modes (found ${modeButtons.length})`);

  // 2. Test Practice Mode 1: Spoken word -> Greek meaning
  console.log('   Testing Game 1: Spoken word -> Greek meaning...');
  const playBtn = doc2.getElementById('challengePlay');
  assert(playBtn !== null, 'Play prompt button exists');
  playBtn.click();
  assert(audios2.length > 0, 'Clicking Play prompt triggers audio playback');
  const lastAudio = audios2[audios2.length - 1];
  assert(lastAudio.src.includes('assets/audio_neural/words/'), `Audio path is valid neural word: ${lastAudio.src}`);

  const scoreEl = doc2.getElementById('challengeScore');
  const streakEl = doc2.getElementById('challengeStreak');
  assert(scoreEl.textContent === '0', 'Initial score is 0');
  assert(streakEl.textContent === '0', 'Initial streak is 0');

  const optionBtns = doc2.querySelectorAll('.ch-option-btn');
  assert(optionBtns.length === 4, `Question renders exactly 4 multiple choice options (found ${optionBtns.length})`);

  // Click the first option
  const firstOpt = optionBtns[0];
  firstOpt.click();
  assert(firstOpt.disabled === true, 'Clicking option disables answer buttons');
  assert(firstOpt.classList.contains('correct') || firstOpt.classList.contains('wrong'), 'Option gets correct or wrong state class');
  const feedbackBox = doc2.getElementById('challengeFeedback');
  assert(feedbackBox.style.display !== 'none', 'Feedback box is revealed after answering');

  // Click Next Question
  const nextBtn = doc2.getElementById('challengeNext');
  assert(nextBtn !== null, 'Next question button exists');
  nextBtn.click();
  const newOptionBtns = doc2.querySelectorAll('.ch-option-btn');
  assert(newOptionBtns.length === 4, 'Clicking Next loads a fresh set of 4 options');
  assert(newOptionBtns[0].disabled === false, 'New options are enabled for interaction');

  // 3. Test Practice Mode 2: Spoken word -> English definition
  console.log('   Testing Game 2: Spoken word -> English definition...');
  const defModeBtn = doc2.querySelector('[data-challenge-mode="def"]');
  assert(defModeBtn !== null, 'Definition mode button exists');
  defModeBtn.click();
  assert(defModeBtn.classList.contains('active'), 'Definition mode button becomes active');

  const defOpts = doc2.querySelectorAll('.ch-option-btn');
  assert(defOpts.length === 4, 'Definition mode generates 4 options');
  playBtn.click();
  assert(audios2[audios2.length - 1].src.includes('assets/audio_neural/words/'), 'Definition mode plays target word prompt');

  // 4. Test Practice Mode 3: Example sentence gapfill
  console.log('   Testing Game 3: Example sentence gapfill...');
  const gapfillBtn = doc2.querySelector('[data-challenge-mode="gapfill"]');
  assert(gapfillBtn !== null, 'Example sentence gapfill mode button exists');
  gapfillBtn.click();
  assert(gapfillBtn.classList.contains('active'), 'Gapfill mode button becomes active');
  playBtn.click();
  assert(audios2[audios2.length - 1].src.includes('assets/audio_neural/examples/'), 'Gapfill mode plays example sentence audio');

  // 5. Test Practice Mode 4: Fact check (True/False)
  console.log('   Testing Game 4: Fact check...');
  const factBtn = doc2.querySelector('[data-challenge-mode="fact"]');
  assert(factBtn !== null, 'Fact check mode button exists');
  factBtn.click();
  assert(factBtn.classList.contains('active'), 'Fact check mode button becomes active');
  assert(playBtn.style.display === 'none', 'Play prompt button is hidden during reading fact check');

  const factOpts = doc2.querySelectorAll('.fact-btn');
  assert(factOpts.length === 2, `Fact check presents TRUE and FALSE buttons (found ${factOpts.length})`);
  factOpts[0].click();
  assert(doc2.getElementById('challengeFeedback').style.display !== 'none', 'Fact check gives immediate feedback');

  // 6. Test Restart button
  console.log('   Testing Restart challenge button...');
  const restartBtn = doc2.getElementById('challengeRestart');
  restartBtn.click();
  assert(doc2.getElementById('challengeScore').textContent === '0', 'Restart resets score to 0');
  assert(doc2.getElementById('challengeStreak').textContent === '0', 'Restart resets streak to 0');

  // 7. Test Fact Bank buttons
  console.log('   Testing Complete Fact Bank interactive buttons...');
  const bankBtns = doc2.querySelectorAll('.truth-bank-item .btn-tf');
  assert(bankBtns.length > 0, `Fact bank has reference buttons (found ${bankBtns.length})`);
  bankBtns[0].click();
  assert(bankBtns[0].classList.contains('is-correct') || bankBtns[0].classList.contains('is-retry'), 'Clicking fact bank button validates and marks status');

  // 8. Test Grammar Lab Games
  console.log('   Testing Game 5: Grammar Lab practice options & game cards...');
  const grammarTab = doc2.querySelector('[data-tab="grammar"]');
  grammarTab.click();

  const practiceOpts = doc2.querySelectorAll('.practice-option');
  assert(practiceOpts.length > 0, `Grammar lab has inductive practice options (found ${practiceOpts.length})`);
  practiceOpts[0].click();
  assert(practiceOpts[0].classList.contains('is-correct') || practiceOpts[0].classList.contains('is-retry'), 'Grammar practice option evaluates on click');

  const nextCardBtn = doc2.getElementById('nextGameCard');
  if (nextCardBtn) {
    nextCardBtn.click();
    const cardDisplay = doc2.getElementById('gameCardDisplay');
    assert(cardDisplay.textContent.length > 0, `Charades/Communicative game card draws text: "${cardDisplay.textContent}"`);
  }

  // 9. Test Words in Partnership (Collocations & Definition Clues)
  console.log('   Testing Game 6: Collocation Matcher & Clues...');
  const collocTab = doc2.querySelector('[data-tab="collocations"]');
  collocTab.click();

  const leftVerbs = doc2.querySelectorAll('.verb-item');
  const rightPartners = doc2.querySelectorAll('.partner-item');
  assert(leftVerbs.length > 0 && rightPartners.length > 0, `Collocation items present (verbs: ${leftVerbs.length}, partners: ${rightPartners.length})`);

  leftVerbs[0].click();
  assert(leftVerbs[0].classList.contains('selected'), 'Clicking left verb selects it');

  const id0 = leftVerbs[0].getAttribute('data-collocation-id');
  const matchingRight = Array.from(rightPartners).find(p => p.getAttribute('data-collocation-id') === id0);
  matchingRight.click();
  assert(leftVerbs[0].classList.contains('matched') && matchingRight.classList.contains('matched'), 'Selecting correct partner marks both items as matched');

  const revealBtns = doc2.querySelectorAll('.clue-solve-btn');
  assert(revealBtns.length > 0, `Definition clues have reveal buttons (found ${revealBtns.length})`);
  revealBtns[0].click();
  assert(revealBtns[0].classList.contains('revealed'), 'Clicking reveal button reveals target word');

  // -------------------------------------------------------------
  // PART 4: TEST UNIT 2 VOCABULARY COMPANION (V1 INDEX.HTML) GAMES
  // -------------------------------------------------------------
  console.log('\n--- TEST 3: UNIT 2 VOCABULARY COMPANION (V1) QUIZZES & CARDS ---');

  const u2IndexHtml = fs.readFileSync('unit2/index.html', 'utf-8');
  const u2AppJs = fs.readFileSync('unit2/app.js', 'utf-8');

  const { window: winV1, document: docV1, playedAudios: audiosV1 } = createDOM(u2IndexHtml, '2');

  const sandboxV1 = {
    ...winV1,
    window: winV1,
    document: docV1,
    console: { log: () => {}, warn: () => {}, error: () => {} },
    setTimeout: winV1.setTimeout,
    clearTimeout: winV1.clearTimeout
  };
  vm.createContext(sandboxV1);

  vm.runInContext(u2VocabJs, sandboxV1);
  vm.runInContext(u2V2DataJs, sandboxV1);

  vm.runInContext(u2AppJs, sandboxV1);
  const domLoadedV1 = docV1.body.listeners['DOMContentLoaded'] || [];
  await Promise.all(domLoadedV1.map(fn => fn()));

  // 1. Flashcards Game
  console.log('   Testing Game 7: Flashcards flip & navigation...');
  const cardsTab = docV1.querySelector('[data-mode="cards"]');
  assert(cardsTab !== null, 'Flashcards tab exists');
  cardsTab.click();

  const card = docV1.getElementById('activeFlashcard');
  assert(card !== null, 'Flashcard element is present');
  card.click();
  assert(card.classList.contains('flipped'), 'Clicking flashcard flips it to definition side');
  card.click();
  assert(!card.classList.contains('flipped'), 'Clicking again flips card back to front');

  const nextCard = docV1.getElementById('nextCardBtn');
  assert(nextCard !== null, 'Next card button exists');
  nextCard.click();
  const curIdx = docV1.getElementById('currentCardIndex');
  assert(curIdx.textContent === '2', `Next card advances index to 2 (current: ${curIdx.textContent})`);

  // 2. Listening Challenge (Meaning Quiz)
  console.log('   Testing Game 8: Listening Challenge Multiple-Choice Quiz...');
  const quizTab = docV1.querySelector('[data-mode="quiz"]');
  quizTab.click();

  const quizPlayBtn = docV1.getElementById('quizPlayPromptBtn');
  assert(quizPlayBtn !== null, 'Quiz play prompt button exists');
  quizPlayBtn.click();
  assert(audiosV1.length > 0, 'Quiz play prompt triggers audio');

  const quizOpts = docV1.querySelectorAll('.quiz-option-btn');
  assert(quizOpts.length === 4, `Quiz loads 4 multiple choice choices (found ${quizOpts.length})`);
  quizOpts[0].click();
  assert(quizOpts[0].disabled === true, 'Quiz option button is disabled after answer');
  assert(docV1.getElementById('quizFeedback').style.display !== 'none', 'Quiz feedback box appears after answer');

  const nextQBtn = docV1.getElementById('nextQuestionBtn');
  nextQBtn.click();
  const nextOpts = docV1.querySelectorAll('.quiz-option-btn');
  assert(nextOpts.length === 4 && nextOpts[0].disabled === false, 'Next question loads fresh interactive options');

  // 3. Definition Challenge Quiz
  console.log('   Testing Game 9: Definition Challenge Multiple-Choice Quiz...');
  const defQuizTab = docV1.querySelector('[data-mode="defQuiz"]');
  defQuizTab.click();

  const defQuizPlayBtn = docV1.getElementById('defQuizPlayPromptBtn');
  assert(defQuizPlayBtn !== null, 'Definition quiz play prompt button exists');
  defQuizPlayBtn.click();

  const defQuizOpts = docV1.querySelectorAll('.def-quiz-option-btn');
  assert(defQuizOpts.length === 4, `Definition quiz loads 4 choices (found ${defQuizOpts.length})`);
  defQuizOpts[0].click();
  assert(defQuizOpts[0].disabled === true, 'Definition quiz option is disabled after answer');
  assert(docV1.getElementById('defQuizFeedback').style.display !== 'none', 'Definition quiz feedback appears');

  // -------------------------------------------------------------
  // PART 5: TEST UNIT 1 COMPANION (V2) & COMPANION (V1)
  // -------------------------------------------------------------
  console.log('\n--- TEST 4: UNIT 1 GAMES PARITY CHECK ---');

  const u1V2Html = fs.readFileSync('unit1/v2.html', 'utf-8');
  const u1VocabJs = fs.readFileSync('unit1/data/vocabulary_data.js', 'utf-8');
  const u1V2DataJs = fs.readFileSync('unit1/data/unit1_v2_data.js', 'utf-8');
  const u1WbDataJs = fs.readFileSync('unit1/data/unit1_workbook_data.js', 'utf-8');
  const u1AppV2Js = fs.readFileSync('unit1/app_v2.js', 'utf-8');

  const { window: win1, document: doc1, playedAudios: audios1 } = createDOM(u1V2Html, '1');
  const sandbox1 = {
    ...win1,
    window: win1,
    document: doc1,
    console: { log: () => {}, warn: () => {}, error: () => {} },
    setTimeout: win1.setTimeout,
    clearTimeout: win1.clearTimeout
  };
  vm.createContext(sandbox1);
  vm.runInContext(u1VocabJs, sandbox1);
  vm.runInContext(u1V2DataJs, sandbox1);
  vm.runInContext(u1WbDataJs, sandbox1);

  vm.runInContext(u1AppV2Js, sandbox1);
  const domLoaded1 = doc1.body.listeners['DOMContentLoaded'] || [];
  await Promise.all(domLoaded1.map(fn => fn()));

  const u1PracticeTab = doc1.querySelector('[data-tab="practice"]');
  assert(u1PracticeTab !== null, 'Unit 1 practice tab exists');
  u1PracticeTab.click();

  const u1PlayBtn = doc1.getElementById('challengePlay');
  assert(u1PlayBtn !== null, 'Unit 1 play prompt button exists');
  u1PlayBtn.click();
  assert(audios1.length > 0, 'Unit 1 practice audio plays');

  const u1Opts = doc1.querySelectorAll('.ch-option-btn');
  assert(u1Opts.length === 4, `Unit 1 practice renders 4 options (found ${u1Opts.length})`);
  u1Opts[0].click();
  assert(u1Opts[0].disabled === true, 'Unit 1 option disabled on click');
  assert(doc1.getElementById('challengeFeedback').style.display !== 'none', 'Unit 1 feedback displayed');

  console.log('\n================================================================');
  console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
  console.log('================================================================');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    console.log('\n>>> ALL GAMES VERIFIED AND FUNCTIONING PROPERLY! <<<');
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
