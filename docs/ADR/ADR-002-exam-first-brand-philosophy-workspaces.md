# ADR 002: Exam-First Brand Visual Philosophies vs. Superficial UI Parodies

## Status
Accepted

## Context
Following initial iterations of multiple UI versions, user feedback clarified the core architectural purpose:
> *"by these design ideas, i didnt meant to replicate their ui and show our files with them. what i meant was that use their brand visual philosophies to make the study helping pdf viewing site. the main focus is always to help prepare for exams."*

Superficial skeuomorphic jokes or literal parody wrappers (such as fake operating systems, torrent tracker tables, or anime streaming skins) distract from the high-stakes cognitive demands of studying for Institute of Chartered Accountants of Bangladesh (ICAB) professional examinations.

Instead, the design philosophy of iconic design cultures (Apple, Google, Linear, Financial Times, Braun/Industrial, and Nordic/Kinfolk) must be applied to solve the fundamental ergonomics of exam preparation:
1. **Dual Split-Screen Comparative Reading**: Seeing the exam Question on the left and the official Council-Approved Suggested Answer on the right simultaneously to inspect mark schemes, workings, and statutory citations.
2. **13-Diet Chronological Stepping**: Seamlessly moving backward and forward through 13 historical exam sessions (2022 to 2026) to identify recurring question patterns across Professional Level (7 papers) and Advanced Level (3 papers).
3. **Statutory & Syllabus Grounding**: Immediate 1-click access to the official 2025 Syllabus framework and the 20 volumes of ICAB Study Manuals.
4. **Ergonomic & Anti-Fatigue Visual Balance**: Eliminating generic AI slop (cards within cards, washed-out low contrast, pastel pill clutter) in favor of intentional, high-performance study environments.

---

## Architectural Decision

### 1. Single Source of Truth (`catalog.js`)
All 6 study workspaces import [`catalog.js`](../../catalog.js). The catalog exports:
- `CATALOG`: Hierarchical index of 266 verified exam questions, answers, and study manuals.
- `SYLLABUS_DOC`: Canonical 2025 curriculum syllabus PDF path.
- `PAPER_CODES`: Standard abbreviations (`FAR`, `AA`, `BPTC`, `BST`, `FM`, `CLP`, `ITG`, `CR`, `SBM`, `CS`).
- `SESSIONS_ORDER`: 13 chronologically sorted exam diets from `2022-03_Mar-Apr` to `2026-05_May`.
- `SUBJECT_ORDER`: Explicit tier mapping for Professional Level (7 modules) and Advanced Level (3 modules).

### 2. Universal Study Workspace Navigation Bar
Every workspace features a sticky top navigation bar (`.ui-study-bar`) allowing the student to instantly switch between the 6 distinct study environments with 1 click:
```
[STUDY WORKSPACES]  01 Apple Studio | 02 Google Workspace | 03 Linear Dark | 04 FT Executive | 05 Industrial Console | 06 Nordic Library
```

### 3. The 6 Brand Visual Philosophy Workspaces

1. **`01 Apple Studio` (`version-1-apple-study.html` & default `index.html`)**:
   - *Design Culture*: Apple Human Interface Guidelines, Cupertino clarity, SF Pro typography.
   - *Study Features*: Glassmorphic revision toolbar (`backdrop-filter: blur(20px)`), horizontal timeline pill scroller across all 13 sessions, side-by-side Dual Split desk, quick toggle between Dual, Question-only, and Answer-only modes.
2. **`02 Google Workspace` (`version-2-google-study.html`)**:
   - *Design Culture*: Material Design 3, Google Sans typography, tonal elevation cards, clean white/gray surfaces.
   - *Study Features*: Pill search bar, chip carousels for curriculum filtering (`[All]`, `[Audit]`, `[FAR]`, `[Tax]`, `[Corporate]`), comparative dual-pane iframe viewer with session steppers.
3. **`03 Linear Dark` (`version-3-linear-study.html`)**:
   - *Design Culture*: Linear & Vercel high-density dark mode, pure pitch-black canvas (`#000000`), micro-borders (`#27272a`), Geist mono typography.
   - *Study Features*: Global `⌘K` search shortcut, keyboard-driven navigation (`D` for dual-mode toggle, `S` for syllabus, `Esc` to close), high-precision zero-distraction revision matrix.
4. **`04 FT Executive` (`version-4-ft-study.html`)**:
   - *Design Culture*: Financial Times & The Economist editorial research desk. FT salmon newsprint ground (`#fff1e5`), City banking navy (`#0d2238`), British racing green (`#00472f`), and gold accents.
   - *Study Features*: Curricular Balance Sheet ledger matrix, Forensic Comparison Split Desk with masthead meta indicators, and official textbook compendium shelves.
5. **`05 Industrial Console` (`version-5-industrial-study.html`)**:
   - *Design Culture*: Dieter Rams Functionalism, Braun TP1/SK4, Teenage Engineering, and IBM ThinkPad hardware. Warm matte drafting canvas (`#e4e5e7`), vulcanized rubber bezels, and safety orange accents (`#ff5500`).
   - *Study Features*: Tactile 3D mechanical push buttons with physical active depression (`transform: translateY(2px)`), dual-channel oscilloscope viewing bays (`CH.01 QUESTION`, `CH.02 ANSWER`), and hardware stepper controls.
6. **`06 Nordic Library` (`version-6-nordic-study.html`)**:
   - *Design Culture*: Scandinavian quiet reading room, Kinfolk editorial aesthetic, unbleached milk paper (`#f7f5f0`), soft graphite ink (`#282523`), and muted eucalyptus sage (`#3d5a49`).
   - *Study Features*: Low-fatigue non-glare reading desk engineered for 8–10 hour study marathons, soft frame borders, quiet diet ribbon, and calm serif typography (`Source Serif 4`).
7. **`07 Apple × Braun` (`version-7-apple-braun-study.html`)**:
   - *Design Culture*: The Jony Ive & Dieter Rams precision synthesis. Milled bead-blasted aluminum unibody (`#eceef2`), tactile 3D mechanical push keys with click depression (`translateY(1.5px)`), and Cupertino glassmorphic clarity (`backdrop-filter: blur(20px)`).
   - *Study Features*: Physical 3-way rocker switch (`[Q Only]`, `[Dual Split]`, `[A Only]`), 13-diet horizontal hardware pill scroller, micro-perforated phosphor LED telemetry lamps, and high-DPI split viewports (`CH.01 QUESTION` vs `CH.02 ANSWER`).

---

## Consequences
- **Zero Dead Weight**: All toy parody files were pruned.
- **100% Functional Equivalence**: Every single workspace provides full comparative viewing of all 266 PDFs, 13 exam diets, and official courseware.
- **Project Version**: Bumped to `v3.1.0` with the addition of the Apple × Braun precision unibody studio.
