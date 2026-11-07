import json
import os

wb_data = {
  "unit": 3,
  "title": "Unit 3 Workbook: Places — The Place We Live In",
  "total_activities": 8,
  "activities": [
    {
      "id": "wb_u3_l1_act_a",
      "number": "Lesson 1 • Activity A",
      "title": "People, Origins, Jobs & Places of Work",
      "page": 19,
      "type": "fill-in",
      "instruction": "Complete the questions and answers about each person's origin, hometown, occupation, and workplace.",
      "items": [
        {
          "id": "person_1_q1",
          "prompt": "Where does Maria come from?",
          "accepted": ["She comes from Greece.", "Greece", "She comes from Greece"],
          "model_answer": "She comes from Greece."
        },
        {
          "id": "person_1_q2",
          "prompt": "Where does she live?",
          "accepted": ["She lives in Samos.", "In Samos", "She lives in Samos"],
          "model_answer": "She lives in Samos."
        },
        {
          "id": "person_1_q3",
          "prompt": "What does she do for a living?",
          "accepted": ["She is a teacher.", "She's a teacher.", "She is a teacher", "A teacher"],
          "model_answer": "She's a teacher."
        },
        {
          "id": "person_1_q4",
          "prompt": "Where does she work?",
          "accepted": ["She works at a school.", "At a school", "She works at a school"],
          "model_answer": "She works at a school."
        },
        {
          "id": "person_2_q1",
          "prompt": "Complete the question: _____ ? Answer: He comes from Great Britain.",
          "accepted": ["Where does he come from?", "Where does he come from"],
          "model_answer": "Where does he come from?"
        },
        {
          "id": "person_2_q2",
          "prompt": "Where does he live? (London)",
          "accepted": ["He lives in London.", "In London", "He lives in London"],
          "model_answer": "He lives in London."
        },
        {
          "id": "person_2_q3",
          "prompt": "Complete the question: _____ ? Answer: He's an actor.",
          "accepted": ["What does he do for a living?", "What's his job?", "What does he do?"],
          "model_answer": "What's his job / What does he do for a living?"
        },
        {
          "id": "person_2_q4",
          "prompt": "Complete the question: _____ ? Answer: He works at a theatre.",
          "accepted": ["Where does he work?", "Where does he work"],
          "model_answer": "Where does he work?"
        }
      ]
    },
    {
      "id": "wb_u3_l1_act_d",
      "number": "Lesson 1 • Activity D",
      "title": "School Safety & Offering Suggestions",
      "page": 19,
      "type": "suggestions",
      "instruction": "Read the school safety problems and offer constructive suggestions using opinion or suggestion expressions.",
      "items": [
        {
          "id": "safe_1",
          "prompt": "Problem: Pupils often slip on the stairs. Suggestion:",
          "accepted": [
            "In my opinion, the school must put special anti-slide flooring.",
            "In my opinion, the school must put anti-slip flooring.",
            "Why don't we put non-slip rubber on the stairs?",
            "How about walking slowly on the stairs?"
          ],
          "model_answer": "In my opinion, the school must put special anti-slide flooring."
        },
        {
          "id": "safe_2",
          "prompt": "Problem: There is a busy road outside the school and it is dangerous to cross it. Suggestion:",
          "accepted": [
            "Why don't we ask for a zebra crossing with a traffic warden?",
            "In my opinion, we should have a traffic light or school guard.",
            "How about putting a pedestrian crossing outside the school?",
            "Why don't you cross only at the pedestrian crossing?"
          ],
          "model_answer": "In my opinion, the municipality should install a pedestrian crossing and a traffic light."
        },
        {
          "id": "safe_3",
          "prompt": "Problem: Pupils carry too many heavy books to school. Suggestion:",
          "accepted": [
            "Why don't we leave some books in classroom lockers?",
            "In my opinion, pupils should have school lockers.",
            "How about using digital books and tablet companions?",
            "Let's ask the school for lockers!"
          ],
          "model_answer": "Why don't we leave heavy textbooks in classroom lockers?"
        }
      ]
    },
    {
      "id": "wb_u3_l1_act_e",
      "number": "Lesson 1 • Activity E",
      "title": "Word Order & Sentence Formation",
      "page": 20,
      "type": "unscramble",
      "instruction": "Put the words in the correct order to make meaningful English sentences.",
      "items": [
        {
          "id": "order_1",
          "prompt": "get up / morning / in / always / early / the / Athletes",
          "accepted": ["Athletes always get up early in the morning.", "Athletes always get up early in the morning"],
          "model_answer": "Athletes always get up early in the morning."
        },
        {
          "id": "order_2",
          "prompt": "never / You / street / must / on / red / a / cross / light / the",
          "accepted": ["You must never cross the street on a red light.", "You must never cross the street on a red light"],
          "model_answer": "You must never cross the street on a red light."
        },
        {
          "id": "order_3",
          "prompt": "often / your / cinema / go / How / best friend / does / the / to / ?",
          "accepted": ["How often does your best friend go to the cinema?", "How often does your best friend go to the cinema"],
          "model_answer": "How often does your best friend go to the cinema?"
        },
        {
          "id": "order_4",
          "prompt": "free / do / like / time / your / What / doing / you / in / ?",
          "accepted": ["What do you like doing in your free time?", "What do you like doing in your free time"],
          "model_answer": "What do you like doing in your free time?"
        },
        {
          "id": "order_5",
          "prompt": "usually / school / I / to / walk / but / rains / when / father / it / my / drives / there / me",
          "accepted": [
            "I usually walk to school but when it rains my father drives me there.",
            "I usually walk to school but when it rains my father drives me there"
          ],
          "model_answer": "I usually walk to school but when it rains my father drives me there."
        }
      ]
    },
    {
      "id": "wb_u3_l2_act_a",
      "number": "Lesson 2 • Activity A",
      "title": "Sightseeing in London: Giving Directions",
      "page": 20,
      "type": "dialogue-completion",
      "instruction": "Study the London map (Cockspur St, Trafalgar Square, Westminster, Piccadilly Circus) and complete the directions dialogue with Mark.",
      "items": [
        {
          "id": "london_1",
          "prompt": "How can I get to Westminster, Mark?",
          "accepted": [
            "Walk down Whitehall past Downing Street, and Westminster is straight ahead.",
            "Go straight down Whitehall and you will see Westminster.",
            "Walk along Whitehall towards the Thames."
          ],
          "model_answer": "Walk down Whitehall past Downing Street, and Westminster Abbey is straight ahead. You can't miss it!"
        },
        {
          "id": "london_2",
          "prompt": "How can I get to Green Park Tube Station, please?",
          "accepted": [
            "Walk along The Mall towards Buckingham Palace, then turn right into Constitution Hill.",
            "Walk along Pall Mall and Piccadilly towards Green Park.",
            "Take the underground or walk along Piccadilly."
          ],
          "model_answer": "Walk along The Mall past St James's Park, turn right at Buckingham Palace, and the station is right there."
        },
        {
          "id": "london_3",
          "prompt": "What about Piccadilly Circus? How can I get there to see the statue of Eros?",
          "accepted": [
            "Walk north up Haymarket, and Piccadilly Circus is at the end.",
            "Go along Haymarket and turn left into Piccadilly Circus.",
            "Walk up Haymarket and you will see Eros straight ahead."
          ],
          "model_answer": "Walk straight up Haymarket for two minutes, and Piccadilly Circus with the famous statue of Eros is right in front of you!"
        }
      ]
    },
    {
      "id": "wb_u3_l2_act_b",
      "number": "Lesson 2 • Activity B",
      "title": "Giving Directions Imperatives & Prepositions",
      "page": 21,
      "type": "fill-in",
      "instruction": "Choose the correct navigation phrase: 'turn left', 'go straight ahead', 'opposite', 'on your right', or 'next to'.",
      "items": [
        {
          "id": "nav_1",
          "prompt": "When you come out of the school gate, _____ into Maditou Street.",
          "accepted": ["turn left", "turn right"],
          "model_answer": "turn left"
        },
        {
          "id": "nav_2",
          "prompt": "Do not turn at the first corner; continue to _____ until you see the church.",
          "accepted": ["go straight ahead", "walk straight ahead", "go straight"],
          "model_answer": "go straight ahead"
        },
        {
          "id": "nav_3",
          "prompt": "The Youth Centre is situated _____ the municipal stadium.",
          "accepted": ["opposite", "across from"],
          "model_answer": "opposite"
        },
        {
          "id": "nav_4",
          "prompt": "The corner newsstand is located right _____ the bakery.",
          "accepted": ["next to", "beside"],
          "model_answer": "next to"
        },
        {
          "id": "nav_5",
          "prompt": "Walk past the police station and you will find the entrance _____ .",
          "accepted": ["on your right", "on your left"],
          "model_answer": "on your right"
        }
      ]
    },
    {
      "id": "wb_u3_l3_act_a",
      "number": "Lesson 3 • Activity A",
      "title": "Towns of Greece: Categories & Features",
      "page": 22,
      "type": "matching",
      "instruction": "Classify the geographic and urban features under the headings: Location, Surroundings, or Old and New.",
      "items": [
        {
          "id": "cat_1",
          "prompt": "'built next to a lake' belongs to:",
          "accepted": ["Location", "location"],
          "model_answer": "Location"
        },
        {
          "id": "cat_2",
          "prompt": "'snow on high mountains for four months' belongs to:",
          "accepted": ["Surroundings", "surroundings"],
          "model_answer": "Surroundings"
        },
        {
          "id": "cat_3",
          "prompt": "'15-century castle overlooking the water' belongs to:",
          "accepted": ["Old and New", "Town Old and New", "old and new"],
          "model_answer": "Old and New"
        },
        {
          "id": "cat_4",
          "prompt": "'situated in the north-west of Greece' belongs to:",
          "accepted": ["Location", "location"],
          "model_answer": "Location"
        },
        {
          "id": "cat_5",
          "prompt": "'modern neighbourhoods with blocks of flats' belongs to:",
          "accepted": ["Old and New", "Town Old and New", "old and new"],
          "model_answer": "Old and New"
        }
      ]
    },
    {
      "id": "wb_u3_l3_act_b",
      "number": "Lesson 3 • Activity B",
      "title": "Compass Directions & Capitals Crossword",
      "page": 22,
      "type": "cloze",
      "instruction": "Complete each sentence with the correct compass direction (north, south, east, west, north-west).",
      "items": [
        {
          "id": "compass_1",
          "prompt": "Thessaloniki and Kastoria are situated in the _____ of Greece.",
          "accepted": ["north"],
          "model_answer": "north"
        },
        {
          "id": "compass_2",
          "prompt": "Crete and Rhodes lie in the _____ of the country.",
          "accepted": ["south", "south-east"],
          "model_answer": "south"
        },
        {
          "id": "compass_3",
          "prompt": "Corfu and the Ionian islands are located to the _____ of mainland Greece.",
          "accepted": ["west"],
          "model_answer": "west"
        },
        {
          "id": "compass_4",
          "prompt": "Ioannina is a town situated in the _____ of Greece.",
          "accepted": ["north-west", "northwest"],
          "model_answer": "north-west"
        },
        {
          "id": "compass_5",
          "prompt": "The sun rises in the _____ and sets in the west.",
          "accepted": ["east"],
          "model_answer": "east"
        }
      ]
    },
    {
      "id": "wb_u3_self_assessment",
      "number": "Self-Assessment • Unit 3",
      "title": "Unit 3 Self-Assessment & Reflection",
      "page": 23,
      "type": "multiple-choice",
      "instruction": "Choose the correct English phrase for each everyday situation.",
      "items": [
        {
          "id": "sa_1",
          "prompt": "You want to suggest using the bus instead of the car. You say:",
          "accepted": ["Why don't you take the bus?", "Why don't we take the bus?"],
          "model_answer": "Why don't you take the bus?"
        },
        {
          "id": "sa_2",
          "prompt": "A tourist asks you the way to the museum. You say:",
          "accepted": ["Go straight ahead and turn left at the church.", "Turn left at the church."],
          "model_answer": "Go straight ahead and turn left at the church."
        },
        {
          "id": "sa_3",
          "prompt": "You want to say that driving to work is tiring and costly. You say:",
          "accepted": ["In my opinion, driving to work is tiring and expensive.", "I think driving is tiring."],
          "model_answer": "In my opinion, driving to work is tiring and expensive."
        },
        {
          "id": "sa_4",
          "prompt": "You describe Ioannina's location. You say:",
          "accepted": ["It is situated in the north-west of Greece next to a lake.", "It is next to a lake."],
          "model_answer": "It is situated in the north-west of Greece next to a lake."
        }
      ]
    }
  ]
}

def main():
    out_dir = os.path.join(os.path.dirname(__file__), "unit3", "data")
    os.makedirs(out_dir, exist_ok=True)
    
    json_path = os.path.join(out_dir, "unit3_workbook_data.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(wb_data, f, indent=2, ensure_ascii=False)
        
    js_path = os.path.join(out_dir, "unit3_workbook_data.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("window.UNIT3_WORKBOOK_DATA = ")
        json.dump(wb_data, f, indent=2, ensure_ascii=False)
        f.write(";\n")
        
    print(f"Successfully generated {json_path} and {js_path}!")

if __name__ == "__main__":
    main()
