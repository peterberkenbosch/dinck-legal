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
  if (Array.isArray(text)) {
    return new Paragraph({
      spacing: { before: opts.spaceBefore || 100, after: opts.spaceAfter || 100 },
      alignment: opts.align,
      children: text
    });
  }
  return new Paragraph({
    spacing: { before: opts.spaceBefore || 100, after: opts.spaceAfter || 100 },
    alignment: opts.align,
    children: [new TextRun({
      text,
      bold: opts.bold,
      italics: opts.italic,
      size: opts.size || 22,
      font: "Arial",
      color: opts.color
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

function question(num, text) {
  return new Paragraph({
    spacing: { before: 160, after: 80 },
    indent: { left: 360, hanging: 360 },
    children: [
      new TextRun({ text: `${num}  `, bold: true, size: 22, font: "Arial" }),
      new TextRun({ text, size: 22, font: "Arial" })
    ]
  });
}

function context(text) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    children: [
      new TextRun({ text: "Context: ", bold: true, italics: true, size: 20, font: "Arial", color: "555555" }),
      new TextRun({ text, italics: true, size: 20, font: "Arial", color: "555555" })
    ]
  });
}

function archiveQuestion(id, status, text) {
  return new Paragraph({
    spacing: { before: 100, after: 40 },
    indent: { left: 360, hanging: 360 },
    children: [
      new TextRun({ text: `${id} `, bold: true, size: 20, font: "Arial" }),
      new TextRun({ text: `${status} `, bold: true, size: 20, font: "Arial", color: status.includes("BEANTWOORD") ? "2E7D32" : "888888" }),
      new TextRun({ text, size: 20, font: "Arial" })
    ]
  });
}

function archiveAnswer(text) {
  return new Paragraph({
    spacing: { before: 40, after: 80 },
    indent: { left: 720 },
    children: [new TextRun({ text, italics: true, size: 20, font: "Arial", color: "555555" })]
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
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // Titel
      p("Juridische vragen — Maud van der Zee (Omnius)", { bold: true, size: 28, spaceBefore: 0 }),
      p(""),
      p([
        new TextRun({ text: "Intake: ", bold: true, size: 20, font: "Arial" }),
        new TextRun({ text: "6 februari 2026", size: 20, font: "Arial" })
      ]),
      p([
        new TextRun({ text: "Bijgewerkt: ", bold: true, size: 20, font: "Arial" }),
        new TextRun({ text: "11 februari 2026 (opgeschoond: 48 → 14 vragen)", size: 20, font: "Arial" })
      ]),
      p([
        new TextRun({ text: "Context: ", bold: true, size: 20, font: "Arial" }),
        new TextRun({ text: "Peter Berkenbosch / PHBX Holding B.V. — uittreding Dinck B.V.", size: 20, font: "Arial" })
      ]),
      p(""),
      p([
        new TextRun({ text: "Huidige koers: ", bold: true, size: 22, font: "Arial" }),
        new TextRun({ text: "Ontslag bestuurder per 1 maart → stille aandeelhouder → KTLO-overeenkomst → package deal voor exit.", size: 22, font: "Arial" })
      ]),

      hr(),

      // ═══════════════════════════════════════════
      // SECTIE 1: MO-STRATEGIE
      // ═══════════════════════════════════════════
      heading("1. MO-strategie (5 vragen)", HeadingLevel.HEADING_1),

      context("Het bestuurdersontslag per 1 maart beëindigt de MO niet automatisch. De MO is nooit formeel opgezegd — alleen de fee is op nihil gesteld. Peter gaat KTLO doen."),

      question("1.1", "Moet de managementovereenkomst PHBX ↔ Dinck worden beëindigd, of juist laten bestaan? Wat zijn de gevolgen voor de vrijwaring (Art. 4.2 MO)? Drie opties uitgewerkt in analyse meeting 11 feb sectie 3.4."),

      question("1.2", "Kan de vrijwaring (Art. 4.2 MO) worden overgenomen in een KTLO-leveranciersovereenkomst als de MO wél wordt beëindigd?"),

      question("1.3", "Wat is het effect van de MO-keuze op de ongerechtvaardigde verrijking-vordering (Art. 6:212 BW)? Schatting: ~1.440 uur onbetaald werk (€108-180K). Verzwakt of versterkt opzegging deze vordering?"),

      question("1.4", "Peter heeft in de meeting van 11 feb mondeling aangegeven bereid te zijn tot KTLO met voorwaarden. Niets getekend, niets schriftelijk. Is dit juridisch bindend? Kan Douwine stellen dat Peter zich hiermee heeft gecommitteerd?"),

      question("1.5", "Wat moet er in een KTLO-leveranciersovereenkomst staan? Specifiek: vergoeding (vast of uurtarief?), hostingkosten (vooruit of declaratie?), aansprakelijkheidsbeperking, opzegtermijn, en opschortingsrecht bij niet-betaling."),

      hr(),

      // ═══════════════════════════════════════════
      // SECTIE 2: SHA EN AKTE TERUGLEVERING
      // ═══════════════════════════════════════════
      heading("2. SHA en akte teruglevering (6 vragen)", HeadingLevel.HEADING_1),

      context("Op 10 feb 2026 ontving Peter via notaris Koops een concept akte voor teruglevering van 8 aandelen (66,7%) van Marlou aan Freca voor €1,00. De notaris eist Peters co-signering als bewijs van afstand voorkeursrecht (Art. 3.2)."),

      question("2.1", "Herleeft de SHA als Freca weer aandeelhouder wordt? Zo ja: wordt het non-concurrentiebeding (Art. 7: 3 jaar na levering) actief? En de boeteclausule (Art. 10: €100K + €1K/dag)?"),

      question("2.2", "Kan Peter SHA-uitsluiting bedingen als voorwaarde voor het co-signeren van de akte? Zo ja, welke formulering?"),

      question("2.3", "Kan Peter weigeren te tekenen? Wat zijn de juridische gevolgen? Moet de blokkeringsregeling (Art. 6.2 statuten) dan worden gevolgd?"),

      question("2.4", "Dekt de waiver uit november 2025 (Art. 3.2: \"deze levering en een mogelijke teruglevering door koper aan verkoper\") de huidige transactie juridisch, of heeft de notaris gelijk dat een nieuwe afstand nodig is?"),

      question("2.5", "Na 1 maart is Peter geen bestuurder van Dinck meer — hoedanigheid (b) in de akte vervalt. Kan de akte dan nog worden gepasseerd met Douwine als enig bestuurder Dinck terwijl zij ook bestuurder Freca/koper is?"),

      question("2.6", "Package deal: kan Peter co-signering koppelen aan gelijktijdige aandelenoverdracht Peters aandelen + SHA-kwijting + KTLO-overeenkomst + wederzijdse kwijting?"),

      hr(),

      // ═══════════════════════════════════════════
      // SECTIE 3: STRATEGIE
      // ═══════════════════════════════════════════
      heading("3. Strategie (3 vragen)", HeadingLevel.HEADING_1),

      context("Sommatiebrief (€100K boete kettingbeding) in voorbereiding maar on hold na meeting 11 feb. Peter bereid tot onderhandeling."),

      question("3.1", "Sommatiebrief (€100K boete kettingbeding Art. 9+10 SHA): nu versturen, of achter de hand houden als drukmiddel voor de onderhandeling over KTLO-voorwaarden en co-signering akte?"),

      question("3.2", "Art. 3.1 MO schending (ongelijke behandeling fees — alleen PHBX's fee formeel gewijzigd, niet Freca's): bruikbaar als onderhandelingsargument? Loopt Freca's fee van €8.000/maand juridisch nog steeds door?"),

      question("3.3", "Aflossing 28 maart (~€55-75K): Dinck kan niet betalen, wat leidt tot automatisch verzuim (Art. 11.2 leningsovereenkomst). Wat zijn de gevolgen als Freca niet onmiddellijk opeist — stilzwijgende acceptatie? Peter is na 1 maart geen bestuurder meer."),

      hr(),

      // ═══════════════════════════════════════════
      // BRONVERWIJZINGEN
      // ═══════════════════════════════════════════
      heading("Bronverwijzingen", HeadingLevel.HEADING_1),

      new Table({
        columnWidths: [4000, 5360],
        rows: [
          new TableRow({ tableHeader: true, children: [
            cell("Onderwerp", 4000, { header: true }),
            cell("Analyse", 5360, { header: true })
          ]}),
          new TableRow({ children: [cell("Managementovereenkomsten + AVA", 4000), cell("managementovereenkomst-analyse.md", 5360)] }),
          new TableRow({ children: [cell("Leningsovereenkomst + addendum", 4000), cell("geldlening-analyse.md", 5360)] }),
          new TableRow({ children: [cell("Bestuurdersontslag vs. MO", 4000), cell("bestuurdersontslag-vs-managementovereenkomst.md", 5360)] }),
          new TableRow({ children: [cell("Concept akte teruglevering", 4000), cell("concept-akte-teruglevering-analyse.md", 5360)] }),
          new TableRow({ children: [cell("SHA herleving (verdiept)", 4000), cell("sha-herleving-analyse.md", 5360)] }),
          new TableRow({ children: [cell("Voorkeursrecht strategisch", 4000), cell("voorkeursrecht-strategische-analyse.md", 5360)] }),
          new TableRow({ children: [cell("Memo jurist 11 feb 2026", 4000), cell("memo-jurist-11feb2026.md", 5360)] }),
          new TableRow({ children: [cell("Meeting 11 feb + KTLO", 4000), cell("meeting-11feb-analyse.md", 5360)] }),
          new TableRow({ children: [cell("Grady Hofstra triple role", 4000), cell("grady-hofstra-dynamiek.md", 5360)] }),
        ]
      }),

      hr(),

      // ═══════════════════════════════════════════
      // ARCHIEF
      // ═══════════════════════════════════════════
      heading("Archief — Beantwoorde en achterhaalde vragen", HeadingLevel.HEADING_1),
      p("34 vragen — beantwoord, achterhaald of niet meer actief voor de huidige strategie.", { italic: true, size: 20, color: "888888" }),

      // A. Stopzetting Financiering
      heading("A. Stopzetting Financiering (6 feb 2026)", HeadingLevel.HEADING_2),

      archiveQuestion("A1.", "✓ BEANTWOORD:", "Eenzijdige stopzetting financiering door Douwine — bestuurdersplicht en tegenstrijdig belang."),
      archiveAnswer("Antwoord jurist: Reëel risico persoonlijke aansprakelijkheid Douwine (New Holland Belgium-norm HR). Wordt opgenomen in sommatiebrief."),

      archiveQuestion("A2.", "✓ BEANTWOORD:", "Peters verplichtingen als mede-bestuurder bij onbetaalde salarissen."),
      archiveAnswer("Antwoord jurist: Peter is veilig. Waarschuwingsbrief 8 feb beschermt hem (Beklamel-norm HR)."),

      archiveQuestion("A3.", "MINDER URGENT:", "Rechten Peter t.a.v. externe partij. Geïdentificeerd als Jaamo (Rushmir, Jeffrey)."),

      archiveQuestion("A4.", "✓ BEANTWOORD:", "Grady's dubbele pet en risico's voor Peter bij meeting."),
      archiveAnswer("Antwoord jurist: Meeting afgeraden. \"Hofstra behartigt de belangen van mevrouw Koopman.\""),

      archiveQuestion("A5.", "✓ ACHTERHAALD:", "Brief financiële zorgen — verzonden 8 februari 2026."),

      archiveQuestion("A6.", "MINDER URGENT:", "Informatieplicht jegens werknemers. Verschuift na 1 maart."),

      // B. Managementovereenkomst
      heading("B. Managementovereenkomst", HeadingLevel.HEADING_2),
      archiveQuestion("B1-B2.", "→ SAMENGEVOEGD:", "In vraag 1.1 (MO beëindigen vs. laten bestaan)."),
      archiveQuestion("B3.", "NIET ACTIEF:", "Vervanger aanwijzen (Art. 2.2) — niet relevant bij KTLO."),

      // C. Art. 3.1 Gelijke Behandeling
      heading("C. Art. 3.1 Gelijke Behandeling", HeadingLevel.HEADING_2),
      archiveQuestion("C1-C2.", "→ SAMENGEVOEGD:", "In vraag 3.2 (Art. 3.1 schending als argument)."),
      archiveQuestion("C3.", "NIET ACTIEF:", "Fee-terugvordering via Art. 3.1 — ongerechtvaardigde verrijking is sterker."),

      // D. Bestuurdersaansprakelijkheid
      heading("D. Bestuurdersaansprakelijkheid", HeadingLevel.HEADING_2),

      archiveQuestion("D1.", "✓ BEANTWOORD:", "Risico bestuurdersaansprakelijkheid Peter."),
      archiveAnswer("Antwoord jurist: Positie \"overwegend veilig.\" Beklamel-norm afgedekt."),

      archiveQuestion("D2.", "NIET ACTIEF:", "Buitensluiting als verweer — niet nodig, Peter is al veilig."),

      archiveQuestion("D3.", "✓ BEANTWOORD:", "Douwine's aansprakelijkheidsdreiging (e-mail 1 feb)."),
      archiveAnswer("Antwoord jurist: Geen reële grondslag. Douwine loopt zelf risico (New Holland Belgium-norm)."),

      archiveQuestion("D4.", "NIET ACTIEF:", "Jaarrekening 2024 / bewijsvermoeden Art. 2:248 lid 2 — achtergrondvraag."),

      // E. Leningsovereenkomst
      heading("E. Leningsovereenkomst", HeadingLevel.HEADING_2),
      archiveQuestion("E1.", "→ SAMENGEVOEGD:", "In vraag 3.3 (aflossing 28 maart)."),
      archiveQuestion("E2.", "TE GEDETAILLEERD:", "Rente-accumulatie boven €500K — technisch, niet urgent."),
      archiveQuestion("E3.", "TE GEDETAILLEERD:", "Vernietiging addendum (Art. 3:44 lid 4 BW) — achtergrondoptie."),

      archiveQuestion("E4.", "✓ BEANTWOORD:", "Verhaal op PHBX via bestuurdersaansprakelijkheid."),
      archiveAnswer("Antwoord jurist: Nee. PHBX is geen partij. Risico afgedekt door waarschuwingsbrief."),

      archiveQuestion("E5.", "DEELS BEANTWOORD:", "Tegenstrijdig belang bij opeising lening — specifieke werking niet uitgewerkt."),
      archiveQuestion("E6-E7.", "NIET ACTIEF:", "Ontslag als \"staking\" Art. 7.1.g — afgedekt: MO niet opgezegd, Peter doet KTLO."),

      // F, G
      heading("F. Vrijwaring / G. Ongerechtvaardigde Verrijking", HeadingLevel.HEADING_2),
      archiveQuestion("F1, F3, G1.", "→ SAMENGEVOEGD:", "In vragen 1.1 en 1.3 (MO-strategie)."),
      archiveQuestion("F2.", "ACHTERGROND:", "Vrijwaring bij faillissement — pas relevant bij faillissement."),
      archiveQuestion("G2-G3.", "NIET ACTIEF:", "Instemming AVA-besluit / tegenwicht leningsvordering — subsidiair."),

      // H. Schijnconstructie
      heading("H. Schijnconstructie Marlou", HeadingLevel.HEADING_2),
      archiveQuestion("H1-H5.", "NIET ACTIEF:", "Schijnconstructie-argumenten zijn achtergrondmateriaal. Focus ligt op voorwaarden co-signering (sectie 2)."),

      // I. Uittreding Vorderen
      heading("I. Uittreding Vorderen", HeadingLevel.HEADING_2),
      archiveQuestion("I1-I4.", "NIET ACTIEF:", "Art. 2:343 BW / enquêteprocedure — achtergrondopties. Strategie is onderhandelde exit via package deal."),

      // J. Freca's MO
      heading("J. Freca's Managementovereenkomst", HeadingLevel.HEADING_2),
      archiveQuestion("J1-J2.", "→ SAMENGEVOEGD:", "Deels verwerkt in vraag 3.2 (Freca's fee-status)."),

      // K. Overig
      heading("K. Overig", HeadingLevel.HEADING_2),
      archiveQuestion("K1.", "NIET ACTIEF:", "Saldo-overzichten Art. 9 — technisch, niet urgent."),
      archiveQuestion("K2.", "NIET ACTIEF:", "Art. 11.3 uitsluiting ontbinding — technisch, niet urgent."),
      archiveQuestion("K3.", "NIET ACTIEF:", "Belastingdienst informeren €1 waardering — strategische reserve."),

      // L. Concept Akte (rest)
      heading("L. Concept Akte Teruglevering (overig)", HeadingLevel.HEADING_2),
      archiveQuestion("L3.", "NIET ACTIEF:", "Prijs bij uitoefening voorkeursrecht — Peter overweegt geen uitoefening."),

      archiveQuestion("L4c.", "✓ BEANTWOORD:", "Boeteclausule Art. 10 SHA als tegenvordering."),
      archiveAnswer("Antwoord jurist: \"Belangrijkste onderhandelingstroef.\" Direct opeisbare boete €100.000."),

      archiveQuestion("L4b.", "NIET ACTIEF:", "Verdediging Art. 6:248 lid 2 BW — Peter hoeft zich niet te verdedigen."),
      archiveQuestion("L5.", "NIET ACTIEF:", "Prijsafwijking €1 vs €1,50 — bevestigt stroman, niet actief relevant."),

      // M. Grady
      heading("M. Grady Hofstra", HeadingLevel.HEADING_2),
      archiveQuestion("M1-M4.", "STRATEGISCHE RESERVE:", "NBA-klacht — niet voor nu, voor later als onderhandeling vastloopt."),

      // N. KTLO (rest)
      heading("N. KTLO-structurering (overig)", HeadingLevel.HEADING_2),
      archiveQuestion("N4.", "NIET ACTIEF:", "Erkenning lening door Peter persoonlijk — geen reëel risico."),
      archiveQuestion("N7.", "NIET ACTIEF:", "Zeggenschap aandeelhouder over ontslag werknemers — primair bestuursdomein."),
    ]
  }]
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outPath = "/home/peter/dinck-legal/artifacts/Vragen_Maud_van_der_Zee.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Generated: " + outPath);
}

main().catch(console.error);
