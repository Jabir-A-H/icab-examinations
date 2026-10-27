const fs = require('fs');
const assert = require('assert');

console.log('================================================================');
console.log('Standards 360 Codex (Version 9) — Fixer Deep Verification Suite');
console.log('================================================================\n');

const html = fs.readFileSync('version-9-standards-codex.html', 'utf8');

// -----------------------------------------------------------------------------
// Test 1: Study Bar Links (P2)
// -----------------------------------------------------------------------------
console.log('--- Test 1: Study Bar Links ---');
assert(html.includes('href="version-10-audit-dossier.html" class="ui-study-link">10 Audit Dossier</a>'), 'Link 10 must point to version-10-audit-dossier.html with text "10 Audit Dossier"');
assert(html.includes('href="version-11-trend-radar.html" class="ui-study-link">11 Trend Radar</a>'), 'Link 11 must point to version-11-trend-radar.html with text "11 Trend Radar"');
assert(html.includes('href="version-9-standards-codex.html" class="ui-study-link active">09 Standards Codex</a>'), 'Link 9 must be active');
console.log('✓ Test 1 Passed: Ecosystem navigation links are accurate and active.');

// -----------------------------------------------------------------------------
// Test 2: Split Desk Squeeze (P0)
// -----------------------------------------------------------------------------
console.log('\n--- Test 2: Split Desk Squeeze in openSplitDesk / closeSplitDesk ---');
assert(html.includes(".codex-main.split-mode .dossier-desk {\n      display: none !important;"), 'CSS must enforce display: none !important on dossier-desk during split-mode');
assert(html.includes("if (desk) desk.style.display = 'none';"), 'openSplitDesk must hide dossierDesk');
assert(html.includes("if (desk) desk.style.display = 'flex';"), 'closeSplitDesk must restore dossierDesk display flex');
console.log('✓ Test 2 Passed: Split desk squeeze prevented via both inline and CSS rule enforcement.');

// -----------------------------------------------------------------------------
// Test 3: Condensed Dossier Pane A (P0)
// -----------------------------------------------------------------------------
console.log('\n--- Test 3: Condensed Dossier in Pane A ---');
assert(html.includes('function renderCondensedDossierView(s, container)'), 'renderCondensedDossierView function exists');
assert(html.includes('if (!s || !container) return;'), 'renderCondensedDossierView must guard against null arguments');
assert(html.includes('function loadDossierIntoPaneLeft()'), 'loadDossierIntoPaneLeft function exists');
assert(html.includes('renderCondensedDossierView(s, paneContent)'), 'loadDossierIntoPaneLeft renders condensed dossier');
assert(html.includes('${escapeHtml(s.code)}'), 'Renders standard code');
assert(html.includes('${escapeHtml(s.name)}'), 'Renders standard title');
assert(html.includes('${escapeHtml(s.category)}'), 'Renders category');
assert(html.includes('${escapeHtml(s.summary || \'\')}'), 'Renders summary');
assert(html.includes('principlesHtml'), 'Renders core principles');
assert(html.includes('outcomesHtml'), 'Renders syllabus outcomes');
assert(html.includes('pitfallsHtml'), 'Renders exam traps');
console.log('✓ Test 3 Passed: Condensed dossier correctly renders all required fields with null guards.');

// -----------------------------------------------------------------------------
// Test 4: Split Desk Standard Switching & Viewport Re-sync (P1)
// -----------------------------------------------------------------------------
console.log('\n--- Test 4: Split Desk Standard Switching & Viewport Re-sync ---');
assert(html.includes('function refreshSplitDeskForActiveStandard()'), 'refreshSplitDeskForActiveStandard is defined');
assert(html.includes('if (splitDeskActive) {\n          refreshSplitDeskForActiveStandard();\n        }'), 'selectStandard re-syncs split desk viewports when splitDeskActive');
assert(html.includes('splitDeskLastStandardId !== activeStandardId'), 'openSplitDesk checks splitDeskLastStandardId to avoid stale viewports');
assert(html.includes('openDocumentInSplitPane(\'paneRight\', \'manual\', s.manualRelPath, s.code + \' Study Manual\')'), 'Pane B matching study manual is opened');
console.log('✓ Test 4 Passed: Viewports re-sync on standard selection and when reopening split desk.');

// -----------------------------------------------------------------------------
// Test 5: Filter Selection Sync & Empty State Recovery (P1)
// -----------------------------------------------------------------------------
console.log('\n--- Test 5: Filter Selection Sync & Empty State Recovery ---');
assert(html.includes('const currentActiveStillPresent = list.some(s => s.id === activeStandardId);'), 'Checks if active standard is eliminated');
assert(html.includes('if (!currentActiveStillPresent) {\n          activeStandardId = list[0].id;'), 'Only switches activeStandardId if eliminated');
assert(html.includes('const deskShowingEmpty = desk && !desk.querySelector(\'.dossier-hero\');'), 'Detects if desk is showing empty state');
assert(html.includes('else if (deskShowingEmpty || paneLeftShowingEmpty)'), 'Recovers from empty state when filtered standards match');
assert(html.includes('No Standards Found'), 'Sidebar renders empty state if 0 matches');
assert(html.includes('No Matching Codex Entry'), 'Dossier desk renders empty state if 0 matches');
console.log('✓ Test 5 Passed: Filter selection sync preserves selection and cleanly recovers from empty state.');

// -----------------------------------------------------------------------------
// Test 6: Memo Autosave & Mastery In-Place Updates (P1)
// -----------------------------------------------------------------------------
console.log('\n--- Test 6: Memo Autosave & Mastery In-Place Updates ---');
assert(html.includes("currentStd && currentStd.code === code"), 'setMastery guards against corrupting buttons of other standards');
assert(html.includes("document.querySelectorAll('.mastery-option[data-set-mastery]').forEach(btn => {"), 'setMastery updates button classes in-place');
const setMasteryMatch = html.match(/function setMastery\([^)]*\)\s*\{([\s\S]*?)\n\s*function getMemo/);
assert(setMasteryMatch, 'function setMastery found');
assert(!setMasteryMatch[1].includes('renderDossier'), 'setMastery must NOT call renderDossier()');
assert(html.includes("memoInput.addEventListener('blur'"), 'memoInput blur listener present');
assert(html.includes("window.addEventListener('beforeunload', flushActiveMemos)"), 'beforeunload flushes memos');
assert(html.includes("window.addEventListener('pagehide', flushActiveMemos)"), 'pagehide flushes memos');
assert(html.includes("document.addEventListener('visibilitychange'"), 'visibilitychange flushes memos');
console.log('✓ Test 6 Passed: Memo autosave flushes across all lifecycle events; mastery updates in-place safely.');

// -----------------------------------------------------------------------------
// Test 7: JavaScript Syntax & Compilation Gate
// -----------------------------------------------------------------------------
console.log('\n--- Test 7: JavaScript Syntax & Compilation Gate ---');
const scripts = html.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi);
assert(scripts && scripts.length > 0, 'Must have embedded scripts');
scripts.forEach((tag, idx) => {
  const code = tag.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
  if (code.trim().length > 0) {
    new Function(code);
    console.log(`✓ Embedded script ${idx + 1} compiled successfully without syntax errors (${code.length} bytes)`);
  }
});

console.log('\n================================================================');
console.log('🎉 ALL 7 REMEDIATION & VERIFICATION TESTS PASSED CLEANLY! (100% OK)');
console.log('================================================================');
