const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

// Shared styles configuration
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
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 22, bold: true, color: "333333", font: "Arial" },
      paragraph: { spacing: { before: 150, after: 100 }, outlineLevel: 2 } }
  ]
};

const bulletConfig = {
  config: [
    { reference: "bullet-list",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "checkbox-list",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "☐", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
  ]
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };
const headerShading = { fill: "E8E8E8", type: ShadingType.CLEAR };

function createHeaderCell(text, width) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: headerShading,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20 })] })]
  });
}

function createCell(text, width) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({ children: [new TextRun({ text, size: 20 })] })]
  });
}

function createBoldCell(text, width) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20 })] })]
  });
}

// =====================
// OVERVIEW DOCUMENT (DUTCH)
// =====================
function generateOverviewDoc() {
  const children = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Overzicht Juridisch Adviesgesprek")] }),
    new Paragraph({ children: [new TextRun("Dinck B.V. Uittreding")] }),
    new Paragraph({ children: [] }),
    new Paragraph({ children: [new TextRun({ text: "Opgesteld voor: ", bold: true }), new TextRun("Juridisch adviesgesprek")] }),
    new Paragraph({ children: [new TextRun({ text: "Datum: ", bold: true }), new TextRun("4 februari 2026")] }),
    new Paragraph({ children: [new TextRun({ text: "Cliënt: ", bold: true }), new TextRun("Peter Berkenbosch / PHBX Holding B.V.")] }),
    new Paragraph({ children: [] }),

    // A. Samenvatting
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("A. Samenvatting")] }),
    new Paragraph({ children: [new TextRun("Peter Berkenbosch is via PHBX Holding B.V. een 33,3% aandeelhouder en medeoprichter van Dinck B.V., een SaaS-platform voor kinderopvangadministratie. Sinds de oprichting in maart 2024 wordt Peter systematisch buitengesloten van besluitvorming door Douwine Koopman. Douwine hield aanvankelijk via haar vennootschap Freca B.V. 66,7% van de aandelen, maar heeft deze in november 2025 overgedragen aan Marlou Woltmeijer (een stroman/werknemer). Hierdoor heeft Douwine momenteel geen aandeelhoudersstatus meer, maar blijft zij wel bestuurder en behoudt zij feitelijke controle via verschillende entiteiten (Freca B.V., Voor Dag en Dou B.V.). Na mislukte onderhandelingen over aandelenuitkoop en voortdurende uitsluiting heeft Peter op 30 januari 2026 zijn ontslag als bestuurder ingediend, met ingang van 1 maart 2026. Douwine en Marlou betwisten het ontslag, hoewel hun bezwaren juridisch ongegrond zijn aangezien ontslag als bestuurder een eenzijdige rechtshandeling is waarvoor geen instemming vereist is.")] }),
    new Paragraph({ children: [] }),

    // B. Uitgebreide Tijdlijn
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("B. Uitgebreide Tijdlijn")] }),
    new Table({
      columnWidths: [1800, 5400, 2160],
      rows: [
        new TableRow({ tableHeader: true, children: [
          createHeaderCell("Datum", 1800),
          createHeaderCell("Gebeurtenis", 5400),
          createHeaderCell("Categorie", 2160)
        ]}),
        new TableRow({ children: [createCell("28-03-2024", 1800), createCell("Dinck B.V. opgericht; SHA getekend tussen PHBX Holding en Freca B.V.", 5400), createCell("Oprichting", 2160)] }),
        new TableRow({ children: [createCell("Apr-Dec 2024", 1800), createCell("Peter: ~1.440 uur fulltime platformontwikkeling", 5400), createCell("Werk", 2160)] }),
        new TableRow({ children: [createCell("30-11-2024", 1800), createCell("AVA: Managementvergoeding op nul gezet (uitdrukkelijk als tijdelijke maatregel) - geantedateerd document, opgesteld na aankondiging 19 dec", 5400), createCell("Financieel", 2160)] }),
        new TableRow({ children: [createCell("19-12-2024", 1800), createCell("Meeting: Douwine stopt management fee PHBX; bevestigingsmail 15:00", 5400), createCell("Incident #3", 2160)] }),
        new TableRow({ children: [createCell("Jan-Dec 2025", 1800), createCell("Peter: ~1.200 uur parttime (~20-30 uur/week) ontwikkeling", 5400), createCell("Werk", 2160)] }),
        new TableRow({ children: [createCell("Sep 2025", 1800), createCell("Jaarrekening en prognoses opgesteld zonder Peter's betrokkenheid", 5400), createCell("Incident #2", 2160)] }),
        new TableRow({ children: [createCell("22-09-2025", 1800), createCell("Peter ontvangt jaarrekening van accountant Klaas, niet van Douwine", 5400), createCell("Incident #2", 2160)] }),
        new TableRow({ children: [createCell("22-09-2025", 1800), createCell("Peter dient schriftelijk bezwaar in over uitsluiting van financiële beslissingen", 5400), createCell("Incident #2", 2160)] }),
        new TableRow({ children: [createCell("29-09-2025", 1800), createCell("Peter geeft voorwaardelijke goedkeuring na verlate telefonische consultatie", 5400), createCell("Financieel", 2160)] }),
        new TableRow({ children: [createCell("Okt-Nov 2025", 1800), createCell("Geheime aandelenoverdracht geregeld om Douwine's privéhypotheek te faciliteren", 5400), createCell("Incident #1", 2160)] }),
        new TableRow({ children: [createCell("02-11-2025", 1800), createCell("Douwine benadert Peter via WhatsApp pas na notarisinterventie", 5400), createCell("Incident #1", 2160)] }),
        new TableRow({ children: [createCell("07-11-2025", 1800), createCell("Freca verkoopt 8 aandelen aan Marlou Woltmeijer voor €1,00 (stroman)", 5400), createCell("Eigendom", 2160)] }),
        new TableRow({ children: [createCell("05-12-2025", 1800), createCell("Peter stuurt eerste uittredingsvoorstel: €40K uitkoop + opdrachtgeverschap", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("09-12-2025", 1800), createCell("Douwine wijkt uit, noemt 'juridisch onderzoek', stelt januari-gesprekken voor", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("10-12-2025", 1800), createCell("Peter stemt in met januari voor aandelen, vraagt KTLO-bevestiging voor kerst", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("14-12-2025", 1800), createCell("Douwine wijst €40K af, claimt €190K 'schuld' voor 1/3 van BV-schulden", 5400), createCell("Incident #4", 2160)] }),
        new TableRow({ children: [createCell("14-12-2025", 1800), createCell("Douwine beschuldigt Peter van 'chantage' voor het stellen van grenzen", 5400), createCell("Incident #6", 2160)] }),
        new TableRow({ children: [createCell("14-12-2025", 1800), createCell("Douwine plant eenzijdig vergadering 17 december met Grady Hofstra", 5400), createCell("Incident #5", 2160)] }),
        new TableRow({ children: [createCell("15-12-2025", 1800), createCell("Peter de-escaleert, wijst niet-neutrale mediator af, stelt januari-vergadering voor", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("17-12-2025", 1800), createCell("Douwine accepteert januari-vergadering, de-escalatie bereikt", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("07-01-2026", 1800), createCell("Peter ontdekt Jaimie's 50% ontslag via teamvergadering (verborgen beslissing)", 5400), createCell("Incident #7", 2160)] }),
        new TableRow({ children: [createCell("07-01-2026", 1800), createCell("Douwine stuurt verlate excuses voor niet informeren Peter", 5400), createCell("Incident #7", 2160)] }),
        new TableRow({ children: [createCell("08-01-2026", 1800), createCell("Peter vraagt vergaderdata aan Douwine en Grady", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("12-01-2026", 1800), createCell("Douwine eist 'concrete onderwerpen en standpunten' vooraf", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("13-01-2026", 1800), createCell("Peter geeft gedetailleerde 5-punts positieverklaring", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("13-01-2026", 1800), createCell("Peter stelt do 15 jan of vr 16 jan om 9:00 voor", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("20-01-2026", 1800), createCell("Peter stuurt follow-up na week stilte", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("20-01-2026", 1800), createCell("Gepland werkoverleg: Douwine verschijnt niet", 5400), createCell("Incident #8", 2160)] }),
        new TableRow({ children: [createCell("22-01-2026", 1800), createCell("Douwine erkent vertraging, belooft vergaderdata te sturen", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("22-01-2026", 1800), createCell("Peter bevestigt ontvangst, wacht op data", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createCell("23-29 jan 2026", 1800), createCell("Geen reactie van Douwine; beloofde data nooit verstuurd", 5400), createCell("Onderhandeling", 2160)] }),
        new TableRow({ children: [createBoldCell("30-01-2026", 1800), createBoldCell("ONTSLAGBRIEF VERZONDEN - ingaand 1 maart 2026", 5400), createBoldCell("Uittreding", 2160)] }),
        new TableRow({ children: [createCell("01-02-2026", 1800), createCell("Douwine reageert: wijst ontslagdatum af, verhulde aansprakelijkheidsdreigingen", 5400), createCell("Reactie", 2160)] }),
        new TableRow({ children: [createCell("01-02-2026", 1800), createCell("Douwine claimt 'afspraak 22 januari' (feitelijk onjuist)", 5400), createCell("Reactie", 2160)] }),
        new TableRow({ children: [createCell("01-02-2026", 1800), createCell("Douwine claimt te handelen als 'aandeelhouder' (feitelijk onjuist)", 5400), createCell("Reactie", 2160)] }),
        new TableRow({ children: [createCell("02-02-2026", 1800), createCell("Peter verduidelijkt: ontslag is eenzijdig, ingaand 1 maart", 5400), createCell("Reactie", 2160)] }),
        new TableRow({ children: [createCell("02-02-2026", 1800), createCell("Peter voegt Marlou toe aan CC (werkelijke aandeelhouder)", 5400), createCell("Reactie", 2160)] }),
        new TableRow({ children: [createBoldCell("01-03-2026", 1800), createBoldCell("Ingangsdatum ontslag als bestuurder", 5400), createBoldCell("In afwachting", 2160)] }),
      ]
    }),
    new Paragraph({ children: [] }),

    // C. Overzicht Partijen
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("C. Overzicht Partijen")] }),
    new Table({
      columnWidths: [3000, 3000, 3360],
      rows: [
        new TableRow({ tableHeader: true, children: [
          createHeaderCell("Partij", 3000),
          createHeaderCell("Rol", 3000),
          createHeaderCell("Juridische Status", 3360)
        ]}),
        new TableRow({ children: [createBoldCell("Peter Berkenbosch / PHBX Holding B.V.", 3000), createCell("Oprichter, 33,3% aandeelhouder, (voormalig) bestuurder", 3000), createCell("Neemt ontslag als bestuurder per 1 maart 2026; behoudt aandeelhoudersstatus", 3360)] }),
        new TableRow({ children: [createBoldCell("Marlou Woltmeijer", 3000), createCell("66,7% aandeelhouder sinds 7 november 2025", 3000), createCell("GEEN partij bij SHA; aandelen verkregen voor €1; werknemer van Douwine", 3360)] }),
        new TableRow({ children: [createBoldCell("Douwine Koopman", 3000), createCell("Bestuurder Dinck, feitelijk bestuurder", 3000), createCell("GEEN aandeelhoudersstatus (verkocht via Freca); controleert via diverse entiteiten", 3360)] }),
        new TableRow({ children: [createBoldCell("Freca B.V.", 3000), createCell("Voormalig 66,7% aandeelhouder, schuldeiser (€425K RC + €64K mgmt fee)", 3000), createCell("Eigendom van Douwine; geen aandeelhouder meer; partij bij vervallen SHA", 3360)] }),
        new TableRow({ children: [createBoldCell("Voor Dag en Dou B.V.", 3000), createCell("Schuldeiser (€145K personeelskosten 2024)", 3000), createCell("Eigendom van Douwine; kinderopvangbedrijf", 3360)] }),
        new TableRow({ children: [createBoldCell("Dinck B.V.", 3000), createCell("De vennootschap", 3000), createCell("€570K schuld aan Douwine's entiteiten; €6,2K ARR; Peter heeft platform gebouwd", 3360)] }),
        new TableRow({ children: [createBoldCell("Grady Hofstra", 3000), createCell("Adviseur van Douwine", 3000), createCell("Voormalig accountant van Peter; geen neutrale partij", 3360)] }),
      ]
    }),
    new Paragraph({ children: [] }),

    // D. Huidige Status
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("D. Huidige Status (per 4 februari 2026)")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Ontslag")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Brief verzonden: ", bold: true }), new TextRun("30 januari 2026")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Ingangsdatum: ", bold: true }), new TextRun("1 maart 2026")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Juridische aard: ", bold: true }), new TextRun("Eenzijdige rechtshandeling - geen instemming vereist")] }),

    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Standpunt Andere Partij")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Douwine/Marlou: Betwisten ontslagdatum")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Hun bezwaren zijn juridisch ongegrond")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Claimen 'afspraak 22 januari' die nooit heeft bestaan")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Maken vage aansprakelijkheidsdreigingen zonder juridische grondslag")] }),

    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("SHA Status")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("SHA tussen PHBX Holding en Freca B.V. is vervallen")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Marlou heeft nooit toetredingsovereenkomst getekend")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("SHA-bepalingen (inclusief non-concurrentiebeding Art. 7) niet afdwingbaar tegen huidige aandeelhouder")] }),

    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Statutaire Bescherming (Art. 8.6 lid 2 Statuten)")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Unanimiteitsvereiste: ", bold: true }), new TextRun("Alle AVA-besluiten vereisen unanieme instemming")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Peter heeft effectief "), new TextRun({ text: "vetorecht", bold: true }), new TextRun(" over alle aandeelhoudersbesluiten")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Kan niet gedwongen worden ongunstige besluiten te accepteren")] }),

    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Aandelenonderhandelingen")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Status: ", bold: true }), new TextRun("Vastgelopen")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Peters voorstel: ", bold: true }), new TextRun("€40K uitkoop")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Douwine's standpunt: ", bold: true }), new TextRun("Claimt aandelen waardeloos; beweert valselijk €190K persoonlijke schuld")] }),

    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Platformonderhoud (KTLO)")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Peter gaat vrijwillig door (geen formele overeenkomst)")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Maandelijkse infrastructuurkosten ~€150 betaald door Peter")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Geen commitment aan ontwikkelwerk zonder opdrachtovereenkomst")] }),

    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Financieel Overzicht")] }),
    new Table({
      columnWidths: [5000, 4360],
      rows: [
        new TableRow({ tableHeader: true, children: [createHeaderCell("Post", 5000), createHeaderCell("Bedrag", 4360)] }),
        new TableRow({ children: [createCell("Schuld vennootschap (aan Douwine's entiteiten)", 5000), createCell("€570.895", 4360)] }),
        new TableRow({ children: [createCell("Jaarlijks terugkerende omzet (ARR)", 5000), createCell("€6.230", 4360)] }),
        new TableRow({ children: [createCell("Peters geïnvesteerde uren (totaal)", 5000), createCell("~2.600", 4360)] }),
        new TableRow({ children: [createCell("Platformvervangingswaarde", 5000), createCell("€150K-200K", 4360)] }),
        new TableRow({ children: [createCell("Peters arbeidsmarktwaarde", 5000), createCell("€195K-220K", 4360)] }),
      ]
    }),
    new Paragraph({ children: [] }),

    // E. Overzicht E-mailcorrespondentie
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("E. Overzicht E-mailcorrespondentie")] }),
    new Paragraph({ children: [new TextRun({ text: "(Samenvatting met data; printouts afzonderlijk toe te voegen)", italics: true })] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("December 2025")] }),
    new Table({
      columnWidths: [1800, 2500, 5060],
      rows: [
        new TableRow({ tableHeader: true, children: [createHeaderCell("Datum", 1800), createHeaderCell("Van → Naar", 2500), createHeaderCell("Onderwerp/Inhoud", 5060)] }),
        new TableRow({ children: [createCell("05-12-2025", 1800), createCell("Peter → Douwine", 2500), createCell("Eerste uittredingsvoorstel (€40K + opdrachtgeverschap)", 5060)] }),
        new TableRow({ children: [createCell("09-12-2025", 1800), createCell("Douwine → Peter", 2500), createCell("Wijkt uit, noemt juridisch onderzoek, januari-gesprekken", 5060)] }),
        new TableRow({ children: [createCell("10-12-2025", 1800), createCell("Peter → Douwine", 2500), createCell("Stemt in met januari voor aandelen, vraagt KTLO-bevestiging", 5060)] }),
        new TableRow({ children: [createCell("14-12-2025", 1800), createCell("Douwine → Peter", 2500), createCell("Wijst €40K af, claimt €190K schuld, 'chantage'-beschuldiging", 5060)] }),
        new TableRow({ children: [createCell("15-12-2025", 1800), createCell("Peter → Douwine", 2500), createCell("De-escalatie, wijst niet-neutrale mediator af", 5060)] }),
        new TableRow({ children: [createCell("17-12-2025", 1800), createCell("Douwine → Peter", 2500), createCell("Accepteert januari-vergadering", 5060)] }),
      ]
    }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Januari 2026")] }),
    new Table({
      columnWidths: [1800, 2500, 5060],
      rows: [
        new TableRow({ tableHeader: true, children: [createHeaderCell("Datum", 1800), createHeaderCell("Van → Naar", 2500), createHeaderCell("Onderwerp/Inhoud", 5060)] }),
        new TableRow({ children: [createCell("08-01-2026", 1800), createCell("Peter → Douwine, Grady", 2500), createCell("Vraagt vergaderdata", 5060)] }),
        new TableRow({ children: [createCell("12-01-2026", 1800), createCell("Douwine → Peter", 2500), createCell("Eist onderwerpen vooraf", 5060)] }),
        new TableRow({ children: [createCell("13-01-2026", 1800), createCell("Peter → Douwine", 2500), createCell("5-punts positie, stelt 15/16 jan voor", 5060)] }),
        new TableRow({ children: [createCell("20-01-2026", 1800), createCell("Peter → Douwine, Grady", 2500), createCell("Follow-up na stilte, stelt 23 jan voor", 5060)] }),
        new TableRow({ children: [createCell("22-01-2026", 1800), createCell("Douwine → Peter", 2500), createCell("Erkent vertraging, belooft data (nooit verstuurd)", 5060)] }),
        new TableRow({ children: [createCell("22-01-2026", 1800), createCell("Peter → Douwine", 2500), createCell("Bevestigt, wacht op data", 5060)] }),
        new TableRow({ children: [createBoldCell("30-01-2026", 1800), createBoldCell("Peter → Douwine", 2500), createBoldCell("ONTSLAGBRIEF", 5060)] }),
      ]
    }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Februari 2026")] }),
    new Table({
      columnWidths: [1800, 3500, 4060],
      rows: [
        new TableRow({ tableHeader: true, children: [createHeaderCell("Datum", 1800), createHeaderCell("Van → Naar", 3500), createHeaderCell("Onderwerp/Inhoud", 4060)] }),
        new TableRow({ children: [createCell("01-02-2026", 1800), createCell("Douwine → Peter (CC: Grady, Marlou)", 3500), createCell("Wijst datum af, aansprakelijkheidsdreigingen, onjuiste claims", 4060)] }),
        new TableRow({ children: [createCell("02-02-2026", 1800), createCell("Peter → Douwine (CC: Marlou)", 3500), createCell("Verduidelijkt eenzijdige aard, corrigeert onjuiste claims", 4060)] }),
      ]
    }),
    new Paragraph({ children: [] }),

    // F. Acht Gedocumenteerde Incidenten
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("F. Acht Gedocumenteerde Incidenten")] }),
    new Table({
      columnWidths: [500, 1500, 2000, 5360],
      rows: [
        new TableRow({ tableHeader: true, children: [createHeaderCell("#", 500), createHeaderCell("Datum", 1500), createHeaderCell("Categorie", 2000), createHeaderCell("Beschrijving", 5360)] }),
        new TableRow({ children: [createCell("1", 500), createCell("Okt-Nov 2025", 1500), createCell("Aandeelhouderszaken", 2000), createCell("Geheime aandelenoverdracht geregeld; Peter pas geïnformeerd na notarisinterventie", 5360)] }),
        new TableRow({ children: [createCell("2", 500), createCell("Sep 2025", 1500), createCell("Financiële besluitvorming", 2000), createCell("Jaarrekening en prognoses opgesteld zonder Peter; ontvangen van accountant, niet Douwine", 5360)] }),
        new TableRow({ children: [createCell("3", 500), createCell("19-12-2024", 1500), createCell("Financiële beslissingen", 2000), createCell("Managementvergoeding stopgezet na meeting; AVA-besluit was uitdrukkelijk tijdelijk", 5360)] }),
        new TableRow({ children: [createCell("4", 500), createCell("14-12-2025", 1500), createCell("Financiële claims", 2000), createCell("Valse claim: PHBX is €190K schuldig (1/3 van BV-schuld); juridisch ongegrond", 5360)] }),
        new TableRow({ children: [createCell("5", 500), createCell("14-12-2025", 1500), createCell("Communicatie", 2000), createCell("Eenzijdig vergadering gepland met niet-neutrale 'mediator'", 5360)] }),
        new TableRow({ children: [createCell("6", 500), createCell("14-12-2025", 1500), createCell("Communicatie", 2000), createCell("Beschuldiging van 'chantage' voor het stellen van grenzen", 5360)] }),
        new TableRow({ children: [createCell("7", 500), createCell("07-01-2026", 1500), createCell("Personeelszaken", 2000), createCell("Jaimie's 50% ontslag verzwegen; ontdekt via teamvergadering", 5360)] }),
        new TableRow({ children: [createCell("8", 500), createCell("20-01-2026", 1500), createCell("Operationeel", 2000), createCell("Niet verschijnen bij gepland werkoverleg", 5360)] }),
      ]
    }),
    new Paragraph({ children: [] }),

    // G. Belangrijke Juridische Documenten
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("G. Belangrijke Juridische Documenten")] }),
    new Table({
      columnWidths: [3500, 1800, 2000, 2060],
      rows: [
        new TableRow({ tableHeader: true, children: [createHeaderCell("Document", 3500), createHeaderCell("Datum", 1800), createHeaderCell("Status", 2000), createHeaderCell("Locatie", 2060)] }),
        new TableRow({ children: [createCell("SHA (Aandeelhoudersovereenkomst)", 3500), createCell("28-03-2024", 1800), createCell("Vervallen (Marlou geen partij)", 2000), createCell("In dossier", 2060)] }),
        new TableRow({ children: [createCell("Statuten Dinck B.V.", 3500), createCell("28-03-2024", 1800), createCell("Actief", 2000), createCell("In dossier", 2060)] }),
        new TableRow({ children: [createCell("Notariële akte aandelenoverdracht", 3500), createCell("07-11-2025", 1800), createCell("Actief", 2000), createCell("In dossier", 2060)] }),
        new TableRow({ children: [createCell("Ontslagbrief", 3500), createCell("30-01-2026", 1800), createCell("Verzonden", 2000), createCell("In dossier", 2060)] }),
        new TableRow({ children: [createCell("Peters verduidelijkingsreactie", 3500), createCell("02-02-2026", 1800), createCell("Verzonden", 2000), createCell("In dossier", 2060)] }),
      ]
    }),
    new Paragraph({ children: [] }),

    // H. Vervolgstappen
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("H. Vervolgstappen")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Voor 1 maart 2026")] }),
    new Paragraph({ numbering: { reference: "checkbox-list", level: 0 }, children: [new TextRun("Juridisch adviesgesprek (dit document)")] }),
    new Paragraph({ numbering: { reference: "checkbox-list", level: 0 }, children: [new TextRun("KvK-uittreksel bewaren als bewijs")] }),
    new Paragraph({ numbering: { reference: "checkbox-list", level: 0 }, children: [new TextRun("KvK-uitschrijving voorbereiden (formulier 17a)")] }),
    new Paragraph({ numbering: { reference: "checkbox-list", level: 0 }, children: [new TextRun("KTLO-scope documenteren indien nodig")] }),

    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Op/Na 1 maart 2026")] }),
    new Paragraph({ numbering: { reference: "checkbox-list", level: 0 }, children: [new TextRun("KvK-uitschrijving indienen")] }),
    new Paragraph({ numbering: { reference: "checkbox-list", level: 0 }, children: [new TextRun("Bevestigen niet langer bestuurder")] }),
    new Paragraph({ numbering: { reference: "checkbox-list", level: 0 }, children: [new TextRun("Art. 2:217 BW informatierechten uitoefenen")] }),
    new Paragraph({ numbering: { reference: "checkbox-list", level: 0 }, children: [new TextRun("Infrastructuurkosten factureren aan Dinck")] }),
    new Paragraph({ numbering: { reference: "checkbox-list", level: 0 }, children: [new TextRun("Juridische opties beoordelen als onderhandelingen vastgelopen blijven")] }),
  ];

  return new Document({
    styles: docStyles,
    numbering: bulletConfig,
    sections: [{
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children
    }]
  });
}

// =====================
// QUESTIONS DOCUMENT (DUTCH)
// =====================
function generateQuestionsDoc() {
  const children = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Vragen Juridisch Adviesgesprek")] }),
    new Paragraph({ children: [new TextRun("Dinck B.V. Uittreding")] }),
    new Paragraph({ children: [] }),
    new Paragraph({ children: [new TextRun({ text: "Opgesteld voor: ", bold: true }), new TextRun("Juridisch adviesgesprek")] }),
    new Paragraph({ children: [new TextRun({ text: "Datum: ", bold: true }), new TextRun("4 februari 2026")] }),
    new Paragraph({ children: [new TextRun({ text: "Cliënt: ", bold: true }), new TextRun("Peter Berkenbosch / PHBX Holding B.V.")] }),
    new Paragraph({ children: [] }),

    // Categorie A
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Categorie A: Geldigheid & Proces Ontslag")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("A1. Effectiviteit van Ontslag")] }),
    new Paragraph({ children: [new TextRun("Is mijn eenzijdig ontslag als bestuurder juridisch effectief per 1 maart 2026, gegeven dat Douwine/Marlou stellen dat zij 'niet kunnen instemmen' met deze datum?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("A2. Vereiste Formaliteiten")] }),
    new Paragraph({ children: [new TextRun("Welke formaliteiten zijn vereist voor de voltooiing van mijn ontslag? Is een notariële akte vereist, of is mijn schriftelijke kennisgeving voldoende?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("A3. Blokkeerpogingen")] }),
    new Paragraph({ children: [new TextRun("Kunnen Douwine/Marlou mijn ontslag juridisch blokkeren of vertragen? Zij claimen dat zij 'kan en zal niet instemmen met uitschrijving per 1 maart 2026.'")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("A4. KvK-Uitschrijving")] }),
    new Paragraph({ children: [new TextRun("Wat als zij weigeren mee te werken aan KvK-uitschrijving? Kan ik mezelf uitschrijven? Wat is de procedure?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("A5. Unanimiteitsvereiste voor Ontslag")] }),
    new Paragraph({ children: [new TextRun("De statuten (Art. 8.6 lid 2) vereisen unanieme AVA-besluiten. Geldt dit voor mijn vrijwillig ontslag, of alleen voor ontslag door de AVA?")] }),
    new Paragraph({ children: [] }),

    // Categorie B
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Categorie B: Status Aandeelhoudersovereenkomst")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("B1. SHA Vervallen Status")] }),
    new Paragraph({ children: [new TextRun("Is de SHA nu juridisch vervallen aangezien:")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Freca B.V. (oorspronkelijke partij) geen aandeelhouder meer is")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Marlou Woltmeijer (huidige 66,7% aandeelhouder) nooit een toetredingsovereenkomst heeft getekend")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("B2. Inroeping Tegen Peter")] }),
    new Paragraph({ children: [new TextRun("Kunnen Freca of Douwine nog steeds SHA-bepalingen tegen mij inroepen, ook al zijn zij geen aandeelhouders meer?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("B3. Non-Concurrentiebeding")] }),
    new Paragraph({ children: [new TextRun("Kan het non-concurrentiebeding (Art. 7 SHA, 3 jaar na aandelenoverdracht) worden afgedwongen als ik mijn aandelen verkoop? Tegen wie zou het afdwingbaar zijn?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("B4. Terugkooprechten")] }),
    new Paragraph({ children: [new TextRun("Kunnen de terugkooprechten (Art. 3.1.h SHA - kooprecht bij ontslag bestuurder) worden afgedwongen? Door wie?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("B5. Marlou's Positie")] }),
    new Paragraph({ children: [new TextRun("Wat is mijn positie als Marlou later claimt niet op de hoogte te zijn van mijn uittredingsvoorstel of de onderhandelingen? Zij is pas op 2 februari 2026 aan CC toegevoegd.")] }),
    new Paragraph({ children: [] }),

    // Categorie C
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Categorie C: Minderheidsaandeelhoudersrechten & Vetorecht")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("C1. Reikwijdte Vetorecht")] }),
    new Paragraph({ children: [new TextRun("Geeft Art. 8.6 lid 2 van de statuten (unanimiteitsvereiste voor alle AVA-besluiten) mij effectief vetorecht? Hoe sterk is deze bescherming?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("C2. Besluiten Die Ik Kan Blokkeren")] }),
    new Paragraph({ children: [new TextRun("Welke specifieke besluiten kan ik als 33,3% minderheidsaandeelhouder blokkeren? De statuten stellen dat 'alle besluiten worden unaniem genomen.'")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("C3. Handelingen Zonder Instemming")] }),
    new Paragraph({ children: [new TextRun("Wat gebeurt er als Douwine/Marlou proberen te handelen zonder mijn instemming? Wat zijn mijn rechtsmiddelen?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("C4. Statutenwijziging")] }),
    new Paragraph({ children: [new TextRun("Kunnen zij de statuten wijzigen om het unanimiteitsvereiste te verwijderen? Zou dit mijn instemming vereisen?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("C5. Informatierechten")] }),
    new Paragraph({ children: [new TextRun("Wat zijn mijn Art. 2:217 BW informatierechten als aandeelhouder, en hoe dwing ik deze af als Douwine weigert informatie te verstrekken?")] }),
    new Paragraph({ children: [] }),

    // Categorie D
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Categorie D: Uittredingsprocedures")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("D1. Art. 2:343 BW Procedure")] }),
    new Paragraph({ children: [new TextRun("Wat is de procedure voor Art. 2:343 BW (gedwongen uittreding / geschillenregeling)? Welke rechtbank behandelt dit?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("D2. Gronden Voldoende")] }),
    new Paragraph({ children: [new TextRun("Vormen mijn 8 gedocumenteerde incidenten van structurele uitsluiting voldoende gronden voor Art. 2:343 BW? De wet vereist 'gedragingen van mede-aandeelhouders zodanig dat in redelijkheid niet kan worden gevergd dat je aandeelhouder blijft.'")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("D3. Kosten en Tijdlijn")] }),
    new Paragraph({ children: [new TextRun("Welke kosten en tijdlijn moet ik verwachten voor een Art. 2:343 BW procedure?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("D4. Enquêteprocedure Alternatief")] }),
    new Paragraph({ children: [new TextRun("Moet ik Art. 2:345 BW (enquêteprocedure) nastreven in plaats van of naast Art. 2:343 BW? Wat zijn de strategische overwegingen?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("D5. Statutaire Prijsbepaling")] }),
    new Paragraph({ children: [new TextRun("Kan ik de statutaire prijsbepalingsprocedure (Art. 6.2 lid 6 statuten - 3 onafhankelijke taxateurs) eenzijdig initiëren? Wat triggert dit?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("D6. Realistische Waardering")] }),
    new Paragraph({ children: [new TextRun("Wat is de realistische waarde van mijn 33,3% belang gegeven:")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Vennootschap heeft €570K schuld (aan Douwine's entiteiten)")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("ARR is slechts €6,2K")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Platformvervangingswaarde is €150K-200K")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Mijn geïnvesteerde arbeidswaarde is €195K-220K")] }),
    new Paragraph({ children: [] }),

    // Categorie E
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Categorie E: Aansprakelijkheid & Risicobeoordeling")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("E1. Bestuurdersaansprakelijkheid Blootstelling")] }),
    new Paragraph({ children: [new TextRun("Wat is mijn blootstelling aan bestuurdersaansprakelijkheid (Art. 2:9 BW, Art. 2:248 BW) gegeven dat ik systematisch werd buitengesloten van besluitvorming?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("E2. Schuldclaim")] }),
    new Paragraph({ children: [new TextRun("Douwine claimt dat ik persoonlijk aansprakelijk ben voor 1/3 van de €570K vennootschapsschuld (€190K). Is hier enige juridische basis voor?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("E3. Vage Dreigingen")] }),
    new Paragraph({ children: [new TextRun("Heeft Douwine's uitspraak 'verantwoordelijkheden of aansprakelijkheden verdwijnen niet' enige juridische basis? Zij geeft geen specifieke gronden.")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("E4. Platformaansprakelijkheid")] }),
    new Paragraph({ children: [new TextRun("Wat is mijn aansprakelijkheid als het platform faalt nadat ik stop met onderhoud (na ontslag)? Is er enige plicht om door te gaan?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("E5. KTLO Formalisatie")] }),
    new Paragraph({ children: [new TextRun("Moet ik de KTLO (keep-the-lights-on) scope schriftelijk formaliseren om mijn blootstelling te beperken? Momenteel onderhoud ik vrijwillig zonder overeenkomst.")] }),
    new Paragraph({ children: [] }),

    // Categorie F
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Categorie F: Directe Acties & Strategie")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("F1. Acties Voor 1 Maart")] }),
    new Paragraph({ children: [new TextRun("Wat moet ik doen tussen nu en 1 maart 2026? Specifieke stappen om mijn positie te beschermen?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("F2. KTLO Voortzetten")] }),
    new Paragraph({ children: [new TextRun("Moet ik KTLO-onderhoud voortzetten zonder formele overeenkomst? Wat zijn de risico's?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("F3. Onderhandelingspositie Behouden")] }),
    new Paragraph({ children: [new TextRun("Hoe behoud ik onderhandelingspositie terwijl ik persoonlijk risico minimaliseer?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("F4. Proactieve KvK-Registratie")] }),
    new Paragraph({ children: [new TextRun("Moet ik proactief mijn ontslag bij KvK registreren, of wachten tot zij meewerken?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("F5. Documentatiebewaring")] }),
    new Paragraph({ children: [new TextRun("Welke documentatie moet ik nu bewaren voor potentiële rechtszaken? Is mijn huidige dossier voldoende?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("F6. Proactieve Juridische Actie")] }),
    new Paragraph({ children: [new TextRun("Is er een strategisch voordeel om Art. 2:343 BW procedures proactief te starten, in plaats van te wachten tot de situatie verder verslechtert?")] }),
    new Paragraph({ children: [] }),

    // Categorie G
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Categorie G: Onderhandelingspositie")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("G1. Redelijkheid Uitkoopvoorstel")] }),
    new Paragraph({ children: [new TextRun("Is mijn €40K uitkoopvoorstel redelijk gegeven:")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Platformwaarde €150K-200K (1/3 = €50K-67K)")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Vennootschapsschuld €570K (maar aan Douwine's eigen entiteiten)")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("ARR €6,2K (3-5x = €18K-31K, 1/3 = €6K-10K)")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Mijn geïnvesteerde arbeid €195K-220K")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("G2. Werkelijke Positie")] }),
    new Paragraph({ children: [new TextRun("Welke positie heb ik werkelijk als minderheidsaandeelhouder met vetorecht maar zonder operationele controle?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("G3. Toekomstige Communicatie")] }),
    new Paragraph({ children: [new TextRun("Hoe moet ik reageren op toekomstige communicatie van Douwine/Marlou? Moet ik directe communicatie voortzetten?")] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("G4. Advocaatcommunicatie")] }),
    new Paragraph({ children: [new TextRun("Moet alle communicatie vanaf dit punt via een advocaat verlopen?")] }),
    new Paragraph({ children: [] }),

    // Specifieke Feitelijke Verduidelijkingen
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Specifieke Feitelijke Verduidelijkingen Benodigd")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "De 'Afspraak 22 Januari': ", bold: true }), new TextRun("Douwine claimt dat we op 22 januari een expliciete afspraak hebben gemaakt om een vergadering te plannen. In werkelijkheid erkende zij op die datum haar vertraging en beloofde data te sturen (wat ze nooit deed). Hoe weerleg ik dit narratief als het relevant wordt?")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Douwine's 'Aandeelhouder' Claim: ", bold: true }), new TextRun("In haar e-mail van 1 februari claimt Douwine te handelen als 'aandeelhouder.' Freca verkocht aan Marlou op 7 november 2025. Moet ik deze valse voorstelling formeel betwisten?")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Belangenverstrengeling: ", bold: true }), new TextRun("Douwine stelt expliciet dat ze handelt 'vanuit mijn positie als financier van Dinck B.V.' terwijl ze ook bestuurder is. Is deze belangenverstrengeling juridisch aan te vechten?")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Marlou's Kennis: ", bold: true }), new TextRun("Marlou was niet geïnformeerd over mijn uittredingsvoorstel tot 2 februari 2026 (toen ik haar aan CC toevoegde). Welke implicaties heeft dit voor haar positie als meerderheidsaandeelhouder?")] }),
    new Paragraph({ children: [] }),

    // Beschikbare Documenten
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Beschikbare Documenten voor Beoordeling")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Aandeelhoudersovereenkomst (SHA) - 28 maart 2024")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Statuten Dinck B.V. - 28 maart 2024")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Volledige e-mailcorrespondentie (december 2025 - februari 2026)")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Incidentenregister (8 gedocumenteerde incidenten)")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("AVA-notulen 30 november 2024")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Ontslagbrief en reactie")] }),
    new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Financieel overzicht Dinck B.V.")] }),
  ];

  return new Document({
    styles: docStyles,
    numbering: bulletConfig,
    sections: [{
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children
    }]
  });
}

// Generate both documents
async function main() {
  const overviewDoc = generateOverviewDoc();
  const questionsDoc = generateQuestionsDoc();

  const overviewBuffer = await Packer.toBuffer(overviewDoc);
  fs.writeFileSync("/home/peter/dinck-legal/artifacts/legal-consult-overview.docx", overviewBuffer);
  console.log("Generated: legal-consult-overview.docx (Dutch)");

  const questionsBuffer = await Packer.toBuffer(questionsDoc);
  fs.writeFileSync("/home/peter/dinck-legal/artifacts/legal-consult-questions.docx", questionsBuffer);
  console.log("Generated: legal-consult-questions.docx (Dutch)");
}

main().catch(console.error);
