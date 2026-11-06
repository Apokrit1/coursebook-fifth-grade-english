const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== OPTIMIZING AND GENERATING WEBP VOCABULARY ASSETS ===');

// --- Unit 1 Vocabulary ---
const u1Dir = path.resolve('unit1/assets/images');
const u1Map = {
  '01_computer.webp': 'C:/Users/user/.gemini/antigravity/brain/b8ca6b31-78af-493b-a838-87a8f20d4e8a/u1_desktop_computer_1793956925944.jpg',
  '02_screen.webp': 'photodentro_apps/picture_dictionary_computer_parts_v2.0/assets/images/screen.jpg',
  '03_mouse.webp': 'photodentro_apps/picture_dictionary_computer_parts_v2.0/assets/images/mouse.jpg',
  '04_keyboard.webp': 'photodentro_apps/picture_dictionary_computer_parts_v2.0/assets/images/keyboard.jpg',
  '05_printer.webp': 'photodentro_apps/picture_dictionary_computer_parts_v2.0/assets/images/printer.jpg',
  '06_scanner.webp': 'photodentro_apps/picture_dictionary_computer_parts_v2.0/assets/images/scanner.jpg',
  '07_tower.webp': 'photodentro_apps/picture_dictionary_computer_parts_v2.0/assets/images/tower.jpg',
  '08_microphone.webp': 'photodentro_apps/picture_dictionary_computer_parts_v2.0/assets/images/microphone.jpg',
  '09_headphones.webp': 'photodentro_apps/picture_dictionary_computer_parts_v2.0/assets/images/headphones.jpg',
  '10_speaker.webp': 'photodentro_apps/picture_dictionary_computer_parts_v2.0/assets/images/speaker.jpg',
  '11_online_comm.webp': 'C:/Users/user/.gemini/antigravity/brain/b8ca6b31-78af-493b-a838-87a8f20d4e8a/u1_email_chat_1793956926885.jpg',
  '20_free_time.webp': 'unit1/assets/images_v2/kostas_computer.webp',
  '31_school_study.webp': 'C:/Users/user/.gemini/antigravity/brain/b8ca6b31-78af-493b-a838-87a8f20d4e8a/u1_school_study_1793956927394.jpg',
  '37_geography_friends.webp': 'unit1/assets/images_v2/european_friends.webp',
  '44_british_isles.webp': 'unit1/assets/images_v2/british_isles.webp'
};

for (const [outName, src] of Object.entries(u1Map)) {
  const target = path.join(u1Dir, outName);
  execSync(`ffmpeg -y -i "${src}" -vf "scale=480:-2" -c:v libwebp -quality 60 "${target}"`);
  console.log(`[U1] ${outName}: ${fs.statSync(target).size} bytes`);
}

// Update unit1 vocabulary_data.json
const u1VocabPath = path.resolve('unit1/data/vocabulary_data.json');
const u1Vocab = JSON.parse(fs.readFileSync(u1VocabPath, 'utf8'));

u1Vocab.forEach(item => {
  const id = item.id;
  if (id === 1) item.image = 'assets/images/01_computer.webp';
  else if (id === 2) item.image = 'assets/images/02_screen.webp';
  else if (id === 3) item.image = 'assets/images/03_mouse.webp';
  else if (id === 4) item.image = 'assets/images/04_keyboard.webp';
  else if (id === 5) item.image = 'assets/images/05_printer.webp';
  else if (id === 6) item.image = 'assets/images/06_scanner.webp';
  else if (id === 7) item.image = 'assets/images/07_tower.webp';
  else if (id === 8) item.image = 'assets/images/08_microphone.webp';
  else if (id === 9) item.image = 'assets/images/09_headphones.webp';
  else if (id === 10) item.image = 'assets/images/10_speaker.webp';
  else if (id >= 11 && id <= 19) item.image = 'assets/images/11_online_comm.webp';
  else if (id >= 20 && id <= 30) item.image = 'assets/images/20_free_time.webp';
  else if (id >= 31 && id <= 36) item.image = 'assets/images/31_school_study.webp';
  else if (id >= 37 && id <= 43) item.image = 'assets/images/37_geography_friends.webp';
  else if (id >= 44 && id <= 62) item.image = 'assets/images/44_british_isles.webp';
});

fs.writeFileSync(u1VocabPath, JSON.stringify(u1Vocab, null, 2), 'utf8');
fs.writeFileSync(path.resolve('unit1/data/vocabulary_data.js'), 'window.VOCABULARY_DATA = ' + JSON.stringify(u1Vocab, null, 2) + ';\n', 'utf8');
console.log('Synchronized unit1 vocabulary_data.json & vocabulary_data.js');

// --- Unit 2 Vocabulary ---
const u2Dir = path.resolve('unit2/assets/images');
const u2Map = {
  'school_newspaper.webp': 'unit2/assets/images_v2/school_newspaper.webp',
  'school_canteen.webp': 'unit2/assets/images/school_canteen.jpg',
  'school_playground.webp': 'unit2/assets/images/school_playground.jpg',
  'library.webp': 'unit2/assets/images/library.jpg',
  'classroom.webp': 'unit2/assets/images/classroom.jpg',
  'school_bus.webp': 'unit2/assets/images/school_bus.jpg',
  'invitation_menu.webp': 'unit2/assets/images/invitation_menu.jpg',
  'headmistress.webp': 'unit2/assets/images/headmistress.jpg',
  'feelings.webp': 'unit2/assets/images/feelings.jpg',
  'snacks.webp': 'unit2/assets/images/snacks.jpg',
  'croissant.webp': 'unit2/assets/images/croissant.jpg',
  'breakfast.webp': 'unit2/assets/images/breakfast.jpg',
  'subjects.webp': 'unit2/assets/images/subjects.jpg',
  'science.webp': 'unit2/assets/images/science.jpg',
  'sports_habits.webp': 'unit2/assets/images_v2/sports_habits.webp',
  'frequency_routines.webp': 'unit2/assets/images/frequency_routines.jpg',
  'world_customs.webp': 'unit2/assets/images_v2/world_customs.webp'
};

for (const [outName, src] of Object.entries(u2Map)) {
  const target = path.join(u2Dir, outName);
  execSync(`ffmpeg -y -i "${src}" -vf "scale=480:-2" -c:v libwebp -quality 60 "${target}"`);
  console.log(`[U2] ${outName}: ${fs.statSync(target).size} bytes`);
}

// Update unit2 vocabulary_data.json
const u2VocabPath = path.resolve('unit2/data/vocabulary_data.json');
const u2Vocab = JSON.parse(fs.readFileSync(u2VocabPath, 'utf8'));

u2Vocab.forEach(item => {
  const id = item.id;
  if (id === 1) item.image = 'assets/images/school_newspaper.webp';
  else if (id === 2) item.image = 'assets/images/school_canteen.webp';
  else if (id === 3) item.image = 'assets/images/school_playground.webp';
  else if (id === 4) item.image = 'assets/images/library.webp';
  else if (id === 5) item.image = 'assets/images/classroom.webp';
  else if (id === 6) item.image = 'assets/images/school_bus.webp';
  else if (id === 7 || id === 8) item.image = 'assets/images/invitation_menu.webp';
  else if (id === 9) item.image = 'assets/images/headmistress.webp';
  else if (id === 10) item.image = 'assets/images/school_newspaper.webp';
  else if (id >= 11 && id <= 22) item.image = 'assets/images/feelings.webp';
  else if (id === 23 || id === 24) item.image = 'assets/images/snacks.webp';
  else if (id === 25 || id === 26) item.image = 'assets/images/croissant.webp';
  else if (id >= 27 && id <= 34) item.image = 'assets/images/breakfast.webp';
  else if (id >= 35 && id <= 38) item.image = 'assets/images/subjects.webp';
  else if (id === 39) item.image = 'assets/images/science.webp';
  else if (id >= 40 && id <= 42) item.image = 'assets/images/subjects.webp';
  else if (id >= 43 && id <= 54) item.image = 'assets/images/sports_habits.webp';
  else if (id >= 55 && id <= 63) item.image = 'assets/images/frequency_routines.webp';
  else if (id >= 64 && id <= 72) item.image = 'assets/images/world_customs.webp';
});

fs.writeFileSync(u2VocabPath, JSON.stringify(u2Vocab, null, 2), 'utf8');
fs.writeFileSync(path.resolve('unit2/data/vocabulary_data.js'), 'window.VOCABULARY_DATA = ' + JSON.stringify(u2Vocab, null, 2) + ';\n', 'utf8');
console.log('Synchronized unit2 vocabulary_data.json & vocabulary_data.js');

