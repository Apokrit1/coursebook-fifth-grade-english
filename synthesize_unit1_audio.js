const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const NODE_MODULES = 'c:/photodentro/antigravity/vocabulary st/node_modules';
const { EdgeTTS } = require(path.join(NODE_MODULES, 'node-edge-tts'));
const googleTTS = require(path.join(NODE_MODULES, 'google-tts-api'));

const VOICES = {
  narrator: 'en-GB-SoniaNeural',
  kostas: 'en-GB-ThomasNeural', // Pupil Kostas (Greek male)
  mark: 'en-GB-RyanNeural',     // Pupil Mark (London male)
  nadine: 'en-GB-MaisieNeural'  // Pupil Nadine (young female)
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function synthesizeNeural(text, targetPath, voice = VOICES.narrator) {
  const clean = (text || '').trim();
  if (!clean) return;
  ensureDir(targetPath);
  const sidecar = targetPath.replace(/\.mp3$/i, '.txt');

  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 500 && fs.existsSync(sidecar)) {
    const existing = fs.readFileSync(sidecar, 'utf-8').trim();
    if (existing === clean) {
      console.log(`[SKIP NEURAL] ${path.basename(targetPath)}`);
      return;
    }
  }

  console.log(`[NEURAL] ${path.basename(targetPath)}: "${clean.slice(0, 40)}..."`);
  const tts = new EdgeTTS({ voice, lang: 'en-GB', outputFormat: 'audio-24khz-48kbitrate-mono-mp3' });
  await tts.ttsPromise(clean, targetPath);
  fs.writeFileSync(sidecar, clean, 'utf-8');
  await sleep(150);
}

async function synthesizeGoogle(text, targetPath) {
  const clean = (text || '').trim();
  if (!clean) return;
  ensureDir(targetPath);
  const sidecar = targetPath.replace(/\.mp3$/i, '.txt');

  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 500 && fs.existsSync(sidecar)) {
    const existing = fs.readFileSync(sidecar, 'utf-8').trim();
    if (existing === clean) {
      console.log(`[SKIP GOOGLE] ${path.basename(targetPath)}`);
      return;
    }
  }

  console.log(`[GOOGLE] ${path.basename(targetPath)}: "${clean.slice(0, 40)}..."`);
  try {
    const base64 = await googleTTS.getAudioBase64(clean, { lang: 'en', slow: false, timeout: 10000 });
    const buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync(targetPath, buffer);
    fs.writeFileSync(sidecar, clean, 'utf-8');
    await sleep(200);
  } catch (err) {
    console.error(`Google TTS failed for ${targetPath}:`, err.message);
    // Fallback to EdgeTTS if Google fails
    await synthesizeNeural(clean, targetPath, VOICES.narrator);
  }
}

async function main() {
  console.log('=== STARTING UNIT 1 AUDIO PIPELINE ===');

  const vocabPath = 'unit1/data/vocabulary_data.json';
  const vocab = JSON.parse(fs.readFileSync(vocabPath, 'utf-8'));
  console.log(`Loaded ${vocab.length} vocabulary items.`);

  // 1. Synthesize Vocabulary (Words, Definitions, Examples)
  for (const item of vocab) {
    const idStr = String(item.id).padStart(2, '0');

    // Neural
    await synthesizeNeural(item.word, `unit1/assets/audio_neural/words/${idStr}_word.mp3`);
    await synthesizeNeural(item.definition_en, `unit1/assets/audio_neural/defs/${idStr}_definition.mp3`);
    await synthesizeNeural(item.example, `unit1/assets/audio_neural/examples/${idStr}_example.mp3`);

    // Google Classic
    await synthesizeGoogle(item.word, `unit1/assets/audio/words/${idStr}_word.mp3`);
    await synthesizeGoogle(item.definition_en, `unit1/assets/audio/defs/${idStr}_definition.mp3`);
    await synthesizeGoogle(item.example, `unit1/assets/audio/examples/${idStr}_example.mp3`);
  }

  // 2. Synthesize Stories
  const v2Path = 'unit1/data/unit1_v2_data.json';
  const v2Data = JSON.parse(fs.readFileSync(v2Path, 'utf-8'));

  for (const story of v2Data.stories) {
    const targetPath = path.join('unit1', story.audio_file);
    await synthesizeNeural(story.narrative, targetPath, VOICES.narrator);
  }

  // 3. Synthesize Multi-Speaker Dialogue
  const dialogue = v2Data.grammar_lab.authentic_listening;
  if (dialogue && dialogue.dialogue_script) {
    const dialogueTargetPath = path.join('unit1', dialogue.audio_file);
    ensureDir(dialogueTargetPath);
    const tempParts = [];

    for (let i = 0; i < dialogue.dialogue_script.length; i++) {
      const turn = dialogue.dialogue_script[i];
      let voice = VOICES.narrator;
      if (turn.speaker.toLowerCase().includes('kostas')) voice = VOICES.kostas;
      else if (turn.speaker.toLowerCase().includes('mark')) voice = VOICES.mark;
      else if (turn.speaker.toLowerCase().includes('nadine')) voice = VOICES.nadine;

      const partPath = `unit1/assets/audio_v2/grammar/temp_turn_${i}.mp3`;
      await synthesizeNeural(turn.text, partPath, voice);
      tempParts.push(partPath);
    }

    // Concatenate turns using ffmpeg
    const concatList = tempParts.map(p => `file '${path.resolve(p).replace(/\\/g, '/')}'`).join('\n');
    const listPath = 'unit1/assets/audio_v2/grammar/concat_list.txt';
    fs.writeFileSync(listPath, concatList, 'utf-8');

    console.log(`[FFMPEG] Concatenating dialogue to ${dialogueTargetPath}...`);
    spawnSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-c', 'copy', dialogueTargetPath], { stdio: 'inherit', shell: true });

    // Sidecar for full dialogue
    const fullDialogueText = dialogue.dialogue_script.map(t => `${t.speaker}: ${t.text}`).join('\n');
    fs.writeFileSync(dialogueTargetPath.replace(/\.mp3$/i, '.txt'), fullDialogueText, 'utf-8');

    // Clean up temp parts
    tempParts.forEach(p => { if (fs.existsSync(p)) fs.unlinkSync(p); });
    if (fs.existsSync(listPath)) fs.unlinkSync(listPath);
  }

  console.log('=== UNIT 1 AUDIO PIPELINE COMPLETE ===');
}

main().catch(err => {
  console.error('Fatal audio pipeline error:', err);
  process.exit(1);
});
