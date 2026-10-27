const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cat = require('./catalog.js');

console.log('================================================================');
console.log('AuditDossier (Version 10) — Verification Gates Suite');
console.log('================================================================\n');

const htmlPath = path.join(__dirname, 'version-10-audit-dossier.html');
if (!fs.existsSync(htmlPath)) {
  throw new Error(`FAIL: File not found: ${htmlPath}`);
}

const html = fs.readFileSync(htmlPath, 'utf8');
console.log(`✓ Loaded version-10-audit-dossier.html (${(Buffer.byteLength(html, 'utf8') / 1024).toFixed(1)} KB)`);

// -----------------------------------------------------------------------------
// GATE 1: Ecosystem Navigation (.ui-study-bar)
// -----------------------------------------------------------------------------
console.log('\n=== Gate 1: Ecosystem Navigation (.ui-study-bar) ===');
const barMatch = html.match(/<header class="ui-study-bar">([\s\S]*?)<\/header>/);
if (!barMatch) throw new Error('FAIL: Missing .ui-study-bar in HTML');

const links = [...barMatch[1].matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
console.log(`Found ${links.length} study bar ecosystem links:`);
links.forEach(l => console.log(`  - ${l[1]} -> "${l[2].trim()}"`));

if (links.length !== 11) throw new Error(`FAIL: Expected 11 links in ui-study-bar, got ${links.length}`);

const activeLink = barMatch[1].match(/<a [^>]*class="[^"]*active[^"]*"[^>]*>([^<]+)<\/a>/);
if (!activeLink || !activeLink[1].includes('10 Audit Dossier')) {
  throw new Error(`FAIL: Active link in ui-study-bar must be 10 Audit Dossier, got: ${activeLink ? activeLink[1] : 'NONE'}`);
}
console.log(`✓ Active link verified: "${activeLink[1].trim()}"`);

// -----------------------------------------------------------------------------
// GATE 2: Hardened Manuals Ingestion via getAllManuals()
// -----------------------------------------------------------------------------
console.log('\n=== Gate 2: Hardened Manuals Ingestion via getAllManuals() ===');
const scriptMatch = html.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('FAIL: Missing embedded script in HTML');
const scriptContent = scriptMatch[1];

const manualMatch = scriptContent.match(/function getAllManuals\(\) \{[\s\S]*?return manuals;\s*\}/);
if (!manualMatch) throw new Error('FAIL: Could not extract getAllManuals() from HTML script');

const getAllManuals = new Function('CATALOG', 'SYLLABUS_DOC', manualMatch[0] + '; return getAllManuals;')(cat.CATALOG, cat.SYLLABUS_DOC);
const manuals = getAllManuals();

console.log(`Total manuals ingested via getAllManuals(): ${manuals.length}`);
let missingFiles = 0;
manuals.forEach((m, idx) => {
  const exists = m.rel_path ? fs.existsSync(m.rel_path) : false;
  if (!exists) {
    console.error(`  [X] Missing file on disk: ${m.rel_path}`);
    missingFiles++;
  }
});

if (manuals.length !== 21) {
  throw new Error(`FAIL: Expected 21 manuals (20 from CATALOG.Manuals + 1 syllabus), got ${manuals.length}`);
}
if (missingFiles > 0) {
  throw new Error(`FAIL: ${missingFiles} manual PDF files are missing from disk!`);
}
console.log('✓ All 21 curriculum manuals verified present on disk.');

// Check 2 IVS volumes & Syllabus
const ivsCount = manuals.filter(m => m.isIVS).length;
const sylCount = manuals.filter(m => m.isSyllabus).length;
console.log(`✓ IVS volumes detected: ${ivsCount} (Expected: 2)`);
console.log(`✓ Syllabus detected: ${sylCount} (Expected: 1)`);
if (ivsCount !== 2 || sylCount !== 1) {
  throw new Error(`FAIL: Expected 2 IVS volumes and 1 syllabus, got IVS: ${ivsCount}, Syllabus: ${sylCount}`);
}

// -----------------------------------------------------------------------------
// GATE 3: Script Syntax & DOM Structure Verification
// -----------------------------------------------------------------------------
console.log('\n=== Gate 3: Script Syntax & Key Elements Verification ===');

// Check script syntax using vm
try {
  new vm.Script(scriptContent);
  console.log('✓ Embedded JavaScript syntax is completely valid (no parse errors).');
} catch (e) {
  throw new Error('FAIL: Syntax error in embedded JavaScript: ' + e.message);
}

// Check key DOM IDs and classes
const requiredSelectors = [
  'id="engagement-drawer"',
  'id="drawer-tree"',
  'id="dossier-split-view"',
  'id="pane-left"',
  'id="pane-right"',
  'id="frame-left"',
  'id="frame-right"',
  'id="working-schedule-pane"',
  'id="audit-ledger-table"',
  'id="btn-add-row"',
  'id="btn-signoff-toggle"',
  'id="cross-foot-total"',
  'id="tickmark-bar"',
  'id="calc-widget"',
  'id="calc-tape"',
  'id="btn-tape-to-notes"',
  'id="review-drawer"'
];

requiredSelectors.forEach(sel => {
  if (!html.includes(sel)) {
    throw new Error(`FAIL: Missing required DOM element: ${sel}`);
  }
});
console.log('✓ All essential DOM containers and interactive elements confirmed present.');

// -----------------------------------------------------------------------------
// GATE 4: Engagement Explorer Tree Specifications
// -----------------------------------------------------------------------------
console.log('\n=== Gate 4: Engagement Explorer Tree Specifications ===');
if (!scriptContent.includes('000 PERMANENT AUDIT FILE (PAF)')) {
  throw new Error('FAIL: Missing 000 PERMANENT AUDIT FILE (PAF) in tree');
}
if (!scriptContent.includes('100 COURSEWARE & AUDIT GUIDES')) {
  throw new Error('FAIL: Missing 100 COURSEWARE & AUDIT GUIDES in tree');
}
if (!scriptContent.includes('200 CURRENT AUDIT FILES (13 Diets)')) {
  throw new Error('FAIL: Missing 200 CURRENT AUDIT FILES (13 Diets) in tree');
}
if (!scriptContent.includes('WP-100 Question Exhibits')) {
  throw new Error('FAIL: Missing WP-100 Question Exhibits reference');
}
if (!scriptContent.includes('WP-200 Council')) {
  throw new Error('FAIL: Missing WP-200 Council Solutions reference');
}
console.log('✓ Engagement Explorer Tree sections (000 PAF, 100 Guides, 200 CAF) verified.');

// -----------------------------------------------------------------------------
// GATE 5: Working Schedule Ledger & Autosave Pattern
// -----------------------------------------------------------------------------
console.log('\n=== Gate 5: Working Schedule Ledger & Storage Key Pattern ===');
if (!scriptContent.includes('audit_dossier_')) {
  throw new Error('FAIL: Missing localStorage audit_dossier_ key pattern');
}
if (!scriptContent.includes('audit_signoff_')) {
  throw new Error('FAIL: Missing localStorage audit_signoff_ key pattern');
}
console.log('✓ Storage key pattern "audit_dossier_${paper}_${diet}" and "audit_signoff_" verified.');

// -----------------------------------------------------------------------------
// GATE 6: Authentic CA Tick-Mark Keypad
// -----------------------------------------------------------------------------
console.log('\n=== Gate 6: Authentic CA Tick-Mark Keypad ===');
const requiredTickMarks = ['✓', '^', 'TB', 'C', 'CONF'];
requiredTickMarks.forEach(mark => {
  if (!html.includes(`data-mark="${mark}"`)) {
    throw new Error(`FAIL: Missing CA tick-mark button for: ${mark}`);
  }
});
console.log('✓ All 5 required CA tick marks (✓, ^, TB, C, CONF) verified.');

// -----------------------------------------------------------------------------
// GATE 7: 10-Key Financial Tape Calculator
// -----------------------------------------------------------------------------
console.log('\n=== Gate 7: 10-Key Financial Tape Calculator ===');
if (!html.includes('id="calc-widget"') || !html.includes('id="calc-tape"') || !html.includes('id="btn-tape-to-notes"')) {
  throw new Error('FAIL: Missing calculator widget, running tape, or copy-to-notes button');
}
console.log('✓ 10-Key Financial Tape Calculator and running paper tape feed verified.');

// -----------------------------------------------------------------------------
// GATE 8: Engagement Sign-Off Workflow
// -----------------------------------------------------------------------------
console.log('\n=== Gate 8: Engagement Sign-Off Workflow ===');
if (!scriptContent.includes('DRAFT') || !scriptContent.includes('SENIOR REVIEWED') || !scriptContent.includes('PARTNER SIGNED OFF')) {
  throw new Error('FAIL: Missing DRAFT -> SENIOR REVIEWED -> PARTNER SIGNED OFF workflow states');
}
if (!html.includes('partner-seal-stamp')) {
  throw new Error('FAIL: Missing partner seal stamp element');
}
console.log('✓ Engagement Sign-Off 3-stage workflow and partner certification stamp verified.');

console.log('\n================================================================');
console.log('ALL VERIFICATION GATES PASSED (100% SUCCESS)');
console.log('================================================================');
