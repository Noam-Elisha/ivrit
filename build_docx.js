/* Build the six-month plan as a .docx, driven by the same curriculum data
   that powers index.html so the two can never drift apart. */
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageBreak, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageOrientation, TabStopType
} = require('docx');

/* ---------- pull the curriculum out of the built app ---------- */
const html = fs.readFileSync('index.html', 'utf8');
const js = html.match(/<script>([\s\S]*)<\/script>/)[1];
global.document = {
  querySelectorAll: () => [], querySelector: () => ({ style: {}, addEventListener() {} }),
  getElementById: () => ({ innerHTML: '', value: 0, style: {}, addEventListener() {}, focus() {}, setSelectionRange() {} }),
  addEventListener() {}, body: { classList: { remove() {}, add() {} } }
};
global.window = { scrollTo() {} };
global.localStorage = { getItem() { return null; }, setItem() {} };
let G;
eval(js + ';G = { LESSONS, DAYS, PAST, reviewFor, lessonDayOf, L1, P2 };');
const SETS = G.LESSONS, PLAN = G.DAYS, PASTS = G.PAST, revFor = G.reviewFor;

/* ---------- type helpers ---------- */
const HEB = 'Times New Roman';   // reliable Hebrew + nikud coverage everywhere
const LAT = 'Calibri';
const INK = '1A1D24', SOFT = '555D6B', ACC = '9E2B3F', TEK = '2C5566';

const hebFont = { ascii: HEB, hAnsi: HEB, cs: HEB };
const latFont = { ascii: LAT, hAnsi: LAT, cs: LAT };

/** A Hebrew-only paragraph: right-to-left at both paragraph and run level. */
function heb(text, { size = 28, bold = false, color = INK, spacing } = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    spacing: spacing || { before: 40, after: 40 },
    children: [new TextRun({
      text, font: hebFont, size, color,
      bold, boldComplexScript: bold, rightToLeft: true
    })]
  });
}

/** An English paragraph that may end with a Hebrew run. */
function line(parts, { size = 20, color = INK, italics = false, spacing, bold = false, indent } = {}) {
  const kids = (Array.isArray(parts) ? parts : [parts]).map(p =>
    typeof p === 'string'
      ? new TextRun({ text: p, font: latFont, size, color, italics, bold })
      : new TextRun({
          text: p.he, font: hebFont, size: p.size || size + 6, color: p.color || color,
          rightToLeft: true, bold: p.bold, boldComplexScript: p.bold
        })
  );
  return new Paragraph({
    spacing: spacing || { before: 20, after: 20 },
    indent,
    children: kids
  });
}

function h1(text, pageBreak) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: !!pageBreak,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: latFont, size: 32, bold: true, color: INK })]
  });
}
function h2(text, color) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 80 },
    children: [new TextRun({ text, font: latFont, size: 26, bold: true, color: color || ACC })]
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 60 },
    children: [new TextRun({ text, font: latFont, size: 22, bold: true, color: INK })]
  });
}
function label(text, color) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    children: [new TextRun({
      text: text.toUpperCase(), font: latFont, size: 16, bold: true,
      color: color || SOFT, characterSpacing: 30
    })]
  });
}
function rule() {
  return new Paragraph({
    spacing: { before: 60, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'D8DCE3', space: 1 } },
    children: [new TextRun({ text: '', size: 2 })]
  });
}
function blank(size = 12) {
  return new Paragraph({ children: [new TextRun({ text: '', size })] });
}

/* ---------- one vocabulary entry ---------- */
function wordEntry(w) {
  const out = [];
  out.push(new Paragraph({
    spacing: { before: 200, after: 20 },
    children: [new TextRun({ text: w.en, font: latFont, size: 23, bold: true, color: INK })]
  }));
  // "To be" and "News" have no form in this slot — skip the placeholder dash
  if (w.he && w.he !== '—') out.push(heb(w.he, { size: 30, bold: true }));

  const second = [w.tr];
  if (w.inf) { second.push('     infinitive:  ' + w.inf + '  '); second.push({ he: w.infHe, size: 24 }); }
  else if (w.pl && w.pl !== '—') { second.push('     plural:  ' + w.pl + '  '); second.push({ he: w.plHe, size: 24 }); }
  out.push(line(second, { size: 20, color: ACC, spacing: { before: 0, after: 60 } }));

  if (w.mn) {
    out.push(new Paragraph({
      spacing: { before: 40, after: 60 },
      children: [
        new TextRun({ text: 'Remember it:  ', font: latFont, size: 19, bold: true, color: SOFT }),
        new TextRun({ text: w.mn, font: latFont, size: 19, color: SOFT })
      ]
    }));
  }
  if (w.ex) {
    out.push(heb(w.ex[1], { size: 26, spacing: { before: 60, after: 20 } }));
    out.push(line([w.ex[0] + '   —   ' + w.ex[2]], { size: 18, color: SOFT, italics: true, spacing: { before: 0, after: 100 } }));
  }
  return out;
}

/* ---------- one review line ---------- */
function reviewLine(w) {
  const kids = [
    new TextRun({ text: w.en + '   —   ', font: latFont, size: 19, color: INK }),
    new TextRun({ text: w.tr, font: latFont, size: 19, color: SOFT })
  ];
  if (w.he && w.he !== '—') {
    kids.push(new TextRun({ text: '   —   ', font: latFont, size: 19, color: SOFT }));
    kids.push(new TextRun({ text: w.he, font: hebFont, size: 24, color: INK, rightToLeft: true }));
  }
  return new Paragraph({ spacing: { before: 10, after: 10 }, indent: { left: 200 }, children: kids });
}

/* ---------- past-tense tables ---------- */
const W = 9360;
function cell(children, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    children
  });
}
function txt(t, opts = {}) {
  return new Paragraph({
    spacing: { before: 0, after: 0 },
    alignment: opts.right ? AlignmentType.RIGHT : AlignmentType.LEFT,
    bidirectional: !!opts.rtl,
    children: [new TextRun({
      text: t, font: opts.rtl ? hebFont : latFont, size: opts.size || 19,
      bold: !!opts.bold, boldComplexScript: !!opts.bold,
      color: opts.color || INK, rightToLeft: !!opts.rtl
    })]
  });
}
function headerRow(cells, widths) {
  return new TableRow({
    tableHeader: true,
    children: cells.map((c, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: 'F0F2F5' },
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      children: [txt(c, { bold: true, size: 17, color: SOFT, right: i === cells.length - 1 && c === 'Hebrew' })]
    }))
  });
}
function conjTable(rows) {
  const widths = [3120, 3120, 3120];
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow(['Person', 'Transliteration', 'Hebrew'], widths)].concat(
      rows.map(r => new TableRow({
        children: [
          cell([txt(r[0], { color: SOFT })], widths[0]),
          cell([txt(r[1], { bold: true, color: ACC })], widths[1]),
          cell([txt(r[2], { rtl: true, size: 24, right: true })], widths[2])
        ]
      }))
    )
  });
}
function verbTable(rows) {
  const widths = [2400, 1740, 1740, 1740, 1740];
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow(['Verb', 'Ani (I)', 'Hebrew', 'Hu (he)', 'Hebrew'], widths)].concat(
      rows.map(r => new TableRow({
        children: [
          cell([txt(r[0], { color: INK })], widths[0]),
          cell([txt(r[1], { bold: true, color: ACC })], widths[1]),
          cell([txt(r[2], { rtl: true, size: 23, right: true })], widths[2]),
          cell([txt(r[3], { bold: true, color: ACC })], widths[3]),
          cell([txt(r[4], { rtl: true, size: 23, right: true })], widths[4])
        ]
      }))
    )
  });
}

/* ================= assemble ================= */
const body = [];

/* --- cover --- */
body.push(new Paragraph({
  spacing: { before: 1400, after: 100 },
  children: [new TextRun({ text: 'Six Months of Ivrit', font: latFont, size: 60, bold: true, color: INK })]
}));
body.push(heb('שֵׁשׁ חֳדָשִׁים שֶׁל עִבְרִית', { size: 40, color: ACC, spacing: { before: 0, after: 200 } }));
body.push(new Paragraph({
  spacing: { after: 400 },
  children: [new TextRun({
    text: '503 words · 26 weeks · 15–20 minutes a day',
    font: latFont, size: 24, color: SOFT
  })]
}));
body.push(line(['Everything from your four word lists — 134 verbs, 254 nouns, 83 adjectives and 33 connectors — laid out day by day. Every word comes with a memory hook and a sentence you can actually use. Verbs stay in the infinitive and present tense until week 22; the past tense gets its own five weeks at the end, taught by pattern.'], { size: 21, color: INK, spacing: { after: 200 } }));
body.push(line(['Use the document outline to jump to a day: in Google Docs, tap the three dots and turn on ', 'Document outline', '.'], { size: 20, color: SOFT }));

/* --- how it works --- */
body.push(h1('How this works', true));

body.push(h3('A week'));
[
  ['Days 1–5', 'five new words grouped by theme, plus tiered review — 15–20 minutes.'],
  ['Day 6', 'a review of the week’s 25 words — 10 minutes.'],
  ['Day 7', 'off. Or five minutes on whatever felt shaky.']
].forEach(([a, b]) => {
  body.push(new Paragraph({
    spacing: { before: 40, after: 40 }, indent: { left: 200 },
    children: [
      new TextRun({ text: a + '  —  ', font: latFont, size: 21, bold: true, color: INK }),
      new TextRun({ text: b, font: latFont, size: 21, color: SOFT })
    ]
  }));
});

body.push(h3('How the review is spaced'));
body.push(line(['Each study day brings back five earlier sets at expanding intervals — roughly 1 day, 3 days, 1 week, 3 weeks and 2 months after you first met them. That is the spacing research on forgetting keeps landing on: you revisit a word just as it starts to slip, which is when the repetition does the most work.'], { size: 21, color: SOFT }));
body.push(line(['In practice that is about 25 review items on top of the 5 new ones. The oldest tiers are marked ', 'quick pass', ' — if the meaning comes back within a second or two, move on. Do not linger.'], { size: 21, color: SOFT }));

body.push(h3('How to actually study a day'));
[
  'Read each new word aloud, Hebrew included. Saying it is what makes it stick — silent reading is much weaker.',
  'Read the mnemonic once. You do not need to memorise it; you need it available the first few times you stumble.',
  'Read the example sentence aloud too. Words learned inside a sentence come back faster than words learned alone.',
  'For the review lists, cover the Hebrew column with your thumb and try to produce it from the English. Producing is harder than recognising, and worth several times more.'
].forEach((t, i) => {
  body.push(new Paragraph({
    spacing: { before: 50, after: 50 }, indent: { left: 200, hanging: 200 },
    children: [
      new TextRun({ text: (i + 1) + '.  ', font: latFont, size: 21, bold: true, color: ACC }),
      new TextRun({ text: t, font: latFont, size: 21, color: SOFT })
    ]
  }));
});

body.push(h3('The mnemonics'));
body.push(line(['They come in three kinds. ', 'Sound-alikes', ' (tzarich — you need to be rich). ', 'Root connections', ' that link a new word to one you already know (sefer book → sofer writer → sifriya library). And ', 'cultural anchors', ' (Rosh Hashanah is the head of the year). The root connections are the ones that compound: Hebrew is built from three-letter roots, and every one you recognise makes the next dozen words cheaper.'], { size: 21, color: SOFT }));

body.push(h3('If you fall behind'));
body.push(line(['Do not restart and do not try to catch up by doubling. Carry on from where you stopped — the spaced review pulls missed words back through on its own within a couple of weeks. Missing days is expected, and the schedule is built to absorb it.'], { size: 21, color: SOFT }));

body.push(h3('Corrections to the original word lists'));
body.push(line(['A handful of rows had small errors, fixed here:'], { size: 21, color: SOFT }));
[
  ['Hurt', 'mixed two verbs — lehach’iv and lifgoa. Kept as lifgoa / pogea, the everyday one.'],
  ['Cuddle', 'listed lefanek in the present but the past of lechabek (to hug). Kept as lefanek throughout.'],
  ['Return (something)', 'had the forms for lachzor (to go back). Corrected to lehachzir / machzir.'],
  ['Garden', 'listed the noun gina as its infinitive. Corrected to leganen.'],
  ['Need', 'mixed tzarich with the more formal lehizdakek. Kept as tzarich.'],
  ['Enjoy', 'had the past as heneti; the correct form is nehe’neti.'],
  ['Frustrated', 'was mevutsal; the standard word is metuskal.'],
  ['Most', 'was written hachat; it is hachi (superlatives) or rov (“the majority”).'],
  ['Window', 'was missing its Hebrew.'],
  ['Several rows', 'had stray Latin letters inside Hebrew words (Bikas-nu, Shin-iti, Hirgash-ti) — retyped cleanly.']
].forEach(([a, b]) => {
  body.push(new Paragraph({
    spacing: { before: 30, after: 30 }, indent: { left: 200, hanging: 200 },
    children: [
      new TextRun({ text: '•  ', font: latFont, size: 20, color: SOFT }),
      new TextRun({ text: a + ' ', font: latFont, size: 20, bold: true, color: INK }),
      new TextRun({ text: b, font: latFont, size: 20, color: SOFT })
    ]
  }));
});

/* --- the daily plan --- */
const TIER_TITLE = {
  'Yesterday': 'Yesterday', '3 days ago': '3 days ago', 'Last week': 'Last week',
  '3 weeks ago': '3 weeks ago — quick pass', '2 months ago': '2 months ago — quick pass'
};

let curWeek = 0;
PLAN.forEach(day => {
  if (day.week !== curWeek) {
    curWeek = day.week;
    const phase = curWeek >= 22 ? 'Phase 2 · past tense'
                : curWeek === 21 ? 'Consolidation week'
                : 'Phase 1 · vocabulary & present tense';
    body.push(h1('Week ' + curWeek, true));
    body.push(new Paragraph({
      spacing: { before: 0, after: 140 },
      children: [new TextRun({ text: phase, font: latFont, size: 19, color: SOFT, italics: true })]
    }));
  }

  const hasNew = PLAN.some(d => d.week === day.week && d.type === 'lesson');
  let title, lede;
  if (day.type === 'lesson') {
    title = 'Day ' + day.n + '  —  ' + SETS[day.li].t;
    lede = SETS[day.li].c;
  } else if (day.type === 'past') {
    title = 'Day ' + day.n + '  —  ' + PASTS[day.pi].t;
    lede = 'Past tense';
  } else if (day.type === 'weekreview') {
    title = 'Day ' + day.n + '  —  ' + (hasNew ? 'Week ' + day.week + ' review' : 'Mixed recall');
    lede = hasNew ? 'No new words. Cover the Hebrew and work through everything from this week.'
                  : 'No new words. A wider sweep back through earlier material.';
  } else if (day.type === 'rest') {
    title = 'Day ' + day.n + '  —  Rest';
    lede = '';
  } else {
    title = 'Day ' + day.n + '  —  Consolidation';
    lede = day.week === 21
      ? 'All 503 words are now behind you. A deliberate pause before the past tense.'
      : 'A catch-up day. No new material.';
  }
  body.push(h2(title, day.type === 'past' ? TEK : (day.type === 'lesson' ? ACC : SOFT)));
  if (lede) body.push(new Paragraph({
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text: lede, font: latFont, size: 18, color: SOFT, italics: true })]
  }));

  if (day.type === 'rest') {
    body.push(line(['Rest is part of the schedule, not a failure of it. Memory consolidates in the gaps — a day off costs you almost nothing and makes tomorrow cheaper.'], { size: 20, color: SOFT, italics: true }));
    return;
  }

  if (day.type === 'lesson') {
    body.push(label('New today · ' + SETS[day.li].w.length + ' words', ACC));
    body.push(rule());
    SETS[day.li].w.forEach(w => wordEntry(w).forEach(p => body.push(p)));
  }

  if (day.type === 'past') {
    const P = PASTS[day.pi];
    body.push(label('The pattern', TEK));
    body.push(rule());
    body.push(line([P.focus], { size: 21, color: INK }));
    if (P.table) { body.push(blank()); body.push(conjTable(P.table)); }
    if (P.verbs && P.verbs.length) { body.push(blank()); body.push(verbTable(P.verbs)); }
    if (P.tip) {
      body.push(new Paragraph({
        spacing: { before: 160, after: 60 },
        children: [
          new TextRun({ text: 'Watch out:  ', font: latFont, size: 20, bold: true, color: ACC }),
          new TextRun({ text: P.tip, font: latFont, size: 20, color: SOFT })
        ]
      }));
    }
    if (P.ex) {
      body.push(heb(P.ex[1], { size: 26 }));
      body.push(line([P.ex[0] + '   —   ' + P.ex[2]], { size: 18, color: SOFT, italics: true }));
    }
  }

  const rev = revFor(day);
  if (rev.length) {
    const total = rev.reduce((a, r) => a + r.lesson.w.length, 0);
    body.push(label('Review · ' + total + ' words', TEK));
    body.push(rule());
    rev.forEach(r => {
      const when = TIER_TITLE[r.tier.when] || r.tier.when;
      body.push(new Paragraph({
        spacing: { before: 120, after: 40 },
        children: [
          new TextRun({ text: when, font: latFont, size: 18, bold: true, color: TEK }),
          new TextRun({ text: '   ·   ' + r.lesson.t, font: latFont, size: 18, color: SOFT })
        ]
      }));
      r.lesson.w.forEach(w => body.push(reviewLine(w)));
    });
  }

  if (day.type === 'weekreview') {
    body.push(new Paragraph({
      spacing: { before: 160, after: 60 },
      children: [
        new TextRun({ text: 'Then produce, don’t just recognise.  ', font: latFont, size: 20, bold: true, color: ACC }),
        new TextRun({ text: 'Write five sentences using this week’s words, or say them out loud. Producing a word is what moves it from “I know that one” to actually available when you need it.', font: latFont, size: 20, color: SOFT })
      ]
    }));
  }
});

/* --- index --- */
body.push(h1('Index — all 503 words by category', true));
body.push(line(['Every word in the plan, grouped by category, with the day it is introduced.'], { size: 20, color: SOFT, spacing: { after: 160 } }));

const groups = {};
SETS.forEach((L, i) => { (groups[L.c] = groups[L.c] || []).push({ L, i }); });
const topOrder = ['Verbs', 'Nouns', 'Adjectives', 'Connectors'];
Object.keys(groups).sort((a, b) => {
  const ta = topOrder.indexOf(a.split(' ·')[0]), tb = topOrder.indexOf(b.split(' ·')[0]);
  return ta !== tb ? ta - tb : a.localeCompare(b);
}).forEach(cat => {
  const rows = [];
  groups[cat].forEach(g => g.L.w.forEach(w => rows.push({ w, day: G.lessonDayOf[g.i] })));
  body.push(h3(cat));
  rows.forEach(r => {
    body.push(new Paragraph({
      spacing: { before: 8, after: 8 }, indent: { left: 200 },
      children: [
        new TextRun({ text: r.w.en + '   —   ', font: latFont, size: 18, color: INK }),
        new TextRun({ text: r.w.tr + '   —   ', font: latFont, size: 18, color: SOFT }),
        new TextRun({ text: r.w.he, font: hebFont, size: 23, color: INK, rightToLeft: true }),
        new TextRun({ text: '   ·  day ' + r.day, font: latFont, size: 16, color: SOFT })
      ]
    }));
  });
});

/* ---------- write ---------- */
const doc = new Document({
  creator: 'Hebrew study plan',
  title: 'Six Months of Ivrit',
  description: 'A 26-week Hebrew vocabulary and grammar plan, 503 words with mnemonics and example sentences.',
  styles: {
    default: {
      document: { run: { font: latFont, size: 21, color: INK }, paragraph: { spacing: { line: 276 } } }
    }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840, orientation: PageOrientation.PORTRAIT },
        margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 }
      }
    },
    children: body
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('Hebrew - Six Month Plan.docx', buf);
  console.log('wrote Hebrew - Six Month Plan.docx  %.2f MB', buf.length / 1048576);
  console.log('paragraph/table elements:', body.length);
});
