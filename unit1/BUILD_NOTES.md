# Unit 1 Build Notes & Pedagogical Verification: Internet Friends Around Europe
## *English 5th Grade — Αγγλικά Ε΄ Δημοτικού*

**Date**: October 2026  
**Curriculum**: Greek Ministry of Education & Religious Affairs (*ΥΠΑΙΘΑ*) / ITYE "Diophantus" (*Αγγλικά Ε΄ Δημοτικού* by E. Kolovou and A. Kraniotou)  
**CEFR Target Level**: CEFR A1- to A1 (Beginner to Low Basic User)  
**Status**: 100% Complete — Flagship Unit Ready for Human Review and Approval  

---

## 1. Executive Summary

Unit 1 ("Internet Friends Around Europe") serves as the flagship release for the **English 5th Grade Unified Digital Coursebook & Companion Platform**. It establishes the complete end-to-end design, pedagogical calibration, audio engineering, and interactive architecture required to serve as:
1. **Total Book Replacement**: Pupil's Book (pp. 13–24), Activity Book (pp. 7–10), and Differentiated Learning Appendix (p. 64) are fully digitized.
2. **Augmented Digital Companion**: Interactive story dossiers, inductive grammar sandboxes, dual-engine audio pronunciation, calibrated distractor quizzes, and Photodentro OER laboratory integration.

---

## 2. Curriculum Coverage & Source Decomposition

| Source Material | Pages | Content Digitized in Unit 1 | Status |
| :--- | :--- | :--- | :--- |
| **Pupil's Book** | pp. 13–17 | **Lesson 1: Do you like computers?**<br>• Pen-pal emails between Kostas (Athens) and Mark (London)<br>• Computer hardware & internet lexis<br>• `like / enjoy / hate + -ing`<br>• `prefer ... to ...` structure | **Complete** |
| **Pupil's Book** | pp. 18–21 | **Lesson 2: Internet friends**<br>• European friends newspaper report (Nadine from Marseilles, Kostas, Mark)<br>• European countries, nationalities, capitals & flags<br>• Multi-speaker authentic dialogue (Kostas, Mark, Nadine)<br>• Present Simple affirmative, negative, questions | **Complete** |
| **Pupil's Book** | pp. 22–24 | **Lesson 3: The United Kingdom**<br>• Cultural guide to the British Isles (England, Scotland, Wales, Northern Ireland)<br>• National symbols, floral emblems, and capitals<br>• Unit 1 Self-Assessment ("Can-Do" Passport) | **Complete** |
| **Activity Book** | pp. 7–10 | **Unit 1 Workbook Activities**<br>• Lesson 1 Activity A: Hardware lexis matching<br>• Lesson 2 Activity A: European geography categorisation<br>• Lesson 2 Activity B: Verb morphology (`-ing` & Present Simple)<br>• Lesson 2 Activity C: Dialogue turn reconstruction<br>• Lesson 2 Activity D: Guided pen-pal email writing | **Complete** |
| **Differentiated Appendix** | p. 64 | **Unit 1 Graded Differentiated Tasks**<br>• One-Star (`*`): Hardware anagram unscrambling (`dbkyorea` &rarr; `keyboard`, `enrecs` &rarr; `screen`, etc.)<br>• Two-Star (`**`): Contextual sentence production using hardware terms | **Complete** |
| **Teacher's Book** | pp. 18–25 | Master lesson plans, listening scripts, pedagogical objectives, and official answer keys | **Complete** |
| **Photodentro OER** | Applet | `picture_dictionary_computer_parts_v2.0` (interactive hardware dictionary) | **Integrated** |

---

## 3. Pedagogical Calibration & Linguistic Audits

### 3.1 Strict CEFR A1- Lexical Calibration
- **Total Curated Lemmas**: 62 items.
- **Definition Word Count Cap**: Every definition is strictly constrained to **$\le 13$ words** (below the 14-word ceiling specified in `APP_SPECIFICATION_GRADE5.md`).
- **Syntax**: Simplified definition structures (`"a machine that..."`, `"to make pictures with a pen or pencil"`).
- **Distractors**: 4-option multiple choice generated with pedagogical distractors from the same semantic domain and part of speech, avoiding confusing syntax.

### 3.2 Pedagogical Errata & Discrepancy Resolutions
Documented in [unit1/ERRATA.md](file:///c:/photodentro/antigravity/coursebook_fifth/unit1/ERRATA.md):
1. **French School Terminology**: Nadine's school is identified as *"Collège"* (middle school for ages 11–15 in France). A bilingual tooltip explains this cultural difference to Greek 5th graders (10–11 years old).
2. **United Kingdom Demographics**: Population data and political distinctions between Great Britain (island) and the United Kingdom (sovereign state) are presented clearly with visual maps.
3. **Teacher's Book Key Typo Reconciliation**: Resolves discrepancies in official answer keys to avoid frustrating students during automated checks.

---

## 4. Platform Architecture & Offline Invariants

### 4.1 Dual Data Twins (`.json` + `.js`)
To circumvent local browser CORS restrictions when running over `file:///` without an active HTTP server:
- `unit1/data/vocabulary_data.json` &harr; `unit1/data/vocabulary_data.js` (`window.VOCABULARY_DATA`)
- `unit1/data/unit1_v2_data.json` &harr; `unit1/data/unit1_v2_data.js` (`window.UNIT_V2_DATA`)
- `unit1/data/unit1_workbook_data.json` &harr; `unit1/data/unit1_workbook_data.js` (`window.UNIT_WORKBOOK_DATA`)
- `data/coursebook_catalog.json` &harr; `data/coursebook_catalog.js` (`window.COURSEBOOK_CATALOG`)

### 4.2 Air-Gapped Offline Fonts & Assets
- **17 WOFF2 font files** located locally under `assets/fonts/` (`Outfit` & `Plus Jakarta Sans`).
- `assets/fonts/fonts.css` ensures 100% offline typography with zero external Google Fonts requests.
- **Original Vector SVGs** under `unit1/assets/images_v2/`:
  - `kostas_computer.svg` (Athens bedroom, desktop setup, Acropolis window view)
  - `online_chat.svg` (3-way webcam panel: Kostas, Nadine, Mark)
  - `european_friends.svg` (European map, country cards, national flags)
  - `british_isles.svg` (Map of Great Britain & Ireland, floral emblems)

### 4.3 Audio Engineering & Verbatim Sidecars
- **Dual-Engine Speech Synthesis**:
  - `assets/audio_neural/`: High-fidelity Microsoft Edge Neural voices (`en-GB-SoniaNeural`, `en-GB-ThomasNeural`, `en-GB-RyanNeural`, `en-GB-MaisieNeural`).
  - `assets/audio/`: Google standard pronunciation fallback.
- **Dynamic Chaining Standard**: Word &rarr; 350ms pause &rarr; Definition &rarr; 350ms pause &rarr; Example sentence, executed dynamically in JavaScript (no composite files).
- **100% Verbatim Sidecars**: Every single `.mp3` file is accompanied by an exact UTF-8 `.txt` sidecar holding its text transcript.

---

## 5. Automated Quality Assurance Results

| Test Suite | File | Tests Run | Result |
| :--- | :--- | :--- | :--- |
| **Unit 1 Data & Integrity QA** | `unit1/test_v1.js` | 252 | **252 Passed, 0 Failed** |
| **Air-Gap & Offline Asset Audit** | `unit1/verify_offline.js` | 38 | **38 Passed, 0 Failed** |

---

## 6. Verification Steps for Human Review

1. **Launch Root Portal**:
   - Open [portal.html](file:///c:/photodentro/antigravity/coursebook_fifth/portal.html) directly in any browser (`file:///c:/photodentro/antigravity/coursebook_fifth/portal.html`).
   - Confirm layout, Greek crest badge, quick stats, and featured Unit 1 card.
2. **Launch Coursebook Companion (V2)**:
   - Click **"Launch Version 2 (Interactive Coursebook &amp; Workbook)"** or open [unit1/v2.html](file:///c:/photodentro/antigravity/coursebook_fifth/unit1/v2.html).
   - Test the 4 story dossiers and listen to the audio read-along.
   - Test the Inductive Grammar Lab (`Like/Enjoy/Hate + -ing`).
   - Test the Workbook exercises and Differentiated Appendix (`*` and `**`).
3. **Launch Vocabulary Companion (V1)**:
   - Open [unit1/index.html](file:///c:/photodentro/antigravity/coursebook_fifth/unit1/index.html).
   - Test Flashcards, Spaced Quiz, Word Search, and Spelling Bee.
4. **Inspect Photodentro OER Lab**:
   - Click **"Photodentro OER Lab"** to view `picture_dictionary_computer_parts_v2.0`.
