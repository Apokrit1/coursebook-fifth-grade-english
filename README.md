# English 5th Grade (Ε΄ Δημοτικού) — Digital Coursebook & Companion Platform

> **Modern, offline-first digital coursebook and interactive companion for Greek Primary School 5th Grade English (*Αγγλικά Ε΄ Δημοτικού* by E. Kolovou and A. Kraniotou).**

[![Curriculum](https://img.shields.io/badge/Curriculum-Greek%20Ministry%20of%20Education%20(ITYE%20Diophantus)-blue.svg)](#)
[![CEFR Level](https://img.shields.io/badge/CEFR-A1%E2%80%93%20to%20A1-green.svg)](#)
[![Architecture](https://img.shields.io/badge/Architecture-Offline--First%20%7C%20Zero--Backend%20%7C%20GDPR--Compliant-orange.svg)](#)

---

## 📖 Overview

This repository houses the complete unified interactive coursebook platform, digital companions, and pedagogical data for **English 5th Grade** in Greek primary schools.

- **Target Learners**: 10–11 year-old Greek Primary School EFL Pupils, School Teachers & Private Tutors
- **Target Curriculum**: Greek Ministry of Education & Religious Affairs (*ΥΠΑΙΘΑ*) / ITYE "Diophantus"
- **CEFR Calibrated Level**: CEFR A1- to A1 (Beginner to Low Basic User)
- **Pedagogical Alignment**: Cambridge Young Learners (Movers/Flyers), Oxford 3000/5000 lexical calibration, Photodentro Open Educational Resources (OER).

---

## 🚀 Key Features

1. **Unified Hub & Portal (`portal.html`)**
   - High-fidelity portal for navigating across all 10 curriculum units, review units, and specialized appendices.
   - Quick launch for vocabulary companions, interactive coursebook units, and digital activities.

2. **Dual-Engine Interactive Unit Companions**
   - **Vocabulary Companion (`unitXX/index.html`)**: Rich flashcards, audio pronunciation, Greek translations, CEFR metadata, contextual examples, and interactive quizzes.
   - **Coursebook & Workbook Companion (`unitXX/v2.html`)**: Complete interactive digital recreation of pupil book and workbook tasks with inline auto-checking, hint systems, and media players.

3. **Audio-Enabled Learning**
   - Offline-capable neural speech synthesis assets and verbatim audio sidecars.
   - Read-along highlighting and playback speed calibration (0.8x / 1.0x / 1.2x).

4. **100% Offline-First & Privacy Preserving**
   - Zero-backend client architecture: runs directly in any modern browser without servers or tracking.
   - Fully GDPR-compliant with student workspace states preserved via local storage / IndexedDB.

---

## 📂 Repository Structure

```text
├── index.html                   # Automatic root redirection to the portal
├── portal.html                  # Main Unified Coursebook Hub
├── portal.css                   # Portal design system & UI styles
├── portal.js                    # Portal navigation & unit registry logic
├── APP_SPECIFICATION_GRADE5.md  # Comprehensive architectural & functional specification
│
├── unit1/                       # Unit 1 Interactive Digital Companion
│   ├── index.html               # Vocabulary flashcards & quiz engine
│   ├── v2.html                  # Interactive student book & workbook
│   ├── app.js                   # Application state & exercise controller
│   ├── style.css / style_v2.css # Theming and responsive layout
│   ├── assets/                  # High-quality audio (words, defs, neural) & SVGs
│   └── data/                    # Unit JSON data & transcripts
│
├── photodentro_apps/            # Curated Photodentro OER laboratory interactives
├── data/                        # Curriculum and pedagogical datasets
├── split/                       # Curriculum PDFs and asset splits
├── text/                        # High-resolution text extractions and bounding boxes
└── 5th grade_coursebook_cefr.json # Master CEFR lexical database (714 calibrated lemmas)
```

---

## 💻 Running Locally

Simply serve the root directory with any static HTTP server or open `index.html` / `portal.html` in your browser:

### Using Python:
```bash
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000).

### Using Node.js (serve / npx):
```bash
npx serve .
```

---

## 📜 Curriculum Credits & Copyright Notice

- Coursebook text & educational content based on the official Greek primary curriculum textbook *Αγγλικά Ε΄ Δημοτικού* (E. Kolovou, A. Kraniotou), published by ITYE "Diophantus" under the Greek Ministry of Education and Religious Affairs.
- Developed for educational, non-profit classroom and autonomous home learning support.
