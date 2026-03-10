# Account- en dienstenoverdracht Dinck B.V.

**Status**: Concept — 10 maart 2026
**Grondslag**: KTLO-overeenkomst Art. 4.5 (migratie naar eigen accounts)
**Doel**: Alle Dinck-diensten overdragen van Peters persoonlijke accounts naar accounts op naam van Dinck B.V.

---

## 1. Overzicht per dienst

### A. Domeinnamen (DNSimple → Strato)

| Domein | Registrar (huidig) | Kosten/jaar (huidig) | Doel | Kosten/jaar (Strato) | Status |
|--------|---------------------|----------------------|------|----------------------|--------|
| dinck.nl | DNSimple | $12,30 | Strato (Dinck) | €7,20 | ☐ |
| dinck.app | DNSimple | $22,50 | Strato (Dinck) | €21,00 | ☐ |
| dinck.be | DNSimple | $14,80 | Strato (Dinck) | €6,00 | ☐ |
| dinckly.nl | DNSimple | $12,30 | Strato (Dinck) | €7,20 | ☐ |
| dinckly.app | DNSimple | $22,50 | Strato (Dinck) | €21,00 | ☐ |
| **Subtotaal** | | **$84,40/jaar (~€78)** | | **€62,40/jaar** | |
| dinck-staging.nl | Strato | (Dinck betaalt) | — reeds op naam Dinck | (bestaand) | ☑ |

Strato-prijzen incl. btw, vanaf het tweede jaar (eerste jaar is goedkoper). Bron: strato.nl, maart 2026.

**Werkwijze**: domeinoverdracht = registrar-verhuizing (auth code + unlock bij DNSimple, verhuizing initiëren bij Strato).

**Aandachtspunten**:
- dinck.nl DNS draait momenteel via Cloudflare (Peters account) — moet mee naar Dincks Cloudflare of Strato DNS (zie categorie E)
- .app-domeinen vereisen DNSSEC — Strato ondersteunt .app-registratie (inclusief DNSSEC)
- Alle benodigde TLD's (.nl, .app, .be) beschikbaar bij Strato ✅

### B. Hosting en infrastructuur (→ Hetzner)

Zie `analyse/infrastructuurmigratie-plan.md` voor de volledige architectuurbeschrijving en gefaseerde migratiestappen.

| Dienst | Leverancier (huidig) | Kosten/maand | Doel | Betaalmethode | Status |
|--------|----------------------|--------------|------|---------------|--------|
| Deployment | Hatchbox | $30,00 | Kamal (gratis) | — | ☐ |
| Servers (3× VPS) | Linode/Akamai | $41,00 | Hetzner CX32 (€7,49) | Automatische incasso (actief) | ☐ |
| Serverback-ups | — | — | Hetzner (€1,50) | Automatische incasso (actief) | ☐ |
| **Subtotaal huidig** | | **$71,00/mnd (~€65)** | **€8,99/mnd** | | |

### C. Opslag (Cloudflare R2 → Hetzner Object Storage)

| Dienst | Leverancier (huidig) | Kosten/maand | Doel | Betaalmethode | Status |
|--------|----------------------|--------------|------|---------------|--------|
| Opslag (~3,9 TB) | Cloudflare R2 (Peter) | ~$58,65 | Hetzner Object Storage (~€19) | Automatische incasso (actief) | ☐ |

**Bucketspecificatie**:

| Bucket | Omvang | Categorie |
|--------|--------|-----------|
| dinck (Active Storage uploads) | 229 GB | Applicatie |
| dinck-database-backups | 77 MB | Back-ups |
| dinck-google-drive-backup | 3,68 TB | Archief |

### D. Broncode (GitHub Peter → dinckbv org)

| Dienst | Account (huidig) | Kosten/maand | Doel | Betaalmethode | Status |
|--------|------------------|--------------|------|---------------|--------|
| dinckweb (Rails-monoliet) | GitHub Teams (Peter) | $4,00/user | dinckbv org (GitHub Free) | Creditcard (voor toekomstig gebruik) | ☐ |

**Werkwijze**: overdracht via GitHub "Transfer repository" — behoudt volledige geschiedenis en maakt een redirect aan.

**Aandachtspunten**:
- dinckbv-organisatie bestaat al op GitHub (bevat native-appcode)
- GitHub Free is voldoende; creditcard alleen nodig bij eventuele upgrade

### E. DNS (Cloudflare Peter → Cloudflare Dinck)

| Dienst | Account (huidig) | Kosten/maand | Doel | Betaalmethode | Status |
|--------|------------------|--------------|------|---------------|--------|
| DNS dinck.nl | Cloudflare (Peter, gratis) | €0 | Cloudflare (Dinck, gratis) | Creditcard (voor betaalde diensten) | ☐ |

**Werkwijze**: DNS-zone opnieuw aanmaken op Dincks Cloudflare-account, records overnemen.

**Aandachtspunten**:
- Dincks Cloudflare-account bestaat al (gratis plan, DNS voor dinck-staging.nl)
- Creditcard op Dincks Cloudflare alleen nodig als opslag op Cloudflare R2 blijft — huidig migratieplan gebruikt Hetzner Object Storage

### F. E-mail (MailPace)

| Dienst | Account (huidig) | Kosten/jaar | Doel | Betaalmethode | Status |
|--------|------------------|-------------|------|---------------|--------|
| MailPace Solo (1.000 e-mails/mnd) | Peter | €36/jaar | MailPace (Dinck-account) | Creditcard | ☐ |

**Werkwijze**: nieuw account aanmaken op naam Dinck, of bestaand account overdragen. Beide opties vereisen wijziging van de API-token in de Rails-credentials.

### G. Bewaking (AppSignal)

| Dienst | Account (huidig) | Kosten | Doel | Status |
|--------|------------------|--------|------|--------|
| AppSignal Free | Peter | €0 | Dinck-account aanmaken | ☐ |

---

## 2. Totaaloverzicht kosten

### Huidige kosten (Peter betaalt)

| Categorie | Kosten |
|-----------|--------|
| Domeinnamen | $84,40/jaar (~€78/jaar, ~€6,50/mnd) — DNSimple |
| Hosting (Hatchbox + Linode) | $71,00/mnd (~€65/mnd) |
| Opslag (R2) | ~$58,65/mnd (~€54/mnd) |
| Broncode (GitHub Teams) | $4,00/mnd (~€3,70/mnd) |
| DNS (Cloudflare) | €0 |
| E-mail (MailPace) | €36/jaar (~€3/mnd) |
| Bewaking (AppSignal) | €0 |
| **Totaal** | **~€132/maand** |

### Na overdracht (Dinck betaalt)

| Categorie | Kosten |
|-----------|--------|
| Domeinnamen (Strato) | €62,40/jaar (~€5,20/mnd) |
| Hosting (Hetzner CX32 + back-ups) | €8,99/mnd |
| Opslag (Hetzner Object Storage) | ~€19/mnd |
| Broncode (GitHub Free) | €0 |
| DNS (Cloudflare Free) | €0 |
| E-mail (MailPace Solo) | €36/jaar (~€3/mnd) |
| Bewaking (AppSignal Free) | €0 |
| **Totaal** | **~€36,20/maand** |

### Besparing

**~€95,80/maand (~€1.150/jaar)**

---

## 3. Betaalmethoden Dinck B.V.

| Leverancier | Betaalmethode benodigd | Status |
|-------------|------------------------|--------|
| Strato | Automatische incasso | ✅ Actief (dinck-staging.nl) |
| Hetzner | Automatische incasso | ✅ Actief |
| GitHub | Creditcard | ⚠️ Account bestaat, creditcard onbekend |
| Cloudflare | Creditcard (alleen voor betaalde diensten) | ⚠️ Alleen nodig als R2 op Cloudflare blijft |
| MailPace | Creditcard | ❌ Nieuw account nodig |

**Actie Opdrachtgever**: Douwine moet een creditcard op naam van Dinck B.V. regelen voor MailPace (vereist). GitHub en Cloudflare alleen bij upgrade naar betaalde diensten.

---

## 4. Openstaande vragen en vereisten

### TLD-ondersteuning Strato ✅

Alle benodigde TLD's zijn beschikbaar bij Strato (geverifieerd maart 2026):
- **.nl**: €7,20/jaar
- **.app**: €21,00/jaar (inclusief DNSSEC)
- **.be**: €6,00/jaar

### Creditcard Dinck B.V.

Creditcard is vereist voor:
- **MailPace** — accepteert uitsluitend creditcard
- **GitHub** — alleen bij upgrade naar betaald plan (Free is voldoende)
- **Cloudflare** — alleen als opslag op Cloudflare R2 blijft (huidig plan: Hetzner Object Storage)

### MailPace-migratie

Twee opties:
1. Nieuw account aanmaken op naam Dinck B.V.
2. Bestaand account overdragen (accounteigenaar wijzigen)

Beide vereisen wijziging van de API-token in de Rails-credentials (`rails credentials:edit`).

---

## 5. Verwijzingen

- `analyse/infrastructuurmigratie-plan.md` — volledige hostingmigratie (Hetzner + Kamal-architectuur)
- `concepten/ktlo-overeenkomst.md` — Art. 4.1 (hostingspecificatie), Art. 4.5 (migratie), Art. 10 (toegang)
