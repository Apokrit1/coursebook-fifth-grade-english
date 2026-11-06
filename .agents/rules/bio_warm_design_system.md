---
name: bio-warm-design-system
description: Design system rules, Two-Track visual guidelines, compact header constraints, and offline-first runtime invariants for Greek 5th Grade English Coursebook applets.
---

# Bio-Warm 2026 Graphic Novel & Offline Applet Standards

When authoring, modernizing, or modifying Coursebook and Companion applets (Hub, Units 1–10, Portal), you MUST enforce the following constraints:

## 1. Two-Track Visual Contract (Zero Crude SVGs)
- **Forbidden**: Never use flat geometric vector SVGs, stick-figure drawings, or programmatic CSS boxes as story art, hero banners, or vocabulary plates.
- **Track A (Graphic Novel Scenes & Story Dossiers)**:
  - Middle-grade graphic novel aesthetic (ages 10–11): warm ink line art, cel-shading, Bio-Warm 2026 palette (`#FF6B47` Coral, `#FFF8E8` Cream, `#0F172A` Ink, `#FFC800` Gold, `#B6E528` Lime).
  - **Strict No-Text Rule**: Generated images must contain ZERO text, speech bubbles, sound effects, or garbled letters.
  - Byte budget: Covers & Hero < 150 KB (JPG), Story Dossiers < 90 KB (WebP), Vocabulary items < 50 KB (WebP).
- **Track B (Documentary Realia & Cartography)**:
  - When units reference real-world geography, international customs, or authentic athletic programs, use authentic CC-licensed documentary photography and relief cartography (e.g. Ordnance Survey, Wikimedia Commons CC), optimized to WebP.

## 2. Compact Single-Screen Header (< 160px)
- Classroom netbooks and laptops (1366×768) require maximum vertical viewport for reading.
- **`position: relative !important`**: Headers must NOT be sticky. They scroll naturally with the page (`top: auto !important`).
- Total header height must stay under ~160px:
  - Row 1: Compact breadcrumb pills + edition switcher buttons.
  - Row 2: Unit title and subtitle inline on the same baseline.
  - Row 3: Single-line tab bar (`#moduleTabs` or `#viewModes`).
- Never allow multi-row stacked banners to consume more than 20% of the initial screen fold.

## 3. Hub Grid Layout & The Fold Spine Invariant
- In 3-column `.unit-split` cards (`0.85fr auto 1.15fr`), the central spine `<div class="unit-fold"><span class="fold-mark"></span></div>` is **mandatory**.
- Never omit `.unit-fold`; doing so causes `.v2-side` to be placed into the auto-width middle column, squeezing `.v1-side` into an unreadable 40px strip.

## 4. Safe Audio Lifecycle & Teardown
- Avoid audio playback exceptions and memory leaks in offline browsers.
- When stopping or switching audio tracks, always detach handlers before altering the source:
  ```javascript
  if (currentAudio) {
    currentAudio.onended = null;
    currentAudio.onerror = null;
    currentAudio.pause();
    currentAudio.removeAttribute('src');
    currentAudio.load();
    currentAudio = null;
  }
  ```

## 5. Bidirectional Navigation & Routing
- Every modern Comic view must offer a prominent `🏛️ Standard View` or `🏛️ Standard Companion` link back to the classic edition.
- Every classic view must offer a prominent `🎨 Comic Edition` or `🎨 Comic Companion` link to the modern graphic novel edition.
- Root `index.html` routes to `warm_comic_modern/index.html` while preserving an archive link to `portal.html`.

## 6. 100% Offline-First & Data Twin Invariant
- Zero external HTTP/HTTPS CDN links in HTML, CSS, or JS (fonts, icons, stylesheets, audio, images).
- All fonts must be loaded from local WOFF2 files (`fonts/fonts.css`).
- Every data file must exist as both a `.json` file and a `.js` twin (`window.UNIT{N}_V2_DATA`, `window.VOCABULARY_DATA`, `window.UNIT{N}_WORKBOOK_DATA`) to support local execution under `file:///` without CORS blocks. Semantic parity between `.json` and `.js` is required.

