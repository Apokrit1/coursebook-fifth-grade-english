import json

cefr = json.load(open('5th grade_coursebook_cefr.json', encoding='utf-8'))
entries = {e['word'].lower(): e for e in cefr['all_entries']}

target_candidates = [
    'screen', 'mouse', 'scanner', 'printer', 'microphone', 'headphones',
    'speaker', 'keyboard', 'tower', 'computer', 'internet', 'email',
    'website', 'online', 'chat', 'surf', 'information', 'friend',
    'prefer', 'enjoy', 'like', 'hate', 'study', 'test',
    'homework', 'draw', 'puzzle', 'sport', 'housework', 'jog',
    'paint', 'football', 'music', 'dance', 'fish', 'skate',
    'country', 'nationality', 'flag', 'capital', 'population', 'island',
    'symbol', 'flower', 'rose', 'daffodil', 'thistle', 'shamrock',
    'britain', 'british', 'england', 'english', 'scotland', 'scottish',
    'wales', 'welsh', 'ireland', 'irish', 'greece', 'greek',
    'france', 'french', 'spain', 'spanish', 'italy', 'italian',
    'germany', 'german', 'holland', 'dutch', 'russia', 'russian',
    'switzerland', 'swiss', 'albania', 'albanian', 'portugal', 'portuguese'
]

found = []
missing = []
for w in target_candidates:
    if w in entries:
        found.append((w, entries[w]['level'], entries[w].get('info','')))
    else:
        missing.append(w)

print(f"Found {len(found)} of {len(target_candidates)} candidate words.")
print("Missing:", missing)
print("Sample found:", found[:10])
