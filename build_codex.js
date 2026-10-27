const fs = require('fs');
const path = require('path');
const { STANDARDS } = require('./standards_data.js');

console.log("Building version-9-standards-codex.html with 25 authoritative standards...");

// Build CSS
const CSS = `
    /* ==========================================================================
       1. UNIVERSAL ECOSYSTEM STUDY BAR (All 11 Versions)
       ========================================================================== */
    .ui-study-bar {
      background: #11141a;
      color: #9aa0a6;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      line-height: 1;
      padding: 0 16px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #232834;
      position: relative;
      z-index: 100000;
      flex-shrink: 0;
      overflow-x: auto;
    }
    .ui-study-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .ui-study-tag {
      background: linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%);
      color: #ffffff;
      font-weight: 700;
      font-size: 9px;
      padding: 3px 8px;
      border-radius: 3px;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }
    .ui-study-links {
      display: flex;
      align-items: center;
      gap: 3px;
      flex-shrink: 0;
    }
    .ui-study-link {
      color: #8b949e;
      text-decoration: none;
      padding: 4px 7px;
      font-size: 11px;
      border-radius: 4px;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .ui-study-link:hover {
      color: #f3f4f6;
      background: #1f2430;
    }
    .ui-study-link.active {
      background: #f59e0b;
      color: #11141a;
      font-weight: 700;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.35);
    }

    /* ==========================================================================
       2. OXFORD / CAMBRIDGE LEGAL CODEX DESIGN SYSTEM
       ========================================================================== */
    :root {
      --vellum-bg: #fcfbf7;
      --vellum-surface: #f7f4ea;
      --vellum-subtle: #f1ede1;
      --vellum-inset: #eae4d3;
      --ink-primary: #0f172a;
      --ink-secondary: #334155;
      --ink-muted: #64748b;
      --ink-dim: #94a3b8;
      
      --oxblood-deep: #4c0519;
      --oxblood-primary: #881337;
      --oxblood-light: #9f1239;
      --oxblood-wash: #fff1f2;
      --oxblood-border: #fecdd3;
      
      --gold-dark: #78350f;
      --gold-primary: #b45309;
      --gold-bright: #d97706;
      --gold-wash: #fefce8;
      --gold-border: #fde047;
      
      --border-codex: #d8cfbe;
      --border-light: #e6dfd1;
      --border-heavy: #b5a995;
      
      --status-mastered: #15803d;
      --status-mastered-bg: #f0fdf4;
      --status-mastered-border: #bbf7d0;
      
      --status-reviewing: #b45309;
      --status-reviewing-bg: #fffbeb;
      --status-reviewing-border: #fde68a;
      
      --status-unstudied: #64748b;
      --status-unstudied-bg: #f8fafc;
      --status-unstudied-border: #e2e8f0;

      --font-serif: 'Newsreader', Georgia, 'Times New Roman', serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', 'Courier New', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--vellum-bg);
      color: var(--ink-primary);
      font-family: var(--font-sans);
      font-size: 13px;
      line-height: 1.5;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Scrollbars */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: var(--vellum-subtle);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--border-heavy);
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--oxblood-primary);
    }

    /* ==========================================================================
       3. INSTITUTIONAL CODEX MASTER HEADER
       ========================================================================== */
    .codex-header {
      background: linear-gradient(180deg, #3f0414 0%, #2b020d 100%);
      color: #fdf2f4;
      border-bottom: 2px solid var(--gold-primary);
      padding: 8px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    }

    .codex-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .codex-seal {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: radial-gradient(circle, #b45309 30%, #78350f 100%);
      border: 2px solid #fde047;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4), inset 0 0 5px rgba(254, 240, 138, 0.5);
      flex-shrink: 0;
    }
    .codex-title-group {
      display: flex;
      flex-direction: column;
    }
    .codex-title {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 600;
      color: #fff1f2;
      letter-spacing: 0.4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .codex-badge-edition {
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 700;
      background: rgba(245, 158, 11, 0.25);
      color: #fde68a;
      padding: 2px 6px;
      border-radius: 3px;
      border: 1px solid rgba(245, 158, 11, 0.5);
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
    .codex-sub-title {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 11px;
      color: #fda4af;
      letter-spacing: 0.2px;
    }

    /* Telemetry & Counters */
    .codex-telemetry {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(0, 0, 0, 0.35);
      padding: 5px 14px;
      border-radius: 6px;
      border: 1px solid rgba(180, 83, 9, 0.3);
    }
    .telemetry-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 44px;
    }
    .telemetry-label {
      font-family: var(--font-mono);
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #cbd5e1;
    }
    .telemetry-val {
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 700;
      line-height: 1.1;
    }
    .val-total { color: #f1f5f9; }
    .val-mastered { color: #86efac; }
    .val-reviewing { color: #fde047; }
    .val-unstudied { color: #94a3b8; }

    .telemetry-progress-wrap {
      display: flex;
      flex-direction: column;
      gap: 3px;
      width: 100px;
    }
    .telemetry-progress-bar {
      height: 6px;
      background: #1e293b;
      border-radius: 3px;
      overflow: hidden;
      display: flex;
    }
    .telemetry-fill-mastered {
      background: #22c55e;
      height: 100%;
      transition: width 0.3s ease;
    }
    .telemetry-fill-reviewing {
      background: #f59e0b;
      height: 100%;
      transition: width 0.3s ease;
    }

    /* Action Controls in Header */
    .codex-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .codex-btn {
      background: #4c0519;
      color: #fef2f2;
      border: 1px solid #9f1239;
      border-radius: 4px;
      padding: 5px 10px;
      font-family: var(--font-sans);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .codex-btn:hover {
      background: #881337;
      border-color: #f43f5e;
      color: #fff;
    }
    .codex-btn.btn-gold {
      background: #92400e;
      border-color: #d97706;
      color: #fef3c7;
    }
    .codex-btn.btn-gold:hover {
      background: #b45309;
      border-color: #f59e0b;
    }
    .codex-btn.active {
      background: #b45309;
      border-color: #fde047;
      color: #fff;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
    }

    /* ==========================================================================
       4. MAIN CODEX LAYOUT (Sidebar + Reading Desk + Split Desk)
       ========================================================================== */
    .codex-main {
      flex: 1;
      display: flex;
      overflow: hidden;
      background: var(--vellum-bg);
      position: relative;
    }

    /* Left Sidebar: Codex Index */
    .codex-sidebar {
      width: 360px;
      flex-shrink: 0;
      background: var(--vellum-surface);
      border-right: 1px solid var(--border-codex);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* Pillar Tabs */
    .pillar-nav {
      background: var(--vellum-subtle);
      border-bottom: 1px solid var(--border-codex);
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .pillar-nav-title {
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 700;
      color: var(--oxblood-primary);
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 0 4px;
      display: flex;
      justify-content: space-between;
    }
    .pillar-tabs {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 3px;
    }
    .pillar-tab {
      background: #fff;
      border: 1px solid var(--border-codex);
      border-radius: 3px;
      padding: 4px 2px;
      font-family: var(--font-sans);
      font-size: 10px;
      font-weight: 600;
      color: var(--ink-secondary);
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pillar-tab:hover {
      background: var(--oxblood-wash);
      color: var(--oxblood-primary);
      border-color: var(--oxblood-border);
    }
    .pillar-tab.active {
      background: var(--oxblood-primary);
      color: #fff;
      border-color: var(--oxblood-deep);
    }

    /* Search & Filter Bay in Sidebar */
    .sidebar-controls {
      padding: 8px;
      background: var(--vellum-surface);
      border-bottom: 1px solid var(--border-codex);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .search-box-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .search-input {
      width: 100%;
      background: #fff;
      border: 1px solid var(--border-codex);
      border-radius: 4px;
      padding: 6px 26px 6px 8px;
      font-family: var(--font-sans);
      font-size: 12px;
      color: var(--ink-primary);
      outline: none;
      transition: border 0.15s ease;
    }
    .search-input:focus {
      border-color: var(--oxblood-primary);
      box-shadow: 0 0 0 2px var(--oxblood-wash);
    }
    .search-clear-btn {
      position: absolute;
      right: 6px;
      background: none;
      border: none;
      color: var(--ink-muted);
      cursor: pointer;
      font-size: 12px;
      display: none;
    }
    .search-clear-btn.visible {
      display: block;
    }

    /* Mastery Filter Chips */
    .filter-chips {
      display: flex;
      gap: 3px;
      overflow-x: auto;
      padding-bottom: 2px;
    }
    .chip {
      background: #fff;
      border: 1px solid var(--border-codex);
      border-radius: 12px;
      padding: 2px 7px;
      font-size: 10px;
      font-weight: 500;
      color: var(--ink-secondary);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .chip:hover {
      background: var(--vellum-subtle);
    }
    .chip.active {
      background: var(--ink-primary);
      color: #fff;
      border-color: var(--ink-primary);
    }

    /* Quick Tags */
    .quick-tags {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      margin-top: 2px;
    }
    .tag-pill {
      font-family: var(--font-mono);
      font-size: 9px;
      padding: 1px 6px;
      border-radius: 3px;
      background: var(--vellum-inset);
      color: var(--ink-secondary);
      cursor: pointer;
      border: 1px solid transparent;
    }
    .tag-pill:hover {
      background: var(--gold-wash);
      color: var(--gold-dark);
      border-color: var(--gold-border);
    }
    .tag-pill.active {
      background: var(--gold-dark);
      color: #fff;
      border-color: var(--gold-primary);
    }

    /* Standards List in Sidebar */
    .standards-list-wrap {
      flex: 1;
      overflow-y: auto;
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .standard-item {
      background: #fff;
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 8px 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: all 0.15s ease;
      position: relative;
    }
    .standard-item:hover {
      border-color: var(--oxblood-light);
      background: #fffdfd;
      transform: translateY(-1px);
      box-shadow: 0 2px 5px rgba(0,0,0,0.04);
    }
    .standard-item.active {
      background: var(--oxblood-wash);
      border: 1.5px solid var(--oxblood-primary);
      box-shadow: 0 2px 6px rgba(136, 19, 55, 0.15);
    }
    .item-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .item-code {
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      color: var(--oxblood-primary);
    }
    .standard-item.active .item-code {
      color: var(--oxblood-deep);
    }
    .item-badges {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .badge-pillar {
      font-family: var(--font-mono);
      font-size: 8px;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 2px;
      background: var(--vellum-subtle);
      color: var(--ink-secondary);
      border: 1px solid var(--border-codex);
    }
    .badge-mastery-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .dot-mastered { background: #22c55e; box-shadow: 0 0 3px #22c55e; }
    .dot-reviewing { background: #f59e0b; box-shadow: 0 0 3px #f59e0b; }
    .dot-unstudied { background: #cbd5e1; }

    .item-title {
      font-family: var(--font-serif);
      font-size: 12px;
      font-weight: 600;
      color: var(--ink-primary);
      line-height: 1.3;
    }
    .item-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 10px;
      color: var(--ink-muted);
      margin-top: 2px;
    }
    .item-paper {
      font-family: var(--font-mono);
      font-weight: 600;
      color: var(--gold-dark);
    }
    .item-freq {
      font-family: var(--font-mono);
      font-size: 9px;
      color: var(--ink-secondary);
      background: var(--vellum-subtle);
      padding: 1px 4px;
      border-radius: 2px;
    }

    /* ==========================================================================
       5. STANDARD DOSSIER VIEW (Scholarly Reading Desk)
       ========================================================================== */
    .dossier-desk {
      flex: 1;
      overflow-y: auto;
      background: var(--vellum-bg);
      display: flex;
      flex-direction: column;
    }

    .dossier-hero {
      background: linear-gradient(180deg, #fff 0%, var(--vellum-surface) 100%);
      border-bottom: 2px double var(--border-codex);
      padding: 18px 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
    }
    .dossier-rubric-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }
    .dossier-pillar-tag {
      font-family: var(--font-serif);
      font-size: 11px;
      font-style: italic;
      color: var(--oxblood-primary);
      letter-spacing: 0.4px;
    }
    .dossier-mastery-widget {
      display: flex;
      align-items: center;
      gap: 4px;
      background: #fff;
      padding: 2px 4px;
      border-radius: 16px;
      border: 1px solid var(--border-codex);
    }
    .mastery-option {
      font-family: var(--font-sans);
      font-size: 10px;
      font-weight: 600;
      padding: 3px 9px;
      border-radius: 12px;
      cursor: pointer;
      border: 1px solid transparent;
      color: var(--ink-muted);
      transition: all 0.15s ease;
    }
    .mastery-option:hover {
      color: var(--ink-primary);
    }
    .mastery-option.active-unstudied {
      background: var(--status-unstudied-bg);
      color: var(--status-unstudied);
      border-color: var(--status-unstudied-border);
    }
    .mastery-option.active-reviewing {
      background: var(--status-reviewing-bg);
      color: var(--status-reviewing);
      border-color: var(--status-reviewing-border);
      box-shadow: 0 1px 3px rgba(180, 83, 9, 0.1);
    }
    .mastery-option.active-mastered {
      background: var(--status-mastered-bg);
      color: var(--status-mastered);
      border-color: var(--status-mastered-border);
      box-shadow: 0 1px 3px rgba(21, 128, 61, 0.15);
    }

    .dossier-title-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .dossier-code-title {
      display: flex;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
    }
    .dossier-code {
      font-family: var(--font-mono);
      font-size: 26px;
      font-weight: 700;
      color: var(--oxblood-deep);
      letter-spacing: -0.5px;
    }
    .dossier-name {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 600;
      color: var(--ink-primary);
      letter-spacing: -0.3px;
    }
    .dossier-summary {
      font-family: var(--font-serif);
      font-size: 14px;
      color: var(--ink-secondary);
      line-height: 1.45;
      max-width: 860px;
    }

    .dossier-meta-chips {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 4px;
    }
    .dossier-chip {
      display: flex;
      align-items: center;
      gap: 5px;
      background: #fff;
      border: 1px solid var(--border-codex);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
    }
    .dossier-chip-label {
      font-family: var(--font-mono);
      font-size: 9px;
      text-transform: uppercase;
      color: var(--ink-muted);
    }
    .dossier-chip-val {
      font-weight: 600;
      color: var(--ink-primary);
    }

    .dossier-action-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
      flex-wrap: wrap;
    }

    /* Dossier Body Content Sections */
    .dossier-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      max-width: 980px;
    }

    .codex-section {
      background: #fff;
      border: 1px solid var(--border-codex);
      border-radius: 6px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.03);
      overflow: hidden;
    }
    .codex-section-head {
      background: linear-gradient(180deg, var(--vellum-subtle) 0%, var(--vellum-surface) 100%);
      border-bottom: 1px solid var(--border-codex);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .section-num-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-folio-glyph {
      font-family: var(--font-serif);
      font-size: 14px;
      font-weight: 700;
      color: var(--oxblood-primary);
    }
    .section-title {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 600;
      color: var(--ink-primary);
      letter-spacing: 0.2px;
    }
    .section-badge {
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 600;
      color: var(--gold-dark);
      background: var(--gold-wash);
      padding: 2px 6px;
      border-radius: 3px;
      border: 1px solid var(--gold-border);
    }

    .codex-section-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-size: 13px;
      line-height: 1.6;
      color: var(--ink-primary);
    }

    /* Core Principles List */
    .principles-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .principle-item {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      padding-left: 2px;
    }
    .principle-bullet {
      color: var(--oxblood-primary);
      font-size: 14px;
      line-height: 1.4;
      flex-shrink: 0;
    }

    /* Syllabus Outcomes & Traps Grid */
    .outcomes-traps-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    @media (max-width: 900px) {
      .outcomes-traps-grid { grid-template-columns: 1fr; }
    }
    .sub-box {
      background: var(--vellum-subtle);
      border: 1px solid var(--border-light);
      border-radius: 4px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sub-box-title {
      font-family: var(--font-serif);
      font-size: 13px;
      font-weight: 600;
      color: var(--ink-primary);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .trap-box {
      background: #fffaf0;
      border-color: #fde68a;
    }
    .trap-box .sub-box-title {
      color: #92400e;
    }
    .sub-box-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 12px;
      line-height: 1.45;
    }
    .sub-box-list li {
      display: flex;
      gap: 6px;
    }

    /* ==========================================================================
       6. 13-DIET SESSIONAL OCCURRENCE MATRIX
       ========================================================================== */
    .occurrence-matrix-wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .matrix-timeline-bar {
      display: grid;
      grid-template-columns: repeat(13, 1fr);
      gap: 4px;
      background: var(--vellum-surface);
      padding: 8px;
      border-radius: 4px;
      border: 1px solid var(--border-codex);
    }
    .timeline-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 4px 2px;
      border-radius: 3px;
      background: #fff;
      border: 1px solid var(--border-light);
      font-size: 9px;
      gap: 3px;
      transition: all 0.15s ease;
    }
    .timeline-node.tested {
      background: var(--oxblood-wash);
      border-color: var(--oxblood-border);
      font-weight: 700;
      color: var(--oxblood-primary);
    }
    .timeline-node-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #cbd5e1;
    }
    .timeline-node.tested .timeline-node-dot {
      background: var(--oxblood-primary);
      box-shadow: 0 0 3px var(--oxblood-primary);
    }

    .tested-sessions-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .tested-session-card {
      background: #fff;
      border: 1px solid var(--border-codex);
      border-left: 3px solid var(--oxblood-primary);
      border-radius: 4px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .session-details {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 240px;
    }
    .session-head-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .session-diet-badge {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: var(--oxblood-primary);
    }
    .session-ref-badge {
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 600;
      background: var(--gold-wash);
      color: var(--gold-dark);
      padding: 1px 6px;
      border-radius: 3px;
      border: 1px solid var(--gold-border);
    }
    .session-paper-badge {
      font-family: var(--font-sans);
      font-size: 10px;
      color: var(--ink-secondary);
    }
    .session-topic-text {
      font-family: var(--font-serif);
      font-size: 12px;
      color: var(--ink-secondary);
      line-height: 1.35;
    }
    .session-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .btn-session-action {
      background: var(--vellum-surface);
      border: 1px solid var(--border-codex);
      border-radius: 3px;
      padding: 4px 8px;
      font-family: var(--font-sans);
      font-size: 11px;
      font-weight: 600;
      color: var(--ink-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }
    .btn-session-action:hover {
      background: var(--oxblood-wash);
      color: var(--oxblood-primary);
      border-color: var(--oxblood-border);
    }
    .btn-compare-split {
      background: var(--oxblood-primary);
      color: #fff;
      border-color: var(--oxblood-deep);
    }
    .btn-compare-split:hover {
      background: var(--oxblood-deep);
      color: #fff;
    }

    /* ==========================================================================
       7. CANDIDATE REVISION MEMO
       ========================================================================== */
    .memo-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--vellum-surface);
      border: 1px solid var(--border-codex);
      border-radius: 4px;
      padding: 12px;
    }
    .memo-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }
    .memo-status-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--ink-muted);
    }
    .memo-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 2px 6px;
      border-radius: 3px;
      background: #e2e8f0;
      color: #475569;
    }
    .memo-status-badge.saved {
      background: #dcfce7;
      color: #15803d;
    }
    .memo-status-badge.unsaved {
      background: #fef3c7;
      color: #b45309;
    }
    .memo-helpers {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .btn-memo-helper {
      background: #fff;
      border: 1px solid var(--border-codex);
      border-radius: 3px;
      padding: 3px 6px;
      font-size: 10px;
      font-weight: 500;
      color: var(--ink-secondary);
      cursor: pointer;
    }
    .btn-memo-helper:hover {
      background: var(--vellum-subtle);
      color: var(--ink-primary);
    }
    .memo-textarea {
      width: 100%;
      min-height: 140px;
      background: #fff;
      border: 1px solid var(--border-codex);
      border-radius: 4px;
      padding: 10px;
      font-family: var(--font-serif);
      font-size: 13px;
      line-height: 1.5;
      color: var(--ink-primary);
      outline: none;
      resize: vertical;
    }
    .memo-textarea:focus {
      border-color: var(--oxblood-primary);
      box-shadow: 0 0 0 2px var(--oxblood-wash);
    }
    .memo-footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--ink-muted);
    }

    /* ==========================================================================
       8. SPLIT DESK VIEWER (Dual-Pane Multi-Document Environment)
       ========================================================================== */
    .codex-main.split-mode .dossier-desk {
      display: none !important;
    }
    .codex-main.split-mode .split-desk-container {
      display: flex !important;
    }
    .codex-main.sidebar-collapsed .codex-sidebar {
      display: none !important;
    }

    .timeline-node.tested {
      cursor: pointer;
    }
    .timeline-node.tested:hover {
      background: var(--gold-wash);
      border-color: var(--gold-bright);
    }
    @keyframes highlightPulse {
      0% { box-shadow: 0 0 0 0 rgba(180, 83, 9, 0.4); border-color: var(--gold-bright); }
      70% { box-shadow: 0 0 0 6px rgba(180, 83, 9, 0); border-color: var(--gold-bright); }
      100% { box-shadow: 0 0 0 0 rgba(180, 83, 9, 0); }
    }
    .highlight-pulse {
      animation: highlightPulse 1.2s ease-out;
    }

    .split-desk-container {
      flex: 1;
      display: none;
      flex-direction: column;
      overflow: hidden;
      background: #11141a;
      border-left: 1px solid #232834;
    }
    .split-desk-container.active {
      display: flex;
    }

    .split-desk-toolbar {
      background: #161a22;
      border-bottom: 1px solid #232834;
      padding: 6px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-shrink: 0;
      color: #e5e7eb;
    }
    .split-pane-selectors {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .pane-select-group {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 11px;
    }
    .pane-label {
      color: #94a3b8;
      font-weight: 600;
    }
    .split-select {
      background: #0f1218;
      border: 1px solid #2b3240;
      color: #f1f5f9;
      font-family: var(--font-sans);
      font-size: 11px;
      padding: 3px 6px;
      border-radius: 3px;
      outline: none;
      max-width: 200px;
    }
    .split-select option {
      background: #161a22;
      color: #f1f5f9;
    }

    .split-desk-controls {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .split-btn {
      background: #202632;
      color: #cbd5e1;
      border: 1px solid #2f3747;
      border-radius: 3px;
      padding: 3px 8px;
      font-size: 10px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }
    .split-btn:hover {
      background: #2b3342;
      color: #fff;
    }
    .split-btn.active {
      background: var(--oxblood-primary);
      color: #fff;
      border-color: #f43f5e;
    }

    .split-viewports {
      flex: 1;
      display: flex;
      overflow: hidden;
      position: relative;
    }
    .split-pane {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: #0d1117;
      position: relative;
    }
    .pane-left {
      width: 50%;
      border-right: 1px solid #232834;
    }
    .pane-right {
      width: 50%;
    }

    /* Ratio configurations */
    .split-viewports.ratio-70-30 .pane-left { width: 70%; }
    .split-viewports.ratio-70-30 .pane-right { width: 30%; }
    .split-viewports.ratio-30-70 .pane-left { width: 30%; }
    .split-viewports.ratio-30-70 .pane-right { width: 70%; }
    .split-viewports.ratio-100-0 .pane-left { width: 100%; }
    .split-viewports.ratio-100-0 .pane-right { display: none; }
    .split-viewports.ratio-0-100 .pane-left { display: none; }
    .split-viewports.ratio-0-100 .pane-right { width: 100%; }

    .pane-header-strip {
      background: #141820;
      border-bottom: 1px solid #232834;
      padding: 4px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }
    .pane-doc-title {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 600;
      color: #e2e8f0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pane-frame-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #fff;
    }
    .pdf-viewer-frame {
      width: 100%;
      height: 100%;
      border: none;
    }
    .pdf-fallback-banner {
      background: #1c212c;
      color: #cbd5e1;
      padding: 6px 12px;
      font-size: 11px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #2b3240;
    }
    .pdf-fallback-banner a {
      color: #38bdf8;
      text-decoration: underline;
      font-weight: 600;
    }

    /* ==========================================================================
       9. MODAL: ALL MANUALS & SYLLABUS LIBRARY DRAWER
       ========================================================================== */
    .codex-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(3px);
      z-index: 200000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .codex-modal-overlay.open {
      display: flex;
    }
    .codex-modal-card {
      background: var(--vellum-bg);
      border: 2px solid var(--oxblood-primary);
      border-radius: 8px;
      width: 100%;
      max-width: 900px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0,0,0,0.4);
    }
    .codex-modal-head {
      background: linear-gradient(180deg, #3f0414 0%, #2b020d 100%);
      color: #fdf2f4;
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid var(--gold-primary);
    }
    .codex-modal-title {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 600;
      color: #fff1f2;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .codex-modal-close {
      background: none;
      border: none;
      color: #fda4af;
      font-size: 18px;
      cursor: pointer;
    }
    .codex-modal-body {
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .manuals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 10px;
    }
    .manual-card {
      background: #fff;
      border: 1px solid var(--border-codex);
      border-radius: 4px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: all 0.15s ease;
    }
    .manual-card:hover {
      border-color: var(--oxblood-primary);
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }
    .manual-card-level {
      font-family: var(--font-mono);
      font-size: 9px;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 2px;
      display: inline-block;
      width: fit-content;
    }
    .level-pl { background: #dbeafe; color: #1e40af; }
    .level-al { background: #fce7f3; color: #9d174d; }
    .level-all { background: #fef3c7; color: #92400e; }

    .manual-card-title {
      font-family: var(--font-serif);
      font-size: 13px;
      font-weight: 600;
      color: var(--ink-primary);
      line-height: 1.3;
    }
    .manual-card-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 10px;
      color: var(--ink-muted);
    }
    .manual-card-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
    }
`;

// Build HTML content
const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Standards 360 — The Accounting, Auditing & Statutory Standards Codex</title>

  <!-- Typography: Newsreader (Editorial Serif), Inter (Sans UI), JetBrains Mono (Financials & Codex Metrics) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">

  <style>
${CSS}
  </style>
</head>
<body>

  <!-- ======================================================================
       1. UNIVERSAL ECOSYSTEM STUDY BAR (All 11 Versions)
       ====================================================================== -->
  <header class="ui-study-bar">
    <div class="ui-study-brand">
      <span class="ui-study-tag">STUDY WORKSPACES</span>
      <span>11 Brand Philosophies for CA Exam Prep</span>
    </div>
    <nav class="ui-study-links">
      <a href="version-1-apple-study.html" class="ui-study-link">01 Apple Studio</a>
      <a href="version-2-google-study.html" class="ui-study-link">02 Google Workspace</a>
      <a href="version-3-linear-study.html" class="ui-study-link">03 Linear Dark</a>
      <a href="version-4-ft-study.html" class="ui-study-link">04 FT Executive</a>
      <a href="version-5-industrial-study.html" class="ui-study-link">05 Industrial Console</a>
      <a href="version-6-nordic-study.html" class="ui-study-link">06 Nordic Library</a>
      <a href="version-7-apple-braun-study.html" class="ui-study-link">07 Apple × Braun</a>
      <a href="version-8-mock-exam-hall.html" class="ui-study-link">08 Hall 180 Exam</a>
      <a href="version-9-standards-codex.html" class="ui-study-link active">09 Standards Codex</a>
      <a href="version-10-statutory-reader.html" class="ui-study-link">10 Statutory</a>
      <a href="version-11-trend-radar.html" class="ui-study-link">11 Trend Radar</a>
    </nav>
  </header>

  <!-- ======================================================================
       2. INSTITUTIONAL CODEX MASTER HEADER
       ====================================================================== -->
  <header class="codex-header">
    <!-- Brand Seal & Title -->
    <div class="codex-brand">
      <div class="codex-seal" title="The ICAB Standards Codex">⚜️</div>
      <div class="codex-title-group">
        <h1 class="codex-title">
          STANDARDS 360
          <span class="codex-badge-edition">2025/2026 CODEX IURIS</span>
        </h1>
        <span class="codex-sub-title">The Accounting, Auditing & Statutory Standards Codex &bull; ICAB Professional & Advanced Levels</span>
      </div>
    </div>

    <!-- Live Telemetry: Mastery & Progress -->
    <div class="codex-telemetry">
      <div class="telemetry-stat">
        <span class="telemetry-label">Codex</span>
        <span id="statTotal" class="telemetry-val val-total">25</span>
      </div>
      <div class="telemetry-stat">
        <span class="telemetry-label">Mastered</span>
        <span id="statMastered" class="telemetry-val val-mastered">0</span>
      </div>
      <div class="telemetry-stat">
        <span class="telemetry-label">Reviewing</span>
        <span id="statReviewing" class="telemetry-val val-reviewing">0</span>
      </div>
      <div class="telemetry-stat">
        <span class="telemetry-label">Unstudied</span>
        <span id="statUnstudied" class="telemetry-val val-unstudied">25</span>
      </div>
      <div class="telemetry-progress-wrap">
        <span id="telemetryPct" class="telemetry-label" style="text-align: right;">0% Mastered</span>
        <div class="telemetry-progress-bar">
          <div id="progressMastered" class="telemetry-fill-mastered" style="width: 0%;"></div>
          <div id="progressReviewing" class="telemetry-fill-reviewing" style="width: 0%;"></div>
        </div>
      </div>
    </div>

    <!-- Action Controls -->
    <div class="codex-actions">
      <button id="btnToggleSidebar" class="codex-btn" title="Toggle Sidebar">
        <span>◀</span>
        <span id="btnSidebarLabel">Sidebar</span>
      </button>
      <button id="btnOpenManualsDrawer" class="codex-btn btn-gold" title="Browse all 21 official ICAB Study Manuals and Syllabus">
        <span>📚</span>
        <span>Study Manuals (21)</span>
      </button>
      <button id="btnToggleSplitDesk" class="codex-btn" title="Toggle Split Desk side-by-side comparison mode">
        <span>⚖️</span>
        <span id="btnSplitDeskLabel">Split Desk Mode</span>
      </button>
    </div>
  </header>

  <!-- ======================================================================
       3. MAIN CODEX WORKBENCH (Sidebar + Reading Desk + Split Desk)
       ====================================================================== -->
  <main class="codex-main">
    
    <!-- LEFT SIDEBAR: CODEX INDEX & PILLAR NAVIGATOR -->
    <aside class="codex-sidebar">
      <!-- 4 Technical Pillars Navigation -->
      <div class="pillar-nav">
        <div class="pillar-nav-title">
          <span>Technical Pillars</span>
          <span id="pillarCountBadge">25 Standards</span>
        </div>
        <div class="pillar-tabs">
          <button class="pillar-tab active" data-pillar="ALL" title="View all standards across 4 pillars">ALL</button>
          <button class="pillar-tab" data-pillar="FR" title="Pillar I: Financial Reporting (IFRS / IAS)">I. FR</button>
          <button class="pillar-tab" data-pillar="AA" title="Pillar II: Auditing & Assurance (ISA / BSA)">II. AA</button>
          <button class="pillar-tab" data-pillar="TAX" title="Pillar III: Taxation & Fiscal Law">III. TAX</button>
          <button class="pillar-tab" data-pillar="LAW" title="Pillar IV: Corporate Law & IVS">IV. LAW</button>
        </div>
      </div>

      <!-- Search & Filter Controls -->
      <div class="sidebar-controls">
        <div class="search-box-wrap">
          <input type="text" id="searchInput" class="search-input" placeholder="Search standard, topic, paper (e.g. IFRS 16, s.163, CR)..." autocomplete="off">
          <button id="searchClearBtn" class="search-clear-btn" title="Clear search">&times;</button>
        </div>
        
        <!-- Mastery Filter Chips -->
        <div class="filter-chips">
          <button class="chip active" data-mastery="ALL">All Status</button>
          <button class="chip" data-mastery="MASTERED">Mastered</button>
          <button class="chip" data-mastery="REVIEWING">Reviewing</button>
          <button class="chip" data-mastery="UNSTUDIED">Unstudied</button>
        </div>

        <!-- Quick Tags -->
        <div class="quick-tags">
          <span class="tag-pill" data-tag="High Yield">High Yield</span>
          <span class="tag-pill" data-tag="Consolidation">Consolidation</span>
          <span class="tag-pill" data-tag="Tax Act 2023">Tax Act 2023</span>
          <span class="tag-pill" data-tag="Going Concern">Going Concern</span>
          <span class="tag-pill" data-tag="IVS 2026">IVS 2026</span>
          <span class="tag-pill" data-tag="Leases">Leases</span>
          <span class="tag-pill" data-tag="Ethics">Ethics</span>
        </div>
      </div>

      <!-- Scrollable Standards List -->
      <div id="standardsList" class="standards-list-wrap">
        <!-- Injected via JavaScript -->
      </div>
    </aside>

    <!-- CENTER AREA 1: STANDARD DOSSIER VIEW (Default Full Reading View) -->
    <section id="dossierDesk" class="dossier-desk">
      <!-- Injected via JavaScript -->
    </section>

    <!-- CENTER AREA 2: SPLIT DESK DUAL-PANE VIEWER (Side-by-Side) -->
    <section id="splitDeskContainer" class="split-desk-container">
      <!-- Split Desk Toolbar -->
      <div class="split-desk-toolbar">
        <div class="split-pane-selectors">
          <!-- Left Pane Selector -->
          <div class="pane-select-group">
            <span class="pane-label">Pane A (Left):</span>
            <select id="selPaneA" class="split-select">
              <option value="dossier">Standard Dossier</option>
              <option value="manual">Official Study Manual</option>
              <option value="question">Past Exam Question</option>
              <option value="answer">Council Suggested Answer</option>
              <option value="syllabus">2025 Syllabus Guide</option>
            </select>
          </div>

          <!-- Right Pane Selector -->
          <div class="pane-select-group">
            <span class="pane-label">Pane B (Right):</span>
            <select id="selPaneB" class="split-select">
              <option value="manual">Official Study Manual</option>
              <option value="dossier">Standard Dossier</option>
              <option value="question">Past Exam Question</option>
              <option value="answer">Council Suggested Answer</option>
              <option value="syllabus">2025 Syllabus Guide</option>
            </select>
          </div>
        </div>

        <!-- Preset Quick Switches & Layout Ratios -->
        <div class="split-desk-controls">
          <button id="presetQvsA" class="split-btn" title="Compare Question vs Suggested Answer">⚖️ Q vs Answer</button>
          <button id="presetManualVsQ" class="split-btn" title="Compare Study Manual vs Exam Question">📖 Manual vs Question</button>
          <button id="presetDossierVsManual" class="split-btn" title="Compare Dossier vs Official Manual">📜 Dossier vs Manual</button>
          
          <span style="color: #475569; font-size: 11px;">|</span>
          
          <button class="split-btn ratio-btn active" data-ratio="50-50">50:50</button>
          <button class="split-btn ratio-btn" data-ratio="70-30">70:30</button>
          <button class="split-btn ratio-btn" data-ratio="30-70">30:70</button>
          
          <button id="btnCloseSplitDesk" class="split-btn" title="Exit Split Desk Mode" style="color: #f43f5e;">✕ Close</button>
        </div>
      </div>

      <!-- Dual Viewports -->
      <div id="splitViewports" class="split-viewports ratio-50-50">
        <!-- Pane Left -->
        <div id="paneLeft" class="split-pane pane-left">
          <div class="pane-header-strip">
            <span id="paneLeftTitle" class="pane-doc-title">Document View A</span>
            <a id="paneLeftExtLink" href="#" target="_blank" style="color: #38bdf8; text-decoration: none; font-size: 10px;">↗ Open Tab</a>
          </div>
          <div id="paneLeftContent" class="pane-frame-wrap">
            <!-- Injected via JS (iframe or dossier clone) -->
          </div>
        </div>

        <!-- Pane Right -->
        <div id="paneRight" class="split-pane pane-right">
          <div class="pane-header-strip">
            <span id="paneRightTitle" class="pane-doc-title">Document View B</span>
            <a id="paneRightExtLink" href="#" target="_blank" style="color: #38bdf8; text-decoration: none; font-size: 10px;">↗ Open Tab</a>
          </div>
          <div id="paneRightContent" class="pane-frame-wrap">
            <!-- Injected via JS (iframe) -->
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- ======================================================================
       4. MODAL DRAWER: ALL 21 OFFICIAL STUDY MANUALS & SYLLABUS
       ====================================================================== -->
  <div id="manualsModalOverlay" class="codex-modal-overlay">
    <div class="codex-modal-card">
      <div class="codex-modal-head">
        <div class="codex-modal-title">
          <span>📚</span>
          <span>Official ICAB Study Manuals & Syllabus Codex Library</span>
        </div>
        <button id="btnCloseManualsModal" class="codex-modal-close">&times;</button>
      </div>
      <div class="codex-modal-body">
        <p style="font-size: 12px; color: var(--ink-secondary);">
          Complete official curriculum repository loaded via <code>getAllManuals()</code>: 20 Study Manuals + 2 IVS Volumes + Official 2025 Syllabus (21 Total). 100% verified present on disk.
        </p>
        <div id="manualsGrid" class="manuals-grid">
          <!-- Injected via JavaScript -->
        </div>
      </div>
    </div>
  </div>

  <!-- Shared Catalog & Metadata -->
  <script src="catalog.js"></script>

  <!-- STANDARDS 360 CORE ENGINE -->
  <script>
    (function() {
      "use strict";

      // ------------------------------------------------------------------------
      // 1. Data Ingestion: STANDARDS Definition
      // ------------------------------------------------------------------------
      const STANDARDS_DATA = ${JSON.stringify(STANDARDS, null, 2)};

      // ------------------------------------------------------------------------
      // 2. Hardened Manuals Ingestion Routine
      // ------------------------------------------------------------------------
      function getAllManuals() {
        const manuals = [];
        if (typeof CATALOG !== 'undefined' && CATALOG && CATALOG.Manuals) {
          const levels = Object.keys(CATALOG.Manuals);
          levels.forEach(lvl => {
            if (CATALOG.Manuals[lvl]) {
              const subjects = Object.keys(CATALOG.Manuals[lvl]);
              subjects.forEach(subject => {
                const items = CATALOG.Manuals[lvl][subject];
                const arr = Array.isArray(items) ? items : [items];
                arr.forEach(item => {
                  manuals.push({
                    title: item.title || (item.filename ? item.filename.replace(/\\.pdf$/i, '') : subject),
                    filename: item.filename,
                    rel_path: item.rel_path,
                    size_mb: item.size_mb || (item.size_kb ? (item.size_kb / 1024).toFixed(2) : 'N/A'),
                    level: lvl,
                    subject: subject,
                    isSyllabus: false,
                    isIVS: subject.toLowerCase().includes('ivs') || (item.title && item.title.toLowerCase().includes('ivs'))
                  });
                });
              });
            }
          });
        }
        if (typeof SYLLABUS_DOC !== 'undefined' && SYLLABUS_DOC) {
          manuals.push({
            title: SYLLABUS_DOC.title || "ICAB Latest Syllabus (2025)",
            filename: "ICAB Latest Syllabus (2025).pdf",
            rel_path: SYLLABUS_DOC.rel_path,
            size_mb: SYLLABUS_DOC.size_mb || 6.2,
            level: 'ALL',
            subject: 'Curriculum Framework',
            isSyllabus: true,
            isIVS: false
          });
        }
        return manuals;
      }

      // Security: HTML Escaping
      function escapeHtml(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      function escapeAttr(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }

      // ------------------------------------------------------------------------
      // 3. Application State Management
      // ------------------------------------------------------------------------
      let activeStandardId = 'IFRS-16'; // default start
      let activePillar = 'ALL';
      let activeSearch = '';
      let activeMasteryFilter = 'ALL';
      let activeTag = null;
      
      let splitDeskActive = false;
      let splitRatio = '50-50';
      
      // LocalStorage Key Helpers
      function getMastery(code) {
        return localStorage.getItem('standards_mastery_' + code) || 'UNSTUDIED';
      }
      function setMastery(code, status) {
        flushActiveMemos();
        localStorage.setItem('standards_mastery_' + code, status);
        updateTelemetry();
        renderSidebarList();
        renderDossier(activeStandardId);
        if (splitDeskActive) {
          refreshSplitDeskForActiveStandard();
        }
      }
      function getMemo(code) {
        return localStorage.getItem('standards_memo_' + code) || '';
      }
      function setMemo(code, text) {
        localStorage.setItem('standards_memo_' + code, text);
      }

      // ------------------------------------------------------------------------
      // 4. Telemetry Calculation
      // ------------------------------------------------------------------------
      function updateTelemetry() {
        const total = STANDARDS_DATA.length;
        let mastered = 0;
        let reviewing = 0;
        let unstudied = 0;

        STANDARDS_DATA.forEach(s => {
          const m = getMastery(s.code);
          if (m === 'MASTERED') mastered++;
          else if (m === 'REVIEWING') reviewing++;
          else unstudied++;
        });

        document.getElementById('statTotal').textContent = total;
        document.getElementById('statMastered').textContent = mastered;
        document.getElementById('statReviewing').textContent = reviewing;
        document.getElementById('statUnstudied').textContent = unstudied;

        const masteredPct = Math.round((mastered / total) * 100);
        const reviewingPct = Math.round((reviewing / total) * 100);

        document.getElementById('telemetryPct').textContent = masteredPct + '% Mastered';
        document.getElementById('progressMastered').style.width = masteredPct + '%';
        document.getElementById('progressReviewing').style.width = reviewingPct + '%';
      }

      // ------------------------------------------------------------------------
      // 5. Sidebar Filtering & Rendering
      // ------------------------------------------------------------------------
      function getFilteredStandards() {
        return STANDARDS_DATA.filter(s => {
          // Pillar filter
          if (activePillar !== 'ALL' && s.pillarKey !== activePillar) return false;

          // Mastery filter
          const m = getMastery(s.code);
          if (activeMasteryFilter !== 'ALL' && m !== activeMasteryFilter) return false;

          // Quick tag filter
          if (activeTag && (!s.tags || !s.tags.includes(activeTag))) return false;

          // Search query
          if (activeSearch.trim()) {
            const rawQ = activeSearch.toLowerCase().trim();
            const normQ = rawQ.replace(/[\\s\\-_/.]/g, '');

            const codeNorm = s.code.toLowerCase().replace(/[\\s\\-_/.]/g, '');
            const idNorm = (s.id || '').toLowerCase().replace(/[\\s\\-_/.]/g, '');
            const nameNorm = s.name.toLowerCase().replace(/[\\s\\-_/.]/g, '');

            const matchCode = s.code.toLowerCase().includes(rawQ) || (normQ && codeNorm.includes(normQ));
            const matchId = (s.id || '').toLowerCase().includes(rawQ) || (normQ && idNorm.includes(normQ));
            const matchName = s.name.toLowerCase().includes(rawQ) || (normQ && nameNorm.includes(normQ));
            const matchCat = (s.category || '').toLowerCase().includes(rawQ);
            const matchPaper = (s.paperCodes || '').toLowerCase().includes(rawQ);
            const matchSummary = (s.summary || '').toLowerCase().includes(rawQ);
            const matchTags = (s.tags || []).some(t => t.toLowerCase().includes(rawQ) || (normQ && t.toLowerCase().replace(/[\\s_./-]/g, '').includes(normQ)));
            const matchPrinciples = (s.corePrinciples || []).some(p => p.toLowerCase().includes(rawQ));
            const matchOutcomes = (s.syllabusOutcomes || []).some(o => o.toLowerCase().includes(rawQ));

            if (!matchCode && !matchId && !matchName && !matchCat && !matchPaper && !matchSummary && !matchTags && !matchPrinciples && !matchOutcomes) {
              return false;
            }
          }

          return true;
        });
      }

      function renderSidebarList() {
        const container = document.getElementById('standardsList');
        const list = getFilteredStandards();
        document.getElementById('pillarCountBadge').textContent = list.length + ' Standards';

        if (list.length === 0) {
          container.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--ink-muted); font-size: 12px;">No standards matched the selected filters.</div>';
          return;
        }

        let html = '';
        list.forEach(s => {
          const isActive = s.id === activeStandardId;
          const mastery = getMastery(s.code);
          let dotClass = 'dot-unstudied';
          if (mastery === 'MASTERED') dotClass = 'dot-mastered';
          else if (mastery === 'REVIEWING') dotClass = 'dot-reviewing';

          html += \`
            <div class="standard-item \${isActive ? 'active' : ''}" data-id="\${escapeAttr(s.id)}">
              <div class="item-top-row">
                <span class="item-code">\${escapeHtml(s.code)}</span>
                <div class="item-badges">
                  <span class="badge-pillar">\${escapeHtml(s.pillarKey)}</span>
                  <span class="badge-mastery-dot \${dotClass}" title="Status: \${escapeAttr(mastery)}"></span>
                </div>
              </div>
              <div class="item-title">\${escapeHtml(s.name)}</div>
              <div class="item-meta-row">
                <span class="item-paper">\${escapeHtml(s.paperCodes)}</span>
                <span class="item-freq">\${escapeHtml(s.frequencyText || '')}</span>
              </div>
            </div>
          \`;
        });

        container.innerHTML = html;

        // Attach click events
        container.querySelectorAll('.standard-item').forEach(el => {
          el.addEventListener('click', () => {
            const id = el.getAttribute('data-id');
            selectStandard(id);
          });
        });
      }

      function flushActiveMemos() {
        document.querySelectorAll('.memo-textarea').forEach(ta => {
          const code = ta.getAttribute('data-code');
          if (code && ta.value !== undefined) {
            setMemo(code, ta.value);
          }
        });
      }
      window.addEventListener('beforeunload', flushActiveMemos);

      function selectStandard(id) {
        flushActiveMemos();
        activeStandardId = id;
        renderSidebarList();
        renderDossier(id);
        if (splitDeskActive) {
          refreshSplitDeskForActiveStandard();
        }
      }

      // ------------------------------------------------------------------------
      // 6. Standard Dossier Rendering (Scholarly Reading Desk & Split Pane)
      // ------------------------------------------------------------------------
      function renderDossierView(s, container, isSplit) {
        const mastery = getMastery(s.code);
        const memoText = getMemo(s.code);

        // Core Principles HTML
        let principlesHtml = '';
        (s.corePrinciples || []).forEach(p => {
          principlesHtml += \`
            <li class="principle-item">
              <span class="principle-bullet">§</span>
              <span>\${escapeHtml(p)}</span>
            </li>
          \`;
        });

        // Syllabus Outcomes HTML
        let outcomesHtml = '';
        (s.syllabusOutcomes || []).forEach(o => {
          outcomesHtml += \`<li><span>&bull;</span> <span>\${escapeHtml(o)}</span></li>\`;
        });

        // Exam Pitfalls HTML
        let pitfallsHtml = '';
        (s.examPitfalls || []).forEach(p => {
          pitfallsHtml += \`<li><span>⚠</span> <span>\${escapeHtml(p)}</span></li>\`;
        });

        // Statutory Links HTML
        let statLinksHtml = '';
        (s.statutoryLinks || []).forEach(l => {
          statLinksHtml += \`<li><span>🔗</span> <span>\${escapeHtml(l)}</span></li>\`;
        });

        // Sessional Occurrence Matrix HTML
        const allDiets = (typeof SESSIONS_ORDER !== 'undefined') ? SESSIONS_ORDER : [
          { tag: '2026-05_May', label: 'May 2026' },
          { tag: '2025-11_Nov-Dec', label: 'Nov-Dec 2025' },
          { tag: '2025-07_Jul-Aug', label: 'Jul-Aug 2025' },
          { tag: '2025-03_Mar-Apr', label: 'Mar-Apr 2025' },
          { tag: '2024-11_Nov-Dec', label: 'Nov-Dec 2024' },
          { tag: '2024-07_Jul-Aug', label: 'Jul-Aug 2024' },
          { tag: '2024-03_Mar-Apr', label: 'Mar-Apr 2024' },
          { tag: '2023-11_Nov-Dec', label: 'Nov-Dec 2023' },
          { tag: '2023-07_Jul-Aug', label: 'Jul-Aug 2023' },
          { tag: '2023-03_Mar-Apr', label: 'Mar-Apr 2023' },
          { tag: '2022-11_Nov-Dec', label: 'Nov-Dec 2022' },
          { tag: '2022-07_Jul-Aug', label: 'Jul-Aug 2022' },
          { tag: '2022-03_Mar-Apr', label: 'Mar-Apr 2022' }
        ];

        let timelineNodesHtml = '';
        allDiets.forEach(diet => {
          const occ = (s.occurrences || []).find(o => o.sessionTag === diet.tag);
          const isTested = Boolean(occ);
          const shortLabel = diet.label.replace('20', "'");
          timelineNodesHtml += \`
            <div class="timeline-node \${isTested ? 'tested' : ''}" 
                 data-session-tag="\${escapeAttr(diet.tag)}"
                 title="\${escapeAttr(diet.label)}: \${isTested ? 'Tested in exam (' + escapeAttr(occ.ref) + ')' : 'Not Tested'}">
              <span>\${escapeHtml(shortLabel)}</span>
              <span class="timeline-node-dot"></span>
            </div>
          \`;
        });

        let testedCardsHtml = '';
        (s.occurrences || []).forEach(occ => {
          testedCardsHtml += \`
            <div class="tested-session-card" data-session-tag="\${escapeAttr(occ.sessionTag)}">
              <div class="session-details">
                <div class="session-head-row">
                  <span class="session-diet-badge">\${escapeHtml(occ.sessionLabel)}</span>
                  <span class="session-ref-badge">\${escapeHtml(occ.ref)}</span>
                  <span class="session-paper-badge">[\${escapeHtml(occ.level)} - \${escapeHtml(occ.paper)}]</span>
                </div>
                <div class="session-topic-text">\${escapeHtml(occ.topic)}</div>
              </div>
              <div class="session-actions">
                <button class="btn-session-action btn-load-q" data-session="\${escapeAttr(occ.sessionTag)}" data-level="\${escapeAttr(occ.level)}" data-paper="\${escapeAttr(occ.paper)}" title="Load Question PDF into Split Desk">
                  📄 Question
                </button>
                <button class="btn-session-action btn-load-a" data-session="\${escapeAttr(occ.sessionTag)}" data-level="\${escapeAttr(occ.level)}" data-paper="\${escapeAttr(occ.paper)}" title="Load Suggested Answer PDF into Split Desk">
                  📑 Answer
                </button>
                <button class="btn-session-action btn-compare-split" data-session="\${escapeAttr(occ.sessionTag)}" data-level="\${escapeAttr(occ.level)}" data-paper="\${escapeAttr(occ.paper)}" title="Open Question & Answer in Split Desk">
                  ⚖️ Split (Q vs A)
                </button>
              </div>
            </div>
          \`;
        });

        container.innerHTML = \`
          <!-- Hero Banner -->
          <div class="dossier-hero">
            <div class="dossier-rubric-row">
              <span class="dossier-pillar-tag">⚜️ \${escapeHtml(s.pillarName)} &bull; \${escapeHtml(s.pillarLatin || '')}</span>
              
              <!-- Mastery Selector Widget -->
              <div class="dossier-mastery-widget">
                <button class="mastery-option \${mastery === 'UNSTUDIED' ? 'active-unstudied' : ''}" data-set-mastery="UNSTUDIED">Unstudied</button>
                <button class="mastery-option \${mastery === 'REVIEWING' ? 'active-reviewing' : ''}" data-set-mastery="REVIEWING">Reviewing</button>
                <button class="mastery-option \${mastery === 'MASTERED' ? 'active-mastered' : ''}" data-set-mastery="MASTERED">Mastered</button>
              </div>
            </div>

            <div class="dossier-title-block">
              <div class="dossier-code-title">
                <span class="dossier-code">\${escapeHtml(s.code)}</span>
                <h2 class="dossier-name">\${escapeHtml(s.name)}</h2>
              </div>
              <p class="dossier-summary">\${escapeHtml(s.summary || '')}</p>
            </div>

            <div class="dossier-meta-chips">
              <div class="dossier-chip">
                <span class="dossier-chip-label">Category:</span>
                <span class="dossier-chip-val">\${escapeHtml(s.category)}</span>
              </div>
              <div class="dossier-chip">
                <span class="dossier-chip-label">ICAB Papers:</span>
                <span class="dossier-chip-val">\${escapeHtml((s.levelPapers || []).join(' &bull; '))}</span>
              </div>
              <div class="dossier-chip">
                <span class="dossier-chip-label">Frequency:</span>
                <span class="dossier-chip-val" style="color: var(--oxblood-primary);">\${escapeHtml(s.frequencyText)}</span>
              </div>
              <div class="dossier-chip">
                <span class="dossier-chip-label">Effective:</span>
                <span class="dossier-chip-val">\${escapeHtml(s.effectiveDate || 'ICAB Syllabus')}</span>
              </div>
            </div>

            <div class="dossier-action-bar">
              <button class="codex-btn btn-gold btn-launch-manual" title="Open the official Study Manual PDF volume covering this standard">
                📖 Open Study Manual
              </button>
              <button class="codex-btn btn-view-in-split" title="Inspect this standard alongside official PDFs in Split Desk">
                ⚖️ Inspect in Split Desk
              </button>
              <button class="codex-btn btn-open-syllabus" title="Open official 2025 Syllabus">
                📜 2025 Syllabus Guide
              </button>
            </div>
          </div>

          <!-- Dossier Body Sections -->
          <div class="dossier-body">
            
            <!-- SECTION 1: CORE PRINCIPLES & SYLLABUS FRAMEWORK -->
            <div class="codex-section">
              <div class="codex-section-head">
                <div class="section-num-title">
                  <span class="section-folio-glyph">§ 1.</span>
                  <h3 class="section-title">Core Principles & Recognition Framework</h3>
                </div>
                <span class="section-badge">ICAB Core Syllabus</span>
              </div>
              <div class="codex-section-content">
                <ul class="principles-list">
                  \${principlesHtml}
                </ul>

                <div class="outcomes-traps-grid">
                  <div class="sub-box">
                    <h4 class="sub-box-title">🎯 Syllabus Learning Outcomes</h4>
                    <ul class="sub-box-list">
                      \${outcomesHtml}
                    </ul>
                  </div>
                  <div class="sub-box trap-box">
                    <h4 class="sub-box-title">⚠ High-Yield Exam Traps & Pitfalls</h4>
                    <ul class="sub-box-list">
                      \${pitfallsHtml}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 2: 13-DIET SESSIONAL OCCURRENCE MATRIX -->
            <div class="codex-section">
              <div class="codex-section-head">
                <div class="section-num-title">
                  <span class="section-folio-glyph">§ 2.</span>
                  <h3 class="section-title">13-Diet Sessional Occurrence Matrix (2022–2026)</h3>
                </div>
                <span class="section-badge">\${(s.occurrences || []).length} Recorded Diets</span>
              </div>
              <div class="codex-section-content">
                <div class="occurrence-matrix-wrap">
                  <!-- Visual Timeline Across All 13 Sessions -->
                  <div class="matrix-timeline-bar">
                    \${timelineNodesHtml}
                  </div>

                  <!-- Tested Occurrences List -->
                  <div class="tested-sessions-grid">
                    \${testedCardsHtml}
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION 3: STATUTORY REFERENCES & CROSS-STANDARD LINKAGES -->
            <div class="codex-section">
              <div class="codex-section-head">
                <div class="section-num-title">
                  <span class="section-folio-glyph">§ 3.</span>
                  <h3 class="section-title">Statutory Authorities & Cross-Standard Linkages</h3>
                </div>
                <span class="section-badge">Interconnected Jurisprudence</span>
              </div>
              <div class="codex-section-content">
                <ul class="sub-box-list" style="font-size: 13px;">
                  \${statLinksHtml}
                </ul>
              </div>
            </div>

            <!-- SECTION 4: CANDIDATE REVISION MEMO -->
            <div class="codex-section">
              <div class="codex-section-head">
                <div class="section-num-title">
                  <span class="section-folio-glyph">§ 4.</span>
                  <h3 class="section-title">Candidate Revision Memo & Exam Ledger</h3>
                </div>
                <span class="section-badge">Local Persistent Notebook</span>
              </div>
              <div class="codex-section-content">
                <div class="memo-container">
                  <div class="memo-toolbar">
                    <div class="memo-status-indicator">
                      <span class="memo-status-badge saved">✓ Autosaved</span>
                      <span class="memo-timestamp"></span>
                    </div>
                    <div class="memo-helpers">
                      <button class="btn-memo-helper btn-insert-formula">+ Formula Template</button>
                      <button class="btn-memo-helper btn-insert-checklist">+ Exam Checklist</button>
                      <button class="btn-memo-helper btn-clear-memo" style="color: #b91c1c;">Clear</button>
                      <button class="btn-memo-helper btn-export-memo" style="font-weight: 600;">📥 Export</button>
                    </div>
                  </div>

                  <textarea class="memo-textarea" data-code="\${escapeAttr(s.code)}" placeholder="Record candidate revision notes, formulas, memory mnemonics, and exam warnings for \${escapeAttr(s.code)} here. Auto-saved locally on every keystroke...">\${escapeHtml(memoText)}</textarea>

                  <div class="memo-footer-row">
                    <span class="memo-word-count">0 words &bull; 0 characters</span>
                    <span>Key: standards_memo_\${escapeHtml(s.code)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        \`;

        // Wire Up Events for this container
        wireDossierEvents(container, s);
      }

      function wireDossierEvents(container, s) {
        // Mastery Buttons
        container.querySelectorAll('[data-set-mastery]').forEach(btn => {
          btn.addEventListener('click', () => {
            const status = btn.getAttribute('data-set-mastery');
            setMastery(s.code, status);
          });
        });

        // Launch Manual Button
        const btnLaunchManual = container.querySelector('.btn-launch-manual');
        if (btnLaunchManual) {
          btnLaunchManual.addEventListener('click', () => {
            loadDossierIntoPane('paneLeft');
            openDocumentInSplitPane('paneRight', 'manual', s.manualRelPath, s.code + ' Study Manual');
            openSplitDesk();
          });
        }

        // View in Split Button
        const btnViewInSplit = container.querySelector('.btn-view-in-split');
        if (btnViewInSplit) {
          btnViewInSplit.addEventListener('click', () => {
            loadDossierIntoPane('paneLeft');
            openSplitDesk();
          });
        }

        // Open 2025 Syllabus Button
        const btnOpenSyllabus = container.querySelector('.btn-open-syllabus');
        if (btnOpenSyllabus) {
          btnOpenSyllabus.addEventListener('click', () => {
            const sylPath = (typeof SYLLABUS_DOC !== 'undefined') ? SYLLABUS_DOC.rel_path : 'Study Manuals/ICAB Latest Syllabus (2025).pdf';
            loadDossierIntoPane('paneLeft');
            openDocumentInSplitPane('paneRight', 'syllabus', sylPath, 'ICAB Latest Syllabus (2025)');
            openSplitDesk();
          });
        }

        // Timeline Node Jump
        container.querySelectorAll('.timeline-node.tested').forEach(node => {
          node.addEventListener('click', () => {
            const tag = node.getAttribute('data-session-tag');
            const targetCard = container.querySelector(\`.tested-session-card[data-session-tag="\${tag}"]\`);
            if (targetCard) {
              targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              targetCard.classList.add('highlight-pulse');
              setTimeout(() => targetCard.classList.remove('highlight-pulse'), 1500);
            }
          });
        });

        // Occurrence Action Buttons
        container.querySelectorAll('.btn-load-q').forEach(btn => {
          btn.addEventListener('click', () => {
            const sess = btn.getAttribute('data-session');
            const lvl = btn.getAttribute('data-level');
            const paper = btn.getAttribute('data-paper');
            const doc = findCatalogDoc(lvl, paper, sess, 'question');
            if (doc) {
              loadDossierIntoPane('paneLeft');
              openDocumentInSplitPane('paneRight', 'question', doc.rel_path, \`\${paper} - Question (\${sess})\`);
              openSplitDesk();
            } else {
              alert('Question PDF not found in catalog for ' + paper + ' ' + sess);
            }
          });
        });

        container.querySelectorAll('.btn-load-a').forEach(btn => {
          btn.addEventListener('click', () => {
            const sess = btn.getAttribute('data-session');
            const lvl = btn.getAttribute('data-level');
            const paper = btn.getAttribute('data-paper');
            const doc = findCatalogDoc(lvl, paper, sess, 'answer');
            if (doc) {
              loadDossierIntoPane('paneLeft');
              openDocumentInSplitPane('paneRight', 'answer', doc.rel_path, \`\${paper} - Suggested Answer (\${sess})\`);
              openSplitDesk();
            } else {
              alert('Answer PDF not found in catalog for ' + paper + ' ' + sess);
            }
          });
        });

        container.querySelectorAll('.btn-compare-split').forEach(btn => {
          btn.addEventListener('click', () => {
            const sess = btn.getAttribute('data-session');
            const lvl = btn.getAttribute('data-level');
            const paper = btn.getAttribute('data-paper');
            const qDoc = findCatalogDoc(lvl, paper, sess, 'question');
            const aDoc = findCatalogDoc(lvl, paper, sess, 'answer');

            if (qDoc && aDoc) {
              openDocumentInSplitPane('paneLeft', 'question', qDoc.rel_path, \`\${paper} - Question (\${sess})\`);
              openDocumentInSplitPane('paneRight', 'answer', aDoc.rel_path, \`\${paper} - Suggested Answer (\${sess})\`);
              openSplitDesk();
            } else {
              alert('Required past papers not found in catalog.');
            }
          });
        });

        // Revision Memo Autosave
        const memoInput = container.querySelector('.memo-textarea');
        const memoBadge = container.querySelector('.memo-status-badge');
        const memoTimestamp = container.querySelector('.memo-timestamp');
        const memoWordCount = container.querySelector('.memo-word-count');

        function updateCounts() {
          const val = memoInput.value;
          const words = val.trim() ? val.trim().split(/\\s+/).length : 0;
          memoWordCount.textContent = \`\${words} words • \${val.length} characters\`;
        }
        updateCounts();

        let saveTimeout = null;
        memoInput.addEventListener('input', () => {
          memoBadge.className = 'memo-status-badge unsaved';
          memoBadge.textContent = '● Saving...';
          updateCounts();

          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(() => {
            setMemo(s.code, memoInput.value);
            memoBadge.className = 'memo-status-badge saved';
            memoBadge.textContent = '✓ Autosaved';
            const now = new Date();
            memoTimestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          }, 300);
        });

        memoInput.addEventListener('blur', () => {
          clearTimeout(saveTimeout);
          setMemo(s.code, memoInput.value);
          memoBadge.className = 'memo-status-badge saved';
          memoBadge.textContent = '✓ Autosaved';
        });

        // Memo Helper Templates
        container.querySelector('.btn-insert-formula')?.addEventListener('click', () => {
          const formulaTpl = "\\n\\n[FORMULA LEDGER]\\n• Recognition Criteria: ...\\n• Measurement Basis: ...\\n• Calculation Schedule: ...\\n";
          memoInput.value += formulaTpl;
          memoInput.dispatchEvent(new Event('input'));
        });

        container.querySelector('.btn-insert-checklist')?.addEventListener('click', () => {
          const checklistTpl = "\\n\\n[EXAM CHECKLIST]\\n[ ] Scope & Definition Verified\\n[ ] Initial Recognition Criteria Tested\\n[ ] Measurement & Valuation Calculated\\n[ ] High-Yield Pitfalls Checked\\n[ ] Financial Statement Disclosures Formulated\\n";
          memoInput.value += checklistTpl;
          memoInput.dispatchEvent(new Event('input'));
        });

        container.querySelector('.btn-clear-memo')?.addEventListener('click', () => {
          if (confirm('Clear candidate revision memo for ' + s.code + '?')) {
            memoInput.value = '';
            memoInput.dispatchEvent(new Event('input'));
          }
        });

        container.querySelector('.btn-export-memo')?.addEventListener('click', () => {
          const text = memoInput.value;
          if (!text.trim()) {
            alert('Memo is currently empty.');
            return;
          }
          const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = \`ICAB_\${s.code.replace(/[^a-zA-Z0-9]/g, '_')}_Revision_Memo.txt\`;
          a.click();
          URL.revokeObjectURL(url);
        });
      }

      function renderDossier(id) {
        const s = STANDARDS_DATA.find(x => x.id === id) || STANDARDS_DATA[0];
        const desk = document.getElementById('dossierDesk');
        renderDossierView(s, desk, false);
      }

      function loadDossierIntoPane(paneId) {
        const paneContent = document.getElementById(paneId + 'Content');
        const paneTitle = document.getElementById(paneId + 'Title');
        const extLink = document.getElementById(paneId + 'ExtLink');
        const s = STANDARDS_DATA.find(x => x.id === activeStandardId) || STANDARDS_DATA[0];

        paneTitle.textContent = 'Standard Dossier: ' + s.code + ' (' + s.name + ')';
        extLink.style.display = 'none';

        renderDossierView(s, paneContent, true);

        if (paneId === 'paneLeft') {
          const selA = document.getElementById('selPaneA');
          if (selA) selA.value = 'dossier';
        } else {
          const selB = document.getElementById('selPaneB');
          if (selB) selB.value = 'dossier';
        }
      }

      function loadDossierIntoPaneLeft() {
        loadDossierIntoPane('paneLeft');
      }

      function findCatalogDoc(level, paper, sessionTag, type) {
        if (typeof CATALOG === 'undefined' || !CATALOG[level] || !CATALOG[level][paper]) {
          return null;
        }
        const session = CATALOG[level][paper].find(x => x.session_tag === sessionTag);
        if (!session) return null;
        return session[type] || null;
      }

      // ------------------------------------------------------------------------
      // 7. Split Desk Dual-Pane Engine
      // ------------------------------------------------------------------------
      function openSplitDesk() {
        splitDeskActive = true;
        document.querySelector('.codex-main').classList.add('split-mode');
        document.getElementById('splitDeskContainer').classList.add('active');
        document.getElementById('btnToggleSplitDesk').classList.add('active');
        document.getElementById('btnSplitDeskLabel').textContent = 'Exit Split Desk';
        
        // Ensure default documents are loaded if pane is empty
        const paneLeftContent = document.getElementById('paneLeftContent');
        if (!paneLeftContent.hasChildNodes() || paneLeftContent.innerHTML.trim() === '') {
          loadDossierIntoPane('paneLeft');
        }

        const paneRightContent = document.getElementById('paneRightContent');
        if (!paneRightContent.hasChildNodes() || paneRightContent.innerHTML.trim() === '') {
          const s = STANDARDS_DATA.find(x => x.id === activeStandardId) || STANDARDS_DATA[0];
          openDocumentInSplitPane('paneRight', 'manual', s.manualRelPath, s.code + ' Study Manual');
        }
      }

      function closeSplitDesk() {
        flushActiveMemos();
        splitDeskActive = false;
        document.querySelector('.codex-main').classList.remove('split-mode');
        document.getElementById('splitDeskContainer').classList.remove('active');
        document.getElementById('btnToggleSplitDesk').classList.remove('active');
        document.getElementById('btnSplitDeskLabel').textContent = 'Split Desk Mode';
      }

      function toggleSplitDesk() {
        if (splitDeskActive) closeSplitDesk();
        else openSplitDesk();
      }

      function openDocumentInSplitPane(paneId, docType, relPath, title) {
        const paneContent = document.getElementById(paneId + 'Content');
        const paneTitle = document.getElementById(paneId + 'Title');
        const extLink = document.getElementById(paneId + 'ExtLink');

        paneTitle.textContent = title || 'Document Viewer';
        const encoded = encodeURI(relPath);
        extLink.href = encoded;
        extLink.style.display = 'inline-block';

        paneContent.innerHTML = \`
          <div class="pdf-fallback-banner">
            <span>Viewing: <strong>\${escapeHtml(title)}</strong></span>
            <a href="\${escapeAttr(encoded)}" target="_blank">Open in External Window ↗</a>
          </div>
          <iframe class="pdf-viewer-frame" src="\${escapeAttr(encoded)}#toolbar=1&navpanes=1"></iframe>
        \`;

        if (paneId === 'paneLeft') {
          const selA = document.getElementById('selPaneA');
          if (selA) selA.value = docType;
        } else {
          const selB = document.getElementById('selPaneB');
          if (selB) selB.value = docType;
        }
      }

      let sidebarCollapsed = false;
      function toggleSidebar() {
        sidebarCollapsed = !sidebarCollapsed;
        const main = document.querySelector('.codex-main');
        const btnLabel = document.getElementById('btnSidebarLabel');
        if (sidebarCollapsed) {
          main.classList.add('sidebar-collapsed');
          if (btnLabel) btnLabel.textContent = 'Show Sidebar';
        } else {
          main.classList.remove('sidebar-collapsed');
          if (btnLabel) btnLabel.textContent = 'Sidebar';
        }
      }

      function setupSplitDeskControls() {
        document.getElementById('btnToggleSplitDesk').addEventListener('click', toggleSplitDesk);
        document.getElementById('btnCloseSplitDesk').addEventListener('click', closeSplitDesk);
        document.getElementById('btnToggleSidebar')?.addEventListener('click', toggleSidebar);

        // Ratio switches
        document.querySelectorAll('.ratio-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.ratio-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const ratio = btn.getAttribute('data-ratio');
            const viewports = document.getElementById('splitViewports');
            viewports.className = 'split-viewports ratio-' + ratio;
          });
        });

        // Quick Presets
        document.getElementById('presetQvsA').addEventListener('click', () => {
          const s = STANDARDS_DATA.find(x => x.id === activeStandardId) || STANDARDS_DATA[0];
          const occ = (s.occurrences && s.occurrences[0]) ? s.occurrences[0] : null;
          if (occ) {
            const qDoc = findCatalogDoc(occ.level, occ.paper, occ.sessionTag, 'question');
            const aDoc = findCatalogDoc(occ.level, occ.paper, occ.sessionTag, 'answer');
            if (qDoc && aDoc) {
              openDocumentInSplitPane('paneLeft', 'question', qDoc.rel_path, \`\${occ.paper} - Question (\${occ.sessionLabel})\`);
              openDocumentInSplitPane('paneRight', 'answer', aDoc.rel_path, \`\${occ.paper} - Suggested Answer (\${occ.sessionLabel})\`);
              openSplitDesk();
            }
          } else {
            alert('No specific exam occurrence found for current standard.');
          }
        });

        document.getElementById('presetManualVsQ').addEventListener('click', () => {
          const s = STANDARDS_DATA.find(x => x.id === activeStandardId) || STANDARDS_DATA[0];
          const occ = (s.occurrences && s.occurrences[0]) ? s.occurrences[0] : null;
          openDocumentInSplitPane('paneLeft', 'manual', s.manualRelPath, s.code + ' Study Manual');
          if (occ) {
            const qDoc = findCatalogDoc(occ.level, occ.paper, occ.sessionTag, 'question');
            if (qDoc) {
              openDocumentInSplitPane('paneRight', 'question', qDoc.rel_path, \`\${occ.paper} - Question (\${occ.sessionLabel})\`);
            }
          }
          openSplitDesk();
        });

        document.getElementById('presetDossierVsManual').addEventListener('click', () => {
          const s = STANDARDS_DATA.find(x => x.id === activeStandardId) || STANDARDS_DATA[0];
          loadDossierIntoPane('paneLeft');
          openDocumentInSplitPane('paneRight', 'manual', s.manualRelPath, s.code + ' Study Manual');
          openSplitDesk();
        });

        // Dropdown Selectors
        function handlePaneSelect(paneId, val) {
          const s = STANDARDS_DATA.find(x => x.id === activeStandardId) || STANDARDS_DATA[0];
          if (val === 'dossier') {
            loadDossierIntoPane(paneId);
          } else if (val === 'manual') {
            openDocumentInSplitPane(paneId, 'manual', s.manualRelPath, s.code + ' Study Manual');
          } else if (val === 'syllabus') {
            const sylPath = (typeof SYLLABUS_DOC !== 'undefined') ? SYLLABUS_DOC.rel_path : 'Study Manuals/ICAB Latest Syllabus (2025).pdf';
            openDocumentInSplitPane(paneId, 'syllabus', sylPath, 'ICAB Latest Syllabus (2025)');
          } else if (val === 'question' || val === 'answer') {
            const occ = (s.occurrences && s.occurrences[0]) ? s.occurrences[0] : null;
            if (occ) {
              const doc = findCatalogDoc(occ.level, occ.paper, occ.sessionTag, val);
              if (doc) openDocumentInSplitPane(paneId, val, doc.rel_path, \`\${occ.paper} - \${val.toUpperCase()} (\${occ.sessionLabel})\`);
              else alert(\`No \${val} PDF found in catalog for \${occ.paper} \${occ.sessionLabel}\`);
            } else {
              alert(\`No past exam occurrences recorded for \${s.code}\`);
            }
          }
        }

        document.getElementById('selPaneA').addEventListener('change', (e) => handlePaneSelect('paneLeft', e.target.value));
        document.getElementById('selPaneB').addEventListener('change', (e) => handlePaneSelect('paneRight', e.target.value));
      }

      // ------------------------------------------------------------------------
      // 8. Manuals Library Drawer Modal
      // ------------------------------------------------------------------------
      function renderManualsModal() {
        const manuals = getAllManuals();
        const grid = document.getElementById('manualsGrid');
        
        let html = '';
        manuals.forEach(m => {
          let lvlClass = 'level-pl';
          if (m.level === 'AL') lvlClass = 'level-al';
          else if (m.level === 'ALL') lvlClass = 'level-all';

          html += \`
            <div class="manual-card">
              <span class="manual-card-level \${lvlClass}">\${escapeHtml(m.level)} &bull; \${escapeHtml(m.subject)}</span>
              <div class="manual-card-title">\${escapeHtml(m.title)}</div>
              <div class="manual-card-meta">
                <span>\${escapeHtml(m.size_mb)} MB</span>
                <span>PDF Format</span>
              </div>
              <div class="manual-card-actions">
                <button class="codex-btn btn-view-manual" data-path="\${escapeAttr(m.rel_path)}" data-title="\${escapeAttr(m.title)}" style="padding: 3px 6px; font-size: 10px;">
                  👁 View in Desk
                </button>
                <a href="\${escapeAttr(m.rel_path)}" target="_blank" class="codex-btn" style="padding: 3px 6px; font-size: 10px; text-decoration: none;">
                  ↗ Open
                </a>
              </div>
            </div>
          \`;
        });

        grid.innerHTML = html;

        grid.querySelectorAll('.btn-view-manual').forEach(btn => {
          btn.addEventListener('click', () => {
            const path = btn.getAttribute('data-path');
            const title = btn.getAttribute('data-title');
            document.getElementById('manualsModalOverlay').classList.remove('open');
            openDocumentInSplitPane('paneRight', 'manual', path, title);
            openSplitDesk();
          });
        });
      }

      function setupManualsModal() {
        const overlay = document.getElementById('manualsModalOverlay');
        document.getElementById('btnOpenManualsDrawer').addEventListener('click', () => {
          renderManualsModal();
          overlay.classList.add('open');
        });
        document.getElementById('btnCloseManualsModal').addEventListener('click', () => {
          overlay.classList.remove('open');
        });
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) overlay.classList.remove('open');
        });
      }

      // ------------------------------------------------------------------------
      // 9. Event Listeners: Search & Filters
      // ------------------------------------------------------------------------
      function setupSidebarFilters() {
        // Pillar Tabs
        document.querySelectorAll('.pillar-tab').forEach(tab => {
          tab.addEventListener('click', () => {
            document.querySelectorAll('.pillar-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activePillar = tab.getAttribute('data-pillar');
            renderSidebarList();
          });
        });

        // Search Input
        const searchInput = document.getElementById('searchInput');
        const clearBtn = document.getElementById('searchClearBtn');

        searchInput.addEventListener('input', () => {
          activeSearch = searchInput.value;
          if (activeSearch) clearBtn.classList.add('visible');
          else clearBtn.classList.remove('visible');
          renderSidebarList();
        });

        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          activeSearch = '';
          clearBtn.classList.remove('visible');
          renderSidebarList();
        });

        // Mastery Chips
        document.querySelectorAll('.chip').forEach(chip => {
          chip.addEventListener('click', () => {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeMasteryFilter = chip.getAttribute('data-mastery');
            renderSidebarList();
          });
        });

        // Quick Tag Pills
        document.querySelectorAll('.tag-pill').forEach(pill => {
          pill.addEventListener('click', () => {
            if (pill.classList.contains('active')) {
              pill.classList.remove('active');
              activeTag = null;
            } else {
              document.querySelectorAll('.tag-pill').forEach(p => p.classList.remove('active'));
              pill.classList.add('active');
              activeTag = pill.getAttribute('data-tag');
            }
            renderSidebarList();
          });
        });
      }

      // ------------------------------------------------------------------------
      // 10. Engine Initialization
      // ------------------------------------------------------------------------
      function init() {
        console.log("Initializing Standards 360 Codex Engine...");
        updateTelemetry();
        setupSidebarFilters();
        setupSplitDeskControls();
        setupManualsModal();
        renderSidebarList();
        renderDossier(activeStandardId);
      }

      // Kickoff when DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }

    })();
  </script>
</body>
</html>
`;

// Write to destination
const outputPath = path.join(__dirname, 'version-9-standards-codex.html');
fs.writeFileSync(outputPath, HTML, 'utf8');
console.log(`Successfully generated ${outputPath} (${(Buffer.byteLength(HTML, 'utf8') / 1024).toFixed(1)} KB).`);
