const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        LevelFormat } = require('docx');
const fs = require('fs');

// Shared styles
const docStyles = {
  default: { document: { run: { font: "Arial", size: 22 } } },
  paragraphStyles: [
    { id: "Title", name: "Title", basedOn: "Normal",
      run: { size: 36, bold: true, color: "000000", font: "Arial" },
      paragraph: { spacing: { before: 0, after: 100 } } },
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 28, bold: true, color: "1a1a1a", font: "Arial" },
      paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, color: "333333", font: "Arial" },
      paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } },
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 22, bold: true, color: "444444", font: "Arial" },
      paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } }
  ]
};

const bulletConfig = {
  config: [
    { reference: "bullet-list",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "num-list",
      levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "checkbox-list",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2610", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "checked-list",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2611", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
  ]
};

const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const cellBorders = { top: border, bottom: border, left: border, right: border };
const headerShading = { fill: "E0E0E0", type: ShadingType.CLEAR };
const lightShading = { fill: "F5F5F5", type: ShadingType.CLEAR };

// Helpers
function hCell(text, width) {
  return new TableCell({
    borders: cellBorders, width: { size: width, type: WidthType.DXA }, shading: headerShading,
    children: [new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text, bold: true, size: 20, font: "Arial" })] })]
  });
}
function cell(text, width, opts = {}) {
  return new TableCell({
    borders: cellBorders, width: { size: width, type: WidthType.DXA },
    shading: opts.shading,
    children: [new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text, size: 20, font: "Arial", bold: opts.bold, italics: opts.italics })] })]
  });
}
function p(text, opts = {}) {
  const runs = [];
  if (typeof text === 'string') {
    runs.push(new TextRun({ text, size: opts.size || 22, bold: opts.bold, italics: opts.italics, font: "Arial", color: opts.color }));
  } else {
    text.forEach(t => runs.push(new TextRun({ size: 22, font: "Arial", ...t })));
  }
  return new Paragraph({ spacing: { before: opts.spaceBefore || 0, after: opts.spaceAfter || 80 }, alignment: opts.align, children: runs, ...(opts.numbering ? { numbering: opts.numbering } : {}) });
}
function h1(text) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] }); }
function h2(text) { return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] }); }
function h3(text) { return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(text)] }); }
function quote(text) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: { left: 400 },
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: "999999", space: 10 } },
    children: [new TextRun({ text, italics: true, size: 22, font: "Arial", color: "333333" })]
  });
}
function quoteRuns(runs) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: { left: 400 },
    border: { left: { style: BorderStyle.SINGLE, size: 6, color: "999999", space: 10 } },
    children: runs.map(r => new TextRun({ size: 22, font: "Arial", color: "333333", italics: true, ...r }))
  });
}
function bullet(text, opts = {}) {
  const runs = [];
  if (typeof text === 'string') {
    runs.push(new TextRun({ text, size: 22, font: "Arial", bold: opts.bold }));
  } else {
    text.forEach(t => runs.push(new TextRun({ size: 22, font: "Arial", ...t })));
  }
  return new Paragraph({ numbering: { reference: opts.ref || "bullet-list", level: 0 }, spacing: { before: 20, after: 20 }, children: runs });
}
function num(text, ref = "num-list") {
  return new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { before: 20, after: 20 }, children: [new TextRun({ text, size: 22, font: "Arial" })] });
}
function table2(headers, rows, widths = [4500, 4860]) {
  return new Table({
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => hCell(h, widths[i])) }),
      ...rows.map(r => new TableRow({ children: r.map((c, i) => {
        if (typeof c === 'object' && c._type === 'bold') return cell(c.text, widths[i], { bold: true });
        return cell(c, widths[i]);
      }) }))
    ]
  });
}
function gap() { return new Paragraph({ spacing: { before: 0, after: 0 }, children: [] }); }
function hr() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 8 } },
    children: []
  });
}

// ========================================
// MEETING CHEATSHEET
// ========================================
function generateCheatsheet() {
  const c = [];

  // Title
  c.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Meeting Cheatsheet")] }));
  c.push(p("Woensdag 11 Februari 2026, 12:30", { bold: true }));
  c.push(gap());
  c.push(p([{ text: "Locatie: ", bold: true }, { text: "Van der Meer, Venekoterweg 44, Oosterwolde" }]));
  c.push(p([{ text: "Aanwezig: ", bold: true }, { text: "Douwine, Marlou, Grady Hofstra, Peter" }]));
  c.push(hr());

  // DE DRIE REGELS
  c.push(h1("DE DRIE REGELS"));
  c.push(p([{ text: "1. NERGENS AAN COMMITTEN", bold: true }, { text: ' \u2014 Elk voorstel: "Ik bespreek dit met mijn adviseur en kom schriftelijk terug."' }]));
  c.push(p([{ text: "2. MARLOU = DOUWINE", bold: true }, { text: " \u2014 Alles wat Marlou zegt komt van Douwine. Geen onafhankelijke stem." }]));
  c.push(p([{ text: "3. GRADY = PARTIJADVISEUR", bold: true }, { text: " \u2014 Niet neutraal, niet objectief. Zijn cijfers zijn Douwine\u2019s cijfers." }]));
  c.push(gap());
  c.push(p("Jij bent de enige in de kamer die jouw belang dient. Doel = LUISTEREN, niet BESLISSEN.", { bold: true }));
  c.push(hr());

  // BIJ BINNENKOMST
  c.push(h1("BIJ BINNENKOMST"));
  c.push(quote("Ik neem dit gesprek op zodat ik er een gespreksverslag van kan maken. Dat verslag deel ik daarna met jullie."));
  c.push(p('Als bezwaar: "Dan stel ik voor dat we beiden aantekeningen maken en achteraf een gespreksverslag opstellen."'));
  c.push(hr());

  // VIER PUNTEN
  c.push(h1("VIER PUNTEN DIE PETER AAN DE ORDE STELT"));

  // 1. Financiering
  c.push(h2("1. Financiering gestopt \u2014 werknemers"));
  c.push(quote("Hoe worden de werknemers betaald nu de financiering per direct is gestopt?"));
  c.push(bullet('ARR = \u20AC6.400/jaar. Dat is onvoldoende voor \u00E9\u00E9n maand salaris.'));
  c.push(bullet('Als "dat lossen we op": "Graag concreet. Wanneer en hoe?"'));
  c.push(bullet('Als "jouw verantwoordelijkheid": "Daarom heb ik de risico\u2019s gesignaleerd in mijn brief van 8 februari. Wat is jouw voorstel?"'));
  c.push(bullet('Als "heb je werknemers ge\u00EFnformeerd?": "Over communicatie naar werknemers wil ik eerst juridisch advies, juist om zorgvuldig te handelen."'));
  c.push(bullet('Als "jij moet werknemers inlichten": "Die verantwoordelijkheid rust op het bestuur. Dat zijn wij beiden. Laten we dat samen en zorgvuldig doen."'));

  // 2. Externe partij
  c.push(h2("2. Externe partij \u2014 informatierecht"));
  c.push(quote("In je mail van 6 februari noemde je een gesprek met een externe partij over mogelijke samenwerking. Dat gesprek was gisteren. Ik heb daar geen informatie over ontvangen, ook niet na mijn brief van 8 februari. Wie is die partij, wat is er besproken, en zijn er toezeggingen gedaan?"));
  c.push(bullet('Als "vertrouwelijk": "Als mede-bestuurder heb ik recht op volledige informatie. Ik heb dat ook schriftelijk vastgesteld."'));
  c.push(bullet('Als "verkennend": "Ik moet weten of er gesprekken lopen die de vennootschap raken. Ik heb daar twee keer om gevraagd \u2014 in mijn brief van 8 februari en in mijn constatering van gisteren."'));
  c.push(bullet('Als "gaat jou niet aan": "Zolang ik bestuurder ben, gaat alles wat Dinck raakt mij aan. Dat is een wettelijke verplichting."'));

  // 3. Aflossing
  c.push(h2("3. Aflossing 28 maart"));
  c.push(quote("De eerste aflossing is ~\u20AC55-75K. Hoe gaat Dinck dit betalen?"));
  c.push(bullet('Als "Freca zal niet opeisen": "Graag schriftelijk bevestigen, inclusief uitstelafspraak."'));
  c.push(bullet('Als "bespreken we later": "De termijn is over 6 weken. Automatisch verzuim treedt in zonder ingebrekestelling."'));
  c.push(bullet('Als "jij hebt het addendum ook getekend": "Klopt. Maar Dinck kan het niet betalen. Dat is een feit."'));

  // 4. Concept akte
  c.push(h2("4. Concept akte teruglevering aandelen"));
  c.push(quote("Ik heb de concept akte ontvangen. Ik laat die beoordelen door mijn adviseur."));
  c.push(p("STOP. Niets meer zeggen. Dit is een APART onderwerp van de externe partij.", { bold: true }));
  c.push(gap());
  c.push(table2(["Zij zeggen", "Jij zegt"], [
    ['"Het is een formaliteit"', '"Dan heeft mijn adviseur er snel naar gekeken."'],
    ['"Je hebt al afstand gedaan in november"', '"Ik laat het beoordelen. Ik kom schriftelijk terug."'],
    ['"De notaris wacht"', '"De akte is een concept. Ik neem de tijd die nodig is."'],
    ['"Grady heeft de prijs vastgesteld"', '"De statuten voorzien in drie onafhankelijke deskundigen."'],
    ['"Heb je het register mee?"', '"Nee."'],
    ['"Na 1 maart kun je niet meer tekenen"', '"Reden te meer om het zorgvuldig te beoordelen."'],
  ]));
  c.push(hr());

  // VEILIGHEIDSCLAUSULE
  c.push(h1("VEILIGHEIDSCLAUSULE \u2014 altijd beschikbaar"));
  c.push(quote("Dat klinkt als iets dat ik eerst met mijn adviseur wil bespreken. Ik kom er schriftelijk op terug."));
  c.push(p("Geldt voor: elk voorstel over aandelen, werkzaamheden, KTLO, lening, externe partij, aansprakelijkheid."));
  c.push(p("Niets ondertekenen. Niets mondeling toezeggen. Alles schriftelijk.", { bold: true }));
  c.push(hr());

  // ALS ZIJ MET EEN VOORSTEL KOMEN
  c.push(h1("ALS ZIJ MET EEN VOORSTEL KOMEN \u2014 niet reageren, informatie verzamelen"));
  c.push(num('"Kun je dat op papier zetten zodat ik het kan laten toetsen?"'));
  c.push(num('"Wat is de tijdlijn?"'));
  c.push(num('"Wie is de externe partij en wat is hun rol?"'));
  c.push(num('"Hoe wordt de waarde van de aandelen bepaald?"'));
  c.push(num('"Wat gebeurt er met de lening?"'));
  c.push(num('"Wat gebeurt er met de werknemers?"'));
  c.push(gap());
  c.push(p("Luisteren, noteren, niets toezeggen. Elk voorstel gaat eerst langs Maud.", { bold: true }));
  c.push(hr());

  // ALS GRADY MET EEN VOORSTEL/DOCUMENT KOMT
  c.push(h1("ALS GRADY MET EEN VOORSTEL/DOCUMENT KOMT"));
  c.push(p([{ text: "Kern: ", bold: true }, { text: "Aannemen, niet reageren, later laten beoordelen." }]));
  c.push(quote("Dank je. Ik neem dit mee en laat het beoordelen door mijn adviseur. Ik reageer schriftelijk."));
  c.push(p("NIET doorlezen in de meeting. NIET reageren op specifieke punten. NIET vragen stellen over de inhoud.", { bold: true }));
  c.push(gap());
  c.push(table2(["Zij zeggen", "Jij zegt"], [
    ['"Teken hier even"', '"Ik onderteken niets zonder juridisch advies."'],
    ['"Dit is redelijk, je hoeft alleen maar..."', '"Hoe redelijker het klinkt, hoe belangrijker dat mijn adviseur het beoordeelt."'],
    ['"We hebben dit al besproken"', '"Ik neem het mee. Ik kom schriftelijk terug."'],
    ['"Dit is alleen een samenvatting van wat we afspraken"', '"Dan is er geen haast. Ik laat het toetsen."'],
  ]));
  c.push(gap());
  c.push(p([{ text: "Handelwijze: ", bold: true }, { text: "Document aannemen \u2192 in tas \u2192 niet openen \u2192 later laten beoordelen door Maud." }]));
  c.push(hr());

  // ALS MARLOU HET WOORD NEEMT
  c.push(h1("ALS MARLOU HET WOORD NEEMT"));
  c.push(p("Zij kan worden ingezet om voorstellen \u201Czachter\u201D te laten klinken. Behandel alles als Douwine\u2019s voorstel."));
  c.push(bullet("Luisteren, noteren, niet inhoudelijk reageren."));
  c.push(bullet('Als Marlou iets toezegt namens de AVA: "Dat is goed om te horen. Ik wil het graag schriftelijk ontvangen zodat ik het kan laten toetsen."'));
  c.push(hr());

  // ALS GRADY CIJFERS OF WAARDERINGEN PRESENTEERT
  c.push(h1("ALS GRADY CIJFERS OF WAARDERINGEN PRESENTEERT"));
  c.push(quote("Grady, je bent Douwine\u2019s adviseur. Ik neem je inbreng ter kennisgeving aan, maar voor objectieve waarderingen voorzien de statuten in drie onafhankelijke deskundigen."));
  c.push(p("Niet in discussie gaan over zijn cijfers. Noteren, meenemen, later laten toetsen."));
  c.push(hr());

  // ALS DE EXTERNE PARTIJ PETER'S BETROKKENHEID ALS VOORWAARDE STELT
  c.push(h1("ALS DE EXTERNE PARTIJ PETER\u2019S BETROKKENHEID ALS VOORWAARDE STELT"));
  c.push(p([{ text: "Het scenario: ", bold: true }, { text: 'Douwine zegt dat de externe partij wil dat Peter blijft werken / binnenboord blijft / gratis KTLO doet. Als Peter dat niet doet, gaat de deal niet door \u2014 en is het "Peters schuld".' }]));
  c.push(p("Dit is geen druk \u2014 dit is bewijs van jouw waarde. Als zij jou nodig hebben, bevestigt dat precies wat je al weet: het platform is van jou, en zonder jou werkt het niet.", { bold: true }));
  c.push(gap());
  c.push(table2(["Douwine/Grady zegt", "Jij zegt"], [
    ['"De externe partij wil dat jij blijft"', '"Dan had ik bij die gesprekken betrokken moeten worden. Ik hoor dit nu voor het eerst."'],
    ['"Als jij weggaat gaat de deal niet door"', '"Ik ben buitengesloten van die gesprekken. Ik kan geen verantwoordelijkheid nemen voor voorwaarden die zonder mij zijn afgesproken."'],
    ['"Je laat de werknemers in de steek"', '"De financiering is gestopt door jou. Mijn betrokkenheid was jouw keuze om niet te bespreken."'],
    ['"Je hoeft alleen maar door te gaan met wat je doet"', '"Gratis werken is geen \'gewoon doorgaan\'. Dat is een voorwaarde die compensatie vereist."'],
    ['"Het is maar tijdelijk / een paar maanden"', '"Graag concreet en schriftelijk. Ik bespreek het met mijn adviseur."'],
    ['"Dit is de enige manier om Dinck te redden"', '"Als mijn werk essentieel is voor het voortbestaan, dan is faire compensatie daarvoor ook essentieel."'],
    ['"Je bent ego\u00EFstisch / je denkt alleen aan jezelf"', '"Ik heb 3 maanden fulltime gewerkt voor \u20AC0. Ik denk aan een faire oplossing."'],
  ]));
  c.push(gap());
  c.push(p("NIET zeggen:", { bold: true }));
  c.push(bullet('NIET "ja" of "ik wil wel meewerken" \u2014 dat is een toezegging'));
  c.push(bullet('NIET "nee, ik doe het niet" \u2014 dat geeft hen het narratief "Peter blokkeert"'));
  c.push(bullet("NIET vragen wie de externe partij is in deze context \u2014 dat doe je bij punt 2 (informatierecht)"));
  c.push(gap());
  c.push(p("WEL zeggen:", { bold: true }));
  c.push(quote("Als mijn betrokkenheid een voorwaarde is van deze samenwerking, dan praten we over een schriftelijke overeenkomst met faire compensatie. Dat bespreek ik met mijn adviseur."));
  c.push(hr());

  // ALS DOUWINE VRAAGT NAAR MAUD
  c.push(h1("ALS DOUWINE VRAAGT NAAR MAUD"));
  c.push(quote("Ik heb het dossier gestuurd, ik ben in afwachting van haar advies."));
  c.push(bullet("NIET suggereren dat je advies hebt dat je niet hebt"));
  c.push(bullet('NIET een tijdlijn noemen ("volgende week", "over twee dagen")'));
  c.push(bullet("NIET zeggen dat Maud niet heeft gereageerd"));
  c.push(bullet('Als "dan heb je dus geen advies?": "Ik heb een adviseur. Ik wacht haar advies af."'));
  c.push(bullet('Als "waarom neem je dan geen beslissingen?": "Juist d\u00E1\u00E1rom \u2014 ik wil zorgvuldig handelen."'));
  c.push(hr());

  // NIET ZEGGEN / NIET DOEN
  c.push(h1("NIET ZEGGEN / NIET DOEN"));
  c.push(table2(["Niet", "Waarom"], [
    ["Iets inhoudelijks over de concept akte", "Sterkste nieuwe hefboom \u2014 niets onthullen"],
    ["Of je gaat tekenen of niet", "Elke uitspraak verzwakt je positie"],
    ["Iets over het voorkeursrecht of de SHA", 'Niet het woord "aandeelhoudersovereenkomst" uitspreken'],
    ["Het aandeelhoudersregister meenemen", "Niet. Het register blijft thuis."],
    ["Toezeggen tot werk na 1 maart", "Leverage weg"],
    ["Iets over aandelenwaarde zeggen", "Statuten: 3 onafhankelijke deskundigen"],
    ["Ontslagdatum ter discussie stellen", "Non-negotiable"],
    ["Dreigen met faillissement", "Feiten spreken voor zich"],
    ['Oordelen over Douwine\u2019s "tegenslag"', "Op face value nemen"],
    ["Iets ondertekenen", "NIETS. Punt."],
    ['"We spreken af dat..."', "Alles schriftelijk, alles via adviseur"],
    ["Faillissementsscenario uitspreken", "Alleen als Douwine het zelf op tafel legt"],
  ]));
  c.push(hr());

  // VERWACHTE DRUK EN ANTWOORDEN
  c.push(h1("VERWACHTE DRUK EN ANTWOORDEN"));
  c.push(table2(["Zij zeggen", "Jij zegt"], [
    ['"Je hebt een zorgplicht als bestuurder"', '"Correct. Daarom heb ik de risico\u2019s schriftelijk gesignaleerd. Mijn zorgplicht eindigt per 1 maart."'],
    ['"Als jij stopt gaat Dinck failliet"', '"De financiering is niet gestopt door mij, maar door jou."'],
    ['"Jij bent medeverantwoordelijk voor de schulden"', '"PHBX is aandeelhouder, niet hoofdelijk aansprakelijk. Dat is het hele punt van een B.V."'],
    ['"We moeten dit samen oplossen"', '"Daar sta ik voor open. Maar \'samen\' betekent niet \'Peter werkt gratis\'. Alleen op basis van faire compensatie."'],
    ['"Aandelen zijn niets waard"', '"De statuten voorzien in waardering door drie onafhankelijke deskundigen."'],
    ['"Ik heb een tegenslag, ik kan niet anders"', '"Dat is vervelend. Maar de verplichtingen van Dinck jegens haar werknemers bestaan onafhankelijk van VDenD."'],
    ["Emotionele druk / beschuldigingen", '"Ik begrijp dat dit moeilijk is. Ik wil dit zakelijk en constructief oplossen. Laten we bij de feiten blijven."'],
    ['"Dat is jouw interpretatie" / provocatie', '"Ik houd me aan de feiten."'],
  ]));
  c.push(hr());

  // JOUW KRACHT
  c.push(h1("JOUW KRACHT \u2014 waarom je sterk zit (niet uitspreken, wel weten)"));
  c.push(bullet([{ text: "Voorkeursrecht = blokkeringsmacht: ", bold: true }, { text: "Zonder jouw handtekening kan de teruglevering niet plaatsvinden" }]));
  c.push(bullet([{ text: "Vetorecht: ", bold: true }, { text: "Geen AVA-besluit zonder jou \u2014 geen deal met externe partij mogelijk" }]));
  c.push(bullet([{ text: "Platform: ", bold: true }, { text: "Alleen jij kunt het onderhouden \u2014 vervangingskosten \u20AC250-350K" }]));
  c.push(bullet([{ text: "Dossier: ", bold: true }, { text: "13 incidenten, brief + constateringsbrief verzonden, signaleerplicht vervuld" }]));
  c.push(bullet([{ text: "Asymmetrie: ", bold: true }, { text: "Douwine verliest \u20AC612K bij faillissement, jij verliest twijfelachtige equity" }]));
  c.push(bullet([{ text: "Na 1 maart: ", bold: true }, { text: "Geen bestuurder = geen zorgplicht = geen gratis werk" }]));
  c.push(bullet([{ text: "Opschortingsrecht: ", bold: true }, { text: "Art. 6:262 BW \u2014 \u20AC0 fee = recht om prestatie op te schorten" }]));
  c.push(bullet([{ text: "Tegenstrijdig belang: ", bold: true }, { text: "Bewezen door haar eigen handeling (financiering gestopt)" }]));
  c.push(bullet([{ text: "MO niet opgezegd: ", bold: true }, { text: "Vrijwaring (Art. 4.2) nog actief" }]));
  c.push(bullet([{ text: "SHA herleving = beheersbaar: ", bold: true }, { text: "3 verdedigingslagen (Art. 1.2 + Art. 9 tegenvordering + Art. 6:248 lid 2 BW)" }]));
  c.push(bullet([{ text: "Art. 9 tegenvordering: ", bold: true }, { text: "\u20AC100K + \u20AC1K/dag \u2014 Peters eigen wapen als Freca de SHA inroept" }]));
  c.push(bullet([{ text: "Hoedanigheid (b) vervalt 1 maart: ", bold: true }, { text: "Leverage, niet zwakte \u2014 na 1 maart kan Peter niet meer tekenen als bestuurder" }]));
  c.push(bullet([{ text: "Notaris concludeert: ", bold: true }, { text: "Nieuwe waiver nodig \u2014 Peters handtekening is de poort" }]));
  c.push(hr());

  // ACHTERGRONDKENNIS
  c.push(h1("ACHTERGRONDKENNIS (weten, niet zeggen)"));
  c.push(bullet("Faillissement kost Douwine ~\u20AC612K (Freca + VDenD vorderingen worden waardeloos)"));
  c.push(bullet("Werknemers zijn bij faillissement beschermd via UWV loongarantieregeling"));
  c.push(bullet("Peter kan na 1 maart alle werk stoppen (opschortingsrecht, \u20AC0 schade)"));
  c.push(bullet("Curator zou Douwine onderzoeken, niet Peter (tegenstrijdig belang, gestopte financiering)"));
  c.push(bullet("SHA herleving = beheersbaar risico \u2014 3 verdedigingslagen (Art. 1.2 + Art. 9 tegenvordering + Art. 6:248 lid 2 BW)"));
  c.push(bullet('Als Douwine emotioneel speelt over werknemers: "Werknemers zijn beschermd via UWV. De financiering stoppen was jouw keuze."'));
  c.push(bullet('Als MO ter sprake komt: "Dat bespreek ik met mijn adviseur." \u2014 NIET opzeggen, NIET bespreken'));
  c.push(hr());

  // AFSLUITING
  c.push(h1("AFSLUITING"));
  c.push(p("Constructief:", { bold: true }));
  c.push(quote("Bedankt voor het gesprek. Ik vat samen wat we besproken hebben: [samenvatten]. Ik kom schriftelijk terug. Ik stel voor dat we beiden een gespreksverslag opstellen."));
  c.push(p("Geen voortgang:", { bold: true }));
  c.push(quote("Mijn positie is helder: ik treed af per 1 maart, ik ben bereid KTLO te bespreken op basis van compensatie, en ik verwacht ge\u00EFnformeerd te worden."));
  c.push(p("Onacceptabele druk:", { bold: true }));
  c.push(quote("Dit gesprek is niet productief. Ik stel voor dat we schriftelijk verder gaan, via onze adviseurs."));
  c.push(gap());
  c.push(p("Opstaan en vertrekken is altijd een optie.", { bold: true }));

  return new Document({ styles: docStyles, numbering: bulletConfig, sections: [{ properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } }, children: c }] });
}

// ========================================
// GESPREKSLEIDRAAD
// ========================================
function generateGespreksleidraad() {
  const c = [];

  // Title
  c.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Gespreksleidraad")] }));
  c.push(p("Meeting Woensdag 11 Februari 2026", { bold: true }));
  c.push(gap());
  c.push(p([{ text: "Tijd: ", bold: true }, { text: "12:30 uur" }]));
  c.push(p([{ text: "Locatie: ", bold: true }, { text: "Van der Meer Accountants & Consultants, Venekoterweg 44, 8431 HH Oosterwolde (kantoor Grady Hofstra)" }]));
  c.push(p([{ text: "Context: ", bold: true }, { text: "Eerste ontmoeting na stopzetting financiering (6 feb 2026)" }]));
  c.push(p([{ text: "Doel Peter: ", bold: true }, { text: "Positie beschermen, geen toezeggingen doen, feiten laten spreken" }]));
  c.push(hr());

  // 0. Voorbereiding
  c.push(h1("0. Voorbereiding"));
  c.push(h2("Let op: Grady Hofstra is NIET neutraal"));
  c.push(p("Grady is Douwine\u2019s accountant en adviseur. Hij is geen mediator. Behandel alles wat in deze meeting wordt gezegd alsof het in een juridische procedure kan worden gebruikt \u2014 want dat kan."));

  c.push(h2("Marlou spreekt met Douwine\u2019s stem"));
  c.push(p("Douwine\u2019s bevestigingsmail is gericht aan \u201CMarlou en Peter\u201D \u2014 Marlou zit er dus bij. Marlou is formeel aandeelhouder (66,7% via overdracht Freca), maar feitelijk stroman en werknemer van Douwine. Alles wat Marlou zegt, komt van Douwine. Behandel haar bijdragen als Douwine\u2019s positie. Verwacht niet dat zij een onafhankelijke positie inneemt.", { bold: false }));
  c.push(p('Bij alles wat Marlou zegt, denk: "Dit is Douwine\u2019s boodschap via een andere mond."', { italics: true }));
  c.push(p("Niet corrigeren, niet confronteren \u2014 gewoon weten. Als Marlou iets toezegt of voorstelt, geldt hetzelfde als voor Douwine: niets toezeggen, alles meenemen."));

  c.push(h2("Grady is Douwine\u2019s adviseur \u2014 niet neutraal, niet objectief"));
  c.push(p("Grady Hofstra is Douwine\u2019s accountant, de meeting is op zijn kantoor, en het gesprek vindt plaats op Douwine\u2019s terrein. Dit is geen mediatie. Grady is een partijadviseur \u2014 zijn berekeningen, waarderingen en voorstellen dienen Douwine\u2019s belang."));
  c.push(p("Als Grady berekeningen, waarderingen of voorstellen presenteert alsof die objectief zijn:"));
  c.push(quote("Grady, je bent Douwine\u2019s adviseur. Ik neem je inbreng ter kennisgeving aan, maar voor objectieve waarderingen voorzien de statuten in drie onafhankelijke deskundigen."));
  c.push(p("Niet in discussie gaan over Grady\u2019s cijfers. Noteren, meenemen, later laten toetsen door Maud of een eigen adviseur."));

  c.push(h2("Opname melden"));
  c.push(quote("Ik neem dit gesprek op zodat ik er een gespreksverslag van kan maken. Dat verslag deel ik daarna met jullie."));
  c.push(p('Als Douwine/Grady bezwaar maakt: "Dan stel ik voor dat we beiden aantekeningen maken en achteraf een gespreksverslag opstellen." Niet onderhandelen over het recht om op te nemen \u2014 het is een feitelijke mededeling.'));
  c.push(hr());

  // 1. Peters kernpositie
  c.push(h1("1. Peters kernpositie (vooraf helder hebben)"));
  c.push(new Table({
    columnWidths: [2200, 3000, 4160],
    rows: [
      new TableRow({ tableHeader: true, children: [hCell("Punt", 2200), hCell("Positie", 3000), hCell("Toelichting", 4160)] }),
      new TableRow({ children: [cell("Ontslag bestuurder", 2200, { bold: true }), cell("1 maart 2026, staat vast", 3000), cell("Eenzijdige rechtshandeling, niet onderhandelbaar", 4160)] }),
      new TableRow({ children: [cell("Werkzaamheden na 1 maart", 2200, { bold: true }), cell("Nul, tenzij compensatie", 3000), cell("Geen gratis werk, geen KTLO, geen feature-ontwikkeling", 4160)] }),
      new TableRow({ children: [cell("KTLO", 2200, { bold: true }), cell("Alleen met faire compensatie", 3000), cell("Markttarief \u20AC125/uur, alleen na schriftelijke overeenkomst", 4160)] }),
      new TableRow({ children: [cell("Leveranciersvoorstel", 2200, { bold: true }), cell("Niet aan de orde", 3000), cell("Voorstel van \u20AC62,50/uur is van tafel", 4160)] }),
      new TableRow({ children: [cell("Aandeelhouderschap", 2200, { bold: true }), cell("Peter blijft aandeelhouder", 3000), cell("Vetorecht (Art. 8.6 lid 2) op alle AVA-besluiten", 4160)] }),
      new TableRow({ children: [cell("Doel", 2200, { bold: true }), cell("Volledige exit uit Dinck", 3000), cell("Overdracht aandelen tegen faire waarde", 4160)] }),
    ]
  }));
  c.push(hr());

  // 2. Agenda Peter
  c.push(h1("2. Agenda Peter \u2014 wat hij aan de orde wil stellen"));

  // 2a
  c.push(h2("2a. Financiering stopgezet \u2014 gevolgen voor werknemers"));
  c.push(quote("In jouw mail van 6 februari schrijf je dat de financiering per direct stopt. Dinck heeft werknemers in dienst. De salarissen werden tot nu toe gefinancierd door stortingen vanuit VDenD. Hoe worden de werknemers nu betaald?"));
  c.push(p("Verwachte reacties en counters:", { bold: true }));
  c.push(table2(["Douwine zegt", "Peter antwoordt"], [
    ['"Dat lossen we wel op"', '"Graag concreet. Wanneer en hoe? De werknemers hebben recht op zekerheid."'],
    ['"Dinck moet eigen omzet genereren"', '"De ARR is \u20AC6.400 per jaar. Dat is onvoldoende voor \u00E9\u00E9n maand salaris."'],
    ['"Dat is ook jouw verantwoordelijkheid als bestuurder"', '"Daarom heb ik de risico\u2019s schriftelijk gesignaleerd in mijn brief van 8 februari. Wat is jouw voorstel om dit op te lossen?"'],
  ]));
  c.push(p("Werknemers informeren \u2014 als dit ter sprake komt:", { bold: true }));
  c.push(table2(["Douwine/Grady zegt", "Peter antwoordt"], [
    ['"Heb je de werknemers al ge\u00EFnformeerd?"', '"Ik heb de risico\u2019s als bestuurder gesignaleerd bij de AVA. Over de communicatie naar werknemers wil ik eerst juridisch advies, juist om zorgvuldig te handelen."'],
    ['"Jij moet de werknemers inlichten"', '"Die verantwoordelijkheid rust op het bestuur. Dat zijn wij beiden. Laten we dat samen en zorgvuldig doen."'],
  ]));
  c.push(p([{ text: "Kernpunt: ", bold: true }, { text: "Als de financiering niet hervat wordt en er geen alternatief is, kunnen de salarissen niet worden betaald. Bij onbetaalde lonen hebben werknemers het recht om het faillissement van Dinck aan te vragen. Het UWV vangt werknemers dan op via de loongarantieregeling." }]));
  c.push(p([{ text: "Achtergrondkennis (niet actief uitspreken tenzij Douwine zelf het faillissementsscenario op tafel legt): ", bold: true, italics: true }, { text: "Als de financiering gestopt blijft en er geen alternatieve inkomsten zijn, is faillissement onvermijdelijk. Werknemers worden via het UWV opgevangen. De vorderingen van Freca en VDenD zijn in dat geval concurrent \u2014 die worden vrijwel niets waard.", italics: true }]));

  // 2b
  c.push(h2("2b. Externe partij \u2014 informatierecht mede-bestuurder"));
  c.push(quote("In je mail van 6 februari noemde je een gesprek met een externe partij over mogelijke samenwerking. Dat gesprek was gisteren. Ik heb daar als mede-bestuurder geen informatie over ontvangen \u2014 ook niet na mijn schriftelijke verzoek van 8 februari. Wie is die partij, wat is er besproken, en zijn er toezeggingen gedaan?"));
  c.push(p("Verwachte reacties en counters:", { bold: true }));
  c.push(table2(["Douwine zegt", "Peter antwoordt"], [
    ['"Dat is vertrouwelijk"', '"Als mede-bestuurder heb ik recht op volledige informatie. Ik kan geen verantwoordelijkheid dragen voor beslissingen waar ik niet bij betrokken ben."'],
    ['"Het is nog verkennend"', '"Dat snap ik. Maar als bestuurder moet ik weten of er gesprekken lopen die de vennootschap raken. Wat is er dinsdag besproken?"'],
    ['"Dat gaat jou niet aan"', '"Zolang ik bestuurder ben, gaat alles wat Dinck raakt mij aan. Dat is geen keuze, dat is een wettelijke verplichting."'],
  ]));
  c.push(p([{ text: "Let op: ", bold: true }, { text: "Peters vetorecht (Art. 8.6 lid 2) blokkeert elke deal met een externe partij die AVA-goedkeuring vereist. Dat hoeft Peter niet te zeggen \u2014 maar het is de realiteit." }]));

  // 2d
  c.push(h2("2d. Concept akte teruglevering aandelen"));
  c.push(quote("Ik heb de concept akte voor de teruglevering van de aandelen ontvangen. Ik laat die beoordelen door mijn adviseur."));
  c.push(p("Niets meer zeggen. Niet inhoudelijk bespreken. Geen mening geven over tekenen of niet tekenen.", { bold: true }));
  c.push(p("Dit is een APART onderwerp van de externe partij (punt 2b). Niet vermengen."));
  c.push(p("Verwachte reacties en counters:", { bold: true }));
  c.push(table2(["Douwine/Grady zegt", "Peter antwoordt"], [
    ['"Het is een formaliteit"', '"Dan heeft mijn adviseur er snel naar gekeken. Ik kom schriftelijk terug."'],
    ['"Je hebt in november al afstand gedaan van je voorkeursrecht"', '"De concept akte spreekt voor zich. Ik laat het beoordelen door mijn adviseur."'],
    ['"De notaris wacht / de notaris heeft haast"', '"De akte is een concept. Ik neem de tijd die nodig is om het te laten beoordelen."'],
    ['"Grady heeft vastgesteld dat de prijs \u20AC1 is"', '"De statuten voorzien in waardering door drie onafhankelijke deskundigen."'],
    ['"Heb je het aandeelhoudersregister meegenomen?"', '"Nee. Het register wordt bijgewerkt als de akte is gepasseerd. We zijn nog niet zover."'],
    ['"Je moet tekenen als bestuurder van Dinck"', '"Ik heb de stukken ontvangen en laat ze beoordelen. Ik reageer schriftelijk."'],
    ['"Na 1 maart kun je niet meer tekenen als bestuurder"', '"Dat klopt. Reden te meer om dit zorgvuldig te beoordelen."'],
  ]));
  c.push(p("NIET bespreken:", { bold: true }));
  c.push(bullet("Of Peter gaat tekenen of niet"));
  c.push(bullet("De inhoud van de akte"));
  c.push(bullet("De koopprijs (\u20AC1 vs. \u20AC1,50)"));
  c.push(bullet("Het voorkeursrecht"));
  c.push(bullet("De SHA"));
  c.push(bullet("Wanneer Peter denkt te reageren"));

  // 2c
  c.push(h2("2c. Aflossing 28 maart 2026"));
  c.push(quote("Op 28 maart is de eerste aflossing verschuldigd aan Freca. Op basis van het huidige saldo gaat het om \u20AC55.000 tot \u20AC75.000. Hoe gaat Dinck dit betalen?"));
  c.push(p("Verwachte reacties:", { bold: true }));
  c.push(table2(["Douwine zegt", "Peter antwoordt"], [
    ['"Freca zal niet opeisen"', '"Fijn om te horen. Kun je dat schriftelijk bevestigen, inclusief uitstelafspraak?"'],
    ['"Dat bespreken we later"', '"De termijn is over 6 weken. Automatisch verzuim treedt in zonder ingebrekestelling. Dit vergt nu een oplossing."'],
    ['"Jij hebt het addendum ook getekend"', '"Klopt. Maar Dinck kan het niet betalen. Dat is een feit, ongeacht wie het tekende."'],
  ]));
  c.push(hr());

  // 3. DE GOUDEN REGEL
  c.push(h1("3. DE GOUDEN REGEL: Nergens aan committen"));
  c.push(p("Doel van deze meeting is LUISTEREN, niet BESLISSEN.", { bold: true }));
  c.push(p("Peter gaat naar huis met informatie, niet met verplichtingen. Elk voorstel \u2014 hoe redelijk het ook klinkt \u2014 gaat eerst langs Maud. Geen uitzonderingen."));
  c.push(p("Onthoud: Marlou = Douwine\u2019s stem. Grady = Douwine\u2019s adviseur. Jij bent de enige in de kamer die jouw belang dient.", { bold: true }));

  c.push(h3("Wat Peter NIET zegt of toezegt"));
  c.push(new Table({
    columnWidths: [4500, 4860],
    rows: [
      new TableRow({ tableHeader: true, children: [hCell("Absoluut niet", 4500), hCell("Reden", 4860)] }),
      new TableRow({ children: [cell("Iets inhoudelijks over de concept akte teruglevering", 4500), cell("De akte is Peters sterkste nieuwe hefboom \u2014 niets onthullen", 4860)] }),
      new TableRow({ children: [cell("Of hij gaat tekenen of niet tekenen", 4500), cell("Elke uitspraak hierover verzwakt zijn positie", 4860)] }),
      new TableRow({ children: [cell("Iets over het voorkeursrecht of de SHA", 4500), cell('Niet het woord "aandeelhoudersovereenkomst" uitspreken', 4860)] }),
      new TableRow({ children: [cell("Toezegging tot werk na 1 maart (gratis of tegen korting)", 4500), cell("Vernietigt alle leverage", 4860)] }),
      new TableRow({ children: [cell("Accepteren van aansprakelijkheid", 4500), cell("Geen juridische grondslag; buitengesloten van besluitvorming", 4860)] }),
      new TableRow({ children: [cell("Concessies over ontslagdatum", 4500), cell("Non-negotiable, al gecommuniceerd", 4860)] }),
      new TableRow({ children: [cell("Mening geven over waarde Dinck / aandelen", 4500), cell("Statuten voorzien in waardering door 3 deskundigen", 4860)] }),
      new TableRow({ children: [cell("Instemming onder druk", 4500), cell('"Ik ga dit bespreken met mijn adviseur en kom er schriftelijk op terug"', 4860)] }),
      new TableRow({ children: [cell("Dreigen met faillissement", 4500), cell("Niet nodig \u2014 de feiten spreken voor zich", 4860)] }),
      new TableRow({ children: [cell('Oordeel over Douwine\u2019s "tegenslag" bij VDenD', 4500), cell("Op face value nemen, geen speculatie", 4860)] }),
      new TableRow({ children: [cell("Reageren op provocaties of beschuldigingen", 4500), cell('"Dat is jouw interpretatie. Ik houd me aan de feiten."', 4860)] }),
      new TableRow({ children: [cell('Akkoord gaan met "we spreken af dat..."', 4500), cell("Alles schriftelijk, alles via adviseur", 4860)] }),
    ]
  }));
  c.push(hr());

  // 4. De veiligheidsclausule
  c.push(h1("4. De veiligheidsclausule"));
  c.push(p("Als er IETS wordt voorgesteld dat Peter niet direct kan beoordelen:"));
  c.push(quote("Dat klinkt als iets dat ik eerst met mijn adviseur wil bespreken. Ik kom er schriftelijk op terug."));
  c.push(p("Dit geldt voor:"));
  c.push(bullet("Elk voorstel over aandelenoverdracht"));
  c.push(bullet("Elk voorstel over werkzaamheden / KTLO"));
  c.push(bullet("Elk voorstel over de leningsovereenkomst"));
  c.push(bullet('Elke constructie met de "externe partij"'));
  c.push(bullet("Alles wat aansprakelijkheid impliceert"));
  c.push(p("Niets ondertekenen. Niets mondeling toezeggen. Alles schriftelijk.", { bold: true }));

  c.push(h3("Als Douwine/Grady met een concreet voorstel komt"));
  c.push(p("Niet reageren, maar informatie verzamelen. Stel deze vragen:"));
  c.push(num('"Kun je dat op papier zetten zodat ik het kan laten toetsen?"'));
  c.push(num('"Wat is de tijdlijn die je voor ogen hebt?"'));
  c.push(num('"Wie is de externe partij en wat is hun rol precies?"'));
  c.push(num('"Hoe wordt de waarde van de aandelen / het platform daarin bepaald?"'));
  c.push(num('"Wat gebeurt er met de leningsovereenkomst in dit scenario?"'));
  c.push(num('"Wat gebeurt er met de werknemers?"'));
  c.push(p("Luisteren, noteren, niets toezeggen. Elk voorstel gaat eerst langs Maud.", { bold: true }));

  // Grady voorstel/transitieplan
  c.push(h2("Als Grady met een voorstel of transitieplan komt"));
  c.push(p("Dit is het meest waarschijnlijke scenario. Grady heeft de meeting georganiseerd, het is zijn kantoor, en hij heeft iets voorbereid. Verwacht een schriftelijk document \u2014 een \u201Cvoorstel\u201D, \u201Ctransitieplan\u201D, \u201Coverzicht\u201D, of \u201Csamenvatting van afspraken\u201D."));
  c.push(p("Kernregel: NIET doorlezen. NIET reageren op specifieke punten. NIET vragen stellen over de inhoud.", { bold: true }));
  c.push(quote("Dank je, Grady. Ik neem dit mee en laat het beoordelen door mijn adviseur. Ik reageer schriftelijk."));
  c.push(p("Handelwijze:", { bold: true }));
  c.push(num("Document aannemen"));
  c.push(num("In de tas \u2014 niet openen, niet doorlezen in de meeting"));
  c.push(num("Geen inhoudelijke reactie, geen vragen"));
  c.push(num("Later laten beoordelen door Maud"));
  c.push(p("Counter-tabel voor typische drukzinnen:", { bold: true }));
  c.push(table2(["Grady/Douwine zegt", "Peter antwoordt"], [
    ['"Teken hier even"', '"Ik onderteken niets zonder juridisch advies."'],
    ['"Dit is redelijk, je hoeft alleen maar..."', '"Hoe redelijker het klinkt, hoe belangrijker dat mijn adviseur het beoordeelt."'],
    ['"We moeten dit nu beslissen"', '"Als het zo urgent is, dan is het ook urgent genoeg om het goed te beoordelen."'],
    ['"Dit is alleen een samenvatting van wat we al besproken hebben"', '"Dan is er geen haast. Ik laat het toetsen."'],
    ['"De notaris wacht hierop"', '"De notaris kan wachten tot ik juridisch advies heb."'],
    ['"Na 1 maart wordt het ingewikkelder"', '"Reden te meer om nu niets te overhaasten."'],
    ['"Grady heeft dit objectief opgesteld"', '"Grady, je bent Douwine\u2019s adviseur. Ik laat het toetsen door mijn eigen adviseur."'],
  ]));
  c.push(p('Expliciete instructie: NIET ondertekenen. NIET mondeling akkoord geven. NIET zeggen "dat klinkt redelijk" of "daar kan ik mee leven". Alles gaat mee naar huis.', { bold: true }));
  c.push(hr());

  // 5. Verwachte druk en tactieken
  c.push(h1("5. Verwachte druk en tactieken"));

  c.push(h3('"Je hebt een zorgplicht als bestuurder"'));
  c.push(quote("Correct. Daarom heb ik de risico\u2019s schriftelijk gesignaleerd. Mijn zorgplicht eindigt per 1 maart."));

  c.push(h3('"Als jij stopt gaat Dinck failliet"'));
  c.push(quote("De financiering is niet gestopt door mij, maar door jou. Het faillissementsrisico is het gevolg van het stopzetten van de financiering, niet van mijn aftreden."));

  c.push(h3('"Jij bent medeverantwoordelijk voor de schulden"'));
  c.push(quote("PHBX is aandeelhouder, niet hoofdelijk aansprakelijk voor BV-schulden. Dat is het hele punt van een B.V."));

  c.push(h3('"We moeten dit samen oplossen"'));
  c.push(quote("Daar sta ik voor open. Maar \u2018samen oplossen\u2019 betekent niet \u2018Peter werkt gratis\u2019. Ik ben bereid om KTLO te bespreken, maar alleen op basis van faire compensatie."));

  c.push(h3('"Grady heeft berekend dat de aandelen niets waard zijn"'));
  c.push(quote("De statuten voorzien in waardering door drie onafhankelijke deskundigen bij geen overeenstemming. E\u00E9n partijadviseur is geen objectieve waardering."));

  c.push(h3('"Ik heb een tegenslag in mijn eigen onderneming, ik kan niet anders"'));
  c.push(quote("Dat is vervelend om te horen. Maar de verplichtingen van Dinck jegens haar werknemers bestaan onafhankelijk van de situatie bij VDenD. De vraag blijft: hoe worden de salarissen betaald?"));
  c.push(p("Niet doorvragen naar de aard van de tegenslag. Op face value nemen. De focus terugbrengen naar Dinck\u2019s verplichtingen."));

  c.push(h3("Marlou neemt het woord / doet een voorstel"));
  c.push(p("Marlou kan worden ingezet om voorstellen \u201Czachter\u201D te laten klinken of om te doen alsof er een onafhankelijke stem is. Onthoud: zij spreekt met Douwine\u2019s stem."));
  c.push(p("Luisteren, noteren, niet inhoudelijk reageren. Behandel het als Douwine\u2019s voorstel."));
  c.push(p("Als Marlou iets toezegt namens de AVA:"));
  c.push(quote("Dat is goed om te horen. Ik wil het graag schriftelijk ontvangen zodat ik het kan laten toetsen."));

  // NEW: Externe partij scenario
  c.push(h2("Externe partij stelt Peter\u2019s betrokkenheid als voorwaarde"));
  c.push(p([{ text: "Het scenario: ", bold: true }, { text: 'Douwine presenteert het alsof de externe partij wil dat Peter blijft werken, binnenboord blijft, of gratis KTLO blijft doen als voorwaarde voor de samenwerking. Als Peter weigert, is het "zijn schuld" dat de deal niet doorgaat en de werknemers hun baan verliezen.' }]));
  c.push(p([{ text: "Waarom dit scenario waarschijnlijk is: ", bold: true }, { text: "Douwine weet dat het platform zonder Peter niet werkt. Een externe partij die dat ook ziet, zal continu\u00EFteit eisen. Douwine zal dit framen als Peters verantwoordelijkheid \u2014 niet als bewijs van Peters waarde." }]));
  c.push(p("De omdenking:", { bold: true }));
  c.push(num("Peter\u2019s werk is essentieel \u2014 dat rechtvaardigt compensatie, niet gratis arbeid"));
  c.push(num("Peter had bij de gesprekken betrokken moeten worden \u2014 dat is niet gebeurd"));
  c.push(num("Voorwaarden die zonder Peter zijn afgesproken, binden Peter niet"));
  c.push(p("Verwachte drukzinnen en counters:", { bold: true }));
  c.push(table2(["Douwine/Grady zegt", "Peter antwoordt"], [
    ['"De externe partij wil dat jij erbij blijft"', '"Dan had ik bij die gesprekken betrokken moeten worden. Ik hoor dit nu voor het eerst."'],
    ['"Als jij stopt gaat deze deal niet door"', '"Ik ben buitengesloten van die gesprekken. Ik kan geen verantwoordelijkheid nemen voor voorwaarden die zonder mij zijn afgesproken."'],
    ['"Je laat de werknemers in de steek als je dit niet doet"', '"De financiering is gestopt door jou, niet door mij. En de werknemers zijn beschermd."'],
    ['"Je hoeft alleen maar door te gaan met wat je al deed"', '"Ik heb de afgelopen maanden fulltime gewerkt voor \u20AC0. \'Gewoon doorgaan\' is een voorwaarde die compensatie vereist."'],
    ['"Het is maar voor een overgangsperiode"', '"Graag concreet en schriftelijk \u2014 duur, scope, compensatie. Ik bespreek het met mijn adviseur."'],
    ['"Dit is de enige manier om Dinck te redden"', '"Als mijn werk essentieel is voor het voortbestaan van Dinck, dan is faire compensatie daarvoor ook essentieel."'],
    ['"Je bent ego\u00EFstisch / je denkt alleen aan jezelf"', '"Ik heb 3 maanden fulltime gewerkt zonder vergoeding. Ik vraag om een faire regeling. Dat is niet ego\u00EFstisch."'],
  ]));
  c.push(p("Peters kernzin voor dit scenario:", { bold: true }));
  c.push(quote("Als mijn betrokkenheid een voorwaarde is van deze samenwerking, dan praten we over een schriftelijke overeenkomst met faire compensatie. Dat bespreek ik met mijn adviseur."));
  c.push(p("Belangrijk \u2014 niet in de val trappen:", { bold: true }));
  c.push(bullet('NIET "ja" of "ik wil best meewerken" zeggen \u2014 dat is een toezegging die later tegen je wordt gebruikt'));
  c.push(bullet('NIET "nee, ik doe het niet" zeggen \u2014 dat geeft Douwine het narratief "Peter heeft de deal geblokkeerd"'));
  c.push(bullet("NIET schuld accepteren voor het niet-doorgaan van een deal waar je buiten bent gehouden"));
  c.push(bullet("WEL doorverwijzen naar je adviseur, WEL aangeven dat compensatie een voorwaarde is"));

  c.push(h3("Emotionele druk / beschuldigingen"));
  c.push(quote("Ik begrijp dat dit een moeilijke situatie is. Ik wil dit zakelijk en constructief oplossen. Laten we bij de feiten blijven."));
  c.push(hr());

  // 6. Peters positie van kracht
  c.push(h1("6. Peters positie van kracht samengevat"));
  c.push(p("Voor eigen referentie \u2014 niet uitspreken tenzij nodig. Dit is waarom je sterk zit:", { bold: true }));
  c.push(new Table({
    columnWidths: [3800, 5560],
    rows: [
      new TableRow({ tableHeader: true, children: [hCell("Drukmiddel", 3800), hCell("Status", 5560)] }),
      new TableRow({ children: [cell("Vetorecht (Art. 8.6 lid 2)", 3800, { bold: true }), cell("Blokkeert elke AVA-beslissing \u2014 geen deal met externe partij zonder jou", 5560)] }),
      new TableRow({ children: [cell("Platformafhankelijkheid", 3800, { bold: true }), cell("Vervangingskosten \u20AC250-350K, alleen Peter kan het onderhouden", 5560)] }),
      new TableRow({ children: [cell("13 gedocumenteerde uitsluitingsincidenten", 3800, { bold: true }), cell("Grondslag Art. 2:343 (uittreding vorderen), escalerend patroon", 5560)] }),
      new TableRow({ children: [cell("Brief financi\u00EBle zorgen", 3800, { bold: true }), cell("Signaleerplicht vervuld \u2014 je bent een diligente bestuurder", 5560)] }),
      new TableRow({ children: [cell("Ongerechtvaardigde verrijking", 3800, { bold: true }), cell("\u20AC108-180K aan onbetaald werk", 5560)] }),
      new TableRow({ children: [cell("MO niet opgezegd", 3800, { bold: true }), cell("Vrijwaring (Art. 4.2) nog actief, recht op opschorting (Art. 6:262 BW)", 5560)] }),
      new TableRow({ children: [cell("SHA slapend \u2014 beheersbaar risico", 3800, { bold: true }), cell("Peter heeft 3 verdedigingslagen (Art. 1.2 + Art. 9 tegenvordering + Art. 6:248 lid 2 BW). Niet uitspreken, wel weten.", 5560)] }),
      new TableRow({ children: [cell("Art. 3.1 schending", 3800, { bold: true }), cell("Formeel alleen PHBX\u2019s fee gewijzigd \u2014 ongelijke behandeling", 5560)] }),
      new TableRow({ children: [cell("Tegenstrijdig belang bewezen", 3800, { bold: true }), cell("Douwine\u2019s eigen handeling (financiering gestopt) bewijst het", 5560)] }),
      new TableRow({ children: [cell("Constateringsbrief 10 feb", 3800, { bold: true }), cell("Non-response Douwine op informatieverzoek = bewijs Art. 2:9 BW schending", 5560)] }),
      new TableRow({ children: [cell("Asymmetrie bij faillissement", 3800, { bold: true }), cell("Douwine verliest ~\u20AC612K, Peter verliest twijfelachtige equity", 5560)] }),
    ]
  }));
  c.push(hr());

  // 7. Afsluiting
  c.push(h1("7. Afsluiting meeting"));
  c.push(h3("Als er constructief gepraat is"));
  c.push(quote("Bedankt voor het gesprek. Ik vat samen wat we besproken hebben: [samenvatten]. Ik kom schriftelijk terug op [openstaande punten]. Ik stel voor dat we beiden een gespreksverslag opstellen."));
  c.push(h3("Als er geen voortgang is"));
  c.push(quote("Ik constateer dat we er vandaag niet uitkomen. Mijn positie is helder: ik treed af per 1 maart, ik ben bereid om over KTLO te praten op basis van compensatie, en ik verwacht ge\u00EFnformeerd te worden over beslissingen die Dinck raken. Laten we een vervolgmoment plannen."));
  c.push(h3("Bij onacceptabele druk"));
  c.push(quote("Ik merk dat dit gesprek niet productief is. Ik stel voor dat we dit schriftelijk voortzetten, eventueel via onze adviseurs."));
  c.push(p("Opstaan en vertrekken is altijd een optie. Beter geen gesprek dan een gesprek waar toezeggingen onder druk worden gedaan.", { bold: true }));
  c.push(hr());

  // 8. Checklist
  c.push(h1("8. Checklist voorbereiding"));
  c.push(bullet("Brief financi\u00EBle zorgen verzonden (8 februari 2026)", { ref: "checked-list" }));
  c.push(bullet("Constatering informatierecht verzonden (10 februari 2026)", { ref: "checked-list" }));
  c.push(bullet("Opname-app getest en opgeladen", { ref: "checkbox-list" }));
  c.push(bullet([{ text: "Juridisch advies Maud ontvangen \u2014 ", bold: false }, { text: "Geen reactie ontvangen. Extra voorzichtigheid: niets toezeggen, alles via adviseur.", bold: true }], { ref: "checkbox-list" }));
  c.push(bullet("Telefoon + opname-app klaar", { ref: "checkbox-list" }));
  c.push(bullet("Dit document doorgelezen", { ref: "checkbox-list" }));
  c.push(bullet("Worst-case scenarios doorgenomen", { ref: "checkbox-list" }));
  c.push(bullet("Concept akte analyse doorgenomen", { ref: "checkbox-list" }));
  c.push(bullet("Dossier-uittreding.md key facts paraat", { ref: "checkbox-list" }));
  c.push(bullet("Kalm en zakelijk instelling \u2014 laat Douwine de emotionele kant doen", { ref: "checkbox-list" }));
  c.push(bullet("NIET het aandeelhoudersregister meenemen naar Grady\u2019s kantoor", { ref: "checkbox-list", bold: true }));
  c.push(hr());

  // 9. Na de meeting
  c.push(h1("9. Na de meeting"));
  c.push(bullet("Gespreksverslag opstellen (op basis van opname)", { ref: "checkbox-list" }));
  c.push(bullet("Gespreksverslag delen met Douwine/Grady", { ref: "checkbox-list" }));
  c.push(bullet('Eventuele toezeggingen schriftelijk bevestigen ("Ter bevestiging van ons gesprek van woensdag...")', { ref: "checkbox-list" }));
  c.push(bullet("Bijzonderheden melden aan Maud", { ref: "checkbox-list" }));
  c.push(bullet("Dossier bijwerken", { ref: "checkbox-list" }));

  return new Document({ styles: docStyles, numbering: bulletConfig, sections: [{ properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } }, children: c }] });
}

// ========================================
// MAIN
// ========================================
async function main() {
  const cheatsheet = generateCheatsheet();
  const gespreksleidraad = generateGespreksleidraad();

  const buf1 = await Packer.toBuffer(cheatsheet);
  fs.writeFileSync("/home/peter/dinck-legal/artifacts/Meeting_Cheatsheet_11Feb.docx", buf1);
  console.log("Generated: Meeting_Cheatsheet_11Feb.docx");

  const buf2 = await Packer.toBuffer(gespreksleidraad);
  fs.writeFileSync("/home/peter/dinck-legal/artifacts/Gespreksleidraad_11Feb.docx", buf2);
  console.log("Generated: Gespreksleidraad_11Feb.docx");
}

main().catch(console.error);
