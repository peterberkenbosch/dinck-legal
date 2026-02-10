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

function pMulti(runs, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.spaceBefore || 100, after: opts.spaceAfter || 100 },
    children: runs.map(r => new TextRun({
      text: r.text,
      bold: r.bold,
      italics: r.italic,
      size: r.size || 22,
      font: "Arial"
    }))
  });
}

function hr() {
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
      p("Oosterwolde, 10 februari 2026"),
      p(""),

      // Geadresseerde
      p("Aan de mede-bestuurder en aandeelhouders van Dinck B.V.", { bold: true }),
      p("Van Emstweg 85"),
      p("8426 BT Appelscha (fr)"),
      p(""),
      p("Kopie aan:", { bold: true, size: 20 }),
      p("–  Marlou Woltmeijer (aandeelhouder Dinck B.V.)", { size: 20 }),
      p(""),

      hr(),

      // Aanhef
      p("Geachte Douwine,"),
      p(""),

      // Paragraaf 1
      pMulti([
        { text: "In mijn brief van 8 februari 2026 (" },
        { text: "\"Signalering financiële risico's en continuïteit Dinck B.V.\"", italic: true },
        { text: ") heb ik onder sectie 4 verzocht om als mede-bestuurder te worden geïnformeerd over de gesprekken met de externe partij die je in je e-mail van 6 februari hebt aangekondigd. Concreet heb ik verzocht om informatie over de identiteit van de externe partij, de aard en reikwijdte van de beoogde samenwerking, en eventuele voorwaarden of toezeggingen die in dit kader worden besproken." }
      ]),
      p(""),

      // Paragraaf 2
      p("De door jou aangekondigde gesprekken waren gepland op dinsdag 10 februari 2026 \u2014 vandaag. Ik constateer dat ik tot op heden geen enkele informatie heb ontvangen naar aanleiding van mijn verzoek. Ook je bevestigingsmail van 9 februari bevat geen inhoudelijke reactie op de in mijn brief gesignaleerde punten."),
      p(""),

      // Paragraaf 3
      p("Als mede-bestuurder van Dinck B.V. heb ik op grond van het collegialiteitsbeginsel (artikel 2:9 BW) het recht om volledig geïnformeerd te worden over aangelegenheden die de vennootschap raken, in het bijzonder wanneer het gesprekken betreft over mogelijke samenwerkingen of participaties door derden. Ik kan geen verantwoordelijkheid dragen voor beslissingen waarover ik niet ben geïnformeerd en waarbij ik niet ben betrokken."),
      p(""),

      // Paragraaf 4
      p("Ik breng dit onder je aandacht voorafgaand aan het overleg van morgen, woensdag 11 februari. Ik verwacht in dat overleg alsnog te worden geïnformeerd over bovengenoemde punten."),
      p(""),

      // Ondertekening
      p("Met vriendelijke groet,"),
      p(""),
      p(""),
      p("Peter Berkenbosch"),
      p("Namens PHBX Holding B.V."),
      p("Bestuurder Dinck B.V."),
    ]
  }]
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outPath = "/home/peter/dinck-legal/artifacts/Constatering_Informatierecht_10Feb.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Generated: " + outPath);
}

main().catch(console.error);
