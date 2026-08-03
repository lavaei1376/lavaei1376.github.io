# Saeed Lavaei — Portfolio 2026 (Build)

Working repo for the coded version of the portfolio. This file is the **technical**
continuity doc — pair it with the personal-branding project's chat summaries for
full context (design decisions, project list, credit rules, etc. live there).

## Status

| Stage | Scope | Status |
|---|---|---|
| 0 | Scaffold, design tokens, Peyda font setup | ✅ Done |
| 1 | Nav + Hero | ✅ Done |
| 2 | Project Index | ⏳ Not started |
| 3 | Case study template (VAMCO placeholder content) | ⏳ Not started |
| 4 | Section-divider system applied across all sections | 🔶 Component built (`.section-divider` in CSS), not yet placed — needs 2+ sections to bridge |
| 5 | About & Contact | ⏳ Not started |
| 6 | Animation refinement pass | 🔶 Ongoing per-section (Hero load sequence done) |
| 7 | Mobile pass (incl. 16:9 manual slider for galleries) | ⏳ Not started |
| 8 | Real content swap-in | ⏳ Waiting on assets from Saeed |
| 9 | Final polish + single-file embed + deploy | ⏳ Not started |

## Structure

```
/index.html              — all markup + CSS + JS (dev mode: linked font, not inlined)
/assets/fonts/            — Peyda Variable webfont (single file, weight 100–950)
/assets/img/               — (empty — real assets arrive per-project from Saeed)
```

**Important:** this is the *dev* structure. The final deliverable for ParsPack
hosting is a **single self-contained HTML file** with fonts/images base64-embedded.
That conversion happens once, at Stage 9 — not on every commit, since inlined
diffs are unreadable during active development.

## Design tokens (CSS custom properties, top of `index.html`)

- **Color:** `--color-bg` #F7F5F2, `--color-surface` #FCFBF9, `--color-placeholder` #F0EEEB,
  `--color-text-primary` #1B1B1B, `--color-text-secondary` #6C6C6C, `--color-border` #E7E3DD,
  `--color-black` #111111 (intentional — case-study heroes only)
- **Type:** Peyda (variable, single file), scale from `--fs-tiny` (10px) to `--fs-display` (64px)
- **Spacing:** `--sp-1` (4px) through `--sp-10` (140px, default section-to-section gap)
- **Radius:** 8 / 12 / 16px depending on element size
- Full reasoning for each value lives in the personal-branding project chat history.

## Section-divider system (Stage 4, component ready / not yet placed)

`.section-divider` — a full-width breathing-room block between major sections,
with a `.section-divider__ghost` element for a faint numeral/wayfinding mark
instead of dead space. Variants: `--tight` (96px, for denser transitions),
`--on-dark` (white-on-black variant for transitions in/out of case-study heroes).

## Continuity across chats

1. Finish a stage → download `index.html` (+ any new assets) → push to GitHub
2. New chat → give Claude the GitHub repo URL and a one-line status ("just finished
   Stage 2, starting Stage 3") → Claude fetches the live file from GitHub and
   continues from the actual code, not a description of it
3. Claude's memory carries the *why* (decisions); GitHub carries the *what* (code)
