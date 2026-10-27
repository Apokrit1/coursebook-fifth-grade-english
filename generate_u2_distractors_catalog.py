import json

with open('unit2/data/vocabulary_data.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

md = []
md.append('# English 5th Grade (Ε΄ Δημοτικού) — Unit 2 Lexical Distractor Catalog\n')
md.append('> **Unit 2: "School Life & The World Around Us"**  ')
md.append(f'> **{len(items)} Calibrated Lexical Items • CEFR A1-/A1 Level • Tripartite Distractor Matrix**\n')
md.append('---\n')
md.append('## 1. Distractor Pedagogical Architecture & Principles\n')
md.append('All distractors in this dataset are generated strictly following the **Distractor Rules Skill** (`.agents/rules/distractor.md`):\n')
md.append('1. **Strict Part-of-Speech (POS) Homogeneity (MANDATORY)**: Nouns compete against nouns, adjectives against adjectives, adverbs against adverbs, verbs against verbs.')
md.append('2. **Semantic Field Consistency (MANDATORY)**: School lexis competes with school lexis; feelings compete with feelings; foods with foods; frequency adverbs with frequency adverbs.')
md.append('3. **Curricular & Multi-Unit Pooling**: Distractors drawn from official CEFR A1- 5th Grade lexis.')
md.append('4. **Zero-Giveaway Guarantee**: Balanced option lengths, no Greek cognate leaks, and no visual or emoji giveaways in quiz buttons.\n')
md.append('---\n')

# Categories
cats = {}
for it in items:
    cats.setdefault(it['category'], []).append(it)

md.append('## 2. Category Summary\n')
md.append('| Category | Item Count | Parts of Speech | Pedagogical Focus |')
md.append('| :--- | :---: | :--- | :--- |')
for c, its in cats.items():
    pos_set = sorted(list(set(it['pos'] for it in its)))
    md.append(f"| **{c}** | {len(its)} | {', '.join(pos_set)} | Curriculum Lesson Lexis |")
md.append('\n---\n')

md.append('## 3. Master Item Inventory & Calibrated Distractor Matrix\n')
for c, its in cats.items():
    md.append(f'### 📂 {c}\n')
    for it in its:
        md.append(f"#### Item #{it['id']}: **{it['word']}** `{it['ipa']}` {it['pos']} {it['emoji']}")
        md.append(f"- **Greek Meaning**: {it['meaning_gr']}")
        md.append(f"- **CEFR A1 Definition** ({len(it['definition_en'].split())} words): *\"{it['definition_en']}\"*")
        md.append(f"- **Contextual Example**: *\"{it['example']}\"*")
        md.append('- **Calibrated Distractor Options**:')
        md.append(f"  - **Word Options**: `{it['word']}` | `{'` | `'.join(it['distractors_word'])}`")
        md.append(f"  - **Greek Meaning Options**: {it['meaning_gr']} | {' | '.join(it['distractors_greek'])}")
        md.append(f"  - **Definition Options**:")
        md.append(f"    1. (Target) *\"{it['definition_en']}\"*")
        for i, d in enumerate(it['distractors_def'], 2):
            md.append(f"    {i}. *\"{d}\"*")
        md.append('')

with open('unit2/DISTRACTORS_CATALOG.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md) + '\n')

print(f"Generated unit2/DISTRACTORS_CATALOG.md ({len(items)} items)")
