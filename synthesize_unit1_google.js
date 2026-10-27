const fs = require('fs');
const path = require('path');

const NODE_MODULES = 'c:/photodentro/antigravity/vocabulary st/node_modules';
const googleTTS = require(path.join(NODE_MODULES, 'google-tts-api'));

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function synthesizeGoogle(text, targetPath) {
  const clean = (text || '').trim();
  if (!clean) return;
  ensureDir(targetPath);
  const sidecar = targetPath.replace(/\.mp3$/i, '.txt');

  try {
    if (clean.length <= 180) {
      const base64 = await googleTTS.getAudioBase64(clean, { lang: 'en', slow: false, timeout: 10000 });
      const buffer = Buffer.from(base64, 'base64');
      fs.writeFileSync(targetPath, buffer);
    } else {
      const chunks = await googleTTS.getAllAudioBase64(clean, { timeout: 15000 });
      const buffers = chunks.map(c => Buffer.from(c.base64, 'base64'));
      fs.writeFileSync(targetPath, Buffer.concat(buffers));
    }
    fs.writeFileSync(sidecar, clean, 'utf-8');
    await sleep(90);
  } catch (err) {
    console.error(`Google TTS failed for ${targetPath}:`, err.message);
  }
}

async function main() {
  console.log('=== SYNTHESIZING UNIT 1 GOOGLE CLASSIC TTS ===');
  const vocab = JSON.parse(fs.readFileSync('unit1/data/vocabulary_data.json', 'utf-8'));
  console.log(`Loaded ${vocab.length} items from unit1 vocabulary.`);

  let count = 0;
  for (const item of vocab) {
    const id = String(item.id).padStart(2, '0');
    
    await synthesizeGoogle(item.word, `unit1/assets/audio/words/${id}_word.mp3`);
    count++;
    await synthesizeGoogle(item.definition_en, `unit1/assets/audio/defs/${id}_definition.mp3`);
    count++;
    await synthesizeGoogle(item.example, `unit1/assets/audio/examples/${id}_example.mp3`);
    count++;
    
    if (count % 15 === 0) {
      console.log(`Synthesized ${count} / ${vocab.length * 3} audio clips...`);
    }
  }

  console.log(`=== FINISHED! Total synthesized: ${count} / ${vocab.length * 3} ===`);
}

main().catch(console.error);
