# Definition of Done: English 5th Grade Unit 2 Implementation

Date: October 2026
Target Curriculum: Greek Ministry of Education / ITYE Diophantus (English 5th Grade — Unit 2: School Life & The World Around Us)
Platform: Offline-First, Zero-Backend, Air-Gapped Dual-Engine Architecture

---

## Verifiable Checks & Success Criteria

### 1. Automated Test Suites (Pass 100%, 0 Failures)
- **Unit 2 Master QA Test Suite (`node unit2/test_v2.js`)**:
  - Exits with return code 0.
  - Validates all vocabulary items: completeness of schema, valid IPA, Greek meanings, CEFR A1 definition word count (<= 14 words), example sentences.
  - Validates calibrated distractor matrix for every vocabulary item: strict POS matching, semantic field consistency, no giveaway cognates.
  - Validates story dossiers, landmark word bindings, inductive grammar rules and practice items.
  - Validates digitized Workbook activities (AB pp. 11–18) and Differentiated Appendix tasks (AB pp. 65–67, `*` and `**`).
  - Validates audio sidecar completeness: 100% of `.mp3` files have exact UTF-8 `.txt` sidecars.
- **Air-Gap & Offline Verification (`node unit2/verify_offline.js`)**:
  - Exits with return code 0.
  - Confirms data-unit resolves to "2".
  - Verifies semantic identity between all `.json` and `.js` data twins.
  - Enforces zero runtime external network URLs (no CDNs, Google Fonts, remote APIs).
  - Verifies local WOFF2 font loading from `assets/fonts/fonts.css`.

### 2. Regression Testing (Pass 100%, 0 Failures)
- `node unit1/test_v1.js` passes 100% (252+ tests passed, 0 failed).
- `node unit1/verify_offline.js` passes 100% (41+ tests passed, 0 failed).

### 3. Portal Hub Integration
- `data/coursebook_catalog.json` and `data/coursebook_catalog.js` updated to register Unit 2 as `status: "ready"`.
- Action buttons configured for Student's Book & Workbook (`unit2/v2.html`), Vocabulary Companion (`unit2/index.html`), and Photodentro OER Lab (`photodentro_apps/Present_Simple_and_Present_Continuous_for_younger_children_v2.0 opencode/index.html`).

### 4. Interactive Browser & Runtime Validation
- Browser loads `unit2/index.html`, `unit2/v2.html`, and `portal.html` with zero console errors.
- Visual components render properly: story dossiers, vector SVGs, vocabulary flashcards, quiz interface, grammar lab, workbook tasks.
- Screenshots and browser execution logs recorded in `evidence/`.

### 5. Adversarial & Edge-Case Robustness
- Fresh-start verification over static server and `file:///` equivalence.
- Edge-case testing of quiz answering, search filtering, empty states, and local storage state persistence.
- Output logs recorded in `evidence/`.
