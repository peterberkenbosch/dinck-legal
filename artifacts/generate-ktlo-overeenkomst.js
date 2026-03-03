const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        Header, Footer, ImageRun } = require('docx');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '..', 'files', 'BERK-logo-FINAL.png');
const logoData = fs.readFileSync(logoPath);

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

function articleHeading(num, title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 150 },
    children: [new TextRun({ text: `Artikel ${num} — ${title}`, bold: true, size: 24, font: "Arial" })]
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
    children.push(new TextRun({ text: "–  " + text, size: 22, font: "Arial" }));
  }
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    indent: { left: 720 },
    children
  });
}

function labeledPara(label, text) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
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
        margin: { top: 2160, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new ImageRun({
                data: logoData,
                transformation: { width: 180, height: 140 },
                altText: { title: "Peter Berkenbosch Consultancy", description: "Company logo" }
              })
            ]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            spacing: { before: 100 },
            border: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Peter Berkenbosch Consultancy B.V.", bold: true, size: 16, font: "Arial", color: "555555" }),
              new TextRun({ text: "  |  KvK 75867435  |  Martenskamp 14, 8431 LP Oosterwolde  |  info@peterberkenbosch.nl", size: 16, font: "Arial", color: "555555" })
            ]
          })
        ]
      })
    },
    children: [
      // Titel
      new Paragraph({
        spacing: { before: 200, after: 100 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "OVEREENKOMST VAN DIENSTVERLENING", bold: true, size: 28, font: "Arial" })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 300 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "KTLO Platform app.dinck.nl", bold: true, size: 24, font: "Arial" })]
      }),

      separator(),

      // Partijen
      heading("Partijen", HeadingLevel.HEADING_1),
      p(""),

      sub("1. Opdrachtnemer"),
      p(""),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ children: [
            cell("Naam", 3000, { bold: true }),
            cell("Peter Berkenbosch Consultancy B.V.", 6360)
          ]}),
          new TableRow({ children: [
            cell("KvK", 3000, { bold: true }),
            cell("75867435", 6360)
          ]}),
          new TableRow({ children: [
            cell("Vestigingsplaats", 3000, { bold: true }),
            cell("Oosterwolde", 6360)
          ]}),
          new TableRow({ children: [
            cell("Adres", 3000, { bold: true }),
            cell("Martenskamp 14, 8431 LP Oosterwolde", 6360)
          ]}),
          new TableRow({ children: [
            cell("Vertegenwoordigd door", 3000, { bold: true }),
            cell("Peter Berkenbosch, directeur", 6360)
          ]}),
          new TableRow({ children: [
            cell("E-mail", 3000, { bold: true }),
            cell("info@peterberkenbosch.nl", 6360)
          ]})
        ]
      }),
      p("Hierna te noemen: Opdrachtnemer", { italic: true }),
      p(""),

      sub("2. Opdrachtgever"),
      p(""),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ children: [
            cell("Naam", 3000, { bold: true }),
            cell("Dinck B.V.", 6360)
          ]}),
          new TableRow({ children: [
            cell("KvK", 3000, { bold: true }),
            cell("93428359", 6360)
          ]}),
          new TableRow({ children: [
            cell("Vestigingsplaats", 3000, { bold: true }),
            cell("Appelscha", 6360)
          ]}),
          new TableRow({ children: [
            cell("Vertegenwoordigd door", 3000, { bold: true }),
            cell("Douwine Koopman, bestuurder", 6360)
          ]}),
          new TableRow({ children: [
            cell("E-mail", 3000, { bold: true }),
            cell("douwine@dinck.nl", 6360)
          ]})
        ]
      }),
      p("Hierna te noemen: Opdrachtgever", { italic: true }),
      p(""),
      p("Opdrachtnemer en Opdrachtgever hierna gezamenlijk aangeduid als Partijen en ieder afzonderlijk als Partij."),

      separator(),

      // Overwegingen
      heading("Overwegingen", HeadingLevel.HEADING_1),
      p(""),
      labeledPara("A.", "Opdrachtgever exploiteert een softwareplatform voor kinderopvangorganisaties, bereikbaar via app.dinck.nl (het Platform)."),
      labeledPara("B.", "Het Platform is ontwikkeld door Peter Berkenbosch en draait op infrastructuur die wordt beheerd door Opdrachtnemer."),
      labeledPara("C.", "PHBX Holding B.V. is aandeelhouder van Opdrachtgever en houdt 33,3% van de aandelen. Peter Berkenbosch is bestuurder van zowel Opdrachtnemer als PHBX Holding B.V."),
      labeledPara("D.", "Peter Berkenbosch is per 1 maart 2026 afgetreden als bestuurder van Opdrachtgever."),
      labeledPara("E.", "Tijdens de bijeenkomst van 11 februari 2026 ten kantore van Van der Meer Accountants & Consultants te Oosterwolde, in aanwezigheid van onder meer Douwine Koopman, Marlou Woltmeijer, Grady Hofstra en Klaas de Vries, zijn Partijen overeengekomen dat Peter Berkenbosch uitsluitend KTLO-werkzaamheden zal verrichten voor het Platform."),
      labeledPara("F.", "Partijen wensen de voorwaarden van deze KTLO-dienstverlening schriftelijk vast te leggen (Keep The Lights On / KTLO)."),
      labeledPara("G.", "Deze overeenkomst betreft een zuivere commerciële dienstverlening en staat los van de aandeelhoudersrelatie tussen PHBX Holding B.V. en Opdrachtgever."),

      separator(),

      // Artikel 1 — Definities
      articleHeading(1, "Definities"),
      p("In deze overeenkomst wordt verstaan onder:"),
      p(""),
      labeledPara("1.1 Platform:", "Het softwareplatform van Opdrachtgever, bereikbaar via app.dinck.nl, inclusief de onderliggende servers, databases en infrastructuur."),
      labeledPara("1.2 Diensten:", "De in Artikel 2 omschreven KTLO-werkzaamheden."),
      labeledPara("1.3 Hostingkosten:", "De in Artikel 4 gespecificeerde kosten voor servers, opslag en overige infrastructuur benodigd voor het operationeel houden van het Platform."),
      labeledPara("1.4 Kritieke bug:", "Een softwarefout waardoor: (a) het Platform volledig onbereikbaar is; of (b) data verlies of corruptie optreedt; of (c) een security-kwetsbaarheid actief wordt misbruikt; of (d) incorrecte financiële transacties plaatsvinden."),
      labeledPara("1.5 Security patch:", "Een update ter verhelping van een beveiligingskwetsbaarheid met een CVE-score van 7.0 of hoger (high/critical), of een direct exploiteerbare kwetsbaarheid in een core dependency."),
      labeledPara("1.6 Werkzaamheden buiten scope:", "Alle werkzaamheden die niet vallen onder de Diensten zoals omschreven in Artikel 2, en nader gespecificeerd in Artikel 3."),

      // Artikel 2 — Scope
      articleHeading(2, "Scope van de Diensten"),

      sub("2.1 Omvang"),
      p("De Diensten omvatten uitsluitend het volgende:"),
      p(""),
      p("(a) Monitoring", { bold: true }),
      bullet("Server monitoring en alerts"),
      bullet("Uptime bewaking"),
      bullet("Error tracking"),
      p(""),
      p("(b) Kritieke bugs", { bold: true }),
      bullet("Diagnose en herstel van Kritieke bugs zoals gedefinieerd in Artikel 1.4"),
      p(""),
      p("(c) Security patches", { bold: true }),
      bullet("Toepassen van Security patches zoals gedefinieerd in Artikel 1.5"),
      bullet("Updates van core dependencies bij kritieke kwetsbaarheden"),
      p(""),
      p("(d) Infrastructuur", { bold: true }),
      bullet("Backup verificatie"),
      bullet("SSL certificaat vernieuwing"),
      bullet("DNS beheer"),
      bullet("Standaard database onderhoud"),

      sub("2.2 Prioriteiten en responstijden"),
      p(""),
      new Table({
        columnWidths: [1800, 3200, 2080, 2280],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Prioriteit", 1800, { header: true }),
            cell("Omschrijving", 3200, { header: true }),
            cell("Reactietijd", 2080, { header: true }),
            cell("Oplostijd", 2280, { header: true })
          ]}),
          new TableRow({ children: [
            cell("P1 \u2014 Kritiek", 1800, { bold: true }),
            cell("Platform onbereikbaar, dataverlies, actief security-misbruik", 3200),
            cell("1 uur", 2080),
            cell("4 uur", 2280)
          ]}),
          new TableRow({ children: [
            cell("P2 \u2014 Hoog", 1800, { bold: true }),
            cell("Kritieke bug (Art. 1.4), ernstige functieverstoring", 3200),
            cell("4 uur", 2080),
            cell("8 uur", 2280)
          ]}),
          new TableRow({ children: [
            cell("P3 \u2014 Medium", 1800, { bold: true }),
            cell("Security patch (Art. 1.5), gedeeltelijke functieverstoring", 3200),
            cell("8 werkuren", 2080),
            cell("5 werkdagen", 2280)
          ]}),
          new TableRow({ children: [
            cell("P4 \u2014 Laag", 1800, { bold: true }),
            cell("Standaard onderhoud, certificaten, backup-verificatie", 3200),
            cell("2 werkdagen", 2080),
            cell("10 werkdagen", 2280)
          ]})
        ]
      }),
      p(""),
      p("Werktijden: maandag t/m vrijdag, 9:00-17:00 CET. Reactie- en oplostijden worden gemeten in werkuren respectievelijk werkdagen, tenzij anders vermeld. Meldingen buiten werktijden worden geacht te zijn ontvangen bij aanvang van de eerstvolgende werkdag."),
      p(""),
      p("De classificatie van prioriteit wordt bepaald door Opdrachtnemer."),

      sub("2.3 Maximale inzet"),
      p("De Diensten bedragen maximaal 1 uur per week gemiddeld over een kalendermaand. Opdrachtnemer is niet verplicht meer uren te besteden. Indien de Diensten structureel meer dan 1 uur per week vergen, is Artikel 5.3 van toepassing."),

      sub("2.4 Uitsluitingen"),
      p("De volgende werkzaamheden vallen uitdrukkelijk niet onder de Diensten:"),
      bullet("Eindgebruiker support, training of onboarding"),
      bullet("Nieuwe functionaliteit of feature requests"),
      bullet("Uitbreidingen van bestaande functionaliteit"),
      bullet("Integraties met externe systemen (inclusief maar niet beperkt tot SpiekR)"),
      bullet("Mobile applicaties (inclusief maar niet beperkt tot Dinckly iOS)"),
      bullet("UI/UX verbeteringen of design updates"),
      bullet("Performance optimalisatie (tenzij sprake van een Kritieke bug)"),
      bullet("Refactoring of architectuurverbeteringen"),
      bullet("Niet-kritieke bugs (cosmetische issues, minor usability problemen, edge cases)"),
      bullet("Documentatie updates"),
      bullet("Database optimalisatie (niet-kritiek)"),
      bullet("Caching implementaties"),
      p(""),
      p("Bij twijfel over de classificatie van een verzoek beslist Opdrachtnemer.", { italic: true }),

      // Artikel 3 — Buiten Scope
      articleHeading(3, "Werkzaamheden buiten scope"),
      labeledPara("3.1", "Werkzaamheden buiten scope worden uitsluitend verricht na voorafgaande schriftelijke offerte door Opdrachtnemer en schriftelijke goedkeuring door Opdrachtgever."),
      labeledPara("3.2", "Het uurtarief voor Werkzaamheden buiten scope bedraagt €125,00 exclusief BTW."),
      labeledPara("3.3", "Opdrachtnemer factureert Werkzaamheden buiten scope maandelijks achteraf op basis van bestede uren."),
      labeledPara("3.4", "Op Werkzaamheden buiten scope zijn de overige bepalingen van deze overeenkomst onverkort van toepassing, tenzij schriftelijk anders overeengekomen."),

      // Artikel 4 — Hostingkosten
      articleHeading(4, "Hostingkosten"),

      sub("4.1 Specificatie"),
      p("Het Platform draait op de volgende infrastructuur:"),
      p(""),
      new Table({
        columnWidths: [3500, 3000, 2860],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Component", 3500, { header: true }),
            cell("Leverancier", 3000, { header: true }),
            cell("Maandkosten", 2860, { header: true })
          ]}),
          new TableRow({ children: [
            cell("Applicatiehosting (3 servers)", 3500),
            cell("Hatchbox.io", 3000),
            cell("$30,00", 2860)
          ]}),
          new TableRow({ children: [
            cell("Servers (lb01, web01, db01)", 3500),
            cell("Linode/Akamai", 3000),
            cell("$41,00", 2860)
          ]}),
          new TableRow({ children: [
            cell("Object Storage (~3.229 GB)", 3500),
            cell("Cloudflare R2", 3000),
            cell("~$48,30", 2860)
          ]}),
          new TableRow({ children: [
            cell("Monitoring (free plan)", 3500),
            cell("AppSignal", 3000),
            cell("\u20AC0,00", 2860)
          ]}),
          new TableRow({ children: [
            cell("Totaal", 3500, { bold: true }),
            cell("", 3000),
            cell("~$119,30/mnd (~\u20AC110)", 2860, { bold: true })
          ]})
        ]
      }),

      sub("4.2 Doorbelasting"),
      p("Hostingkosten worden maandelijks door Opdrachtnemer aan Opdrachtgever gefactureerd tegen kostprijs, op basis van de werkelijke kosten van de onderliggende leveranciers."),

      sub("4.3 Betalingstermijn"),
      p("De betalingstermijn voor hostingfacturen bedraagt 14 dagen na factuurdatum."),

      sub("4.4 Specificatie op factuur"),
      p("Elke factuur bevat een specificatie van de individuele kostenposten en de onderliggende leveranciersfacturen worden op verzoek beschikbaar gesteld."),

      sub("4.5 Wijzigingen"),
      p("Indien de Hostingkosten met meer dan 20% stijgen ten opzichte van het voorgaande kwartaal (anders dan door een door Opdrachtgever verzochte uitbreiding), stelt Opdrachtnemer Opdrachtgever hiervan schriftelijk in kennis. Opdrachtgever kan binnen 14 dagen na kennisgeving bezwaar maken. Partijen treden in dat geval in overleg over alternatieve oplossingen."),

      // Artikel 5 — Vergoeding
      articleHeading(5, "Vergoeding"),

      sub("5.1 KTLO-diensten"),
      p("De Diensten zoals omschreven in Artikel 2 worden niet gefactureerd. Opdrachtnemer verricht deze werkzaamheden in het belang van het aandeelhouderschap van PHBX Holding B.V. in Opdrachtgever."),

      sub("5.2 Gefactureerde posten"),
      p("Opdrachtgever is uitsluitend verschuldigd:"),
      bullet("(a) de Hostingkosten op grond van Artikel 4; en"),
      bullet("(b) vergoedingen voor Werkzaamheden buiten scope op grond van Artikel 3."),

      sub("5.3 Herzieningsrecht"),
      p("Indien de Diensten gedurende drie opeenvolgende maanden structureel meer dan 1 uur per week vergen, heeft Opdrachtnemer het recht een redelijke vergoeding voor te stellen voor het meerdere. Partijen treden in dat geval in overleg. Komen Partijen niet tot overeenstemming binnen 30 dagen, dan is Opdrachtnemer gerechtigd de maximale inzet terug te brengen tot 1 uur per week of de overeenkomst op te zeggen met inachtneming van de opzegtermijn in Artikel 6.3."),

      // Artikel 6 — Duur en Beeindiging
      articleHeading(6, "Duur en Beeindiging"),

      sub("6.1 Ingangsdatum"),
      p("Deze overeenkomst treedt in werking op 1 maart 2026 en wordt aangegaan voor onbepaalde tijd."),

      sub("6.2 Koppeling aan aandeelhouderschap"),
      p("Deze overeenkomst is onlosmakelijk verbonden aan het aandeelhouderschap van PHBX Holding B.V. in Opdrachtgever. Bij overdracht van de aandelen van PHBX Holding B.V. in Opdrachtgever — om welke reden dan ook — eindigt deze overeenkomst van rechtswege op de datum van de aandelenoverdracht, zonder dat opzegging of ingebrekestelling is vereist."),

      sub("6.3 Opzegging"),
      p("Ieder der Partijen kan deze overeenkomst opzeggen met inachtneming van een opzegtermijn van 1 kalendermaand, per e-mail met ontvangstbevestiging."),

      sub("6.4 Opeisbaarheid bij beeindiging"),
      p("Bij beeindiging van deze overeenkomst — ongeacht de reden — worden alle openstaande facturen van Opdrachtnemer direct en volledig opeisbaar, zonder dat ingebrekestelling is vereist."),

      // Artikel 7 — Opschorting
      articleHeading(7, "Opschorting"),

      sub("7.1 Opschortingsrecht"),
      p("Indien Opdrachtgever enige betalingsverplichting uit deze overeenkomst niet tijdig nakomt, is Opdrachtnemer gerechtigd de Diensten met onmiddellijke ingang op te schorten, zonder voorafgaande ingebrekestelling."),

      sub("7.2 Geen aansprakelijkheid"),
      p("Opdrachtnemer is niet aansprakelijk voor schade die Opdrachtgever lijdt als gevolg van opschorting op grond van dit artikel, waaronder maar niet beperkt tot: downtime van het Platform, dataverlies, of gederfde inkomsten."),

      sub("7.3 Ontbinding"),
      p("Indien de betalingsachterstand voortduurt na 30 dagen na de datum van opschorting, is Opdrachtnemer gerechtigd de overeenkomst met onmiddellijke ingang te ontbinden door middel van een schriftelijke verklaring, onverminderd het recht op vergoeding van openstaande facturen en eventuele schade."),

      // Artikel 8 — IP
      articleHeading(8, "Intellectueel eigendom"),

      sub("8.1 Eigendom"),
      p("Alle intellectuele eigendomsrechten met betrekking tot het Platform, de broncode en de onderliggende technologie berusten bij Opdrachtgever."),

      sub("8.2 Geen overdracht door dienstverlening"),
      p("Door het verrichten van de Diensten vindt geen wijziging plaats in de bestaande eigendomsverhoudingen. Opdrachtnemer verkrijgt geen intellectuele eigendomsrechten op het Platform of enig onderdeel daarvan."),

      // Artikel 9 — Aansprakelijkheid
      articleHeading(9, "Aansprakelijkheid"),

      sub("9.1 Beperking"),
      p("De aansprakelijkheid van Opdrachtnemer voor schade voortvloeiend uit of verband houdend met de uitvoering van deze overeenkomst is beperkt tot gevallen van opzet of grove nalatigheid."),

      sub("9.2 Uitsluiting indirecte schade"),
      p("Opdrachtnemer is nimmer aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen, verlies van data of schade door bedrijfsstagnatie."),

      sub("9.3 Maximering"),
      p("Indien en voor zover Opdrachtnemer ondanks het bepaalde in dit artikel aansprakelijk is, is de totale aansprakelijkheid beperkt tot het bedrag dat door Opdrachtgever aan Opdrachtnemer is betaald in de 12 kalendermaanden voorafgaand aan de schadeveroorzakende gebeurtenis."),

      sub("9.4 Vervaltermijn"),
      p("Iedere vordering van Opdrachtgever op Opdrachtnemer vervalt 12 maanden na de datum waarop Opdrachtgever bekend werd of redelijkerwijs bekend had kunnen zijn met de schade."),

      // Artikel 10 — Communicatie
      articleHeading(10, "Communicatie"),

      sub("10.1 Contactgegevens"),
      p(""),
      new Table({
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Partij", 3000, { header: true }),
            cell("E-mail", 6360, { header: true })
          ]}),
          new TableRow({ children: [
            cell("Opdrachtnemer", 3000),
            cell("info@peterberkenbosch.nl", 6360)
          ]}),
          new TableRow({ children: [
            cell("Opdrachtgever", 3000),
            cell("douwine@dinck.nl", 6360)
          ]})
        ]
      }),

      sub("10.2 Escalatieprotocol"),
      p("Bij P1- en P2-incidenten stuurt Opdrachtgever een e-mail met als onderwerp: \"URGENT: [omschrijving probleem]\". Bij het uitblijven van een reactie binnen de in Artikel 2.2 genoemde reactietijden kan Opdrachtgever telefonisch contact opnemen."),

      // Artikel 11 — Geheimhouding
      articleHeading(11, "Geheimhouding"),

      sub("11.1 Verplichting"),
      p("Partijen verplichten zich over en weer tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van deze overeenkomst van de andere Partij ontvangen."),

      sub("11.2 Uitzondering adviseurs"),
      p("De geheimhoudingsverplichting geldt niet voor informatie die een Partij deelt met haar juridisch, fiscaal of financieel adviseurs, mits deze adviseurs aan een gelijkwaardige of strengere geheimhoudingsverplichting zijn gebonden."),

      sub("11.3 Wettelijke verplichting"),
      p("De geheimhoudingsverplichting geldt niet voor zover openbaarmaking wettelijk of door een rechterlijk bevel is vereist, mits de openbarende Partij de andere Partij hiervan onverwijld in kennis stelt."),

      sub("11.4 Duur"),
      p("De geheimhoudingsverplichting blijft van kracht gedurende de looptijd van deze overeenkomst en 2 jaar na beeindiging daarvan."),

      // Artikel 12 — Overige
      articleHeading(12, "Overige Bepalingen"),

      sub("12.1 Zelfstandigheid"),
      p("Opdrachtnemer verricht de Diensten als zelfstandig opdrachtnemer. Er is geen sprake van een arbeidsovereenkomst, dienstverband of gezagsverhouding. Opdrachtnemer bepaalt zelfstandig de wijze waarop en de tijdstippen waarop de Diensten worden verricht, binnen de kaders van de in Artikel 2.2 genoemde responstijden."),

      sub("12.2 Wijzigingen"),
      p("Wijzigingen van of aanvullingen op deze overeenkomst zijn uitsluitend geldig indien schriftelijk overeengekomen door beide Partijen."),

      sub("12.3 Overdracht"),
      p("Geen der Partijen is gerechtigd rechten of verplichtingen uit deze overeenkomst over te dragen aan derden zonder voorafgaande schriftelijke toestemming van de andere Partij."),

      sub("12.4 Nietigheid"),
      p("Indien enige bepaling van deze overeenkomst nietig of vernietigbaar blijkt, tast dit de geldigheid van de overige bepalingen niet aan. Partijen treden in dat geval in overleg om een vervangende bepaling overeen te komen die de strekking van de nietige bepaling zo dicht mogelijk benadert."),

      sub("12.5 Toepasselijk recht"),
      p("Op deze overeenkomst is Nederlands recht van toepassing."),

      sub("12.6 Geschillen"),
      p("Alle geschillen voortvloeiend uit of verband houdend met deze overeenkomst worden voorgelegd aan de bevoegde rechter te Leeuwarden."),

      separator(),

      // Ondertekening
      heading("Ondertekening", HeadingLevel.HEADING_1),
      p(""),
      p("Aldus overeengekomen en in tweevoud ondertekend op 1 maart 2026 te Oosterwolde."),
      p(""),
      p(""),
      new Table({
        columnWidths: [4680, 4680],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Opdrachtnemer", 4680, { header: true }),
            cell("Opdrachtgever", 4680, { header: true })
          ]}),
          new TableRow({ children: [
            cell("Peter Berkenbosch", 4680),
            cell("Douwine Koopman", 4680)
          ]}),
          new TableRow({ children: [
            cell("Directeur Peter Berkenbosch Consultancy B.V.", 4680),
            cell("Bestuurder Dinck B.V.", 4680)
          ]}),
          new TableRow({ children: [
            cell("", 4680),
            cell("", 4680)
          ]}),
          new TableRow({ children: [
            cell("Handtekening: _________________", 4680),
            cell("Handtekening: _________________", 4680)
          ]}),
          new TableRow({ children: [
            cell("Datum: _________________", 4680),
            cell("Datum: _________________", 4680)
          ]})
        ]
      })
    ]
  }]
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outPath = "/home/peter/dinck-legal/artifacts/KTLO_Overeenkomst_Dienstverlening.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Generated: " + outPath);
}

main().catch(console.error);
