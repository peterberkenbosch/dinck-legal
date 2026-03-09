# Overeenkomst van Dienstverlening — KTLO Platform app.dinck.nl

**Status**: Concept — 1 maart 2026

---

## Partijen

**1. Opdrachtnemer**:

| Veld | Gegeven |
|------|---------|
| Naam | Peter Berkenbosch Consultancy B.V. |
| KvK | 75867435 |
| Vestigingsplaats | Oosterwolde |
| Adres | Martenskamp 14, 8431 LP Oosterwolde |
| Vertegenwoordigd door | Peter Berkenbosch, directeur |
| E-mail | info@peterberkenbosch.nl |

Hierna te noemen: **Opdrachtnemer**

**2. Opdrachtgever**:

| Veld | Gegeven |
|------|---------|
| Naam | Dinck B.V. |
| KvK | 93428359 |
| Vestigingsplaats | Appelscha |
| Vertegenwoordigd door | Douwine Koopman, bestuurder |
| E-mail | douwine@dinck.nl |

Hierna te noemen: **Opdrachtgever**

Opdrachtnemer en Opdrachtgever hierna gezamenlijk aangeduid als **Partijen** en ieder afzonderlijk als **Partij**.

---

## Overwegingen

Partijen nemen het volgende in aanmerking:

A. Opdrachtgever exploiteert een softwareplatform voor kinderopvangorganisaties, bereikbaar via app.dinck.nl (het **Platform**).

B. Het Platform is ontwikkeld door Peter Berkenbosch en draait op infrastructuur die wordt beheerd door Opdrachtnemer.

C. PHBX Holding B.V. is aandeelhouder van Opdrachtgever en houdt 33,3% van de aandelen. Peter Berkenbosch is bestuurder van zowel Opdrachtnemer als PHBX Holding B.V.

D. Peter Berkenbosch is per 1 maart 2026 afgetreden als bestuurder van Opdrachtgever.

E. Tijdens de bijeenkomst van 11 februari 2026 ten kantore van Van der Meer Accountants & Consultants te Oosterwolde, in aanwezigheid van onder meer Douwine Koopman, Marlou Woltmeijer, Grady Hofstra en Klaas de Vries, zijn Partijen overeengekomen dat Peter Berkenbosch uitsluitend KTLO-werkzaamheden zal verrichten voor het Platform.

F. Partijen wensen de voorwaarden van deze KTLO-dienstverlening schriftelijk vast te leggen (**Keep The Lights On** / **KTLO**).

G. Deze overeenkomst betreft een zuivere commerciële dienstverlening en staat los van de aandeelhoudersrelatie tussen PHBX Holding B.V. en Opdrachtgever.

---

## Artikel 1. Definities

In deze overeenkomst wordt verstaan onder:

**1.1 Platform**: Het softwareplatform van Opdrachtgever, bereikbaar via app.dinck.nl, inclusief de onderliggende servers, databases en infrastructuur. Het Platform omvat de volledige Rails-applicatie, met inbegrip van de API-endpoints die de Dinckly mobiele applicatie bedienen.

**1.2 Diensten**: De in artikel 2 omschreven KTLO-werkzaamheden.

**1.3 Hostingkosten**: De in artikel 4 gespecificeerde kosten voor servers, opslag en overige infrastructuur benodigd voor het operationeel houden van het Platform.

**1.4 Kritieke bug**: Een softwarefout waardoor:
- (a) het Platform volledig onbereikbaar is; of
- (b) dataverlies of corruptie optreedt; of
- (c) een security-kwetsbaarheid actief wordt misbruikt; of
- (d) incorrecte financiële transacties plaatsvinden.

**1.5 Beveiligingsupdate**: Een update ter verhelping van een beveiligingskwetsbaarheid met een CVE-score van 7.0 of hoger (high/critical), of een direct exploiteerbare kwetsbaarheid in een kernafhankelijkheid.

**1.6 Meerwerk**: Alle werkzaamheden die niet vallen onder de Diensten zoals omschreven in artikel 2, en nader gespecificeerd in artikel 3.

---

## Artikel 2. Omvang van de Diensten

### 2.1 Omvang

De Diensten omvatten uitsluitend het volgende:

**(a) Bewaking en signalering**
- Serverbewaking en meldingen
- Beschikbaarheidsbewaking
- Foutregistratie

**(b) Kritieke bugs**
- Diagnose en herstel van Kritieke bugs zoals gedefinieerd in artikel 1.4

**(c) Beveiligingsupdates**
- Toepassen van Beveiligingsupdates zoals gedefinieerd in artikel 1.5
- Updates van kernafhankelijkheden bij kritieke kwetsbaarheden

**(d) Infrastructuur**
- Verificatie van back-ups
- Vernieuwing van SSL-certificaten
- DNS-beheer
- Standaard databaseonderhoud

### 2.2 Prioriteiten en responstijden

| Prioriteit | Omschrijving | Reactietijd | Oplostijd |
|------------|-------------|-------------|-----------|
| **P1 — Kritiek** | Platform volledig onbereikbaar, dataverlies, actieve uitbuiting van een beveiligingslek | 1 uur | 4 uur |
| **P2 — Hoog** | Kritieke bug (Art. 1.4), ernstige functieverstoring voor alle gebruikers | 4 uur | 8 uur |
| **P3 — Medium** | Beveiligingsupdate (Art. 1.5), gedeeltelijke functieverstoring | 8 werkuren | 5 werkdagen |
| **P4 — Laag** | Standaard onderhoud, certificaatvernieuwing, back-upverificatie | 2 werkdagen | 10 werkdagen |

Werktijden: maandag t/m vrijdag, 9:00-17:00 CET. Reactie- en oplostijden worden gemeten in werkuren respectievelijk werkdagen, tenzij anders vermeld. Meldingen buiten werktijden worden geacht te zijn ontvangen bij aanvang van de eerstvolgende werkdag.

De classificatie van prioriteit wordt bepaald door Opdrachtnemer.

### 2.3 Maximale inzet

De Diensten bedragen maximaal **1 uur per week** gemiddeld over een kalendermaand. Opdrachtnemer is niet verplicht meer uren te besteden. Indien de Diensten structureel meer dan 1 uur per week vergen, is artikel 5.3 van toepassing.

### 2.4 Uitsluitingen

De volgende werkzaamheden vallen uitdrukkelijk **niet** onder de Diensten en worden aangemerkt als Meerwerk:

- Eindgebruikersondersteuning, training of inwerkbegeleiding
- Nieuwe functionaliteit of verzoeken tot nieuwe functionaliteit
- Uitbreidingen van bestaande functionaliteit
- Integraties met externe systemen (inclusief maar niet beperkt tot SpiekR)
- Ontwikkeling, onderhoud of publicatie van mobiele applicaties (iOS en Android), inclusief maar niet beperkt tot de Dinckly app — met dien verstande dat de backend API-endpoints die deze applicaties bedienen wél onderdeel zijn van het Platform (Art. 1.1) en daarmee onder de Diensten vallen
- Verbeteringen van gebruikersinterface of ontwerp
- Prestatie-optimalisatie (tenzij sprake van een Kritieke bug)
- Herstructurering van code of architectuurverbeteringen
- Niet-kritieke bugs (cosmetische gebreken, kleine gebruiksproblemen, randgevallen zonder wezenlijke bedrijfsimpact)
- Bijwerken van documentatie
- Database-optimalisatie (niet-kritiek)
- Cache-implementaties

Bij twijfel over de classificatie van een verzoek beslist Opdrachtnemer.

---

## Artikel 3. Meerwerk

**3.1** Meerwerk wordt uitsluitend verricht na voorafgaande schriftelijke offerte door Opdrachtnemer en schriftelijke goedkeuring door Opdrachtgever.

**3.2** Het uurtarief voor Meerwerk bedraagt **€125,00 exclusief btw**.

**3.3** Opdrachtnemer factureert Meerwerk maandelijks achteraf op basis van bestede uren.

**3.4** Op Meerwerk zijn de overige bepalingen van deze overeenkomst (waaronder aansprakelijkheid, geheimhouding en communicatie) onverkort van toepassing, tenzij schriftelijk anders overeengekomen.

---

## Artikel 4. Hostingkosten

### 4.1 Specificatie

Het Platform draait op de volgende infrastructuur:

| Component | Leverancier | Maandkosten |
|-----------|-------------|-------------|
| Applicatiehosting (3 servers) | Hatchbox.io | $30,00 |
| Servers: lb01 Nano 1GB, web01 2GB, db01 4GB | Linode/Akamai | $41,00 |
| Objectopslag (~3.229 GB: video's, back-ups, Google Drive-gegevens) | Cloudflare R2 | ~$48,30 |
| Broncoderepository (GitHub Team) | GitHub | $4,00/user/maand |
| Bewaking (gratis abonnement; 50.000 verzoeken, 1 GB logregistratie) | AppSignal | €0,00 |
| **Totaal** | | **~$123,30/maand (~€114)** |

*N.B. GitHub Team-kosten zijn afhankelijk van het aantal gebruikers. Bovenstaand totaal is berekend op basis van 1 gebruiker ($4,00). Bij meerdere gebruikers wordt het totaal evenredig verhoogd.*

*N.B. AppSignal schaalt naar €22,00/maand bij overschrijding van 50.000 verzoeken per maand (250.000-verzoeken-abonnement). Cloudflare R2 tarief: $0,015/GB/maand, 10 GB gratis.*

### 4.2 Doorbelasting

Hostingkosten worden maandelijks door Opdrachtnemer aan Opdrachtgever gefactureerd **tegen kostprijs**, op basis van de werkelijke kosten van de onderliggende leveranciers.

### 4.3 Betalingstermijn

De betalingstermijn voor hostingfacturen bedraagt **14 dagen** na factuurdatum.

### 4.4 Specificatie op factuur

Elke factuur bevat een specificatie van de individuele kostenposten en de onderliggende leveranciersfacturen worden op verzoek beschikbaar gesteld.

### 4.5 Migratie naar eigen accounts

Op verzoek van Opdrachtgever draagt Opdrachtnemer de hosting- en infrastructuuraccounts eenmalig over naar accounts op naam van Opdrachtgever. Opdrachtgever stelt daartoe de benodigde betaalgegevens (creditcard) ter beschikking. Opdrachtnemer verzorgt de migratie en levert een infrastructuurdocumentatie op met een overzicht van alle servers, diensten, accounts en bijbehorende kosten.

Na voltooiing van de migratie:
- betaalt Opdrachtgever de hostingkosten rechtstreeks aan de onderliggende leveranciers;
- vervallen de artikelen 4.2, 4.3 en 4.4;
- blijven de overige bepalingen van deze overeenkomst onverkort van kracht.

De migratie en documentatie worden eenmalig verricht zonder aanvullende kosten.

### 4.6 Wijzigingen

Indien de Hostingkosten met meer dan **20%** stijgen ten opzichte van het voorgaande kwartaal (anders dan door een door Opdrachtgever verzochte uitbreiding), stelt Opdrachtnemer Opdrachtgever hiervan schriftelijk in kennis. Opdrachtgever kan binnen 14 dagen na kennisgeving bezwaar maken. Partijen treden in dat geval in overleg over alternatieve oplossingen.

---

## Artikel 5. Vergoeding

### 5.1 KTLO-diensten

De Diensten zoals omschreven in artikel 2 worden **niet gefactureerd**. Opdrachtnemer verricht deze werkzaamheden in het belang van het aandeelhouderschap van PHBX Holding B.V. in Opdrachtgever.

### 5.2 Gefactureerde posten

Opdrachtgever is uitsluitend verschuldigd:
- (a) de Hostingkosten op grond van artikel 4; en
- (b) vergoedingen voor Meerwerk op grond van artikel 3.

### 5.3 Herzieningsrecht

Indien de Diensten gedurende drie opeenvolgende maanden structureel meer dan 1 uur per week vergen, heeft Opdrachtnemer het recht een redelijke vergoeding voor te stellen voor het meerdere. Partijen treden in dat geval in overleg. Komen Partijen niet tot overeenstemming binnen 30 dagen, dan is Opdrachtnemer gerechtigd de maximale inzet terug te brengen tot 1 uur per week of de overeenkomst op te zeggen met inachtneming van de opzegtermijn in artikel 6.3.

---

## Artikel 6. Duur en Beëindiging

### 6.1 Ingangsdatum

Deze overeenkomst treedt in werking op 1 maart 2026 en wordt aangegaan voor onbepaalde tijd.

### 6.2 Koppeling aan aandeelhouderschap

Deze overeenkomst is onlosmakelijk verbonden aan het aandeelhouderschap van PHBX Holding B.V. in Opdrachtgever. Bij overdracht van de aandelen van PHBX Holding B.V. in Opdrachtgever — om welke reden dan ook — eindigt deze overeenkomst van rechtswege op de datum van de aandelenoverdracht, zonder dat opzegging of ingebrekestelling is vereist.

### 6.3 Opzegging

Ieder der Partijen kan deze overeenkomst opzeggen met inachtneming van een opzegtermijn van **1 kalendermaand**, per e-mail met ontvangstbevestiging.

### 6.4 Opeisbaarheid bij beëindiging

Bij beëindiging van deze overeenkomst — ongeacht de reden — worden alle openstaande facturen van Opdrachtnemer direct en volledig opeisbaar, zonder dat ingebrekestelling is vereist.

---

## Artikel 7. Opschorting

### 7.1 Opschortingsrecht

Indien Opdrachtgever enige betalingsverplichting uit deze overeenkomst niet tijdig nakomt, is Opdrachtnemer gerechtigd de Diensten met onmiddellijke ingang op te schorten, zonder voorafgaande ingebrekestelling.

### 7.2 Geen aansprakelijkheid

Opdrachtnemer is niet aansprakelijk voor schade die Opdrachtgever lijdt als gevolg van opschorting op grond van dit artikel, waaronder maar niet beperkt tot: onbeschikbaarheid van het Platform, dataverlies, of gederfde inkomsten.

### 7.3 Ontbinding

Indien de betalingsachterstand voortduurt na **30 dagen** na de datum van opschorting, is Opdrachtnemer gerechtigd de overeenkomst met onmiddellijke ingang te ontbinden door middel van een schriftelijke verklaring, onverminderd het recht op vergoeding van openstaande facturen en eventuele schade.

---

## Artikel 8. Intellectueel eigendom

### 8.1 Eigendom

Alle intellectuele eigendomsrechten met betrekking tot het Platform, de broncode en de onderliggende technologie berusten bij Opdrachtgever.

### 8.2 Geen overdracht door dienstverlening

Door het verrichten van de Diensten vindt geen wijziging plaats in de bestaande eigendomsverhoudingen. Opdrachtnemer verkrijgt geen intellectuele eigendomsrechten op het Platform of enig onderdeel daarvan.

---

## Artikel 9. Aansprakelijkheid

### 9.1 Beperking

De aansprakelijkheid van Opdrachtnemer voor schade voortvloeiend uit of verband houdend met de uitvoering van deze overeenkomst is beperkt tot gevallen van opzet of grove nalatigheid.

### 9.2 Uitsluiting indirecte schade

Opdrachtnemer is nimmer aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen, verlies van data of schade door bedrijfsstagnatie.

### 9.3 Maximering

Indien en voor zover Opdrachtnemer ondanks het bepaalde in dit artikel aansprakelijk is, is de totale aansprakelijkheid beperkt tot het bedrag dat door Opdrachtgever aan Opdrachtnemer is betaald in de **12 kalendermaanden** voorafgaand aan de schadeveroorzakende gebeurtenis.

### 9.4 Vervaltermijn

Iedere vordering van Opdrachtgever op Opdrachtnemer vervalt 12 maanden na de datum waarop Opdrachtgever bekend werd of redelijkerwijs bekend had kunnen zijn met de schade.

---

## Artikel 10. Beveiliging en Toegangsbeheer

### 10.1 Beheer van toegangsgegevens

Opdrachtnemer beheert alle inloggegevens, API-sleutels en overige toegangsgegevens die benodigd zijn voor de uitvoering van de Diensten uitsluitend via een professionele wachtwoordbeheerder (1Password). Opdrachtnemer deelt geen toegangsgegevens via e-mail, chatberichten, gedeelde documenten of andere onbeveiligde kanalen.

### 10.2 Beperking aansprakelijkheid toegang

Opdrachtnemer is niet aansprakelijk voor beveiligingsincidenten, datalekken of ongeautoriseerde toegang die het gevolg zijn van:
- (a) het opslaan van toegangsgegevens in platte tekst door Opdrachtgever of derden;
- (b) het delen van toegangsgegevens via onbeveiligde kanalen door Opdrachtgever of derden;
- (c) toegang verleend door Opdrachtgever aan derden zonder voorafgaand overleg met Opdrachtnemer;
- (d) handelingen van derden aan wie Opdrachtgever toegang heeft verstrekt tot de infrastructuur of broncode.

### 10.3 Toegangswijzigingen

Wijzigingen in de toegangsrechten tot de infrastructuur, repositories of hostingaccounts vinden uitsluitend plaats in overleg met Opdrachtnemer, zolang deze overeenkomst van kracht is.

---

## Artikel 11. Communicatie

### 11.1 Contactgegevens

| Partij | E-mail |
|--------|--------|
| Opdrachtnemer | info@peterberkenbosch.nl |
| Opdrachtgever | douwine@dinck.nl |

### 11.2 Escalatieprotocol

Bij P1- en P2-incidenten stuurt Opdrachtgever een e-mail met als onderwerp: **"URGENT: [omschrijving probleem]"**. Bij het uitblijven van een reactie binnen de in artikel 2.2 genoemde reactietijden kan Opdrachtgever telefonisch contact opnemen.

---

## Artikel 12. Geheimhouding

### 12.1 Verplichting

Partijen verplichten zich over en weer tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van deze overeenkomst van de andere Partij ontvangen.

### 12.2 Uitzondering adviseurs

De geheimhoudingsverplichting geldt niet voor informatie die een Partij deelt met haar juridische, fiscale of financiële adviseurs, mits deze adviseurs aan een gelijkwaardige of strengere geheimhoudingsverplichting zijn gebonden.

### 12.3 Wettelijke verplichting

De geheimhoudingsverplichting geldt niet voor zover openbaarmaking wettelijk of door een rechterlijk bevel is vereist, mits de openbarende Partij de andere Partij hiervan onverwijld in kennis stelt.

### 12.4 Duur

De geheimhoudingsverplichting blijft van kracht gedurende de looptijd van deze overeenkomst en **2 jaar** na beëindiging daarvan.

---

## Artikel 13. Slotbepalingen

### 13.1 Zelfstandigheid

Opdrachtnemer verricht de Diensten als zelfstandig opdrachtnemer. Er is geen sprake van een arbeidsovereenkomst, dienstverband of gezagsverhouding. Opdrachtnemer bepaalt zelfstandig de wijze waarop en de tijdstippen waarop de Diensten worden verricht, binnen de kaders van de in artikel 2.2 genoemde responstijden.

### 13.2 Wijzigingen

Wijzigingen van of aanvullingen op deze overeenkomst zijn uitsluitend geldig indien schriftelijk overeengekomen door beide Partijen.

### 13.3 Overdracht

Geen der Partijen is gerechtigd rechten of verplichtingen uit deze overeenkomst over te dragen aan derden zonder voorafgaande schriftelijke toestemming van de andere Partij.

### 13.4 Nietigheid

Indien enige bepaling van deze overeenkomst nietig of vernietigbaar blijkt, tast dit de geldigheid van de overige bepalingen niet aan. Partijen treden in dat geval in overleg om een vervangende bepaling overeen te komen die de strekking van de nietige bepaling zo dicht mogelijk benadert.

### 13.5 Toepasselijk recht

Op deze overeenkomst is Nederlands recht van toepassing.

### 13.6 Geschillen

Alle geschillen voortvloeiend uit of verband houdend met deze overeenkomst worden voorgelegd aan de bevoegde rechter te **Leeuwarden**.

---

## Ondertekening

Aldus opgesteld en ondertekend te Oosterwolde.

| | Opdrachtnemer | Opdrachtgever |
|---|---|---|
| **Naam** | Peter Berkenbosch | Douwine Koopman |
| **Functie** | Directeur Peter Berkenbosch Consultancy B.V. | Bestuurder Dinck B.V. |
| **Handtekening** | | |
| | | |
| **Datum** | 9 maart 2026 | _________________________ |
