# ICAB Chartered Accountancy Study Library & Multi-Philosophy Exam Workspaces (`v3.1.0`)

Official offline study laboratory and exam revision suites for the **Institute of Chartered Accountants of Bangladesh (ICAB)** and the **ICAB Student Examination Portal** (`https://exam.icab.org.bd/`).

🌐 **Live Deployment:** [icab-examinations.pages.dev](https://icab-examinations.pages.dev)  
📦 **GitHub Repository:** [github.com/Jabir-A-H/icab-examinations](https://github.com/Jabir-A-H/icab-examinations)

---

## 📚 Repository Overview

- **Total Verified PDFs:** 266 offline documents
- **Total Storage:** ~345 MB
- **Coverage Period:** March-April 2022 – May 2026 (13 Examination Diets)
- **Single Source of Truth:** [`catalog.js`](catalog.js)
- **Universal Multi-Philosophy Workspaces:** 7 distinct, high-performance study environments crafted from iconic design philosophies—engineered specifically for intensive exam revision:
  1. [`version-1-apple-study.html`](version-1-apple-study.html) (also default [`index.html`](index.html)) — **01 Apple Studio:** Apple Human Interface Guidelines, Cupertino clarity, glassmorphism revision bar, and horizontal 13-diet timeline pill scroller.
  2. [`version-2-google-study.html`](version-2-google-study.html) — **02 Google Workspace:** Material 3 tonal elevation cards, Google Sans typography, pill search bar, and chip carousels for curriculum filtering.
  3. [`version-3-linear-study.html`](version-3-linear-study.html) — **03 Linear Dark:** Pure pitch-black `#000000` canvas, `⌘K` command bar, Geist mono font, micro-border matrix, and keyboard shortcuts (`D` for dual-mode, `S` for syllabus).
  4. [`version-4-ft-study.html`](version-4-ft-study.html) — **04 FT Executive:** Financial Times & Economist research desk, salmon newsprint ground (`#fff1e5`), City banking navy (`#0d2238`), Curricular Balance Sheet ledger, and forensic split comparative viewer.
  5. [`version-5-industrial-study.html`](version-5-industrial-study.html) — **05 Industrial Console:** Dieter Rams Braun functionalism & ThinkPad hardware, matte drafting chassis (`#e4e5e7`), vulcanized rubber bezels, tactile 3D mechanical push buttons, and dual-channel oscilloscope viewing bays.
  6. [`version-6-nordic-study.html`](version-6-nordic-study.html) — **06 Nordic Library:** Scandinavian quiet study room, unbleached milk paper (`#f7f5f0`), soft graphite ink (`#282523`), muted eucalyptus sage (`#3d5a49`), and low-fatigue serif typography engineered for 8–10 hour study marathons.
  7. [`version-7-apple-braun-study.html`](version-7-apple-braun-study.html) — **07 Apple × Braun:** The Jony Ive & Dieter Rams precision unibody synthesis. Anodized aluminum chassis, tactile milled mechanical keycaps with click depression, 3-way rocker switch (`[Q Only] [Dual Split] [A Only]`), micro-perforated phosphor LED telemetry, and high-DPI comparative viewports.

---

## 🎯 Exam Preparation Core Loop

Every workspace implements the essential four-stage student revision cycle:
1. **Comparative Split Reading**: Inspect the official examination question paper on the left while simultaneously viewing council-approved suggested answers, mark allocations, and workings on the right.
2. **13-Diet Session Stepping**: Move forward and backward across 13 historical exam diets (`Older Diet ◀` / `▶ Newer Diet`) to detect question trends and recurring problem patterns.
3. **Curricular Grounding**: Immediate 1-click access to the official 2025 ICAB Curriculum Framework and the 20 volumes of ICAB Study Manuals.
4. **Flexible Focus**: Toggle between Dual Split comparison (`[Dual Mode]`) and Single Pane view with a single click or keyboard shortcut.

---

## 📂 Repository Architecture

```text
D:\CA Resources\
├── catalog.js                                     # Single source of truth (CATALOG, SESSIONS_ORDER, PAPER_CODES)
├── index.html                                     # Default entrypoint (Apple Studio Exam Desk)
├── version-1-apple-study.html                     # 01 Apple Studio Study Desk
├── version-2-google-study.html                    # 02 Google Workspace Study Workbench
├── version-3-linear-study.html                    # 03 Linear Dark Speed Desk
├── version-4-ft-study.html                        # 04 FT Executive Editorial Review
├── version-5-industrial-study.html                # 05 Industrial Braun Console
├── version-6-nordic-study.html                    # 06 Nordic Low-Fatigue Reading Room
├── docs/
│   └── ADR/
│       ├── ADR-001-multi-style-anti-slop-ui-architecture.md
│       └── ADR-002-exam-first-brand-philosophy-workspaces.md
├── Study Manuals/
│   ├── ICAB Latest Syllabus (2025).pdf            # Official ICAB Curriculum Framework
│   ├── Professional Level (PL)/                   # 7 Modules (Audit, FAR, Tax, Law, Strategy, FM, IT)
│   └── Advanced Level (AL)/                       # 3 Modules (Case Study, Corporate Reporting, SBM)
├── Professional Level (PL)/
│   ├── Audit & Assurance/                         # 13 Examination Diets (2022 to 2026)
│   ├── Business Planning Taxation & Compliance/
│   ├── Business Strategy & Technology/
│   ├── Corporate Laws & Practices/
│   ├── Financial Accounting & Reporting/
│   ├── Financial Management/
│   └── IT Governance/
├── Advanced Level (AL)/
│   ├── Case Study/
│   ├── Corporate Reporting/
│   └── Strategic Business Management & Leadership/
└── README.md
```

---

## ⌨️ Universal Keyboard Shortcuts

- `<kbd>D</kbd>`: Toggle Dual Split-Screen / Single Pane view.
- `<kbd>Esc</kbd>`: Close comparative study desk and return to matrix.
- `<kbd>⌘K</kbd>` / `<kbd>Ctrl+K</kbd>` / `<kbd>/</kbd>`: Focus global paper search.
- `<kbd>S</kbd>`: Open official 2025 Syllabus Specification.

---

## 🚀 Getting Started

Simply open any of the HTML files directly in your desktop web browser (e.g., Google Chrome, Microsoft Edge, Safari, Firefox) — **no web server, build tools, or internet connection required**:
```powershell
# Open default Apple Studio Study Desk:
Start-Process "index.html"

# Or open any specific workspace:
Start-Process "version-3-linear-study.html"
Start-Process "version-4-ft-study.html"
Start-Process "version-5-industrial-study.html"
```
Each workspace includes the universal top navigation bar for immediate one-click switching.
