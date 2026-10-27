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

async function synthesizeText(text, targetPath) {
  const clean = (text || '').trim();
  if (!clean) return;
  ensureDir(targetPath);
  const sidecar = targetPath.replace(/\.mp3$/i, '.txt');

  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 500 && fs.existsSync(sidecar)) {
    const existing = fs.readFileSync(sidecar, 'utf-8').trim();
    if (existing === clean) {
      return;
    }
  }

  process.stdout.write(`Synthesizing: ${path.basename(targetPath)}...\r`);
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
    await sleep(80);
  } catch (err) {
    console.error(`\nTTS failed for ${targetPath}:`, err.message);
  }
}

const { EdgeTTS } = require('c:/photodentro/antigravity/coursebook6th/unit1/node_modules/node-edge-tts');

async function synthesizeNeural(text, targetPath, maxRetries = 4) {
  const clean = (text || '').trim();
  if (!clean) return;
  ensureDir(targetPath);
  const sidecar = targetPath.replace(/\.mp3$/i, '.txt');

  // Skip if already synthesized with genuine neural voice (checked by sidecar marker or size)
  const marker = targetPath + '.neural';
  if (fs.existsSync(targetPath) && fs.existsSync(marker)) {
    return;
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      process.stdout.write(`Synthesizing Neural (try ${attempt}): ${path.basename(targetPath)}...\r`);
      const tts = new EdgeTTS({ voice: 'en-GB-SoniaNeural', lang: 'en-GB', outputFormat: 'audio-24khz-48kbitrate-mono-mp3', timeout: 12000 });
      await tts.ttsPromise(clean, targetPath);
      fs.writeFileSync(sidecar, clean, 'utf-8');
      fs.writeFileSync(marker, 'sonia-neural-v2', 'utf-8');
      await sleep(350);
      return;
    } catch (err) {
      if (attempt === maxRetries) {
        console.error(`\nNeural TTS failed for ${targetPath}:`, err.message);
      } else {
        await sleep(1200 * attempt);
      }
    }
  }
}

async function main() {
  console.log('=== STARTING UNIT 2 AUDIO SYNTHESIS ===');

  const vocabPath = 'unit2/data/vocabulary_data.json';
  const vocab = JSON.parse(fs.readFileSync(vocabPath, 'utf-8'));
  console.log(`Loaded ${vocab.length} vocabulary items.`);

  // 1. Synthesize Vocabulary (Words, Definitions, Examples)
  for (let i = 0; i < vocab.length; i++) {
    const item = vocab[i];
    const idStr = String(item.id).padStart(2, '0');

    // Standard audio (Classic Google TTS)
    await synthesizeText(item.word, `unit2/assets/audio/words/${idStr}_word.mp3`);
    await synthesizeText(item.definition_en, `unit2/assets/audio/defs/${idStr}_definition.mp3`);
    await synthesizeText(item.example, `unit2/assets/audio/examples/${idStr}_example.mp3`);

    // Natural Neural AI Voice (en-GB-SoniaNeural)
    await synthesizeNeural(item.word, `unit2/assets/audio_neural/words/${idStr}_word.mp3`);
    await synthesizeNeural(item.definition_en, `unit2/assets/audio_neural/defs/${idStr}_definition.mp3`);
    await synthesizeNeural(item.example, `unit2/assets/audio_neural/examples/${idStr}_example.mp3`);
  }
  console.log('\nVocabulary audio synthesis complete!');

  // 2. Synthesize Stories
  const v2Path = 'unit2/data/unit2_v2_data.json';
  const v2Data = JSON.parse(fs.readFileSync(v2Path, 'utf-8'));

  for (const story of v2Data.stories) {
    const targetPath = path.join('unit2', story.audio_file);
    await synthesizeText(story.narrative, targetPath);
  }
  console.log('\nStory narratives audio synthesis complete!');

  // 3. Synthesize Multi-Speaker Dialogue
  const dialogue = v2Data.grammar_lab.authentic_listening;
  if (dialogue && dialogue.dialogue_script) {
    const dialogueTargetPath = path.join('unit2', dialogue.audio_file);
    const fullDialogueText = dialogue.dialogue_script.map(t => `${t.speaker}: ${t.text}`).join('\n');
    await synthesizeText(fullDialogueText, dialogueTargetPath);
    console.log('\nDialogue audio synthesis complete!');
  }

  // Clean temp test file if exists
  if (fs.existsSync('tmp_test_audio.mp3')) fs.unlinkSync('tmp_test_audio.mp3');

  console.log('\n=== UNIT 2 AUDIO PIPELINE SUCCESSFULLY COMPLETED ===');
}

main().catch(err => {
  console.error('Fatal audio pipeline error:', err);
  process.exit(1);
});
