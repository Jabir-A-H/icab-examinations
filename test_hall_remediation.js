const fs = require('fs');
const content = fs.readFileSync('d:/CA Resources/version-8-mock-exam-hall.html', 'utf8');

const tests = [
  ['P1-1 Header Compaction (max-width query)', content.includes('@media (max-width: 1480px)')],
  ['P1-1 Header Clocks Bay Compact', content.includes('.hall-clocks-bay') && content.includes('.hall-actions-bay')],
  ['P0-1 Diet State Partitioning in loadPdf', content.includes('state.diet = state.sessionObj.session_tag')],
  ['P0-3 Splitter Pointer Capture mousedown', content.includes("pointerEvents = 'none'")],
  ['P0-3 Splitter Pointer Capture mouseup', content.includes("pointerEvents = ''")],
  ['P0-7 Dynamic Question Header Chip', content.includes('currentQ') && content.includes('${qTitle} — (${qMarks} MARKS)')],
  ['P1-3 Clean Desk Initializer (state)', content.includes('ledgerRows: [],') && content.includes('auditRows: [],')],
  ['P1-3 Clean Desk Initializer (resetSessionState)', content.includes('state.ledgerRows = [];') && content.includes('state.auditRows = [];')],
  ['P1-4 Fresh Sitting Modal in HTML', content.includes('id="modalFreshSitting"') && content.includes('id="btnConfirmFreshSitting"')],
  ['P1-4 Fresh Sitting CTA in Header and Sheet', content.includes('id="btnFreshSitting"') && content.includes('id="btnFreshSittingSheet"')],
  ['P1-5 Epoch Timer targetEndTime', content.includes('state.targetEndTime = Date.now() + (state.masterRemaining * 1000)')],
  ['P1-5 Epoch Timer onTimerTick', content.includes('Math.round((state.targetEndTime - now) / 1000)')],
  ['P1-5 VisibilityChange listener', content.includes('visibilitychange') && content.includes('onTimerTick()')],
  ['P0-6 Print Transcript in @media print', content.includes('@media print') && content.includes('.left-candidate-shell') && content.includes('display: block !important;')],
  ['P0-6 preparePrintTranscript beforeprint', content.includes('preparePrintTranscript') && content.includes('beforeprint')],
  ['P2-1 Anti-Slop SVG Emblems and Icons', content.includes('<svg') && !content.includes('🏛️') && !content.includes('📚 Manuals')],
  ['P2-2 WCAG AAA Paper Muted Contrast', content.includes('--paper-muted: #44403c;')]
];

let allPassed = true;
tests.forEach(([name, check]) => {
  if (check) {
    console.log('PASS: ' + name);
  } else {
    console.error('FAIL: ' + name);
    allPassed = false;
  }
});

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\nAll 17 verification checkpoints passed successfully!');
}
