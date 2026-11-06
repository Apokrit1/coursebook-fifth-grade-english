const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = edgePaths.find(p => fs.existsSync(p));
console.log('Selected browser:', browserPath);

if (!browserPath) {
  console.error('No headless browser found');
  process.exit(1);
}

const targets = [
  {
    name: 'hub_desktop',
    file: 'warm_comic_modern/index.html',
    width: 1366,
    height: 768
  },
  {
    name: 'hub_mobile',
    file: 'warm_comic_modern/index.html',
    width: 375,
    height: 812
  },
  {
    name: 'unit1_v2_classic_fixed',
    file: 'unit1/v2.html',
    width: 1366,
    height: 768
  },
  {
    name: 'unit1_comic_coursebook',
    file: 'warm_comic_modern/unit1/index.html',
    width: 1366,
    height: 768
  },
  {
    name: 'unit2_comic_coursebook',
    file: 'warm_comic_modern/unit2/index.html',
    width: 1366,
    height: 768
  }
];

const outDir = path.resolve(__dirname, '..', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

targets.forEach(t => {
  const filePath = path.resolve(__dirname, '..', t.file);
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
  const outFile = path.join(outDir, `${t.name}.png`);
  
  console.log(`Capturing ${t.name} (${t.width}x${t.height}) from ${t.file}...`);
  const res = spawnSync(browserPath, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    `--window-size=${t.width},${t.height}`,
    `--screenshot=${outFile}`,
    fileUrl
  ], { timeout: 15000 });
  
  if (fs.existsSync(outFile)) {
    const size = fs.statSync(outFile).size;
    console.log(`[OK] Saved ${outFile} (${size} bytes)`);
  } else {
    console.error(`[FAIL] Could not capture ${t.name}`, res.stderr?.toString());
  }
});

