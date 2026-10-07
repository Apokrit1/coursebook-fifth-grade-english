---
name: distractor
description: Pedagogical rules and best practices for selecting and generating distractors for vocabulary and grammar quizzes in Greek Primary School English (5th & 6th Grade).
---

# Distractor Generation and Selection Skill

This skill defines the pedagogical standards for creating multiple-choice distractors in educational apps and quizzes, specifically targeting CEFR A1/A1+ (5th Grade) and CEFR A2/A2+ (6th Grade) English learners.

When generating, reviewing, or writing quiz engines and data, you MUST apply these principles to ensure high diagnostic value.

## 1. Strict Part-of-Speech (POS) Matching (MANDATORY)
Never mix parts of speech in a multiple-choice question unless explicitly testing grammatical identification.
- **Verbs** must be distracted by **verbs**.
- **Nouns** must be distracted by **nouns**.
- **Adjectives** must be distracted by **adjectives**.
- **Proper Nouns / Countries** must be distracted by **Proper Nouns / Countries**.
*Why?* If a sentence gap or definition requires a noun, providing adjective distractors allows the student to bypass lexical knowledge and use simple elimination to guess the answer.

## 2. Semantic Field Consistency (MANDATORY)
Distractors should belong to the same semantic category/field as the target word.
- **Target:** `computer` (Computer Hardware)
  - **Good Distractors:** `printer`, `keyboard`, `screen`
  - **Bad Distractors:** `rose`, `spain`, `prefer` (Unrelated semantics)
- **Target:** `British` (Nationalities & Languages)
  - **Good Distractors:** `French`, `Spanish`, `German`
  - **Bad Distractors:** `mouse`, `homework`, `hate`
*Why?* Forcing a choice between semantically related words requires higher-order cognitive processing and deeper lexical retrieval.

## 3. Curricular & Multi-Unit Pooling
When in-category words of the same POS are limited (e.g. only 1 or 2 items in that category), pull POS-matched distractors from:
1. Adjacent categories in the same unit.
2. Previous units in the coursebook.
3. The official CEFR 5th Grade Lexical Database (`5th grade_coursebook_cefr.json` & `grade5_distractor_candidates.json`).
This enforces spaced repetition without introducing unfamiliar vocabulary.

## 4. Avoid "Giveaways"
- Do not use distractors that differ significantly in character length from the target.
- Do not use distractors with obvious Greek cognates unless testing false friends.
- Do not include emojis, formatting, or capitalization in distractors that hint at the answer.
- All 4 options (1 Target + 3 Distractors) must display identical styling (e.g. Greek text only for Greek quiz, English definition only for Definition quiz).

## 5. Tripartite Distractor Architecture
For each lexical item, maintain three calibrated distractor arrays:
1. `distractors_greek`: 3 Greek translation strings (for listening-to-Greek matching).
2. `distractors_def`: 3 English definition strings (for listening-to-definition matching).
3. `distractors_word`: 3 English word strings (for gap-fill and spelling challenges).

## Implementation in Applet Engines
Ensure quiz selection functions (`chooseQuestion`, `chooseVocabQuestion`) either:
- Directly utilize pre-calibrated `item.distractors_greek` / `item.distractors_def`, OR
- Dynamically filter the vocabulary pool by matching POS (`item.pos === target.pos`) and semantic category (`item.category === target.category`), with fallback to matching POS.
