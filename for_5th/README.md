# Migration & Reuse Guide: Bringing Modern Bio-Warm & Retro-Comic Styling to 5th Grade

This folder (`for_5th`) contains the complete reusable foundation from the 6th grade modernized edition (`vocabulary-st-modern`).

---

## 📁 Folder Structure & Reusable Assets

### 1. `core_design_system/` (Design Tokens & Typography)
- **`bio_warm_style.css`**: The core Bio-Warm 2026 design token system:
  - Palette: Coral (`#FF6B47`), Lime (`#B6E528`), Gold (`#FFC800`), Warm Cream (`#FFF8E8`), Deep Ink (`#0F172A`).
  - Tactile physical UI: `3px` solid ink borders, `box-shadow: 0 4px 0 0 #0F172A` hard offset drop shadows.
  - Reset, ambient floating SVG glyph animations, and responsive rules.
- **`spec.md`**: Complete design specification document outlining font sizes, contrast ratios, and component specifications.
- **`fonts/`**: Google webfont bundle (`Outfit`, `Plus Jakarta Sans`, `JetBrains Mono`) for full offline classroom capability.

### 2. `hub_templates/` (Grade 5 Curriculum Hub)
- **`modern_hub_template.html`**: The Grade-level master catalog.
  - Split-card layout for each unit (Coursebook lesson on the left, Vocabulary Companion on the right).
  - Term filters (Term 1, Term 2, Term 3).
  - Comic-style hero banner and two-track visual pedagogy explainer.
- **`modern_hub_script.js`**: Interactive filter chip logic, scroll-in reveal observers, and image fallbacks.

### 3. `unit_comic_engine/` (Unit-Level Coursebook & Companion)
- **`unit_comic_theme.css`**: The drop-in stylesheet that transforms standard coursebook modules into the comic style:
  - Photo frame treatments with attribution captions.
  - Speech bubble dialogue styles and comic panel strips.
  - Tactile buttons (`:active` press animation with `translateY(2px)`).
  - Vocabulary card styling with color-coded category badges.
- **`coursebook_template.html`**: Complete interactive coursebook shell with tabs for:
  - Story / Reading Dossiers
  - Grammar Lab (Listening task + Comic misadventures)
  - Collocations & Clues
  - Project / Report Builder
  - Challenge Arena
  - Printable Worksheets
  - Interactive Workbook
- **`companion_template.html`**: Complete bilingual vocabulary companion shell:
  - 6 view modes: Word Table, Visual Flashcards, Listening Challenge, Definition Challenge, Printable Study Sheet, and TTS Script Export.
- **`app_coursebook_template.js` & `app_companion_template.js`**:
  - Contains the `resolveAsset(path)` helper logic to seamlessly load 5th grade data without path conflicts or asset duplication.
  - Dual audio playback handling (Neural Voice + Classic fallback).

### 4. `tools_and_tests/` (Automated Verification)
- **`test_modern_unit_template.js`**: Automated test suite template verifying DOM elements, asset resolution without 404s, and stylesheet cascade order.
- **`refactor_tone_template.py`**: Automated script template for replacing self-referential or promotional text with professional pedagogical language.

---

## ⚡ What You Can Reuse Immediately vs. What Needs 5th-Grade Content

| Component | Direct Reuse (Copy As-Is) | Adapt for 5th Grade |
| :--- | :---: | :--- |
| **Color Tokens & CSS** | ✅ 100% | None needed. |
| **Fonts & SVG Glyphs** | ✅ 100% | None needed. |
| **Companion Shell & 6 View Modes** | ✅ 100% | Plugs into 5th grade `vocabulary_data.json`. |
| **Coursebook Tab System & HUD** | ✅ 100% | Just update unit title & story names. |
| **Story & Dossier Logic** | ✅ 90% | Replace texts/photos with 5th Grade Unit topics. |
| **Grammar Lab Structure** | ✅ 85% | Replace targets (e.g. Present Simple vs. Continuous with 5th Grade grammar). |
| **Interactive Workbook Engine** | ✅ 95% | Plugs into 5th grade `unitX_workbook_data.json`. |

---

## 🚀 Quick Step-by-Step Migration into `coursebook_fifth`

1. In `coursebook_fifth`, create a folder named `vocabulary-e-modern/` (or `modern/`).
2. Copy `for_5th/core_design_system/bio_warm_style.css` and `for_5th/core_design_system/fonts/`.
3. Copy `for_5th/hub_templates/modern_hub_template.html` to `vocabulary-e-modern/index.html` and change:
   - "English 6th Grade (ΣΤ΄ Δημοτικού)" ➔ "English 5th Grade (Ε΄ Δημοτικού)".
   - Unit cards to match 5th grade curriculum (Units 1–10).
4. For Unit 1:
   - Create `vocabulary-e-modern/unit1/`.
   - Copy `for_5th/unit_comic_engine/unit_comic_theme.css`.
   - Use `coursebook_template.html` and `companion_template.html`, linking them to your existing `coursebook_fifth/unit1/data/` files.

