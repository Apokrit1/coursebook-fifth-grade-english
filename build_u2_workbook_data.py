import json

wb_data = {
  "unit": 2,
  "title": "Unit 2 Workbook: School Life & The World Around Us",
  "total_activities": 8,
  "activities": [
    {
      "id": "wb_u2_l1_act_a",
      "number": "Lesson 1 • Activity A",
      "title": "Feelings & Emotion Faces Matching",
      "page": 11,
      "type": "matching",
      "instruction": "Look at the children's faces and match each picture with the correct feeling word from the box.",
      "items": [
        {
          "id": "face_1",
          "prompt": "Face a (frowning, red face with clenched fists):",
          "accepted": ["angry", "an angry boy"],
          "model_answer": "angry"
        },
        {
          "id": "face_2",
          "prompt": "Face b (yawning pupil looking at clock):",
          "accepted": ["bored", "bored pupil"],
          "model_answer": "bored"
        },
        {
          "id": "face_3",
          "prompt": "Face c (broad cheerful smile):",
          "accepted": ["happy", "cheerful", "smiling"],
          "model_answer": "happy"
        },
        {
          "id": "face_4",
          "prompt": "Face d (drooping eyes, apologetic look):",
          "accepted": ["sorry", "apologetic"],
          "model_answer": "sorry"
        },
        {
          "id": "face_5",
          "prompt": "Face e (head resting on desk, heavy eyelids):",
          "accepted": ["tired", "sleepy"],
          "model_answer": "tired"
        },
        {
          "id": "face_6",
          "prompt": "Face f (wide terrified eyes, shaking):",
          "accepted": ["scared", "afraid", "frightened"],
          "model_answer": "scared"
        },
        {
          "id": "face_7",
          "prompt": "Face g (biting nails, worried look):",
          "accepted": ["nervous", "anxious", "worried"],
          "model_answer": "nervous"
        },
        {
          "id": "face_8",
          "prompt": "Face h (jumping for joy with star eyes):",
          "accepted": ["excited", "very happy"],
          "model_answer": "excited"
        }
      ]
    },
    {
      "id": "wb_u2_l1_act_b",
      "number": "Lesson 1 • Activity B",
      "title": "Henry's Daily School Routine",
      "page": 12,
      "type": "fill-in",
      "instruction": "Complete Henry's letter about his daily routine using the verbs in the Present Simple: wake, have, start, finish, prepare, use, play, like.",
      "items": [
        {
          "id": "henry_1",
          "prompt": "Every morning Henry _____ (wake) up at 7:00 am.",
          "accepted": ["wakes", "wakes up"],
          "model_answer": "wakes"
        },
        {
          "id": "henry_2",
          "prompt": "All pupils _____ (have) breakfast together in the dining hall.",
          "accepted": ["have", "eat"],
          "model_answer": "have"
        },
        {
          "id": "henry_3",
          "prompt": "Morning lessons _____ (start) promptly at 8:30 am.",
          "accepted": ["start", "begin"],
          "model_answer": "start"
        },
        {
          "id": "henry_4",
          "prompt": "Classes _____ (finish) at 2:00 in the afternoon.",
          "accepted": ["finish", "end"],
          "model_answer": "finish"
        },
        {
          "id": "henry_5",
          "prompt": "In the lab, the teacher _____ (prepare) exciting experiments.",
          "accepted": ["prepares", "makes"],
          "model_answer": "prepares"
        },
        {
          "id": "henry_6",
          "prompt": "During science class, Henry _____ (use) special instruments.",
          "accepted": ["uses"],
          "model_answer": "uses"
        },
        {
          "id": "henry_7",
          "prompt": "In the evening, he _____ (play) games with his best friends.",
          "accepted": ["plays"],
          "model_answer": "plays"
        },
        {
          "id": "henry_8",
          "prompt": "Henry really _____ (like) his new boarding school.",
          "accepted": ["likes", "loves"],
          "model_answer": "likes"
        }
      ]
    },
    {
      "id": "wb_u2_l2_act_a",
      "number": "Lesson 2 • Activity A",
      "title": "School Subjects Anagram Unscramble",
      "page": 14,
      "type": "unscramble",
      "instruction": "Unscramble the letters to reveal the school subject words.",
      "items": [
        {
          "id": "subj_1",
          "prompt": "g - e - o - h - y - p - g - r - a",
          "accepted": ["geography"],
          "model_answer": "geography"
        },
        {
          "id": "subj_2",
          "prompt": "r - h - i - t - y - o - s",
          "accepted": ["history"],
          "model_answer": "history"
        },
        {
          "id": "subj_3",
          "prompt": "s - h - a - t - m",
          "accepted": ["maths", "math"],
          "model_answer": "maths"
        },
        {
          "id": "subj_4",
          "prompt": "m - y - g",
          "accepted": ["gym"],
          "model_answer": "gym"
        },
        {
          "id": "subj_5",
          "prompt": "e - e - c - i - s - n - c",
          "accepted": ["science"],
          "model_answer": "science"
        },
        {
          "id": "subj_6",
          "prompt": "t - a - r",
          "accepted": ["art"],
          "model_answer": "art"
        },
        {
          "id": "subj_7",
          "prompt": "s - m - i - c - u",
          "accepted": ["music"],
          "model_answer": "music"
        },
        {
          "id": "subj_8",
          "prompt": "h - s - i - n - e - l - g",
          "accepted": ["English", "english"],
          "model_answer": "English"
        }
      ]
    },
    {
      "id": "wb_u2_l2_act_b",
      "number": "Lesson 2 • Activity B",
      "title": "Athlete Interview Gap-Fill",
      "page": 14,
      "type": "gap-fill",
      "instruction": "Fill in the missing words from the basketball star interview: sleep, eat, practise, hours, food, basketball player.",
      "items": [
        {
          "id": "ath_1",
          "prompt": "I practice a lot. I (1) _____ well every night.",
          "accepted": ["sleep"],
          "model_answer": "sleep"
        },
        {
          "id": "ath_2",
          "prompt": "I (2) _____ healthily and choose nutritious meals.",
          "accepted": ["eat"],
          "model_answer": "eat"
        },
        {
          "id": "ath_3",
          "prompt": "How many hours do you (3) _____ each day?",
          "accepted": ["practise", "practice", "train"],
          "model_answer": "practise"
        },
        {
          "id": "ath_4",
          "prompt": "About six (4) _____ each day, plus conditioning training.",
          "accepted": ["hours"],
          "model_answer": "hours"
        },
        {
          "id": "ath_5",
          "prompt": "Is the (5) _____ you eat important for performance?",
          "accepted": ["food"],
          "model_answer": "food"
        },
        {
          "id": "ath_6",
          "prompt": "Yes, it is very important for a (6) _____ to eat well.",
          "accepted": ["basketball player", "player", "athlete"],
          "model_answer": "basketball player"
        }
      ]
    },
    {
      "id": "wb_u2_l2_act_c",
      "number": "Lesson 2 • Activity C",
      "title": "Good Habits vs Bad Habits Classification",
      "page": 14,
      "type": "classification",
      "instruction": "Classify the habit into GOOD HABIT or BAD HABIT.",
      "items": [
        {
          "id": "hab_1",
          "prompt": "Sleeping 8-9 hours every night",
          "accepted": ["good", "good habit", "Good habit"],
          "model_answer": "Good habit"
        },
        {
          "id": "hab_2",
          "prompt": "Eating potato crisps and sweets for lunch",
          "accepted": ["bad", "bad habit", "Bad habit"],
          "model_answer": "Bad habit"
        },
        {
          "id": "hab_3",
          "prompt": "Drinking 6-8 glasses of water every day",
          "accepted": ["good", "good habit", "Good habit"],
          "model_answer": "Good habit"
        },
        {
          "id": "hab_4",
          "prompt": "Watching TV until midnight on school days",
          "accepted": ["bad", "bad habit", "Bad habit"],
          "model_answer": "Bad habit"
        },
        {
          "id": "hab_5",
          "prompt": "Walking or riding a bicycle to school",
          "accepted": ["good", "good habit", "Good habit"],
          "model_answer": "Good habit"
        },
        {
          "id": "hab_6",
          "prompt": "Always arriving late for morning lessons",
          "accepted": ["bad", "bad habit", "Bad habit"],
          "model_answer": "Bad habit"
        }
      ]
    },
    {
      "id": "wb_u2_l2_act_e",
      "number": "Lesson 2 • Activity E",
      "title": "Frequency Word Order Reconstruction",
      "page": 16,
      "type": "sentence-reorder",
      "instruction": "Put the words in the correct order to make correct sentences with adverbs of frequency.",
      "items": [
        {
          "id": "order_1",
          "prompt": "always / I / on time / arrive",
          "accepted": ["I always arrive on time.", "I always arrive on time"],
          "model_answer": "I always arrive on time."
        },
        {
          "id": "order_2",
          "prompt": "is / happy / she / usually / at school",
          "accepted": ["She is usually happy at school.", "She is usually happy at school"],
          "model_answer": "She is usually happy at school."
        },
        {
          "id": "order_3",
          "prompt": "play / they / often / basketball / in the playground",
          "accepted": ["They often play basketball in the playground.", "They often play basketball in the playground"],
          "model_answer": "They often play basketball in the playground."
        },
        {
          "id": "order_4",
          "prompt": "never / late / Mark / is / for class",
          "accepted": ["Mark is never late for class.", "Mark is never late for class"],
          "model_answer": "Mark is never late for class."
        }
      ]
    },
    {
      "id": "wb_u2_diff_star1",
      "number": "Differentiated Task (*)",
      "title": "My Weekly School Programme Timetable",
      "page": 69,
      "type": "timetable-builder",
      "instruction": "Complete your weekly school programme by filling in your favorite subjects for each day.",
      "items": [
        {
          "id": "tt_mon",
          "prompt": "Monday Morning 1st Period:",
          "accepted": ["English", "maths", "history", "geography", "science", "art", "music", "gym"],
          "model_answer": "English"
        },
        {
          "id": "tt_tue",
          "prompt": "Tuesday Morning 2nd Period:",
          "accepted": ["maths", "English", "science", "gym", "history", "art"],
          "model_answer": "maths"
        },
        {
          "id": "tt_wed",
          "prompt": "Wednesday Afternoon 3rd Period:",
          "accepted": ["science", "gym", "music", "English", "art"],
          "model_answer": "science"
        },
        {
          "id": "tt_thu",
          "prompt": "Thursday Morning 1st Period:",
          "accepted": ["history", "geography", "English", "maths"],
          "model_answer": "history"
        },
        {
          "id": "tt_fri",
          "prompt": "Friday Afternoon 4th Period:",
          "accepted": ["gym", "art", "music", "English"],
          "model_answer": "gym"
        }
      ]
    },
    {
      "id": "wb_u2_diff_star2",
      "number": "Differentiated Task (**)",
      "title": "Memory Game: Correct the Statement Mistakes",
      "page": 68,
      "type": "error-correction",
      "instruction": "Look at Henry's letter. Find the factual error in each statement and type the corrected word.",
      "items": [
        {
          "id": "mem_1",
          "prompt": "'They have breakfast at the blue dining hall at 9.30 am.' (Wrong time - what time is it?)",
          "accepted": ["7.00 am", "7:00 am", "7:00", "7.00", "at 7.00 am", "7 am"],
          "model_answer": "7:00 am"
        },
        {
          "id": "mem_2",
          "prompt": "'Lessons finish at 2.00 a.m.' (Is it a.m. or p.m.?)",
          "accepted": ["2.00 pm", "2:00 pm", "p.m.", "pm", "2 pm"],
          "model_answer": "2:00 pm"
        },
        {
          "id": "mem_3",
          "prompt": "'In the evening he fights with his best friends.' (What does he do?)",
          "accepted": ["plays", "he plays", "plays games"],
          "model_answer": "plays"
        },
        {
          "id": "mem_4",
          "prompt": "'Henry is sad and ashamed of his new wand.' (How does he feel?)",
          "accepted": ["proud", "he is proud", "happy"],
          "model_answer": "proud"
        }
      ]
    }
  ]
}

# Write JSON
json_path = 'unit2/data/unit2_workbook_data.json'
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(wb_data, f, indent=2, ensure_ascii=False)

# Write JS Twin
js_path = 'unit2/data/unit2_workbook_data.js'
with open(js_path, 'w', encoding='utf-8') as f:
    f.write('window.UNIT2_WORKBOOK_DATA = ' + json.dumps(wb_data, indent=2, ensure_ascii=False) + ';\n')

print(f"Successfully generated {json_path} and {js_path}!")
