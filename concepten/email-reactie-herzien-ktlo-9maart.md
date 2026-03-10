# E-mail - Reactie op Douwine's herziene KTLO-overeenkomst

**Status**: CONCEPT - 10 maart 2026

---

## Verzendgegevens

| Veld | Waarde |
|------|--------|
| Van | info@peterberkenbosch.nl |
| Aan | douwine@dinck.nl |
| Onderwerp | Re: KTLO Overeenkomst |
| Bijlage 1 | KTLO_Overeenkomst_Dienstverlening_v2.pdf (bijgewerkt, ondertekend door Opdrachtnemer) |
| Bijlage 2 | Infrastructuurmigratie_Accountoverzicht_Dinck_BV.pdf (migratieplan + volledig accountoverzicht) |

---

## E-mailtekst

> Beste Douwine,
>
> Dank voor je reactie. Ik heb je document naast het mijne gelegd en merk op dat het een volledig nieuw contract is - geen revisie op wat ik heb gestuurd. Dat maakt een gerichte vergelijking lastig, en ik loop daarom de belangrijkste verschillen langs.
>
> **Omvang en uren**
> Op 11 februari hebben we afgesproken dat ik KTLO doe voor app.dinck.nl. Dat is wat ik aanbied: het platform draaiend houden. Om precies te zijn: de volledige Rails-applicatie, inclusief de Hotwire Native-code die de Dinckly app bedient - die draait in dezelfde codebase. Wat niet onder KTLO valt is de doorontwikkeling van de Dinckly mobiele app zelf (iOS/Android) - dat is actieve ontwikkeling, geen onderhoud, en die ligt op dit moment stil. Mijn aanbod is 1 uur per week onbetaald in het belang van de aandeelhoudersrelatie. Dat is aanzienlijk meer dan wat reguliere KTLO vergt - mocht er structureel meer tijd nodig zijn, dan kan dat via Meerwerk (Art. 3, €125 per uur).
>
> **Documentatie en kennisoverdracht**
> De codebase bevat uitgebreide documentatie - elke ervaren Rails-ontwikkelaar kan daarmee aan de slag. Dat is standaardpraktijk bij professionele softwareontwikkeling en zo heb ik het ook opgezet. Mocht een externe ontwikkelaar daarnaast vragen hebben, dan help ik graag - maar dat valt binnen de uren, of het gaat via Meerwerk (Art. 3). Een onbeperkte documentatieplicht *buiten* het uurplafond is feitelijk een ongelimiteerde onbetaalde verplichting, en dat is niet redelijk. Documentatie en kennisoverdracht zijn bovendien geen KTLO - dat is een apart traject.
>
> **KTLO versus transitie**
> Jouw contract bevat naast KTLO ook bepalingen over kennisoverdracht aan externe ontwikkelaars, escrow, en een 60-dagen exitprotocol. Dat zijn transitie- en overdrachtsafspraken - daar sta ik zeker voor open, maar die horen in een apart gesprek en een aparte overeenkomst. Een KTLO-contract gaat over het platform draaiende houden, niet over het overdragen ervan.
>
> **Ontbrekende bepalingen**
> In jouw versie ontbreken bepalingen die voor mij essentieel zijn: de automatische beëindiging bij aandelenoverdracht, het opschortingsrecht bij wanbetaling, de gedetailleerde hostingspecificatie met betalingstermijn, de wijzigingsbepaling, en de vervaltermijn. Die zijn er niet zonder reden in opgenomen - ze beschermen ons allebei.
>
> **Bijgewerkte versie**
> Bijgaand tref je een bijgewerkte versie aan van mijn overeenkomst. Deze vervangt de versie die ik op 3 maart heb gestuurd. De belangrijkste toevoegingen:
>
> 1. **Dinckly-afbakening** verduidelijkt (Art. 1.1 en 2.4) - de Hotwire Native-weergaven en bijbehorende code in de Rails-applicatie die de Dinckly app bedienen zijn onderdeel van het Platform en vallen onder KTLO. De doorontwikkeling van de mobiele app zelf (iOS/Android) niet.
> 2. **Migratie naar eigen accounts** (Art. 4.5, nieuw) - zie hieronder.
> 3. **Beveiliging en Toegangsbeheer** (Art. 10) - ik beheer alle toegangsgegevens via 1Password en deel geen inloggegevens via onbeveiligde kanalen. Wijzigingen in toegangsrechten lopen via overleg zolang het contract loopt. Dit beschermt ons allebei.
>
> **Infrastructuur**
> Ik ga alle hosting- en infrastructuuraccounts overzetten naar accounts op naam van Dinck. Dat heb ik al uitgewerkt in een concreet migratieplan - zie de bijlage voor het volledige overzicht van alle accounts, kosten en stappen. De huidige kosten (~€123/maand) gaan omlaag naar ~€28/maand. Dit scheelt mij maandelijks een factureringsronde met valutaomrekeningen en kostenberekeningen - en het bespaart Dinck ~€95/maand.
>
> Het meeste is al geregeld: Dinck heeft al accounts bij Hetzner (automatische incasso actief) en Strato. Wat ik nog nodig heb is een creditcard op het Cloudflare-account van Dinck en een creditcard voor MailPace (e-mailverzending). Ik maak de logins voor je aan - je hoeft alleen een creditcard toe te voegen. Zodra dat rond is, kan ik de volledige overdracht starten (Art. 4.5). Tot die tijd factureer ik de hostingkosten maandelijks door tegen kostprijs.
>
> **Voorstel**
> Laten we mijn overeenkomst als uitgangspunt nemen. Als je op specifieke artikelen opmerkingen hebt, hoor ik die graag - dan werken we gericht naar een versie die voor ons allebei werkt. Maar het moet wel een contract zijn dat mijn tijd en aansprakelijkheid op een redelijke manier afbakent.
>
> Groet,
>
> Peter

---

## Strategische overwegingen

### Toon
Zakelijk, constructief, direct. Je/jij register. Geen verwijten, maar wél helder benoemen waar het schuurt. Peter is niet defensief - hij biedt openheid aan (code, documentatie, infra-info) maar accepteert geen onredelijke voorwaarden.

### Kernboodschappen
1. **Dit is geen revisie, maar een ander document** - expliciet benoemd, zonder beschuldiging
2. **1 uur/week is het aanbod** - KTLO is afgesproken op 11 februari, het urenaantal is Peter's voorstel in het contract
3. **Bereidheid tot openheid** - documentatie, kennisoverdracht, code inzage: geen probleem. Maar dan wél binnen redelijke kaders (uren of betaald)
4. **Dinckly-afbakening** - Hotwire Native-code in Rails = onderdeel platform (KTLO), doorontwikkeling mobiele app (iOS/Android) = actieve ontwikkeling (gepauzeerd, geen KTLO)
5. **KTLO ≠ transitie** - haar contract bundelt onderhoud met overdracht (escrow, kennisoverdracht, exitprotocol). Peter is bereid tot transitiegesprek, maar apart
6. **Ontbrekende bepalingen benoemd** - specifiek, zakelijk, "beschermen ons allebei"
7. **Bijgewerkt contract v2** meegezonden - vervangt versie 3 maart, met toelichting op aanvullingen (Dinckly, Art. 4.5 migratie, Art. 10 security)
8. **Aankondiging migratie** naar Dinck-accounts - concreet migratieplan al klaar + volledig accountoverzicht als bijlage, kosten omlaag van ~€123 naar ~€28/maand, neemt wind uit elk "Peter houdt alles gegijzeld" narratief
9. **Doorbelasting als overgangsregeling** - tot migratie voltooid, daarna vervalt facturering
10. **Slot**: "mijn tijd en aansprakelijkheid redelijk afbakenen" - de kern in één zin

### Verschil contract v2 t.o.v. v1 (verstuurd 3 maart)
- **Art. 1.1**: "API-endpoints" → "Hotwire Native-weergaven en bijbehorende code" (technisch correcter)
- **Art. 2.4**: Doorontwikkeling Dinckly als expliciete uitsluiting toegevoegd; SpiekR verwijderd (functioneel, niet meer relevant)
- **Art. 4.1**: Alternatieve hostingtabel na migratie toegevoegd (~€28/maand)
- **Art. 4.5 nieuw**: Migratie naar eigen accounts - niet langer optioneel maar definitief; betaalmethode verbreed naar "creditcard of automatische incasso"
- **Ondertekening**: Datum bijgewerkt naar 10 maart 2026, expliciet "vervangt versie 3 maart"

### Verschil email t.o.v. vorig concept
- **Zachter**: "aanzienlijk meer dan wat reguliere KTLO vergt" i.p.v. "vijf keer zoveel en dan gratis"
- **Concreter**: migratieplan al klaar, besparing ~€123 → ~€28/maand benoemd
- **Art. 4.5** (niet 4.6) correct verwezen
- **Doorbelasting**: expliciet als overgangsregeling geframed (niet meer als apart factureringsverzoek)
- **v2 framing**: expliciet "vervangt versie 3 maart"
- **Hotwire Native**: technisch correcte omschrijving Dinckly-scope

### Wat er bewust NIET in staat

| Onderwerp | Reden |
|-----------|-------|
| Strategische analyse | Onthult denkwijze |
| "Package deal" / vaststellingsovereenkomst | Speelt kaarten open |
| Juridisch adviseur / Maud | Niet nodig, kan escalerend werken |
| Gedetailleerd tegenvoorstel per artikel | Niet per e-mail onderhandelen |
| Dreigementen of consequenties | Toon is constructief |
| Art. 2:217 informatieverzoek | Apart traject, niet vermengen |
| Verwijzing naar Grady's rol | Niet nu |
| Het woord "eenzijdig" of "dwang" | Scherp maar niet polariserend |
| Patroonanalyse (scope expand → extract → transfer) | Strategisch inzicht niet tonen |

### Wat het DOET
- Herframe: Peter's contract = uitgangspunt, bijgewerkt en opnieuw aangeboden
- Scheidt KTLO van overdracht - documentatie/kennisoverdracht mag, maar binnen kaders
- Bevestigt 1hr/week als het aanbod (niet 5) - de meeting van 11 feb verankert KTLO, niet het urenaantal
- Biedt openheid aan als wapen - "ik verberg niets" neutraliseert elk narratief dat Peter controle zoekt
- Kondigt infra-migratie aan met concreet plan - elimineert "gegijzeld" argument, kosten dalen van ~€123 naar ~€28/maand
- Noemt concrete ontbrekende bepalingen - Douwine moet uitleggen waarom die eruit moeten
- Introduceert Art. 10 (security) als bescherming voor beide partijen
- Doorbelasting als overgangsregeling tot migratie voltooid - concreet signaal dat dit geen vrijblijvend arrangement is

### Waarom 1 uur/week en niet 5

**Feitelijk**: Het platform is solide, goed getest en stabiel. Werkelijk KTLO - bewaking, kritieke bugs, beveiligingsupdates, infrastructuur - kost de meeste weken *minder* dan 1 uur. Een incidentele P1 kan een piek veroorzaken, maar gemiddeld is 1 uur al genereus.

**Wat vult de overige 4 uur in Douwine's versie?**
- Documentatie buiten uurplafond (haar Art. 7 - onbeperkt, gratis)
- Kennisoverdracht aan externe ontwikkelaars
- Verzoeken die net geen "feature request" heten maar het wel zijn
- Admintaken die eigenlijk opdrachtgever-werk zijn

**De rekensom**: 5 uur × 52 weken = 260 uur/jaar. Tegen het Meerwerk-tarief is dat **€32.500/jaar aan gratis arbeid**. Voor een aandeelhouder wiens fee al op €0 staat sinds december 2024.

**Strategisch risico van 5 uur accepteren**:
- Het wordt de *baseline* - terug naar 1 is dan "niet meewerken"
- Douwine kan 5 uur vullen met verzoeken die KTLO-achtig klinken maar het niet zijn
- Het geeft haar tijd om Peter te vervangen zonder dat het iets kost
- Het herzieningsrecht (Art. 5.3) werkt alleen als de diensten *meer* dan het maximum vergen - bij 5 uur wordt die trigger vrijwel nooit bereikt

**Kern**: 1 uur/week matcht de werkelijke behoefte. Alles daarboven loopt via Meerwerk (€125/hr) - een natuurlijke rem op onnodige verzoeken. Peter is bereid het platform draaiende te houden pro bono als aandeelhouder. Dat is al genereus. 5 uur/week gratis is geen KTLO - dat is een transitiedienst waarmee Peter zichzelf overbodig maakt op eigen kosten.

**NB**: Op 11 februari is afgesproken dat Peter KTLO doet, niet hoeveel uur. Het urenaantal is Peter's voorstel in het contract. Dit onderscheid is belangrijk - Douwine kan niet claimen dat "5 uur de afspraak was".

### Wat als ze volhoudt?
- Peter hoeft niet mee te tekenen. Zijn eigen contract is verzonden en ondertekend.
- Zonder ondertekend contract kan Peter terugvallen op: "er is geen overeenkomst, dus geen KTLO-verplichting"
- De druk ligt bij Douwine - zij heeft het platform nodig, niet andersom
- Peter heeft nu twee keer een contract gestuurd (3 maart + v2 op 10 maart) - hij is de redelijke partij in elk dossier

### Kan Douwine zelfstandig een ontwikkelaar inhuren?

**Juridisch: ja.** Het contracteren van een opdrachtnemer of agency is een bestuurshandeling - operationeel dagelijks bestuur. Dit vereist geen AVA-goedkeuring. De unanimiteitsregel (Art. 8.6 lid 2 statuten) geldt voor AVA-besluiten (aandelenuitgifte, statutenwijziging, jaarrekening, benoeming bestuurders), niet voor operationele bestuursbesluiten. Douwine kan als enig bestuurder een externe partij contracteren zonder Peters instemming.

**Praktisch: drie obstakels.**

1. **Geld** - Dinck heeft €2.795 liquide middelen (jaarrekening 2025). Financiering is stopgezet per 7 feb 2026. ARR is €533/maand. Een developer kost een veelvoud. Hoe betaal je een agency zonder cashflow?

2. **Toegang** - Peter beheert alle infrastructuur, hosting, repositories en credentials (via 1Password). Art. 10.3 KTLO-overeenkomst: toegangswijzigingen uitsluitend in overleg met Opdrachtnemer. Peter draagt de accounts over naar Dinck (Art. 4.5) met een kant-en-klaar migratieplan (besparing ~€123 → ~€28/maand), maar Dinck moet daarvoor een betaalmethode aanleveren en de kosten zelf dragen. Onboarding van een externe developer vereist daarnaast repo-toegang en begeleiding - dat loopt via overleg of Meerwerk.

3. **Kennis** - Peter is de enige die het platform kent en heeft gebouwd. De codebase is goed gedocumenteerd (standaard Rails), maar een nieuw team optuigen kost weken en begeleiding. Douwine's eigen contract probeerde dit precies te regelen via kennisoverdracht/escrow/exitprotocol - de transitiebepalingen die Peter terecht apart wil houden.

**Strategische conclusie**: Dit versterkt Peters positie. Douwine KAN een developer inhuren - dat is haar goed recht als bestuurder. Maar ze heeft geen geld, geen toegang, en geen kennis om dat te doen. De KTLO-overeenkomst (Art. 10) en het feit dat Peter de infra beheert zijn de facto controle. De bal ligt bij Douwine - zij moet de middelen vinden, niet Peter. Dit punt hoeft niet in de email zelf (geeft strategie prijs), maar het onderbouwt waarom Peter rustig kan blijven.
