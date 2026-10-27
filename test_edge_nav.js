const { execSync } = require('child_process');
const fs = require('fs');

const testHtml = `<!DOCTYPE html><html><body><iframe src="Professional%20Level%20(PL)/Audit%20%26%20Assurance/2026-05_May/Audit%20%26%20Assurance%20-%20Question%20(May%202026).pdf?_t=123#page=2"></iframe></body></html>`;
fs.writeFileSync('test_pdf.html', testHtml);

try {
  const out = execSync(`"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" --headless --dump-dom "file:///d:/CA Resources/test_pdf.html"`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  console.log('Edge loaded iframe successfully. Length:', out.length);
} catch (e) {
  console.error('Edge failed:', e.message);
}
