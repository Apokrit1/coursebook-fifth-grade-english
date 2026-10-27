const http = require('http');

const urls = [
  'http://localhost:8080/index.html',
  'http://localhost:8080/portal.html',
  'http://localhost:8080/portal.js',
  'http://localhost:8080/portal.css',
  'http://localhost:8080/data/coursebook_catalog.json',
  'http://localhost:8080/data/coursebook_catalog.js',
  'http://localhost:8080/unit2/index.html',
  'http://localhost:8080/unit2/v2.html',
  'http://localhost:8080/unit2/app.js',
  'http://localhost:8080/unit2/app_v2.js',
  'http://localhost:8080/unit2/style.css',
  'http://localhost:8080/unit2/style_v2.css',
  'http://localhost:8080/unit2/data/vocabulary_data.json',
  'http://localhost:8080/unit2/data/vocabulary_data.js',
  'http://localhost:8080/unit2/data/unit2_v2_data.json',
  'http://localhost:8080/unit2/data/unit2_v2_data.js',
  'http://localhost:8080/unit2/data/unit2_workbook_data.json',
  'http://localhost:8080/unit2/data/unit2_workbook_data.js',
  'http://localhost:8080/unit2/assets/images_v2/school_newspaper.svg',
  'http://localhost:8080/unit2/assets/images_v2/school_life.svg',
  'http://localhost:8080/unit2/assets/images_v2/sports_habits.svg',
  'http://localhost:8080/unit2/assets/images_v2/world_customs.svg',
  'http://localhost:8080/unit2/assets/audio/words/01_word.mp3',
  'http://localhost:8080/unit2/assets/audio/words/01_word.txt',
  'http://localhost:8080/unit2/assets/audio/defs/01_definition.mp3',
  'http://localhost:8080/unit2/assets/audio/defs/01_definition.txt',
  'http://localhost:8080/unit2/assets/audio/examples/01_example.mp3',
  'http://localhost:8080/unit2/assets/audio/examples/01_example.txt',
  'http://localhost:8080/unit2/assets/audio_v2/stories/school_newspaper.mp3',
  'http://localhost:8080/unit2/assets/audio_v2/stories/school_newspaper.txt',
  'http://localhost:8080/unit2/assets/audio_v2/grammar/dialogue_unit2.mp3',
  'http://localhost:8080/unit2/assets/audio_v2/grammar/dialogue_unit2.txt',
  'http://localhost:8080/photodentro_apps/Present_Simple_and_Present_Continuous_for_younger_children_v2.0%20opencode/index.html'
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, length: data.length });
      });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log('=== VERIFYING HTTP ENDPOINTS ===\n');
  let passed = 0;
  let failed = 0;

  for (const url of urls) {
    const res = await fetchUrl(url);
    if (res.status === 200 && res.length > 0) {
      console.log(`[PASS] ${res.status} (${res.length} bytes): ${url}`);
      passed++;
    } else {
      console.error(`[FAIL] ${res.status}: ${url} ${res.error || ''}`);
      failed++;
    }
  }

  console.log(`\n=======================================================`);
  console.log(`HTTP ENDPOINT SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`=======================================================`);

  if (failed > 0) process.exit(1);
}

run();
