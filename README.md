# Defence Startup

A screening longlist of **46 defence companies founded 2021 or later** that raised
**Seed, Series A or Series B** in the twelve months to August 2026 — plus the
**23 investors** who funded them.

**Live site:** https://eugenebehun.github.io/Defence-startup/

## Pages

| Page | What it holds |
|---|---|
| [Companies](https://eugenebehun.github.io/Defence-startup/) | 46 rows, sortable and filterable by stage, geography, category and tag. Names link to official sites, YC profiles or source articles. |
| [Investors](https://eugenebehun.github.io/Defence-startup/investors.html) | 23 funds with AUM, cheque range, focus, and which companies from this list they backed. |

## What the data says

- **Counter-UAS is crowded** — 10 of 46 companies. Manufacturing and logistics are noticeably thinner.
- **Y Combinator appears on 22 of 46 rows.** That reflects YC's deliberate 2026 defence cohort, not relative company quality.
- **Only one fund led twice:** Plural, on Frankenburg Technologies and Hypersonica — both European missiles.
- **Institutional capital has arrived at Seed and Series A** — Bain, Accel, GV, Lux. GV leading a $50M Series A for autonomous warships would have been unthinkable three years ago.

## Honest limits

1. **Roughly 60% coverage.** The SEC Form D sweep, SBIR and SAM.gov sweeps, and portfolio walks for a16z American Dynamism, Founders Fund and Shield Capital have not been run. Expect 30–60% more US companies once they are.
2. **17 of 46 founding years are verified** against a source. The rest are marked `TBV` and must be checked before scoring.
3. **Currencies are not normalised.** Euro and dollar figures share one column as their sources reported them.
4. **One unresolved conflict.** Terra Industries is recorded at $34M ($11.8M seed led by 8VC plus a $22M follow-on led by Lux). One source reports the seed closing at $52M in total.
5. Asia is absent. Israel is thin.

## Repo layout

```
index.html          companies table
investors.html      investor cards
data.js             both datasets, plain JS objects
app.js              companies page logic
shared.css          design tokens, light + dark
data/               source CSV, research plan, exclusions, scoring rubric
```

`data/01-longlist-screening.csv` is the working table — open it in Sheets or Excel
and fill `Screen_Score` and `Deep_Dive_YN` yourself. The scoring rubric is in
`data/03-reference-lists.md`; `data/04-excluded.md` records companies that were
found and rejected, with reasons, so they are not re-researched.

## Method

Built from investor portfolio walks (Y Combinator, NATO Innovation Fund), sector
newsletters (Tectonic Defense, Vestbee, EU-Startups), and primary press releases.
Every figure traces to a source URL in the CSV. Nothing is estimated or inferred.

The full five-phase research plan, including the channels not yet run, is in
`data/00-research-plan.md`.
