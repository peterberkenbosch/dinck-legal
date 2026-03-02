# KTLO Scope Definitie - Dinck B.V.

**Keep The Lights On** — Scope definitie voor technische onderhoudsdiensten door Peter Berkenbosch Consultancy B.V.

**Geformaliseerd in**: `concepten/ktlo-overeenkomst.md`

---

## 1. Context

Na terugtreden als bestuurder van Dinck B.V. per 1 maart 2026 is Peter bereid om via Peter Berkenbosch Consultancy B.V. technische onderhoudsdiensten te verrichten om het platform app.dinck.nl operationeel te houden. PHBX Holding B.V. blijft aandeelhouder (33,3%) van Dinck B.V.

Dit document definieert de scope van deze dienstverlening. De formele voorwaarden zijn vastgelegd in de Overeenkomst van Dienstverlening (`concepten/ktlo-overeenkomst.md`).

---

## 2. Wat WEL Binnen KTLO Valt

### 2.1 Monitoring
- Server monitoring en alerts
- Uptime bewaking
- Error tracking

### 2.2 Kritieke Bugs
Definitie "kritiek":
- Platform volledig onbereikbaar
- Data verlies of corruptie
- Actief misbruik van security-kwetsbaarheid
- Incorrecte financiële transacties

### 2.3 Security Patches
- CVE score ≥ 7.0 (high/critical)
- Direct exploiteerbare kwetsbaarheden
- Patches van core dependencies

### 2.4 Infrastructuur
- Backup verificatie
- SSL certificaat vernieuwing
- DNS beheer
- Database onderhoud (standaard)

### 2.5 Responstijden

| Type | Reactietijd | Oplostijd |
|------|-------------|-----------|
| Platform down | 4 uur | Best effort |
| Kritieke bug | 24 uur | 72 uur |
| Security patch | 48 uur | 1 week |

---

## 3. Wat NIET Binnen KTLO Valt

### 3.1 Nieuwe Functionaliteit
- Nieuwe features
- Feature requests
- Uitbreidingen bestaande functionaliteit

### 3.2 UI/UX Verbeteringen
- Design updates
- Gebruikerservaring optimalisaties
- Nieuwe schermen of flows

### 3.3 Niet-Kritieke Bugs
- Cosmetische issues
- Minor usability problemen
- Edge cases zonder business impact

### 3.4 Integraties
- Nieuwe koppelingen (incl. SpiekR integratie)
- API uitbreidingen
- Third-party integraties

### 3.5 Performance Optimalisatie
- Snelheidsverbeteringen
- Database optimalisatie (niet-kritiek)
- Caching implementaties

### 3.6 Refactoring
- Code opschoning
- Architectuur verbeteringen
- Technische schuld

### 3.7 Mobile Apps
- iOS app (Dinckly) - niet afgerond
- Eventuele Android app
- App Store updates

### 3.8 Support
- Eindgebruiker support
- Training
- Documentatie updates

---

## 4. Definitie Kritieke Bug

Een bug is "kritiek" wanneer aan minimaal één van deze criteria wordt voldaan:

| Criterium | Voorbeeld |
|-----------|-----------|
| Platform volledig onbereikbaar | Server down, database crash |
| Data verlies of corruptie | Records verdwijnen, data wordt overschreven |
| Actief security misbruik | Exploitatie van kwetsbaarheid door kwaadwillende |
| Incorrecte financiële transacties | Verkeerde bedragen, dubbele charges |

Bugs die **niet** kritiek zijn:
- Visuele glitches
- Trage laadtijden (tenzij >30 seconden)
- Fouten in niet-essentiële features
- Browser-specifieke issues

---

## 5. Vergoeding

### KTLO (Gratis)
Via Peter Berkenbosch Consultancy B.V. worden KTLO-diensten kosteloos verricht, in het belang van het aandeelhouderschap van PHBX Holding B.V. Zie Artikel 5 van de Overeenkomst van Dienstverlening.

### Buiten Scope (Betaald)
Alle werkzaamheden buiten KTLO scope vereisen voorafgaande schriftelijke offerte en goedkeuring:
- Uurtarief: €125 excl. BTW
- Facturering: maandelijks achteraf
- Scope: per project te definiëren
- Zie Artikel 3 van de Overeenkomst van Dienstverlening

---

## 6. Duur

De dienstverlening door Peter Berkenbosch Consultancy B.V. is gekoppeld aan het aandeelhouderschap van PHBX Holding B.V. in Dinck B.V. Bij overdracht van de aandelen eindigt de overeenkomst van rechtswege.

Opzegtermijn: 1 kalendermaand. Zie Artikel 6 van de Overeenkomst van Dienstverlening.

---

## 7. Infrastructuurkosten

Peter Berkenbosch Consultancy B.V. betaalt momenteel ~€150/maand aan infrastructuurkosten:
- Hosting (servers, databases)
- Monitoring tools
- GitHub (versiebeheer)
- SSL certificaten

Deze kosten worden maandelijks tegen kostprijs doorbelast aan Dinck B.V. (betalingstermijn: 14 dagen). Zie Artikel 4 van de Overeenkomst van Dienstverlening.

---

## 8. Lopende Trajecten (NIET afgerond)

De volgende trajecten worden **niet** voortgezet zonder leveranciersovereenkomst:

| Traject | Status | Reden stop |
|---------|--------|------------|
| Dinckly iOS App | In TestFlight | Geen leveranciersovereenkomst |
| SpiekR integratie | Nog niet gestart | Geen leveranciersovereenkomst |
| Gastouderbureau samenwerking | Onbekend | Geen leveranciersovereenkomst |
| Korting opties organisaties | Onbekend | Geen leveranciersovereenkomst |

---

## 9. Communicatie

### Meldingen KTLO-issues
- Via Basecamp (async)
- E-mail info@peterberkenbosch.nl
- Geen telefonische bereikbaarheid voor KTLO

### Escalatie
Bij uitblijven reactie binnen SLA: e-mail met onderwerp "URGENT: [omschrijving]"

Zie Artikel 10 van de Overeenkomst van Dienstverlening voor het volledige communicatieprotocol.
