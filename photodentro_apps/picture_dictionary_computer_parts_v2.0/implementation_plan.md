# Modern Gamified Cyber-Kids Computer Parts Vocabulary App

Transform the Articulate Storyline picture dictionary into an easy-to-deploy, modern, gamified interactive web application with a **Tech / Cyber Kids aesthetic** (sleek neon glow, sci-fi computer lab theme, particle grid, sound effects), featuring all **14 vocabulary items**, the authentic **human pronunciation MP3 recordings**, and **regenerated 3D/stylized illustrations**.

## Key Features & Modes

1. **Cyber Lab Explorer (Interactive Picture Dictionary)**
   - Futuristic cyber-station where learners can explore all 14 computer parts.
   - Click to hear crystal-clear authentic human pronunciation (`.mp3`).
   - Displays clear English spelling, phonetic pronunciation guide, Greek educational translation, and quick hardware function facts.
   - Search and category filters (Input, Output, Storage, Accessories).

2. **Listen & Tap (Audio Hunt Challenge)**
   - The app plays a random authentic recording (e.g. "keyboard", "scanner", "headphones").
   - Student must identify and click the matching holographic computer part card.
   - Dynamic streak counter, score multipliers, and instant audio-visual feedback.

3. **Word Matrix (Spelling Bee / Scramble)**
   - Audio prompt plays the authentic pronunciation.
   - Interactive glowing letter chips that learners arrange in order to spell the word.
   - Letter-by-letter hint system and audio replay.

4. **Neural Memory Match (Card Flip Game)**
   - Sci-fi holographic card flip matching game.
   - Match Picture + Pronounced Word Audio.
   - Tracks moves, timer, and high scores.

5. **Gamification & Progress System**
   - **Cyber Rank Progression**: From "Novice Hacker" to "Cyber Architect".
   - **XP, Streaks & Accolades**: Earn badges (e.g., "Sharp Ears", "Spell Caster", "Memory Matrix Master").
   - **Web Audio Sound Effects**: Sci-fi UI clicks, success chimes, level-up fanfares combined with the original voice audio files.
   - **100% Offline / Easy Deploy**: Works straight out of the box by double clicking `index.html` or dropping into any web server/LMS.

---

## Vocabulary & Audio Mapping

All 14 items matched to the project's existing audio assets:

| # | Vocabulary Item | Greek Translation | Audio Source File |
|---|---|---|---|
| 1 | **Tower** | Κεντρική Μονάδα / Πύργος | `story_content/5feOKpDaoHm_22050_48_0.mp3` |
| 2 | **Screen** | Οθόνη | `story_content/6MorzrFgnh2_22050_48_0.mp3` |
| 3 | **Keyboard** | Πληκτρολόγιο | `story_content/6TC52fcHbXl_22050_48_0.mp3` |
| 4 | **Mouse** | Ποντίκι | `story_content/6Cqq2Hv3D0Z_22050_48_0.mp3` |
| 5 | **Mouse pad** | Επιφάνεια Ποντικιού | `story_content/61b8iaBQB6U_22050_48_0.mp3` |
| 6 | **Speaker** | Ηχείο | `story_content/6hs1TMo0hOv_22050_48_0.mp3` |
| 7 | **Camera** | Κάμερα (Webcam) | `story_content/6FQ8NnUTJVp_22050_48_0.mp3` |
| 8 | **Microphone** | Μικρόφωνο | `story_content/5b4oBfFeOU9_22050_48_0.mp3` |
| 9 | **Headset** | Σετ Ακουστικών με Μικρόφωνο | `story_content/5mOGO1aVTMV_22050_48_0.mp3` |
| 10 | **Scanner** | Σαρωτής | `story_content/5ngEzpStQf9_22050_48_0.mp3` |
| 11 | **Printer** | Εκτυπωτής | `story_content/61MFEolQFwT_22050_48_0.mp3` |
| 12 | **Headphones** | Ακουστικά | `story_content/64m6IRHVkFb_22050_48_0.mp3` |
| 13 | **CD** | Οπτικός Δίσκος (CD) | `story_content/5wEj3oTOVSp_22050_48_0.mp3` |
| 14 | **USB stick** | Μνήμη USB (Flash drive) | `story_content/5xcmVPXlzS2_22050_48_0.mp3` |
| Extra | **Welcome / Title Audio** | Εισαγωγή | `story_content/6GniNyvnfAi_22050_48_0.mp3` & `story_content/6XMZWLSQXV9_22050_48_0.mp3` |

---

## Proposed Changes

### 1. Asset Generation
Generate 14 cohesive, vibrant 3D stylized / isometric cyber-station illustrations with transparent or dark-tech backgrounds for all computer components:
- `assets/images/tower.png`
- `assets/images/screen.png`
- `assets/images/keyboard.png`
- `assets/images/mouse.png`
- `assets/images/mousepad.png`
- `assets/images/speaker.png`
- `assets/images/camera.png`
- `assets/images/microphone.png`
- `assets/images/headset.png`
- `assets/images/scanner.png`
- `assets/images/printer.png`
- `assets/images/headphones.png`
- `assets/images/cd.png`
- `assets/images/usbstick.png`
- Plus hero / background cyber lab illustrations if needed.

### 2. Core Application Files
- [NEW] [cyber_dictionary.html](file:///c:/photodentro/picture_dictionary_computer_parts_v2.0/cyber_dictionary.html): Self-contained or cleanly structured main entry point featuring the complete Cyber-Kids vocabulary app.
- [NEW] [assets/css/cyber_style.css](file:///c:/photodentro/picture_dictionary_computer_parts_v2.0/assets/css/cyber_style.css): Cyber neon theme, glassmorphism, responsive grid, micro-animations, glowing HUD controls.
- [NEW] [assets/js/vocabulary_data.js](file:///c:/photodentro/picture_dictionary_computer_parts_v2.0/assets/js/vocabulary_data.js): Clean data model linking words, phonetic spellings, Greek descriptions, categories, audio paths, and visual assets.
- [NEW] [assets/js/audio_engine.js](file:///c:/photodentro/picture_dictionary_computer_parts_v2.0/assets/js/audio_engine.js): Handles human voice playback and synthesized sci-fi sound effects (chimes, clicks, fanfare).
- [NEW] [assets/js/app.js](file:///c:/photodentro/picture_dictionary_computer_parts_v2.0/assets/js/app.js): Game state management, 4 activity modes, streak/score counter, badges, modal info dialogs.
- [MODIFY] [index.html](file:///c:/photodentro/picture_dictionary_computer_parts_v2.0/index.html): Update the default launcher to present the modern Cyber-Kids app as the default experience, while retaining a toggle to launch legacy Storyline if desired.

---

## Verification Plan

### Browser & Functionality Testing
1. Launch local dev server or load HTML directly in browser subagent.
2. Verify all 14 audio recordings play cleanly upon click or in quiz modes.
3. Test all 4 interactive modes:
   - Explorer: Check filters, search, modal details, and pronunciation playback.
   - Listen & Tap: Confirm audio prompt plays, correct card selection rewards XP, incorrect option deducts health/streak.
   - Word Matrix / Spelling: Verify letter arrangement, feedback, and sound.
   - Memory Match: Verify card flipping, pair matching, sound cues, and win condition.
4. Test responsiveness across desktop, tablet, and mobile dimensions.
5. Confirm zero console errors and fast asset loading.
