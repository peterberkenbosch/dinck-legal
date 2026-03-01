const { Document, Packer, Paragraph, TextRun, BorderStyle } = require('docx');
const fs = require('fs');

function p(text, opts = {}) {
  const children = [];
  if (opts.boldPrefix) {
    children.push(new TextRun({ text: opts.boldPrefix, bold: true, size: opts.size || 22, font: "Arial" }));
    children.push(new TextRun({ text, size: opts.size || 22, font: "Arial", italics: opts.italic }));
  } else {
    children.push(new TextRun({
      text,
      bold: opts.bold,
      italics: opts.italic,
      size: opts.size || 22,
      font: "Arial"
    }));
  }
  return new Paragraph({
    spacing: { before: opts.spaceBefore || 100, after: opts.spaceAfter || 100 },
    alignment: opts.align,
    indent: opts.indent ? { left: opts.indent } : undefined,
    children
  });
}

function heading(text) {
  return new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: 22, font: "Arial" })]
  });
}

function sub(label, text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    indent: { left: 720 },
    children: [
      new TextRun({ text: label + " ", bold: true, size: 22, font: "Arial" }),
      new TextRun({ text, size: 22, font: "Arial" })
    ]
  });
}

function separator() {
  return new Paragraph({
    spacing: { before: 100, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 } },
    children: []
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // Afzender
      p("PHBX Holding B.V.", { bold: true, size: 24 }),
      p("peter@phbxholding.com", { size: 20 }),
      p("KvK: 75861097", { size: 20 }),
      p(""),
      p("Oosterwolde, 1 maart 2026"),
      p(""),

      // Geadresseerde
      p("Aan het bestuur van Dinck B.V.", { bold: true }),
      p("Van Emstweg 85"),
      p("8426 BT Appelscha (fr)"),
      p(""),
      p("T.a.v. mevrouw D. Koopman, bestuurder", { italic: true, size: 20 }),
      p(""),
      p("Kopie aan:", { bold: true, size: 20 }),
      p("–  Marlou Woltmeijer (mede-aandeelhouder Dinck B.V.)", { size: 20 }),
      p(""),

      separator(),

      // Betreft
      p("Informatieverzoek op grond van artikel 2:217 lid 2 BW", { bold: true }),
      p(""),

      // Aanhef
      p("Geachte mevrouw Koopman,"),
      p(""),

      // Intro
      p("PHBX Holding B.V. houdt 33,3% van de aandelen in het kapitaal van Dinck B.V. Per heden, 1 maart 2026, is PHBX Holding B.V. afgetreden als bestuurder van de vennootschap. Mijn positie als aandeelhouder blijft ongewijzigd."),
      p(""),
      p("Op grond van artikel 2:217 lid 2 BW verzoek ik het bestuur van Dinck B.V. mij de volgende inlichtingen te verstrekken:"),

      // 1. Jaarrekening
      heading("1. Jaarrekening 2025"),
      sub("a.", "De stand van zaken met betrekking tot de opstelling van de jaarrekening over het boekjaar 2025;"),
      sub("b.", "De verwachte datum van vaststelling door de algemene vergadering;"),
      sub("c.", "Of de jaarrekening 2025 is gedeponeerd bij de Kamer van Koophandel, dan wel de verwachte deponeringsdatum;"),
      sub("d.", "Of de aangifte vennootschapsbelasting over het boekjaar 2025 is ingediend, dan wel de verwachte indieningsdatum."),

      // 2. Tussentijdse cijfers
      heading("2. Tussentijdse financiële gegevens"),
      sub("a.", "Een balans per 28 februari 2026 (of het meest recente beschikbare moment);"),
      sub("b.", "Een winst- en verliesrekening over het boekjaar 2025;"),
      sub("c.", "Een winst- en verliesrekening over de maanden januari en februari 2026."),

      // 3. Schuldpositie
      heading("3. Actuele schuldpositie"),
      sub("a.", "Een specificatie van alle uitstaande schulden per crediteur, met vermelding van hoofdsom, rente en opeisbaarheid;"),
      sub("b.", "Het actuele saldo van de rekening-courant met Freca B.V.;"),
      sub("c.", "Een overzicht van alle lopende contractuele verplichtingen van de vennootschap."),

      // 4. Liquiditeit
      heading("4. Liquiditeitspositie"),
      sub("a.", "Het actuele banksaldo van de vennootschap;"),
      sub("b.", "Een liquiditeitsprognose voor de komende zes maanden."),

      // 5. Salarissen
      heading("5. Salarisverplichtingen"),
      sub("a.", "Of de salarissen van de werknemers van Dinck B.V. over de maand februari 2026 zijn voldaan;"),
      sub("b.", "Op welke wijze het bestuur voornemens is de salarisverplichtingen vanaf maart 2026 te voldoen, gelet op de stopzetting van de operationele financiering per 6 februari 2026."),

      // 6. Aflossing
      heading("6. Aflossing 28 maart 2026"),
      sub("a.", "Welke maatregelen het bestuur overweegt om de eerste aflossing op de geldlening aan Freca B.V. (verschuldigd op 28 maart 2026, geschat €55.000–€75.000) te voldoen;"),
      sub("b.", "Of met Freca B.V. uitstel van betaling is of wordt overeengekomen."),

      // Termijn
      p(""),
      p("Ik verzoek u bovenstaande informatie schriftelijk te verstrekken binnen veertien dagen na dagtekening van deze brief, derhalve uiterlijk op 15 maart 2026."),
      p(""),
      p("Ik wijs u erop dat artikel 2:217 lid 2 BW het bestuur verplicht de verlangde inlichtingen te verstrekken, tenzij een zwaarwichtig belang van de vennootschap zich daartegen verzet. In dat geval verzoek ik u een eventuele weigering schriftelijk en gemotiveerd kenbaar te maken."),
      p(""),

      // Afsluiting
      p("Met vriendelijke groet,"),
      p(""),
      p(""),
      p("Peter Berkenbosch"),
      p("Namens PHBX Holding B.V."),
    ]
  }]
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outPath = "/home/peter/dinck-legal/artifacts/Informatieverzoek_Art217_1Maart2026.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Generated: " + outPath);
}

main().catch(console.error);
