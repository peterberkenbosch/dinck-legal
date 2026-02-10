const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        LevelFormat } = require('docx');
const fs = require('fs');

// Styles
const docStyles = {
  default: { document: { run: { font: "Arial", size: 22 } } },
  paragraphStyles: [
    { id: "Title", name: "Title", basedOn: "Normal",
      run: { size: 48, bold: true, color: "000000", font: "Arial" },
      paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 28, bold: true, color: "000000", font: "Arial" },
      paragraph: { spacing: { before: 300, after: 200 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, color: "000000", font: "Arial" },
      paragraph: { spacing: { before: 200, after: 150 }, outlineLevel: 1 } },
  ]
};

const bulletConfig = {
  config: [{
    reference: "bullet-list",
    levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
  }]
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };
const headerShading = { fill: "1B3A5C", type: ShadingType.CLEAR }; // Navy header
const lightShading = { fill: "F0F4F8", type: ShadingType.CLEAR };

function headerCell(text, width) {
  return new TableCell({
    borders: cellBorders, width: { size: width, type: WidthType.DXA }, shading: headerShading,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, color: "FFFFFF", font: "Arial" })] })]
  });
}

function cell(text, width, opts = {}) {
  return new TableCell({
    borders: cellBorders, width: { size: width, type: WidthType.DXA },
    shading: opts.shading,
    children: [new Paragraph({ children: [new TextRun({ text, bold: opts.bold, size: 20, font: "Arial" })] })]
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.spaceBefore || 100, after: opts.spaceAfter || 100 },
    children: [new TextRun({ text, bold: opts.bold, italics: opts.italic, size: opts.size || 22, font: "Arial" })]
  });
}

function bullet(text, opts = {}) {
  const runs = [];
  if (opts.label) {
    runs.push(new TextRun({ text: opts.label, bold: true, size: 22, font: "Arial" }));
  }
  runs.push(new TextRun({ text, size: 22, font: "Arial" }));
  return new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: runs });
}

function heading1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] });
}

function heading2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}

function hr() {
  return new Paragraph({
    spacing: { before: 100, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 } },
    children: []
  });
}

function empty() {
  return new Paragraph({ children: [] });
}

// Build document
const children = [
  // Title
  new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Non-verbale Presentatie Advies")] }),
  p("Meeting 11 Februari 2026 \u2014 Van der Meer, Oosterwolde", { italic: true }),
  empty(),

  // Context block
  p("Situatie: 3-tegen-1 (Douwine, Marlou, Grady vs. Peter)", { bold: true }),
  p("Strategie: Luisteren, niets toezeggen, rustige autoriteit uitstralen", { bold: true }),

  hr(),

  // 1. KLEUR
  heading1("1. Kleur: Navy / Donkerblauw"),
  p("Draag donkerblauw. Geen rood.", { bold: true, size: 24 }),
  empty(),

  new Table({
    columnWidths: [2200, 4500, 2660],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell("Kleur", 2200), headerCell("Effect", 4500), headerCell("Geschikt?", 2660)
      ]}),
      new TableRow({ children: [
        cell("Navy / donkerblauw", 2200, { bold: true }),
        cell("Vertrouwen, stabiliteit, autoriteit, betrouwbaarheid. Kalm en in controle.", 4500),
        cell("JA \u2014 beste keuze", 2660, { bold: true, shading: { fill: "E8F5E9", type: ShadingType.CLEAR } })
      ]}),
      new TableRow({ children: [
        cell("Zwart", 2200, { bold: true }),
        cell("Autoriteit en macht, maar kan overweldigend/intimiderend overkomen", 4500),
        cell("Acceptabel als accent", 2660)
      ]}),
      new TableRow({ children: [
        cell("Rood", 2200, { bold: true }),
        cell("Activeert verdedigingsmechanisme. Verhoogt hartslag bij tegenpartij. Niet geschikt voor oplossingen.", 4500),
        cell("NEE", 2660, { bold: true, shading: { fill: "FFEBEE", type: ShadingType.CLEAR } })
      ]}),
      new TableRow({ children: [
        cell("Groen", 2200, { bold: true }),
        cell("Hoop, harmonie, compassie", 4500),
        cell("Neutraal/goed als accent", 2660)
      ]}),
      new TableRow({ children: [
        cell("Grijs", 2200, { bold: true }),
        cell("Professioneel maar passief", 4500),
        cell("Neutraal", 2660)
      ]}),
    ]
  }),
  empty(),

  p("Waarom navy: Studies tonen aan dat donkere, gedempte tinten (navy, charcoal) hoger scoren op betrouwbaarheid dan lichte of felle kleuren. Navy combineert autoriteit (donker) met vertrouwen (blauw) \u2014 precies de boodschap: \u201CIk ben kalm, ik ben betrouwbaar, ik ben in controle.\u201D"),
  empty(),
  p("Waarom NIET rood: Rood stimuleert het zenuwstelsel \u2014 verhoogde hartslag en ademhaling bij de mensen om je heen. Het activeert verdedigingsmechanismen. Rood is voor intimidatie, niet voor het bereiken van een oplossing."),
  empty(),
  p("Concreet: Navy overhemd of donkerblauw shirt. Geen stropdas nodig (het is bij een accountant, niet in de rechtbank). Schone, verzorgde uitstraling. Geen logo\u2019s, geen opvallende patronen.", { italic: true }),

  hr(),

  // 2. HOUDING
  heading1("2. Houding en Lichaamshouding"),
  p("Kernprincipe: Rust = kracht. Langzaam = in controle.", { bold: true, size: 24 }),
  empty(),

  heading2("Wel doen"),
  bullet("Rechtop zitten, schouders naar achteren, hoofd recht \u2014 neemt ruimte in, straalt vertrouwen uit"),
  bullet("Open houding: geen gekruiste armen of benen. Gekruiste ledematen = defensief/gesloten"),
  bullet("Handen zichtbaar: op tafel of in schoot. Verborgen handen = onbetrouwbaar signaal"),
  bullet("Steepling (vingertoppen tegen elkaar): het universele gebaar van vertrouwen en autoriteit. Gebruik dit terwijl je luistert"),
  bullet("Langzame bewegingen: geen gehaaste gebaren. Pak rustig je pen. Neem een slok water. Elke beweging bewust en beheerst"),
  bullet("Voeten plat op de grond: grounding. Geeft innerlijke rust en straalt stabiliteit uit"),
  bullet("Pen in de hand: signaleert dat je notities maakt (serieus, professioneel)"),
  empty(),

  heading2("Niet doen"),
  bullet("Niet achterover leunen (desinteresse)"),
  bullet("Niet voorover leunen (te eager/kwetsbaar)"),
  bullet("Niet met telefoon spelen"),
  bullet("Niet friemelen (pen klikken, ringen draaien)"),
  bullet("Niet te veel glimlachen (wordt gelezen als onzekerheid of people-pleasing)"),

  hr(),

  // 3. OOGCONTACT
  heading1("3. Oogcontact"),
  bullet("60-70% van de gesprekstijd oogcontact houden \u2014 dit is het optimum", { label: "Duur: " }),
  bullet("7-10 seconden aanhouden per keer, dan natuurlijk wegkijken (naar notities, handen)", { label: "Per keer: " }),
  bullet("Langer dan 10 seconden = agressief/oncomfortabel", { label: "Grens: " }),
  bullet("Direct oogcontact maken wanneer je iets zegt \u2014 versterkt je boodschap", { label: "Bij spreken: " }),
  bullet("Als Douwine emotioneel wordt: rustig oogcontact houden zonder weg te kijken = \u201Cik ben niet ge\u00EFntimideerd\u201D", { label: "Bij druk: " }),

  hr(),

  // 4. ZITPOSITIE
  heading1("4. Zitpositie"),
  p("Je bent alleen \u2014 positionering is extra belangrijk.", { bold: true }),
  empty(),
  bullet("Kies een plek waar je de deur kunt zien \u2014 verhoogt gevoel van controle", { label: "Deur in zicht: " }),
  bullet("Bewaar fysieke afstand", { label: "Niet naast Douwine: " }),
  bullet("Automatische machtspositie", { label: "Kopse kant als het kan: " }),
  bullet("Grady is de gespreksleider, tegenover hem = \u201Cchallenge position\u201D", { label: "Tegenover Grady: " }),
  bullet("Leg notitieblok en pen neer, zet telefoon (opname) zichtbaar neer. Claim je plek.", { label: "Ruimte innemen: " }),

  hr(),

  // 5. STEM EN TEMPO
  heading1("5. Stem en Tempo"),
  bullet("Haast signaleert nervositeit", { label: "Langzaam spreken: " }),
  bullet("Onder druk gaat je stem omhoog, bewust lager houden", { label: "Lager register: " }),
  bullet("Na een vraag van Douwine/Grady, tel tot 3 voor je antwoordt. Signaleert: \u201Cik denk na, ik laat me niet opjagen\u201D", { label: "Pauzes: " }),
  bullet("Niet harder praten als zij harder praten. Juist zachter = dwingt hen om te luisteren", { label: "Volume: " }),
  bullet("\u201CIk heb...\u201D, \u201CIk constateer...\u201D, \u201CIk laat het beoordelen...\u201D \u2014 eigenaarschap en autoriteit", { label: "\"Ik\"-statements: " }),

  hr(),

  // 6. SAMENVATTING
  heading1("6. Samenvatting: Het Totaalplaatje"),

  new Table({
    columnWidths: [1800, 3800, 3760],
    rows: [
      new TableRow({ tableHeader: true, children: [
        headerCell("Element", 1800), headerCell("Advies", 3800), headerCell("Waarom", 3760)
      ]}),
      new TableRow({ children: [
        cell("Kleur", 1800, { bold: true, shading: lightShading }),
        cell("Navy / donkerblauw", 3800, { shading: lightShading }),
        cell("Vertrouwen + autoriteit, geen agressie", 3760, { shading: lightShading })
      ]}),
      new TableRow({ children: [
        cell("Houding", 1800, { bold: true }),
        cell("Rechtop, open, langzaam", 3800),
        cell("Rust = kracht", 3760)
      ]}),
      new TableRow({ children: [
        cell("Handen", 1800, { bold: true, shading: lightShading }),
        cell("Steepling, pen, op tafel", 3800, { shading: lightShading }),
        cell("Vertrouwen en controle", 3760, { shading: lightShading })
      ]}),
      new TableRow({ children: [
        cell("Oogcontact", 1800, { bold: true }),
        cell("60-70%, 7-10 sec", 3800),
        cell("Kalm, niet ge\u00EFntimideerd", 3760)
      ]}),
      new TableRow({ children: [
        cell("Zitpositie", 1800, { bold: true, shading: lightShading }),
        cell("Deur in zicht, ruimte innemen", 3800, { shading: lightShading }),
        cell("Controle over de ruimte", 3760, { shading: lightShading })
      ]}),
      new TableRow({ children: [
        cell("Stem", 1800, { bold: true }),
        cell("Langzaam, laag, met pauzes", 3800),
        cell("Dwingt respect af", 3760)
      ]}),
      new TableRow({ children: [
        cell("Totaal", 1800, { bold: true, shading: { fill: "1B3A5C", type: ShadingType.CLEAR } }),
        cell("Kalm, zakelijk, in controle", 3800, { shading: { fill: "E8EEF4", type: ShadingType.CLEAR } }),
        cell("\"Ik heb de tijd. Ik heb de feiten. Ik besluit later.\"", 3760, { shading: { fill: "E8EEF4", type: ShadingType.CLEAR } })
      ]}),
    ]
  }),

  hr(),

  // Bronnen
  p("Bronnen", { bold: true, size: 20 }),
  p("Color Institute: Color Psychology in Business & Leadership \u2022 The Dark Knot: Formal Attire & Negotiation \u2022 Harvard PON: Body Language in Negotiation \u2022 Fast Company: 9 Body Language Tricks for Negotiation \u2022 Frankie Kemp: The 4 Power Positions in Meetings \u2022 Science of People: Confident Body Language \u2022 Aligned Negotiation: Power of Body Language \u2022 Color Psychology org: Navy Blue Meaning & Symbolism", { size: 18, italic: true }),
];

const doc = new Document({
  styles: docStyles,
  numbering: bulletConfig,
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children
  }]
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outPath = "/home/peter/dinck-legal/artifacts/Presentatie_Advies_11Feb.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Generated: " + outPath);
}

main().catch(console.error);
