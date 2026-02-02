# KTLO Scope Definitie - Dinck B.V.

**Keep The Lights On** — Wat Peter wél en niet doet als aandeelhouder na uittreden als bestuurder.

---

## 1. Context

Na terugtreden als bestuurder per 1 maart 2026 blijft PHBX Holding B.V. aandeelhouder (33,3%) van Dinck B.V. In het belang van de waarde van het aandeelhouderschap is Peter bereid om de software operationeel te houden.

Dit document definieert de scope van deze inzet.

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
Als aandeelhouder heeft Peter belang bij het operationeel houden van het platform. KTLO wordt daarom niet gefactureerd.

### Buiten Scope (Betaald)
Alle werkzaamheden buiten KTLO scope vereisen een separate leveranciersovereenkomst met:
- Uurtarief: €125 (regulier tarief)
- Retainer: vooraf te voldoen
- Scope: per project te definiëren

---

## 6. Duur

Deze KTLO-definitie geldt zolang PHBX Holding B.V. aandeelhouder is van Dinck B.V.

Bij verkoop van aandelen vervalt deze inzet.

---

## 7. Infrastructuurkosten

Peter betaalt momenteel ~€150/maand aan infrastructuurkosten:
- Hosting (servers, databases)
- Monitoring tools
- GitHub (versiebeheer)
- SSL certificaten

**Voorstel**: Deze kosten worden maandelijks doorbelast aan Dinck B.V., of de accounts worden overgedragen naar Dinck B.V.

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
- E-mail peter@phbxholding.com
- Geen telefonische bereikbaarheid voor KTLO

### Escalatie
Bij uitblijven reactie binnen SLA: e-mail met onderwerp "URGENT: [omschrijving]"
