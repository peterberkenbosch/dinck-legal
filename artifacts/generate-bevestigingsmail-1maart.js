const { Document, Packer, Paragraph, TextRun, BorderStyle } = require('docx');
const fs = require('fs');

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.spaceBefore || 100, after: opts.spaceAfter || 100 },
    alignment: opts.align,
    children: [new TextRun({
      text,
      bold: opts.bold,
      italics: opts.italic,
      size: opts.size || 22,
      font: "Arial"
    })]
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
      p("Aan de Algemene Vergadering van Aandeelhouders van Dinck B.V.", { bold: true }),
      p("Van Emstweg 85"),
      p("8426 BT Appelscha (fr)"),
      p(""),

      // Horizontale lijn
      new Paragraph({
        spacing: { before: 100, after: 200 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 } },
        children: []
      }),

      // Onderwerp
      p("Betreft: Bevestiging aftreden als bestuurder Dinck B.V. per 1 maart 2026", { bold: true }),
      p(""),

      // Aanhef
      p("Geachte leden van de Algemene Vergadering van Aandeelhouders,"),
      p(""),

      // Body
      p("Hierbij bevestig ik dat PHBX Holding B.V. per heden, 1 maart 2026, is afgetreden als bestuurder van Dinck B.V., conform mijn ontslagbrief d.d. 30 januari 2026."),
      p(""),
      p("De uitschrijving bij de Kamer van Koophandel is vandaag ingediend en digitaal ondertekend. Het wijzigingsformulier treft u bijgaand aan."),
      p(""),
      p("Mijn positie als aandeelhouder van Dinck B.V. (33,3%) blijft ongewijzigd."),
      p(""),

      // Afsluiting
      p("Met vriendelijke groet,"),
      p(""),
      p(""),
      p("Peter Berkenbosch"),
      p("Namens PHBX Holding B.V."),

      // Bijlage
      p(""),
      new Paragraph({
        spacing: { before: 200, after: 100 },
        border: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 } },
        children: []
      }),
      p("Bijlage: KvK-wijzigingsformulier (ref. 93428359-20260301-O001)", { size: 20, italic: true }),
    ]
  }]
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outPath = "/home/peter/dinck-legal/artifacts/Bevestiging_Aftreden_Bestuurder_1Maart2026.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Generated: " + outPath);
}

main().catch(console.error);
