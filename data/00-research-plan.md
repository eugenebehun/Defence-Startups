# Defence Tech — Seed / Series A / Series B research plan
Created 2026-08-26 · Window: 2025-09-01 → 2026-08-26 (last 12 months)

## Goal
Build a manually-reviewable map of young defence companies that raised
Seed / A / B in the last 12 months, and extract the pattern behind the
ones that moved fastest.

Not a sales target list. This is landscape reconnaissance.

---

## The one thing that makes or breaks this plan

**Crunchbase is blind at Seed in this sector.** Through May 2026, zero of
twenty disclosed staged deals were Seed rounds — because defence startups
routinely stay in stealth, and because Crunchbase backfills seed data 6-18
months late.

**SEC Form D is not blind.** Any US company selling securities under
Regulation D must file within 15 days of the first sale, and the filing is
public on EDGAR immediately. It discloses the company, address, offering
size, amount sold, and executive officers. It does NOT disclose valuation
or investor names.

So: Form D is the earliest reliable public signal for US Seed rounds, and
it is free. Anything sourced only from Crunchbase will systematically
under-represent exactly the stage you asked about.

---

## Phase 0 — Set the boundaries (1 hour, do it once, write it down)

Decide and record:
- Time window: rounds announced or filed 2025-09-01 → 2026-08-26
- Geography: US + Europe + Israel? Or US-only first?
- Round size floor: suggest $3M — below that the signal is noise
- Round size ceiling: $300M — above that it is not "young" any more
- What counts as defence: pure-play only, or dual-use too?

Write the answers at the top of the longlist file. Every later filter
depends on them.

---

## Phase 1 — Mechanical collection (4-6 hours → 150-250 companies)

Run all five channels. They overlap; the overlap is the quality signal.

### 1a. Investor portfolio sweep — highest yield per hour, start here
Take the ~12 most active funds and walk their portfolio pages. Any company
added in the last 12 months that you do not recognise goes in the longlist.

- a16z American Dynamism — https://a16z.com/american-dynamism/
- 8VC, Lux Capital, Founders Fund, Shield Capital
- General Catalyst, Kleiner Perkins, Thrive Capital
- Decisive Point, Scout Ventures, Razor's Edge Ventures
- NATO Innovation Fund (Europe) — known holdings: ARX Robotics, Stark,
  Tekever, TYTAN Technologies, KRAKEN Technology Group, Aquark, Kelluu

Why first: portfolios are curated, current, and free. One fund page can
yield 10-30 candidates in ten minutes.

### 1b. SEC Form D sweep — the only real Seed channel
EDGAR company search, filter form type = D, by SIC code:
- 3721 Aircraft · 3724 Aircraft engines · 3728 Aircraft parts
- 3761 Guided missiles & space vehicles · 3764 propulsion · 3769 parts
- 3812 Search, detection, navigation, guidance, aeronautical systems
- 3663 Radio/TV broadcasting & communications equipment
- 7372 Prepackaged software (for the software-only players)

Entry point: https://www.sec.gov/cgi-bin/browse-edgar (action=getcompany,
type=D). Sort by date, walk the last 12 months per SIC code.

Caveat: SIC self-classification is sloppy. Expect false positives and a
real miss rate. This is a supplement to 1a, not a replacement.

### 1c. Government traction sweep
- SBIR/STTR awards — https://www.sbir.gov/awards — filter agency = DOD,
  Phase II, last 12 months. Phase II means someone technical already
  believed them.
- SAM.gov — https://sam.gov/search/ — contract awards
- USAspending.gov — https://www.usaspending.gov/search — who actually got paid
- DIU — https://www.diu.mil/ — published solicitation winners

### 1d. Newsletter backfill — cheapest ongoing signal
Read the last 12 months of archives:
- Dual Use Investor — dualuseinvestor.substack.com
- Emerging Defense Weekly — emergingdefense.substack.com
- Defence Finance Monitor — defencefinancemonitor.substack.com
- Tectonic Defense — tectonicdefense.com
- Crunchbase News, weekly "10 Biggest Funding Rounds" column

### 1e. Database sweep — last, because it is the most expensive
Crunchbase / Dealroom / Tracxn / PitchBook, filtered to stage + window +
category. Use these to *verify and enrich* what 1a-1d already found, not
to discover. Free tiers are enough for verification.

**Output of Phase 1:** raw company names + one URL each, in
`01-longlist-screening.csv`. Do not enrich yet. Volume first.

---

## Phase 2 — Screening pass (4-6 hours → 40-60 survivors)

Fill only the L1 columns of `01-longlist-screening.csv`. Budget 3-5
minutes per company. If it takes longer, the company is too opaque —
score it low on criterion 6 and move on.

Score each on the six criteria in `03-reference-lists.md`. Mark
`Deep_Dive_YN = Y` where Screen_Score >= 12.

Discipline rule: **do not read deeply during screening.** The single most
common way this kind of research dies is falling down a rabbit hole on
company #7 of 200.

---

## Phase 3 — Deep dive (20-30 hours → 30 companies)

For each Y-marked company, fill `02-deepdive.csv`. Budget 20-40 minutes
each. Sources per company:
- Company site + any technical blog
- LinkedIn: founder history, current headcount, headcount 12 months ago,
  open roles (roles reveal strategy better than press releases)
- SAM.gov / USAspending for real contract dollars
- Any podcast or conference talk by a founder — highest information
  density per minute available anywhere

The two columns that carry the actual value:
- `Months_Founding_To_Round` — the quantitative definition of "fast"
- `Why_They_Raised_Fast` — your hypothesis, one sentence, written before
  you look at the next company

---

## Phase 4 — Pattern synthesis (3-4 hours)

Group the 30 and answer:
1. What share are founded by ex-Anduril / ex-SpaceX / ex-Palantir people?
2. Did government traction precede the round, or follow it?
3. Which categories cluster at the fast end, which at the slow end?
4. Hardware vs software: which raised faster, which raised more?
5. How many had real combat validation before the round — and did it matter?
6. Who is conspicuously absent — what obvious category has no young entrants?

Question 6 is usually the most valuable output of the whole exercise.

---

## Effort and automation

Total manual effort: roughly 35-45 hours.

Automatable, if you want it cut to ~10:
- Phase 1b (Form D) — EDGAR has a public JSON API, fully scriptable
- Phase 1c (SBIR/USAspending) — both expose bulk download and APIs
- Phase 2 enrichment — website + LinkedIn summary per company

Phases 3 and 4 should stay manual. The value is in your judgement, and
that is the part you cannot outsource without losing the reason you are
doing this.

---

## Files
- `00-research-plan.md` — this file
- `01-longlist-screening.csv` — Phase 1-2 working table (2 example rows to delete)
- `02-deepdive.csv` — Phase 3 working table
- `03-reference-lists.md` — controlled vocabularies + scoring rubric
