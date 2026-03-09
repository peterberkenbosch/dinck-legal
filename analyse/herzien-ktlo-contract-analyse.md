# Analyse: Douwine's "Herziene" KTLO-overeenkomst — 9 maart 2026

**Datum analyse**: 9 maart 2026
**Bron**: `files/KTLO_Overeenkomst_Dienstverlening Dinck & Dinckly 1-3-2026.pdf` (3 pagina's, ondertekend door Douwine, 9 maart 2026)
**Referentie**: `concepten/ktlo-overeenkomst.md` (Peter's origineel, verzonden 3 maart 2026)

---

## Kernbevinding

Dit is **geen revisie** van Peter's contract. Het is een **volledig nieuw document** dat:
1. Peter's 12-artikel, gedetailleerde contract vervangt door 17 korte, vage artikelen
2. ~15 beschermende bepalingen schrapt
3. 7 extractie-/overdrachtbepalingen toevoegt
4. Al ondertekend is door Douwine (9 maart 2026) — druktactiek om "gewoon mee te tekenen"

---

## Artikel-voor-artikel vergelijking

### Wat BEHOUDEN is (grotendeels)

| Onderwerp | Peter's versie | Douwine's versie | Beoordeling |
|-----------|---------------|-----------------|-------------|
| Partijen | Art. Partijen — PB Consultancy + Dinck | Art. Partijen — zelfde | OK |
| Service Levels | Art. 2.2 — 4 niveaus met reactie- én oplostijden | Art. 3 — 4 niveaus, zelfde tijden | Identiek |
| Buiten scope | Art. 3 — gedetailleerd met offerteprocedure | Art. 5 — beknopt, €125/hr | Vereenvoudigd maar kern intact |
| Aansprakelijkheid | Art. 9 — opzet/grove nalatigheid, indirecte schade uitgesloten, 12 mnd max, vervaltermijn | Art. 14 — zelfde kern, maar zonder vervaltermijn | Vervaltermijn (Art. 9.4) ontbreekt |
| IE eigendom | Art. 8 — bij Opdrachtgever | Art. 13 — zelfde + voegt Dinckly app toe | OK |
| Geheimhouding | Art. 11 — gedetailleerd, uitz. adviseurs, wettelijke verplichting | Art. 16 — kort, 2 jaar | Mist uitzonderingsbepalingen |
| Toepasselijk recht | Art. 12.5-12.6 — NL recht, Leeuwarden | Art. 17 — zelfde | OK |
| Opzegtermijn | Art. 6.3 — 1 maand | Art. 15 — 1 maand | OK |

### Wat TOEGEVOEGD is (nieuw in Douwine's versie)

| # | Artikel | Inhoud | Risico | Beoordeling |
|---|---------|--------|--------|-------------|
| 1 | **Scope: Dinckly app** | "Backendondersteuning voor de Dinckly App" + Dinckly in titel en overwegingen | MEDIUM | Peter's Art. 2.4 sluit mobile apps expliciet UIT. "Backendondersteuning" is vaag — kan breed uitgelegd worden. |
| 2 | **Art. 4: 5 uur/week** | Max 5 uur/week i.p.v. 1 uur/week | HOOG | 5× verhoging van ONBETAALDE inzet. Dat is ~20 uur/maand gratis werk. |
| 3 | **Art. 7: Documentatieplicht** | "Actuele technische documentatie over architectuur, servers, deployment, database en security. Valt buiten de 5 uur inzet per week." | KRITIEK | **Onbeperkte onbetaalde verplichting.** Volledige platformdocumentatie = 50-100+ uur. Expliciet BUITEN het uurplafond = geen cap. |
| 4 | **Art. 8: Kennisoverdracht** | "Redelijke medewerking aan kennisoverdracht aan medewerkers of externe ontwikkelaars" | HOOG | Training van Peter's vervanger. Geen uurlimiet, geen vergoeding, geen afbakening van "redelijk". |
| 5 | **Art. 9: Broncodebeheer** | "Repository waarvoor Opdrachtgever administratieve toegang heeft" | HOOG | Admin access = lock-out mogelijkheid, toegang verlenen aan derden, repo forken. Gaat verder dan IP-erkenning. |
| 6 | **Art. 10: Escrow** | "Broncode onderbrengen bij escrow-agent zodat deze beschikbaar blijft bij faillissement of beëindiging" | MEDIUM | Overbodig als Dinck al admin access krijgt (Art. 9). Trigger "beëindiging" is breed. |
| 7 | **Art. 11: Exitprotocol** | "Overdracht van infrastructuur, repositories, DNS en hostingaccounts binnen 60 dagen" | HOOG | Verplichte volledige handover in 60 dagen. Dit is exit-planning, geen maintenance. |
| 8 | **Art. 12: Security** | "Gangbare beveiligingsstandaarden, HTTPS, updates en credential management" | LAAG | Grotendeels al gedekt door Peter's Art. 2.1(c). Acceptabel. |

### Wat GESCHRAPT is (aanwezig in Peter's versie, afwezig bij Douwine)

| # | Bepaling | Peter's artikel | Impact van schrapping |
|---|---------|----------------|---------------------|
| 1 | **Koppeling aandeelhouderschap** | Art. 6.2 | **KRITIEK.** Peter's contract eindigt automatisch bij aandelenoverdracht. Zonder deze bepaling kan Peter vastzitten aan KTLO-verplichtingen NA zijn exit. |
| 2 | **Opschortingsrecht** | Art. 7.1-7.3 | **KRITIEK.** Peter kan diensten niet opschorten bij wanbetaling. Geen stok achter de deur voor hostingfacturen. |
| 3 | **Gedetailleerde uitsluitingen** | Art. 2.4 | **HOOG.** 14 specifieke uitsluitingen (incl. Dinckly, SpiekR, documentatie, eindgebruiker support) zijn weg. Scope is nu vaag en rekbaar. |
| 4 | **Herzieningsrecht bij overwerk** | Art. 5.3 | **HOOG.** Bij structureel meer dan max: geen recht op vergoeding of opzegging. |
| 5 | **Gedetailleerde hostingkosten** | Art. 4.1-4.5 | **HOOG.** Geen specificatie (Hatchbox, Linode, R2, AppSignal), geen betalingstermijn (14 dgn), geen kostenstijgingsnotificatie (>20%). |
| 6 | **Prioriteitsbepaling door Opdrachtnemer** | Art. 2.2 + 2.4 | **MEDIUM.** Peter bepaalt niet meer wat kritiek is en wat buiten scope valt. |
| 7 | **Offerteprocedure buiten scope** | Art. 3.1 | **MEDIUM.** Geen vereiste voor voorafgaande offerte en goedkeuring. |
| 8 | **Opeisbaarheid bij beëindiging** | Art. 6.4 | **MEDIUM.** Openstaande facturen niet meer direct opeisbaar bij beëindiging. |
| 9 | **Wijzigingsbepaling** | Art. 12.2 | **HOOG.** Geen vereiste voor schriftelijke instemming beide partijen bij wijzigingen. |
| 10 | **Overdrachtsverbod** | Art. 12.3 | **MEDIUM.** Dinck kan verplichtingen overdragen aan derden zonder Peter's toestemming. |
| 11 | **Nietigheidsclausule** | Art. 12.4 | LAAG. Standaard, maar netjes om te hebben. |
| 12 | **Zelfstandigheid** | Art. 12.1 | LAAG. Geen DBA-bescherming. |
| 13 | **Vervaltermijn vorderingen** | Art. 9.4 | MEDIUM. 12-maanden vervaltermijn voor claims ontbreekt. |
| 14 | **Overwegingen** | Uitgebreid (A-G) | MEDIUM. Context over meeting 11 feb, aandeelhouderschap, aftreden als bestuurder — allemaal weg. |
| 15 | **Definities** | Art. 1.1-1.6 | MEDIUM. Geen precieze definities van Kritieke bug (CVE-score, dataverlies etc.), Security patch (CVE 7.0+), Hostingkosten. |

---

## Het Patroon

Douwine's toevoegingen volgen een systematische logica:

```
Expand scope (Dinckly app, 5× uren)
  → Extract knowledge (documentatieplicht BUITEN uurcap, kennisoverdracht)
    → Transfer control (admin access repos, accounts op naam Dinck)
      → Create exit path (60-dagen handover, escrow)
```

**Eindresultaat indien geaccepteerd**: Peter's platformafhankelijkheid-leverage — een van zijn vijf kernhefbomen — volledig geneutraliseerd. En al het werk is GRATIS.

**Wie heeft dit opgesteld?** De toevoegingen zijn te gestructureerd en strategisch coherent voor Douwine's eigen werk. Vermoedelijk input van Grady Hofstra of een externe adviseur. Elke toevoeging ondermijnt systematisch één specifiek leverage-punt.

---

## Wat NIET geadresseerd wordt

1. Geen reactie op Peter's originele contract (geen inhoudelijke opmerkingen op de 12 bestaande artikelen)
2. Geen vermelding van de openstaande eerste hostingfactuur
3. Geen reactie op het Art. 2:217 informatieverzoek (deadline 16 maart)
4. KTLO blijft onbetaald — bij 5× meer werk, nog steeds €0
5. Gepresenteerd als "herziene versie" terwijl het een fundamenteel ander document is

---

## Drie Gevaarlijkste Elementen

### 1. Schrapping Art. 6.2 — Koppeling aandeelhouderschap
Peter's contract eindigt automatisch bij aandelenoverdracht. Zonder deze bepaling:
- Peter kan vastzitten aan KTLO na exit
- Geen automatische beëindiging bij aandelen-deal
- Douwine kan Peter dwingen in KTLO terwijl aandelen al overgedragen zijn

### 2. Schrapping Art. 7 — Opschortingsrecht
Peter kan diensten niet opschorten bij wanbetaling:
- Geen drukmiddel voor hostingfacturen
- Dinck betaalt niet → Peter moet toch werken
- Gecombineerd met documentatieplicht: onbeperkt gratis werken zonder verhaalsmogelijkheid

### 3. Art. 7 (nieuw) — Documentatieplicht buiten uurcap
"Valt buiten de 5 uur inzet per week" = **onbeperkte onbetaalde verplichting**:
- Volledige platformdocumentatie: architectuur, servers, deployment, database, security
- Conservatieve schatting: 50-100+ uur werk
- Elimineert platformafhankelijkheid volledig
- Gecombineerd met kennisoverdracht (Art. 8): complete replacement capability

---

## Correctie: Hostingkosten

Douwine's Art. 6 vermeldt wél doorbelasting tegen kostprijs. Maar ontbreken:
- Betalingstermijn (Peter's Art. 4.3: 14 dagen)
- Gedetailleerde kostenspecificatie (Peter's Art. 4.1: per component)
- Kostenstijgingsnotificatie (Peter's Art. 4.5: >20%)
- Factuurspecificatievereiste (Peter's Art. 4.4)
- Plus toevoeging: "accounts zoveel mogelijk op naam van Opdrachtgever" = infrastructuur-overdracht

---

## Aanbevolen Respons

### Strategie
- Erken dat ze erover nagedacht heeft (constructief)
- Maak duidelijk dat dit een ander contract is, niet een revisie
- Peter's origineel is de basis voor verdere bespreking
- Overdracht-gerelateerde artikelen (7, 8, 9, 10, 11) horen in een bredere uittreding, niet in KTLO
- 1 uur/week is de onbetaalde baseline; meer = Art. 3 (€125/hr)
- Niet inhoudelijk onderhandelen per e-mail — kort houden

### Wat NIET zeggen
- Geen strategische analyse onthullen
- Niet noemen: leverage, package deal, vaststellingsovereenkomst
- Niet verwijzen naar interne analyses of juridisch adviseur
- Niet defensief — constructief
- Geen gedetailleerd tegenvoorstel per e-mail

### Referentie
- Concept e-mail: `concepten/email-reactie-herzien-ktlo-9maart.md`
