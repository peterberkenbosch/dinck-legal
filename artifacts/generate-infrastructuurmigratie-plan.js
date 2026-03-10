const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        Footer, ImageRun } = require('docx');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '..', 'files', 'BERK-logo-hires.png');
const logoData = fs.readFileSync(logoPath);

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

function cell(text, width, opts = {}) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.header ? { fill: "E8E8E8", type: ShadingType.CLEAR }
           : opts.green ? { fill: "E8F5E9", type: ShadingType.CLEAR }
           : opts.yellow ? { fill: "FFF8E1", type: ShadingType.CLEAR }
           : opts.red ? { fill: "FFEBEE", type: ShadingType.CLEAR }
           : undefined,
    children: [new Paragraph({
      spacing: { before: 40, after: 40 },
      children: [new TextRun({ text, bold: opts.bold || opts.header, size: 20, font: "Arial" })]
    })]
  });
}

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
      font: "Arial",
      color: opts.color
    }));
  }
  return new Paragraph({
    spacing: { before: opts.spaceBefore || 100, after: opts.spaceAfter || 100 },
    alignment: opts.align,
    children
  });
}

function heading(text, level) {
  return new Paragraph({
    heading: level,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: level === HeadingLevel.HEADING_1 ? 26 : 22, font: "Arial" })]
  });
}

function sectionHeading(num, title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 150 },
    children: [new TextRun({ text: `${num}. ${title}`, bold: true, size: 24, font: "Arial" })]
  });
}

function sub(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 22, font: "Arial" })]
  });
}

function bullet(text, opts = {}) {
  const children = [];
  if (opts.boldPrefix) {
    children.push(new TextRun({ text: opts.boldPrefix, bold: true, size: 22, font: "Arial" }));
    children.push(new TextRun({ text, size: 22, font: "Arial" }));
  } else {
    children.push(new TextRun({ text: "\u2013  " + text, size: 22, font: "Arial" }));
  }
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    indent: { left: 720 },
    children
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
  sections: [
    // --- Cover page ---
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      children: [
        p("", { spaceBefore: 2400, spaceAfter: 0 }),
        p("", { spaceBefore: 2400, spaceAfter: 0 }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 600 },
          children: [
            new ImageRun({
              data: logoData,
              transformation: { width: 470, height: 147 },
              altText: { title: "Peter Berkenbosch Consultancy", description: "Company logo" }
            })
          ]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 100 },
          children: [new TextRun({ text: "INFRASTRUCTUURMIGRATIE", bold: true, size: 32, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 100 },
          children: [new TextRun({ text: "ACCOUNT- EN DIENSTENOVERZICHT", bold: true, size: 32, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 600 },
          children: [new TextRun({ text: "Platform app.dinck.nl", size: 26, font: "Arial", color: "444444" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 100 },
          children: [new TextRun({ text: "10 maart 2026", size: 22, font: "Arial", color: "666666" })]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 800, after: 60 },
          children: [new TextRun({ text: "Opgesteld door:", size: 20, font: "Arial", color: "888888" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 60, after: 60 },
          children: [new TextRun({ text: "Peter Berkenbosch Consultancy B.V.", bold: true, size: 28, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 60 },
          children: [new TextRun({ text: "Ten behoeve van:", size: 20, font: "Arial", color: "888888" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 60, after: 100 },
          children: [new TextRun({ text: "Dinck B.V.", bold: true, size: 28, font: "Arial" })]
        }),
      ]
    },
    // --- Document body ---
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              spacing: { before: 100 },
              border: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } },
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Peter Berkenbosch Consultancy B.V.", bold: true, size: 14, font: "Arial", color: "555555" }),
                new TextRun({ text: " | KvK 75867435 | Martenskamp 14, 8431 LP Oosterwolde | info@peterberkenbosch.nl", size: 14, font: "Arial", color: "555555" })
              ]
            })
          ]
        })
      },
      children: [

      // =============================================
      // 1. Samenvatting
      // =============================================
      sectionHeading("1", "Samenvatting"),
      p("Dit document beschrijft de volledige overdracht van alle hosting-, infrastructuur- en domeinaccounts van Peters persoonlijke accounts naar accounts op naam van Dinck B.V. Het doel is een schone scheiding: Dinck betaalt alle providers rechtstreeks, zonder tussenkomst van Opdrachtnemer."),
      p(""),
      p("De overdracht omvat:"),
      bullet("Hosting en servers (Linode/Hatchbox \u2192 Hetzner)"),
      bullet("Opslag van ~3,9 TB aan data (Cloudflare R2 \u2192 Hetzner Object Storage)"),
      bullet("Broncode (GitHub Teams Peter \u2192 GitHub Free dinckbv-organisatie)"),
      bullet("DNS (Cloudflare Peter \u2192 Cloudflare Dinck)"),
      bullet("Domeinnamen (DNSimple \u2192 Strato)"),
      bullet("E-mailverzending (MailPace \u2192 nieuw account op naam Dinck)"),
      bullet("Bewaking (AppSignal \u2192 nieuw account op naam Dinck)"),
      p(""),
      p("Na voltooiing bespaart Dinck ~\u20AC95/maand (~\u20AC1.150/jaar). De migratie wordt verricht zonder aanvullende kosten conform Art. 4.5 van de KTLO-overeenkomst."),

      separator(),

      // =============================================
      // 2. Huidige situatie — alle accounts
      // =============================================
      sectionHeading("2", "Huidige situatie - alle accounts"),
      p("Onderstaand een volledig overzicht van alle diensten die momenteel op naam van Peter staan en die overgedragen worden aan Dinck B.V."),

      sub("A. Hosting en infrastructuur"),
      p(""),
      new Table({
        columnWidths: [2800, 2200, 1800, 2560],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Dienst", 2800, { header: true }),
            cell("Leverancier", 2200, { header: true }),
            cell("Account", 1800, { header: true }),
            cell("Maandkosten", 2560, { header: true })
          ]}),
          new TableRow({ children: [
            cell("Applicatiehosting (3 servers)", 2800),
            cell("Hatchbox.io", 2200),
            cell("Peter", 1800),
            cell("$30,00", 2560)
          ]}),
          new TableRow({ children: [
            cell("Servers (lb01, web01, db01)", 2800),
            cell("Linode/Akamai", 2200),
            cell("Peter", 1800),
            cell("$41,00", 2560)
          ]}),
          new TableRow({ children: [
            cell("Totaal hosting", 2800, { bold: true }),
            cell("", 2200),
            cell("", 1800),
            cell("$71,00/mnd (~\u20AC65)", 2560, { bold: true })
          ]})
        ]
      }),

      sub("B. Opslag"),
      p(""),
      new Table({
        columnWidths: [2800, 2200, 1800, 2560],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Bucket", 2800, { header: true }),
            cell("Omvang", 2200, { header: true }),
            cell("Categorie", 1800, { header: true }),
            cell("Maandkosten", 2560, { header: true })
          ]}),
          new TableRow({ children: [
            cell("dinck (Active Storage uploads)", 2800),
            cell("229 GB", 2200),
            cell("Applicatie", 1800),
            cell("", 2560)
          ]}),
          new TableRow({ children: [
            cell("dinck-database-backups", 2800),
            cell("77 MB", 2200),
            cell("Back-ups", 1800),
            cell("", 2560)
          ]}),
          new TableRow({ children: [
            cell("dinck-google-drive-backup", 2800),
            cell("3,68 TB", 2200),
            cell("Videoarchief", 1800),
            cell("", 2560)
          ]}),
          new TableRow({ children: [
            cell("Totaal opslag (~3,9 TB)", 2800, { bold: true }),
            cell("Cloudflare R2", 2200),
            cell("Peter", 1800),
            cell("~$58,65/mnd (~\u20AC54)", 2560, { bold: true })
          ]})
        ]
      }),
      p("Tarief Cloudflare R2: $0,015/GB/maand, 10 GB gratis. Egress (uitgaand verkeer) is gratis.", { italic: true, size: 20 }),

      sub("C. Broncode"),
      p(""),
      new Table({
        columnWidths: [2800, 2200, 1800, 2560],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Repository", 2800, { header: true }),
            cell("Platform", 2200, { header: true }),
            cell("Account", 1800, { header: true }),
            cell("Maandkosten", 2560, { header: true })
          ]}),
          new TableRow({ children: [
            cell("dinckweb (Rails monolith)", 2800),
            cell("GitHub Teams", 2200),
            cell("Peter", 1800),
            cell("$4,00/user/mnd (~\u20AC3,70)", 2560)
          ]})
        ]
      }),
      p("De dinckbv-organisatie op GitHub bestaat al en bevat de native-appcode.", { italic: true, size: 20 }),

      sub("D. Domeinnamen"),
      p(""),
      new Table({
        columnWidths: [1800, 2000, 2000, 1800, 1760],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Domein", 1800, { header: true }),
            cell("Registrar", 2000, { header: true }),
            cell("Kosten/jaar", 2000, { header: true }),
            cell("Na migratie", 1800, { header: true }),
            cell("Kosten/jaar", 1760, { header: true })
          ]}),
          new TableRow({ children: [
            cell("dinck.nl", 1800),
            cell("DNSimple (Peter)", 2000),
            cell("$12,30", 2000),
            cell("Strato (Dinck)", 1800),
            cell("\u20AC7,20", 1760)
          ]}),
          new TableRow({ children: [
            cell("dinck.app", 1800),
            cell("DNSimple (Peter)", 2000),
            cell("$22,50", 2000),
            cell("Strato (Dinck)", 1800),
            cell("\u20AC21,00", 1760)
          ]}),
          new TableRow({ children: [
            cell("dinck.be", 1800),
            cell("DNSimple (Peter)", 2000),
            cell("$14,80", 2000),
            cell("Strato (Dinck)", 1800),
            cell("\u20AC6,00", 1760)
          ]}),
          new TableRow({ children: [
            cell("dinckly.nl", 1800),
            cell("DNSimple (Peter)", 2000),
            cell("$12,30", 2000),
            cell("Strato (Dinck)", 1800),
            cell("\u20AC7,20", 1760)
          ]}),
          new TableRow({ children: [
            cell("dinckly.app", 1800),
            cell("DNSimple (Peter)", 2000),
            cell("$22,50", 2000),
            cell("Strato (Dinck)", 1800),
            cell("\u20AC21,00", 1760)
          ]}),
          new TableRow({ children: [
            cell("Totaal", 1800, { bold: true }),
            cell("", 2000),
            cell("$84,40 (~\u20AC78)", 2000, { bold: true }),
            cell("", 1800),
            cell("\u20AC62,40", 1760, { bold: true })
          ]})
        ]
      }),
      p("dinck-staging.nl staat al op naam van Dinck bij Strato. Strato-prijzen incl. btw, vanaf het tweede jaar.", { italic: true, size: 20 }),

      sub("E. DNS"),
      p(""),
      new Table({
        columnWidths: [2800, 2200, 2200, 2160],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Zone", 2800, { header: true }),
            cell("Huidig account", 2200, { header: true }),
            cell("Na migratie", 2200, { header: true }),
            cell("Kosten", 2160, { header: true })
          ]}),
          new TableRow({ children: [
            cell("dinck.nl", 2800),
            cell("Cloudflare (Peter)", 2200),
            cell("Cloudflare (Dinck)", 2200),
            cell("\u20AC0 (gratis plan)", 2160)
          ]})
        ]
      }),
      p("Dinck heeft al een Cloudflare-account (gratis plan, DNS voor dinck-staging.nl).", { italic: true, size: 20 }),

      sub("F. E-mailverzending en bewaking"),
      p(""),
      new Table({
        columnWidths: [2800, 2200, 2200, 2160],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Dienst", 2800, { header: true }),
            cell("Leverancier", 2200, { header: true }),
            cell("Kosten", 2200, { header: true }),
            cell("Status", 2160, { header: true })
          ]}),
          new TableRow({ children: [
            cell("E-mailverzending (transactioneel)", 2800),
            cell("MailPace", 2200),
            cell("\u20AC36/jaar (~\u20AC3/mnd)", 2200),
            cell("Nieuw account nodig", 2160)
          ]}),
          new TableRow({ children: [
            cell("Bewaking + foutregistratie", 2800),
            cell("AppSignal", 2200),
            cell("\u20AC0 (gratis plan)", 2200),
            cell("Nieuw account nodig", 2160)
          ]})
        ]
      }),

      separator(),

      // =============================================
      // 3. Betaalmethoden Dinck B.V. — status
      // =============================================
      sectionHeading("3", "Betaalmethoden Dinck B.V. - status"),
      p("Overzicht van alle leveranciers en de status van de betaalmethode op naam van Dinck:"),
      p(""),
      new Table({
        columnWidths: [2200, 2400, 2200, 2560],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Leverancier", 2200, { header: true }),
            cell("Betaalmethode", 2400, { header: true }),
            cell("Status", 2200, { header: true }),
            cell("Toelichting", 2560, { header: true })
          ]}),
          new TableRow({ children: [
            cell("Hetzner", 2200),
            cell("Automatische incasso", 2400),
            cell("\u2705 Actief", 2200, { green: true }),
            cell("Server + opslag", 2560)
          ]}),
          new TableRow({ children: [
            cell("Strato", 2200),
            cell("Automatische incasso", 2400),
            cell("\u2705 Actief", 2200, { green: true }),
            cell("dinck-staging.nl reeds actief", 2560)
          ]}),
          new TableRow({ children: [
            cell("Cloudflare", 2200),
            cell("Creditcard", 2400),
            cell("\u26A0\uFE0F Creditcard toevoegen", 2200, { yellow: true }),
            cell("Account bestaat, creditcard ontbreekt", 2560)
          ]}),
          new TableRow({ children: [
            cell("GitHub", 2200),
            cell("Creditcard", 2400),
            cell("\u2705 Niet nodig", 2200, { green: true }),
            cell("GitHub Free is voldoende", 2560)
          ]}),
          new TableRow({ children: [
            cell("MailPace", 2200),
            cell("Creditcard", 2400),
            cell("\u26A0\uFE0F Creditcard toevoegen", 2200, { yellow: true }),
            cell("Peter regelt account, creditcard nodig", 2560)
          ]})
        ]
      }),
      p(""),
      p("Actie Dinck: creditcard toevoegen aan het Cloudflare-account en aan MailPace. Peter maakt de logins aan en stuurt de inloggegevens.", { bold: true }),

      separator(),

      // =============================================
      // 4. Doelsituatie na migratie
      // =============================================
      sectionHeading("4", "Doelsituatie na migratie"),
      p("Na voltooiing van de migratie betaalt Dinck alle providers rechtstreeks. De infrastructuur wordt geconsolideerd bij drie leveranciers: Hetzner (server + opslag), Strato (domeinnamen) en GitHub (broncode). Cloudflare en AppSignal zijn gratis."),
      p(""),

      sub("Kostenvergelijking"),
      p(""),
      new Table({
        columnWidths: [2800, 2200, 2200, 2160],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Component", 2800, { header: true }),
            cell("Huidig (Peter betaalt)", 2200, { header: true }),
            cell("Nieuw (Dinck betaalt)", 2200, { header: true }),
            cell("Verschil", 2160, { header: true })
          ]}),
          new TableRow({ children: [
            cell("Deployment", 2800),
            cell("Hatchbox $30/mnd", 2200),
            cell("Kamal (gratis)", 2200),
            cell("\u2013\u20AC28", 2160)
          ]}),
          new TableRow({ children: [
            cell("Servers", 2800),
            cell("Linode 3\u00D7 VPS $41/mnd", 2200),
            cell("Hetzner CX32 \u20AC7,49", 2200),
            cell("\u2013\u20AC30", 2160)
          ]}),
          new TableRow({ children: [
            cell("Serverback-ups", 2800),
            cell("-", 2200),
            cell("Hetzner \u20AC1,50", 2200),
            cell("+\u20AC1,50", 2160)
          ]}),
          new TableRow({ children: [
            cell("Opslag (~3,9 TB)", 2800),
            cell("Cloudflare R2 ~$59/mnd", 2200),
            cell("Hetzner ~\u20AC19/mnd", 2200),
            cell("\u2013\u20AC35", 2160)
          ]}),
          new TableRow({ children: [
            cell("Broncode", 2800),
            cell("GitHub Team $4/mnd", 2200),
            cell("GitHub Free", 2200),
            cell("\u2013\u20AC3,70", 2160)
          ]}),
          new TableRow({ children: [
            cell("Domeinnamen", 2800),
            cell("DNSimple ~\u20AC6,50/mnd", 2200),
            cell("Strato ~\u20AC5,20/mnd", 2200),
            cell("\u2013\u20AC1,30", 2160)
          ]}),
          new TableRow({ children: [
            cell("DNS", 2800),
            cell("Cloudflare \u20AC0", 2200),
            cell("Cloudflare \u20AC0", 2200),
            cell("\u20AC0", 2160)
          ]}),
          new TableRow({ children: [
            cell("E-mail (MailPace)", 2800),
            cell("\u20AC3/mnd", 2200),
            cell("\u20AC3/mnd", 2200),
            cell("\u20AC0", 2160)
          ]}),
          new TableRow({ children: [
            cell("Bewaking (AppSignal)", 2800),
            cell("\u20AC0", 2200),
            cell("\u20AC0", 2200),
            cell("\u20AC0", 2160)
          ]}),
          new TableRow({ children: [
            cell("Totaal", 2800, { bold: true }),
            cell("~\u20AC132/maand", 2200, { bold: true }),
            cell("~\u20AC36/maand", 2200, { bold: true }),
            cell("\u2013\u20AC96/maand", 2160, { bold: true })
          ]})
        ]
      }),

      p(""),
      p("Besparing: ~\u20AC96/maand (~\u20AC1.150/jaar)", { bold: true }),
      p(""),
      p("De besparing komt voort uit vier wijzigingen:", { italic: true }),
      bullet("Hatchbox \u2192 Kamal: ~\u20AC28/maand vervalt volledig (Kamal is gratis, open-source)"),
      bullet("Linode 3\u00D7 VPS \u2192 Hetzner CX32: van ~\u20AC38 naar \u20AC7,49/maand"),
      bullet("Cloudflare R2 \u2192 Hetzner Object Storage: van ~\u20AC54 naar ~\u20AC19/maand"),
      bullet("GitHub Team \u2192 Free + domeinen bij Strato: ~\u20AC5/maand besparing"),

      separator(),

      // =============================================
      // 5. Doelarchitectuur
      // =============================================
      sectionHeading("5", "Doelarchitectuur"),
      p("De huidige drie Linode-servers worden geconsolideerd naar \u00E9\u00E9n Hetzner-server. Het deploymentplatform Hatchbox ($30/maand) wordt vervangen door Kamal (gratis, open-source, ontwikkeld door 37signals/Ruby on Rails)."),
      p(""),

      sub("Serverspecificatie"),
      p(""),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ children: [
            cell("Type", 3000, { bold: true }),
            cell("Hetzner CX32 (gedeeld)", 6360)
          ]}),
          new TableRow({ children: [
            cell("Processoren", 3000, { bold: true }),
            cell("4 vCPU", 6360)
          ]}),
          new TableRow({ children: [
            cell("Geheugen", 3000, { bold: true }),
            cell("8 GB RAM", 6360)
          ]}),
          new TableRow({ children: [
            cell("Opslag", 3000, { bold: true }),
            cell("80 GB NVMe", 6360)
          ]}),
          new TableRow({ children: [
            cell("Bandbreedte", 3000, { bold: true }),
            cell("20 TB/maand", 6360)
          ]}),
          new TableRow({ children: [
            cell("Locatie", 3000, { bold: true }),
            cell("Falkenstein of Nuremberg (Duitsland)", 6360)
          ]}),
          new TableRow({ children: [
            cell("Back-ups", 3000, { bold: true }),
            cell("Geautomatiseerd, dagelijks, 7 dagen bewaard", 6360)
          ]}),
          new TableRow({ children: [
            cell("Maandkosten", 3000, { bold: true }),
            cell("\u20AC7,49 + \u20AC1,50 (back-ups) = \u20AC8,99", 6360)
          ]})
        ]
      }),

      p(""),
      p("Het Platform verwerkt minder dan 50.000 verzoeken per maand. E\u00E9n CX32-server draait de volledige applicatie (Rails, PostgreSQL, Elasticsearch, Redis) comfortabel. Bij groei: opschalen naar CX42 (8 vCPU, 16 GB, \u20AC14,49/maand) is direct mogelijk.", { italic: true, size: 20 }),

      sub("Opslagspecificatie"),
      p(""),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ children: [
            cell("Type", 3000, { bold: true }),
            cell("Hetzner Object Storage (S3-compatibel)", 6360)
          ]}),
          new TableRow({ children: [
            cell("Locatie", 3000, { bold: true }),
            cell("Zelfde datacenter als server (Duitsland)", 6360)
          ]}),
          new TableRow({ children: [
            cell("Omvang", 3000, { bold: true }),
            cell("~3,9 TB (uploads + back-ups + videoarchief)", 6360)
          ]}),
          new TableRow({ children: [
            cell("Basispakket", 3000, { bold: true }),
            cell("\u20AC4,99/maand (1 TB opslag + 1 TB egress inbegrepen)", 6360)
          ]}),
          new TableRow({ children: [
            cell("Extra opslag", 3000, { bold: true }),
            cell("\u20AC4,89/TB/maand", 6360)
          ]}),
          new TableRow({ children: [
            cell("Maandkosten", 3000, { bold: true }),
            cell("~\u20AC19/maand", 6360)
          ]})
        ]
      }),

      separator(),

      // =============================================
      // 6. Migratiefasen
      // =============================================
      sectionHeading("6", "Migratiefasen"),
      p("De migratie verloopt in zes fasen. De geschatte totale inspanning is 14\u201317 uur, verspreid over 2\u20133 weken (vanwege wachttijden bij datatransfer en domeinverhuizing)."),
      p(""),
      new Table({
        columnWidths: [600, 3200, 1800, 1800, 1960],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Fase", 600, { header: true }),
            cell("Omschrijving", 3200, { header: true }),
            cell("Actieve uren", 1800, { header: true }),
            cell("Wachttijd", 1800, { header: true }),
            cell("Afhankelijkheid", 1960, { header: true })
          ]}),
          new TableRow({ children: [
            cell("0", 600),
            cell("Voorbereiding + inventarisatie", 3200),
            cell("2 uur", 1800),
            cell("-", 1800),
            cell("Creditcards (zie \u00A77)", 1960)
          ]}),
          new TableRow({ children: [
            cell("1", 600),
            cell("Hetzner-server + Kamal opzetten", 3200),
            cell("3\u20134 uur", 1800),
            cell("-", 1800),
            cell("Fase 0", 1960)
          ]}),
          new TableRow({ children: [
            cell("2", 600),
            cell("GitHub-repository overdragen", 3200),
            cell("1 uur", 1800),
            cell("-", 1800),
            cell("dinckbv org", 1960)
          ]}),
          new TableRow({ children: [
            cell("3", 600),
            cell("Opslag R2 \u2192 Hetzner (~3,9 TB)", 3200),
            cell("2\u20133 uur", 1800),
            cell("3\u20135 dagen", 1800),
            cell("Hetzner-account", 1960)
          ]}),
          new TableRow({ children: [
            cell("4", 600),
            cell("Databasemigratie + DNS-omschakeling", 3200),
            cell("3\u20134 uur", 1800),
            cell("~35 min onbeschikbaarheid", 1800),
            cell("Fase 1\u20133", 1960)
          ]}),
          new TableRow({ children: [
            cell("5", 600),
            cell("Domeinmigratie DNSimple \u2192 Strato", 3200),
            cell("2 uur", 1800),
            cell("5\u20137 dagen", 1800),
            cell("Fase 4", 1960)
          ]}),
          new TableRow({ children: [
            cell("6", 600),
            cell("Opruimen oude infrastructuur", 3200),
            cell("1 uur", 1800),
            cell("-", 1800),
            cell("7 dagen stabiel", 1960)
          ]}),
          new TableRow({ children: [
            cell("", 600),
            cell("Totaal", 3200, { bold: true }),
            cell("14\u201317 uur", 1800, { bold: true }),
            cell("", 1800),
            cell("", 1960)
          ]})
        ]
      }),
      p(""),
      p("De omschakeling (Fase 4) vindt plaats buiten werktijden (zondagavond). Geschatte onbeschikbaarheid: ~35 minuten. Alle overige fasen verlopen zonder onbeschikbaarheid."),
      p(""),
      p("Terugvalplan: bij problemen na omschakeling wordt DNS binnen 60 seconden teruggewezen naar de oude servers (Linode). De oude servers blijven 7 dagen actief als vangnet.", { italic: true, size: 20 }),

      separator(),

      // =============================================
      // 7. Actie Dinck B.V.
      // =============================================
      sectionHeading("7", "Actie Dinck B.V."),
      p("De volgende acties zijn nodig om de migratie te starten:"),
      p(""),
      p("Creditcard toevoegen aan het Cloudflare-account en aan MailPace.", { bold: true }),
      p(""),
      p("Peter maakt de logins aan en stuurt de inloggegevens. Douwine hoeft alleen een creditcard toe te voegen via de respectievelijke dashboards."),
      p(""),
      p("Alle overige accounts en betaalmethoden zijn al geregeld:"),
      bullet("Hetzner - automatische incasso actief"),
      bullet("Strato - automatische incasso actief"),
      bullet("GitHub - dinckbv-organisatie bestaat, gratis plan voldoende"),
      bullet("MailPace - Peter regelt account, creditcard nodig"),
      bullet("AppSignal - Peter regelt nieuw account"),

      separator(),

      // =============================================
      // 8. Grondslag
      // =============================================
      sectionHeading("8", "Grondslag"),
      p("Dit document dient als onderbouwing bij Art. 4.5 van de KTLO-overeenkomst van 10 maart 2026. Na voltooiing van de migratie fungeert het tevens als de infrastructuurdocumentatie zoals bedoeld in dat artikel."),
      p(""),
      p("Na migratie vervallen de artikelen 4.2 (Doorbelasting), 4.3 (Betalingstermijn) en 4.4 (Specificatie op factuur). Dinck betaalt alle providers rechtstreeks."),
      p(""),
      p("De migratie wordt eenmalig verricht zonder aanvullende kosten."),

    ]
  }]
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outPath = "/home/peter/dinck-legal/artifacts/Infrastructuurmigratie_Accountoverzicht_Dinck_BV.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Generated: " + outPath);
}

main().catch(console.error);
