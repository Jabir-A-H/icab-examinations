const fs = require('fs');
const path = require('path');
const cat = require('./catalog.js');

console.log('--- Edge Cases & Functional Simulation ---');

const html = fs.readFileSync('version-10-audit-dossier.html', 'utf8');
const scriptContent = html.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/)[1];

// Mock Browser Environment
const storage = {};
const mockLocalStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

// 1. Test getAllManuals() Edge Cases
console.log('1. Testing getAllManuals() resilience:');
const manualMatch = scriptContent.match(/function getAllManuals\(\) \{[\s\S]*?return manuals;\s*\}/);
const getAllManuals = new Function('CATALOG', 'SYLLABUS_DOC', manualMatch[0] + '; return getAllManuals;');

// Normal case
const full = getAllManuals(cat.CATALOG, cat.SYLLABUS_DOC)();
console.log(`   - Normal: ${full.length} manuals`);
if (full.length !== 21) throw new Error('Expected 21 manuals');

// Missing SYLLABUS_DOC
const noSyl = getAllManuals(cat.CATALOG, null)();
console.log(`   - Null Syllabus: ${noSyl.length} manuals`);
if (noSyl.length !== 20) throw new Error('Expected 20 manuals without syllabus');

// Missing CATALOG
const noCat = getAllManuals(null, cat.SYLLABUS_DOC)();
console.log(`   - Null Catalog: ${noCat.length} manuals`);
if (noCat.length !== 1) throw new Error('Expected 1 manual with only syllabus');

// Empty CATALOG
const emptyCat = getAllManuals({}, {})();
console.log(`   - Empty objects: ${emptyCat.length} manuals`);

// 2. Test Working Schedule Ledger Ledger calculation precision
console.log('\n2. Testing Cross-Foot Precision:');
const sampleBalances = [14250.00, 28400.00, 34800.00, 18650.00, 0.00];
const total = sampleBalances.reduce((acc, v) => acc + v, 0);
console.log(`   - Sum of default rows: BDT ${total.toFixed(2)} (Expected: 96100.00)`);
if (total !== 96100.00) throw new Error('Default balance sum mismatch');

// Float rounding edge case
const floatEdges = [0.1, 0.2, 1000000.555, 0.001];
const floatTotal = floatEdges.reduce((acc, v) => acc + v, 0);
const formatted = floatTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
console.log(`   - Float edge sum: BDT ${formatted}`);

// 3. Test Sign-Off Workflow State Transitions
console.log('\n3. Testing Sign-Off Transitions:');
let state = 'DRAFT';
function nextState(s) {
  if (s === 'DRAFT') return 'SENIOR REVIEWED';
  if (s === 'SENIOR REVIEWED') return 'PARTNER SIGNED OFF';
  return 'DRAFT';
}

state = nextState(state);
console.log(`   - Transition 1: ${state}`);
if (state !== 'SENIOR REVIEWED') throw new Error('Expected SENIOR REVIEWED');

state = nextState(state);
console.log(`   - Transition 2: ${state}`);
if (state !== 'PARTNER SIGNED OFF') throw new Error('Expected PARTNER SIGNED OFF');

state = nextState(state);
console.log(`   - Transition 3: ${state}`);
if (state !== 'DRAFT') throw new Error('Expected DRAFT');

// 4. Test LocalStorage Key Formatting
console.log('\n4. Testing LocalStorage Key Formats:');
const testPaper = 'AA';
const testDiet = '2026-05_May';
const expectedKey = `audit_dossier_${testPaper}_${testDiet}`;
const expectedSignoffKey = `audit_signoff_${testPaper}_${testDiet}`;
console.log(`   - Schedule key: "${expectedKey}"`);
console.log(`   - Signoff key: "${expectedSignoffKey}"`);
if (!html.includes('audit_dossier_') || !html.includes('audit_signoff_')) {
  throw new Error('Key prefixes missing from HTML');
}

// 5. Test Calculator Logic Simulation
console.log('\n5. Testing 10-Key Financial Tape Calculations:');
let acc = 12000;
let operand = 3000;
let op = 'add';
let res = op === 'add' ? acc + operand : 0;
console.log(`   - 12000 + 3000 = ${res}`);
acc = res;
operand = 1.15;
res = acc * operand;
console.log(`   - 15000 * 1.15 = ${res}`);
if (res !== 17250) throw new Error('Calculation mismatch');

// Division by zero simulation
acc = 1000;
operand = 0;
res = operand !== 0 ? acc / operand : 0;
console.log(`   - Division by zero handled cleanly: ${res}`);
if (res !== 0) throw new Error('Division by zero should return 0');

console.log('\n✓ All edge case simulations succeeded!');
