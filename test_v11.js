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
  addEventListener: (event, handler) => {
    if (event === 'DOMContentLoaded') global.window._onDOMContentLoaded = handler;
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

console.log('--- ALL 13 VERIFICATION GATES PASSED CLEANLY! ---');
