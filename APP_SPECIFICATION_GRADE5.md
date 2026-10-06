# Comprehensive Functional & Architectural Specification: English 5th Grade Unified Digital Coursebook & Companion Platform
## *English 5th Grade — Αγγλικά Ε΄ Δημοτικού*

**Target Curriculum**: Greek Ministry of Education & Religious Affairs (*ΥΠΑΙΘΑ*) / ITYE "Diophantus" (*Αγγλικά Ε΄ Δημοτικού* by E. Kolovou and A. Kraniotou)  
**CEFR Target Level**: CEFR A1- to A1 (Beginner to Low Basic User)  
**Target Learners**: 10–11 year-old Greek Primary School EFL Pupils, School Teachers & Private Tutors  
**Platform Architecture**: Zero-backend, 100% GDPR-compliant, Air-gapped Offline-First Dual-Engine Client Web Platform  
**Master Source Corpus**: `C:\photodentro\antigravity\coursebook_fifth\text\` (Pupil's Book 170 pp, Activity Book 98 pp, Teacher's Book 146 pp, Appendices)  
**Master Lexical Base**: `5th grade_coursebook_cefr.json` (714 calibrated lemmas across CEFR A1/A2/B1; Oxford 3000/5000 alignment)  
**Distractor Database**: `grade5_distractor_candidates.json` & `.agents/rules/distractor.md`  

---

# TABLE OF CONTENTS
1. [PART I: ARCHITECTURAL & FUNCTIONAL SPECIFICATION](#part-i-architectural--functional-specification)
   - [1. Executive Vision & Foundational Mandates](#1-executive-vision--foundational-mandates)
   - [2. Pedagogical Calibration for CEFR A1- to A1](#2-pedagogical-calibration-for-cefr-a1--to-a1)
   - [3. The Tripartite Platform Architecture](#3-the-tripartite-platform-architecture)
   - [4. The Interactive Vocabulary Companion (`unitXX/index.html`)](#4-the-interactive-vocabulary-companion-unitxxindexhtml)
   - [5. The Coursebook & Workbook Companion (`unitXX/v2.html`)](#5-the-coursebook--workbook-companion-unitxxv2html)
   - [6. Polymorphic Interactive Exercise Engine](#6-polymorphic-interactive-exercise-engine)
   - [7. Inductive Grammar Studio](#7-inductive-grammar-studio)
   - [8. The Differentiated Learning Appendix Engine (`*` and `**`)](#8-the-differentiated-learning-appendix-engine--and-)
   - [9. Photodentro OER Interactive Laboratory](#9-photodentro-oer-interactive-laboratory)
   - [10. Operational Modes & Role-Based Workflows](#10-operational-modes--role-based-workflows)
2. [PART II: EXHAUSTIVE 5TH GRADE CURRICULUM & SYLLABUS MATRIX](#part-ii-exhaustive-5th-grade-curriculum--syllabus-matrix)
   - [1. Scope & Sequence Overview (10 Units)](#1-scope--sequence-overview-10-units)
   - [2. Granular Unit & Lesson Breakdown (Units 1 to 10)](#2-granular-unit--lesson-breakdown-units-1-to-10)
   - [3. Specialized Coursebook Appendices Decomposition](#3-specialized-coursebook-appendices-decomposition)
3. [PART III: TECHNICAL DATA SCHEMAS & INTERFACE CONTRACTS](#part-iii-technical-data-schemas--interface-contracts)
   - [1. Master Coursebook Catalog Manifest (`coursebook_catalog.json` / `.js`)](#1-master-coursebook-catalog-manifest-coursebook_catalogjson--js)
   - [2. Unit Master V2 Schema (`unitN_v2_data.json` / `.js`)](#2-unit-master-v2-schema-unitn_v2_datajson--js)
   - [3. Unit Vocabulary Schema (`vocabulary_data.json` / `.js`)](#3-unit-vocabulary-schema-vocabulary_datajson--js)
   - [4. Unit Workbook & Differentiated Appendix Schema (`unitN_workbook_data.json` / `.js`)](#4-unit-workbook--differentiated-appendix-schema-unitn_workbook_datajson--js)
   - [5. Student Workspace State & Persistence Schema (`IndexedDB` / `localStorage`)](#5-student-workspace-state--persistence-schema-indexeddb--localstorage)
4. [PART IV: AUDIO ENGINEERING & MEDIA PIPELINE](#part-iv-audio-engineering--media-pipeline)
   - [1. Dual-Engine Speech Synthesis Specification](#1-dual-engine-speech-synthesis-specification)
   - [2. Playback Speed Calibration & Sequential Chaining](#2-playback-speed-calibration--sequential-chaining)
   - [3. Verbatim Audio Sidecars Protocol (`.txt`)](#3-verbatim-audio-sidecars-protocol-txt)
   - [4. Karaoke Audio Read-Along Synchronization](#4-karaoke-audio-read-along-synchronization)
   - [5. Floating Audio Waveform HUD Specification](#5-floating-audio-waveform-hud-specification)
5. [PART V: PEDAGOGICAL ASSESSMENT & DISTRACTOR CALIBRATION](#part-v-pedagogical-assessment--distractor-calibration)
   - [1. The 4-Option Multiple-Choice Distractor Standard](#1-the-4-option-multiple-choice-distractor-standard)
   - [2. Multi-Unit Spaced Pooling & Error Bank Replay](#2-multi-unit-spaced-pooling--error-bank-replay)
   - [3. Formative Scaffolding & Smart Hint Cascade](#3-formative-scaffolding--smart-hint-cascade)
6. [PART VI: UI/UX DESIGN SYSTEM & ACCESSIBILITY](#part-vi-uiux-design-system--accessibility)
   - [1. Typography & Readability Architecture](#1-typography--readability-architecture)
   - [2. Color Tokens & Visual Hierarchy](#2-color-tokens--visual-hierarchy)
   - [3. Cross-Device Responsive Layout Engine](#3-cross-device-responsive-layout-engine)
   - [4. Accessibility & Dyslexia Scaffolding Tokens](#4-accessibility--dyslexia-scaffolding-tokens)
7. [PART VII: DIRECTORY TOPOLOGY & IMPLEMENTATION ROADMAP](#part-vii-directory-topology--implementation-roadmap)
   - [1. Repository File & Folder Hierarchy](#1-repository-file--folder-hierarchy)
   - [2. The Six-Phase Unit Engineering Pipeline](#2-the-six-phase-unit-engineering-pipeline)
   - [3. Unit-by-Unit Implementation Sprint Schedule](#3-unit-by-unit-implementation-sprint-schedule)
   - [4. Quality Assurance Contract & Air-Gap Verification](#4-quality-assurance-contract--air-gap-verification)
   - [5. Institutional Value Matrix](#5-institutional-value-matrix)

---

# PART I: ARCHITECTURAL & FUNCTIONAL SPECIFICATION

## 1. Executive Vision & Foundational Mandates

### 1.1 The Dual-Role Mandate
The 5th Grade English Digital Platform (*Αγγλικά Ε΄ Δημοτικού*) is engineered to fulfill two indispensable and mutually reinforcing roles in primary education:

1. **Total Printed Book Replacement**:
   - A primary school student or English teacher can conduct 100% of their curriculum work without ever opening the printed **Pupil's Book (170 pp)**, the printed **Activity Book / Workbook (98 pp)**, the **Teacher's Book (146 pp)**, or operating an auxiliary CD player.
   - All reading texts, comic dialogues, songs, poems, grammar charts, listening exercises, workbook tasks, self-assessments, and the 26-page **Differentiated Learning Appendix (`*` and `**`)** are digitized into auto-evaluating, interactive, state-persistent software components.

2. **Augmented Digital Companion**:
   - The application transcends passive static pages by providing:
     - Synchronized **karaoke-style read-along audio** with interactive jumping.
     - Dual-engine high-fidelity voice pronunciation (pedagogical standard + native British neural AI).
     - Inductive visual grammar sandboxes (speedometers, balance scales, compass navigators).
     - Scientifically calibrated distractor quiz applets with spaced error recovery.
     - Integrated sandboxes for Greek National Educational Repository (**Photodentro OER**) learning objects.

```
                       ┌────────────────────────────────────────────────────────┐
                       │     Unified 5th Grade English Digital Platform         │
                       └───────────────────────────┬────────────────────────────┘
                                                   │
         ┌─────────────────────────────────────────┴────────────────────────────────────────┐
         ▼                                                                                  ▼
┌─────────────────────────────────┐                                ┌──────────────────────────────────┐
│   TOTAL COURSEBOOK REPLACEMENT  │                                │    AUGMENTED DIGITAL COMPANION   │
├─────────────────────────────────┤                                ├──────────────────────────────────┤
│ • Complete Pupil's Book (170 pp)│                                │ • Dual-Engine Audio (Edge/Google)│
│ • Complete Workbook (98 pp)     │                                │ • Inductive Grammar Laboratory   │
│ • Differentiated Appendix (*/**)│                                │ • Interactive Story Dossiers     │
│ • Teacher's Answer Keys & Notes │                                │ • Calibrated Distractor Quizzes  │
│ • Integrated Audio Listening CD │                                │ • Photodentro OER Native Embeds  │
│ • Digital Marginalia & Notebook │                                │ • Spaced Error Bank & Can-Do Rad.│
└─────────────────────────────────┘                                └──────────────────────────────────┘
```

### 1.2 Core Architectural Non-Negotiables
* **100% Offline-First & Air-Gap Compliance**: The platform must execute entirely over local file system protocols (`file:///`) or static hosting without requiring an active internet connection, external web fonts, third-party CDNs, tracking telemetry, or remote APIs. It is fully GDPR-compliant and safe for minors.
* **Dual-Format Data Twins (`.json` + `.js`)**: To overcome browser CORS restrictions that block `fetch()` over `file:///` URLs, every structured dataset is maintained as a pair of identical twins: a canonical `.json` data file (for validation and build scripts) and a `.js` file declaring `window.*` globals for zero-configuration local execution.
* **Device Independence & Input Agnosticism**: Fully operational via mouse, multi-touch gestures, smartboard/IWB pointers, and keyboard navigation.
* **Zero JavaScript Console Exceptions**: Absolute zero-tolerance policy for runtime warnings, unhandled exceptions, null pointer dereferences, or broken resource links.

---

## 2. Pedagogical Calibration for CEFR A1- to A1

### 2.1 Psycholinguistic Profile of 10–11 Year-Old Greek Learners
While 6th Grade targets the A1+ to A2 consolidation threshold, 5th Grade serves younger learners (ages 10–11) transitioning from primary oral exposure into formal reading and writing:
* **Lexical Cap**: Every target headword is explained using strictly CEFR A1-level defining vocabulary (concrete everyday nouns, basic action verbs, high-frequency adjectives).
* **Maximum Definition Length**: Capped strictly at **14 words**. Definitions are direct, child-friendly, concrete, and eliminate all circularity.
* **Typographic Legibility**: Built using dyslexia-friendly sans-serif typefaces (Lexend, Outfit, Inter) with generous x-height, wide letter tracking, and a line-height ratio of 1.6 to prevent visual crowding.
* **Visual Scaffolding**: Standardized coursebook activity badge icons (Listening ear, Speaking lips, Writing pencil, Reading glasses, Group work) scaffold every activity.

### 2.2 Curricular Framework: DEPPS-APS Alignment
The platform strictly incorporates the pedagogical mandates of the Greek Cross-Thematic Curriculum Framework for Foreign Languages (**DEPPS-APS**):
* **Communicative Language Teaching (CLT)**: Language structures are learned in communicative contexts (introducing friends, ordering food, asking for directions, planning environmental cleanups).
* **Task-Based Learning (TBLT)**: Every unit culminates in communicative output (guidebook entries, school posters, recipe cards, debate speeches).
* **Content and Language Integrated Learning (CLIL)**: Cross-curricular links with Geography, History, Environmental Studies, Maths, Art, and Drama.

### 2.3 The Three Core Protagonists
Narratives across all 10 units follow three pen pals communicating online and meeting in person:
* **Kostas**: 11 years old, living in Athens, Greece. Passionate about computer games, Greek history, basketball, and environmental action.
* **Nadine**: 11 years old, living in Paris, France. Enthusiastic about art, French cuisine, world wildlife, and music.
* **Mark**: 11 years old, living in London, UK. Keen on world records, school sports, technology, and literature.

---

## 3. The Tripartite Platform Architecture

To give students and teachers complete control over their learning workflow, every unit is constructed around a Tripartite Architecture:

```
┌─────────────────────────────────┐   ┌──────────────────────────────────┐   ┌──────────────────────────────────┐
│ 1. VOCABULARY COMPANION         │   │ 2. COURSEBOOK COMPANION          │   │ 3. MASTER COURSEBOOK PORTAL      │
│    (unitXX/index.html)          │   │    (unitXX/v2.html)              │   │    (portal.html)                 │
├─────────────────────────────────┤   ├──────────────────────────────────┤   ├──────────────────────────────────┤
│ • Interactive Table Companion   │   │ • Full Pupil's Book reading texts│   │ • 10-Unit visual dashboard       │
│ • Visual Flippable Flashcards   │   │ • Complete Workbook worksheets   │   │ • Unit progress & mastery tracker│
│ • Listening & Definition Quiz   │   │ • Differentiated Appendix (*/**) │   │ • Dual audio engine toggles      │
│ • Printable Study Sheets        │   │ • Inductive Grammar Laboratories │   │ • Integrated video showcase &    │
│ • Floating Audio Waveform HUD   │   │ • Landmark Hotspot Storyboards   │   │   Photodentro OER launchpad      │
│ • Dual-Engine Audio Pronunciation│  │ • Teacher's Book Answer Keys     │   │ • Full offline export / backup   │
└─────────────────────────────────┘   └──────────────────────────────────┘   └──────────────────────────────────┘
```

---

## 4. The Interactive Vocabulary Companion (`unitXX/index.html`)

The Vocabulary Companion serves as the dedicated lexical mastery station for each unit's 40–55 calibrated core headwords:

```
┌────────────────────────────────────────────────────────────────────────┐
│             Six Specialized Learning Modes in Vocabulary Companion     │
├────────────────────────────┬───────────────────────────────────────────┤
│ Mode                       │ Functional Mechanics & User Actions       │
├────────────────────────────┼───────────────────────────────────────────┤
│ 1. Table Companion         │ 6-column interactive lexical grid:        │
│                            │ Word, POS, IPA Phonetic, Greek Meaning,   │
│                            │ Simple A1 Definition, Example Sentence.   │
│                            │ 4 Audio triggers per row: [Word], [Def],  │
│                            │ [Example], and chained [Play All].        │
│                            │ Dynamic regex target word highlighting.   │
├────────────────────────────┼───────────────────────────────────────────┤
│ 2. Visual Flashcards       │ 3D tactile flip cards for self-testing.   │
│                            │ Front: Word + IPA + Topic Badge + Audio.  │
│                            │ Back: Greek meaning + Simple Definition + │
│                            │ contextual example with target word mark. │
│                            │ Controls: Next, Prev, Shuffle, Keyboard   │
│                            │ Spacebar flip, touch swipe navigation.    │
├────────────────────────────┼───────────────────────────────────────────┤
│ 3. Listening Challenge     │ Audio stimulus plays automatically without│
│                            │ showing the English spelling. Student     │
│                            │ selects the correct Greek translation from│
│                            │ 4 calibrated distractors (distractor.md). │
│                            │ Formative audio feedback + streak counter.│
├────────────────────────────┼───────────────────────────────────────────┤
│ 4. Definition Challenge    │ Child-friendly A1 English clue presented; │
│                            │ student chooses the correct target word   │
│                            │ from 4 POS-matched choices. Explanations  │
│                            │ provided for incorrect selections.        │
├────────────────────────────┼───────────────────────────────────────────┤
│ 5. Printable Study Sheet   │ Clean, high-contrast, print-optimized     │
│                            │ layout (@media print) formatting the unit │
│                            │ lexis into a two-column revision table    │
│                            │ with name/date header for paper homework. │
├────────────────────────────┼───────────────────────────────────────────┤
│ 6. Script & Sidecar View   │ Transparent developer & teacher inspector │
│                            │ showing exact TTS verbatim scripts and    │
│                            │ sidecar text files (.txt sidecars).       │
└────────────────────────────┴───────────────────────────────────────────┘
```

### Shared Vocabulary Controls:
* **Fuzzy Instant Search**: Instant live filtering across headwords, Greek translations, definitions, and topics simultaneously.
* **Topic Pill Filter Bar**: Dynamically populated filter chips derived from unit topics (e.g., `All Words (52)`, `Computer Parts (12)`, `Internet Actions (8)`, `Countries (14)`).
* **Dual-Engine Voice Switcher**: Toggles between:
  - **Natural Neural AI**: High-fidelity British English accent via Microsoft Edge Neural synthesis (`en-GB-SoniaNeural`).
  - **Google Standard**: Classic clear pedagogical pronunciation.
* **Speed Calibrator**: Three-position speed control: **0.8x** (slow articulation for phonetic drilling), **1.0x** (standard), and **1.2x** (fluent review).
* **Floating Audio HUD**: Persistent controller sliding into view during playback, displaying real-time animated audio waveforms, active word title, and instant Pause/Stop controls.
* **Bridge to Coursebook V2**: Direct header button launching the full Coursebook & Workbook companion (`v2.html`).

---

## 5. The Coursebook & Workbook Companion (`unitXX/v2.html`)

The Coursebook Companion is the comprehensive classroom workstation replacing the physical Student's Book, Workbook, and Teacher's Book:

* **Adaptive Dual-Pane Workspace (Desktop/Laptop 1200px - 1920px)**:
  - **Left Pane (The Reader)**: Displays the authentic Pupil's Book reading passages, comic dialogues, cultural texts, and songs with high-resolution typography.
  - **Right Pane (The Workstation)**: Houses the corresponding comprehension tasks, vocabulary exercises, grammar challenges, and workbook tasks.
  - **Interactive Cross-Linking**: Clicking a highlighted vocabulary word or landmark in the text instantly focuses and highlights its corresponding question in the worksheet.
* **Single-Column Responsive Fold (Mobile 360px - 480px)**:
  - Stacks the reading and exercise modules vertically with a persistent, non-intrusive floating toggle ("Read Story" ↔ "Exercises") that preserves scroll offsets and unfinished inputs.
* **Karaoke-Style Read-Along Audio Synchronization**:
  - Highlights speaker turns and narrative sentences in real time as audio plays.
  - Clicking any sentence jumps playback directly to that timestamp.
  - Speed toggle: **0.8x**, **1.0x**, and **1.2x**.

---

## 6. Polymorphic Interactive Exercise Engine

Every exercise from the Pupil's Book, Activity Book, and Differentiated Appendix is powered by an auto-checking engine supporting 8 fundamental interaction archetypes:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Polymorphic Exercise Archetypes                      │
├────────────────────────────┬───────────────────────────────────────────┤
│ Archetype                  │ Behavioral Mechanics & Scaffolding        │
├────────────────────────────┼───────────────────────────────────────────┤
│ 1. Inline Cloze / Gap-Fill │ Typed text or inline dropdown;            │
│                            │ case-insensitive; trims punctuation;      │
│                            │ accepts Teacher's Book authorized variants│
├────────────────────────────┼───────────────────────────────────────────┤
│ 2. Word-Bank Drag & Drop   │ Interactive chip rack; chips snap into    │
│                            │ empty slots; tap-to-place on touch;       │
│                            │ returned chips return to the pool.        │
├────────────────────────────┼───────────────────────────────────────────┤
│ 3. Two-Column Matching     │ Click/tap left item then right item to    │
│                            │ draw SVG connecting vectors; supports     │
│                            │ 1-to-1 and 1-to-many associations.        │
├────────────────────────────┼───────────────────────────────────────────┤
│ 4. Matrix Categorization   │ Multi-column sort bins (e.g., Computer    │
│                            │ Parts vs Internet Terms; Good vs Bad);    │
│                            │ drag or select-destination placement.     │
├────────────────────────────┼───────────────────────────────────────────┤
│ 5. Scrambled Syntax        │ Interactive reordering of jumbled word    │
│                            │ chips to construct grammatically valid    │
│                            │ A1 sentences (Subject + Verb + Object).   │
├────────────────────────────┼───────────────────────────────────────────┤
│ 6. Dialogue Turn Ordering  │ Chronological reconstruction of pen-pal   │
│                            │ emails and chat conversations with audio. │
├────────────────────────────┼───────────────────────────────────────────┤
│ 7. Multiple Choice / T-F   │ Single-select or multi-select with        │
│                            │ mandatory textual evidence citation.      │
├────────────────────────────┼───────────────────────────────────────────┤
│ 8. Guided Writing Canvas   │ Multi-step template for writing emails,   │
│                            │ postcards, and recipes; equipped with     │
│                            │ word-count milestones & starter chips.    │
└────────────────────────────┴───────────────────────────────────────────┘
```

#### Evaluation Mechanics & Smart Hint Cascade:
* **Immediate Verification**: Student clicks "Check Answers"; correct answers turn green with affirmative chimes; incorrect answers highlight in amber with a gentle shake.
* **Three-Tier Smart Hint Cascade**:
  - *Tier 1 (Contextual Clue)*: Highlights the paragraph or sentence in the reading passage where the answer is found.
  - *Tier 2 (Morphological Scaffold)*: Reveals the first letter of the target word or eliminates one distractor.
  - *Tier 3 (Teacher's Explanation)*: Displays the complete grammatical rule or explanation from the Teacher's Book.
* **Teacher Key Reveal**: A master toggle in Teacher Mode that reveals all verified answers across the worksheet for whole-class correction.

---

## 7. Inductive Grammar Studio

Replaces passive grammar tables with manipulable visual sandboxes across all 10 units:
* **Unit 1**: **Like / Enjoy / Hate + `-ing` Builder** (interactive verb-object puzzle blocks; *Prefer... to...* balance).
* **Unit 2**: **Adverbs of Frequency Speedometer** (*never 0% → sometimes 50% → usually 80% → always 100%* with routine sentence generator).
* **Unit 3**: **Interactive City Compass & Map** (simulated street grid for giving directions: *turn left, go straight, opposite, next to*).
* **Unit 4**: **Kitchen Recipe Step Sequencer** (imperatives & sequence markers: *First, Then, Next, Finally*).
* **Unit 5**: **Environmental Future Planner** (*be going to* vs. *Present Continuous* future intentions; modal auxiliary tags *can, must, should*).
* **Unit 6**: **Comparative & Superlative Balance Scale** (dragging *-er / more* and *-est / most* onto adjective balances; irregular forms *good-better-best*).
* **Unit 7**: **The Time Machine** (Past Simple regular verbs `-ed` phonetics `/t/`, `/d/`, `/ɪd/`; past time marker timeline *yesterday, ago, last*).
* **Unit 8**: **Storybook Drama Stage** (Past Simple irregular verb card deck + Past Continuous scene builder with *when* and *while*).
* **Unit 9**: **Present Perfect Experience Vault** (connecting past actions to visible present results; *ever, never, already, yet* sliders).
* **Unit 10**: **Tense Synthesis Matrix & Preposition Diorama** (consolidating Present, Past, Future, and Present Perfect; 3D-style prepositions of place).

---

## 8. The Differentiated Learning Appendix Engine (`*` and `**`)

The 5th Grade Activity Book features a specialized 26-page graded appendix (`workbook_appendix_differentiated.pdf`, pp. 64–89) designed for differentiated instruction:
* **One-Star (`*`) Activities**: Scaffolding reinforcement tasks with visual cues, anagram un-scrambling, word banks, and partial starter stems for learners needing consolidation.
* **Two-Star (`**`) Activities**: Extension and creative production challenges requiring independent sentence creation, partner dialogue, and open writing.
* **Adaptive Recommendation**: The software automatically analyzes pupil performance on the core unit tasks and suggests either the `*` reinforcement or the `**` extension activity. Both tiers are fully digitized and auto-evaluating.

---

## 9. Photodentro OER Interactive Laboratory

The 5th Grade platform integrates official Greek National Educational Repository (**Photodentro**) learning objects located under `photodentro_apps/`:
1. **`picture_dictionary_computer_parts_v2.0`**: Embedded interactive picture dictionary for Unit 1 computer vocabulary (monitor, screen, mouse, tower, microphone, printer).
2. **`Present_Simple_and_Present_Continuous_for_younger_children_v2.0 opencode`**: Interactive grammar applet for Units 1 and 2 verb tenses.
* **Integration Specification**: Applets are embedded within responsive sandboxed iframes. A cross-window communication bridge (`postMessage`) monitors user completion and awards unit star badges directly in the main platform portal.

---

## 10. Operational Modes & Role-Based Workflows

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Three Specialized Operating Modes                    │
├────────────────────────────────────────────────────────────────────────┤
│  1. Student Self-Study Mode (Default)                                  │
│     • Formative feedback enabled (retry wrong answers)                 │
│     • Audio assistance and scaffolded hints accessible                 │
│     • Personal progress tracking & gamified mastery streaks            │
├────────────────────────────────────────────────────────────────────────┤
│  2. Teacher Classroom & Interactive Whiteboard (IWB) Mode              │
│     • Instant "Reveal All Answers" toggle for whole-class review       │
│     • High-contrast display scaling (minimum 64x64px hitboxes)         │
│     • Integrated activity countdown timer & random student picker      │
│     • Reading passage spotlight masking tool                           │
│     • Teacher's Book pedagogical lesson plan drawer                    │
├────────────────────────────────────────────────────────────────────────┤
│  3. Homework & Independent Assessment Mode                             │
│     • Hints and instant verification disabled                          │
│     • Single-attempt submission recording                              │
│     • Generates a signed, verifiable JSON report or printable PDF      │
│       summary for teacher inspection without requiring a central server│
└────────────────────────────────────────────────────────────────────────┘
```

---

# PART II: EXHAUSTIVE 5TH GRADE CURRICULUM & SYLLABUS MATRIX

## 1. Scope & Sequence Overview (10 Units)

```
┌──────┬───────────────────────────────┬──────────────────────────────────┬─────────────────────────────┬──────────┐
│ Unit │ Title & Characters            │ Grammar & Structures             │ Lexical & Thematic Focus    │ Lexis Qty│
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 01   │ Internet Friends Around       │ Like/hate/enjoy + -ing;          │ Computer parts, internet    │ ~68 items│
│      │ Europe (Kostas, Nadine, Mark) │ Prefer... to...; Present Simple  │ terms, countries, flags     │          │
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 02   │ School Life & The World       │ Present Simple; Adverbs of       │ School routines, feelings,  │ ~72 items│
│      │ Around Us                     │ frequency; Prepositions in/on/at │ healthy habits, world foods │          │
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 03   │ Places                        │ Prepositions of place/direction; │ Public buildings, transport,│ ~65 items│
│      │                               │ Imperatives; Why don't you...?   │ city maps, road safety      │          │
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 04   │ Christmas Everywhere          │ Sequence words (first, then);    │ Cooking verbs, ingredients, │ ~64 items│
│      │ (New York, Athens, London)    │ Imperatives; Process description │ Christmas customs & carols  │          │
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 05   │ Ready for Action              │ Present Continuous future sense; │ Recycling, litter, ecology, │ ~74 items│
│      │ (Environmental Project)       │ be going to; Modals can/must/need│ conservation campaigns      │          │
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 06   │ Good, Better, Best!           │ Comparative adjectives (-er/more)│ Consumer goods, packaging,  │ ~70 items│
│      │ (Presents & World Records)    │ Superlative adjectives (-est/most│ records, sports feats       │          │
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 07   │ Going Back in Time            │ Past Simple regular verbs (-ed); │ History, ancient theatre,   │ ~76 items│
│      │ (Alexander the Great)         │ Past time markers (ago, last...) │ archaeology, biographies    │          │
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 08   │ All About Stories             │ Past Simple irregular verbs;     │ Fairy tales, Karagiozis,    │ ~75 items│
│      │ (Fairy Tales & Drama)         │ Past Continuous; when / while    │ characters, Easter traditions│         │
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 09   │ Amazing People & Places       │ Present Perfect (affirmative,    │ Wildlife, Dian Fossey,      │ ~78 items│
│      │ (Gorillas & Dubai Trip)       │ negative, questions, ever/never) │ newspapers, art awards      │          │
├──────┼───────────────────────────────┼──────────────────────────────────┼─────────────────────────────┼──────────┤
│ 10   │ Summer is Here!               │ Tense synthesis (Past, Present,  │ Airport, travel, Parthenon  │ ~72 items│
│      │ (Airport Reunion & Parthenon) │ Future); Prepositions of place   │ marbles debate, Greek myths │          │
├──────┴───────────────────────────────┴──────────────────────────────────┴─────────────────────────────┴──────────┤
│ TOTAL CORE CURRICULUM ITEMS: 714 calibrated lemmas across CEFR A1- to A1+ levels                                  │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Granular Unit & Lesson Breakdown (Units 1 to 10)

### Unit 1: Internet Friends Around Europe
* **Protagonists**: Kostas (Greece), Nadine (France), Mark (UK).
* **Lesson 1: Do you like computers? (PB pp. 13–17)**:
  - *Reading*: Pen-pal emails between Kostas and Mark about computer hobbies.
  - *Listening*: Specific information to complete an interactive computer hardware table.
  - *Speaking*: Asking about leisure preferences and forming online school clubs.
  - *Writing*: Drafting an introductory pen-pal email.
  - *Grammar*: `Like / don't like / enjoy / hate + -ing / noun`; `Prefer + -ing/noun + to + -ing/noun`.
* **Lesson 2: Internet friends (PB pp. 18–21)**:
  - *Reading*: Children's newspaper article on internet pen pals across Europe.
  - *Listening*: Multi-speaker dialogue about daily school schedules and timetables.
  - *Speaking*: European flags, countries, and nationalities.
  - *Writing*: Formulating interview questions on school habits.
  - *Grammar*: Present Simple (affirmative, negative, interrogative).
* **Lesson 3: The United Kingdom (PB pp. 22–24)**:
  - *Reading*: Cultural guide to the UK (England, Scotland, Wales, Northern Ireland).
  - *Assessment*: Self-Assessment Unit 1 (PB pp. 23–24).
* **Activity Book Unit 1 (AB pp. 7–10)**:
  - Section A (Vocab), Section B (Grammar), Section C (Writing), Self-Assessment Key (p. 91).
* **Differentiated Appendix (AB p. 64)**:
  - `*` Activity: Word anagram unscramble (`dbkyorea` -> keyboard, `enrecs` -> screen).
  - `**` Activity: Writing contextual sentences for each computer component.
* **Photodentro Applet**: `picture_dictionary_computer_parts_v2.0` (Unit 1 hardware lexis).

### Unit 2: School Life and the World Around Us
* **Protagonists**: Kostas and Nadine comparing daily routines and school menus.
* **Lesson 1: School life and feelings (PB pp. 26–29)**:
  - *Reading*: Scanning a school newspaper; feelings vocabulary (*happy, excited, bored, nervous*).
  - *Listening*: Matching classmates to emotional states during school activities.
  - *Grammar*: Simple Present with prepositions of time (*in the morning, on Mondays, at 8:00*).
* **Lesson 2: Talking about habits - Good & Bad (PB pp. 30–33)**:
  - *Reading*: Health questionnaire on eating habits and physical exercise.
  - *Speaking*: Interviewing classmates on daily routines using frequency adverbs.
  - *Grammar*: Adverbs of Frequency (*always, usually, often, sometimes, never*).
* **Lesson 3: Customs around the world (PB pp. 34–36)**:
  - *Reading*: International school website describing traditional customs and breakfasts.
  - *Assessment*: Self-Assessment Unit 2 (PB pp. 35–36).
* **Activity Book Unit 2 (AB pp. 11–18)** & **Differentiated Appendix (AB pp. 65–67)** (`*` and `**`).
* **Photodentro Applet**: `Present_Simple_and_Present_Continuous_for_younger_children_v2.0 opencode`.

### Unit 3: Places
* **Thematic Anchor**: Urban geography, public services, transport, and street safety.
* **Lesson 1: The place we live in (PB pp. 38–41)**:
  - *Reading*: City guide text describing community buildings (*town hall, post office, hospital, cinema*).
  - *Grammar*: Expressing opinions & suggestions (`Why don't you...?`, `Let's...`, `How about...?`).
* **Lesson 2: How can I get to...? (PB pp. 42–44)**:
  - *Listening*: Audio directions on an authentic city street map.
  - *Speaking*: Asking for and giving directions (`turn left`, `go straight ahead`, `take the second turning`).
  - *Grammar*: Prepositions of place and movement (`opposite`, `between`, `next to`, `past`).
* **Lesson 3: Talking about a city in Greece (PB pp. 45–48)**:
  - *Reading*: Guidebook feature on the city of Nafplio.
  - *Assessment*: Self-Assessment Unit 3 (PB pp. 47–48).
* **Activity Book Unit 3 (AB pp. 19–23)** & **Differentiated Appendix (AB pp. 68–70)** (`*` and `**`).

### Unit 4: Christmas Everywhere
* **Thematic Anchor**: Multicultural Christmas customs, traditional baking, and songs.
* **Lesson 1: Getting ready for Christmas (PB pp. 50–53)**:
  - *Reading*: Traditional recipe for Greek Christmas biscuits (*koulouria / melomakarona*).
  - *Grammar*: Cooking imperatives (`mix`, `bake`, `stir`, `pour`, `add`); sequence adverbs (`First`, `Then`, `Next`, `Finally`).
* **Lesson 2: Kostas is in New York for Christmas (PB pp. 54–57)**:
  - *Reading*: Kostas's travel diary describing Rockefeller Center, ice skating, and snow in NYC.
  - *Listening*: Ordering jumbled dialogue turns in a New York bakery.
* **Lesson 3: A Christmas song (PB pp. 58–60)**:
  - *Reading / Listening*: Learning traditional Christmas carols and reciting seasonal poetry.
  - *Assessment*: Self-Assessment Unit 4 (PB pp. 59–60).
* **Activity Book Unit 4 (AB pp. 24–29)** & **Differentiated Appendix (AB pp. 71–73)** (`*` and `**`).

### Unit 5: Ready for Action
* **Thematic Anchor**: Ecology, litter, recycling campaigns, and environmental protection.
* **Lesson 1: An ambitious class project (PB pp. 62–64)**:
  - *Reading*: Class dialogue planning a beach cleanup and school recycling scheme.
  - *Grammar*: `Present Continuous with future sense` & `be going to` for intentional plans.
* **Lesson 2: Let's do it! (PB pp. 65–69)**:
  - *Reading*: Creating an environmental awareness questionnaire for the local community.
  - *Grammar*: Modal auxiliaries of obligation and advice (`can`, `must`, `should`, `shouldn't`).
* **Lesson 3: My work can make a difference (PB pp. 70–72)**:
  - *Writing Mediation*: Formulating bilingual recycling instructions and eco-posters.
  - *Assessment*: Self-Assessment Unit 5 (PB pp. 71–72).
* **Activity Book Unit 5 (AB pp. 30–35)** & **Differentiated Appendix (AB pp. 74–76)** (`*` and `**`).

### Unit 6: Good, Better, Best!
* **Thematic Anchor**: Consumer goods, product packaging, sports records, and Guinness world feats.
* **Lesson 1: Choosing a present (PB pp. 74–77)**:
  - *Reading*: Comparing specifications and prices on toy and gadget packaging.
  - *Grammar*: Comparative adjectives (`-er than`, `more ... than`).
* **Lesson 2: World records (PB pp. 78–81)**:
  - *Reading*: Astounding Guinness world records (fastest runner, tallest building, oldest tree).
  - *Grammar*: Superlative adjectives (`the -est`, `the most ...`). Irregular forms (`good/better/best`, `bad/worse/worst`).
* **Lesson 3: A knowledge quiz (PB pp. 82–84)**:
  - *Writing*: Authoring a multiple-choice trivia quiz using comparative and superlative forms.
  - *Assessment*: Self-Assessment Unit 6 (PB pp. 83–84).
* **Activity Book Unit 6 (AB pp. 36–41)** & **Differentiated Appendix (AB pp. 77–79)** (`*` and `**`).

### Unit 7: Going Back in Time
* **Thematic Anchor**: Ancient history, archaeology, Elizabethan theatre, and Alexander the Great.
* **Lesson 1: Famous People of the Past (PB pp. 86–89)**:
  - *Reading*: Biographies of historical figures; Ancient Greek theatre vs. Shakespeare's Globe.
  - *Grammar*: Past Simple regular verbs with `-ed` (`worked`, `visited`, `painted`).
* **Lesson 2: Past Experiences (PB pp. 90–93)**:
  - *Reading*: Historical detective alibi game; timeline sequencing.
  - *Grammar*: Past Simple negative (`didn't + infinitive`) and questions (`Did you...?`). Time markers (`yesterday`, `two days ago`, `last month`).
* **Lesson 3: Alexander the Great (PB pp. 94–96)**:
  - *Reading*: Critical biography of Alexander the Great's leadership and campaigns.
  - *Assessment*: Self-Assessment Unit 7 (PB pp. 95–96).
* **Activity Book Unit 7 (AB pp. 42–47)** & **Differentiated Appendix (AB pp. 80–82)** (`*` and `**`).

### Unit 8: All About Stories
* **Thematic Anchor**: Fairy tales, Greek shadow puppet theatre (Karagiozis), drama, and Easter.
* **Lesson 1: Fairy Tales (PB pp. 98–101)**:
  - *Reading*: Deconstructing fairy tales; character traits (*brave, cunning, cruel, honest*).
  - *Grammar*: Past Simple irregular verbs (`went`, `saw`, `ate`, `found`, `spoke`, `wrote`).
* **Lesson 2: What an experience! (PB pp. 102–105)**:
  - *Reading*: Retelling an exciting personal narrative from an online chat.
  - *Grammar*: Past Continuous tense (`was/were + -ing`); contrasting with Past Simple using `when` and `while`.
* **Lesson 3: A traditional story (PB pp. 106–108)**:
  - *Reading*: Cultural traditions and Easter celebrations in Greece and around the world.
  - *Assessment*: Self-Assessment Unit 8 (PB pp. 107–108).
* **Activity Book Unit 8 (AB pp. 48–54)** & **Differentiated Appendix (AB pp. 83–85)** (`*` and `**`).

### Unit 9: Amazing People and Places
* **Thematic Anchor**: Wildlife conservation (Dian Fossey), modern Dubai, arts, and journalism.
* **Lesson 1: She has helped save gorillas (PB pp. 110–113)**:
  - *Reading*: Biography of Dian Fossey and the mountain gorillas of Rwanda.
  - *Grammar*: Present Perfect Simple affirmative (`have/has + past participle`).
* **Lesson 2: A trip to Dubai! (PB pp. 114–117)**:
  - *Reading*: Travel journal exploring the architectural feats of modern Dubai.
  - *Grammar*: Present Perfect negative and questions (`Have you ever...?`, `never`, `already`, `yet`).
* **Lesson 3: Newspapers & headlines (PB pp. 118–120)**:
  - *Writing*: Producing a classroom English newspaper with headlines and lead articles.
  - *Assessment*: Self-Assessment Unit 9 (PB pp. 119–120).
* **Activity Book Unit 9 (AB pp. 55–59)** & **Differentiated Appendix (AB pp. 86–87)** (`*` and `**`).

### Unit 10: Summer is Here!
* **Thematic Anchor**: Airport travel, reunion of Kostas, Nadine, and Mark, Parthenon debate, Greek mythology.
* **Lesson 1: At the airport (PB pp. 122–125)**:
  - *Reading*: Flight announcement boards, airport baggage claim, and tourist welcome desks.
  - *Grammar*: Tense consolidation (Present, Past, Future plans, Present Perfect).
* **Lesson 2: Tourists love visiting places (PB pp. 126–129)**:
  - *Reading*: Walking tour of Athens; debating the return of the Parthenon Marbles.
  - *Speaking*: Expressing opinions, justifying points of view, proposing cultural solutions.
* **Lesson 3: Myths and legends (PB pp. 130–132)**:
  - *Reading*: The myth of Daedalus and Icarus; comparing mythological heroes across cultures.
  - *Assessment*: Self-Assessment Unit 10 (PB pp. 131–132).
* **Activity Book Unit 10 (AB pp. 60–63)** & **Differentiated Appendix (AB pp. 88–89)** (`*` and `**`).

---

## 3. Specialized Coursebook Appendices Decomposition

1. **Pupil's Book Grammar Reference (PB pp. 133–161, 9 pp)**:
   - Comprehensive grammatical charts, rules, and example sentences for all 10 units, fully indexed and hyperlinked to interactive grammar sandboxes.
2. **Irregular Verbs Master Catalog (PB p. 162)**:
   - Alphabetical 3-column table: Base Form (Infinitive), Past Simple, Past Participle, accompanied by Greek translations and dual-engine audio pronunciation triggers.
3. **Cartographic Reference Atlas (PB pp. 163–167, 7 pp)**:
   - High-resolution SVG maps of Greece, the United Kingdom, Europe, and the World, equipped with interactive landmark coordinates.
4. **Activity Book Differentiated Activities (AB pp. 64–89, 26 pp)**:
   - Units 1 to 10 differentiated reinforcement (`*`) and extension (`**`) tasks.
5. **Self-Assessment Answer Keys (AB pp. 90–95, 6 pp)**:
   - Complete official teacher correction keys for all 10 unit Self-Assessment tests.

---

# PART III: TECHNICAL DATA SCHEMAS & INTERFACE CONTRACTS

To maintain strict offline compatibility and zero-configuration execution under `file:///`, all datasets exist as both `.json` files and corresponding `.js` files attaching data to `window.*`.

## 1. Master Coursebook Catalog Manifest (`coursebook_catalog.json` / `.js`)
```typescript
interface CoursebookCatalog {
  curriculum: "Agglika E-Dimotikou";
  edition: "2026 Digital Unified Edition";
  cefr_band: "A1- to A1+";
  total_units: 10;
  units: Array<{
    unit_id: number;
    unit_slug: string; // "unit01" ... "unit10"
    title: string;
    theme: string;
    cefr_level: "A1-" | "A1" | "A1+";
    protagonists: string[];
    vocabulary_count: number;
    lessons: Array<{
      lesson_id: number;
      title: string;
      pupil_book_pages: string;
    }>;
    workbook_pages: string;
    differentiated_pages: string;
    photodentro_app?: {
      app_id: string;
      title: string;
      directory_name: string;
    };
  }>;
}
```

## 2. Unit Master V2 Schema (`unitN_v2_data.json` / `.js`)
```typescript
interface UnitV2Data {
  unit_id: number;
  unit_title: string;
  theme: string;
  cefr_level: string;
  pupil_book: {
    lessons: Array<{
      lesson_id: number;
      lesson_title: string;
      reading_passage: {
        title: string;
        text: string;
        speaker_turns?: Array<{ speaker: string; text: string; audio_cue: string }>;
        audio_classic_src: string;
        audio_neural_src: string;
        timestamps: Array<{ sentence_index: number; start_ms: number; end_ms: number }>;
      };
      comprehension_tasks: Exercise[];
    }>;
    self_assessment: {
      pb_pages: string;
      tasks: Exercise[];
      official_keys: Record<string, string | string[]>;
    };
  };
  companion: {
    story_dossiers: Array<{
      id: string;
      title: string;
      vector_artwork_src: string;
      narrative_text: string;
      owned_vocabulary_ids: number[];
      hotspots: Array<{
        x_pct: number;
        y_pct: number;
        target_vocab_id: number;
        label: string;
      }>;
    }>;
    grammar_studio: {
      structure_name: string;
      formula_en: string;
      formula_gr: string;
      sandbox_type: "verb_builder" | "speedometer" | "compass_navigator" | "balance_scale" | "time_machine";
      interactive_items: Array<{
        id: number;
        prompt: string;
        target_config: any;
      }>;
    };
  };
}
```

## 3. Unit Vocabulary Schema (`vocabulary_data.json` / `.js`)
```typescript
interface VocabularyItem {
  id: number;
  word: string;
  part_of_speech: "noun" | "verb" | "adjective" | "adverb" | "preposition" | "phrase";
  ipa: string;
  meaning_gr: string;
  definition_en: string; // Strictly <= 14 words; A1 defining lexis
  example: string;       // Authentic sentence containing target word
  topic: string;         // e.g., "Computer Parts", "Feelings", "Transport"
  cefr_level: "A1" | "A2" | "B1";
  audio: {
    classic: {
      word: string;    // "assets/audio/unit01_001_word.mp3"
      def: string;     // "assets/audio/unit01_001_def.mp3"
      example: string; // "assets/audio/unit01_001_ex.mp3"
    };
    neural: {
      word: string;    // "assets/audio_neural/unit01_001_word.mp3"
      def: string;     // "assets/audio_neural/unit01_001_def.mp3"
      example: string; // "assets/audio_neural/unit01_001_ex.mp3"
    };
  };
}
```

## 4. Unit Workbook & Differentiated Appendix Schema (`unitN_workbook_data.json` / `.js`)
```typescript
interface WorkbookUnitData {
  unit_id: number;
  workbook_pages: string; // e.g., "pp. 7-10"
  sections: {
    section_a_vocabulary: Exercise[];
    section_b_grammar: Exercise[];
    section_c_skills: Exercise[];
  };
  differentiated_appendix: {
    page: number; // e.g., 64
    one_star_task: {
      activity_id: string; // "Activity A (*)"
      instruction: string;
      task_type: "anagram_unscramble" | "word_bank_cloze" | "picture_match";
      items: Array<{ id: number; prompt: string; target: string; picture_ref?: string }>;
    };
    two_star_task: {
      activity_id: string; // "Activity B (**)"
      instruction: string;
      task_type: "sentence_creation" | "guided_dialogue" | "open_production";
      model_example: string;
      prompts: string[];
      scaffolding_chips: string[];
    };
  };
  self_assessment_keys: Record<string, string | string[]>;
}
```

## 5. Student Workspace State & Persistence Schema (`IndexedDB` / `localStorage`)
```typescript
interface StudentWorkspaceState {
  app_version: "2.0-grade5";
  student_profile: {
    name: string;
    school: string;
    class_section: string;
  };
  settings: {
    audio_engine: "neural" | "classic";
    playback_speed: 0.8 | 1.0 | 1.2;
    role_mode: "student" | "teacher" | "homework";
    dyslexia_font: boolean;
  };
  units_progress: Record<number, {
    stars_earned: number;
    completion_percentage: number;
    completed_exercises: Record<string, {
      user_answers: Record<string, string>;
      is_correct: boolean;
      attempts: number;
      first_try_score: number;
    }>;
    vocabulary_mastery: Record<number, {
      streak: number;
      last_reviewed_timestamp: number;
      in_error_bank: boolean;
    }>;
    differentiated_tier_completed: "none" | "one_star" | "two_star" | "both";
    marginalia: {
      highlights: Array<{ text: string; color: "yellow" | "blue" | "green"; paragraph_id: string }>;
      notes: Array<{ note_id: string; target_id: string; text: string; timestamp: number }>;
    };
    photodentro_completed: boolean;
  }>;
}
```

---

# PART IV: AUDIO ENGINEERING & MEDIA PIPELINE

## 1. Dual-Engine Speech Synthesis Specification
Every lexical item and reading passage supports instantaneous toggling between two dedicated audio synthesis engines:
1. **Classic Pedagogical Voice Engine**: Google Standard English Text-to-Speech synthesis with deliberate enunciation, designed for phonetic scaffolding and classroom drills.
2. **Natural Neural AI Voice Engine**: Microsoft Edge High-Fidelity British English Neural voice synthesis (`en-GB-SoniaNeural` or `en-GB-RyanNeural`) delivering natural phrasing, authentic stress patterns, and British English RP accent.

## 2. Playback Speed Calibration & Sequential Chaining
* **Three Hardware-Calibrated Speeds**:
  - `0.8x`: Slow articulation mode for initial phonetic drills.
  - `1.0x`: Standard pedagogical classroom playback.
  - `1.2x`: Fluent challenge mode for rapid listening comprehension.
* **The Non-Composite Rule**:
  - The application **NEVER** generates or stores baked composite audio files (e.g., combining word + definition + example into a single 4th file).
  - Instead, the audio controller dynamically orchestrates playback in JavaScript:
    ```javascript
    async function playChainedVocabulary(item, engine = 'neural', speed = 1.0) {
      await playAudio(item.audio[engine].word, speed);
      await delay(350); // Pedagogically calibrated inter-phrase pause
      await playAudio(item.audio[engine].def, speed);
      await delay(350);
      await playAudio(item.audio[engine].example, speed);
    }
    ```

## 3. Verbatim Audio Sidecars Protocol (`.txt`)
Every `.mp3` audio asset in the repository is accompanied by an identical `.txt` sidecar file containing the exact verbatim transcript spoken in the audio file:
- `assets/audio/unit01_001_word.mp3` <-> `assets/audio/unit01_001_word.txt`
- `assets/audio_neural/unit01_001_word.mp3` <-> `assets/audio_neural/unit01_001_word.txt`
* **Automated Audit Requirement**: Build scripts parse and verify that the sidecar text matches the data twin's `word`, `definition_en`, and `example` strings byte-for-byte.

## 4. Karaoke Audio Read-Along Synchronization
All Pupil's Book reading passages, stories, and dialogues incorporate high-resolution sentence timestamp markers (`start_ms` and `end_ms`). As the audio plays:
- The active sentence turn receives the `.karaoke-active-sentence` visual CSS class with an animated ambient glow.
- Tapping any sentence in the reader immediately issues a seek command jumping audio playback to that exact `start_ms` timestamp.

## 5. Floating Audio Waveform HUD Specification
During any active audio playback, a floating Audio HUD slides smoothly from the bottom right:
- Displays the active headword, speaker name, or reading title.
- Real-time animated SVG/Canvas waveform visualization responding to playback.
- Instant Pause, Resume, Stop, and Playback Speed (0.8x / 1.0x / 1.2x) toggles.
- Zero layout shift: Positioned using fixed CSS coordinates above all content layers.

---

# PART V: PEDAGOGICAL ASSESSMENT & DISTRACTOR CALIBRATION

## 1. The 4-Option Multiple-Choice Distractor Standard
All multiple-choice questions in the Vocabulary Challenge, Definition Challenge, and Workbook Quizzes adhere strictly to the `.agents/rules/distractor.md` scientific protocol:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Scientific Distractor Golden Rules                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Strict Part-of-Speech (POS) Matching (MANDATORY)                    │
│    • Target Nouns are distracted ONLY by Nouns.                        │
│    • Target Verbs are distracted ONLY by Verbs.                        │
│    • Target Adjectives are distracted ONLY by Adjectives.              │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Semantic Field Consistency (MANDATORY)                              │
│    • Target: "keyboard" (Computer Hardware)                            │
│      - Valid Distractors: "screen", "mouse", "printer"                 │
│      - Invalid Distractors: "hospital", "butter", "afraid"             │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Zero Morphological Giveaways                                        │
│    • Distractors match the target in word length, grammatical number   │
│      (singular/plural), and article agreement ("a" vs "an").           │
├────────────────────────────────────────────────────────────────────────┤
│ 4. CEFR A1- to A1 Cap                                                  │
│    • Distractors NEVER introduce vocabulary above the unit's level.   │
│      No B2/C1 distractor may be presented to a 10-year-old pupil.      │
└────────────────────────────────────────────────────────────────────────┘
```

## 2. Multi-Unit Spaced Pooling & Error Bank Replay
- When generating review quizzes, the distractor engine pools POS-matched distractors from *preceding* units (e.g., Unit 4 quizzes pull distractors from Units 1, 2, and 3).
- **Error Bank Spaced Re-Testing**: When a pupil selects an incorrect option, the item is tagged with `in_error_bank: true`. The application prioritizes error-bank items in subsequent review sessions until a 3-streak correct mastery threshold is achieved.

## 3. Formative Scaffolding & Smart Hint Cascade
- **Attempt 1 Incorrect**: Shakes the card softly, displays Hint Tier 1 (Contextual passage clue), and preserves current input.
- **Attempt 2 Incorrect**: Displays Hint Tier 2 (First letter revealed, one incorrect distractor eliminated).
- **Attempt 3 Incorrect**: Reveals verified Teacher's Book answer key accompanied by an encouraging explanatory note in Greek.

---

# PART VI: UI/UX DESIGN SYSTEM & ACCESSIBILITY

## 1. Typography & Readability Architecture
To maximize legibility for 10–11 year-old learners and pupils with reading difficulties:
* **Primary Fonts**: `@font-face` local WOFF2 files loaded via `../assets/fonts/fonts.css`.
  - **`Lexend`**: Primary reading and interactive text font, engineered scientifically to reduce visual stress.
  - **`Outfit`**: Headings, unit badges, and banner display font.
  - **`Inter`**: UI control buttons, table data, and metadata.
* **Typographic Hierarchy**:
  - `h1` (Unit Title): 2.5rem (40px), bold, 1.2 line height.
  - `h2` (Lesson / Section Title): 1.75rem (28px), semi-bold.
  - `p` / `body` (Story & Narrative): 1.125rem (18px), regular, 1.6 line height.
  - Word Bank Chips: 1.0rem (16px), medium, minimum touch target 48px height.

## 2. Color Tokens & Visual Hierarchy
A curated, child-friendly HSL color palette providing vibrant visual scaffolding while maintaining WCAG AAA contrast ratios:

```css
:root {
  /* Brand Primary & Secondary */
  --primary-hue: 212;
  --color-primary: hsl(var(--primary-hue), 85%, 45%);
  --color-primary-light: hsl(var(--primary-hue), 90%, 94%);
  --color-primary-dark: hsl(var(--primary-hue), 85%, 28%);

  /* Accent & Action */
  --color-accent: hsl(38, 95%, 52%);        /* Energetic Amber */
  --color-accent-hover: hsl(38, 95%, 45%);

  /* Pedagogical Feedback */
  --color-success: hsl(145, 68%, 42%);       /* Correct answer green */
  --color-success-bg: hsl(145, 68%, 95%);
  --color-warning: hsl(35, 90%, 50%);        /* Hint tier amber */
  --color-error: hsl(355, 78%, 56%);         /* Formative retry red */
  --color-error-bg: hsl(355, 78%, 96%);

  /* Surface & Scaffolding */
  --bg-app: hsl(210, 20%, 98%);
  --surface-card: hsl(0, 0%, 100%);
  --text-main: hsl(215, 28%, 17%);
  --text-muted: hsl(215, 14%, 46%);
  --border-subtle: hsl(215, 20%, 88%);

  /* Interactive Elements */
  --radius-card: 16px;
  --radius-chip: 24px;
  --shadow-card: 0 4px 16px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

## 3. Cross-Device Responsive Layout Engine

```
┌─────────────────────┬───────────────────────────────────────────────────┐
│ Device / Viewport   │ Architectural Adaptation & Layout Strategy        │
├─────────────────────┼───────────────────────────────────────────────────┤
│ Smartboard / IWB    │ Minimum 64x64px hitboxes; ultra-high contrast;    │
│ (1920x1080 Touch)   │ docked bottom presentation toolbar; teacher key   │
│                     │ master reveal; reading passage spotlight tool.    │
├─────────────────────┼───────────────────────────────────────────────────┤
│ Desktop / Laptop    │ True dual-pane layout: source reading permanently │
│ (1200px - 1920px)   │ visible on left alongside interactive exercises   │
│                     │ on right; keyboard shortcuts (Space, 1-4, Enter). │
├─────────────────────┼───────────────────────────────────────────────────┤
│ Tablet / Chromebook │ Flexible dual-pane or collapsible split; full     │
│ (768px - 1024px)    │ touch-gesture support (tap-to-place chips, swipe  │
│                     │ flashcards); on-screen keyboard friendly viewports│
├─────────────────────┼───────────────────────────────────────────────────┤
│ Smartphone          │ Linear progressive stack; floating audio HUD;     │
│ (360px - 480px)     │ persistent "Read" ↔ "Exercises" view switcher;    │
│                     │ touch-optimized bottom sheets for word definitions│
└─────────────────────┴───────────────────────────────────────────────────┘
```

## 4. Accessibility & Dyslexia Scaffolding Tokens
- **Target Word Regex Highlighting**: When rendering examples in the Vocabulary Table or cards, target words are dynamically highlighted with capture-group regex (`(\\b${first}[a-z]*\\b)`) wrapped in `<span class="example-target-word">$1</span>` to prevent missing inflected plurals or past forms.
- **Activity Icon Scaffolding**: Standardized coursebook SVG badges precede all exercises:
  - `[ICON_LISTEN]`: Headphones with soundwaves.
  - `[ICON_SPEAK]`: Conversational speech balloons.
  - `[ICON_READ]`: Open book with reading glasses.
  - `[ICON_WRITE]`: Pencil drafting on paper.
  - `[ICON_GROUP]`: Three collaborating students.

---

# PART VII: DIRECTORY TOPOLOGY & IMPLEMENTATION ROADMAP

## 1. Repository File & Folder Hierarchy

```
c:/photodentro/antigravity/coursebook_fifth/
├── data/
│   ├── coursebook_catalog.json             # 10-unit master manifest
│   ├── coursebook_catalog.js               # window.COURSEBOOK_CATALOG twin
│   └── 5th_grade_master_cefr.json          # 714 calibrated lemmas
├── assets/
│   ├── fonts/                              # Local WOFF2 files (Lexend, Outfit, Inter)
│   │   └── fonts.css                       # Local @font-face declarations
│   ├── audio/                              # Shared UI chimes & sound effects
│   ├── icons/                              # Standardized coursebook SVG activity badges
│   └── images/                             # Platform branding & mascot graphics
├── photodentro_apps/                       # Official Greek repository embedded applets
│   ├── picture_dictionary_computer_parts_v2.0/
│   └── Present_Simple_and_Present_Continuous_for_younger_children_v2.0 opencode/
├── text/                                   # Source OCR corpus (Pupil, Workbook, Teacher)
│   ├── front_matter/
│   ├── appendix/
│   └── unit01/ ... unit10/
├── unit01/ ... unit10/                     # Self-contained unit directories
│   ├── index.html                          # VOCABULARY COMPANION & AUDIO LAB
│   ├── v2.html                             # COURSEBOOK & WORKBOOK WORKSTATION
│   ├── app.js                              # Vocabulary Station Controller
│   ├── app_v2.js                           # Coursebook & Workbook Controller
│   ├── style.css                           # Vocabulary Station Stylesheet
│   ├── style_v2.css                        # Coursebook & Workbook Stylesheet
│   ├── ERRATA.md                           # Unit-specific text & key reconciliation notes
│   ├── data/
│   │   ├── vocabulary_data.json            # Canonical lexis JSON
│   │   ├── vocabulary_data.js              # window.VOCABULARY_DATA twin
│   │   ├── unitN_v2_data.json              # Stories, landmarks, grammar sandboxes JSON
│   │   ├── unitN_v2_data.js                # window.UNIT_V2_DATA twin
│   │   ├── unitN_workbook_data.json        # Workbook & differentiated tasks JSON
│   │   └── unitN_workbook_data.js          # window.WORKBOOK_DATA twin
│   ├── assets/
│   │   ├── images_v2/                      # Original vector artwork & SVGs
│   │   ├── audio/                          # Google classic audio clips
│   │   ├── audio_neural/                   # Edge neural audio clips
│   │   └── audio_v2/                       # Story reading & dialogue narrations
│   ├── test_vN.js                          # Node regression test harness (200+ checks)
│   └── verify_offline.js                   # Air-gap zero-leakage validator
├── portal.html                             # Master 10-Unit Navigation Dashboard
├── portal.css                              # Portal Stylesheet
├── portal.js                               # Portal State & Progress Controller
├── sync_data_twins.js                      # Automated JSON -> JS synchronization utility
├── check_definitions.py                    # CEFR A1- lexical ceiling validator
└── APP_SPECIFICATION_GRADE5.md             # This single source of truth specification
```

---

## 2. The Six-Phase Unit Engineering Pipeline

Every unit follows an uncompromising 6-phase engineering lifecycle:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      The 6-Phase Unit Pipeline                         │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 1: Textual Ingestion & Errata Auditing                           │
│   • Extract pupil_unitXX, workbook_unitXX, and teacher_unitXX texts.   │
│   • Author unitXX/ERRATA.md resolving printed typos and answer keys.   │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 2: Vocabulary Companion & Lexical Data Twins                     │
│   • Compile vocabulary_data.json from 5th_grade_master_cefr.json.      │
│   • Enforce strictly <= 14-word A1 definitions & IPA phonetic guides.  │
│   • Generate matching vocabulary_data.js twin.                         │
│   • Deploy unitXX/index.html & app.js (Table, Cards, Quizzes, Print).  │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 3: Workbook & Differentiated Appendix Authoring                  │
│   • Digitize Section A (Vocab), Section B (Grammar), Section C (Skills)│
│   • Digitize Differentiated Appendix tasks (* and **).                 │
│   • Reconcile official Teacher's Book keys in unitN_workbook_data.js.  │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 4: Story Dossiers, Landmarks & Inductive Grammar Lab             │
│   • Build 3–4 narrative storyboards starring Kostas, Nadine, and Mark. │
│   • Guarantee 100% lexical ownership (zero orphan vocabulary items).   │
│   • Create original vector SVGs with landmark hotspot coordinates.     │
│   • Implement unit inductive grammar sandbox and deploy unitXX/v2.html.│
├────────────────────────────────────────────────────────────────────────┤
│ Phase 5: Dual-Engine Audio Generation & Sidecars                       │
│   • Generate Classic Google audio in assets/audio/.                    │
│   • Generate Natural Edge Neural audio in assets/audio_neural/.        │
│   • Author 100% verbatim .txt sidecars for every audio clip.           │
│   • Calibrate reading passage karaoke timestamps.                      │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 6: Automated Verification & Air-Gap Testing                      │
│   • Execute test_vN.js (200+ unit assertions must pass).               │
│   • Execute verify_offline.js (zero external URLs or network leaks).   │
│   • Validate in headless browser (zero console errors, audio plays ok).│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Unit-by-Unit Implementation Sprint Schedule

```
┌──────────┬─────────────────────────────────────┬──────────────┬───────────────┐
│ Sprint   │ Scope & Milestones                  │ Deliverables │ Target Status │
├──────────┼─────────────────────────────────────┼──────────────┼───────────────┤
│ Sprint 1 │ Core Infrastructure & Shared Hub    │ portal.*     │ Foundation    │
│          │ Local Typography, Catalog, Assets   │ fonts/, data/│ Complete      │
├──────────┼─────────────────────────────────────┼──────────────┼───────────────┤
│ Sprint 2 │ Unit 1: Internet Friends Around EU  │ Unit 1 Full  │ Flagship V2   │
│          │ Unit 2: School Life & Habits        │ Unit 2 Full  │ Production    │
├──────────┼─────────────────────────────────────┼──────────────┼───────────────┤
│ Sprint 3 │ Unit 3: Places & Directions         │ Unit 3 Full  │ Flagship V2   │
│          │ Unit 4: Christmas Everywhere        │ Unit 4 Full  │ Production    │
├──────────┼─────────────────────────────────────┼──────────────┼───────────────┤
│ Sprint 4 │ Unit 5: Ready for Action (Eco)      │ Unit 5 Full  │ Flagship V2   │
│          │ Unit 6: Good, Better, Best! (Adjs)  │ Unit 6 Full  │ Production    │
├──────────┼─────────────────────────────────────┼──────────────┼───────────────┤
│ Sprint 5 │ Unit 7: Going Back in Time (Past)   │ Unit 7 Full  │ Flagship V2   │
│          │ Unit 8: All About Stories (Tales)   │ Unit 8 Full  │ Production    │
├──────────┼─────────────────────────────────────┼──────────────┼───────────────┤
│ Sprint 6 │ Unit 9: Amazing People & Places     │ Unit 9 Full  │ Flagship V2   │
│          │ Unit 10: Summer is Here! (Reunion)  │ Unit 10 Full │ Production    │
├──────────┼─────────────────────────────────────┼──────────────┼───────────────┤
│ Sprint 7 │ Differentiated Appendix (26 pp)     │ Appendix Hub │ Systemic      │
│          │ Systemic QA, Air-Gap Packaging      │ Offline ZIP  │ Delivery      │
└──────────┴─────────────────────────────────────┴──────────────┴───────────────┘
```

---

## 4. Quality Assurance Contract & Air-Gap Verification

Before any unit is promoted to production or marked complete, it must pass the automated regression suite `node test_vN.js`:

```
========================================================================
5TH GRADE COMPANION REGRESSION SUITE: UNIT XX
========================================================================
[PASS] Lexical Completeness: All headwords have IPA, Greek, A1 Def, and Example.
[PASS] Lexical Ceiling: All definitions strictly <= 14 words; zero B2/C1 terms.
[PASS] Data Twin Parity: vocabulary_data.js byte-identical to vocabulary_data.json.
[PASS] Data Twin Parity: unitN_v2_data.js byte-identical to unitN_v2_data.json.
[PASS] Data Twin Parity: unitN_workbook_data.js matches unitN_workbook_data.json.
[PASS] 100% Lexical Ownership: Every vocabulary item appears in story narratives.
[PASS] Zero Null Pills: All landmark hotspots resolve to active vocabulary items.
[PASS] Audio Sidecar Parity: 100% of MP3 audio files have verbatim .txt sidecars.
[PASS] Distractor Validation: 100% of distractors match target Part-of-Speech.
[PASS] Workbook Accuracy: All exercise targets match Teacher's Book official keys.
[PASS] Differentiated Tasks: One-star (*) and Two-star (**) activities verified.
[PASS] Air-Gap Verification: 0 external fetch/link dependencies found.
[PASS] Headless CDP Run: 0 console errors, 0 unhandled promise rejections.
------------------------------------------------------------------------
Suite Execution Complete: 214 assertions passed, 0 failed.
========================================================================
```

---

## 5. Institutional Value Matrix

| Dimension | Physical Printed Books | Static PDF / Scanned Viewer | Unified 5th Grade Digital Platform |
|---|---|---|---|
| **Portability** | Heavy textbook + workbook + notebook + standalone CD player | Read-only static files requiring external apps | Zero-install, responsive offline client web platform |
| **Formative Feedback**| Delayed by days until teacher grades in class | None (passive reading) | Instant, step-by-step smart hint cascade & retry |
| **Audio Integration** | Inaccessible without CD player or lost discs | Missing, detached, or broken external links | In-situ dual-engine audio with sentence karaoke sync |
| **Differentiation** | Rigid, one-size-fits-all printed worksheets | Passive zoom | Dynamic `*` and `**` routing, 0.8x-1.2x audio speeds |
| **Self-Assessment** | Manual tick-boxes with no verification | Static forms | Interactive auto-checked Can-Do radar & error bank |
| **IWB Utility** | Inconvenient page-turning under visualizers | Awkward scrolling, tiny hitboxes | Presentation mode, 64px hitboxes, answer key reveal |
| **National Heritage** | Static text mentions | None | Embedded Photodentro OER national applets |

---

*Document Author: Antigravity Advanced Agentic Engineering Team*  
*Curricular Authority: Greek Ministry of Education & Religious Affairs (DEPPS-APS / ITYE Diophantus)*  
*Platform Repository: `C:\photodentro\antigravity\coursebook_fifth`*
