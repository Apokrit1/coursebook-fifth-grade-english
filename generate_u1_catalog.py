import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('unit1/data/vocabulary_data.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

md = []
md.append('# English 5th Grade (Ε΄ Δημοτικού) — Unit 1 Lexical Distractor Catalog')
md.append('')
md.append('> **Unit 1: "Our Multicultural Class & Computer World"**')
md.append('> **62 Calibrated Lexical Items • CEFR A1-/A1 Level • Tripartite Distractor Matrix**')
md.append('')
md.append('---')
md.append('')
md.append('## 1. Distractor Pedagogical Architecture & Principles')
md.append('')
md.append('All distractors in this dataset are generated strictly following the **Distractor Rules Skill** (`.agents/rules/distractor.md`):')
md.append('')
md.append('1. **Strict Part-of-Speech (POS) Homogeneity (MANDATORY)**:')
md.append('   - Noun targets are distracted *exclusively* by nouns.')
md.append('   - Verb targets are distracted *exclusively* by verbs.')
md.append('   - Adjective targets (such as nationalities) are distracted *exclusively* by adjectives.')
md.append('   - Proper noun countries are distracted *exclusively* by proper noun countries.')
md.append('   - Phrases are distracted *exclusively* by verb/noun phrases.')
md.append('   *Diagnostic Value*: Prevents learners from bypassing vocabulary retrieval using grammatical category deduction.')
md.append('')
md.append('2. **Semantic Field Consistency (MANDATORY)**:')
md.append('   - Hardware words (`mouse`, `screen`) compete against fellow hardware devices.')
md.append('   - Nationalities (`British`, `French`) compete against other European nationalities.')
md.append('   - National flowers (`rose`, `daffodil`, `thistle`, `shamrock`) compete against fellow British Isles emblems.')
md.append('   *Cognitive Load*: Requires precise semantic discrimination rather than superficial recognition.')
md.append('')
md.append('3. **Curricular & Multi-Unit Pooling**:')
md.append('   - Fallback items (e.g. for isolated verbs or phrases) are drawn from adjacent categories or the CEFR 5th Grade curriculum lexical database.')
md.append('')
md.append('4. **Zero-Giveaway Guarantee**:')
md.append('   - Balanced option lengths, no Greek cognate leaks, and no visual or emoji giveaways in quiz buttons.')
md.append('')
md.append('---')
md.append('')
md.append('## 2. Category Summary')
md.append('')
md.append('| Category | Item Count | Parts of Speech | Pedagogical Focus |')
md.append('| :--- | :---: | :--- | :--- |')
md.append('| **Computer Hardware** | 10 | (n), (n pl) | Physical computer peripherals and components |')
md.append('| **Internet & Online Life** | 9 | (n), (v), (adj/adv), (phrase) | Communication, browsing, and digital literacy |')
md.append('| **Free Time & Hobbies** | 11 | (n), (v) | Leisure activities, preferences, and sports |')
md.append('| **School & Learning** | 6 | (n), (v) | Classroom life, study habits, and education |')
md.append('| **Countries & Geography** | 12 | (n), (v), (n prop) | European countries and geographical terms |')
md.append('| **Nationalities & Languages** | 8 | (adj) | European nationalities and languages |')
md.append('| **Symbols & Nature** | 6 | (n), (phrase) | National symbols & United Kingdom floral emblems |')
md.append('')
md.append('---')
md.append('')
md.append('## 3. Master Item Inventory & Calibrated Distractor Matrix')
md.append('')

current_cat = None
for item in items:
    if item['category'] != current_cat:
        current_cat = item['category']
        md.append(f'### 📂 {current_cat}')
        md.append('')

    md.append(f"#### #{item['id']} **{item['word']}** `{item['pos']}`")
    md.append(f"- **Greek Meaning (Target)**: **{item['meaning_gr']}**")
    md.append(f"- **English Definition (Target)**: *\"{item['definition_en']}\"*")
    md.append(f"- **Context Example**: *\"{item['example']}\"*")
    md.append(f"- **Part of Speech**: `{item['pos']}` {item.get('der', '')}")
    md.append('- **Calibrated Quiz Distractors (3 Options)**:')
    
    # Words
    w_dist = item.get('distractors_word', [])
    md.append(f"  - **Word Challenge (`gapfill` / spelling)**: `{'`, `'.join(w_dist)}`")
    
    # Greek
    gr_dist = item.get('distractors_greek', [])
    md.append(f"  - **Greek Challenge (`#viewQuiz` / listening-to-meaning)**:")
    for d in gr_dist:
        md.append(f"    - ❌ *{d}*")
        
    # Def
    def_dist = item.get('distractors_def', [])
    md.append(f"  - **Definition Challenge (`#viewDefQuiz` / listening-to-definition)**:")
    for d in def_dist:
        md.append(f"    - ❌ *\"{d}\"*")
        
    md.append('')

output_path = 'unit1/DISTRACTORS_CATALOG.md'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print(f"Successfully generated {output_path} with {len(items)} items!")
