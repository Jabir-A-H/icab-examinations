const fs = require('fs');
const path = require('path');
const cat = require('./catalog.js');

console.log('--- TEST 1: Catalog Ingestion ---');
console.log('CATALOG keys:', Object.keys(cat.CATALOG));
console.log('SESSIONS_ORDER length:', cat.SESSIONS_ORDER.length);

console.log('--- TEST 2: HTML File Existence & Size ---');
const htmlPath = path.join(__dirname, 'version-11-trend-radar.html');
if (!fs.existsSync(htmlPath)) {
  console.error('FAIL: version-11-trend-radar.html not found!');
  process.exit(1);
}
const content = fs.readFileSync(htmlPath, 'utf8');
console.log('HTML size:', content.length, 'characters');

console.log('--- TEST 3: Ecosystem Study Bar Check ---');
if (!content.includes('class="ui-study-bar"')) {
  console.error('FAIL: ui-study-bar class missing!');
  process.exit(1);
}
if (!content.includes('version-11-trend-radar.html" class="ui-study-link active"')) {
  console.error('FAIL: active link on version 11 missing!');
  process.exit(1);
}
console.log('PASS: Universal Study Bar with 11 active link verified.');

console.log('--- TEST 4: Embedded JS Syntax & Execution ---');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/i);
if (!scriptMatch) {
  console.error('FAIL: Embedded script missing!');
  process.exit(1);
}
const jsCode = scriptMatch[1];

// Mock minimal browser environment
global.window = {
  _keydownHandlers: [],
  addEventListener: (event, handler) => {
    if (event === 'DOMContentLoaded') global.window._onDOMContentLoaded = handler;
    if (event === 'keydown') global.window._keydownHandlers.push(handler);
  }
};
global.document = {
  addEventListener: () => {},
  getElementById: (id) => ({
    id,
    textContent: '',
    innerHTML: '',
    value: '',
    className: '',
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    style: {},
    setAttribute: () => {},
    getAttribute: () => '',
    appendChild: () => {},
    addEventListener: () => {}
  }),
  querySelectorAll: () => [],
  createElement: (tag) => ({
    tag,
    innerHTML: '',
    className: '',
    style: {},
    classList: { add: () => {}, remove: () => {} },
    appendChild: () => {},
    addEventListener: () => {}
  })
};
global.CATALOG = cat.CATALOG;
global.SYLLABUS_DOC = cat.SYLLABUS_DOC;
global.PAPER_CODES = cat.PAPER_CODES;
global.SESSIONS_ORDER = cat.SESSIONS_ORDER;
global.SUBJECT_ORDER = cat.SUBJECT_ORDER;

const m = { exports: {} };
const fn = new Function('module', 'exports', 'CATALOG', 'SYLLABUS_DOC', 'PAPER_CODES', 'SESSIONS_ORDER', 'SUBJECT_ORDER', jsCode);
fn(m, m.exports, cat.CATALOG, cat.SYLLABUS_DOC, cat.PAPER_CODES, cat.SESSIONS_ORDER, cat.SUBJECT_ORDER);
const app = m.exports;

console.log('--- TEST 5: getAllManuals() Verification ---');
const manuals = app.getAllManuals();
console.log('getAllManuals() count:', manuals.length);
if (manuals.length !== 21) {
  console.error('FAIL: Expected 21 manuals, got ' + manuals.length);
  process.exit(1);
}
console.log('PASS: 21 official manual artifacts ingested (20 study manuals + 2 IVS volumes + 1 syllabus).');

console.log('--- TEST 6: Radar Data Verification ---');
const radarPapers = Object.keys(app.SYLLABUS_RADAR);
console.log('Syllabus Radar Papers count:', radarPapers.length, radarPapers);
if (radarPapers.length < 5) {
  console.error('FAIL: Radar papers incomplete');
  process.exit(1);
}
console.log('PASS: All major papers covered in Syllabus Radar.');

console.log('--- TEST 7: Document Resolution ---');
const docAlpha = app.resolveDeckDocument('alpha');
const docBeta = app.resolveDeckDocument('beta');
console.log('Alpha initial doc:', docAlpha ? docAlpha.rel_path : 'null');
console.log('Beta initial doc:', docBeta ? docBeta.rel_path : 'null');
if (!docAlpha || !docBeta) {
  console.error('FAIL: Document resolution returned null');
  process.exit(1);
}
console.log('PASS: Deck documents resolved successfully.');

console.log('--- TEST 8: Presets & Flipping Engine ---');
app.activatePreset('q-vs-a');
console.log('Preset Q vs A: Alpha docType =', app.state.alpha.docType, 'Beta docType =', app.state.beta.docType);
if (app.state.alpha.docType !== 'question' || app.state.beta.docType !== 'answer') {
  console.error('FAIL: Q vs A preset docTypes incorrect');
  process.exit(1);
}

app.activatePreset('5yr-delta');
console.log('Preset 5yr Delta: Alpha diet =', app.state.alpha.diet, 'Beta diet =', app.state.beta.diet);
if (app.state.alpha.diet !== '2026-05_May' || app.state.beta.diet !== '2022-03_Mar-Apr') {
  console.error('FAIL: 5yr Delta diets incorrect');
  process.exit(1);
}

const beforeSwapAlpha = app.state.alpha.diet;
const beforeSwapBeta = app.state.beta.diet;
app.swapDecks();
console.log('Swap Decks: Alpha diet =', app.state.alpha.diet, 'Beta diet =', app.state.beta.diet);
if (app.state.alpha.diet !== beforeSwapBeta || app.state.beta.diet !== beforeSwapAlpha) {
  console.error('FAIL: Swap decks failed');
  process.exit(1);
}

app.syncDecks();
console.log('Sync Decks: Alpha diet =', app.state.alpha.diet, 'Beta diet =', app.state.beta.diet);
if (app.state.beta.diet !== app.state.alpha.diet) {
  console.error('FAIL: Sync decks failed');
  process.exit(1);
}

const beforeFlip = app.state.alpha.diet;
app.flipDiet('earlier');
console.log('Flip earlier: Before =', beforeFlip, 'After =', app.state.alpha.diet);
if (app.state.alpha.diet === beforeFlip) {
  console.error('FAIL: Flip earlier did not change diet');
  process.exit(1);
}

console.log('--- TEST 9: Ecosystem Link Integrity ---');
if (content.includes('version-10-statutory-reader.html')) {
  console.error('FAIL: Dead link to version-10-statutory-reader.html found!');
  process.exit(1);
}
if (!content.includes('version-10-audit-dossier.html')) {
  console.error('FAIL: Missing link to version-10-audit-dossier.html!');
  process.exit(1);
}
console.log('PASS: Version 10 link points to live version-10-audit-dossier.html.');

console.log('--- TEST 10: IVS & Custom Subject Preservation ---');
const ivsDoc = manuals.find(m => m.isIVS);
app.loadManualIntoDeck('alpha', encodeURIComponent(JSON.stringify(ivsDoc)));
if (app.state.alpha.subject !== 'International Valuation Standards (IVS)') {
  console.error('FAIL: IVS manual subject clobbered to:', app.state.alpha.subject);
  process.exit(1);
}
console.log('PASS: IVS manual loaded with accurate preserved subject.');

console.log('--- TEST 11: openManualForCurrentSubject Level Sync ---');
app.state.alpha.level = 'PL';
app.state.alpha.subject = 'Financial Accounting & Reporting';
app.state.radarSubject = 'Corporate Reporting';
app.openManualForCurrentSubject();
if (app.state.alpha.level !== 'AL' || app.state.alpha.subject !== 'Corporate Reporting') {
  console.error('FAIL: openManualForCurrentSubject failed level/subject sync:', app.state.alpha);
  process.exit(1);
}
console.log('PASS: Level automatically synced to AL when opening Corporate Reporting manual.');

console.log('--- TEST 12: onDeckLevelChange & swapDecks Radar Sync ---');
app.onDeckLevelChange('alpha', 'PL');
if (!app.state.radarSubject || app.state.radarSubject !== app.state.alpha.subject) {
  console.error('FAIL: onDeckLevelChange did not sync radarSubject:', app.state.radarSubject);
  process.exit(1);
}
app.state.alpha.subject = 'Audit & Assurance';
app.state.beta.subject = 'Corporate Reporting';
app.swapDecks();
if (app.state.radarSubject !== 'Corporate Reporting') {
  console.error('FAIL: swapDecks did not sync radarSubject to new Deck Alpha:', app.state.radarSubject);
  process.exit(1);
}
console.log('PASS: Radar subject stays synchronized with Deck Alpha on level change and deck swap.');

console.log('--- TEST 13: 1-Click Curriculum Module Filtering ---');
app.state.radarSubject = 'Financial Accounting & Reporting';
const farNotes = app.SYLLABUS_RADAR['Financial Accounting & Reporting'].trendNotes;
const m4Notes = farNotes.filter(n => n.moduleIds && n.moduleIds.includes('M4'));
const m3Notes = farNotes.filter(n => n.moduleIds && n.moduleIds.includes('M3'));
if (m4Notes.length === 0 || m3Notes.length === 0 || m4Notes.length === m3Notes.length) {
  console.error('FAIL: Module tagging invalid for FAR trend notes');
  process.exit(1);
}
console.log(`PASS: Module M4 matched ${m4Notes.length} questions, M3 matched ${m3Notes.length} questions.`);

console.log('--- TEST 14: Preset 4 (Manual vs Exam) Hotkey Flipping ---');
app.activatePreset('manual-vs-exam');
const initialBetaDiet = app.state.beta.diet;
app.flipDiet('earlier');
console.log('Preset 4 Flip earlier: Before =', initialBetaDiet, 'After =', app.state.beta.diet);
if (app.state.beta.diet === initialBetaDiet || app.state.alpha.docType !== 'manual') {
  console.error('FAIL: Preset 4 flip failed to update exam deck or modified manual deck docType');
  process.exit(1);
}
console.log('PASS: Preset 4 hotkey flip successfully advanced Deck Beta exam paper.');

console.log('--- TEST 15: Preset 2 (Q vs A) jumpToDiet Sync ---');
app.activatePreset('q-vs-a');
app.jumpToDiet('2024-07_Jul-Aug');
console.log('Preset 2 Jump: Alpha diet =', app.state.alpha.diet, 'Beta diet =', app.state.beta.diet);
if (app.state.alpha.diet !== '2024-07_Jul-Aug' || app.state.beta.diet !== '2024-07_Jul-Aug') {
  console.error('FAIL: jumpToDiet did not sync both decks in q-vs-a mode');
  process.exit(1);
}
console.log('PASS: jumpToDiet synchronized both decks in q-vs-a preset.');

console.log('--- TEST 16: syncDecks docType & customManual Sync ---');
app.state.alpha.docType = 'manual';
app.state.alpha.customManual = { title: 'Test Custom Manual' };
app.state.beta.docType = 'question';
app.state.beta.customManual = null;
app.syncDecks();
if (app.state.beta.docType !== 'manual' || !app.state.beta.customManual || app.state.beta.customManual.title !== 'Test Custom Manual') {
  console.error('FAIL: syncDecks did not copy docType or customManual:', app.state.beta);
  process.exit(1);
}
console.log('PASS: syncDecks synchronized docType and customManual.');

console.log('--- TEST 17: Custom Manual Reset on Subject/Level Change ---');
app.state.alpha.customManual = { title: 'IVS Volume 1' };
app.onDeckSubjectChange('alpha', 'Audit & Assurance');
if (app.state.alpha.customManual !== null) {
  console.error('FAIL: onDeckSubjectChange did not clear customManual');
  process.exit(1);
}
app.state.beta.customManual = { title: 'IVS Volume 2' };
app.onDeckLevelChange('beta', 'AL');
if (app.state.beta.customManual !== null) {
  console.error('FAIL: onDeckLevelChange did not clear customManual');
  process.exit(1);
}
console.log('PASS: customManual correctly reset to null on level and subject change.');

console.log('--- TEST 18: setDietDirect Resets Manual docType to Question ---');
app.state.alpha.docType = 'manual';
app.state.alpha.customManual = { title: 'Some Manual' };
app.setDietDirect('alpha', '2023-11_Nov-Dec');
if (app.state.alpha.docType !== 'question' || app.state.alpha.customManual !== null || app.state.alpha.diet !== '2023-11_Nov-Dec') {
  console.error('FAIL: setDietDirect did not reset manual docType to question:', app.state.alpha);
  process.exit(1);
}
console.log('PASS: setDietDirect reset manual docType to question and updated diet.');

console.log('--- TEST 19: IT Governance Archive Diets Ingestion ---');
const itgNotes = app.SYLLABUS_RADAR['IT Governance'].trendNotes;
if (itgNotes[0].diet !== '2024-07_Jul-Aug' || itgNotes[1].diet !== '2024-03_Mar-Apr') {
  console.error('FAIL: IT Governance trendNotes diets are not archive sittings:', itgNotes);
  process.exit(1);
}
const itgCat = cat.CATALOG['PL']['IT Governance'];
const hasJulAug = itgCat.some(s => s.session_tag === '2024-07_Jul-Aug');
const hasMarApr = itgCat.some(s => s.session_tag === '2024-03_Mar-Apr');
if (!hasJulAug || !hasMarApr) {
  console.error('FAIL: IT Governance archive diets do not resolve in CATALOG');
  process.exit(1);
}
console.log('PASS: IT Governance trendNotes point to valid archive catalog diets (2024-07 & 2024-03).');

console.log('--- TEST 20: Module Progress Bar 1:1 Scaling & Flipper Arrow Layout ---');
if (content.includes('style="width: ${mod.weight * 2.5}%;"')) {
  console.error('FAIL: 2.5x multiplier still present in module progress bar!');
  process.exit(1);
}
if (!content.includes('style="width: ${mod.weight}%;"')) {
  console.error('FAIL: 1:1 module weight progress bar missing!');
  process.exit(1);
}
if (!content.includes('&larr; Later') || !content.includes('Earlier &rarr;')) {
  console.error('FAIL: Timeline flipper arrows not aligned with chronology!');
  process.exit(1);
}
console.log('PASS: 1:1 progress scaling and chronological timeline flipper order verified.');

console.log('--- TEST 21: Escape Key Handling (Radar Drawer & Fullscreen Split) ---');
if (global.window._onDOMContentLoaded) {
  global.window._onDOMContentLoaded();
}
if (global.window._keydownHandlers.length === 0) {
  console.error('FAIL: Keydown handler not registered!');
  process.exit(1);
}
const fireEscape = () => {
  global.window._keydownHandlers.forEach(h => h({ key: 'Escape', target: { tagName: 'BODY' }, preventDefault: () => {} }));
};

// Sub-test A: Close Radar Drawer if open
app.state.radarDrawerOpen = true;
fireEscape();
if (app.state.radarDrawerOpen !== false) {
  console.error('FAIL: Escape did not close open Radar Drawer!');
  process.exit(1);
}

// Sub-test B: Reset fullscreen split to 50-50 when drawer is closed
app.state.radarDrawerOpen = false;
app.state.workbenchSplit = 'full-alpha';
fireEscape();
if (app.state.workbenchSplit !== '50-50') {
  console.error('FAIL: Escape did not reset fullscreen split to 50-50!');
  process.exit(1);
}
console.log('PASS: Escape key correctly closes Radar Drawer and resets fullscreen focus to 50-50.');

console.log('--- TEST 22: onDietRibbonCardClick in Preset 4 (Manual vs Exam) ---');
app.activatePreset('manual-vs-exam');
app.onDietRibbonCardClick('2024-07_Jul-Aug');
if (app.state.beta.diet !== '2024-07_Jul-Aug' || app.state.alpha.docType !== 'manual') {
  console.error('FAIL: onDietRibbonCardClick did not update Deck Beta diet in manual-vs-exam preset:', app.state);
  process.exit(1);
}
// Swapped case
app.swapDecks();
app.onDietRibbonCardClick('2023-11_Nov-Dec');
if (app.state.alpha.diet !== '2023-11_Nov-Dec' || app.state.beta.docType !== 'manual') {
  console.error('FAIL: onDietRibbonCardClick did not update Deck Alpha diet when swapped in manual-vs-exam preset:', app.state);
  process.exit(1);
}
console.log('PASS: onDietRibbonCardClick correctly updates exam deck in Preset 4 both default and swapped.');

console.log('--- TEST 23: onDeckDietChange Resets Manual docType to Question ---');
app.state.alpha.docType = 'manual';
app.state.alpha.customManual = { title: 'Test Manual' };
app.onDeckDietChange('alpha', '2025-05_May');
if (app.state.alpha.docType !== 'question' || app.state.alpha.customManual !== null || app.state.alpha.diet !== '2025-05_May') {
  console.error('FAIL: onDeckDietChange did not reset manual docType to question:', app.state.alpha);
  process.exit(1);
}
console.log('PASS: onDeckDietChange reset manual docType to question and cleared customManual.');

console.log('--- TEST 24: loadExamQuestionFromRadar Clears customManual ---');
app.state.alpha.customManual = { title: 'Stale Manual' };
app.state.radarSubject = 'Financial Accounting & Reporting';
app.loadExamQuestionFromRadar('2026-05_May', 'alpha');
if (app.state.alpha.customManual !== null) {
  console.error('FAIL: loadExamQuestionFromRadar did not clear customManual on alpha:', app.state.alpha);
  process.exit(1);
}
app.state.beta.customManual = { title: 'Stale Manual Beta' };
app.loadExamQuestionFromRadar('2025-11_Nov-Dec', 'beta');
if (app.state.beta.customManual !== null) {
  console.error('FAIL: loadExamQuestionFromRadar did not clear customManual on beta:', app.state.beta);
  process.exit(1);
}
console.log('PASS: loadExamQuestionFromRadar cleanly resets customManual on both decks.');

console.log('--- TEST 25: loadManualIntoDeck Syncs radarSubject for Syllabus Papers ---');
const crManual = manuals.find(m => m.subject === 'Corporate Reporting');
app.loadManualIntoDeck('alpha', encodeURIComponent(JSON.stringify(crManual)));
if (app.state.radarSubject !== 'Corporate Reporting') {
  console.error('FAIL: loadManualIntoDeck did not sync radarSubject for Corporate Reporting:', app.state.radarSubject);
  process.exit(1);
}
console.log('PASS: loadManualIntoDeck correctly syncs radarSubject for syllabus manuals.');

console.log('--- ALL 25 VERIFICATION GATES PASSED CLEANLY! ---');
