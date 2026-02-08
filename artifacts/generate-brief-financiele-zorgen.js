const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

function cell(text, width, opts = {}) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.header ? { fill: "E8E8E8", type: ShadingType.CLEAR } : undefined,
    children: [new Paragraph({
      spacing: { before: 40, after: 40 },
      children: [new TextRun({ text, bold: opts.bold || opts.header, size: 20, font: "Arial" })]
    })]
  });
}

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

function heading(text, level) {
  return new Paragraph({
    heading: level,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: level === HeadingLevel.HEADING_1 ? 26 : 22, font: "Arial" })]
  });
}

function bullet(text, opts = {}) {
  const children = [];
  if (opts.boldPrefix) {
    children.push(new TextRun({ text: opts.boldPrefix, bold: true, size: 22, font: "Arial" }));
    children.push(new TextRun({ text, size: 22, font: "Arial" }));
  } else {
    children.push(new TextRun({ text: "–  " + text, size: 22, font: "Arial" }));
  }
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    indent: { left: 720 },
    children
  });
}

function numberedItem(num, text) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    indent: { left: 720, hanging: 360 },
    children: [new TextRun({ text: `${num}.  ${text}`, size: 22, font: "Arial" })]
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { size: 26, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 300, after: 150 } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        run: { size: 22, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 } } }
    ]
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
      p("Oosterwolde, 8 februari 2026"),
      p(""),

      // Geadresseerde
      p("Aan de Algemene Vergadering van Aandeelhouders van Dinck B.V.", { bold: true }),
      p("Van Emstweg 85"),
      p("8426 BT Appelscha (fr)"),
      p(""),
      p("Kopie aan:", { bold: true, size: 20 }),
      p("–  Douwine Koopman (mede-bestuurder Dinck B.V.)", { size: 20 }),
      p("–  Marlou Woltmeijer (aandeelhouder Dinck B.V.)", { size: 20 }),
      p(""),

      // Horizontale lijn simuleren
      new Paragraph({
        spacing: { before: 100, after: 200 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 } },
        children: []
      }),

      // Aanhef
      p("Geachte aandeelhouders,"),
      p(""),
      p("Als bestuurder van Dinck B.V. namens PHBX Holding B.V. wend ik mij tot u om mijn zorgen te uiten over de financiële positie en continuïteit van de vennootschap. Ik acht het mijn verantwoordelijkheid als bestuurder om de navolgende risico's schriftelijk onder uw aandacht te brengen."),

      // 1. Schuldpositie
      heading("1. Schuldpositie Dinck B.V.", HeadingLevel.HEADING_1),
      p("Op basis van de mij bekende gegevens per 31 januari 2026 bedraagt de schuldpositie van Dinck B.V. aan Freca B.V.:"),
      p(""),
      new Table({
        columnWidths: [6000, 3360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Post", 6000, { header: true }),
            cell("Bedrag", 3360, { header: true })
          ]}),
          new TableRow({ children: [
            cell("Rekening-courant (leningsovereenkomst)", 6000),
            cell("€402.458", 3360)
          ]}),
          new TableRow({ children: [
            cell("Managementvergoeding Freca B.V. (apr-nov 2024)", 6000),
            cell("€64.000", 3360)
          ]}),
          new TableRow({ children: [
            cell("Totaal verschuldigd aan Freca B.V.", 6000, { bold: true }),
            cell("€466.458", 3360, { bold: true })
          ]})
        ]
      }),
      p(""),
      p("Het addendum op de overeenkomst van geldlening d.d. 31 december 2024 stelt de maximale hoofdsom vast op €500.000. De resterende marge bedraagt derhalve €33.542."),
      p("Ik constateer dat door de jaarlijkse rente van 5% over het uitstaande bedrag (geschat ~€23.000 per jaar) deze limiet naar verwachting in de loop van 2026 zal worden bereikt of overschreden, zonder dat er nieuwe opnames plaatsvinden."),

      // 2. Naderende eerste aflossing
      heading("2. Naderende eerste aflossing", HeadingLevel.HEADING_1),
      p("Op grond van het addendum d.d. 31 december 2024 is de eerste aflossing verschuldigd op 28 maart 2026. Het verschuldigde bedrag bedraagt 1/9e van het uitstaande bedrag, vermeerderd met 5% rente. Op basis van het huidige saldo komt dit neer op een geschat bedrag van €55.000 tot €75.000."),
      p("De huidige jaaromzet (ARR) van Dinck B.V. bedraagt circa €6.400. De vennootschap beschikt niet over voldoende operationele kasstromen om deze aflossing te voldoen."),

      // 3. Stopzetting operationele financiering
      heading("3. Stopzetting operationele financiering", HeadingLevel.HEADING_1),
      p("Op 7 februari 2026 heeft mede-bestuurder Douwine Koopman per e-mail medegedeeld dat de financiering van Dinck B.V. met onmiddellijke ingang wordt beëindigd, wegens een tegenslag binnen haar eigen onderneming."),
      p("Ik constateer het volgende:"),
      bullet("Dinck B.V. heeft werknemers in dienst wier salarissen tot op heden werden gefinancierd uit stortingen van Voor Dag en Dou B.V. op de bankrekening van Dinck, geboekt op de rekening-courant van Freca B.V."),
      bullet("De eigen operationele kasstromen van Dinck B.V. zijn ontoereikend om deze salarisverplichtingen te voldoen."),
      bullet("De stopzetting van deze financiering heeft directe gevolgen voor de mogelijkheid van Dinck B.V. om aan haar verplichtingen als werkgever te voldoen."),
      p("Als bestuurder acht ik het mijn plicht deze situatie te signaleren. De vennootschap dient haar werkgeversverplichtingen na te komen en ik verzoek om op korte termijn duidelijkheid over hoe dit wordt geborgd."),

      // 4. Informatieverzoek mede-bestuurder
      heading("4. Informatieverzoek mede-bestuurder", HeadingLevel.HEADING_1),
      p("In dezelfde e-mail wordt melding gemaakt van gesprekken met een \"externe partij\" over een \"mogelijke samenwerking\", die komende dinsdag zouden plaatsvinden. Als mede-bestuurder van Dinck B.V. ben ik hierover niet vooraf geïnformeerd en niet betrokken bij de voorbereiding van deze gesprekken."),
      p("Ik verzoek om als mede-bestuurder te worden geïnformeerd over:"),
      bullet("de identiteit van de externe partij;"),
      bullet("de aard en reikwijdte van de beoogde samenwerking;"),
      bullet("eventuele voorwaarden of toezeggingen die in dit kader worden besproken."),
      p("Ik wijs erop dat besluiten over samenwerkingen, herstructureringen of overdracht van bedrijfsactiviteiten de betrokkenheid van het voltallige bestuur en — waar nodig — de goedkeuring van de algemene vergadering vereisen."),

      // 5. Juridische gevolgen bij niet-betaling aflossing
      heading("5. Juridische gevolgen bij niet-betaling aflossing", HeadingLevel.HEADING_1),
      p("Ik wijs op de volgende bepalingen uit de overeenkomst van geldlening:"),
      p(""),
      new Paragraph({
        spacing: { before: 60, after: 60 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "Artikel 11.2: ", bold: true, size: 22, font: "Arial" }),
          new TextRun({ text: "Partijen zijn in verzuim door het enkele verloop van een bepaalde termijn, zonder dat op de wederpartij enige verplichting tot ingebrekestelling rust. Dit houdt in dat bij het niet-betalen op 28 maart 2026 automatisch verzuim intreedt.", size: 22, font: "Arial" })
        ]
      }),
      p(""),
      new Paragraph({
        spacing: { before: 60, after: 60 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "Artikel 7.1 sub a en b: ", bold: true, size: 22, font: "Arial" }),
          new TextRun({ text: "Bij niet-nakoming van verplichtingen of verzuim van rente- of aflossingsverplichtingen is de volledige lening direct en zonder waarschuwing opeisbaar.", size: 22, font: "Arial" })
        ]
      }),
      p(""),
      p("Het risico dat de volledige schuld aan Freca B.V. in één keer opeisbaar wordt, brengt een reëel continuïteitsrisico voor de vennootschap met zich mee."),

      // 6. Tegenstrijdig belang
      heading("6. Tegenstrijdig belang", HeadingLevel.HEADING_1),
      p("Ik breng onder uw aandacht dat bij besluitvorming over deze kwesties sprake is van een tegenstrijdig belang in de zin van artikel 2:239 lid 6 BW:"),
      bullet("De schuldeiser (Freca B.V.) en de partij die de operationele financiering verzorgt (Voor Dag en Dou B.V.) worden bestuurd door dezelfde persoon die tevens mede-bestuurder is van de schuldenaar (Dinck B.V.)."),
      bullet("Het besluit om de financiering van Dinck B.V. per direct te beëindigen is genomen in de hoedanigheid van bestuurder van de financierende entiteiten, terwijl diezelfde persoon als bestuurder van Dinck B.V. het belang van de vennootschap dient te behartigen."),
      p("Ik verzoek de aandeelhouders hiermee rekening te houden bij de besluitvorming."),

      // 7. Verzoek
      heading("7. Verzoek", HeadingLevel.HEADING_1),
      p("Gelet op het voorgaande verzoek ik het bestuur en de aandeelhouders om:"),
      numberedItem(1, "Op korte termijn kenbaar te maken hoe de salarisverplichtingen jegens de werknemers van Dinck B.V. worden geborgd;"),
      numberedItem(2, "Kenbaar te maken welke maatregelen worden overwogen om de aflossing van 28 maart 2026 te voldoen, dan wel om uitstel met Freca B.V. overeen te komen;"),
      numberedItem(3, "Aan te geven hoe wordt voorkomen dat de limiet van €500.000 wordt overschreden door accumulatie van rente;"),
      numberedItem(4, "Mij als mede-bestuurder te informeren over de gesprekken met de externe partij en mij hierbij te betrekken;"),
      numberedItem(5, "Schriftelijk op dit schrijven te reageren vóór 1 maart 2026."),

      // 8. Afsluiting
      heading("8. Afsluiting", HeadingLevel.HEADING_1),
      p("Ik schrijf deze brief vanuit mijn verantwoordelijkheid als bestuurder van Dinck B.V. en in het belang van de vennootschap en haar werknemers. Ik merk op dat ik deze risico's reeds had geïdentificeerd vóór de mededeling van 7 februari 2026. Ik acht het van belang dat de situatie op korte termijn wordt besproken en verzoek om dit te agenderen voor het overleg van woensdag 11 februari."),
      p(""),
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
  const outPath = "/home/peter/dinck-legal/artifacts/Brief_Financiele_Zorgen_Dinck_BV.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Generated: " + outPath);
}

main().catch(console.error);
