---
name: distractor-rules
description: Pedagogical rules and best practices for selecting and generating distractors for vocabulary and grammar quizzes in Greek Primary School English.
---

# Distractor Generation and Selection Skill

This skill defines the pedagogical standards for creating multiple-choice distractors in educational apps and quizzes, specifically targeting CEFR A1/A1+ (5th Grade) and CEFR A2/A2+ (6th Grade) English learners.

When generating, reviewing, or writing quiz engines and datasets, you MUST apply these principles to ensure high diagnostic value.

## 1. Strict Part-of-Speech (POS) Matching (MANDATORY)
Never mix parts of speech in a multiple-choice question unless explicitly testing grammatical identification.
- **Verbs** must be distracted by **verbs**.
- **Nouns** must be distracted by **nouns**.
- **Adjectives** must be distracted by **adjectives**.
- **Proper Nouns / Countries** must be distracted by **Proper Nouns / Countries**.

## 2. Semantic Field Consistency (MANDATORY)
Distractors should belong to the same semantic category/field as the target word.
- **Target:** `computer` (Computer Hardware) -> Distractors: `printer`, `keyboard`, `screen`
- **Target:** `British` (Nationalities) -> Distractors: `French`, `Spanish`, `German`
- **Target:** `rose` (Symbols & Nature) -> Distractors: `daffodil`, `thistle`, `shamrock`

## 3. Curricular & Multi-Unit Pooling
When in-category words of the same POS are limited, pull POS-matched distractors from adjacent categories in the unit, previous units, or the calibrated 5th Grade CEFR database (`5th grade_coursebook_cefr.json`).

## 4. Avoid "Giveaways"
- Maintain balanced option lengths.
- Avoid obvious Greek cognates unless testing false friends.
- No emojis, labels, or formatting giveaways in the choices.

## 5. Tripartite Distractor Architecture
Maintain three calibrated distractor arrays per item:
1. `distractors_greek`: 3 Greek translation strings
2. `distractors_def`: 3 English definition strings
3. `distractors_word`: 3 English word strings
