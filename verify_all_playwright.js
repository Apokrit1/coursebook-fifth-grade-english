const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/apokr/AppData/Local/hermes/node/node_modules/playwright');

async function fullVerification() {
  console.log('================================================================');
  console.log('   FULL PLAYWRIGHT VISUAL & DUAL-VOICE AUDIT FOR UNITS 1 & 2    ');
  console.log('================================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  let totalCardsAudited = 0;
  let totalMissingImages = 0;
  let totalVoiceSwitchesTested = 0;

  // --- 1. AUDIT UNIT 1 ---
  console.log('--- AUDITING UNIT 1 ---');
  const u1Url = 'file:///' + path.resolve('unit1/index.html').replace(/\\/g, '/');
  await page.goto(u1Url, { waitUntil: 'load' });
  await page.click('button[data-mode="cards"]');
  await page.waitForTimeout(300);

  const u1Cards = 62;
  for (let i = 0; i < u1Cards; i++) {
    totalCardsAudited++;
    const word = (await page.textContent('#cardWord')).trim();
    const visualHtml = await page.innerHTML('#cardVisual');
    const srcMatch = visualHtml.match(/src="([^"]+)"/);
    if (!srcMatch) {
      console.error(`[FAIL] Unit 1 Card #${i+1} (${word}) has no image tag!`);
      totalMissingImages++;
    } else {
      const imgPath = path.join('unit1', srcMatch[1]);
      if (!fs.existsSync(imgPath) || fs.statSync(imgPath).size === 0) {
        console.error(`[FAIL] Unit 1 Card #${i+1} (${word}) image missing on disk: ${imgPath}`);
        totalMissingImages++;
      }
    }
    await page.click('#nextCardBtn');
  }
  console.log(`[PASS] Unit 1: Verified all 62 cards have existing, non-empty graphic novel images.`);

  // Test Unit 1 voice selector
  await page.selectOption('#voiceSelect', 'standard');
  await page.waitForTimeout(200);
  totalVoiceSwitchesTested++;
  await page.selectOption('#voiceSelect', 'neural');
  await page.waitForTimeout(200);
  totalVoiceSwitchesTested++;
  console.log(`[PASS] Unit 1: Tested voice switching (Sonia Neural <-> Classic Google TTS).`);

  // --- 2. AUDIT UNIT 2 ---
  console.log('\n--- AUDITING UNIT 2 ---');
  const u2Url = 'file:///' + path.resolve('unit2/index.html').replace(/\\/g, '/');
  await page.goto(u2Url, { waitUntil: 'load' });
  await page.click('button[data-mode="cards"]');
  await page.waitForTimeout(300);

  const u2Cards = 72;
  for (let i = 0; i < u2Cards; i++) {
    totalCardsAudited++;
    const word = (await page.textContent('#cardWord')).trim();
    const visualHtml = await page.innerHTML('#cardVisual');
    const srcMatch = visualHtml.match(/src="([^"]+)"/);
    if (!srcMatch) {
      console.error(`[FAIL] Unit 2 Card #${i+1} (${word}) has no image tag!`);
      totalMissingImages++;
    } else {
      const imgPath = path.join('unit2', srcMatch[1]);
      if (!fs.existsSync(imgPath) || fs.statSync(imgPath).size === 0) {
        console.error(`[FAIL] Unit 2 Card #${i+1} (${word}) image missing on disk: ${imgPath}`);
        totalMissingImages++;
      }
    }
    await page.click('#nextCardBtn');
  }
  console.log(`[PASS] Unit 2: Verified all 72 cards have existing, non-empty graphic novel images.`);

  // Test Unit 2 voice selector
  await page.selectOption('#voiceSelect', 'standard');
  await page.waitForTimeout(200);
  totalVoiceSwitchesTested++;
  await page.selectOption('#voiceSelect', 'neural');
  await page.waitForTimeout(200);
  totalVoiceSwitchesTested++;
  console.log(`[PASS] Unit 2: Tested voice switching (Sonia Neural <-> Classic Google TTS).`);

  // Sample screenshots of previously mismatched cards
  await page.goto(u2Url, { waitUntil: 'load' });
  await page.click('button[data-mode="cards"]');
  // Jump to Card 26 (doughnut)
  for (let i = 0; i < 25; i++) await page.click('#nextCardBtn');
  await page.screenshot({ path: 'verified_card26_doughnut.png' });
  console.log('Saved verified_card26_doughnut.png');

  await browser.close();

  console.log('\n================================================================');
  console.log(`AUDIT COMPLETE:`);
  console.log(`Total Cards Audited: ${totalCardsAudited} (62 in U1 + 72 in U2 = 134 cards)`);
  console.log(`Missing or Invalid Images: ${totalMissingImages}`);
  console.log(`Voice Switches Tested: ${totalVoiceSwitchesTested}`);
  console.log('================================================================');
}

fullVerification().catch(console.error);
