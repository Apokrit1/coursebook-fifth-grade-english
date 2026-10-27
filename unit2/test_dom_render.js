const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== RUNNING SYNTHETIC DOM EXECUTION TEST ===');

function createMockEnvironment(htmlContent, unitNum = '2') {
  const elements = new Map();

  function createElement(tag) {
    const el = {
      tagName: tag.toUpperCase(),
      id: '',
      className: '',
      style: {},
      children: [],
      dataset: {},
      innerHTML: '',
      textContent: '',
      value: '',
      attributes: {},
      hidden: false,
      querySelector: () => null,
      querySelectorAll: () => [],
      classList: {
        add: (c) => { el.className += ' ' + c; },
        remove: (c) => { el.className = el.className.replace(new RegExp('\\b' + c + '\\b', 'g'), '').trim(); },
        contains: (c) => el.className.includes(c)
      },
      appendChild: (child) => { el.children.push(child); return child; },
      setAttribute: (k, v) => { el.attributes[k] = v; },
      getAttribute: (k) => el.attributes[k] || null,
      addEventListener: () => {}
    };
    return el;
  }

  const document = {
    body: {
      dataset: { unit: unitNum },
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {}
    },
    head: { appendChild: () => {} },
    title: '',
    getElementById: (id) => {
      if (!elements.has(id)) {
        const el = createElement('div');
        el.id = id;
        elements.set(id, el);
      }
      return elements.get(id);
    },
    createElement: createElement,
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: (event, handler) => {
      if (event === 'DOMContentLoaded') {
        setTimeout(handler, 10);
      }
    }
  };

  const window = {
    document,
    location: { href: '' },
    addEventListener: () => {},
    setTimeout: (fn, ms) => setTimeout(fn, ms),
    clearTimeout: (id) => clearTimeout(id),
    Audio: function() {
      return { play: () => Promise.resolve(), pause: () => {}, addEventListener: () => {} };
    }
  };

  return { window, document };
}

// Test 1: portal.js execution
console.log('--- Testing portal.js execution ---');
const portalHtml = fs.readFileSync('portal.html', 'utf-8');
const { window: portalWindow } = createMockEnvironment(portalHtml);
const catalogJs = fs.readFileSync('data/coursebook_catalog.js', 'utf-8');
const portalJs = fs.readFileSync('portal.js', 'utf-8');

const portalSandbox = { ...portalWindow, window: portalWindow, console };
portalSandbox.document = portalWindow.document;
vm.createContext(portalSandbox);
vm.runInContext(catalogJs, portalSandbox);
vm.runInContext(portalJs, portalSandbox);
console.log('[PASS] portal.js loaded and evaluated without exceptions');

// Test 2: unit2/app.js (V1 Vocabulary Companion)
console.log('\n--- Testing unit2/app.js (V1 Vocabulary Companion) ---');
const indexHtml = fs.readFileSync('unit2/index.html', 'utf-8');
const { window: v1Window } = createMockEnvironment(indexHtml, '2');
const vocabJs = fs.readFileSync('unit2/data/vocabulary_data.js', 'utf-8');
const appJs = fs.readFileSync('unit2/app.js', 'utf-8');

const v1Sandbox = { ...v1Window, window: v1Window, console };
v1Sandbox.document = v1Window.document;
vm.createContext(v1Sandbox);
vm.runInContext(vocabJs, v1Sandbox);
vm.runInContext(appJs, v1Sandbox);
console.log('[PASS] unit2/app.js loaded and evaluated without exceptions');

// Test 3: unit2/app_v2.js (V2 Coursebook Companion)
console.log('\n--- Testing unit2/app_v2.js (V2 Coursebook Companion) ---');
const v2Html = fs.readFileSync('unit2/v2.html', 'utf-8');
const { window: v2Window } = createMockEnvironment(v2Html, '2');
const v2Js = fs.readFileSync('unit2/data/unit2_v2_data.js', 'utf-8');
const wbJs = fs.readFileSync('unit2/data/unit2_workbook_data.js', 'utf-8');
const appV2Js = fs.readFileSync('unit2/app_v2.js', 'utf-8');

const v2Sandbox = { ...v2Window, window: v2Window, console };
v2Sandbox.document = v2Window.document;
vm.createContext(v2Sandbox);
vm.runInContext(vocabJs, v2Sandbox);
vm.runInContext(v2Js, v2Sandbox);
vm.runInContext(wbJs, v2Sandbox);
vm.runInContext(appV2Js, v2Sandbox);
console.log('[PASS] unit2/app_v2.js loaded and evaluated without exceptions');

console.log('\n=== ALL SYNTHETIC DOM EXECUTION TESTS PASSED ===');
