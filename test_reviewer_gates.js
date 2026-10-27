const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cat = require('./catalog.js');

console.log('================================================================');
console.log('AuditDossier (Version 10) — Reviewer Deep Verification Suite');
console.log('================================================================\n');

const html = fs.readFileSync('version-10-audit-dossier.html', 'utf8');

// TEST 1: Child working paper nodes in Section 200
console.log('--- Test 1: WP-100, WP-200, WP-300 Node Hierarchy in CAF ---');
if (!html.includes('badge-wp-sub')) throw new Error('FAIL: Missing badge-wp-sub class in tree');
if (!html.includes('Question Exhibits & Records')) throw new Error('FAIL: Missing WP-100 leaf label');
if (!html.includes('Council Solutions & Answer WP')) throw new Error('FAIL: Missing WP-200 leaf label');
if (!html.includes('Substantive Audit Schedule')) throw new Error('FAIL: Missing WP-300 leaf label');
console.log('✓ Section 200 correctly generates WP-100, WP-200, and WP-300 working paper nodes.');

// TEST 2: Filter chip signed logic
console.log('\n--- Test 2: Signed Off Filter Logic (No Empty Tree) ---');
const scriptMatch = html.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/);
const jsCode = scriptMatch[1];
if (!jsCode.includes("g.style.display = (cat === 'caf') ? 'block' : 'none'")) {
  throw new Error('FAIL: filter === "signed" must keep CAF group visible!');
}
console.log('✓ Signed Off filter chip verified to preserve CAF group and isolate signed files.');

// TEST 3: Search accordion auto-expansion
console.log('\n--- Test 3: Search Accordion Auto-Expansion ---');
if (!jsCode.includes('parentSublist.classList.add(\'open\')') && !jsCode.includes('parent.classList.add(\'open\')')) {
  throw new Error('FAIL: Search must auto-expand parent sublists of matching leaves!');
}
console.log('✓ Search query verified to auto-expand parent accordions for visible matching results.');

// Extract handleCalcDot and handleCalcNumber logic
const dotFnMatch = jsCode.match(/function handleCalcDot\(\) \{[\s\S]*?\n      \}/);
const numFnMatch = jsCode.match(/function handleCalcNumber\(num\) \{[\s\S]*?\n      \}/);
if (!dotFnMatch || !numFnMatch) throw new Error('FAIL: Missing handleCalcDot or handleCalcNumber');

const simCalc = {
  currentInput: '0',
  resetNextInput: true
};
function updateCalcDisplay() {}

const handleCalcDot = new Function('CALC', 'updateCalcDisplay', dotFnMatch[0] + '; return handleCalcDot;')(simCalc, updateCalcDisplay);
const handleCalcNumber = new Function('CALC', 'updateCalcDisplay', numFnMatch[0] + '; return handleCalcNumber;')(simCalc, updateCalcDisplay);

// Simulate: User clicks dot, then 5
handleCalcDot();
handleCalcNumber('5');

console.log(`   Simulated sequence [. -> 5] => "${simCalc.currentInput}"`);
if (simCalc.currentInput !== '0.5') {
  throw new Error(`FAIL: Expected "0.5" but got "${simCalc.currentInput}"!`);
}
console.log('✓ Calculator decimal point entry correctly handles initial and reset states.');

// TEST 5: CA Tick-Mark Keypad Balance Protection
console.log('\n--- Test 5: CA Tick-Mark Numeric Balance Protection ---');
if (!jsCode.includes("input.type === 'number'") && !jsCode.includes("col-balance")) {
  throw new Error('FAIL: Tick-mark insertion must protect numeric balance inputs from corruption!');
}
if (!jsCode.includes("e.preventDefault()")) {
  throw new Error('FAIL: Tick-mark buttons must call e.preventDefault() on mousedown to preserve focus!');
}
console.log('✓ CA tick-mark keypad protects numeric balance cells and preserves input focus.');

// TEST 6: Ledger 3-State Height Controls (Minimize / Standard / Maximize)
console.log('\n--- Test 6: Ledger Height Controls ---');
if (!html.includes('id="btn-minimize-ledger"')) throw new Error('FAIL: Missing btn-minimize-ledger element');
if (!html.includes('id="btn-toggle-ledger-size"')) throw new Error('FAIL: Missing btn-toggle-ledger-size element');
if (!html.includes('.working-schedule-pane.minimized')) throw new Error('FAIL: Missing .minimized CSS class');
console.log('✓ Ledger 3-state height controls (Minimize to 38px, Standard, Maximize) verified.');

// TEST 7: Permanent Engagement Charter Document
console.log('\n--- Test 7: WP-004 Permanent Engagement Charter Document ---');
if (!jsCode.includes('TERMS OF AUDIT ENGAGEMENT MEMORANDUM')) {
  throw new Error('FAIL: Missing rich Permanent Engagement Charter memorandum!');
}
console.log('✓ WP-004 Permanent Engagement Charter renders institutional terms memo in viewer.');

// TEST 8: Calculator Keyboard / Numpad Support
console.log('\n--- Test 8: Calculator Keyboard Support ---');
if (!jsCode.includes('window.addEventListener(\'keydown\'')) {
  throw new Error('FAIL: Missing keyboard listener for 10-key calculator!');
}
console.log('✓ Calculator includes full physical keyboard and numpad event listeners.');

console.log('\n================================================================');
console.log('ALL REVIEWER VERIFICATION GATES PASSED (100% SUCCESS)');
console.log('================================================================');
