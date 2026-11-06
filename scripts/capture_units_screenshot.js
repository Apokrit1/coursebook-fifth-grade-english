const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = edgePaths.find(p => fs.existsSync(p));
const outFile = path.resolve(__dirname, '..', 'screenshots', 'hub_unit_split_cards.png');

// Use a tall viewport to capture down into the units grid
spawnSync(browserPath, [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  '--window-size=1366,4200',
  `--screenshot=${outFile}`,
  'file:///' + path.resolve(__dirname, '..', 'warm_comic_modern/index.html').replace(/\\/g, '/')
], { timeout: 20000 });

if (fs.existsSync(outFile)) {
  console.log('Saved units grid screenshot:', outFile, fs.statSync(outFile).size);
}
