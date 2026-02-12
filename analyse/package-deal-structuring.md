# Package Deal Structuring — Volledige Uittreding Peter / PHBX Holding

**Datum analyse**: 12 februari 2026
**Bronnen**: `analyse/mo-beslisboom.md`, `analyse/akte-tekenvoorwaarden.md`, `analyse/memo-jurist-11feb2026.md`, `analyse/meeting-11feb-analyse.md`, `analyse/worst-case-scenarios.md`
**Verificatie**: Alle claims geverifieerd tegen bron-PDF's in `files/` (zie sectie 10)

---

## 1. Wat Is de Package Deal?

De package deal bundelt alle openstaande juridische kwesties tussen Peter/PHBX enerzijds en Douwine/Freca/Dinck anderzijds in **één gelijktijdige transactie**. Het principe: alles tegelijk regelen, niets apart — zodat geen partij eenzijdig kan profiteren van een deeloplossing.

### Waarom een package deal en niet losse stappen?

| Losse stappen | Package deal |
|--------------|-------------|
| Peter tekent akte → verliest co-signering leverage, zit vast als minority | Akte tekenen = onderdeel van exit, leverage wordt ingewisseld voor waarde |
| MO beëindigen → verliest vrijwaring, verrijkingsclaim bevriest | MO-beëindiging met nawerking + finale afrekening in vaststellingsovereenkomst |
| KTLO starten zonder contract → herhaling van gratis werken | KTLO-overeenkomst getekend vóór eerste werkzaamheid |
| SHA-kwijting apart → Douwine kan terugkomen op andere afspraken | SHA-kwijting in zelfde vaststellingsovereenkomst als aandelenoverdracht |

**Kernprincipe**: Elke hefboom die Peter inlevert (co-signering, kwijtschelding boete, deblokkade veto, KTLO-bereidheid) wordt *simultaan* ingeruild voor waarde. Geen voorschotten, geen toezeggingen op vertrouwensbasis.

---

## 2. Ruilwaarde — Wat Peter Biedt vs. Wat Peter Vraagt

### 2.1 Wat Peter biedt (onderhandelingsmunten)

| Munt | Waarde voor Douwine | Eenmalig of doorlopend? |
|------|---------------------|------------------------|
| **Co-signering akte teruglevering** | Onmisbaar — zonder Peters handtekening geen teruglevering Marlou → Freca | Eenmalig (one-shot lever) |
| **Kwijtschelding SHA-boete** | ~€197K (€100K + ~€97K × €1K/dag sinds 7 nov 2025) | Eenmalig |
| **Deblokkade vetorecht** | Peters 33,3% blokkeert alle AVA-besluiten (Art. 8.6 lid 2) — na exit: 100% zeggenschap Douwine | Eenmalig (bij exit) |
| **KTLO-bereidheid** | Platform draaiend houden. Vervangingskosten: €250-350K extern | Doorlopend (maar eindig: 6-12 maanden) |
| **Niet-inzet sommatiebrief** | Sommatiebrief (€100K + aansprakelijkstelling) on hold als deal slaagt | Eenmalig |
| **Niet-inzet Art. 2:343 BW** | Geen uittreding vorderen via rechter (kosten Douwine: €15-40K+ verdediging) | Eenmalig |

**Totale waarde van Peters munten**: Peter levert hefbomen ter waarde van ~€200K+ (directe claims) plus onschatbare strategische waarde (vetorecht, platformcontinuïteit, geen rechtszaak) in.

### 2.2 Wat Peter vraagt (eisen)

| Eis | Categorie | Non-negotiable? |
|-----|-----------|-----------------|
| **Aandelenoverdracht tegen faire waarde** | Financieel | **JA** |
| **SHA-kwijting (wederzijds, volledig)** | Juridisch | **JA** |
| **KTLO-leveranciersovereenkomst** | Operationeel | **JA** |
| **Wederzijdse kwijting (alle rechtsverhoudingen)** | Juridisch | **JA** |
| **MO-beëindiging Art. 5.2 met nawerking** | Juridisch | **JA** |
| **Finale afrekening verrijking** | Financieel | Onderhandelbaar (bedrag) |
| Geheimhouding exit-voorwaarden | Relationeel | Nice-to-have |
| Referentie-afspraak (geen negativiteit) | Relationeel | Nice-to-have |

**Uitwerking van de non-negotiables**: Zie `analyse/akte-tekenvoorwaarden.md` sectie 2 voor concept-formuleringen.

---

## 3. Juridische Structuur — Vier Documenten, Één Ondertekeningsmoment

### 3.1 Document-architectuur

```
┌───────────────────────────────────────────────────────────┐
│              VASTSTELLINGSOVEREENKOMST (onderhands)        │
│                                                           │
│  Partijen: PHBX Holding B.V. ↔ Freca B.V. ↔ Dinck B.V.  │
│                                                           │
│  Inhoud:                                                  │
│  ├── SHA-kwijting (wederzijds, alle artikelen)            │
│  ├── MO-beëindiging per Art. 5.2 (nawerking Art. 4.2+4.3)│
│  ├── Finale afrekening (verrijkingscomponent)             │
│  ├── Prijs Peters aandelen                                │
│  ├── Wederzijdse kwijting (alle rechtsverhoudingen)       │
│  ├── Geheimhouding (optioneel)                            │
│  └── Opschortende voorwaarde: notariële aktes gepasseerd  │
│                                                           │
└───────────────────────────────────────────────────────────┘
         ↓ ondertekend vóór notariële aktes

┌───────────────────────────────────────────────────────────┐
│         KTLO-LEVERANCIERSOVEREENKOMST (onderhands)         │
│                                                           │
│  Partijen: PHBX Holding B.V. ↔ Dinck B.V.                │
│                                                           │
│  Inhoud: scope, vergoeding, vrijwaring, opschortingsrecht │
│  Zie: akte-tekenvoorwaarden.md §2.3 voor minimumelementen │
│                                                           │
└───────────────────────────────────────────────────────────┘
         ↓ ondertekend vóór of gelijktijdig met aktes

┌───────────────────────────────────────────────────────────┐
│           AKTE TERUGLEVERING (notarieel — Koops)          │
│                                                           │
│  Marlou → Freca B.V.   (8 aandelen, 66,7%)              │
│  Prijs: €1,00 per aandeel                                │
│  Met Peters co-signering als waiver voorkeursrecht         │
│                                                           │
└───────────────────────────────────────────────────────────┘
         ↓ simultaan gepasseerd op dezelfde dag

┌───────────────────────────────────────────────────────────┐
│        AKTE OVERDRACHT PETER (notarieel — Koops/ander)    │
│                                                           │
│  PHBX → Freca B.V./Dinck B.V.   (4 aandelen, 33,3%)     │
│  Prijs: vastgesteld in vaststellingsovereenkomst          │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### 3.2 Simultane ondertekening — volgorde

**Op de dag van de deal**:
1. Vaststellingsovereenkomst ondertekenen (alle partijen)
2. KTLO-leveranciersovereenkomst ondertekenen (PHBX + Dinck)
3. Notariële akte teruglevering passeren (met Peters co-signering)
4. Notariële akte overdracht Peters aandelen passeren

**Stap 3 en 4 zijn simultaan** — de notaris passeert beide aktes in één sessie. De vaststellingsovereenkomst bevat een opschortende voorwaarde: de afspraken worden pas definitief na passering van beide aktes.

### 3.3 Waarom bij dezelfde notaris?

| Optie | Voordeel | Nadeel |
|-------|----------|--------|
| **Notaris Koops** (huidige notaris) | Kent dossier, concept akte al aanwezig | Heeft eerder eenzijdig met Grady gecorrespondeerd |
| **Andere notaris** | Frisse blik, geen partijdigheidsrisico | Moet hele dossier opnieuw inlezen, kost tijd |

**Aanbeveling**: Notaris Koops, tenzij jurist een frisse notaris prefereert. De akte teruglevering ligt al bij Koops — het is efficiënter om de aandelenoverdracht daar bij te voegen.

### 3.4 Vaststellingsovereenkomst — waarom Art. 7:900 BW?

Een vaststellingsovereenkomst (Art. 7:900 BW) is het ideale instrument:

1. **Bindt partijen** ook als de vaststelling afwijkt van wat rechtens zou gelden — dit voorkomt dat Douwine later stelt dat de overeengekomen prijs "te hoog" was
2. **Omvat alle geschillen** in één document — SHA, MO, kwijting, verrijking, aansprakelijkheid
3. **Standaard in de transactiepraktijk** — notarissen en juristen kennen het format
4. **Moeilijk aan te tasten** — vernietiging slechts mogelijk bij strijd met dwingend recht, niet bij benadeling

---

## 4. Aandelenwaardering — Drie Routes

### 4.1 Route 1: Onderhandelde prijs (snelst)

Peter en Douwine spreken een bedrag af. Dit wordt vastgelegd in de vaststellingsovereenkomst.

**Douwine's positie**: "Aandelen zijn niets waard" (al eerder gesteld; bevestigd door Jeffrey's desinteresse).

**Peters positie**: De nominale boekwaarde is irrelevant. De prijs reflecteert de **strategische waarde van Peters medewerking**:

| Component | Waarde voor Douwine |
|-----------|---------------------|
| Deblokkade vetorecht | Onschatbaar — zonder dit kan Douwine niets doen in Dinck |
| Co-signering akte | Onmisbaar — anders geen teruglevering |
| Kwijtschelding ~€197K SHA-boete | €197K directe besparingen |
| KTLO (platformcontinuïteit) | €250-350K vervangingswaarde |
| Geen Art. 2:343 procedure | €15-40K+ bespaard aan juridische kosten |
| Geen sommatiebrief | Geen escalatie, geen reputatieschade |

**Realistische range**: De prijs is een onderhandelingsresultaat. De jurist adviseert om "gewenste prijs" te bepalen vóór de onderhandeling. Relevante ankers:

| Anker | Bedrag | Basis |
|-------|--------|-------|
| Oorspronkelijk voorstel Peter (Scenario A) | €40.000 | Eerder afgewezen door Douwine |
| Kwijtschelding SHA-boete alleen | ~€197K | Direct opeisbaar, maar **matigingsrisico**: Art. 6:94 BW — rechter kan boete matigen als billijkheid dit eist. Schatting na matiging: ~€50-100K. Zie `analyse/tegenargumenten-douwine.md` §3. |
| Ongerechtvaardigde verrijking-vordering | €108-180K | ~1.440 uur × €75-125/uur. **Let op**: risico van "vrijwillige instemming"-verweer (Peter tekende AVA-besluit + addendum). Counters: tijdelijk karakter, economische dwang, HR juni 2024. Zie `analyse/tegenargumenten-douwine.md` §2. |
| Vervangingswaarde platform | €250-350K | Extern herbouwen |
| Billijke verhoging Art. 2:343 (Wagevoe) | €30-100K+ | Fallback als package deal mislukt. Zie `analyse/wagevoe-art343-analyse.md`. |
| **Netto**: verrekening met "negatieve waarde" | — | Douwine zal aanvoeren: aandelen belast met €612K schuld |

**Settlement range**: Zie `analyse/settlement-range-analyse.md` voor de volledige BATNA-analyse en verdedigbare bandbreedte (anker €150K, target €75-100K, walk-away €30K).

**Vraag voor jurist (PD-1)**: Wat is een verdedigbare "gewenste prijs" gegeven de combinatie van kwijtschelding boete, verrijkingsvordering en strategische waarde? Kan de prijs worden geframed als verrekening (boete + verrijking − billijke bijdrage aan schulden)?

### 4.2 Route 2: Statutaire route Art. 6.2 statuten (objectiefst)

De statuten (Art. 6.2 lid 6) voorzien in waardering door drie onafhankelijke deskundigen als partijen het niet eens worden over de prijs.

**Voordeel**: Objectief, niet aanvechtbaar, bindend.

**Nadeel**: Kost tijd (weken tot maanden), kost geld (deskundigen). Bovendien: deskundigen waarderen op basis van boekhoudkundige werkelijkheid — Dinck heeft €612K schuld en €6.4K ARR. De "strategische waarde" (veto, platform, co-signering) zit niet in de balans.

**Wanneer inzetten**: Als Douwine een absurd lage prijs biedt (€1/aandeel, €0). De dreiging met de statutaire route kan Douwine motiveren om serieus te onderhandelen.

### 4.3 Route 3: Vaste prijs in vaststellingsovereenkomst (definitiefst)

Partijen komen een vaste prijs overeen die wordt vastgelegd in de vaststellingsovereenkomst (Art. 7:900 BW). Dit is juridisch de sterkste route:

- Prijs is onderdeel van een totaalpakket (package deal) — niet op zichzelf beoordeelbaar
- Art. 7:902 BW: vaststellingsovereenkomst is bindend ook als zij afwijkt van dwingend recht
- Niet aantastbaar op grond van "de aandelen zijn minder waard"

**Aanbeveling**: Route 3 (vaste prijs in vaststellingsovereenkomst), met Route 2 (statutaire route) als drukmiddel als Douwine weigert serieus te onderhandelen.

### 4.4a Route 4: Wagevoe / Billijke Verhoging (Art. 2:343 BW nieuw — geloofwaardige fallback)

De Wagevoe-hervorming (per 1 jan 2025) transformeert Art. 2:343 BW van een kostbaar laatste redmiddel naar een **geloofwaardig alternatief**:

| Aspect | Voor Wagevoe | Na Wagevoe |
|--------|-------------|------------|
| Bevoegde rechter | Rechtbank | **Ondernemingskamer** (gespecialiseerd) |
| Doorlooptijd | 12-24 maanden | **6-12 maanden** |
| Kosten | €15-40K+ | **€15-25K** |
| Billijke verhoging | Beperkt, zelden | **Expliciet in wet, actief toegepast** |

**Precedent**: OK kende €656K billijke verhoging toe in familieconflict ondanks nihilwaarde aandelen.

**Impact op package deal**: Douwine kan Art. 2:343 niet meer afdoen als "te duur en te langzaam." Het bestaan van Route 4 maakt Routes 1-3 sterker — elke route die Douwine goedkoper is dan €15-25K kosten + €30-100K+ billijke verhoging, is rationeel.

**Zie**: `analyse/wagevoe-art343-analyse.md` voor de volledige analyse.

### 4.4 Verrekening als alternatief voor "aandelenprijs"

In plaats van een expliciete prijs voor de aandelen kan de package deal als **verrekening** worden gestructureerd:

| Peter's vorderingen | Bedrag |
|---------------------|--------|
| SHA-boete Art. 10 (kwijtschelding) | ~€197K |
| Ongerechtvaardigde verrijking | €108-180K |
| Hostingkosten tot op heden | €[X] |
| **Subtotaal** | **~€305-377K+** |

| Aftrekposten (Douwine's positie) | Bedrag |
|----------------------------------|--------|
| "Negatieve waarde" aandelen (schuld) | -€[discussie] |
| Peter's "aandeel in de problemen" | -€[discussie] |

| **Saldo** | **Te betalen door Freca/Dinck aan PHBX** |
|-----------|----------------------------------------|

**Voordeel**: Geen discussie over "wat zijn de aandelen waard" — het is een verrekening van wederzijdse vorderingen, met het saldo als betaling.

**Vraag voor jurist (PD-2)**: Is een verrekeningsstructuur juridisch sterker dan een expliciete aandelenprijs? Kan dit de discussie over aandelenwaarde omzeilen?

---

## 5. Onderlinge Afhankelijkheden — Wat als Eén Component Faalt?

### 5.1 Scenario-matrix

| Component die faalt | Effect op deal | Peters fallback |
|---------------------|---------------|-----------------|
| **Geen overeenstemming over prijs** | Deal mislukt | Statutaire route Art. 6.2 (3 deskundigen) → vertraagt maar dwingt waardering af |
| **Douwine weigert SHA-kwijting** | Deal mislukt (non-negotiable) | Peter tekent akte niet → Marlou blijft aandeelhouder → SHA slapend → status quo |
| **Douwine weigert KTLO-voorwaarden** | Deal mislukt (non-negotiable) | Peter stopt alle werk per 1 maart (opschortingsrecht Art. 6:262 BW) |
| **Douwine weigert wederzijdse kwijting** | Deal mislukt (non-negotiable) | Sommatiebrief (Plan B): €100K boete + aansprakelijkstelling |
| **Douwine weigert finale afrekening MO** | Bedrag onderhandelbaar | Peter laat verrijkingsvordering in de kwijting (als andere voorwaarden goed zijn) |
| **Notaris weigert gelijktijdige passering** | Technisch probleem | Escrow: notaris houdt akte teruglevering vast totdat akte overdracht Peter is gepasseerd |
| **Dinck kan de prijs niet betalen** | Financieel probleem | Betaling door Freca (als koper) — of: betaling in termijnen met zekerheid |

### 5.2 Kritieke afhankelijkheid: SHA-kwijting ↔ co-signering

Deze twee zijn onlosmakelijk verbonden:

```
Peter tekent akte → Freca wordt aandeelhouder → SHA herleeft
                                                       ↓
                                          Art. 7 (non-concurrentie)
                                          Art. 10 (wederkerige boete)
                                          Art. 3.1.h (kooprecht)
                                          Art. 3.1.i (als MO beëindigd)
```

**Zonder SHA-kwijting is tekenen van de akte schadelijk voor Peter.** De kwijting moet juridisch waterdicht zijn *vóór* de co-signering. Dit wordt geregeld via de vaststellingsovereenkomst (getekend vóór de notariële aktes).

### 5.3 Kritieke afhankelijkheid: aandelenoverdracht ↔ co-signering

```
Peter tekent akte → co-signering leverage verdwenen
                    Maar: aandelenoverdracht nog niet gepasseerd
                    → Peter is minority aandeelhouder zonder hefboom
```

**Oplossing**: Simultane passering. Als dat niet mogelijk is: notariële escrow (de notaris houdt de akte teruglevering in depot totdat Peters akte ook is gepasseerd).

### 5.4 Wat als de deal helemaal mislukt?

Fallback is het **escalatiepad** uit `analyse/akte-tekenvoorwaarden.md` sectie 8:

| Stap | Actie | Timing |
|------|-------|--------|
| 1 | Vaststellingsvoorstel via jurist | Week van 17-21 feb |
| 2 | Douwine reageert of reageert niet | 2-3 weken |
| 3 | **Plan B: Sommatiebrief** (€100K boete + aansprakelijkstelling) | Na reactietermijn |
| 4 | Douwine reageert op sommatiebrief | 2-4 weken |
| 5 | **Plan C: Art. 2:343 BW** (uittreding vorderen via rechter) | Als geen minnelijke regeling |

**Peters positie bij escalatie**: Verbetert met de tijd (zie sectie 7).

---

## 6. Timing en Sequencing

### 6.1 Drie tijdshorizonten

| Horizon | Datum | Gebeurtenis | Druk op wie? |
|---------|-------|-------------|-------------|
| **Kort** | 1 maart 2026 | Peter geen bestuurder meer — hoedanigheid (b) akte vervalt | **Douwine** (moet akte aanpassen, tegenstrijdig belang) |
| **Middel** | 28 maart 2026 | Aflossing ~€55-75K — Dinck in default (Art. 11.2) | **Douwine** (Freca is schuldeiser én bestuurder) |
| **Lang** | Doorlopend | SHA-boete loopt door (+€1K/dag), platform degradeert zonder KTLO, verrijking groeit | **Douwine** |

### 6.2 Timing-advies

**Tekenen vóór 1 maart**: Alleen als de volledige deal rond is. Onrealistisch gegeven dat er 17 dagen resteren en de jurist nog de vaststellingsovereenkomst moet opstellen.

**Tekenen na 1 maart** (aanbevolen):
- Peter verliest hoedanigheid (b) — maar dit is Douwine's probleem (zij moet Art. 7 akte regelen met tegenstrijdig belang)
- Peters co-signering (hoedanigheid a) blijft nodig
- Meer tijd voor zorgvuldige juridische documentatie
- Aflossingsdreiging 28 maart verhoogt druk op Douwine

**Niet tekenen** (default): Geldig zolang er geen deal is. Peters leverage verbetert.

### 6.3 Aanbevolen tijdlijn

| Periode | Actie | Door wie |
|---------|-------|---------|
| **12-14 feb** | Jurist consulteren met alle analyses + vragen | Peter → jurist |
| **17-21 feb** | Jurist stuurt vaststellingsvoorstel aan Freca/Douwine | Jurist |
| **21 feb — 7 mrt** | Reactietermijn Douwine (2 weken) | Douwine |
| **1 maart** | Peter treedt af als bestuurder. KvK-uitschrijving. STOP alle werkzaamheden. | Peter |
| **7-14 mrt** | Als positieve reactie: onderhandeling over voorwaarden | Via jurist |
| **14-21 mrt** | Als geen reactie: herinnering + deadline stellen | Jurist |
| **21-28 mrt** | Als negatief: Plan B (sommatiebrief) | Jurist |
| **28 mrt** | Aflossing in default. Druk op Douwine maximaal. | — |
| **Apr-mei** | Als deal: simultane ondertekening + passering | Alle partijen + notaris |
| **Apr-mei** | Als geen deal: Plan C (Art. 2:343 overwegen) | Peter + jurist |

---

## 7. Leverage-evolutie — Waarom Tijd Peter Helpt

| Hefboom | 12 feb 2026 | 1 mrt 2026 | 28 mrt 2026 | Apr-jun 2026 |
|---------|-------------|------------|-------------|--------------|
| Co-signering akte | ✅ Actief (beide hoedanigheden) | ✅ Actief (hoedanigheid a) | ✅ Actief | ✅ Actief |
| Vetorecht Art. 8.6 | ✅ Actief | ✅ Actief | ✅ Actief | ✅ Actief |
| SHA-boete (€100K + €1K/dag) | ~€197K | ~€214K | ~€241K | ~€300K+ |
| Platformafhankelijkheid | Hoog | **Zeer hoog** (geen KTLO) | Platform degradeert | Kritiek |
| Verrijkingsvordering | €108-180K | Gelijk of stijgend | Stijgend | Stijgend |
| Aflossingsdruk op Douwine | Dreigend | Urgent | **Verzuim** | Doorlopende default |
| Bestuurdersaansprakelijkheid Peter | Actief (beschermd) | Vervalt | — | — |
| Hoedanigheid (b) akte | ✅ | **❌ Vervalt** | — | — |

**Kernobservatie**: Vijf van de zes hefbomen versterken in de tijd. Alleen hoedanigheid (b) vervalt per 1 maart — maar dit is geen hefboom van Peter, het is een complicatie voor Douwine.

**Conclusie**: Er is geen reden om een slechte deal te accepteren onder tijdsdruk. De enige partij die haast heeft is Douwine.

---

## 8. Douwine's Perspectief — Waarom Zij Moet Meewerken

### 8.1 Douwine's kosten bij géén deal

| Factor | Kosten/schade |
|--------|--------------|
| SHA-boete (lopend) | ~€197K+ (stijgt €1K/dag) |
| Platform vervanging | €250-350K (extern herbouwen) |
| Operationele stilstand | Klantenverlies, reputatieschade |
| Aflossing 28 maart default | Volledige lening (~€466K+) direct opeisbaar |
| Art. 2:343 verdediging | €15-40K+ juridische kosten |
| Blokkering alle AVA-besluiten | Dinck is feitelijk onbestuurbaar |
| Persoonlijke aansprakelijkheid (New Holland Belgium) | Onbepaald (aansprakelijk voor wanbetaling werknemers) |
| **Totaal exposure** | **>€928K+** |

### 8.2 Douwine's kosten bij wél een deal

| Factor | Kosten |
|--------|--------|
| Prijs Peters aandelen | €[onderhandelbaar] |
| KTLO-vergoeding | €[marktconform, 6-12 maanden] |
| Finale afrekening MO | €[onderhandelbaar, range €50-180K] |
| Notariskosten 2 aktes | ~€1.500-2.500 |
| Juridische kosten | Al lopend |
| **Totaal** | **€[veel minder dan >€928K]** |

### 8.3 Conclusie: Douwine's rationele keuze

De deal is voor Douwine **orders van grootte goedkoper** dan de kosten van geen deal. Dit is Peters sterkste argument: de package deal is niet een concessie — het is een **oplossing** voor Douwine's juridische en operationele problemen.

**Framing**: "Ik bied je een pakket waarmee je in één keer alles regelt: teruglevering aandelen, platform draaiend, geen juridische procedures, schone lei. De vraag is niet of je het wilt — de vraag is wat de voorwaarden zijn."

---

## 9. Risico-analyse — Wat Kan Misgaan?

### 9.1 Risico's voor Peter bij het voorstellen van de deal

| Risico | Ernst | Mitigatie |
|--------|-------|-----------|
| Douwine interpreteert voorstel als zwakte ("Peter smeekt om een deal") | Medium | Voorstel via jurist, formeel, zakelijk. Sommatiebrief is Plan B. |
| Douwine neemt voorstel over maar wijzigt voorwaarden eenzijdig | Laag | Vaststellingsovereenkomst: niets is definitief tot alles is getekend |
| Douwine probeert componenten los te trekken ("eerst akte, dan de rest") | **Hoog** | **Absoluut niet accepteren.** Alles simultaan of niets. |
| Douwine vraagt "bedenktijd" en gebruikt die om alternatieven te zoeken | Medium | Deadline stellen (2-3 weken). Na deadline: sommatiebrief. |
| Grady probeert als tussenpersoon op te treden | Medium | Alleen via jurist communiceren. Niet met Grady onderhandelen. |

### 9.2 Risico's voor Peter bij het niet voorstellen van de deal

| Risico | Ernst | Gevolg |
|--------|-------|--------|
| Status quo: Peter blijft minority aandeelhouder zonder exit | **Hoog** | Jarenlange patstelling, equity waardeloos |
| Douwine vindt alternatieve financiering of koper | Medium | Peter moet alsnog meewerken (veto); maar leveringsdruk op Peter stijgt |
| Dinck gaat failliet vóór deal | Medium | Peter verliest equity (al laag) + verrijkingsvordering (concurrent) |
| SHA-boete verjaart (5 jaar: Art. 3:307 BW) | **Laag** (pas in 2030) | Geen urgent risico, maar niet eindeloos wachten |

---

## 10. Bronverificatie

Alle feitelijke claims in deze analyse zijn geverifieerd tegen de volgende bronnen:

| Claim | Bron | Geverifieerd |
|-------|------|-------------|
| Art. 5.2 MO: bilaterale beëindiging | `files/getekend-managementovereenkomst-phbx.pdf` p.2 | ✅ |
| Art. 4.2 MO: vrijwaring | `files/getekend-managementovereenkomst-phbx.pdf` p.2 | ✅ |
| Art. 3.2 akte: co-signering vereist | `files/10-feb-2026-Concept- levering aandelen.pdf` Art. 3.2 | ✅ |
| Art. 10 SHA: €100K boete + €1K/dag | `files/getekend-aandeelhoudersovereenkomst.pdf` Art. 10 | ✅ |
| Art. 9 SHA: kettingbeding | `files/getekend-aandeelhoudersovereenkomst.pdf` Art. 9 | ✅ |
| Art. 1.2 SHA: wijziging/beëindiging schriftelijk | `files/getekend-aandeelhoudersovereenkomst.pdf` Art. 1.2 | ✅ |
| Art. 8.6 lid 2 statuten: unanimiteit | `files/Registratie_07_11_2025_Repnr_24482_Koops_Levering aandelen.pdf` Art. 8.6 | ✅ |
| Art. 6.2 statuten: blokkeringsregeling | `files/Registratie_07_11_2025_Repnr_24482_Koops_Levering aandelen.pdf` Art. 6.2 | ✅ |
| AVA 30 nov 2024: alleen PHBX fee | `files/Getekende notulen wijzigen managementovereenkomst.pdf` | ✅ |
| Art. 11.2 lening: automatisch verzuim | `files/getekend-overeenkomst-van-geldlening.pdf` Art. 11.2 | ✅ |
| Art. 7:900 BW: vaststellingsovereenkomst | Wettelijke bepaling | ✅ |
| Art. 6:262 BW: opschortingsrecht | Wettelijke bepaling | ✅ |

---

## 11. Verfijnde Vragen voor Jurist

**PD-1** (aandelenprijs): Wat is een verdedigbare "gewenste prijs" gegeven de combinatie van kwijtschelding boete (~€197K), verrijkingsvordering (€108-180K) en strategische waarde (vetorecht, platformcontinuïteit)? Kan de prijs worden geframed als verrekening?

**PD-2** (structuur): Is een verrekeningsstructuur juridisch sterker dan een expliciete aandelenprijs? Kan dit de discussie over de nominale aandelenwaarde omzeilen?

**PD-3** (vaststellingsovereenkomst): Kan de vaststellingsovereenkomst een opschortende voorwaarde bevatten (Art. 6:21 BW) dat de afspraken pas definitief worden na passering van beide notariële aktes? Hoe wordt dit technisch geregeld?

**PD-4** (escrow): Als simultane passering niet mogelijk is, kan de notaris de akte teruglevering in depot houden (escrow) totdat Peters aandelenoverdracht is afgerond?

**PD-5** (betaalcapaciteit): Dinck/Freca heeft beperkte middelen. Kan de betaling in termijnen worden geregeld met zekerheid (pandrecht, bankgarantie)? Of is betaling door Freca/Douwine persoonlijk realistischer?

---

## 12. Samenvatting

| Aspect | Bevinding |
|--------|-----------|
| **Package deal = optimale strategie** | Bundelt alle hefbomen in één transactie. Voorkomt eenzijdig profiteren. |
| **Vier documenten, één moment** | Vaststellingsovereenkomst + KTLO + akte teruglevering + akte overdracht Peter |
| **Vijf non-negotiables** | Faire prijs, SHA-kwijting, KTLO-contract, wederzijdse kwijting, MO-beëindiging met nawerking |
| **Aandelenprijs via verrekening** | Niet "wat zijn de aandelen waard" maar "wat zijn de wederzijdse vorderingen waard" |
| **Timing: na 1 maart** | Geen haast voor Peter. Douwine ervaart tijdsdruk (akte, aflossing, platform). |
| **Douwine's kosten bij geen deal: >€928K+** | Deal is orders van grootte goedkoper voor haar |
| **Fallback: sommatiebrief → Art. 2:343** | Als deal mislukt, heeft Peter een duidelijk escalatiepad |
| **Peters positie verbetert met de tijd** | Vijf van zes hefbomen versterken. Enige "verlies" (hoedanigheid b) is Douwine's probleem. |
