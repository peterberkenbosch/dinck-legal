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

A. Opdrachtgever exploiteert een softwareplatform voor kinderopvangorganisaties, bereikbaar via app.dinck.nl (het **Platform**).

B. Het Platform is ontwikkeld door Peter Berkenbosch en draait op infrastructuur die wordt beheerd door Opdrachtnemer.

C. PHBX Holding B.V. is aandeelhouder van Opdrachtgever en houdt 33,3% van de aandelen. Peter Berkenbosch is bestuurder van zowel Opdrachtnemer als PHBX Holding B.V.

D. Peter Berkenbosch is per 1 maart 2026 afgetreden als bestuurder van Opdrachtgever.

E. Tijdens de bijeenkomst van 11 februari 2026 ten kantore van Van der Meer Accountants & Consultants te Oosterwolde, in aanwezigheid van onder meer Douwine Koopman, Marlou Woltmeijer, Grady Hofstra en Klaas de Vries, zijn Partijen overeengekomen dat Peter Berkenbosch uitsluitend KTLO-werkzaamheden zal verrichten voor het Platform.

F. Partijen wensen de voorwaarden van deze KTLO-dienstverlening schriftelijk vast te leggen (**Keep The Lights On** / **KTLO**).

G. Deze overeenkomst betreft een zuivere commerciële dienstverlening en staat los van de aandeelhoudersrelatie tussen PHBX Holding B.V. en Opdrachtgever.

---

## Artikel 1 — Definities

In deze overeenkomst wordt verstaan onder:

**1.1 Platform**: Het softwareplatform van Opdrachtgever, bereikbaar via app.dinck.nl, inclusief de onderliggende servers, databases en infrastructuur.

**1.2 Diensten**: De in Artikel 2 omschreven KTLO-werkzaamheden.

**1.3 Hostingkosten**: De in Artikel 4 gespecificeerde kosten voor servers, opslag en overige infrastructuur benodigd voor het operationeel houden van het Platform.

**1.4 Kritieke Bug**: Een softwarefout waardoor:
- (a) het Platform volledig onbereikbaar is; of
- (b) data verlies of corruptie optreedt; of
- (c) een security-kwetsbaarheid actief wordt misbruikt; of
- (d) incorrecte financiële transacties plaatsvinden.

**1.5 Security Patch**: Een update ter verhelping van een beveiligingskwetsbaarheid met een CVE-score van 7.0 of hoger (high/critical), of een direct exploiteerbare kwetsbaarheid in een core dependency.

**1.6 Werkzaamheden Buiten Scope**: Alle werkzaamheden die niet vallen onder de Diensten zoals omschreven in Artikel 2, en nader gespecificeerd in Artikel 3.

---

## Artikel 2 — Scope van de Diensten

### 2.1 Omvang

De Diensten omvatten uitsluitend het volgende:

**(a) Monitoring**
- Server monitoring en alerts
- Uptime bewaking
- Error tracking

**(b) Kritieke Bugs**
- Diagnose en herstel van Kritieke Bugs zoals gedefinieerd in Artikel 1.4

**(c) Security Patches**
- Toepassen van Security Patches zoals gedefinieerd in Artikel 1.5
- Updates van core dependencies bij kritieke kwetsbaarheden

**(d) Infrastructuur**
- Backup verificatie
- SSL certificaat vernieuwing
- DNS beheer
- Standaard database onderhoud

### 2.2 Responstijden

| Type | Reactietijd | Oplostijd |
|------|-------------|-----------|
| Platform volledig onbereikbaar | 4 uur (binnen werktijden) | Best effort |
| Kritieke Bug | 24 uur | 72 uur |
| Security Patch | 48 uur | 1 week |

Werktijden: maandag t/m vrijdag, 9:00-17:00 CET. Meldingen buiten werktijden worden geacht te zijn ontvangen bij aanvang van de eerstvolgende werkdag.

### 2.3 Maximale inzet

De Diensten bedragen maximaal **1 uur per week** gemiddeld over een kalendermaand. Opdrachtnemer is niet verplicht meer uren te besteden. Indien de Diensten structureel meer dan 1 uur per week vergen, is Artikel 5.3 van toepassing.

### 2.4 Uitsluitingen

De volgende werkzaamheden vallen uitdrukkelijk **niet** onder de Diensten:

- Eindgebruiker support, training of onboarding
- Nieuwe functionaliteit of feature requests
- Uitbreidingen van bestaande functionaliteit
- Integraties met externe systemen (inclusief maar niet beperkt tot SpiekR)
- Mobile applicaties (inclusief maar niet beperkt tot Dinckly iOS)
- UI/UX verbeteringen of design updates
- Performance optimalisatie (tenzij sprake van een Kritieke Bug)
- Refactoring of architectuurverbeteringen
- Niet-kritieke bugs (cosmetische issues, minor usability problemen, edge cases zonder business impact)
- Documentatie updates
- Database optimalisatie (niet-kritiek)
- Caching implementaties

Bij twijfel over de classificatie van een verzoek beslist Opdrachtnemer.

---

## Artikel 3 — Werkzaamheden Buiten Scope

**3.1** Werkzaamheden Buiten Scope worden uitsluitend verricht na voorafgaande schriftelijke offerte door Opdrachtnemer en schriftelijke goedkeuring door Opdrachtgever.

**3.2** Het uurtarief voor Werkzaamheden Buiten Scope bedraagt **€125,00 exclusief BTW**.

**3.3** Opdrachtnemer factureert Werkzaamheden Buiten Scope maandelijks achteraf op basis van bestede uren.

**3.4** Op Werkzaamheden Buiten Scope zijn de overige bepalingen van deze overeenkomst (waaronder aansprakelijkheid, geheimhouding en communicatie) onverkort van toepassing, tenzij schriftelijk anders overeengekomen.

---

## Artikel 4 — Hostingkosten

### 4.1 Specificatie

Het Platform draait op de volgende infrastructuur:

| Component | Leverancier | Maandkosten |
|-----------|-------------|-------------|
| Applicatiehosting (3 servers) | Hatchbox.io | $30,00 |
| Servers: lb01 Nano 1GB, web01 2GB, db01 4GB | Linode/Akamai | $41,00 |
| Object Storage (~3.229 GB: video's, backups, Google Drive data) | Cloudflare R2 | ~$48,30 |
| Monitoring (free plan; 50K requests, 1GB logging) | AppSignal | €0,00 |
| **Totaal** | | **~$119,30/maand (~€110)** |

*Noot: AppSignal schaalt naar €22,00/maand bij overschrijding van 50K requests/maand (250K requests plan). Cloudflare R2 tarief: $0,015/GB/maand, 10 GB gratis.*

### 4.2 Doorbelasting

Hostingkosten worden maandelijks door Opdrachtnemer aan Opdrachtgever gefactureerd **tegen kostprijs**, op basis van de werkelijke kosten van de onderliggende leveranciers.

### 4.3 Betalingstermijn

De betalingstermijn voor hostingfacturen bedraagt **14 dagen** na factuurdatum.

### 4.4 Specificatie op factuur

Elke factuur bevat een specificatie van de individuele kostenposten en de onderliggende leveranciersfacturen worden op verzoek beschikbaar gesteld.

### 4.5 Wijzigingen

Indien de Hostingkosten met meer dan **20%** stijgen ten opzichte van het voorgaande kwartaal (anders dan door een door Opdrachtgever verzochte uitbreiding), stelt Opdrachtnemer Opdrachtgever hiervan schriftelijk in kennis. Opdrachtgever kan binnen 14 dagen na kennisgeving bezwaar maken. Partijen treden in dat geval in overleg over alternatieve oplossingen.

---

## Artikel 5 — Vergoeding

### 5.1 KTLO-diensten

De Diensten zoals omschreven in Artikel 2 worden **niet gefactureerd**. Opdrachtnemer verricht deze werkzaamheden in het belang van het aandeelhouderschap van PHBX Holding B.V. in Opdrachtgever.

### 5.2 Gefactureerde posten

Opdrachtgever is uitsluitend verschuldigd:
- (a) de Hostingkosten op grond van Artikel 4; en
- (b) vergoedingen voor Werkzaamheden Buiten Scope op grond van Artikel 3.

### 5.3 Herzieningsrecht

Indien de Diensten gedurende drie opeenvolgende maanden structureel meer dan 1 uur per week vergen, heeft Opdrachtnemer het recht een redelijke vergoeding voor te stellen voor het meerdere. Partijen treden in dat geval in overleg. Komen Partijen niet tot overeenstemming binnen 30 dagen, dan is Opdrachtnemer gerechtigd de maximale inzet terug te brengen tot 1 uur per week of de overeenkomst op te zeggen met inachtneming van de opzegtermijn in Artikel 6.3.

---

## Artikel 6 — Duur en Beeindiging

### 6.1 Ingangsdatum

Deze overeenkomst treedt in werking op 1 maart 2026 en wordt aangegaan voor onbepaalde tijd.

### 6.2 Koppeling aan aandeelhouderschap

Deze overeenkomst is onlosmakelijk verbonden aan het aandeelhouderschap van PHBX Holding B.V. in Opdrachtgever. Bij overdracht van de aandelen van PHBX Holding B.V. in Opdrachtgever — om welke reden dan ook — eindigt deze overeenkomst van rechtswege op de datum van de aandelenoverdracht, zonder dat opzegging of ingebrekestelling is vereist.

### 6.3 Opzegging

Ieder der Partijen kan deze overeenkomst opzeggen met inachtneming van een opzegtermijn van **1 kalendermaand**, per e-mail met ontvangstbevestiging.

### 6.4 Opeisbaarheid bij beeindiging

Bij beeindiging van deze overeenkomst — ongeacht de reden — worden alle openstaande facturen van Opdrachtnemer direct en volledig opeisbaar, zonder dat ingebrekestelling is vereist.

---

## Artikel 7 — Opschorting

### 7.1 Opschortingsrecht

Indien Opdrachtgever enige betalingsverplichting uit deze overeenkomst niet tijdig nakomt, is Opdrachtnemer gerechtigd de Diensten met onmiddellijke ingang op te schorten, zonder voorafgaande ingebrekestelling.

### 7.2 Geen aansprakelijkheid

Opdrachtnemer is niet aansprakelijk voor schade die Opdrachtgever lijdt als gevolg van opschorting op grond van dit artikel, waaronder maar niet beperkt tot: downtime van het Platform, dataverlies, of gederfde inkomsten.

### 7.3 Ontbinding

Indien de betalingsachterstand voortduurt na **30 dagen** na de datum van opschorting, is Opdrachtnemer gerechtigd de overeenkomst met onmiddellijke ingang te ontbinden door middel van een schriftelijke verklaring, onverminderd het recht op vergoeding van openstaande facturen en eventuele schade.

---

## Artikel 8 — Intellectueel Eigendom

### 8.1 Geen overdracht

Door het verrichten van de Diensten vindt geen overdracht van intellectuele eigendomsrechten plaats. Alle bestaande intellectuele eigendomsrechten met betrekking tot het Platform, de broncode en de onderliggende technologie blijven berusten bij de huidige rechthebbende(n).

### 8.2 Geen toegang broncode

Deze overeenkomst verschaft Opdrachtgever geen recht op toegang tot, inzage in of een kopie van de broncode van het Platform. Toegang tot de broncode is geen onderdeel van de Diensten.

### 8.3 Bestaande rechten

Deze overeenkomst laat de bestaande eigendomsverhoudingen met betrekking tot het Platform onverlet. Niets in deze overeenkomst kan worden uitgelegd als een wijziging, afstand of overdracht van bestaande intellectuele eigendomsrechten.

---

## Artikel 9 — Aansprakelijkheid

### 9.1 Beperking

De aansprakelijkheid van Opdrachtnemer voor schade voortvloeiend uit of verband houdend met de uitvoering van deze overeenkomst is beperkt tot gevallen van opzet of grove nalatigheid.

### 9.2 Uitsluiting indirecte schade

Opdrachtnemer is nimmer aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen, verlies van data of schade door bedrijfsstagnatie.

### 9.3 Maximering

Indien en voor zover Opdrachtnemer ondanks het bepaalde in dit artikel aansprakelijk is, is de totale aansprakelijkheid beperkt tot het bedrag dat door Opdrachtgever aan Opdrachtnemer is betaald in de **12 kalendermaanden** voorafgaand aan de schadeveroorzakende gebeurtenis.

### 9.4 Vervaltermijn

Iedere vordering van Opdrachtgever op Opdrachtnemer vervalt 12 maanden na de datum waarop Opdrachtgever bekend werd of redelijkerwijs bekend had kunnen zijn met de schade.

---

## Artikel 10 — Communicatie

### 10.1 Asynchroon

Alle communicatie met betrekking tot de Diensten vindt uitsluitend plaats via e-mail of Basecamp (**asynchroon**). Opdrachtnemer is niet telefonisch bereikbaar voor aangelegenheden die verband houden met deze overeenkomst.

### 10.2 Contactgegevens

| Partij | E-mail |
|--------|--------|
| Opdrachtnemer | info@peterberkenbosch.nl |
| Opdrachtgever | douwine@dinck.nl |

### 10.3 Escalatieprotocol

Bij het uitblijven van een reactie binnen de in Artikel 2.2 genoemde reactietijden, stuurt Opdrachtgever een e-mail met als onderwerp: **"URGENT: [omschrijving probleem]"**. Opdrachtnemer reageert op een URGENT-melding binnen 2 uur tijdens werktijden.

---

## Artikel 11 — Geheimhouding

### 11.1 Verplichting

Partijen verplichten zich over en weer tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van deze overeenkomst van de andere Partij ontvangen.

### 11.2 Uitzondering adviseurs

De geheimhoudingsverplichting geldt niet voor informatie die een Partij deelt met haar juridisch, fiscaal of financieel adviseurs, mits deze adviseurs aan een gelijkwaardige of strengere geheimhoudingsverplichting zijn gebonden.

### 11.3 Wettelijke verplichting

De geheimhoudingsverplichting geldt niet voor zover openbaarmaking wettelijk of door een rechterlijk bevel is vereist, mits de openbarende Partij de andere Partij hiervan onverwijld in kennis stelt.

### 11.4 Duur

De geheimhoudingsverplichting blijft van kracht gedurende de looptijd van deze overeenkomst en **2 jaar** na beeindiging daarvan.

---

## Artikel 12 — Overige Bepalingen

### 12.1 Zelfstandigheid

Opdrachtnemer verricht de Diensten als zelfstandig opdrachtnemer. Er is geen sprake van een arbeidsovereenkomst, dienstverband of gezagsverhouding. Opdrachtnemer bepaalt zelfstandig de wijze waarop en de tijdstippen waarop de Diensten worden verricht, binnen de kaders van de in Artikel 2.2 genoemde responstijden.

### 12.2 Wijzigingen

Wijzigingen van of aanvullingen op deze overeenkomst zijn uitsluitend geldig indien schriftelijk overeengekomen door beide Partijen.

### 12.3 Overdracht

Geen der Partijen is gerechtigd rechten of verplichtingen uit deze overeenkomst over te dragen aan derden zonder voorafgaande schriftelijke toestemming van de andere Partij.

### 12.4 Nietigheid

Indien enige bepaling van deze overeenkomst nietig of vernietigbaar blijkt, tast dit de geldigheid van de overige bepalingen niet aan. Partijen treden in dat geval in overleg om een vervangende bepaling overeen te komen die de strekking van de nietige bepaling zo dicht mogelijk benadert.

### 12.5 Toepasselijk recht

Op deze overeenkomst is Nederlands recht van toepassing.

### 12.6 Geschillen

Alle geschillen voortvloeiend uit of verband houdend met deze overeenkomst worden voorgelegd aan de bevoegde rechter te **Leeuwarden**.

---

## Ondertekening

Aldus overeengekomen en in tweevoud ondertekend op 1 maart 2026 te Oosterwolde.

| | Opdrachtnemer | Opdrachtgever |
|---|---|---|
| **Naam** | Peter Berkenbosch | Douwine Koopman |
| **Functie** | Directeur Peter Berkenbosch Consultancy B.V. | Bestuurder Dinck B.V. |
| **Handtekening** | _________________________ | _________________________ |
| **Datum** | _________________________ | _________________________ |
