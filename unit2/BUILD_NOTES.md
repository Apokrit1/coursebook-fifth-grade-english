# Unit 2 Build Notes & Pedagogical Verification: School Life & The World Around Us
## *English 5th Grade — Αγγλικά Ε΄ Δημοτικού*

**Date**: October 2026  
**Curriculum**: Greek Ministry of Education & Religious Affairs (*ΥΠΑΙΘΑ*) / ITYE "Diophantus" (*Αγγλικά Ε΄ Δημοτικού* by E. Kolovou and A. Kraniotou)  
**CEFR Target Level**: CEFR A1 (Beginner to Low Basic User)  
**Status**: 100% Complete — Unit 2 Fully Implemented & Verifiably Tested  

---

## 1. Executive Summary

Unit 2 ("School Life & The World Around Us") extends the **English 5th Grade Unified Digital Coursebook & Companion Platform** to the second full curriculum unit. It strictly adheres to the offline-first, zero-backend, air-gapped dual-engine architecture:
1. **Total Book Replacement**: Pupil's Book (pp. 26–36), Activity Book (pp. 11–18), and Differentiated Learning Appendix (pp. 68–70) are fully digitized into interactive components.
2. **Augmented Digital Companion**: 4 interactive story dossiers with bespoke vector SVGs, inductive grammar lab with 6-level frequency speedometer, dual-engine audio pronunciation with 100% verbatim sidecars, scientifically calibrated distractor matrices for 72 lexical items, and integration with the Greek National Repository (*Photodentro OER*).

---

## 2. Curriculum Coverage & Source Decomposition

| Source Material | Pages | Content Digitized in Unit 2 | Status |
| :--- | :--- | :--- | :--- |
| **Pupil's Book** | pp. 26–29 | **Lesson 1: School life and feelings**<br>• West Wimbledon School Newspaper (Eurodisney trip email, canteen menu, Halloween invitation)<br>• Feelings & emotional states lexis (happy, excited, bored, nervous, tired)<br>• Present Simple routines & prepositions of time | **Complete** |
| **Pupil's Book** | pp. 30–33 | **Lesson 2: Talking about habits - Good & Bad**<br>• Exclusive interview with a star athlete on sleep, diet, and training<br>• Adverbs of frequency (always, usually, often, sometimes, rarely, never)<br>• Interactive 6-level Frequency Speedometer | **Complete** |
| **Pupil's Book** | pp. 34–36 | **Lesson 3: Customs around the world**<br>• International breakfast traditions (UK, Japan, Greece)<br>• Table manners and cultural greetings (bowing, taking off shoes, chopsticks)<br>• Self-Assessment Unit 2 ("Can-Do" Passport) | **Complete** |
| **Activity Book** | pp. 11–18 | **Unit 2 Workbook Activities**<br>• Lesson 1 Act A: Feelings faces matching (8 emotions)<br>• Lesson 1 Act B: Henry's routine fill-in (wakes, has, starts, finishes...)<br>• Lesson 2 Act A: School subjects anagram unscrambler<br>• Lesson 2 Act B: Athlete interview gap-fill<br>• Lesson 2 Act C: Good vs Bad habits classification<br>• Lesson 2 Act E: Frequency word order sentence builder | **Complete** |
| **Differentiated Appendix** | pp. 68–70 | **Unit 2 Graded Differentiated Tasks**<br>• One-Star (`*`): Weekly school timetable schedule planner<br>• Two-Star (`**`): Memory game on Henry's letter with error corrections | **Complete** |
| **Teacher's Book** | pp. 26–34 | Master lesson plans, listening scripts, basketball star interview script, and official answer keys | **Complete** |
| **Photodentro OER** | Applet | `Present_Simple_and_Present_Continuous_for_younger_children_v2.0 opencode` | **Integrated** |

---

## 3. Pedagogical Calibration & Linguistic Audits

### 3.1 Strict CEFR A1 Lexical Calibration
- **Total Curated Lemmas**: 72 items across 7 distinct curriculum categories.
- **Definition Word Count Cap**: Every definition is strictly constrained to **$\le 13$ words** (well under the 14-word ceiling mandated in the platform specification).
- **Phonetics & IPA**: Accurate British pronunciation (`[ˈmʌfɪn]`, `[ˈhæbɪt]`, `[ˈbrekfəst]`).
- **Pedagogical Distractor Rules Applied**:
  - Strict Part-of-Speech (POS) matching: Nouns compete only with nouns, adjectives with adjectives, adverbs with adverbs.
  - Semantic consistency: Feelings compete with feelings; school subjects with subjects; frequency adverbs with frequency adverbs.
  - Tripartite matrix: Every item includes `distractors_word`, `distractors_greek`, and `distractors_def`.

### 3.2 Pedagogical Errata Reconciled ([unit2/ERRATA.md](file:///c:/photodentro/antigravity/coursebook_fifth/unit2/ERRATA.md))
1. **British Currency Context (PB p. 26)**: Added a "Book check" clarifying British pence (`70p`, `50p`) and euro currency equivalence for Greek pupils.
2. **Sports Star Athlete Anonymity (PB p. 30)**: Kept open in pupil narrative so children can relate to contemporary stars (Giannis Antetokounmpo) while acknowledging historical references in teacher notes.
3. **Fantasy Boarding School Homage (AB p. 12 / p. 68)**: Preserved imaginative narrative regarding magic wands and dining halls with appropriate reading scaffolding.

---

## 4. Platform Architecture & Offline Invariants

### 4.1 Dual Data Twins (`.json` + `.js`)
Ensures zero CORS errors across `file:///` and HTTP:
- `unit2/data/vocabulary_data.json` &harr; `unit2/data/vocabulary_data.js` (`window.VOCABULARY_DATA`)
- `unit2/data/unit2_v2_data.json` &harr; `unit2/data/unit2_v2_data.js` (`window.UNIT2_V2_DATA`)
- `unit2/data/unit2_workbook_data.json` &harr; `unit2/data/unit2_workbook_data.js` (`window.UNIT2_WORKBOOK_DATA`)
- `data/coursebook_catalog.json` &harr; `data/coursebook_catalog.js` (`window.COURSEBOOK_CATALOG`)

### 4.2 Air-Gapped Offline Fonts & Vector Art
- Uses shared local WOFF2 fonts (`assets/fonts/fonts.css`) with zero external font requests.
- Original vector SVGs created in `unit2/assets/images_v2/`:
  - `school_newspaper.svg`
  - `school_life.svg`
  - `sports_habits.svg`
  - `world_customs.svg`

### 4.3 Audio Engineering & Verbatim Sidecars
- Every single `.mp3` file is paired with an exact UTF-8 `.txt` sidecar containing the verbatim transcript.
- Dynamic sequential chaining (Word &rarr; 350ms pause &rarr; Definition &rarr; 350ms pause &rarr; Example) preserved with zero monolithic audio files.

---

## 5. Automated Quality Assurance Results

| Test Suite | Command | Total Checks | Result |
| :--- | :--- | :---: | :--- |
| **Unit 2 Master Test Suite** | `node unit2/test_v2.js` | 290+ | **100% Passed, 0 Failed** |
| **Unit 2 Air-Gap & Offline Audit** | `node unit2/verify_offline.js` | 41 | **41 Passed, 0 Failed** |
| **Unit 1 Regression QA** | `node unit1/test_v1.js` | 252 | **252 Passed, 0 Failed** |
| **Unit 1 Air-Gap Audit** | `node unit1/verify_offline.js` | 41 | **41 Passed, 0 Failed** |

---

## 6. Verification Steps for Human Review

1. **Launch Root Portal**:
   - Open [portal.html](file:///c:/photodentro/antigravity/coursebook_fifth/portal.html) in your browser.
   - Confirm Unit 2 shows "Ready" status with action buttons for Student's Book &amp; Workbook, Vocabulary Companion, and Photodentro OER Lab.
2. **Launch Unit 2 Coursebook Companion (V2)**:
   - Open [unit2/v2.html](file:///c:/photodentro/antigravity/coursebook_fifth/unit2/v2.html).
   - Test the 4 story dossiers with karaoke read-along.
   - Test the Frequency Speedometer and Grammar Lab practice questions.
   - Test Workbook exercises with automated checking and model answer reveals.
3. **Launch Unit 2 Vocabulary Companion (V1)**:
   - Open [unit2/index.html](file:///c:/photodentro/antigravity/coursebook_fifth/unit2/index.html).
   - Test Flashcards, Spaced Quiz, and audio playback.
4. **Launch Unit 2 Photodentro OER Lab**:
   - Click "Photodentro OER Lab" to open `Present_Simple_and_Present_Continuous_for_younger_children_v2.0 opencode/index.html`.
