# Six Months of Ivrit

A 26-week Hebrew study plan built from four vocabulary spreadsheets — **503 words**
(134 verbs, 254 nouns, 83 adjectives, 33 connectors), every one of them with a
memory hook and an example sentence.

**Live site:** `docs/index.html` → https://noam-elisha.github.io/ivrit/ *(once Pages is enabled)*

---

## The plan

| | |
|---|---|
| **Weeks 1–20** | All 503 words. Five new words a day, five days a week, grouped by theme. Verbs appear in the infinitive and **present tense only**. |
| **Week 21** | Consolidation. No new material — recall across the whole vocabulary before the tense shift. |
| **Weeks 22–26** | **Past tense**, taught by pattern (Pa'al → Pi'el → Hif'il → Hitpa'el/Nif'al) rather than word by word. Phase 1 vocabulary keeps cycling through. |

Each week: five study days, a review day, and a rest day. About 15–20 minutes daily.

**Spaced review.** Every study day brings back five earlier sets at expanding
intervals — roughly 1 day, 3 days, 1 week, 3 weeks and 2 months after first
contact. That's ~25 review items on top of the 5 new ones, with the oldest tiers
marked *quick pass*.

## The app

Single self-contained HTML file. No build step to run it, no dependencies, no
network calls except Google Fonts.

- **Day view** — new words in full, then review grouped by tier
- **Quiz mode** — blur the Hebrew or the English, tap to reveal
- **Progress** — mark days done; day, quiz mode, view and completed days persist
  in `localStorage` under the key `ivrit-v1`
- **All words** — searchable index of the 503 words by category
- Light and dark themes, keyboard nav (`←` / `→`), works offline

## Repo layout

```
docs/index.html          the site (GitHub Pages serves from here)
index.html               same app, bare fragment for embedding
template.html            markup, styles and app logic
src/*.js                 the curriculum data — the substance of the project
source/*.csv             the original word lists this was built from
build.py                 src/ + template.html → index.html + docs/index.html
build_docx.js            → Hebrew - Six Month Plan.docx (~350pp, for Google Docs)
export_anki.py           → hebrew-503-words-anki.csv (Anki / Quizlet import)
```

## Building

```bash
python build.py          # the web app — no dependencies
npm install              # only needed for the .docx export
node build_docx.js       # the Word document
python export_anki.py    # the flashcard CSV
```

`build_docx.js` and `export_anki.py` both read the built `index.html` and execute
its curriculum logic, so the document, the flashcards and the app can never drift
out of sync.

## Enabling GitHub Pages

Pages needs a public repo on a free account:

```bash
gh repo edit Noam-Elisha/ivrit --visibility public --accept-visibility-change-consequences
gh api -X POST repos/Noam-Elisha/ivrit/pages -f 'source[branch]=main' -f 'source[path]=/docs'
```

## Corrections to the source spreadsheets

Ten rows had errors, fixed in `src/`. Full list in the app under **How it works**.
The main ones: *Return (something)* carried the conjugation for `lachzor` (to go
back) rather than `lehachzir`; *Cuddle* mixed `lefanek` with the past of
`lechabek`; *Enjoy*'s past was `heneti` rather than `nehe'neti`; *Frustrated* was
`mevutsal` rather than the standard `metuskal`; *Most* was written `hachat`
instead of `hachi`; and *Window* was missing its Hebrew entirely.
