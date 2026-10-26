# ADR 001: Multi-Style Anti-Slop UI Architecture & Modular Catalog

## Status
Accepted

## Context
The previous user interface for the ICAB Chartered Study Desk was criticized for exhibiting classic "AI slop" indicators:
- Rounded pastel pill badges everywhere (`STUDY LIBRARY`, `Official Syllabus`, etc.).
- Generic washed-out beige/slate backgrounds with soft drop shadows under every tile.
- Cute pastel chips (`Q` in light blue, `A` in light green) inside cards within cards.
- Generic corporate copy ("Executive Study Desk", "266 Verified Documents").
- Monolithic HTML file containing over 2,000 lines of duplicated JSON catalog data.

## Decision
1. **Modular Catalog Extraction (`catalog.js`)**:
   - Extracted all catalog metadata (`CATALOG`, `SYLLABUS_DOC`, `PAPER_CODES`, `SESSIONS_ORDER`, `SUBJECT_ORDER`) into a shared, zero-dependency `catalog.js`.
   - Supports both direct browser loading via `<script src="catalog.js"></script>` and Node.js `module.exports`.
   - Guarantees 100% data integrity across all UI variants with zero data duplication.

2. **Creation of 13 Vastly Different Visual Paradigms**:
   - **01. Version 1 (`version-1-archival.html` & `index.html`) — The Archival Folio**: Oxford legal library & British parliamentary record. Editorial serif typography, zero-radius ink docket stamps.
   - **02. Version 2 (`version-2-terminal.html`) — Bloomberg Terminal Ops**: High-density OLED monochrome with amber/green telemetry, command prompt filtering (`CMD>`), and real-time split-screen document viewer.
   - **03. Version 3 (`version-3-swiss.html`) — Swiss International Style**: Josef Müller-Brockmann / Vignelli transit grid with massive display scale contrast (34px grotesque vs 11px micro-labels), stark black/white geometry.
   - **04. Version 4 (`version-4-nordic.html`) — Nordic Reading Desk**: Kinfolk/Hobonichi literary warmth, unbleached milk paper, eucalyptus sage, and generous breathing room.
   - **05. Version 5 (`version-5-industrial.html`) — Raw Industrial Workshop**: Dieter Rams / Braun apparatus with 2px solid tactile mechanical push buttons, hard shadows (`3px 3px 0px #000`).
   - **06. Version 6 (`version-6-ft.html`) — Financial Times Executive**: City of London banking broadside with FT salmon ground (`#fff1e5`), market indicator metrics ribbon, and corporate balance sheet layout.
   - **07. Version 7 (`version-apple.html`) — Apple macOS Sonoma Finder**: Frosted window with traffic lights `[● ● ●]`, QuickLook spacebar preview inspector, and SF typography.
   - **08. Version 8 (`version-torrent.html`) — The Chartered Bay**: Authentic 1337x / Pirate Bay tracker index with Seeders (green) / Leechers (red), torrent categories `[Doc/PDF]`, magnet links, and streaming.
   - **09. Version 9 (`version-anime.html`) — AniCharter (Anime Streaming Catalog)**: Crunchyroll / AniList dark purple neon UI with exam sessions as "Episodes" (Ep 13: May 2026), and `[SUB]` (Questions) / `[DUB]` (Answers) audio tracks.
   - **10. Version 10 (`version-winxp.html`) — Windows XP Luna Explorer**: Authentic Luna blue titlebar with gradients, Win32 menu bar, Windows XP Start button, system clock tray, and Adobe Acrobat Reader modal.
   - **11. Version 11 (`version-google.html`) — Google Drive / Workspace**: Google Sans typography, pill search bar with G Drive branding, `[+ New]` button, 345 MB storage progress bar, and Google Docs modal previewer.
   - **12. Version 12 (`version-linux.html`) — GNU/Linux Midnight Commander (TUI)**: Authentic dual-pane curses interface in classic terminal blue and cyan, ASCII box characters, `icab@archlinux:~$` bash prompt, and function keys bar (`1:Help` to `10:Quit`).
   - **13. Version 13 (`version-linear.html`) — Linear Minimalist Void**: Pure pitch-black `#000000` canvas, `⌘K` command bar, micro-badges, high-precision issue list, and smooth slide-over drawer viewer.

3. **Persistent Universal Version Comparator Bar**:
   - Integrated across all 13 versions (`.ui-version-bar`) so the user can immediately toggle between any of the 13 styles in one click without modifying URLs.

## Consequences
- Complete elimination of generic AI boilerplate, pastel pill badges, and template cliches.
- Complete functional equivalence across all 13 versions: full access to 266 exam questions, suggested solutions, and curricular manuals, with session stepping and PDF viewing.
- Project version bumped to `v2.1.0`.
