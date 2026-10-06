import json

wb_data = {
  "unit": 1,
  "title": "Unit 1 Workbook: Internet Friends Around Europe",
  "total_activities": 7,
  "activities": [
    {
      "id": "wb_l1_act_a",
      "number": "Lesson 1 • Activity A",
      "title": "Free Time Hobbies & Pictures",
      "page": 7,
      "type": "semi-open",
      "instruction": "Study the pictures. Use expressions from Grammar Focus (like / enjoy / prefer) to write sentences about free-time activities.",
      "items": [
        {
          "id": "item_a",
          "prompt": "Picture a: dancing couple",
          "accepted": ["They like dancing", "They enjoy dancing", "I like dancing", "Dancing is fun"],
          "model_answer": "They like dancing."
        },
        {
          "id": "item_b",
          "prompt": "Picture b: painting on easel",
          "accepted": ["He likes painting", "He enjoys painting", "I like painting", "Painting pictures"],
          "model_answer": "He enjoys painting pictures."
        },
        {
          "id": "item_c",
          "prompt": "Picture c: boy reading a book",
          "accepted": ["He likes reading", "He enjoys reading", "I like reading books", "Reading books"],
          "model_answer": "He prefers reading books."
        },
        {
          "id": "item_d",
          "prompt": "Picture d: girl playing violin",
          "accepted": ["She likes playing the violin", "She enjoys playing the violin", "Playing the violin"],
          "model_answer": "She enjoys playing the violin."
        },
        {
          "id": "item_e",
          "prompt": "Picture e: figure ice-skating",
          "accepted": ["She likes ice-skating", "She likes skating", "She enjoys ice-skating", "Ice-skating"],
          "model_answer": "She loves ice-skating."
        },
        {
          "id": "item_f",
          "prompt": "Picture f: fisherman with rod",
          "accepted": ["He likes fishing", "He enjoys fishing", "Going fishing"],
          "model_answer": "He enjoys fishing."
        }
      ]
    },
    {
      "id": "wb_l2_act_a",
      "number": "Lesson 2 • Activity A",
      "title": "Matching Characters & Cities",
      "page": 7,
      "type": "closed",
      "instruction": "Match the people, cities, and facts from the dialogue.",
      "pairs": [
        { "left": "1. Kostas is", "right": "d. a Greek student.", "accepted": ["d", "d.", "a Greek student."] },
        { "left": "2. Marseilles is", "right": "e. a French city.", "accepted": ["e", "e.", "a French city."] },
        { "left": "3. Mark", "right": "a. comes from Great Britain.", "accepted": ["a", "a.", "comes from Great Britain."] },
        { "left": "4. Nadine is", "right": "c. from France.", "accepted": ["c", "c.", "from France."] },
        { "left": "5. The only thing Kostas likes about school is", "right": "b. computers.", "accepted": ["b", "b.", "computers."] }
      ]
    },
    {
      "id": "wb_l2_act_b",
      "number": "Lesson 2 • Activity B",
      "title": "Dialogue Comprehension Gap-Fill",
      "page": 8,
      "type": "closed",
      "instruction": "Read the dialogue on page 18 of your Pupil's Book and fill in the missing information.",
      "gaps": [
        { "id": "g1", "prefix": "Kostas from", "suffix": "is talking to Mark from England.", "accepted": ["Greece"], "key_answer": "Greece" },
        { "id": "g2", "prefix": "Kostas from Greece is talking to", "suffix": "from London.", "accepted": ["Mark"], "key_answer": "Mark" },
        { "id": "g3", "prefix": "Mark is from", "suffix": "in Great Britain.", "accepted": ["London", "England"], "key_answer": "London" },
        { "id": "g4", "prefix": "Nadine is from", "suffix": "in the south of France.", "accepted": ["Marseilles", "Marseille"], "key_answer": "Marseilles" },
        { "id": "g5", "prefix": "Marseilles is in the south of", "suffix": ".", "accepted": ["France"], "key_answer": "France" },
        { "id": "g6", "prefix": "Kostas is", "suffix": "years old.", "accepted": ["11", "eleven"], "key_answer": "11" },
        { "id": "g7", "prefix": "Kostas is in the", "suffix": "class of Primary School.", "accepted": ["5th", "fifth"], "key_answer": "5th" },
        { "id": "g8", "prefix": "Mark is", "suffix": "years old.", "accepted": ["12", "twelve"], "key_answer": "12" },
        { "id": "g9", "prefix": "Mark goes to", "suffix": "Primary School.", "accepted": ["West Wimbledon"], "key_answer": "West Wimbledon" },
        { "id": "g10", "prefix": "Nadine is", "suffix": "years old.", "accepted": ["12", "twelve"], "key_answer": "12" },
        { "id": "g11", "prefix": "Nadine is a student in the", "suffix": "class of Collège.", "accepted": ["2nd", "second"], "key_answer": "2nd" },
        { "id": "g12", "prefix": "Nadine likes", "suffix": "while Mark hates tests.", "accepted": ["studying", "school", "going to school"], "key_answer": "studying" },
        { "id": "g13", "prefix": "Mark hates tests and", "suffix": ".", "accepted": ["homework"], "key_answer": "homework" },
        { "id": "g14", "prefix": "The only thing that", "suffix": "likes about school is computers.", "accepted": ["Kostas"], "key_answer": "Kostas" }
      ]
    },
    {
      "id": "wb_l2_act_c",
      "number": "Lesson 2 • Activity C",
      "title": "Test Your Knowledge: Countries & Nationalities",
      "page": 8,
      "type": "closed",
      "instruction": "Fill in the missing country names and nationalities.",
      "gaps": [
        { "id": "c1a", "prefix": "1. The", "suffix": "(Br...) Queen is in Russia at the moment.", "accepted": ["British"], "key_answer": "British" },
        { "id": "c1b", "prefix": "The British Queen is in", "suffix": "(Ru...) at the moment.", "accepted": ["Russia"], "key_answer": "Russia" },
        { "id": "c2", "prefix": "2. Rome is the capital of", "suffix": "(I...).", "accepted": ["Italy"], "key_answer": "Italy" },
        { "id": "c3", "prefix": "3. This", "suffix": "(Ge...) car is really nice (Mercedes).", "accepted": ["German"], "key_answer": "German" },
        { "id": "c4a", "prefix": "4. Does Hans come from", "suffix": "(Au...)? No, he's from Holland.", "accepted": ["Austria", "Australia"], "key_answer": "Austria" },
        { "id": "c4b", "prefix": "Hans is from Holland. He is", "suffix": "(D...).", "accepted": ["Dutch"], "key_answer": "Dutch" },
        { "id": "c5a", "prefix": "5. Tirana is the capital of", "suffix": "(Al...).", "accepted": ["Albania"], "key_answer": "Albania" },
        { "id": "c5b", "prefix": "Sofia is the capital of", "suffix": "(Bu...).", "accepted": ["Bulgaria"], "key_answer": "Bulgaria" },
        { "id": "c6", "prefix": "6. Is Matisse British or", "suffix": "(Fr...)?", "accepted": ["French"], "key_answer": "French" },
        { "id": "c7", "prefix": "7. Was Hans Christian Andersen Swedish or", "suffix": "(Da...)?", "accepted": ["Danish"], "key_answer": "Danish" },
        { "id": "c8", "prefix": "8. Roald Dahl is the", "suffix": "(We...) writer of 'Matilda'.", "accepted": ["Welsh"], "key_answer": "Welsh" },
        { "id": "c9", "prefix": "9. William Shakespeare was from", "suffix": "(En...).", "accepted": ["England"], "key_answer": "England" },
        { "id": "c10", "prefix": "10. Thomas Edison was an", "suffix": "(Am...) inventor.", "accepted": ["American"], "key_answer": "American" }
      ]
    },
    {
      "id": "wb_l2_act_d",
      "number": "Lesson 2 • Activity D",
      "title": "Grammar: Simple Present Tense Practice",
      "page": 9,
      "type": "closed",
      "instruction": "Complete the questions and answers with the correct form of the Present Simple.",
      "gaps": [
        { "id": "d1a", "prefix": "1. Where", "suffix": "(you / come from)?", "accepted": ["do you come from"], "key_answer": "do you come from" },
        { "id": "d1b", "prefix": "I", "suffix": "(come from) Greece.", "accepted": ["come from", "come"], "key_answer": "come from" },
        { "id": "d2", "prefix": "2.", "suffix": "(a crocodile / climb) trees? No, of course not.", "accepted": ["Does a crocodile climb", "does a crocodile climb"], "key_answer": "Does a crocodile climb" },
        { "id": "d3a", "prefix": "3. What", "suffix": "(a doctor / do)?", "accepted": ["does a doctor do"], "key_answer": "does a doctor do" },
        { "id": "d3b", "prefix": "He/She", "suffix": "(work) in a hospital.", "accepted": ["works"], "key_answer": "works" },
        { "id": "d3c", "prefix": "and", "suffix": "(take care) of people who are ill.", "accepted": ["takes care"], "key_answer": "takes care" },
        { "id": "d4a", "prefix": "4. How often", "suffix": "(you / see) a dentist?", "accepted": ["do you see"], "key_answer": "do you see" },
        { "id": "d4b", "prefix": "I", "suffix": "(visit) my dentist once a year.", "accepted": ["visit"], "key_answer": "visit" },
        { "id": "d5a", "prefix": "5.", "suffix": "(people in Greece / celebrate) Christmas?", "accepted": ["Do people in Greece celebrate", "do people in Greece celebrate"], "key_answer": "Do people in Greece celebrate" },
        { "id": "d5b", "prefix": "People all over the world", "suffix": "(have) fun.", "accepted": ["have"], "key_answer": "have" },
        { "id": "d5c", "prefix": "and", "suffix": "(enjoy) themselves.", "accepted": ["enjoy"], "key_answer": "enjoy" },
        { "id": "d6a", "prefix": "6. Where", "suffix": "(a postman / work)?", "accepted": ["does a postman work"], "key_answer": "does a postman work" },
        { "id": "d6b", "prefix": "He", "suffix": "(work) at the Post Office.", "accepted": ["works"], "key_answer": "works" },
        { "id": "d6c", "prefix": "and", "suffix": "(deliver) letters all over the neighbourhood.", "accepted": ["delivers"], "key_answer": "delivers" }
      ]
    },
    {
      "id": "wb_diff_act_a_star",
      "number": "Differentiated Appendix • Activity A (*)",
      "title": "Hardware Anagrams & Matching",
      "page": 64,
      "type": "closed",
      "instruction": "Unscramble the letters to find the computer parts and match them with the pictures.",
      "gaps": [
        { "id": "diff_1", "prefix": "1. dbkyorea ->", "suffix": "", "accepted": ["keyboard"], "key_answer": "keyboard" },
        { "id": "diff_2", "prefix": "2. enrecs ->", "suffix": "", "accepted": ["screen"], "key_answer": "screen" },
        { "id": "diff_3", "prefix": "3. esumo ->", "suffix": "", "accepted": ["mouse"], "key_answer": "mouse" },
        { "id": "diff_4", "prefix": "4. icnerhmoop ->", "suffix": "", "accepted": ["microphone"], "key_answer": "microphone" },
        { "id": "diff_5", "prefix": "5. tperinr ->", "suffix": "", "accepted": ["printer"], "key_answer": "printer" }
      ]
    },
    {
      "id": "wb_diff_act_a_two_stars",
      "number": "Differentiated Appendix • Activity A (**)",
      "title": "Computer Sentences in Context",
      "page": 64,
      "type": "semi-open",
      "instruction": "Write a sentence for each computer word from Activity A (*). Model: 'I paint pictures on my computer and then I use the printer to copy them onto a paper.'",
      "items": [
        {
          "id": "two_star_1",
          "prompt": "1. keyboard",
          "accepted": ["keyboard"],
          "model_answer": "I use the keyboard to type emails to my friends."
        },
        {
          "id": "two_star_2",
          "prompt": "2. screen",
          "accepted": ["screen"],
          "model_answer": "I look at the computer screen to read messages."
        },
        {
          "id": "two_star_3",
          "prompt": "3. mouse",
          "accepted": ["mouse"],
          "model_answer": "Click on the icon using the computer mouse."
        },
        {
          "id": "two_star_4",
          "prompt": "4. microphone",
          "accepted": ["microphone"],
          "model_answer": "Speak into the microphone during our online chat."
        },
        {
          "id": "two_star_5",
          "prompt": "5. printer",
          "accepted": ["printer"],
          "model_answer": "Use the printer to print your school project on paper."
        }
      ]
    }
  ]
}

# Write JSON
with open('unit1/data/unit1_workbook_data.json', 'w', encoding='utf-8') as f:
    json.dump(wb_data, f, indent=2, ensure_ascii=False)

# Write JS Twin
with open('unit1/data/unit1_workbook_data.js', 'w', encoding='utf-8') as f:
    f.write('window.UNIT1_WORKBOOK_DATA = ' + json.dumps(wb_data, indent=2, ensure_ascii=False) + ';\n')

print("Successfully generated unit1/data/unit1_workbook_data.json and .js")
