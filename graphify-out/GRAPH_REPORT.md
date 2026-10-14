# Graph Report - YoutubeAmbition  (2026-10-14)

## Corpus Check
- Corpus is ~20,231 words - fits in a single context window. You may not need a graph.

## Summary
- 234 nodes · 444 edges · 13 communities (5 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Video Feature Operations
- Extension Configuration
- Settings and Localization
- Ambient Rendering Engine
- Player Controls Interface
- Build Configuration
- Popup Settings Controller
- YouTube Page Lifecycle
- Content Script Bootstrap
- Documentation and Brand Assets
- Extension Packaging
- Background Commands

## God Nodes (most connected - your core abstractions)
1. `AmbientEngine` - 27 edges
2. `PlayerUI` - 24 edges
3. `PopupController` - 15 edges
4. `LumaBorderApp` - 12 edges
5. `LumaBorderApp` - 12 edges
6. `settingsManager` - 12 edges
7. `bindEvents()` - 10 edges
8. `mountButton()` - 10 edges
9. `constructor()` - 9 edges
10. `start()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `LumaBorder` --conceptually_related_to--> `LumaBorder app icon 128px`  [EXTRACTED]
  README.md → icons/icon128.png
- `LumaBorder` --conceptually_related_to--> `LumaBorder popup dashboard`  [EXTRACTED]
  README.md → popup/popup.html
- `LumaBorder project documentation` --references--> `LumaBorder popup dashboard`  [EXTRACTED]
  README.md → popup/popup.html
- `LumaBorder app icon 16px` --shares_data_with--> `LumaBorder app icon 32px`  [EXTRACTED]
  icons/icon16.png → icons/icon32.png
- `LumaBorder app icon 32px` --shares_data_with--> `LumaBorder app icon 48px`  [EXTRACTED]
  icons/icon32.png → icons/icon48.png

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **LumaBorder brand asset family** — icons_icon16_brand_asset, icons_icon32_brand_asset, icons_icon48_brand_asset, icons_icon128_brand_asset [EXTRACTED 1.00]
- **LumaBorder popup controls** — popup_popup_dashboard, popup_popup_master_toggle, popup_popup_preset_profiles [EXTRACTED 1.00]

## Communities (13 total, 8 thin omitted)

### Community 0 - "Video Feature Operations"
Cohesion: 0.09
Nodes (42): applyPreset(), applySettings(), bindEvents(), bindMenuEvents(), bindTabContentEvents(), closeMenu(), constructor(), destroy() (+34 more)

### Community 1 - "Extension Configuration"
Cohesion: 0.07
Nodes (28): action, default_icon, default_popup, default_title, background, service_worker, commands, toggle-ambient (+20 more)

### Community 2 - "Settings and Localization"
Cohesion: 0.13
Nodes (7): i18n, I18nManager, translations, DEFAULT_SETTINGS, PRESETS, sanitizeSettingValue(), settingsManager

### Community 5 - "Build Configuration"
Cohesion: 0.10
Nodes (16): author, description, devDependencies, esbuild, keywords, license, name, scripts (+8 more)

### Community 9 - "Documentation and Brand Assets"
Cohesion: 0.22
Nodes (9): LumaBorder app icon 128px, LumaBorder app icon 16px, LumaBorder app icon 32px, LumaBorder app icon 48px, LumaBorder popup dashboard, Glow effect master toggle, Quick preset profiles, LumaBorder (+1 more)

## Knowledge Gaps
- **4 isolated node(s):** `LumaBorder project documentation`, `Glow effect master toggle`, `Quick preset profiles`, `LumaBorder app icon 16px`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 59 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AmbientEngine` connect `Ambient Rendering Engine` to `Content Script Bootstrap`, `Settings and Localization`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `LumaBorder project documentation`, `Glow effect master toggle`, `Quick preset profiles` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Video Feature Operations` be split into smaller, more focused modules?**
  _Cohesion score 0.08944793850454227 - nodes in this community are weakly interconnected._
- **Why does `PlayerUI` connect `Player Controls Interface` to `Content Script Bootstrap`, `Settings and Localization`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `Extension Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Why does `PopupController` connect `Popup Settings Controller` to `Settings and Localization`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `Settings and Localization` be split into smaller, more focused modules?**
  _Cohesion score 0.13230769230769232 - nodes in this community are weakly interconnected._