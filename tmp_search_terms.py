import json

cefr = json.load(open('5th grade_coursebook_cefr.json', encoding='utf-8'))
words = [e['word'] for e in cefr['all_entries']]

search_terms = ['surf', 'info', 'friend', 'prefer', 'enjoy', 'like', 'hate', 'study', 'test', 'sport', 'house', 'jog', 'paint', 'dance', 'fish', 'skate', 'countr', 'nation', 'symbol', 'flower', 'ireland']
for s in search_terms:
    matches = [w for w in words if s in w.lower()]
    print(f"{s}: {matches}")
