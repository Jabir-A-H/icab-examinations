/**
 * Standards 360 Codex — Comprehensive Verification Gates Test Suite
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cat = require('./catalog.js');

console.log('================================================================');
console.log('Standards 360 Codex (Version 9) — Verification Gates Suite');
console.log('================================================================\n');

const htmlPath = path.join(__dirname, 'version-9-standards-codex.html');
if (!fs.existsSync(htmlPath)) {
  throw new Error(`FAIL: File not found: ${htmlPath}`);
}

const html = fs.readFileSync(htmlPath, 'utf8');
console.log(`✓ Loaded version-9-standards-codex.html (${(Buffer.byteLength(html, 'utf8') / 1024).toFixed(1)} KB)`);

// -----------------------------------------------------------------------------
// GATE 1: Universal Study Bar (.ui-study-bar)
// -----------------------------------------------------------------------------
console.log('\n=== Gate 1: Ecosystem Navigation (.ui-study-bar) ===');
const barMatch = html.match(/<header class="ui-study-bar">([\s\S]*?)<\/header>/);
if (!barMatch) throw new Error('FAIL: Missing .ui-study-bar in HTML');

const links = [...barMatch[1].matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
console.log(`Found ${links.length} study bar ecosystem links:`);
links.forEach(l => console.log(`  - ${l[1]} -> "${l[2].trim()}"`));

if (links.length !== 11) throw new Error(`FAIL: Expected 11 links in ui-study-bar, got ${links.length}`);

const activeLink = barMatch[1].match(/<a [^>]*class="[^"]*active[^"]*"[^>]*>([^<]+)<\/a>/);
if (!activeLink || !activeLink[1].includes('09 Standards Codex')) {
  throw new Error(`FAIL: Active link in ui-study-bar must be 09 Standards Codex, got: ${activeLink ? activeLink[1] : 'NONE'}`);
}
console.log(`✓ Active link verified: "${activeLink[1].trim()}"`);

// -----------------------------------------------------------------------------
// GATE 2: Hardened Manuals Ingestion via getAllManuals()
// -----------------------------------------------------------------------------
console.log('\n=== Gate 2: Hardened Manuals Ingestion & File Existence ===');
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
  throw new Error(`FAIL: ${missingFiles} manual PDF files are missing from the disk!`);
}

const ivsVolumes = manuals.filter(m => m.isIVS);
const syllabusDoc = manuals.filter(m => m.isSyllabus);
if (ivsVolumes.length !== 2) throw new Error(`FAIL: Expected 2 IVS volumes, got ${ivsVolumes.length}`);
if (syllabusDoc.length !== 1) throw new Error(`FAIL: Expected 1 syllabus doc, got ${syllabusDoc.length}`);

console.log(`✓ Ingested all 21 documents (18 standard manuals, 2 IVS volumes, 1 syllabus framework).`);
console.log(`✓ 100% of PDF assets verified present on local disk.`);

// -----------------------------------------------------------------------------
// GATE 3: The 4 Technical Pillars & Core Standards Coverage
// -----------------------------------------------------------------------------
console.log('\n=== Gate 3: The 4 Technical Pillars & Core Standards Coverage ===');

// Extract STANDARDS_DATA from script
const standardsMatch = scriptContent.match(/const STANDARDS_DATA = (\[[\s\S]*?\]);\s*\n/);
if (!standardsMatch) throw new Error('FAIL: Could not extract STANDARDS_DATA from script');

const standardsData = JSON.parse(standardsMatch[1]);
console.log(`Extracted ${standardsData.length} standards dossiers from client script.`);

const pillarsFound = new Set(standardsData.map(s => s.pillarKey));
console.log('Pillars found:', [...pillarsFound]);
['FR', 'AA', 'TAX', 'LAW'].forEach(p => {
  if (!pillarsFound.has(p)) throw new Error(`FAIL: Missing pillar ${p}`);
});

// Check mandatory standards from specs:
const requiredStandards = [
  // I. Financial Reporting
  'IFRS 9', 'IFRS 15', 'IFRS 16', 'IFRS 3 / 10', 'IAS 36', 'IAS 12', 'IAS 37',
  // II. Auditing & Assurance
  'ISA 315 (Rev)', 'ISA 330', 'ISA 570 (Rev)', 'ISA 700 / 705 / 706', 'Code of Ethics',
  // III. Taxation & Fiscal Law
  'ITA 2023 s.163', 'ITA 2023 3rd Sch', 'VAT Act 2012 s.46', 'VAT VDS Rules', 'Customs Act 2023',
  // IV. Corporate Law & IVS
  'Companies Act 1994', 'BSEC CGC 2018', 'IVS 101-105', 'IVS 200-400'
];

requiredStandards.forEach(req => {
  const found = standardsData.find(s => s.code === req || s.code.includes(req));
  if (!found) throw new Error(`FAIL: Mandatory standard "${req}" not found in STANDARDS_DATA`);
  console.log(`  ✓ Found: ${found.code} — ${found.name} (${found.pillarKey})`);
});

// -----------------------------------------------------------------------------
// GATE 4: 13-Diet Sessional Occurrence Matrix
// -----------------------------------------------------------------------------
console.log('\n=== Gate 4: 13-Diet Sessional Occurrence Matrix & PDF Links ===');
let totalOccurrences = 0;
let occurrencesMissingPDF = 0;

standardsData.forEach(s => {
  if (!s.occurrences || s.occurrences.length === 0) {
    throw new Error(`FAIL: Standard ${s.code} has 0 occurrences`);
  }
  totalOccurrences += s.occurrences.length;
  s.occurrences.forEach(occ => {
    const list = cat.CATALOG[occ.level] && cat.CATALOG[occ.level][occ.paper];
    if (!list) {
      console.error(`Missing catalog paper: ${occ.level} -> ${occ.paper}`);
      occurrencesMissingPDF++;
      return;
    }
    const sessionMatch = list.find(x => x.session_tag === occ.sessionTag);
    if (!sessionMatch || !sessionMatch.question || !sessionMatch.answer) {
      console.error(`Missing question/answer for session: ${occ.sessionTag} in ${occ.paper}`);
      occurrencesMissingPDF++;
      return;
    }
    if (!fs.existsSync(sessionMatch.question.rel_path) || !fs.existsSync(sessionMatch.answer.rel_path)) {
      console.error(`Physical file missing on disk: ${sessionMatch.question.rel_path}`);
      occurrencesMissingPDF++;
    }
  });
});

console.log(`Total occurrences mapped across 13 diets: ${totalOccurrences}`);
if (occurrencesMissingPDF > 0) {
  throw new Error(`FAIL: ${occurrencesMissingPDF} occurrences had missing catalog entries or files!`);
}
console.log(`✓ 100% of ${totalOccurrences} past session occurrences have verified Question & Answer PDFs on disk.`);

// -----------------------------------------------------------------------------
// GATE 5: Candidate Revision Memo Autosave Key
// -----------------------------------------------------------------------------
console.log('\n=== Gate 5: Candidate Revision Memo Autosave ===');
if (!html.includes('standards_memo_') || !html.includes('localStorage.getItem(\'standards_memo_\'')) {
  throw new Error('FAIL: Missing localStorage key standards_memo_${code} in script');
}
if (!html.includes('memo-status-badge') || !html.includes('Autosaved')) {
  throw new Error('FAIL: Missing autosave indicator badge in HTML');
}
console.log('✓ Candidate revision memo autosave persistence key and badge verified.');

// -----------------------------------------------------------------------------
// GATE 6: Mastery Tracker
// -----------------------------------------------------------------------------
console.log('\n=== Gate 6: Mastery Status Tracker ===');
if (!html.includes('standards_mastery_') || !html.includes('UNSTUDIED') || !html.includes('REVIEWING') || !html.includes('MASTERED')) {
  throw new Error('FAIL: Missing mastery status states or localStorage key');
}
console.log('✓ Mastery status tracker [Unstudied], [Reviewing], [Mastered] verified.');

// -----------------------------------------------------------------------------
// GATE 7: Split Desk Dual-Pane Viewer
// -----------------------------------------------------------------------------
console.log('\n=== Gate 7: Split Desk Dual-Pane Viewer ===');
if (!html.includes('id="splitDeskContainer"') || !html.includes('id="paneLeft"') || !html.includes('id="paneRight"')) {
  throw new Error('FAIL: Missing Split Desk dual pane DOM elements');
}
if (!html.includes('presetQvsA') || !html.includes('presetManualVsQ') || !html.includes('presetDossierVsManual')) {
  throw new Error('FAIL: Missing Split Desk quick presets');
}
console.log('✓ Split Desk Dual-Pane Viewer and presets verified.');

// -----------------------------------------------------------------------------
// GATE 8: Security & Template Escaping Utilities
// -----------------------------------------------------------------------------
console.log('\n=== Gate 8: Security & Template Escaping Utilities ===');
const escapeMatch = scriptContent.match(/function escapeHtml\(str\) \{[\s\S]*?function escapeAttr\(str\) \{[\s\S]*?\}/);
if (!escapeMatch) throw new Error('FAIL: Missing escapeHtml / escapeAttr in script');

const escapingModule = new Function(escapeMatch[0] + '; return { escapeHtml, escapeAttr };')();
const dangerousStr = `<script>alert("XSS")</script>&'test"`;
const escaped = escapingModule.escapeHtml(dangerousStr);
if (escaped.includes('<') || escaped.includes('>') || escaped.includes('"') || !escaped.includes('&amp;')) {
  throw new Error(`FAIL: XSS escapeHtml failed: ${escaped}`);
}
console.log(`✓ Escaping verified: "${dangerousStr}" -> "${escaped}"`);

// -----------------------------------------------------------------------------
// GATE 9: Script Syntax Validation
// -----------------------------------------------------------------------------
console.log('\n=== Gate 9: JavaScript Syntax Validation ===');
try {
  new vm.Script(scriptContent);
  console.log('✓ Script parsed successfully with 0 syntax errors.');
} catch (e) {
  throw new Error(`FAIL: JavaScript syntax error in HTML script: ${e.message}`);
}

console.log('\n================================================================');
console.log('🎉 ALL 9 VERIFICATION GATES PASSED CLEANLY! (100% OK)');
console.log('================================================================');
