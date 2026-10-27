import json
import os
import re

print("=== STARTING UNIT 2 ADVERSARIAL & EDGE-CASE TEST SUITE ===")
failures = []
checks = 0

def assert_test(cond, msg):
    global checks
    checks += 1
    if cond:
        print(f"[PASS] {msg}")
    else:
        print(f"[FAIL] {msg}")
        failures.append(msg)

# 1. Load Datasets
vocab_path = 'unit2/data/vocabulary_data.json'
v2_path = 'unit2/data/unit2_v2_data.json'
wb_path = 'unit2/data/unit2_workbook_data.json'

with open(vocab_path, 'r', encoding='utf-8') as f:
    vocab = json.load(f)
with open(v2_path, 'r', encoding='utf-8') as f:
    v2 = json.load(f)
with open(wb_path, 'r', encoding='utf-8') as f:
    wb = json.load(f)

# Edge Case 1: Null Pill & Landmark Robustness
print("\n--- Edge Case 1: Null Pill Rule & Landmark Robustness ---")
for story in v2.get('stories', []):
    for lm in story.get('landmarks', []):
        w_key = lm.get('word_key')
        w_id = lm.get('word_id')
        if w_key is None:
            assert_test(w_id is None, f"Null Pill Rule: when word_key is null, word_id must be null ({lm['name']})")
        else:
            match = [v for v in vocab if v['word'].lower() == w_key.lower()]
            assert_test(len(match) == 1, f"Landmark '{lm['name']}' resolves uniquely to target word '{w_key}'")

# Edge Case 2: Distractor Distinctness & No Degenerate Options
print("\n--- Edge Case 2: Distractor Non-Degeneracy & Uniqueness ---")
for it in vocab:
    w = it['word']
    dw = it.get('distractors_word', [])
    assert_test(len(dw) == 3, f"Item #{it['id']} ({w}) has exactly 3 word distractors")
    assert_test(len(set(dw)) == 3, f"Item #{it['id']} ({w}) word distractors are mutually unique")
    assert_test(w not in dw, f"Item #{it['id']} ({w}) target word is NOT in word distractors")

    mgr = it['meaning_gr']
    dgr = it.get('distractors_greek', [])
    assert_test(len(dgr) == 3, f"Item #{it['id']} ({w}) has exactly 3 Greek distractors")
    assert_test(len(set(dgr)) == 3, f"Item #{it['id']} ({w}) Greek distractors are mutually unique")
    assert_test(mgr not in dgr, f"Item #{it['id']} ({w}) target Greek meaning is NOT in Greek distractors")

    den = it['definition_en']
    dde = it.get('distractors_def', [])
    assert_test(len(dde) == 3, f"Item #{it['id']} ({w}) has exactly 3 definition distractors")
    assert_test(len(set(dde)) == 3, f"Item #{it['id']} ({w}) definition distractors are mutually unique")
    assert_test(den not in dde, f"Item #{it['id']} ({w}) target definition is NOT in definition distractors")

# Edge Case 3: Empty, Trim & Case Sensitivity in Workbook Grading
print("\n--- Edge Case 3: Workbook Evaluation & Normalisation ---")
for act in wb.get('activities', []):
    for item in act.get('items', []):
        model = item['model_answer']
        accepted = item['accepted']
        assert_test(len(accepted) > 0, f"Activity {act['id']} item {item['id']} has at least one accepted answer")
        
        # Test edge case: model answer itself must be accepted under normalisation
        norm_model = model.strip().lower()
        norm_accepted = [a.strip().lower() for a in accepted]
        assert_test(norm_model in norm_accepted, f"Model answer '{model}' is included in accepted answers for {item['id']}")

        # Test edge case: empty input must never match
        assert_test("" not in norm_accepted, f"Empty string is NOT an accepted answer for {item['id']}")
        assert_test(" " not in norm_accepted, f"Whitespace is NOT an accepted answer for {item['id']}")

# Edge Case 4: Storage State Serialization
print("\n--- Edge Case 4: Student State Serialization Roundtrip ---")
sample_state = {
    "unit": 2,
    "completed_activities": ["wb_u2_l1_act_a", "wb_u2_l2_act_a"],
    "score": 100,
    "streak": 5,
    "can_do_unlocked": ["feelings_school", "adverbs_frequency"]
}
try:
    serialized = json.dumps(sample_state)
    deserialized = json.loads(serialized)
    assert_test(deserialized == sample_state, "Student progress state survives clean JSON serialization roundtrip")
except Exception as e:
    assert_test(False, f"State serialization failed: {e}")

# Edge Case 5: Offline Font References
print("\n--- Edge Case 5: Offline Fonts Presence ---")
fonts_css = 'assets/fonts/fonts.css'
assert_test(os.path.exists(fonts_css), "Shared offline font CSS exists at assets/fonts/fonts.css")
with open(fonts_css, 'r', encoding='utf-8') as f:
    fc = f.read()
font_files = re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', fc)
missing_fonts = [fn for fn in font_files if not os.path.exists(os.path.join('assets/fonts', fn))]
assert_test(len(missing_fonts) == 0, f"All {len(font_files)} local WOFF2 font files exist on disk")

print(f"\n=======================================================")
print(f"EDGE-CASE TEST SUMMARY: {checks - len(failures)} PASSED, {len(failures)} FAILED")
print(f"=======================================================")

if failures:
    exit(1)
else:
    exit(0)
