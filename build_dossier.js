const fs = require('fs');
const path = require('path');

// Read catalog.js to ensure our script builds cleanly
const cat = require('./catalog.js');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AuditDossier™ — Electronic Working Paper Binder & CA Audit Workspace</title>

  <!-- Typography: Inter (UI), JetBrains Mono (Financials & Tick Marks), Newsreader (Editorial Serif) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">

  <style>
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
       2. AUDITDOSSIER DESIGN SYSTEM & TOKENS (Caseware & PwC Aura Inspired)
       ========================================================================== */
    :root {
      /* Deep Slate Base */
      --slate-950: #020617;
      --slate-900: #0f172a;
      --slate-850: #131c31;
      --slate-800: #1e293b;
      --slate-700: #334155;
      --slate-600: #475569;
      --slate-500: #64748b;
      --slate-400: #94a3b8;
      --slate-300: #cbd5e1;
      --slate-200: #e2e8f0;
      --slate-100: #f1f5f9;
      --slate-50:  #f8fafc;

      /* Manila Working Paper Folder Accents */
      --manila-bg:     #fef3c7;
      --manila-tab:    #fde68a;
      --manila-border: #d97706;
      --manila-dark:   #92400e;
      --manila-tab-active: #fffbeb;

      /* Emerald Cross-Foot & Audit Balances */
      --emerald-600: #059669;
      --emerald-500: #10b981;
      --emerald-100: #d1fae5;
      --emerald-50:  #ecfdf5;

      /* Red Tick-Marks & Attention Highlights */
      --tick-red:   #dc2626;
      --tick-blue:  #2563eb;
      --tick-amber: #d97706;

      /* Typography */
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
      --font-serif: 'Newsreader', Georgia, serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--slate-900);
      color: var(--slate-100);
      font-family: var(--font-sans);
      font-size: 13px;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    input, textarea, select, button {
      font-family: inherit;
      font-size: inherit;
    }

    /* Scrollbars */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: var(--slate-900);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--slate-700);
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--slate-500);
    }

    /* ==========================================================================
       3. MASTER DOSSIER INSTITUTIONAL HEADER & TOOLBAR
       ========================================================================== */
    .dossier-header {
      background: linear-gradient(180deg, #162032 0%, #0f172a 100%);
      border-bottom: 2px solid var(--manila-border);
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      flex-shrink: 0;
      gap: 12px;
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    .dossier-seal-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid var(--manila-border);
      border-radius: 6px;
      color: var(--manila-tab);
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 14px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    }

    .brand-titles {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }

    .brand-title {
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.3px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .brand-title span.tag {
      font-size: 9px;
      background: rgba(217, 119, 6, 0.2);
      color: #f59e0b;
      border: 1px solid rgba(217, 119, 6, 0.4);
      padding: 1px 5px;
      border-radius: 3px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .brand-subtitle {
      font-size: 10px;
      color: var(--slate-400);
      font-family: var(--font-mono);
    }

    /* Active File Breadcrumb */
    .dossier-breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--slate-850);
      border: 1px solid var(--slate-700);
      border-radius: 6px;
      padding: 4px 10px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--slate-300);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 480px;
    }

    .dossier-breadcrumb .file-chip {
      background: var(--slate-700);
      color: #f8fafc;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: 600;
      font-size: 10px;
    }

    /* Engagement Sign-Off Workflow Badge */
    .signoff-workflow {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .signoff-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;
      font-family: var(--font-mono);
      letter-spacing: 0.5px;
      border: 1px solid transparent;
    }

    .signoff-pill.status-draft {
      background: rgba(100, 116, 139, 0.2);
      color: #cbd5e1;
      border-color: #475569;
    }
    .signoff-pill.status-draft:hover {
      background: rgba(100, 116, 139, 0.35);
    }

    .signoff-pill.status-reviewed {
      background: rgba(245, 158, 11, 0.18);
      color: #fbbf24;
      border-color: #d97706;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.2);
    }
    .signoff-pill.status-reviewed:hover {
      background: rgba(245, 158, 11, 0.28);
    }

    .signoff-pill.status-signed {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-color: #059669;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.25);
    }
    .signoff-pill.status-signed:hover {
      background: rgba(16, 185, 129, 0.3);
    }

    .signoff-indicator-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
    }

    /* Header Controls */
    .header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .btn-header {
      background: var(--slate-800);
      color: var(--slate-200);
      border: 1px solid var(--slate-700);
      border-radius: 4px;
      padding: 5px 9px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }
    .btn-header:hover {
      background: var(--slate-700);
      color: #ffffff;
      border-color: var(--slate-600);
    }
    .btn-header.active {
      background: var(--manila-border);
      color: #11141a;
      font-weight: 700;
      border-color: #f59e0b;
    }

    /* ==========================================================================
       4. MAIN 2-PANE APP CONTAINER (Left Drawer + Right Workspace)
       ========================================================================== */
    .dossier-body {
      display: flex;
      flex: 1;
      height: calc(100vh - 90px);
      overflow: hidden;
      position: relative;
    }

    /* --------------------------------------------------------------------------
       4.1 LEFT DRAWER: ENGAGEMENT EXPLORER TREE
       -------------------------------------------------------------------------- */
    .engagement-drawer {
      width: 320px;
      background: var(--slate-950);
      border-right: 1px solid var(--slate-800);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      user-select: none;
      transition: width 0.2s ease;
    }

    .drawer-search-bar {
      padding: 10px 12px;
      background: var(--slate-900);
      border-bottom: 1px solid var(--slate-800);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .drawer-search-input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    .drawer-search-input {
      width: 100%;
      background: var(--slate-800);
      border: 1px solid var(--slate-700);
      border-radius: 5px;
      padding: 6px 28px 6px 10px;
      font-size: 12px;
      color: #ffffff;
      outline: none;
    }
    .drawer-search-input:focus {
      border-color: var(--manila-border);
      box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2);
    }

    .drawer-search-clear {
      position: absolute;
      right: 8px;
      background: none;
      border: none;
      color: var(--slate-400);
      cursor: pointer;
      font-size: 14px;
      display: none;
    }
    .drawer-search-clear:hover {
      color: #ffffff;
    }

    .drawer-filter-pills {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      padding-bottom: 2px;
    }

    .filter-chip {
      background: var(--slate-800);
      color: var(--slate-400);
      border: 1px solid var(--slate-700);
      padding: 2px 7px;
      border-radius: 12px;
      font-size: 10px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;
    }
    .filter-chip:hover {
      background: var(--slate-700);
      color: var(--slate-200);
    }
    .filter-chip.active {
      background: rgba(217, 119, 6, 0.25);
      border-color: var(--manila-border);
      color: #f59e0b;
      font-weight: 600;
    }

    .drawer-tree-container {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
    }

    /* Tree Node Elements */
    .tree-section-header {
      padding: 8px 12px 4px 12px;
      font-size: 10px;
      font-weight: 700;
      color: var(--slate-400);
      letter-spacing: 0.8px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
    .tree-section-header:hover {
      color: #ffffff;
    }

    .tree-group {
      margin-bottom: 6px;
    }

    .tree-node-parent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 12px 6px 14px;
      color: var(--slate-300);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      border-left: 2px solid transparent;
      transition: all 0.15s;
    }
    .tree-node-parent:hover {
      background: var(--slate-900);
      color: #ffffff;
    }
    .tree-node-parent.expanded {
      color: #f59e0b;
      border-left-color: var(--manila-border);
      background: rgba(15, 23, 42, 0.7);
    }

    .tree-node-parent .node-label {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tree-node-parent .chevron {
      font-size: 9px;
      transition: transform 0.2s ease;
      color: var(--slate-500);
    }
    .tree-node-parent.expanded .chevron {
      transform: rotate(90deg);
      color: var(--manila-border);
    }

    .tree-sublist {
      display: none;
      background: rgba(10, 15, 25, 0.4);
      border-left: 1px dashed var(--slate-800);
      margin-left: 16px;
      padding-left: 4px;
    }
    .tree-sublist.open {
      display: block;
    }

    .tree-subject-wrap {
      margin: 2px 0;
    }

    .subject-node {
      font-size: 11px;
      padding: 5px 10px 5px 12px;
      border-radius: 4px;
    }
    .subject-node.active-subject {
      color: #f59e0b !important;
      border-left-color: var(--manila-border) !important;
      background: rgba(217, 119, 6, 0.12) !important;
    }

    .tree-leaf-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 10px 4px 8px;
      font-size: 11px;
      color: var(--slate-400);
      cursor: pointer;
      border-radius: 4px;
      margin: 1px 6px 1px 0;
      transition: all 0.15s;
    }
    .tree-leaf-item:hover {
      background: var(--slate-800);
      color: #ffffff;
    }
    .tree-leaf-item.active {
      background: rgba(217, 119, 6, 0.2);
      border: 1px solid rgba(217, 119, 6, 0.4);
      color: #fbbf24;
      font-weight: 600;
    }

    .tree-leaf-item .leaf-title {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tree-leaf-item .badge-wp {
      font-family: var(--font-mono);
      font-size: 9px;
      padding: 1px 4px;
      border-radius: 3px;
      background: var(--slate-800);
      color: var(--slate-300);
      font-weight: 700;
      border: 1px solid var(--slate-700);
    }
    .tree-leaf-item.active .badge-wp {
      background: var(--manila-border);
      color: #11141a;
      border-color: #f59e0b;
    }

    .badge-wp-sub {
      font-family: var(--font-mono);
      font-size: 8px;
      padding: 1px 4px;
      border-radius: 3px;
      background: var(--slate-800);
      color: #f59e0b;
      font-weight: 700;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
    .tree-leaf-item.active .badge-wp-sub {
      background: #f59e0b;
      color: #11141a;
      border-color: #d97706;
    }

    .tree-status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .tree-status-dot.dot-draft { background: var(--slate-600); }
    .tree-status-dot.dot-reviewed { background: #f59e0b; }
    .tree-status-dot.dot-signed { background: #10b981; }

    /* --------------------------------------------------------------------------
       4.2 RIGHT WORKSPACE: DUAL SPLIT & WORKING SCHEDULE LEDGER
       -------------------------------------------------------------------------- */
    .audit-workspace {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--slate-900);
      position: relative;
    }

    /* Dual Split Viewers Container */
    .dossier-split-view {
      display: flex;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      background: var(--slate-950);
      border-bottom: 2px solid var(--slate-800);
      position: relative;
      transition: all 0.2s ease;
    }

    .viewer-pane {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: #0b0f17;
      position: relative;
      min-width: 0;
    }

    .viewer-pane + .viewer-pane {
      border-left: 2px solid var(--slate-800);
    }

    /* Manila Binder Folder Tab Header */
    .manila-tab-bar {
      height: 36px;
      background: var(--slate-900);
      border-bottom: 1px solid var(--slate-800);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      flex-shrink: 0;
    }

    .manila-tabs-list {
      display: flex;
      align-items: flex-end;
      gap: 4px;
      height: 100%;
      padding-top: 4px;
    }

    .manila-tab {
      background: var(--slate-800);
      color: var(--slate-400);
      border: 1px solid var(--slate-700);
      border-bottom: none;
      border-radius: 5px 5px 0 0;
      padding: 5px 12px 6px 12px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      position: relative;
      transition: all 0.15s ease;
    }
    .manila-tab:hover {
      background: var(--slate-700);
      color: #ffffff;
    }
    .manila-tab.active {
      background: var(--manila-tab);
      color: var(--manila-dark);
      border-color: var(--manila-border);
      border-top: 3px solid var(--manila-dark);
      font-weight: 700;
      box-shadow: 0 -2px 5px rgba(217, 119, 6, 0.15);
    }

    .viewer-toolbar {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .btn-viewer-tool {
      background: var(--slate-800);
      border: 1px solid var(--slate-700);
      color: var(--slate-300);
      padding: 3px 7px;
      border-radius: 3px;
      font-size: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      transition: all 0.15s;
    }
    .btn-viewer-tool:hover {
      background: var(--slate-700);
      color: #ffffff;
      border-color: var(--slate-600);
    }

    .pdf-frame-wrapper {
      flex: 1;
      width: 100%;
      height: 100%;
      background: #11141a;
      position: relative;
    }

    .audit-pdf-frame {
      width: 100%;
      height: 100%;
      border: none;
      background: #181d26;
    }

    /* --------------------------------------------------------------------------
       4.3 BOTTOM / DOCKABLE WORKING SCHEDULE LEDGER (The Electronic Audit Schedule)
       -------------------------------------------------------------------------- */
    .working-schedule-pane {
      height: 320px;
      background: #ffffff;
      color: #1e293b;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      border-top: 3px solid var(--manila-border);
      position: relative;
      box-shadow: 0 -4px 12px rgba(0,0,0,0.25);
      transition: height 0.2s ease;
    }

    .working-schedule-pane.maximized {
      height: calc(100% - 0px);
      z-index: 50;
    }

    .working-schedule-pane.minimized {
      height: 40px !important;
      overflow: hidden !important;
    }
    .working-schedule-pane.minimized .schedule-table-wrap,
    .working-schedule-pane.minimized .schedule-footing {
      display: none !important;
    }

    /* Schedule Folder Binder Header */
    .schedule-binder-header {
      background: #f8fafc;
      border-bottom: 1px solid #cbd5e1;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      flex-shrink: 0;
      gap: 12px;
    }

    .schedule-title-block {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
      white-space: nowrap;
    }

    .schedule-tab-chip {
      background: var(--manila-tab);
      border: 1px solid var(--manila-border);
      color: var(--manila-dark);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      font-family: var(--font-mono);
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .schedule-client-meta {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }

    .schedule-client-name {
      font-weight: 700;
      font-size: 12px;
      color: #0f172a;
    }

    .schedule-materiality-line {
      font-size: 10px;
      color: #64748b;
      font-family: var(--font-mono);
    }

    /* Official Partner Certification Seal Stamp */
    .partner-seal-stamp {
      display: none;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.12);
      border: 1.5px dashed var(--emerald-600);
      color: var(--emerald-600);
      padding: 3px 10px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      animation: sealPulse 1.5s infinite alternate ease-in-out;
    }
    .partner-seal-stamp.visible {
      display: flex;
    }

    @keyframes sealPulse {
      from { box-shadow: 0 0 0 rgba(16, 185, 129, 0); }
      to { box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
    }

    .schedule-toolbar {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-ledger-action {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
      padding: 4px 9px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }
    .btn-ledger-action:hover {
      background: #f1f5f9;
      color: #0f172a;
      border-color: #94a3b8;
    }
    .btn-ledger-action.primary {
      background: #0f172a;
      color: #ffffff;
      border-color: #0f172a;
    }
    .btn-ledger-action.primary:hover {
      background: #1e293b;
    }

    /* Ledger Spreadsheet Table */
    .schedule-table-wrap {
      flex: 1;
      overflow-y: auto;
      background: #ffffff;
    }

    .audit-ledger-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      text-align: left;
    }

    .audit-ledger-table th {
      background: #f1f5f9;
      color: #475569;
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 7px 10px;
      border-bottom: 2px solid #cbd5e1;
      border-right: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 10;
      user-select: none;
    }

    .audit-ledger-table td {
      padding: 3px 6px;
      border-bottom: 1px solid #e2e8f0;
      border-right: 1px solid #f1f5f9;
      vertical-align: middle;
      background: #ffffff;
    }

    .audit-ledger-table tr:hover td {
      background: #f8fafc;
    }

    .audit-ledger-table input,
    .audit-ledger-table textarea,
    .audit-ledger-table select {
      width: 100%;
      border: 1px solid transparent;
      padding: 4px 6px;
      border-radius: 3px;
      font-size: 11px;
      background: transparent;
      outline: none;
      color: #0f172a;
      transition: border-color 0.15s, background 0.15s;
    }
    .audit-ledger-table input:focus,
    .audit-ledger-table textarea:focus {
      background: #ffffff;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
    }

    .col-ref { width: 70px; font-family: var(--font-mono); font-weight: 700; }
    .col-ref input { font-family: var(--font-mono); font-weight: 700; color: #b45309; }
    .col-area { width: 170px; }
    .col-risk { width: 150px; }
    .col-tests { min-width: 280px; }
    .col-balance { width: 120px; text-align: right; }
    .col-balance input { text-align: right; font-family: var(--font-mono); font-weight: 600; }
    .col-conclusion { width: 150px; }
    .col-marks { width: 110px; font-family: var(--font-mono); font-weight: 700; color: #dc2626; }
    .col-actions { width: 40px; text-align: center; }

    .btn-delete-row {
      background: none;
      border: none;
      color: #cbd5e1;
      cursor: pointer;
      font-size: 13px;
      border-radius: 3px;
      padding: 2px 5px;
      transition: all 0.15s;
    }
    .btn-delete-row:hover {
      background: #fee2e2;
      color: #dc2626;
    }

    /* Cross-Foot Footing Summary */
    .schedule-footing {
      background: #f8fafc;
      border-top: 2px solid #cbd5e1;
      padding: 6px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      font-family: var(--font-mono);
      font-size: 11px;
    }

    .footing-status-line {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #64748b;
    }

    .footing-autosave-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--emerald-500);
      box-shadow: 0 0 5px rgba(16, 185, 129, 0.5);
    }

    .cross-foot-value {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 13px;
      color: var(--emerald-600);
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 3px 12px;
      border-radius: 4px;
    }

    /* ==========================================================================
       5. DIGITAL AUDITOR TOOLKIT: CA TICK MARKS, CALCULATOR, & REVIEW DRAWER
       ========================================================================== */
    /* Floating Authentic CA Tick-Mark Keypad */
    .tickmark-floating-bar {
      position: absolute;
      bottom: 330px;
      right: 20px;
      background: #0f172a;
      border: 1px solid var(--manila-border);
      border-radius: 8px;
      padding: 6px 10px;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      z-index: 1000;
      user-select: none;
    }

    .tickmark-label {
      font-size: 10px;
      color: var(--manila-tab);
      font-family: var(--font-mono);
      font-weight: 700;
      margin-right: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-tick {
      background: var(--slate-800);
      color: #ffffff;
      border: 1px solid var(--slate-700);
      border-radius: 4px;
      padding: 4px 8px;
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }
    .btn-tick:hover {
      background: var(--slate-700);
      border-color: #f59e0b;
      transform: translateY(-1px);
    }
    .btn-tick[data-mark="✓"] { color: #22c55e; }
    .btn-tick[data-mark="^"] { color: #f59e0b; }
    .btn-tick[data-mark="TB"] { color: #38bdf8; }
    .btn-tick[data-mark="C"] { color: #a855f7; }
    .btn-tick[data-mark="CONF"] { color: #ec4899; }

    /* 10-Key Financial Tape Calculator Widget */
    .calculator-widget {
      position: absolute;
      top: 56px;
      right: 20px;
      width: 290px;
      background: #111827;
      border: 1px solid var(--slate-700);
      border-radius: 8px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.6);
      z-index: 2000;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: var(--font-mono);
    }
    .calculator-widget.open {
      display: flex;
    }

    .calc-header {
      background: var(--slate-900);
      padding: 8px 12px;
      border-bottom: 1px solid var(--slate-800);
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #cbd5e1;
      font-size: 11px;
      font-weight: 700;
    }

    .calc-close-btn {
      background: none;
      border: none;
      color: var(--slate-400);
      cursor: pointer;
      font-size: 14px;
    }
    .calc-close-btn:hover { color: #ffffff; }

    .calc-display {
      background: #030712;
      color: #34d399;
      font-size: 22px;
      font-weight: 700;
      text-align: right;
      padding: 12px;
      border-bottom: 1px solid var(--slate-800);
      overflow-x: auto;
      letter-spacing: 0.5px;
    }

    /* Running Audit Paper Tape Feed */
    .calc-tape-container {
      height: 120px;
      background: #fdf6e2;
      color: #334155;
      font-size: 10px;
      padding: 8px;
      overflow-y: auto;
      border-bottom: 1px solid #cbd5e1;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .tape-line {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed rgba(0,0,0,0.1);
      padding-bottom: 2px;
    }
    .tape-line.subtotal {
      font-weight: 700;
      color: #0f172a;
      border-bottom: 1px double #0f172a;
    }

    .calc-tape-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--slate-900);
      padding: 4px 8px;
      border-bottom: 1px solid var(--slate-800);
      font-size: 10px;
    }

    .btn-tape-action {
      background: var(--slate-800);
      color: var(--slate-300);
      border: 1px solid var(--slate-700);
      border-radius: 3px;
      padding: 2px 6px;
      cursor: pointer;
      font-size: 9px;
    }
    .btn-tape-action:hover {
      background: var(--slate-700);
      color: #ffffff;
    }

    .calc-keypad {
      padding: 10px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      background: var(--slate-950);
    }

    .calc-btn {
      background: var(--slate-800);
      color: #f8fafc;
      border: 1px solid var(--slate-700);
      border-radius: 5px;
      padding: 8px 0;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.1s;
    }
    .calc-btn:hover {
      background: var(--slate-700);
    }
    .calc-btn:active {
      transform: scale(0.96);
    }
    .calc-btn.op {
      background: #1e293b;
      color: #f59e0b;
      font-weight: 700;
    }
    .calc-btn.op:hover {
      background: #334155;
    }
    .calc-btn.equals {
      background: var(--emerald-600);
      color: #ffffff;
      font-weight: 700;
      grid-column: span 1;
    }
    .calc-btn.equals:hover {
      background: var(--emerald-500);
    }
    .calc-btn.special {
      background: #374151;
      color: #fca5a5;
    }

    /* EQCR Audit Review Queries Drawer */
    .review-points-drawer {
      position: absolute;
      top: 52px;
      right: 0;
      bottom: 0;
      width: 340px;
      background: var(--slate-900);
      border-left: 1px solid var(--slate-800);
      box-shadow: -8px 0 24px rgba(0,0,0,0.5);
      z-index: 1500;
      display: none;
      flex-direction: column;
    }
    .review-points-drawer.open {
      display: flex;
    }

    .review-drawer-header {
      padding: 12px 16px;
      background: var(--slate-950);
      border-bottom: 1px solid var(--slate-800);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .review-points-list {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .review-point-card {
      background: var(--slate-800);
      border: 1px solid var(--slate-700);
      border-radius: 6px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 11px;
    }
    .review-point-card.cleared {
      border-color: rgba(16, 185, 129, 0.4);
      background: rgba(16, 185, 129, 0.05);
    }

    .review-point-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--slate-400);
    }

    .review-point-text {
      color: #f1f5f9;
      line-height: 1.4;
    }

    .review-point-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 10px;
      color: var(--slate-400);
      padding-top: 4px;
      border-top: 1px solid var(--slate-750);
    }

    .review-drawer-footer {
      padding: 12px;
      background: var(--slate-950);
      border-top: 1px solid var(--slate-800);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .review-input {
      background: var(--slate-800);
      border: 1px solid var(--slate-700);
      border-radius: 4px;
      padding: 6px 10px;
      color: #ffffff;
      font-size: 11px;
      outline: none;
    }

    /* Toast Notification */
    .toast-popup {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: #0f172a;
      border: 1px solid var(--manila-border);
      color: #fde68a;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 11px;
      font-family: var(--font-mono);
      box-shadow: 0 4px 16px rgba(0,0,0,0.5);
      z-index: 10000;
      display: none;
      animation: fadeIn 0.15s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translate(-50%, 8px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    /* Print Stylesheet */
    @media print {
      .ui-study-bar, .dossier-header, .engagement-drawer,
      .dossier-split-view, .schedule-toolbar, .tickmark-floating-bar,
      .calculator-widget, .review-points-drawer {
        display: none !important;
      }
      body, .audit-workspace, .working-schedule-pane {
        background: #ffffff !important;
        color: #000000 !important;
        height: auto !important;
        overflow: visible !important;
      }
      .partner-seal-stamp.visible {
        border-color: #000000 !important;
        color: #000000 !important;
      }
    }
  </style>
</head>
<body>

  <!-- ========================================================================
       1. UNIVERSAL ECOSYSTEM STUDY BAR (All 11 Versions)
       ======================================================================== -->
  <header class="ui-study-bar">
    <div class="ui-study-brand">
      <span class="ui-study-tag">STUDY WORKSPACES</span>
      <span>ICAB Chartered Archive Ecosystem</span>
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
      <a href="version-9-standards-codex.html" class="ui-study-link">09 Standards Codex</a>
      <a href="version-10-audit-dossier.html" class="ui-study-link active">10 Audit Dossier</a>
      <a href="version-11-trend-radar.html" class="ui-study-link">11 Trend Radar</a>
    </nav>
  </header>

  <!-- ========================================================================
       2. MASTER DOSSIER INSTITUTIONAL HEADER & TOOLBAR
       ======================================================================== -->
  <header class="dossier-header">
    <div class="brand-section">
      <div class="dossier-seal-badge">AD</div>
      <div class="brand-titles">
        <div class="brand-title">
          <span>AuditDossier™</span>
          <span class="tag">ICAB Working Papers</span>
        </div>
        <div class="brand-subtitle">Caseware & PwC Aura Electronic Binder Framework</div>
      </div>
    </div>

    <!-- Active File Breadcrumb Indicator -->
    <div class="dossier-breadcrumb" id="active-breadcrumb">
      <span class="file-chip" id="bc-level">PL</span>
      <span id="bc-diet">May 2026</span>
      <span>/</span>
      <span id="bc-paper" style="font-weight: 700; color: #f59e0b;">Audit & Assurance</span>
      <span>•</span>
      <span id="bc-wp-ref">WP-100 & WP-200 DUAL DOSSIER</span>
    </div>

    <!-- Engagement Sign-Off Workflow & Top Tools -->
    <div class="signoff-workflow">
      <div class="signoff-pill status-draft" id="btn-signoff-toggle" title="Click to cycle sign-off status: DRAFT -> SENIOR REVIEWED -> PARTNER SIGNED OFF">
        <span class="signoff-indicator-dot"></span>
        <span id="signoff-status-text">DRAFT PREPARATION</span>
      </div>

      <div class="header-actions">
        <!-- Dual Split Toggle -->
        <button class="btn-header" id="btn-toggle-split" title="Toggle Split View Mode">
          <span>◫</span>
          <span id="label-split-mode">Dual Split</span>
        </button>

        <!-- Financial Tape Calculator -->
        <button class="btn-header" id="btn-toggle-calc" title="Open 10-Key Financial Tape Calculator">
          <span>🧮</span>
          <span>10-Key Calc</span>
        </button>

        <!-- CA Tick-Mark Keypad Floating Bar Toggle -->
        <button class="btn-header" id="btn-toggle-tickmarks" title="Toggle CA Tick-Mark Keypad">
          <span>✓^</span>
          <span>Tick Marks</span>
        </button>

        <!-- EQCR Review Points Drawer -->
        <button class="btn-header" id="btn-toggle-reviews" title="Audit Review Queries">
          <span>📝</span>
          <span id="badge-reviews-count">Reviews (2)</span>
        </button>
      </div>
    </div>
  </header>

  <!-- ========================================================================
       3. WORKSPACE BODY: ENGAGEMENT EXPLORER TREE + AUDIT WORKSPACE
       ======================================================================== -->
  <main class="dossier-body">
    
    <!-- ----------------------------------------------------------------------
         3.1 LEFT DRAWER: ENGAGEMENT EXPLORER TREE
         ---------------------------------------------------------------------- -->
    <aside class="engagement-drawer" id="engagement-drawer">
      <div class="drawer-search-bar">
        <div class="drawer-search-input-wrap">
          <input type="text" class="drawer-search-input" id="binder-search-input" placeholder="Search working papers, diets, IVS...">
          <button class="drawer-search-clear" id="btn-clear-search">&times;</button>
        </div>
        <div class="drawer-filter-pills">
          <button class="filter-chip active" data-filter="all">All Files</button>
          <button class="filter-chip" data-filter="paf">000 PAF</button>
          <button class="filter-chip" data-filter="guides">100 Guides</button>
          <button class="filter-chip" data-filter="caf">200 CAF</button>
          <button class="filter-chip" data-filter="signed">Signed Off</button>
        </div>
      </div>

      <div class="drawer-tree-container" id="drawer-tree">
        <!-- Rendered dynamically by script -->
      </div>
    </aside>

    <!-- ----------------------------------------------------------------------
         3.2 RIGHT WORKSPACE: DUAL SPLIT & WORKING SCHEDULE LEDGER
         ---------------------------------------------------------------------- -->
    <section class="audit-workspace" id="audit-workspace">

      <!-- DUAL SPLIT WORKSPACE PANES -->
      <div class="dossier-split-view" id="dossier-split-view">
        
        <!-- LEFT PANE: QUESTION EXHIBITS / WORKING PAPERS -->
        <div class="viewer-pane" id="pane-left">
          <div class="manila-tab-bar">
            <div class="manila-tabs-list">
              <div class="manila-tab active" id="tab-left-title">
                <span>📁</span>
                <span id="title-left-text">WP-100 Question Exhibits</span>
              </div>
            </div>
            <div class="viewer-toolbar">
              <button class="btn-viewer-tool" id="btn-swap-viewers" title="Swap Left and Right Viewers">⇄ Swap</button>
              <a href="#" target="_blank" class="btn-viewer-tool" id="link-external-left" title="Open in New Window">↗ External</a>
            </div>
          </div>
          <div class="pdf-frame-wrapper">
            <iframe class="audit-pdf-frame" id="frame-left" src="about:blank"></iframe>
          </div>
        </div>

        <!-- RIGHT PANE: COUNCIL SOLUTIONS / SUGGESTED ANSWERS -->
        <div class="viewer-pane" id="pane-right">
          <div class="manila-tab-bar">
            <div class="manila-tabs-list">
              <div class="manila-tab active" id="tab-right-title">
                <span>📘</span>
                <span id="title-right-text">WP-200 Council Suggested Answers</span>
              </div>
            </div>
            <div class="viewer-toolbar">
              <a href="#" target="_blank" class="btn-viewer-tool" id="link-external-right" title="Open in New Window">↗ External</a>
            </div>
          </div>
          <div class="pdf-frame-wrapper">
            <iframe class="audit-pdf-frame" id="frame-right" src="about:blank"></iframe>
          </div>
        </div>

      </div>

      <!-- INTERACTIVE WORKING SCHEDULE LEDGER -->
      <div class="working-schedule-pane" id="working-schedule-pane">
        
        <!-- Manila Folder Binder Header -->
        <div class="schedule-binder-header">
          <div class="schedule-title-block">
            <div class="schedule-tab-chip">
              <span>📋</span>
              <span id="ledger-wp-ref">WP-300 / AA</span>
            </div>
            <div class="schedule-client-meta">
              <div class="schedule-client-name" id="ledger-session-name">SUBSTANTIVE AUDIT WORKING SCHEDULE — May 2026 Diet</div>
              <div class="schedule-materiality-line">Planning Materiality: BDT 2,500K | Performance Materiality: BDT 1,875K | Tolerable Error: BDT 125K</div>
            </div>
          </div>

          <!-- Official Partner Certification Seal -->
          <div class="partner-seal-stamp" id="partner-seal-stamp">
            <span>🛡️</span>
            <span>PARTNER SIGNED OFF • FCA 1488 • ICAB AUDIT COMPLIANCE VERIFIED</span>
          </div>

          <!-- Schedule Actions -->
          <div class="schedule-toolbar">
            <button class="btn-ledger-action primary" id="btn-add-row">+ Add Working Row</button>
            <button class="btn-ledger-action" id="btn-reset-template">↺ Standard Template</button>
            <button class="btn-ledger-action" id="btn-export-csv">⤓ CSV</button>
            <button class="btn-ledger-action" id="btn-print-wp">🖨️ Print WP</button>
            <button class="btn-ledger-action" id="btn-minimize-ledger" title="Collapse schedule to view exhibits full height">_ Minimize</button>
            <button class="btn-ledger-action" id="btn-toggle-ledger-size" title="Expand/Collapse Ledger Height">↕ Maximize</button>
          </div>
        </div>

        <!-- Ledger Spreadsheet Table -->
        <div class="schedule-table-wrap">
          <table class="audit-ledger-table" id="audit-ledger-table">
            <thead>
              <tr>
                <th class="col-ref">WP Ref</th>
                <th class="col-area">Audit Area / Account Head</th>
                <th class="col-risk">Assessed Risk & Assertions</th>
                <th class="col-tests">Substantive Audit Procedures & Testing Documentation</th>
                <th class="col-balance">Audited Balance (BDT '000)</th>
                <th class="col-conclusion">Audit Conclusion & Findings</th>
                <th class="col-marks">Audit Marks</th>
                <th class="col-actions"></th>
              </tr>
            </thead>
            <tbody id="ledger-tbody">
              <!-- Rendered dynamically -->
            </tbody>
          </table>
        </div>

        <!-- Cross-Foot Footing Summary -->
        <div class="schedule-footing">
          <div class="footing-status-line">
            <span class="footing-autosave-dot"></span>
            <span id="footing-save-label">Autosaved to localStorage</span>
            <span>•</span>
            <span id="footing-rows-count">5 Working Rows</span>
          </div>

          <div class="cross-foot-value" id="cross-foot-total">
            <span style="font-size: 10px; color: #047857; text-transform: uppercase;">Cross-Foot Cast (^=):</span>
            <span id="cross-foot-amount">BDT 96,100.00</span>
          </div>
        </div>

      </div>

    </section>
  </main>

  <!-- ========================================================================
       4. DIGITAL AUDITOR TOOLKIT: FLOATING WIDGETS
       ======================================================================== -->
  
  <!-- Authentic CA Tick-Mark Keypad Floating Bar -->
  <div class="tickmark-floating-bar" id="tickmark-bar">
    <span class="tickmark-label">CA Tick Marks:</span>
    <button class="btn-tick" data-mark="✓" title="Vouched & Verified">✓ Vouched</button>
    <button class="btn-tick" data-mark="^" title="Cross-Footed / Casted">^ Cross-Foot</button>
    <button class="btn-tick" data-mark="TB" title="Agreed to Trial Balance">TB Trial Bal</button>
    <button class="btn-tick" data-mark="C" title="Calculation Recalculated">C Recalc</button>
    <button class="btn-tick" data-mark="CONF" title="Direct Third-Party Confirmation">CONF Direct Conf</button>
    <button class="btn-tick" data-mark="PY" title="Agreed to Prior Year">PY Prior Year</button>
    <button class="btn-tick" data-mark="GL" title="Agreed to General Ledger">GL Ledger</button>
  </div>

  <!-- 10-Key Financial Tape Calculator Widget -->
  <div class="calculator-widget" id="calc-widget">
    <div class="calc-header">
      <span>10-KEY FINANCIAL TAPE CALCULATOR</span>
      <button class="calc-close-btn" id="btn-close-calc">&times;</button>
    </div>

    <div class="calc-display" id="calc-display">0.00</div>

    <!-- Running Audit Paper Tape Feed -->
    <div class="calc-tape-container" id="calc-tape">
      <div class="tape-line subtotal">
        <span>TAPE INITIALIZED</span>
        <span>0.00 ^</span>
      </div>
    </div>

    <!-- Tape Actions -->
    <div class="calc-tape-actions">
      <button class="btn-tape-action" id="btn-tape-to-notes">Copy to Active Note</button>
      <button class="btn-tape-action" id="btn-copy-tape-text">Copy Text</button>
      <button class="btn-tape-action" id="btn-clear-tape">Clear Tape</button>
    </div>

    <!-- 10-Key Keypad -->
    <div class="calc-keypad">
      <button class="calc-btn special" data-action="clear-entry">CE</button>
      <button class="calc-btn special" data-action="clear-all">C</button>
      <button class="calc-btn special" data-action="backspace">⌫</button>
      <button class="calc-btn op" data-action="div">÷</button>

      <button class="calc-btn" data-num="7">7</button>
      <button class="calc-btn" data-num="8">8</button>
      <button class="calc-btn" data-num="9">9</button>
      <button class="calc-btn op" data-action="mul">×</button>

      <button class="calc-btn" data-num="4">4</button>
      <button class="calc-btn" data-num="5">5</button>
      <button class="calc-btn" data-num="6">6</button>
      <button class="calc-btn op" data-action="sub">-</button>

      <button class="calc-btn" data-num="1">1</button>
      <button class="calc-btn" data-num="2">2</button>
      <button class="calc-btn" data-num="3">3</button>
      <button class="calc-btn op" data-action="add">+</button>

      <button class="calc-btn" data-num="0">0</button>
      <button class="calc-btn" data-num="00">00</button>
      <button class="calc-btn" data-action="dot">.</button>
      <button class="calc-btn equals" data-action="equals">=</button>
    </div>
  </div>

  <!-- Audit Review Queries (EQCR) Drawer -->
  <aside class="review-points-drawer" id="review-drawer">
    <div class="review-drawer-header">
      <span style="font-weight: 700; font-size: 12px; color: #f59e0b;">ENGAGEMENT QUALITY CONTROL REVIEWS (EQCR)</span>
      <button class="calc-close-btn" id="btn-close-reviews">&times;</button>
    </div>
    <div class="review-points-list" id="review-points-list">
      <!-- Cards rendered dynamically -->
    </div>
    <div class="review-drawer-footer">
      <input type="text" class="review-input" id="new-review-query" placeholder="Raise new audit review query / review point...">
      <button class="btn-ledger-action primary" id="btn-add-review-point">+ Raise Review Point</button>
    </div>
  </aside>

  <!-- Floating Toast Popup -->
  <div class="toast-popup" id="toast-popup"></div>

  <!-- Ingest Catalog Metadata -->
  <script src="catalog.js"></script>

  <!-- ========================================================================
       5. APPLICATION LOGIC & CONTROLLER
       ======================================================================== -->
  <script>
    (function () {
      'use strict';

      // ------------------------------------------------------------------------
      // HARDENED MANUALS INGESTION VIA getAllManuals()
      // Standard signature: function getAllManuals()
      // ------------------------------------------------------------------------
      function getAllManuals() {
        const manuals = [];
        if (typeof CATALOG !== 'undefined' && CATALOG && CATALOG.Manuals) {
          const levels = ['PL', 'AL'];
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

      // ------------------------------------------------------------------------
      // APPLICATION STATE
      // ------------------------------------------------------------------------
      const STATE = {
        currentLevel: 'PL',
        currentSubject: 'Audit & Assurance',
        currentPaperCode: 'AA',
        currentDietTag: '2026-05_May',
        currentDietLabel: 'May 2026',
        
        // Active docs loaded in left and right panes
        leftDoc: null,
        rightDoc: null,
        
        // Workspace view modes: 'dual' (50/50), 'left-only', 'right-only'
        viewMode: 'dual',
        ledgerHeightState: 'standard', // 'minimized', 'standard', 'maximized'
        
        // Last focused input for inserting tick-marks
        activeInput: null,
        
        // Filter in sidebar
        activeCategoryFilter: 'all',
        searchQuery: '',
        
        // Working paper schedule
        ledgerRows: []
      };

      // Toast Helper
      function showToast(msg) {
        const toast = document.getElementById('toast-popup');
        if (!toast) return;
        toast.textContent = msg;
        toast.style.display = 'block';
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
          toast.style.display = 'none';
        }, 2600);
      }

      // ------------------------------------------------------------------------
      // ENGAGEMENT SIGN-OFF WORKFLOW
      // DRAFT -> SENIOR REVIEWED -> PARTNER SIGNED OFF
      // Persisted to localStorage under audit_signoff_\${paper}_\${diet}
      // ------------------------------------------------------------------------
      function getSignOffKey() {
        return 'audit_signoff_' + STATE.currentPaperCode + '_' + STATE.currentDietTag;
      }

      function getSignOffStatus(paperCode, dietTag) {
        const key = 'audit_signoff_' + paperCode + '_' + dietTag;
        return localStorage.getItem(key) || 'DRAFT';
      }

      function setSignOffStatus(paperCode, dietTag, status) {
        const key = 'audit_signoff_' + paperCode + '_' + dietTag;
        localStorage.setItem(key, status);
        renderSignOffPill();
        updatePartnerSeal();
        updateTreeStatusDots();
      }

      function cycleSignOffStatus() {
        const current = getSignOffStatus(STATE.currentPaperCode, STATE.currentDietTag);
        let next = 'DRAFT';
        if (current === 'DRAFT') next = 'SENIOR REVIEWED';
        else if (current === 'SENIOR REVIEWED') next = 'PARTNER SIGNED OFF';
        else if (current === 'PARTNER SIGNED OFF') next = 'DRAFT';

        setSignOffStatus(STATE.currentPaperCode, STATE.currentDietTag, next);
        showToast('Engagement Sign-Off updated: ' + next);
      }

      function renderSignOffPill() {
        const pill = document.getElementById('btn-signoff-toggle');
        const text = document.getElementById('signoff-status-text');
        if (!pill || !text) return;

        const status = getSignOffStatus(STATE.currentPaperCode, STATE.currentDietTag);
        pill.className = 'signoff-pill';

        if (status === 'PARTNER SIGNED OFF') {
          pill.classList.add('status-signed');
          text.textContent = 'PARTNER SIGNED OFF';
        } else if (status === 'SENIOR REVIEWED') {
          pill.classList.add('status-reviewed');
          text.textContent = 'SENIOR REVIEWED';
        } else {
          pill.classList.add('status-draft');
          text.textContent = 'DRAFT PREPARATION';
        }
      }

      function updatePartnerSeal() {
        const seal = document.getElementById('partner-seal-stamp');
        if (!seal) return;
        const status = getSignOffStatus(STATE.currentPaperCode, STATE.currentDietTag);
        if (status === 'PARTNER SIGNED OFF') {
          seal.classList.add('visible');
        } else {
          seal.classList.remove('visible');
        }
      }

      // ------------------------------------------------------------------------
      // WORKING SCHEDULE LEDGER CONTROLLER
      // Storage key: audit_dossier_\${paper}_\${diet}
      // ------------------------------------------------------------------------
      function getLedgerStorageKey() {
        return 'audit_dossier_' + STATE.currentPaperCode + '_' + STATE.currentDietTag;
      }

      function getDefaultLedgerRows(paperCode, dietLabel) {
        if (paperCode === 'AA' || paperCode === 'CR') {
          return [
            {
              ref: 'A-10',
              area: 'Cash & Bank Balances',
              risk: 'Existence & Cut-off',
              tests: 'Direct circularization confirmation requested from Dhaka Bank & SCB; agreed balances to bank statements and year-end bank reconciliation. ✓ CONF TB',
              balance: 14250.00,
              conclusion: 'Satisfactory / No Exception',
              marks: '✓ CONF TB'
            },
            {
              ref: 'B-20',
              area: 'Trade Receivables & ECL',
              risk: 'Valuation (IFRS 9 Expected Loss)',
              tests: 'Circularized top 25 debtors. Tested aging analysis; recalculated ECL provision across Stage 1 and Stage 2 balances. ✓ C TB',
              balance: 28400.00,
              conclusion: 'Provision Adequate',
              marks: '✓ C TB'
            },
            {
              ref: 'C-01',
              area: 'Inventory Valuation (IAS 2)',
              risk: 'Lower of Cost and NRV',
              tests: 'Attended physical inventory count at central warehouse; test counted raw materials and finished goods. Reviewed selling prices post year-end for NRV testing. ✓ ^ TB',
              balance: 34800.00,
              conclusion: 'Valuation Verified',
              marks: '✓ ^ TB'
            },
            {
              ref: 'D-15',
              area: 'Revenue Recognition & Cut-off',
              risk: 'Cut-off & Premature Billing',
              tests: 'Sampled 30 dispatches 10 days before and after reporting date. Traced VAT Challan 6.3 and customer delivery acknowledgment. ✓ TB',
              balance: 18650.00,
              conclusion: 'Cut-off Maintained',
              marks: '✓ TB'
            },
            {
              ref: 'E-05',
              area: 'Going Concern (ISA 570)',
              risk: 'Liquidity & Cash Flow Horizon',
              tests: 'Reviewed management 12-month projected cash flow forecast and banking credit facilities. Stress tested interest rate increase and inflation impacts. ✓ C',
              balance: 0.00,
              conclusion: 'Assumption Appropriate',
              marks: '✓ C'
            }
          ];
        }

        // Generic Default Rows
        return [
          {
            ref: 'S-01',
            area: 'Primary Operational Assets',
            risk: 'Existence & Carrying Value',
            tests: 'Examined supporting documentation, title deeds, and verified register. ✓ TB',
            balance: 50000.00,
            conclusion: 'Satisfactory / Verified',
            marks: '✓ TB'
          },
          {
            ref: 'S-02',
            area: 'Working Capital & Liabilities',
            risk: 'Completeness & Timely Accrual',
            tests: 'Tested subsequent payments and supplier statements for unrecorded liabilities. ✓ ^ TB',
            balance: 32500.00,
            conclusion: 'Materially Fair',
            marks: '✓ ^ TB'
          },
          {
            ref: 'S-03',
            area: 'Statutory Compliance & Taxes',
            risk: 'Compliance with Income Tax & VAT Act',
            tests: 'Verified tax computation, advance tax payments, and assessed deferred tax calculation under IAS 12. ✓ C',
            balance: 13600.00,
            conclusion: 'Adequately Disclosed',
            marks: '✓ C'
          }
        ];
      }

      function loadLedger() {
        const key = getLedgerStorageKey();
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            STATE.ledgerRows = JSON.parse(saved);
          } catch (e) {
            STATE.ledgerRows = getDefaultLedgerRows(STATE.currentPaperCode, STATE.currentDietLabel);
          }
        } else {
          STATE.ledgerRows = getDefaultLedgerRows(STATE.currentPaperCode, STATE.currentDietLabel);
        }
        renderLedgerTable();
        recalculateCrossFoot();
      }

      function saveLedger() {
        const key = getLedgerStorageKey();
        localStorage.setItem(key, JSON.stringify(STATE.ledgerRows));
        
        const saveLabel = document.getElementById('footing-save-label');
        if (saveLabel) {
          const now = new Date();
          const timeStr = now.toTimeString().split(' ')[0];
          saveLabel.textContent = 'Autosaved to ' + key + ' at ' + timeStr;
        }
      }

      function renderLedgerTable() {
        const tbody = document.getElementById('ledger-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';

        document.getElementById('ledger-wp-ref').textContent = 'WP-300 / ' + STATE.currentPaperCode;
        document.getElementById('ledger-session-name').textContent = 'SUBSTANTIVE AUDIT WORKING SCHEDULE — ' + STATE.currentDietLabel + ' (' + STATE.currentSubject + ')';
        document.getElementById('footing-rows-count').textContent = STATE.ledgerRows.length + ' Working Rows';

        STATE.ledgerRows.forEach((row, idx) => {
          const tr = document.createElement('tr');

          // WP Ref
          const tdRef = document.createElement('td');
          tdRef.className = 'col-ref';
          const inputRef = document.createElement('input');
          inputRef.value = row.ref || '';
          inputRef.addEventListener('input', e => { row.ref = e.target.value; saveLedger(); });
          inputRef.addEventListener('focus', () => { STATE.activeInput = inputRef; });
          tdRef.appendChild(inputRef);

          // Audit Area
          const tdArea = document.createElement('td');
          tdArea.className = 'col-area';
          const inputArea = document.createElement('input');
          inputArea.value = row.area || '';
          inputArea.addEventListener('input', e => { row.area = e.target.value; saveLedger(); });
          inputArea.addEventListener('focus', () => { STATE.activeInput = inputArea; });
          tdArea.appendChild(inputArea);

          // Risk & Assertions
          const tdRisk = document.createElement('td');
          tdRisk.className = 'col-risk';
          const inputRisk = document.createElement('input');
          inputRisk.value = row.risk || '';
          inputRisk.addEventListener('input', e => { row.risk = e.target.value; saveLedger(); });
          inputRisk.addEventListener('focus', () => { STATE.activeInput = inputRisk; });
          tdRisk.appendChild(inputRisk);

          // Substantive Tests
          const tdTests = document.createElement('td');
          tdTests.className = 'col-tests';
          const inputTests = document.createElement('input');
          inputTests.value = row.tests || '';
          inputTests.addEventListener('input', e => { row.tests = e.target.value; saveLedger(); });
          inputTests.addEventListener('focus', () => { STATE.activeInput = inputTests; });
          tdTests.appendChild(inputTests);

          // Audited Balance (BDT '000)
          const tdBal = document.createElement('td');
          tdBal.className = 'col-balance';
          const inputBal = document.createElement('input');
          inputBal.type = 'number';
          inputBal.step = '0.01';
          inputBal.value = Number(row.balance || 0).toFixed(2);
          inputBal.addEventListener('input', e => {
            row.balance = parseFloat(e.target.value) || 0;
            saveLedger();
            recalculateCrossFoot();
          });
          inputBal.addEventListener('focus', () => { STATE.activeInput = inputBal; });
          tdBal.appendChild(inputBal);

          // Conclusion
          const tdConcl = document.createElement('td');
          tdConcl.className = 'col-conclusion';
          const inputConcl = document.createElement('input');
          inputConcl.value = row.conclusion || '';
          inputConcl.addEventListener('input', e => { row.conclusion = e.target.value; saveLedger(); });
          inputConcl.addEventListener('focus', () => { STATE.activeInput = inputConcl; });
          tdConcl.appendChild(inputConcl);

          // Audit Marks
          const tdMarks = document.createElement('td');
          tdMarks.className = 'col-marks';
          const inputMarks = document.createElement('input');
          inputMarks.value = row.marks || '';
          inputMarks.style.color = '#dc2626';
          inputMarks.style.fontWeight = '700';
          inputMarks.addEventListener('input', e => { row.marks = e.target.value; saveLedger(); });
          inputMarks.addEventListener('focus', () => { STATE.activeInput = inputMarks; });
          tdMarks.appendChild(inputMarks);

          // Actions (Delete)
          const tdAct = document.createElement('td');
          tdAct.className = 'col-actions';
          const btnDel = document.createElement('button');
          btnDel.className = 'btn-delete-row';
          btnDel.innerHTML = '✕';
          btnDel.title = 'Delete working row';
          btnDel.addEventListener('click', () => {
            STATE.ledgerRows.splice(idx, 1);
            saveLedger();
            renderLedgerTable();
            recalculateCrossFoot();
          });
          tdAct.appendChild(btnDel);

          tr.appendChild(tdRef);
          tr.appendChild(tdArea);
          tr.appendChild(tdRisk);
          tr.appendChild(tdTests);
          tr.appendChild(tdBal);
          tr.appendChild(tdConcl);
          tr.appendChild(tdMarks);
          tr.appendChild(tdAct);

          tbody.appendChild(tr);
        });
      }

      function recalculateCrossFoot() {
        let total = 0;
        STATE.ledgerRows.forEach(r => {
          total += (parseFloat(r.balance) || 0);
        });

        const formatted = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const amtEl = document.getElementById('cross-foot-amount');
        if (amtEl) {
          amtEl.textContent = 'BDT ' + formatted;
        }
      }

      function addLedgerRow() {
        const nextIdx = STATE.ledgerRows.length + 1;
        const newRow = {
          ref: 'WP-' + (nextIdx * 10),
          area: 'New Audit Area / Test',
          risk: 'Valuation & Existence',
          tests: 'Vouched supporting evidence and audited client calculations. ✓ TB',
          balance: 10000.00,
          conclusion: 'Verified',
          marks: '✓ TB'
        };
        STATE.ledgerRows.push(newRow);
        saveLedger();
        renderLedgerTable();
        recalculateCrossFoot();
        showToast('Added working row: ' + newRow.ref);
      }

      function resetLedgerDefaults() {
        if (!confirm('Reset schedule to standard template for ' + STATE.currentPaperCode + '?')) return;
        STATE.ledgerRows = getDefaultLedgerRows(STATE.currentPaperCode, STATE.currentDietLabel);
        saveLedger();
        renderLedgerTable();
        recalculateCrossFoot();
        showToast('Schedule reset to default template');
      }

      function exportLedgerCSV() {
        let csv = 'WP Ref,Audit Area,Assessed Risk,Substantive Tests,Audited Balance (BDT 000),Conclusion,Audit Marks\\n';
        STATE.ledgerRows.forEach(r => {
          const clean = str => '"' + String(str || '').replace(/"/g, '""') + '"';
          csv += [clean(r.ref), clean(r.area), clean(r.risk), clean(r.tests), r.balance || 0, clean(r.conclusion), clean(r.marks)].join(',') + '\\n';
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AuditSchedule_' + STATE.currentPaperCode + '_' + STATE.currentDietTag + '.csv';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Exported CSV audit working papers');
      }

      // ------------------------------------------------------------------------
      // CA TICK-MARK KEYPAD LOGIC
      // ------------------------------------------------------------------------
      function setupTickMarks() {
        const buttons = document.querySelectorAll('.btn-tick');
        buttons.forEach(btn => {
          btn.addEventListener('mousedown', (e) => {
            // Prevent button click from stealing focus from active input
            e.preventDefault();
          });
          btn.addEventListener('click', () => {
            const mark = btn.getAttribute('data-mark');
            insertTickMark(mark);
          });
        });
      }

      function insertTickMark(mark) {
        let input = STATE.activeInput;
        if (input && !input.isConnected) {
          STATE.activeInput = null;
          input = null;
        }

        if (input) {
          // If focused on numeric balance field, do not insert non-numeric text that invalidates the number
          if (input.type === 'number' || input.parentElement.classList.contains('col-balance')) {
            const tr = input.closest('tr');
            const marksInput = tr ? tr.querySelector('.col-marks input') : null;
            if (marksInput) {
              marksInput.value = (marksInput.value ? marksInput.value + ' ' : '') + mark;
              marksInput.dispatchEvent(new Event('input'));
              showToast('Appended ' + mark + ' to row Audit Marks');
              return;
            }
          }

          const start = input.selectionStart != null ? input.selectionStart : input.value.length;
          const end = input.selectionEnd != null ? input.selectionEnd : input.value.length;
          const val = input.value;
          input.value = val.substring(0, start) + ' ' + mark + ' ' + val.substring(end);
          input.dispatchEvent(new Event('input'));
          input.focus();
          const nextPos = start + mark.length + 2;
          if (input.setSelectionRange) {
            input.setSelectionRange(nextPos, nextPos);
          }
          showToast('Inserted audit mark ' + mark + ' into active field');
        } else {
          // Copy to clipboard fallback
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(mark);
          }
          showToast('Copied ' + mark + ' to clipboard (focus a cell to insert directly)');
        }
      }

      // ------------------------------------------------------------------------
      // 10-KEY FINANCIAL TAPE CALCULATOR LOGIC
      // ------------------------------------------------------------------------
      const CALC = {
        currentInput: '0',
        accumulator: 0,
        pendingOp: null,
        tapeEntries: [],
        resetNextInput: true
      };

      function updateCalcDisplay() {
        const disp = document.getElementById('calc-display');
        if (!disp) return;
        const str = CALC.currentInput;
        if (!str || str === '0') {
          disp.textContent = '0.00';
          return;
        }
        if (str.includes('.')) {
          const parts = str.split('.');
          const intPart = Number(parts[0] || '0').toLocaleString('en-US');
          disp.textContent = intPart + '.' + parts[1];
        } else {
          disp.textContent = Number(str).toLocaleString('en-US') + '.00';
        }
      }

      function addTapeEntry(label, val, op, isSubtotal) {
        const tape = document.getElementById('calc-tape');
        if (!tape) return;

        const line = document.createElement('div');
        line.className = 'tape-line' + (isSubtotal ? ' subtotal' : '');
        
        const spanLeft = document.createElement('span');
        spanLeft.textContent = (op ? op + ' ' : '') + label;
        
        const spanRight = document.createElement('span');
        spanRight.textContent = Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + (isSubtotal ? ' ^' : '');

        line.appendChild(spanLeft);
        line.appendChild(spanRight);
        tape.insertBefore(line, tape.firstChild);

        CALC.tapeEntries.push({ label, val, op, isSubtotal });
      }

      function handleCalcNumber(num) {
        if (CALC.resetNextInput) {
          CALC.currentInput = (num === '00' ? '0' : num);
          CALC.resetNextInput = false;
        } else {
          if (CALC.currentInput === '0') {
            CALC.currentInput = (num === '00' ? '0' : num);
          } else {
            CALC.currentInput += num;
          }
        }
        updateCalcDisplay();
      }

      function handleCalcDot() {
        if (CALC.resetNextInput) {
          CALC.currentInput = '0.';
          CALC.resetNextInput = false;
        } else if (!CALC.currentInput.includes('.')) {
          CALC.currentInput += '.';
        }
        updateCalcDisplay();
      }

      function handleCalcOp(op) {
        const val = parseFloat(CALC.currentInput) || 0;
        
        if (CALC.pendingOp && !CALC.resetNextInput) {
          executeCalcEquals();
        } else {
          CALC.accumulator = val;
        }

        CALC.pendingOp = op;
        CALC.resetNextInput = true;
        
        let symbol = '+';
        if (op === 'sub') symbol = '-';
        if (op === 'mul') symbol = '×';
        if (op === 'div') symbol = '÷';

        addTapeEntry('Item', val, symbol, false);
      }

      function executeCalcEquals() {
        const val = parseFloat(CALC.currentInput) || 0;
        if (!CALC.pendingOp) return;

        let result = CALC.accumulator;
        if (CALC.pendingOp === 'add') result = CALC.accumulator + val;
        if (CALC.pendingOp === 'sub') result = CALC.accumulator - val;
        if (CALC.pendingOp === 'mul') result = CALC.accumulator * val;
        if (CALC.pendingOp === 'div') result = (val !== 0 ? CALC.accumulator / val : 0);

        // Round to reasonable precision
        result = Math.round(result * 10000) / 10000;

        addTapeEntry('Cast Total', result, '=', true);

        CALC.currentInput = String(result);
        CALC.accumulator = result;
        CALC.pendingOp = null;
        CALC.resetNextInput = true;
        updateCalcDisplay();
      }

      function setupCalculator() {
        const widget = document.getElementById('calc-widget');
        const btnToggle = document.getElementById('btn-toggle-calc');
        const btnClose = document.getElementById('btn-close-calc');

        btnToggle.addEventListener('click', () => {
          widget.classList.toggle('open');
          btnToggle.classList.toggle('active');
        });

        btnClose.addEventListener('click', () => {
          widget.classList.remove('open');
          btnToggle.classList.remove('active');
        });

        // Numeric buttons
        widget.querySelectorAll('[data-num]').forEach(b => {
          b.addEventListener('click', () => handleCalcNumber(b.getAttribute('data-num')));
        });

        // Op buttons
        widget.querySelectorAll('[data-action]').forEach(b => {
          b.addEventListener('click', () => {
            const act = b.getAttribute('data-action');
            if (act === 'add' || act === 'sub' || act === 'mul' || act === 'div') {
              handleCalcOp(act);
            } else if (act === 'equals') {
              executeCalcEquals();
            } else if (act === 'clear-entry') {
              CALC.currentInput = '0';
              updateCalcDisplay();
            } else if (act === 'clear-all') {
              CALC.currentInput = '0';
              CALC.accumulator = 0;
              CALC.pendingOp = null;
              CALC.resetNextInput = true;
              updateCalcDisplay();
              addTapeEntry('RESET', 0, 'C', true);
            } else if (act === 'dot') {
              handleCalcDot();
            } else if (act === 'backspace') {
              if (CALC.currentInput.length > 1) {
                CALC.currentInput = CALC.currentInput.slice(0, -1);
              } else {
                CALC.currentInput = '0';
              }
              updateCalcDisplay();
            }
          });
        });

        // Copy Tape to Active Note
        document.getElementById('btn-tape-to-notes').addEventListener('click', () => {
          let tapeText = 'Tape Cast: ' + Number(CALC.currentInput).toLocaleString() + ' ^=';
          if (STATE.activeInput) {
            STATE.activeInput.value += ' [' + tapeText + ']';
            STATE.activeInput.dispatchEvent(new Event('input'));
            showToast('Appended calculation tape to active note');
          } else {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(tapeText);
            }
            showToast('Copied tape total to clipboard');
          }
        });

        // Copy Raw Tape Text
        document.getElementById('btn-copy-tape-text').addEventListener('click', () => {
          const lines = CALC.tapeEntries.map(e => (e.op || '') + ' ' + e.label + ': ' + e.val).join('\\n');
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(lines || 'Empty Tape');
          }
          showToast('Copied calculation tape transcript');
        });

        // Clear Tape
        document.getElementById('btn-clear-tape').addEventListener('click', () => {
          document.getElementById('calc-tape').innerHTML = '';
          CALC.tapeEntries = [];
          addTapeEntry('TAPE CLEARED', 0, 'C', true);
          showToast('Tape paper reset');
        });

        // Keyboard & Numpad listener
        window.addEventListener('keydown', (e) => {
          if (!widget.classList.contains('open')) return;

          if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
            if (e.key === 'Escape') {
              widget.classList.remove('open');
              btnToggle.classList.remove('active');
            }
            return;
          }

          if (e.key >= '0' && e.key <= '9') {
            e.preventDefault();
            handleCalcNumber(e.key);
          } else if (e.key === '.') {
            e.preventDefault();
            handleCalcDot();
          } else if (e.key === '+') {
            e.preventDefault();
            handleCalcOp('add');
          } else if (e.key === '-') {
            e.preventDefault();
            handleCalcOp('sub');
          } else if (e.key === '*') {
            e.preventDefault();
            handleCalcOp('mul');
          } else if (e.key === '/') {
            e.preventDefault();
            handleCalcOp('div');
          } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            executeCalcEquals();
          } else if (e.key === 'Backspace') {
            e.preventDefault();
            if (CALC.currentInput.length > 1) {
              CALC.currentInput = CALC.currentInput.slice(0, -1);
            } else {
              CALC.currentInput = '0';
            }
            updateCalcDisplay();
          } else if (e.key === 'Escape') {
            widget.classList.remove('open');
            btnToggle.classList.remove('active');
          }
        });
      }

      // ------------------------------------------------------------------------
      // REVIEW POINTS (EQCR) CONTROLLER
      // Storage: audit_review_points_\${paper}_\${diet}
      // ------------------------------------------------------------------------
      function getReviewStorageKey() {
        return 'audit_review_points_' + STATE.currentPaperCode + '_' + STATE.currentDietTag;
      }

      function loadReviewPoints() {
        const key = getReviewStorageKey();
        const saved = localStorage.getItem(key);
        let list = [];
        if (saved) {
          try { list = JSON.parse(saved); } catch (e) { list = []; }
        } else {
          list = [
            {
              id: 1,
              ref: 'REV-01',
              query: 'Verify bank confirmation letter covers all 3 branches in Dhaka and Chittagong with authorized partner signature.',
              reviewer: 'Senior Manager, FCA',
              date: '2026-10-25',
              cleared: false
            },
            {
              id: 2,
              ref: 'REV-02',
              query: 'Check IAS 12 deferred tax computation reflects applicable statutory corporate tax rate under Bangladesh Finance Act.',
              reviewer: 'Engagement Partner',
              date: '2026-10-26',
              cleared: true
            }
          ];
        }
        renderReviewPoints(list);
      }

      function saveReviewPoints(list) {
        const key = getReviewStorageKey();
        localStorage.setItem(key, JSON.stringify(list));
        renderReviewPoints(list);
      }

      function renderReviewPoints(list) {
        const container = document.getElementById('review-points-list');
        const badge = document.getElementById('badge-reviews-count');
        if (!container) return;

        const openCount = list.filter(p => !p.cleared).length;
        if (badge) badge.textContent = 'Reviews (' + openCount + ')';

        container.innerHTML = '';
        list.forEach((pt, idx) => {
          const card = document.createElement('div');
          card.className = 'review-point-card' + (pt.cleared ? ' cleared' : '');

          const head = document.createElement('div');
          head.className = 'review-point-head';
          head.innerHTML = '<span style="font-weight:700; color:' + (pt.cleared ? '#10b981' : '#f59e0b') + '">' + pt.ref + '</span>' +
                           '<span>' + (pt.cleared ? '✓ CLEARED' : '● PENDING REVIEW') + '</span>';

          const text = document.createElement('div');
          text.className = 'review-point-text';
          text.textContent = pt.query;

          const meta = document.createElement('div');
          meta.className = 'review-point-meta';
          meta.innerHTML = '<span>Raised by: ' + pt.reviewer + '</span>' +
                           '<button style="background:none; border:none; color:' + (pt.cleared ? '#94a3b8' : '#10b981') + '; cursor:pointer; font-weight:700;">' +
                           (pt.cleared ? 'Reopen' : 'Mark Cleared') + '</button>';

          meta.querySelector('button').addEventListener('click', () => {
            pt.cleared = !pt.cleared;
            saveReviewPoints(list);
            showToast(pt.cleared ? 'Review point marked Cleared' : 'Review point Reopened');
          });

          card.appendChild(head);
          card.appendChild(text);
          card.appendChild(meta);
          container.appendChild(card);
        });
      }

      function setupReviewDrawer() {
        const drawer = document.getElementById('review-drawer');
        const btnToggle = document.getElementById('btn-toggle-reviews');
        const btnClose = document.getElementById('btn-close-reviews');
        const btnAdd = document.getElementById('btn-add-review-point');
        const input = document.getElementById('new-review-query');

        btnToggle.addEventListener('click', () => drawer.classList.toggle('open'));
        btnClose.addEventListener('click', () => drawer.classList.remove('open'));

        btnAdd.addEventListener('click', () => {
          const q = input.value.trim();
          if (!q) return;

          const key = getReviewStorageKey();
          let list = [];
          try { list = JSON.parse(localStorage.getItem(key)) || []; } catch (e) { list = []; }

          list.push({
            id: Date.now(),
            ref: 'REV-0' + (list.length + 1),
            query: q,
            reviewer: 'Audit Senior',
            date: new Date().toISOString().split('T')[0],
            cleared: false
          });

          saveReviewPoints(list);
          input.value = '';
          showToast('New review point recorded');
        });
      }

      // Empty State HTML Document Generator
      function getEmptyStateDoc(title, message) {
        return \`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      background: #0f172a;
      color: #94a3b8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      text-align: center;
      padding: 24px;
      box-sizing: border-box;
    }
    .badge {
      background: rgba(217, 119, 6, 0.2);
      color: #f59e0b;
      border: 1px solid rgba(217, 119, 6, 0.4);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
      font-weight: 700;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    h3 { color: #f8fafc; margin: 0 0 8px 0; font-size: 16px; font-weight: 600; }
    p { max-width: 440px; font-size: 12px; line-height: 1.6; margin: 0; color: #cbd5e1; }
  </style>
</head>
<body>
  <div class="badge">Electronic Working Paper Dossier</div>
  <h3>\` + title + \`</h3>
  <p>\` + message + \`</p>
</body>
</html>\`;
      }

      // Permanent Engagement Charter Document Generator
      function getEngagementCharterDoc() {
        return \`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      background: #0d131f;
      color: #cbd5e1;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 28px 36px;
      line-height: 1.6;
      font-size: 12px;
      box-sizing: border-box;
    }
    .memo-header {
      border-bottom: 2px solid #d97706;
      padding-bottom: 14px;
      margin-bottom: 20px;
    }
    .memo-tag {
      font-family: monospace;
      font-size: 11px;
      color: #f59e0b;
      font-weight: 700;
      letter-spacing: 1px;
    }
    h1 {
      font-size: 18px;
      color: #ffffff;
      margin: 6px 0 4px 0;
      font-weight: 700;
    }
    .memo-grid {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 6px 14px;
      margin-top: 12px;
      font-size: 11px;
      background: #162032;
      padding: 10px 14px;
      border-radius: 6px;
      border: 1px solid #334155;
    }
    .memo-label { font-weight: 700; color: #94a3b8; font-family: monospace; }
    .memo-val { color: #f1f5f9; }
    h2 {
      font-size: 13px;
      color: #fde68a;
      margin: 18px 0 6px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 4px;
    }
    p, ul { margin: 0 0 10px 0; color: #cbd5e1; }
    ul { padding-left: 20px; }
    li { margin-bottom: 4px; }
    .seal-box {
      margin-top: 24px;
      border: 1px dashed #059669;
      background: rgba(5, 150, 105, 0.08);
      padding: 12px 14px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="memo-header">
    <div class="memo-tag">ICAB AUDIT DOSSIER — PERMANENT AUDIT FILE (PAF) WP-004</div>
    <h1>TERMS OF AUDIT ENGAGEMENT MEMORANDUM</h1>
    <div style="color: #94a3b8; font-size: 11px;">In accordance with ISA 210 / BSA 210 "Agreeing the Terms of Audit Engagements"</div>
    <div class="memo-grid">
      <div class="memo-label">ENGAGEMENT:</div>
      <div class="memo-val">Statutory Financial Audit of ICAB Curriculum Case Entities</div>
      <div class="memo-label">REPORTING FRAMEWORK:</div>
      <div class="memo-val">International Financial Reporting Standards (IFRS) & Bangladesh Companies Act 1994</div>
      <div class="memo-label">AUDIT STANDARD:</div>
      <div class="memo-val">International Standards on Auditing (ISA) & ICAB Code of Ethics</div>
      <div class="memo-label">FILE STATUS:</div>
      <div class="memo-val"><span style="color:#10b981;font-weight:700;">✓ VALIDATED PAF CHARTER</span></div>
    </div>
  </div>

  <h2>1. Objective and Scope of the Audit</h2>
  <p>The objective of our audit is to express an independent professional opinion on whether the financial statements give a true and fair view of the financial position, financial performance, and cash flows in accordance with applicable financial reporting frameworks and statutory enactments.</p>

  <h2>2. Responsibilities of the Auditor (ISA 200)</h2>
  <p>We conduct our audit in accordance with International Standards on Auditing (ISA). Those standards require that we comply with ethical requirements and plan and perform the audit to obtain reasonable assurance whether the financial statements are free from material misstatement, whether due to fraud or error.</p>
  <ul>
    <li>Perform risk assessment procedures and evaluate internal control environments (ISA 315).</li>
    <li>Execute substantive audit procedures and test of details on material balances (ISA 330 & 500).</li>
    <li>Obtain third-party written confirmations for cash, bank, and receivables (ISA 505).</li>
    <li>Evaluate appropriateness of management's use of going concern assumption (ISA 570).</li>
  </ul>

  <h2>3. Responsibilities of Management & Governance</h2>
  <p>Management acknowledges and understands that it has responsibility for the preparation and fair presentation of the financial statements in accordance with IFRS, establishing effective internal control, and providing auditors with unhindered access to documentation and explanations.</p>

  <div class="seal-box">
    <div>
      <div style="font-weight:700; color:#10b981;">PERMANENT FILE CERTIFICATION</div>
      <div style="font-size:11px; color:#94a3b8;">Charter reviewed and approved for all subsequent current audit files (13 Diets).</div>
    </div>
    <div style="font-family:monospace; font-weight:700; color:#10b981; border:1px solid #10b981; padding:4px 8px; border-radius:4px;">
      ICAB-PAF-2026-OK
    </div>
  </div>
</body>
</html>\`;
      }

      // ------------------------------------------------------------------------
      // ENGAGEMENT EXPLORER TREE GENERATION
      // 000 PERMANENT AUDIT FILE (PAF)
      // 100 COURSEWARE & AUDIT GUIDES (20 Manuals via getAllManuals())
      // 200 CURRENT AUDIT FILES (13 Diets)
      // ------------------------------------------------------------------------
      function buildEngagementTree() {
        const treeRoot = document.getElementById('drawer-tree');
        if (!treeRoot) return;
        treeRoot.innerHTML = '';

        const allManuals = getAllManuals();

        // ----------------------------------------------------------------------
        // SECTION 000: PERMANENT AUDIT FILE (PAF)
        // ----------------------------------------------------------------------
        const pafGroup = document.createElement('div');
        pafGroup.className = 'tree-group';
        pafGroup.setAttribute('data-category', 'paf');

        const pafHeader = document.createElement('div');
        pafHeader.className = 'tree-node-parent expanded';
        pafHeader.innerHTML = '<span class="node-label"><span>📁</span> 000 PERMANENT AUDIT FILE (PAF)</span>' +
                              '<span class="chevron">▶</span>';
        
        const pafSublist = document.createElement('div');
        pafSublist.className = 'tree-sublist open';

        // 1. Syllabus (2025)
        const syl = allManuals.find(m => m.isSyllabus);
        if (syl) {
          const item = createLeafItem('WP-001 ICAB Syllabus (2025)', syl.rel_path, 'SYL', 'PAF', () => {
            loadDocumentIntoPane('left', syl.rel_path, 'WP-001 ICAB Syllabus (2025)');
            document.getElementById('bc-level').textContent = 'PAF';
            document.getElementById('bc-diet').textContent = 'Framework';
            document.getElementById('bc-paper').textContent = 'ICAB Syllabus';
            document.getElementById('bc-wp-ref').textContent = 'WP-001 CURRICULUM SYLLABUS';
            showToast('Loaded ICAB Latest Syllabus (2025)');
          });
          pafSublist.appendChild(item);
        }

        // 2. IVS Volumes
        const ivsDocs = allManuals.filter(m => m.isIVS);
        ivsDocs.forEach((ivs, idx) => {
          const item = createLeafItem('WP-00' + (idx + 2) + ' ' + ivs.title, ivs.rel_path, 'IVS', 'PAF', () => {
            loadDocumentIntoPane('left', ivs.rel_path, ivs.title);
            document.getElementById('bc-level').textContent = 'PAF';
            document.getElementById('bc-diet').textContent = 'Standards';
            document.getElementById('bc-paper').textContent = 'Valuation Standards';
            document.getElementById('bc-wp-ref').textContent = 'WP-00' + (idx + 2) + ' ' + ivs.title;
            showToast('Loaded Valuation Standard: ' + ivs.title);
          });
          pafSublist.appendChild(item);
        });

        // 3. Permanent Client Engagement Letter Memo
        const pafMemo = createLeafItem('WP-004 Permanent Engagement Charter', null, 'PAF', 'PAF', () => {
          loadDocumentIntoPane('left', null, 'WP-004 Permanent Engagement Charter', getEngagementCharterDoc());
          document.getElementById('bc-level').textContent = 'PAF';
          document.getElementById('bc-diet').textContent = 'Permanent File';
          document.getElementById('bc-paper').textContent = 'Engagement Charter';
          document.getElementById('bc-wp-ref').textContent = 'WP-004 TERMS OF ENGAGEMENT';
          showToast('Loaded Permanent Engagement Charter & Terms of Reference');
        });
        pafSublist.appendChild(pafMemo);

        pafHeader.addEventListener('click', () => {
          pafHeader.classList.toggle('expanded');
          pafSublist.classList.toggle('open');
        });

        pafGroup.appendChild(pafHeader);
        pafGroup.appendChild(pafSublist);
        treeRoot.appendChild(pafGroup);

        // ----------------------------------------------------------------------
        // SECTION 100: COURSEWARE & AUDIT GUIDES (20 Manuals)
        // ----------------------------------------------------------------------
        const guidesGroup = document.createElement('div');
        guidesGroup.className = 'tree-group';
        guidesGroup.setAttribute('data-category', 'guides');

        const guidesHeader = document.createElement('div');
        guidesHeader.className = 'tree-node-parent';
        guidesHeader.innerHTML = '<span class="node-label"><span>📚</span> 100 COURSEWARE & AUDIT GUIDES</span>' +
                                '<span class="chevron">▶</span>';
        
        const guidesSublist = document.createElement('div');
        guidesSublist.className = 'tree-sublist';

        // Group manuals by Level: Professional Level (PL) & Advanced Level (AL)
        ['PL', 'AL'].forEach(lvl => {
          const lvlManuals = allManuals.filter(m => m.level === lvl && !m.isSyllabus);
          if (lvlManuals.length === 0) return;

          const lvlHeader = document.createElement('div');
          lvlHeader.className = 'tree-node-parent';
          lvlHeader.innerHTML = '<span class="node-label"><span>📗</span> ' + (lvl === 'PL' ? 'Professional Level (11)' : 'Advanced Level (9)') + '</span>' +
                                '<span class="chevron">▶</span>';
          
          const lvlSub = document.createElement('div');
          lvlSub.className = 'tree-sublist';

          lvlManuals.forEach(m => {
            const leaf = createLeafItem(m.title, m.rel_path, lvl, 'GUIDE', () => {
              loadDocumentIntoPane('left', m.rel_path, m.title);
              document.getElementById('bc-level').textContent = lvl;
              document.getElementById('bc-diet').textContent = '2026 Manual';
              document.getElementById('bc-paper').textContent = m.subject;
              document.getElementById('bc-wp-ref').textContent = 'AUDIT GUIDE: ' + m.title;
              showToast('Opened Study Guide: ' + m.title);
            });
            lvlSub.appendChild(leaf);
          });

          lvlHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            lvlHeader.classList.toggle('expanded');
            lvlSub.classList.toggle('open');
          });

          guidesSublist.appendChild(lvlHeader);
          guidesSublist.appendChild(lvlSub);
        });

        guidesHeader.addEventListener('click', () => {
          guidesHeader.classList.toggle('expanded');
          guidesSublist.classList.toggle('open');
        });

        guidesGroup.appendChild(guidesHeader);
        guidesGroup.appendChild(guidesSublist);
        treeRoot.appendChild(guidesGroup);

        // ----------------------------------------------------------------------
        // SECTION 200: CURRENT AUDIT FILES (13 Diets)
        // ----------------------------------------------------------------------
        const cafGroup = document.createElement('div');
        cafGroup.className = 'tree-group';
        cafGroup.setAttribute('data-category', 'caf');

        const cafHeader = document.createElement('div');
        cafHeader.className = 'tree-node-parent expanded';
        cafHeader.innerHTML = '<span class="node-label"><span>🗂️</span> 200 CURRENT AUDIT FILES (13 Diets)</span>' +
                              '<span class="chevron">▶</span>';
        
        const cafSublist = document.createElement('div');
        cafSublist.className = 'tree-sublist open';

        if (typeof SESSIONS_ORDER !== 'undefined') {
          SESSIONS_ORDER.forEach((session, sIdx) => {
            const dietHeader = document.createElement('div');
            dietHeader.className = 'tree-node-parent' + (sIdx === 0 ? ' expanded' : '');
            dietHeader.innerHTML = '<span class="node-label"><span>📁</span> Diet ' + session.label + '</span>' +
                                   '<span class="chevron">▶</span>';
            
            const dietSub = document.createElement('div');
            dietSub.className = 'tree-sublist' + (sIdx === 0 ? ' open' : '');

            // List available subjects in CATALOG for this diet
            const subjectsInDiet = [];
            ['PL', 'AL'].forEach(lvl => {
              if (CATALOG && CATALOG[lvl]) {
                Object.keys(CATALOG[lvl]).forEach(subj => {
                  const arr = CATALOG[lvl][subj];
                  const hit = arr.find(x => x.session_tag === session.tag);
                  if (hit) {
                    subjectsInDiet.push({
                      level: lvl,
                      subject: subj,
                      code: (typeof PAPER_CODES !== 'undefined' && PAPER_CODES[subj]) ? PAPER_CODES[subj] : subj.substring(0,3).toUpperCase(),
                      hit: hit
                    });
                  }
                });
              }
            });

            subjectsInDiet.forEach(item => {
              const status = getSignOffStatus(item.code, session.tag);
              const isDefaultActive = (sIdx === 0 && item.code === 'AA');

              // Subject Node Container
              const subjWrap = document.createElement('div');
              subjWrap.className = 'tree-subject-wrap';
              subjWrap.setAttribute('data-paper', item.code);
              subjWrap.setAttribute('data-diet', session.tag);

              let dotClass = 'dot-draft';
              if (status === 'SENIOR REVIEWED') dotClass = 'dot-reviewed';
              if (status === 'PARTNER SIGNED OFF') dotClass = 'dot-signed';

              const subjHeader = document.createElement('div');
              subjHeader.className = 'tree-node-parent subject-node' + (isDefaultActive ? ' expanded active-subject' : '');
              subjHeader.setAttribute('data-paper', item.code);
              subjHeader.setAttribute('data-diet', session.tag);
              subjHeader.innerHTML = '<span class="node-label">' +
                                     '<span class="badge-wp">' + item.code + '</span>' +
                                     '<span>' + item.subject + '</span>' +
                                     '</span>' +
                                     '<span style="display:flex;align-items:center;gap:6px;">' +
                                     '<span class="tree-status-dot ' + dotClass + '" title="Sign-off: ' + status + '"></span>' +
                                     '<span class="chevron">▶</span>' +
                                     '</span>';

              const subjSub = document.createElement('div');
              subjSub.className = 'tree-sublist' + (isDefaultActive ? ' open' : '');

              // 1. WP-100 Question Exhibits & Client Records
              const wp100 = document.createElement('div');
              wp100.className = 'tree-leaf-item' + (isDefaultActive ? ' active' : '');
              wp100.setAttribute('data-paper', item.code);
              wp100.setAttribute('data-diet', session.tag);
              wp100.setAttribute('data-category', 'caf');
              wp100.innerHTML = '<span class="leaf-title">' +
                                '<span class="badge-wp-sub">WP-100</span>' +
                                '<span>Question Exhibits & Records</span>' +
                                '</span>';
              wp100.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.tree-leaf-item').forEach(el => el.classList.remove('active'));
                wp100.classList.add('active');
                selectAuditFile(item.level, item.subject, item.code, session.tag, session.label, item.hit);
                if (item.hit && item.hit.question) {
                  loadDocumentIntoPane('left', item.hit.question.rel_path, 'WP-100 Question Exhibits: ' + item.subject);
                }
              });

              // 2. WP-200 Council Audit Working Papers & Solutions
              const wp200 = document.createElement('div');
              wp200.className = 'tree-leaf-item';
              wp200.setAttribute('data-paper', item.code);
              wp200.setAttribute('data-diet', session.tag);
              wp200.setAttribute('data-category', 'caf');
              wp200.innerHTML = '<span class="leaf-title">' +
                                '<span class="badge-wp-sub">WP-200</span>' +
                                '<span>Council Solutions & Answer WP</span>' +
                                '</span>';
              wp200.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.tree-leaf-item').forEach(el => el.classList.remove('active'));
                wp200.classList.add('active');
                selectAuditFile(item.level, item.subject, item.code, session.tag, session.label, item.hit);
                if (item.hit && item.hit.answer) {
                  loadDocumentIntoPane('right', item.hit.answer.rel_path, 'WP-200 Council Solutions: ' + item.subject);
                }
              });

              // 3. WP-300 Substantive Audit Working Schedule Ledger
              const wp300 = document.createElement('div');
              wp300.className = 'tree-leaf-item';
              wp300.setAttribute('data-paper', item.code);
              wp300.setAttribute('data-diet', session.tag);
              wp300.setAttribute('data-category', 'caf');
              wp300.innerHTML = '<span class="leaf-title">' +
                                '<span class="badge-wp-sub">WP-300</span>' +
                                '<span>Substantive Audit Schedule</span>' +
                                '</span>';
              wp300.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.tree-leaf-item').forEach(el => el.classList.remove('active'));
                wp300.classList.add('active');
                selectAuditFile(item.level, item.subject, item.code, session.tag, session.label, item.hit);
                const ledgerPane = document.getElementById('working-schedule-pane');
                if (ledgerPane) {
                  ledgerPane.scrollIntoView({ behavior: 'smooth' });
                }
              });

              subjSub.appendChild(wp100);
              subjSub.appendChild(wp200);
              subjSub.appendChild(wp300);

              subjHeader.addEventListener('click', () => {
                subjHeader.classList.toggle('expanded');
                subjSub.classList.toggle('open');
                document.querySelectorAll('.subject-node').forEach(el => el.classList.remove('active-subject'));
                subjHeader.classList.add('active-subject');
                selectAuditFile(item.level, item.subject, item.code, session.tag, session.label, item.hit);
              });

              subjWrap.appendChild(subjHeader);
              subjWrap.appendChild(subjSub);
              dietSub.appendChild(subjWrap);
            });

            dietHeader.addEventListener('click', (e) => {
              e.stopPropagation();
              dietHeader.classList.toggle('expanded');
              dietSub.classList.toggle('open');
            });

            cafSublist.appendChild(dietHeader);
            cafSublist.appendChild(dietSub);
          });
        }

        cafHeader.addEventListener('click', () => {
          cafHeader.classList.toggle('expanded');
          cafSublist.classList.toggle('open');
        });

        cafGroup.appendChild(cafHeader);
        cafGroup.appendChild(cafSublist);
        treeRoot.appendChild(cafGroup);
      }

      function createLeafItem(title, relPath, code, category, onClick) {
        const leaf = document.createElement('div');
        leaf.className = 'tree-leaf-item';
        leaf.setAttribute('data-category', category);
        leaf.innerHTML = '<span class="leaf-title">' +
                         '<span class="badge-wp">' + code + '</span>' +
                         '<span title="' + title + '">' + title + '</span>' +
                         '</span>';
        leaf.addEventListener('click', (e) => {
          document.querySelectorAll('.tree-leaf-item').forEach(el => el.classList.remove('active'));
          leaf.classList.add('active');
          if (onClick) onClick();
        });
        return leaf;
      }

      function updateTreeStatusDots() {
        document.querySelectorAll('[data-paper]').forEach(leaf => {
          const paper = leaf.getAttribute('data-paper');
          const diet = leaf.getAttribute('data-diet');
          if (!paper || !diet) return;
          const status = getSignOffStatus(paper, diet);
          const dot = leaf.querySelector('.tree-status-dot');
          if (dot) {
            dot.className = 'tree-status-dot';
            if (status === 'PARTNER SIGNED OFF') dot.classList.add('dot-signed');
            else if (status === 'SENIOR REVIEWED') dot.classList.add('dot-reviewed');
            else dot.classList.add('dot-draft');
            dot.title = 'Sign-off: ' + status;
          }
        });
      }

      // ------------------------------------------------------------------------
      // SELECT AUDIT FILE & LOAD BOTH VIEWERS
      // ------------------------------------------------------------------------
      function selectAuditFile(level, subject, paperCode, dietTag, dietLabel, entryData) {
        STATE.currentLevel = level;
        STATE.currentSubject = subject;
        STATE.currentPaperCode = paperCode;
        STATE.currentDietTag = dietTag;
        STATE.currentDietLabel = dietLabel;

        // Update Breadcrumb
        document.getElementById('bc-level').textContent = level;
        document.getElementById('bc-diet').textContent = dietLabel;
        document.getElementById('bc-paper').textContent = subject + ' (' + paperCode + ')';
        document.getElementById('bc-wp-ref').textContent = 'WP-100 & WP-200 DUAL DOSSIER';

        // Update Sign-Off UI
        renderSignOffPill();
        updatePartnerSeal();

        // Load Left (Question / WP-100) & Right (Solution / WP-200)
        if (entryData && entryData.question && entryData.question.rel_path) {
          loadDocumentIntoPane('left', entryData.question.rel_path, 'WP-100 Question Exhibits: ' + subject);
        } else {
          loadDocumentIntoPane('left', null, 'WP-100 Question Exhibits: ' + subject + ' (Not Available)');
        }

        if (entryData && entryData.answer && entryData.answer.rel_path) {
          loadDocumentIntoPane('right', entryData.answer.rel_path, 'WP-200 Council Solutions: ' + subject);
        } else {
          loadDocumentIntoPane('right', null, 'WP-200 Council Solutions: ' + subject + ' (Not Issued for this Diet)');
        }

        // Load working schedule ledger and review points
        loadLedger();
        loadReviewPoints();
        showToast('Opened audit file: ' + paperCode + ' (' + dietLabel + ')');
      }

      function loadDocumentIntoPane(pane, relPath, title, isMemoHtml) {
        const frame = document.getElementById(pane === 'left' ? 'frame-left' : 'frame-right');
        const titleEl = document.getElementById(pane === 'left' ? 'title-left-text' : 'title-right-text');
        const linkExt = document.getElementById(pane === 'left' ? 'link-external-left' : 'link-external-right');

        if (titleEl) titleEl.textContent = title;

        if (isMemoHtml) {
          if (linkExt) {
            linkExt.href = '#';
            linkExt.style.pointerEvents = 'none';
            linkExt.style.opacity = '0.3';
          }
          if (frame) {
            frame.removeAttribute('src');
            frame.srcdoc = isMemoHtml;
          }
          if (pane === 'left') STATE.leftDoc = { relPath: null, title };
          if (pane === 'right') STATE.rightDoc = { relPath: null, title };
          return;
        }

        if (relPath) {
          if (linkExt) {
            linkExt.href = encodeURI(relPath);
            linkExt.style.pointerEvents = 'auto';
            linkExt.style.opacity = '1';
          }
          if (frame) {
            frame.removeAttribute('srcdoc');
            frame.src = encodeURI(relPath);
          }
          if (pane === 'left') STATE.leftDoc = { relPath, title };
          if (pane === 'right') STATE.rightDoc = { relPath, title };
        } else {
          if (linkExt) {
            linkExt.href = '#';
            linkExt.style.pointerEvents = 'none';
            linkExt.style.opacity = '0.3';
          }
          if (frame) {
            frame.removeAttribute('src');
            frame.srcdoc = getEmptyStateDoc(title, 'No official document file is associated with this working paper reference. Exhibits or council solutions may be accessed via the left explorer drawer.');
          }
          if (pane === 'left') STATE.leftDoc = { relPath: null, title };
          if (pane === 'right') STATE.rightDoc = { relPath: null, title };
        }
      }

      function swapViewers() {
        const tmp = STATE.leftDoc;
        STATE.leftDoc = STATE.rightDoc;
        STATE.rightDoc = tmp;

        if (STATE.leftDoc) loadDocumentIntoPane('left', STATE.leftDoc.relPath, STATE.leftDoc.title);
        if (STATE.rightDoc) loadDocumentIntoPane('right', STATE.rightDoc.relPath, STATE.rightDoc.title);
        showToast('Swapped Left and Right Viewers');
      }

      // ------------------------------------------------------------------------
      // WORKSPACE VIEW MODES (Dual Split vs Single Pane vs Ledger Height)
      // ------------------------------------------------------------------------
      function setupViewModes() {
        const btnSplit = document.getElementById('btn-toggle-split');
        const paneLeft = document.getElementById('pane-left');
        const paneRight = document.getElementById('pane-right');
        const ledgerPane = document.getElementById('working-schedule-pane');
        const btnLedgerSize = document.getElementById('btn-toggle-ledger-size');
        const btnMinimize = document.getElementById('btn-minimize-ledger');

        btnSplit.addEventListener('click', () => {
          if (STATE.viewMode === 'dual') {
            STATE.viewMode = 'left-only';
            paneRight.style.display = 'none';
            document.getElementById('label-split-mode').textContent = 'Exhibits Only';
          } else if (STATE.viewMode === 'left-only') {
            STATE.viewMode = 'right-only';
            paneLeft.style.display = 'none';
            paneRight.style.display = 'flex';
            document.getElementById('label-split-mode').textContent = 'Solutions Only';
          } else {
            STATE.viewMode = 'dual';
            paneLeft.style.display = 'flex';
            paneRight.style.display = 'flex';
            document.getElementById('label-split-mode').textContent = 'Dual Split';
          }
        });

        // Maximize button
        btnLedgerSize.addEventListener('click', () => {
          if (STATE.ledgerHeightState === 'maximized') {
            STATE.ledgerHeightState = 'standard';
            ledgerPane.classList.remove('maximized', 'minimized');
            btnLedgerSize.textContent = '↕ Maximize';
            btnMinimize.textContent = '_ Minimize';
          } else {
            STATE.ledgerHeightState = 'maximized';
            ledgerPane.classList.remove('minimized');
            ledgerPane.classList.add('maximized');
            btnLedgerSize.textContent = '↕ Restore';
            btnMinimize.textContent = '_ Minimize';
          }
        });

        // Minimize button
        btnMinimize.addEventListener('click', () => {
          if (STATE.ledgerHeightState === 'minimized') {
            STATE.ledgerHeightState = 'standard';
            ledgerPane.classList.remove('minimized', 'maximized');
            btnMinimize.textContent = '_ Minimize';
            btnLedgerSize.textContent = '↕ Maximize';
          } else {
            STATE.ledgerHeightState = 'minimized';
            ledgerPane.classList.remove('maximized');
            ledgerPane.classList.add('minimized');
            btnMinimize.textContent = '□ Restore';
            btnLedgerSize.textContent = '↕ Maximize';
          }
        });

        document.getElementById('btn-swap-viewers').addEventListener('click', swapViewers);
      }

      // ------------------------------------------------------------------------
      // SEARCH & FILTERING IN SIDEBAR
      // ------------------------------------------------------------------------
      function setupSidebarSearch() {
        const input = document.getElementById('binder-search-input');
        const btnClear = document.getElementById('btn-clear-search');
        const filterChips = document.querySelectorAll('.filter-chip');

        input.addEventListener('input', () => {
          const q = input.value.trim().toLowerCase();
          STATE.searchQuery = q;
          btnClear.style.display = q ? 'block' : 'none';
          filterTreeItems();
        });

        btnClear.addEventListener('click', () => {
          input.value = '';
          STATE.searchQuery = '';
          btnClear.style.display = 'none';
          filterTreeItems();
        });

        filterChips.forEach(chip => {
          chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            STATE.activeCategoryFilter = chip.getAttribute('data-filter');
            filterTreeItems();
          });
        });
      }

      function filterTreeItems() {
        const groups = document.querySelectorAll('.tree-group');
        const leaves = document.querySelectorAll('.tree-leaf-item');
        const subjectWraps = document.querySelectorAll('.tree-subject-wrap');

        const filter = STATE.activeCategoryFilter;
        const q = STATE.searchQuery;

        if (filter === 'signed') {
          // Display only CAF group containing signed audit files
          groups.forEach(g => {
            const cat = g.getAttribute('data-category');
            g.style.display = (cat === 'caf') ? 'block' : 'none';
          });

          subjectWraps.forEach(wrap => {
            const paper = wrap.getAttribute('data-paper');
            const diet = wrap.getAttribute('data-diet');
            const isSigned = (getSignOffStatus(paper, diet) === 'PARTNER SIGNED OFF');
            const text = wrap.textContent.toLowerCase();
            const matchesQuery = !q || text.includes(q);

            if (isSigned && matchesQuery) {
              wrap.style.display = 'block';
              const parentSublist = wrap.closest('.tree-sublist');
              if (parentSublist) parentSublist.classList.add('open');
              const parentHeader = parentSublist ? parentSublist.previousElementSibling : null;
              if (parentHeader) parentHeader.classList.add('expanded');
            } else {
              wrap.style.display = 'none';
            }
          });
          return;
        }

        // Standard Category Filtering
        groups.forEach(g => {
          const cat = g.getAttribute('data-category');
          if (filter === 'all' || filter === cat) {
            g.style.display = 'block';
          } else {
            g.style.display = 'none';
          }
        });

        if (q) {
          // Search query active: open matching ancestor sublists so results are visible
          leaves.forEach(leaf => {
            const text = leaf.textContent.toLowerCase();
            const matches = text.includes(q);
            leaf.style.display = matches ? 'flex' : 'none';

            if (matches) {
              let parent = leaf.parentElement;
              while (parent && parent.id !== 'drawer-tree') {
                if (parent.classList.contains('tree-sublist')) {
                  parent.classList.add('open');
                  if (parent.previousElementSibling && parent.previousElementSibling.classList.contains('tree-node-parent')) {
                    parent.previousElementSibling.classList.add('expanded');
                  }
                }
                if (parent.classList.contains('tree-subject-wrap')) {
                  parent.style.display = 'block';
                }
                parent = parent.parentElement;
              }
            }
          });

          subjectWraps.forEach(wrap => {
            const text = wrap.textContent.toLowerCase();
            if (text.includes(q)) {
              wrap.style.display = 'block';
              const parentSublist = wrap.closest('.tree-sublist');
              if (parentSublist) parentSublist.classList.add('open');
            }
          });
        } else {
          // Reset query: make leaves visible again
          leaves.forEach(leaf => {
            leaf.style.display = 'flex';
          });
          subjectWraps.forEach(wrap => {
            wrap.style.display = 'block';
          });
        }
      }

      // ------------------------------------------------------------------------
      // INITIALIZATION
      // ------------------------------------------------------------------------
      function init() {
        buildEngagementTree();
        setupViewModes();
        setupCalculator();
        setupTickMarks();
        setupReviewDrawer();
        setupSidebarSearch();

        // Sign-off button toggle
        document.getElementById('btn-signoff-toggle').addEventListener('click', cycleSignOffStatus);

        // Schedule Actions
        document.getElementById('btn-add-row').addEventListener('click', addLedgerRow);
        document.getElementById('btn-reset-template').addEventListener('click', resetLedgerDefaults);
        document.getElementById('btn-export-csv').addEventListener('click', exportLedgerCSV);
        document.getElementById('btn-print-wp').addEventListener('click', () => window.print());

        // Tick marks floating bar toggle
        const btnToggleTick = document.getElementById('btn-toggle-tickmarks');
        const tickBar = document.getElementById('tickmark-bar');
        btnToggleTick.addEventListener('click', () => {
          tickBar.style.display = (tickBar.style.display === 'none' ? 'flex' : 'none');
          btnToggleTick.classList.toggle('active');
        });

        // Load Initial Default: May 2026 Audit & Assurance
        if (typeof CATALOG !== 'undefined' && CATALOG.PL && CATALOG.PL['Audit & Assurance']) {
          const aaHits = CATALOG.PL['Audit & Assurance'];
          const hitMay2026 = aaHits.find(x => x.session_tag === '2026-05_May') || aaHits[0];
          selectAuditFile('PL', 'Audit & Assurance', 'AA', hitMay2026.session_tag, hitMay2026.session_label, hitMay2026);
        } else {
          loadLedger();
        }

        console.log('✓ AuditDossier initialized cleanly.');
      }

      // Run on DOM Ready
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

fs.writeFileSync('version-10-audit-dossier.html', htmlContent, 'utf8');
console.log('Successfully generated version-10-audit-dossier.html (' + (Buffer.byteLength(htmlContent, 'utf8') / 1024).toFixed(1) + ' KB)');
