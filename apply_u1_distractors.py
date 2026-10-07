import json
import os
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

# Custom definitions for external fallback words
EXTERNAL_WORDS = {
    'digital': {
        'meaning_gr': 'ψηφιακός',
        'definition_en': 'using computer technology and the internet'
    },
    'offline': {
        'meaning_gr': 'εκτός σύνδεσης',
        'definition_en': 'not connected to the internet'
    },
    'connected': {
        'meaning_gr': 'συνδεδεμένος',
        'definition_en': 'joined to a computer network or the internet'
    },
    'send an email': {
        'meaning_gr': 'στέλνω ηλεκτρονικό μήνυμα',
        'definition_en': 'to send a digital message to another computer'
    },
    'play computer games': {
        'meaning_gr': 'παίζω παιχνίδια στον υπολογιστή',
        'definition_en': 'to play fun interactive games on a screen'
    },
    'chat online': {
        'meaning_gr': 'συνομιλώ διαδικτυακά',
        'definition_en': 'to talk with friends using internet messaging'
    },
    'connect': {
        'meaning_gr': 'συνδέω, ενώνω',
        'definition_en': 'to join two places or things together'
    },
    'travel': {
        'meaning_gr': 'ταξιδεύω',
        'definition_en': 'to go from one place or country to another'
    },
    'visit': {
        'meaning_gr': 'επισκέπτομαι',
        'definition_en': 'to go to see a person or a famous place'
    }
}

# The calibrated pedagogical distractor words for all 62 Unit 1 items
DISTRACTOR_WORD_MAP = {
    # 1-10: Computer Hardware (All Nouns)
    1: ['screen', 'keyboard', 'printer'],        # computer
    2: ['keyboard', 'mouse', 'speaker'],         # screen
    3: ['screen', 'keyboard', 'scanner'],        # mouse
    4: ['screen', 'mouse', 'printer'],           # keyboard
    5: ['scanner', 'screen', 'speaker'],         # printer
    6: ['printer', 'tower', 'keyboard'],         # scanner
    7: ['screen', 'keyboard', 'speaker'],        # tower
    8: ['headphones', 'speaker', 'mouse'],       # microphone
    9: ['microphone', 'speaker', 'screen'],      # headphones
    10: ['headphones', 'microphone', 'printer'], # speaker

    # 11-19: Internet & Online Life
    11: ['website', 'email', 'information'],     # internet (n)
    12: ['website', 'internet', 'information'],  # email (n)
    13: ['email', 'internet', 'information'],    # website (n)
    14: ['digital', 'offline', 'connected'],     # online (adj/adv)
    15: ['send', 'receive', 'study'],            # chat (v)
    16: ['send an email', 'play computer games', 'chat online'], # surf the net (phrase)
    17: ['website', 'email', 'internet'],        # information (n)
    18: ['receive', 'chat', 'study'],            # send (v)
    19: ['send', 'chat', 'prefer'],              # receive (v)

    # 20-30: Free Time & Hobbies
    20: ['hobby', 'sport', 'housework'],         # free time (n)
    21: ['sport', 'free time', 'puzzle'],        # hobby (n)
    22: ['enjoy', 'hate', 'study'],              # prefer (v)
    23: ['prefer', 'hate', 'paint'],             # enjoy (v)
    24: ['enjoy', 'prefer', 'jog'],              # hate (v)
    25: ['paint', 'jog', 'enjoy'],               # draw (v)
    26: ['sport', 'hobby', 'housework'],         # puzzle (n)
    27: ['hobby', 'puzzle', 'free time'],        # sport (n)
    28: ['homework', 'hobby', 'free time'],      # housework (n)
    29: ['draw', 'paint', 'enjoy'],              # jog (v)
    30: ['draw', 'jog', 'prefer'],               # paint (v)

    # 31-36: School & Learning
    31: ['prefer', 'enjoy', 'draw'],             # study (v)
    32: ['test', 'housework', 'primary school'], # homework (n)
    33: ['homework', 'puzzle', 'primary school'],# test (n)
    34: ['student', 'homework', 'primary school'],# pupil (n)
    35: ['pupil', 'homework', 'primary school'], # student (n)
    36: ['homework', 'test', 'pupil'],           # primary school (n)

    # 37-48: Countries & Geography
    37: ['capital', 'nationality', 'island'],    # country (n)
    38: ['country', 'population', 'capital'],    # nationality (n)
    39: ['country', 'island', 'population'],     # capital (n)
    40: ['symbol', 'capital', 'country'],        # flag (n)
    41: ['capital', 'country', 'population'],    # island (n)
    42: ['nationality', 'country', 'capital'],   # population (n)
    43: ['connect', 'travel', 'visit'],          # border (v)
    44: ['United Kingdom', 'Greece', 'France'],  # Great Britain (n prop)
    45: ['Great Britain', 'France', 'Spain'],    # United Kingdom (n prop)
    46: ['France', 'Spain', 'Great Britain'],    # Greece (n prop)
    47: ['Spain', 'Greece', 'United Kingdom'],   # France (n prop)
    48: ['France', 'Greece', 'Great Britain'],   # Spain (n prop)

    # 49-56: Nationalities & Languages (All Adjectives)
    49: ['French', 'Spanish', 'German'],         # British (adj)
    50: ['Italian', 'Spanish', 'French'],        # Greek (adj)
    51: ['Spanish', 'German', 'Italian'],        # French (adj)
    52: ['French', 'Italian', 'Greek'],          # Spanish (adj)
    53: ['Greek', 'Spanish', 'French'],          # Italian (adj)
    54: ['Dutch', 'British', 'Russian'],         # German (adj)
    55: ['German', 'British', 'French'],         # Dutch (adj)
    56: ['German', 'British', 'Greek'],          # Russian (adj)

    # 57-62: Symbols & Nature
    57: ['flag', 'rose', 'country'],             # symbol (n)
    58: ['symbol', 'flag', 'capital'],           # national flower (phrase)
    59: ['daffodil', 'thistle', 'shamrock'],     # rose (n)
    60: ['rose', 'thistle', 'shamrock'],         # daffodil (n)
    61: ['rose', 'daffodil', 'shamrock'],        # thistle (n)
    62: ['rose', 'daffodil', 'thistle']          # shamrock (n)
}

def main():
    u1_path = 'unit1/data/vocabulary_data.json'
    with open(u1_path, 'r', encoding='utf-8') as f:
        items = json.load(f)

    # Map words to objects
    word_map = {item['word'].lower(): item for item in items}

    for item in items:
        item_id = item['id']
        dist_words = DISTRACTOR_WORD_MAP.get(item_id, [])
        if not dist_words:
            print(f"Warning: Missing distractor map for item {item_id}: {item['word']}")
            continue

        item['distractors_word'] = dist_words
        dist_greek = []
        dist_defs = []

        for dw in dist_words:
            dw_lower = dw.lower()
            if dw_lower in word_map:
                source = word_map[dw_lower]
                dist_greek.append(source['meaning_gr'])
                dist_defs.append(source['definition_en'])
            elif dw_lower in EXTERNAL_WORDS:
                source = EXTERNAL_WORDS[dw_lower]
                dist_greek.append(source['meaning_gr'])
                dist_defs.append(source['definition_en'])
            else:
                print(f"Error: Unknown distractor word '{dw}' for item {item['word']}")

        item['distractors_greek'] = dist_greek
        item['distractors_def'] = dist_defs

    # Save JSON
    with open('unit1/data/vocabulary_data.json', 'w', encoding='utf-8') as f:
        json.dump(items, f, indent=2, ensure_ascii=False)

    # Save JS Twin
    with open('unit1/data/vocabulary_data.js', 'w', encoding='utf-8') as f:
        f.write('window.VOCABULARY_DATA = ' + json.dumps(items, indent=2, ensure_ascii=False) + ';\n')

    print(f"Successfully updated unit1/data/vocabulary_data.json and .js with calibrated distractors for {len(items)} items!")

if __name__ == '__main__':
    main()
