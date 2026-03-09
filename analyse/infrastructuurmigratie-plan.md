# Infrastructuurmigratie Dinck B.V. — Hetzner + Kamal

**Status**: Concept — 9 maart 2026
**Grondslag**: KTLO-overeenkomst Art. 4.5 (migratie naar eigen accounts)
**Doel**: Alle Dinck-infrastructuur overdragen naar accounts op naam van Dinck B.V.

---

## 1. Samenvatting

Dit document beschrijft de volledige migratie van de Dinck B.V.-infrastructuur van Peters persoonlijke accounts naar accounts op naam van Dinck B.V. Het omvat:

1. De huidige situatie (wat draait waar, wat kost het)
2. De doelarchitectuur (Hetzner + Kamal)
3. Gefaseerde migratiestappen
4. Kostenvergelijking (voor/na)

Na migratie fungeert dit document als de **infrastructuurdocumentatie** zoals bedoeld in Art. 4.5 van de KTLO-overeenkomst. De artikelen 4.2, 4.3 en 4.4 (doorbelasting, betalingstermijn, factuurspecificatie) vervallen — Dinck betaalt alle providers rechtstreeks.

---

## 2. Huidige situatie

### 2.1 Infrastructuuroverzicht (Art. 4.1)

| Component | Leverancier | Account | Maandkosten |
|-----------|-------------|---------|-------------|
| Applicatiehosting (3 servers) | Hatchbox.io | Peter | $30,00 |
| Servers: lb01 Nano 1GB, web01 2GB, db01 4GB | Linode/Akamai | Peter | $41,00 |
| Objectopslag (~3.229 GB) | Cloudflare R2 | Peter | ~$48,30 |
| Broncoderepository (GitHub Team) | GitHub | Peter | $4,00/user/maand |
| Bewaking (gratis abonnement) | AppSignal | Peter | €0,00 |
| **Totaal** | | | **~$123,30/maand (~€114)** |

### 2.2 Serverarchitectuur (huidig)

```
Internet → Cloudflare DNS → Linode (Dallas/Fremont)
                              ├── lb01 (Nano 1GB) — load balancer
                              ├── web01 (2GB) — Rails/Puma applicatieserver
                              └── db01 (4GB) — PostgreSQL database
```

Hatchbox beheert de deployment (git push → build → deploy) en serverkoppeling. AppSignal bewaakt beschikbaarheid, foutregistratie en prestaties (gratis t/m 50.000 verzoeken/maand).

### 2.3 Objectopslag (Cloudflare R2)

| Onderdeel | Geschatte omvang | Categorie |
|-----------|-----------------|-----------|
| Ruwe videobeelden (contentproductie) | ~2.800 GB | Videoarchief |
| Back-ups (database) | ~200 GB | Applicatie |
| Google Drive-gegevens | ~200 GB | Applicatie |
| Overige bestanden (uploads, Active Storage) | ~29 GB | Applicatie |
| **Totaal** | **~3.229 GB** | |

Tarief: $0,015/GB/maand, 10 GB gratis. Egress (uitgaand verkeer) is gratis bij Cloudflare R2.

**Onderscheid applicatiedata en videoarchief**: De ~2.800 GB ruwe videobeelden zijn intellectueel eigendom van Dinck B.V. maar maken geen onderdeel uit van het Platform (Art. 1.1). Beide categorieën worden gemigreerd naar Hetzner Object Storage. Het videoarchief kan later eventueel naar nog goedkopere opslag (bijv. Hetzner Storage Box) worden verplaatst — dat is een afzonderlijke beslissing.

**Active Storage serving**: De Rails-applicatie (8.1) gebruikt redirect-mode: bij het opvragen van een bestand genereert Rails een signed URL en stuurt de browser door naar de objectopslag. Bestanden worden dus *direct* geserveerd aan de eindgebruiker, niet via de Rails-app. Bij het huidige verkeersniveau (<50.000 verzoeken/maand) blijft de egress ruim binnen Hetzner's inbegrepen 1 TB/maand.

### 2.4 Knelpunten huidige situatie

- Alle accounts staan op naam van Peter — Dinck heeft geen eigen toegang
- Hatchbox ($30/maand) is een onnodige kostenpost — Kamal biedt dezelfde functionaliteit zonder kosten
- Drie Linode-servers voor een applicatie met <50.000 verzoeken/maand is overgedimensioneerd
- GitHub Team ($4/user/maand) is niet nodig voor een enkele repository
- Drie leveranciers voor objectopslag + hosting + deployment is onnodig complex — Hetzner biedt alles

---

## 3. Doelarchitectuur

### 3.1 Overzicht

Eén Hetzner CX32-server met Kamal 2 als deploymenttool:

```
Internet → Cloudflare DNS → Hetzner CX32
                              ├── kamal-proxy (reverse proxy + Let's Encrypt SSL)
                              ├── dinck-web (Rails 8.2 / Puma + Solid Queue in-process)
                              ├── PostgreSQL 17 (Kamal accessory)
                              ├── Elasticsearch 9 (Kamal accessory)
                              ├── Redis 8 (Kamal accessory — ActionCable)
                              └── Cron: pg_dump → Hetzner Object Storage

Hetzner Object Storage (S3-compatibel, zelfde datacenter)
  ├── Active Storage uploads (afbeeldingen, video's, bestanden)
  ├── Database back-ups (dagelijks via pg_dump)
  └── Videoarchief (ruwe contentproductie, ~2.800 GB)
```

### 3.2 Serverspecificatie

| Eigenschap | Waarde |
|-----------|--------|
| Type | Hetzner CX32 (gedeeld) |
| vCPU | 4 |
| RAM | 8 GB |
| Opslag | 80 GB NVMe |
| Bandbreedte | 20 TB/maand |
| Locatie | Falkenstein of Nuremberg (Duitsland) |
| OS | Ubuntu 24.04 LTS |
| Maandkosten | €7,49 |

**Geschat geheugenverbruik** (alle services op één server):

| Service | Geschat RAM |
|---------|------------|
| Rails/Puma (+ Solid Queue in-process) | ~500 MB |
| PostgreSQL 17 | ~1 GB |
| Elasticsearch 9 (512 MB heap) | ~1,5 GB |
| Redis 8 | ~100 MB |
| OS + Docker overhead | ~1 GB |
| **Totaal** | **~4,1 GB** |

Past comfortabel binnen 8 GB. Bij groei: opschalen naar CX42 (8 vCPU, 16 GB, €14,49/maand) is direct mogelijk.

### 3.3 Objectopslag

| Eigenschap | Waarde |
|-----------|--------|
| Type | Hetzner Object Storage (S3-compatibel) |
| Locatie | Falkenstein of Nuremberg (zelfde als server) |
| Basisprijs | €4,99/maand (inclusief 1 TB opslag + 1 TB egress) |
| Extra opslag | ~€4,89/TB/maand |
| Extra egress | €1,00/TB |
| API | S3-compatibel (werkt met Active Storage S3 service, rclone, aws-sdk) |

Door server en objectopslag in hetzelfde datacenter te plaatsen zijn interne transfers (back-ups, applicatie → opslag) razendsnel en tellen niet mee als egress.

**Waarom Hetzner Object Storage i.p.v. Cloudflare R2**:
- **Single vendor** — alles bij Hetzner, één factuur, één account
- **Goedkoper** — ~€16/maand vs ~€44/maand bij R2 voor dezelfde ~3,2 TB
- **Datacenter-intern** — back-ups en interne transfers zonder latency
- **Egress verwaarloosbaar** — bij <50.000 verzoeken/maand blijft egress ruim onder 1 TB/maand (inbegrepen)
- **S3-compatibel** — Rails `config/storage.yml` wijzigt alleen endpoint + credentials

*Trade-off*: R2 biedt gratis egress + Cloudflare CDN. Bij het huidige verkeersniveau (puur Nederlandse doelgroep, <50K req/maand) is dat geen relevant voordeel. Mocht het verkeer sterk groeien, dan kan een CDN (bijv. Cloudflare als proxy vóór Hetzner) achteraf worden toegevoegd.

### 3.4 Waarom één server

Het Platform verwerkt minder dan 50.000 verzoeken per maand (AppSignal gratis abonnement). Een CX32 met 4 vCPU en 8 GB RAM draait Rails + PostgreSQL + Elasticsearch + Redis comfortabel voor dit verkeersniveau (~4 GB van 8 GB in gebruik). Verticaal opschalen naar CX42 (8 vCPU, 16 GB, €14,49/maand) is direct mogelijk zonder migratie.

### 3.5 Applicatiestack (gedetailleerd)

De volgende tabel toont alle componenten die op de server draaien:

| Component | Huidig | Nieuw (migratie) | Container |
|-----------|--------|-----------------|-----------|
| **Ruby** | 4.0.1 | 4.0.1 | In app-image |
| **Rails** | 8.2.0.alpha (edge) | 8.2.0.alpha | In app-image |
| **Puma** (webserver) | 6.x | 6.x | In app-image |
| **Solid Queue** (achtergrondtaken) | 1.3.2 | 1.3.2 | In-process via Puma-plugin |
| **PostgreSQL** | 16.9 | **17** (upgrade) | Kamal accessory |
| **Elasticsearch** | 8.18 | **9.x** (upgrade) | Kamal accessory |
| **Redis** | 8.x | 8.x | Kamal accessory |
| **Chromium** (PDF-generatie) | ? | headless-chromium | In app-image |

**Achtergrondtaken (Solid Queue)**:
Solid Queue draait database-backed (geen Redis nodig) en kan in-process via de Puma-plugin (`SOLID_QUEUE_IN_PUMA=true`). Dit elimineert de noodzaak van een apart worker-proces.

7 terugkerende taken:

| Taak | Schema |
|------|--------|
| LrkImportJob | Elke zaterdag 00:00 |
| CleanupInactiveOrganizationsJob | Elke zondag 02:00 |
| SubscriptionRenewalJob | Dagelijks 02:00 |
| InvoicedSubscriptionsRenewalJob | Dagelijks 02:00 |
| TrialReminderJob | Dagelijks 08:00 |
| PromotionalPriceUpdateJob | Dagelijks 03:00 |
| PromotionalPriceRecoveryJob | Dagelijks 06:00 |

**Elasticsearch (zoekfunctie)**:
Harde afhankelijkheid — gebruikt voor zoeken in activiteiten (Activity, Slo::Activity, Slo::Goal) via Searchkick. Configuratie: `ELASTICSEARCH_URL`, 512 MB Java heap.

**Redis (ActionCable)**:
Vereist voor WebSocket-verbindingen (ActionCable). Minimaal geheugengebruik.

**PDF-generatie (Ferrum PDF)**:
Gebruikt headless Chrome/Chromium via de `ferrum` gem. Ontbreekt momenteel in de productie-Dockerfile — moet worden toegevoegd.

**Externe diensten** (geen migratie nodig):

| Dienst | Functie | Configuratie |
|--------|---------|-------------|
| MailPace | E-mailverzending | API-token via credentials |
| Mollie | Betalingen (abonnementen) | API-key via DinckConfig |
| AppSignal | Bewaking + foutregistratie | Push API key |

**Systeemafhankelijkheden in Docker-image**:
- `libjemalloc2` — geheugenallocator (geladen via `LD_PRELOAD`)
- `libvips` — beeldverwerking (Active Storage variants)
- `postgresql-client` — voor `db:prepare` bij containerstart
- `libpoppler-glib-dev` — PDF-parsing (poppler gem)
- `chromium` — **toe te voegen** voor ferrum_pdf

### 3.6 Kamal 2

Kamal is een open-source deploymenttool van 37signals (makers van Ruby on Rails). Het vervangt Hatchbox volledig:

- Zero-downtime deploys via rolling containers
- Ingebouwde reverse proxy (kamal-proxy) met automatische Let's Encrypt SSL-certificaten
- Accessories voor PostgreSQL, Elasticsearch, Redis en andere diensten
- Configuratie via `config/deploy.yml` in de Rails-repository
- Geen maandelijkse kosten

**Kamal accessories** (containers naast de app):

```yaml
# config/deploy.yml (vereenvoudigd)
accessories:
  db:
    image: postgres:17-alpine
    port: "127.0.0.1:5432:5432"
    env:
      POSTGRES_DB: dinckweb_production
      POSTGRES_USER: dinckweb
    volumes:
      - dinck-db:/var/lib/postgresql/data

  elasticsearch:
    image: elasticsearch:9.0.0
    port: "127.0.0.1:9200:9200"
    env:
      discovery.type: single-node
      xpack.security.enabled: "false"
      ES_JAVA_OPTS: "-Xms512m -Xmx512m"
    volumes:
      - dinck-es:/usr/share/elasticsearch/data

  redis:
    image: redis:8-alpine
    port: "127.0.0.1:6379:6379"
    volumes:
      - dinck-redis:/data
```

### 3.6 Deployment-workflow (na migratie)

```bash
# Vanuit de Rails-repository:
kamal deploy          # Bouw Docker-image, push naar GHCR, deploy op Hetzner
kamal app logs        # Bekijk applicatielogs
kamal app exec rails console  # Rails console
```

Docker-images worden opgeslagen in GitHub Container Registry (ghcr.io/dinckbv/dinck) — gratis voor publieke en privérepositories.

---

## 4. Kostenvergelijking

| Component | Huidig (Peter) | Nieuw (Dinck) | Verschil |
|-----------|---------------|---------------|----------|
| Deployment | Hatchbox $30/maand | Kamal (gratis) | -€28 |
| Servers | Linode 3× VPS $41/maand | Hetzner CX32 €7,49/maand | -€30 |
| Serverback-ups | — | Hetzner geautomatiseerd €1,50/maand | +€1,50 |
| Objectopslag (~3,2 TB) | Cloudflare R2 ~$48/maand (~€44) | Hetzner Object Storage ~€16/maand | -€28 |
| Broncode | GitHub Team $4/maand (~€3,70) | GitHub Free (dinckbv org) | -€3,70 |
| Bewaking | AppSignal €0 | AppSignal €0 | €0 |
| **Totaal** | **~€114/maand** | **~€25/maand** | **-€89/maand** |

**Besparing: ~€89/maand (~€1.068/jaar)**

De besparing komt voort uit vier wijzigingen:
1. **Hatchbox → Kamal**: ~€28/maand vervalt volledig
2. **Linode 3× VPS → Hetzner CX32**: van ~€38 naar €7,49/maand
3. **Cloudflare R2 → Hetzner Object Storage**: van ~€44 naar ~€16/maand
4. **GitHub Team → Free**: ~€3,70/maand vervalt

*Alle bedragen in euro's. Dollarbedragen omgerekend tegen ~€0,92/$1.*

**Uitsplitsing Hetzner Object Storage** (~€16/maand):

| Post | Berekening | Kosten |
|------|-----------|--------|
| Basis (1 TB opslag + 1 TB egress inbegrepen) | vast | €4,99 |
| Extra opslag ~2,2 TB | 2,2 × €4,89/TB | €10,76 |
| Extra egress | <1 TB bij huidig verkeer | €0,00 |
| **Totaal** | | **~€15,75** |

*N.B. Het videoarchief (~2.800 GB, ~€13,70 van de €16) is Dinck IP maar geen onderdeel van het Platform. Verplaatsing naar een Hetzner Storage Box (~€3,81/TB/maand) is een latere optimalisatie die de opslagkosten verder kan verlagen.*

---

## 5. Versie-upgrades bij migratie

De migratie is een goed moment om dataservices te upgraden naar de nieuwste versies. Aangezien we een volledig nieuwe omgeving opzetten, is er geen in-place upgrade nodig.

| Component | Huidig | Nieuw | Migratiestrategie |
|-----------|--------|-------|-------------------|
| **PostgreSQL** | 16.9 | **17** | `pg_dump` (v16) → `pg_restore` (v17) — werkt standaard cross-version |
| **Elasticsearch** | 8.18 | **9.x** | Volledige herindexering via `searchkick:reindex:all` — geen datamigratie nodig |
| **Redis** | 8.x | 8.x | Geen persistente data (alleen ActionCable sessions) — schone start |

**PostgreSQL 16 → 17**: Geen breaking changes voor Rails. De dump/restore bij de migratie is de upgrade.

**Elasticsearch 8 → 9**: Searchkick abstraheert de API-verschillen. Na deploy wordt de index opnieuw opgebouwd vanuit PostgreSQL — er is geen Elasticsearch-datamigratie nodig. Controleer vóór migratie of de gebruikte Searchkick-versie (6.1.0, vanuit main branch) Elasticsearch 9 ondersteunt.

**Dockerfile-aanpassingen** (nodig vóór migratie):
- [ ] Chromium toevoegen (voor ferrum_pdf — ontbreekt in huidige Dockerfile)
- [ ] `libpoppler-glib-dev` toevoegen aan runtime stage (voor PDF-parsing)
- [ ] Verifiëren dat Ruby 4.0.1 base image beschikbaar is

---

## 6. Migratiefasen

### Fase 0: Voorbereiding (~2 uur)

**Inventarisatie**:
- [ ] Alle credentials uit 1Password exporteren: Linode, Hatchbox, Cloudflare, GitHub, databasewachtwoorden, `RAILS_MASTER_KEY`
- [ ] Alle omgevingsvariabelen uit Hatchbox exporteren (Hatchbox → App → Environment)
- [ ] Verifiëren: Redis/Sidekiq in gebruik? PostgreSQL-versie? Ruby/Rails-versies? Systeemafhankelijkheden (ImageMagick, ffmpeg)?
- [ ] DNS-keten controleren: `dig app.dinck.nl` — waar is dinck.nl geregistreerd? Loopt DNS via Cloudflare?
- [ ] R2-audit: buckets inventariseren, totale omvang bevestigen, oude back-ups opruimen vóór transfer
- [ ] Bevestigen: Hetzner-account actief met automatische incasso, dinckbv GitHub-org admin

**Vereisten van Dinck B.V.** (voordat de migratie kan beginnen):
1. Hetzner-account met automatische incasso (creditcard of SEPA) — voor server + Object Storage
2. GitHub `dinckbv`-organisatie met admin-rechten voor Peter
3. DNS-toegang: Cloudflare (bestaand account Peter) of Strato-domeinpaneel voor dinck.nl

### Fase 1: Nieuwe infrastructuur opzetten (~3-4 uur)

**Server**:
- [ ] Hetzner CX32 aanmaken (Ubuntu 24.04, Falkenstein/Nuremberg)
- [ ] SSH-sleutel toevoegen, root-wachtwoord instellen
- [ ] Geautomatiseerde back-ups inschakelen (€1,50/maand — dagelijks, 7 dagen bewaard)
- [ ] Hetzner Cloud Firewall configureren: uitsluitend poort 22 (SSH), 80 (HTTP), 443 (HTTPS)

**Kamal-configuratie in Rails-app**:
- [ ] `config/deploy.yml` aanmaken met server-IP, image-naam, accessories (zie §3.6)
- [ ] `.kamal/secrets` aanmaken met alle omgevingsvariabelen (uit Hatchbox-export):
  - `RAILS_MASTER_KEY`, `DATABASE_URL`, `REDIS_URL`, `ELASTICSEARCH_URL`
  - `SOLID_QUEUE_IN_PUMA=true` (worker in-process)
  - MailPace, Mollie, AppSignal credentials
- [ ] Dockerfile bijwerken:
  - Chromium toevoegen voor ferrum_pdf
  - `libpoppler-glib-dev` toevoegen aan runtime stage
  - Verifiëren: alle systeemafhankelijkheden aanwezig
- [ ] Kamal accessories definiëren: PostgreSQL 17, Elasticsearch 9, Redis 8

**Eerste deploy**:
- [ ] `kamal setup` — richt server in, start accessories, eerste deploy
- [ ] `kamal deploy` met lege database, verifiëren dat de applicatie opstart
- [ ] Elasticsearch index opbouwen: `kamal app exec 'rails searchkick:reindex:all'`
- [ ] Testen via tijdelijk domein (bijv. via IP-adres of staging-subdomein)

### Fase 2: GitHub-repository migreren (~1 uur)

- [ ] Repository transfereren via GitHub "Transfer repository" (Peter → `dinckbv` org)
  - Behoudt volledige git-history, issues, pull requests
  - GitHub maakt automatisch een redirect aan van de oude URL
- [ ] GitHub Container Registry instellen (ghcr.io/dinckbv/dinck) voor Docker-images
- [ ] Peter toevoegen als collaborator met schrijfrechten (conform Art. 10.3 KTLO)
- [ ] Kamal-config bijwerken met nieuwe image-registry URL
- [ ] Verifiëren: `kamal deploy` werkt met nieuwe registry

### Fase 3: Objectopslag migreren — R2 → Hetzner Object Storage (~2-3 uur actief, 3-5 dagen transfertijd)

De R2-bucket bevat twee categorieën data:

| Categorie | Omvang | Functie |
|-----------|--------|---------|
| Applicatiedata (Active Storage uploads, back-ups, Google Drive) | ~429 GB | Vereist voor Platform |
| Videoarchief (ruwe videobeelden contentproductie) | ~2.800 GB | Dinck IP, niet onderdeel Platform (Art. 1.1) |

Beide categorieën worden gemigreerd naar Hetzner Object Storage in hetzelfde datacenter als de server.

**Voorbereiding**:
- [ ] Hetzner Object Storage bucket aanmaken (Falkenstein of Nuremberg — zelfde locatie als server)
- [ ] S3-credentials genereren in Hetzner Cloud Console
- [ ] rclone installeren en configureren met twee remotes:
  ```
  [peter-r2]       → Peter's Cloudflare R2 (bron)
  [dinck-hetzner]  → Dinck's Hetzner Object Storage (doel)
  ```
- [ ] Oude/overbodige back-ups opruimen vóór transfer (verkort transfertijd)

**Transfer**:
- [ ] `rclone copy peter-r2:bucket dinck-hetzner:bucket --progress --transfers 16`
- [ ] Geschatte duur: ~3.229 GB bij ~100 Mbps ≈ 3 dagen
- [ ] R2 egress is gratis — geen extra kosten aan bronzijde
- [ ] Hetzner Object Storage ingress is gratis — geen extra kosten aan doelzijde
- [ ] Na voltooiing: `rclone check peter-r2:bucket dinck-hetzner:bucket` voor integriteitscontrole
- [ ] Incremental sync voor objecten die tijdens de transfer zijn geschreven

**Applicatieconfiguratie** (`config/storage.yml`):
- [ ] Storage service bijwerken van Cloudflare R2 naar Hetzner Object Storage:
  ```yaml
  hetzner:
    service: S3
    endpoint: https://fsn1.your-objectstorage.com  # of nbg1
    access_key_id: <%= Rails.application.credentials.dig(:hetzner, :access_key_id) %>
    secret_access_key: <%= Rails.application.credentials.dig(:hetzner, :secret_access_key) %>
    region: fsn1                                     # of nbg1
    bucket: <%= Rails.application.credentials.dig(:hetzner, :bucket) %>
    request_checksum_calculation: "when_required"
    response_checksum_validation: "when_required"
  ```
- [ ] `config/environments/production.rb`: wijzig `config.active_storage.service = :hetzner`
- [ ] Rails credentials bijwerken: `bin/rails credentials:edit`
- [ ] Verifiëren: upload + download + variant-generatie werken correct

### Fase 4: Databasemigratie + DNS-cutover (~3-4 uur, kort onderhoudvenster)

**Voorbereiding (48 uur vooraf)**:
- [ ] DNS TTL verlagen naar 60 seconden (via Cloudflare)
- [ ] Dry run: `pg_dump` van Linode db01 → `pg_restore` op Hetzner, tijd meten
- [ ] Onderhoudvenster communiceren aan Opdrachtgever

**Cutover** (zondagavond, geschatte doorlooptijd ~35 minuten):

| Stap | Actie | Geschatte duur |
|------|-------|---------------|
| 1 | Onderhoudsmodus inschakelen (Hatchbox) | 1 min |
| 2 | Finale `pg_dump` van Linode db01 | 5-10 min |
| 3 | `pg_restore` op Hetzner PostgreSQL | 5-10 min |
| 4 | Data-integriteitsverificatie (rij-aantallen, checksums) | 5 min |
| 5 | `kamal deploy` met productieconfiguratie | 3-5 min |
| 6 | Elasticsearch reindex: `kamal app exec 'rails searchkick:reindex:all'` | 2-5 min |
| 7 | DNS wijzigen: app.dinck.nl → Hetzner IP | 1 min |
| 8 | Let's Encrypt-certificaat verifiëren | 2 min |
| 9 | End-to-end test (inloggen, pagina's laden, uploads, zoeken) | 5 min |
| 10 | Onderhoudsmodus uitschakelen | 1 min |

**Na cutover**:
- [ ] 24 uur bewaking via AppSignal (foutpercentage, responstijden)
- [ ] DNS TTL terugzetten naar 3600 seconden

**Terugvalplan**: Bij problemen na cutover kan DNS binnen 60 seconden worden teruggewezen naar Linode (oude servers draaien nog 7 dagen).

### Fase 5: Opruimen (na 7 dagen stabiel)

- [ ] Hatchbox-abonnement opzeggen
- [ ] Linode VPS-instances verwijderen (lb01, web01, db01)
- [ ] R2-bucket(s) verwijderen van Peter's Cloudflare-account
- [ ] Cloudflare-account Peter opruimen (geen Dinck-gerelateerde data meer)
- [ ] GitHub Team opzeggen (indien niet meer nodig voor andere repositories)
- [ ] 1Password-vault bijwerken: oude credentials verwijderen, nieuwe toevoegen
- [ ] DNS TTL bevestigen op standaardwaarde (3600 seconden)

---

## 7. Infrastructuurdocumentatie (na migratie)

*Dit deel wordt na voltooiing van de migratie bijgewerkt met de definitieve gegevens.*

### 7.1 Servers

| Eigenschap | Waarde |
|-----------|--------|
| Provider | Hetzner Cloud |
| Servertype | CX32 (4 vCPU, 8 GB RAM, 80 GB NVMe) |
| Locatie | *(in te vullen)* |
| IP-adres | *(in te vullen)* |
| OS | Ubuntu 24.04 LTS |
| Back-ups | Geautomatiseerd, dagelijks, 7 dagen bewaard |
| Firewall | Poort 22 (SSH), 80 (HTTP), 443 (HTTPS) |
| Maandkosten | €7,49 + €1,50 (back-ups) = €8,99 |

### 7.2 Deployment

| Eigenschap | Waarde |
|-----------|--------|
| Tool | Kamal 2 |
| Configuratie | `config/deploy.yml` in repository |
| Secrets | `.kamal/secrets` (niet in git) |
| Container registry | ghcr.io/dinckbv/dinck |
| Deploy-commando | `kamal deploy` |

### 7.3 Database

| Eigenschap | Waarde |
|-----------|--------|
| Type | PostgreSQL 17 |
| Draait als | Kamal accessory (Docker container, `postgres:17-alpine`) |
| Data-directory | `/var/lib/docker/volumes/dinck-db/_data` |
| Back-ups | Dagelijks `pg_dump` → Hetzner Object Storage via cron |
| Verbinding | Intern via Docker-netwerk (niet extern bereikbaar) |
| Extensies | `pg_search` (full-text search), `logidze` (audit triggers) |

### 7.4 Elasticsearch

| Eigenschap | Waarde |
|-----------|--------|
| Type | Elasticsearch 9.x |
| Draait als | Kamal accessory (Docker container) |
| Data-directory | `/var/lib/docker/volumes/dinck-es/_data` |
| Java heap | 512 MB (-Xms512m -Xmx512m) |
| Modus | single-node, security uitgeschakeld |
| Geïndexeerde modellen | Activity, Slo::Activity, Slo::Goal (via Searchkick) |
| Herindexering | `kamal app exec 'rails searchkick:reindex:all'` |

### 7.5 Redis

| Eigenschap | Waarde |
|-----------|--------|
| Type | Redis 8 |
| Draait als | Kamal accessory (Docker container, `redis:8-alpine`) |
| Functie | ActionCable (WebSocket) adapter |
| Persistentie | Niet vereist (alleen sessiebeheer) |

### 7.6 Objectopslag

| Eigenschap | Waarde |
|-----------|--------|
| Provider | Hetzner Object Storage (S3-compatibel) |
| Account | Dinck B.V. (Hetzner Cloud) |
| Locatie | *(Falkenstein of Nuremberg — in te vullen)* |
| Bucket(s) | *(in te vullen)* |
| Endpoint | `https://fsn1.your-objectstorage.com` *(in te vullen)* |
| Omvang | ~3.229 GB |
| Tarief | €4,99 basis (1 TB incl.) + €4,89/TB extra opslag |
| Egress | 1 TB/maand inbegrepen, daarna €1,00/TB |
| Maandkosten | ~€16 |

| Inhoud | Omvang | Categorie |
|--------|--------|-----------|
| Active Storage uploads (afbeeldingen, video's, bestanden) | ~29 GB | Applicatie |
| Database back-ups | ~200 GB | Applicatie |
| Google Drive-gegevens | ~200 GB | Applicatie |
| Videoarchief (ruwe contentproductie) | ~2.800 GB | Archief (Dinck IP) |

### 7.7 DNS en domeinen

| Domein | Provider | Functie |
|--------|----------|---------|
| dinck.nl | *(registrar in te vullen)* | Hoofddomein |
| app.dinck.nl | *(DNS provider in te vullen)* | Platform |

### 7.8 Bewaking

| Eigenschap | Waarde |
|-----------|--------|
| Provider | AppSignal |
| Abonnement | Gratis (t/m 50.000 verzoeken/maand, 1 GB logregistratie) |
| Opschalingskosten | €22/maand bij >50.000 verzoeken |
| Functionaliteit | Foutregistratie, prestatiebewaking, beschikbaarheidsbewaking |

### 7.9 Broncode

| Eigenschap | Waarde |
|-----------|--------|
| Platform | GitHub |
| Organisatie | dinckbv |
| Repository | *(in te vullen)* |
| Abonnement | GitHub Free |
| Container registry | ghcr.io/dinckbv/dinck |

### 7.10 Toegangsbeheer

Conform Art. 10.1 van de KTLO-overeenkomst worden alle toegangsgegevens uitsluitend beheerd via 1Password. Wijzigingen in toegangsrechten vinden plaats in overleg met Opdrachtnemer (Art. 10.3).

| Dienst | Accounthouder | Toegang Peter (KTLO) |
|--------|--------------|---------------------|
| Hetzner Cloud (server + Object Storage) | Dinck B.V. | SSH-sleutel + S3-credentials |
| GitHub (dinckbv) | Dinck B.V. | Collaborator (schrijfrechten) |
| AppSignal | Dinck B.V. | Owner of member |
| DNS provider | Dinck B.V. | Beheerrechten |
| 1Password | Per dienst | Via eigen vault |

---

## 8. Totale kosten na migratie

| Component | Leverancier | Betaald door | Maandkosten |
|-----------|-------------|-------------|-------------|
| Server (CX32) | Hetzner Cloud | Dinck B.V. | €7,49 |
| Serverback-ups (geautomatiseerd) | Hetzner Cloud | Dinck B.V. | €1,50 |
| Objectopslag (~3,2 TB) | Hetzner Object Storage | Dinck B.V. | ~€16,00 |
| Broncode + container registry | GitHub Free | Dinck B.V. | €0,00 |
| Bewaking | AppSignal Free | Dinck B.V. | €0,00 |
| **Totaal** | | | **~€25/maand** |

**Leveranciersoverzicht**: Twee leveranciers — Hetzner (server + opslag) en GitHub (broncode). AppSignal gratis. Alles op naam van Dinck B.V.

---

## 9. Verband met KTLO-overeenkomst

### Art. 4.1 — Specificatie (bij te werken na migratie)

Na voltooiing van de migratie wordt de tabel in Art. 4.1 van de KTLO-overeenkomst vervangen door de bovenstaande kostenspecificatie (§8). De volgende wijzigingen zijn van toepassing:

| Artikel | Status na migratie |
|---------|-------------------|
| Art. 4.1 (Specificatie) | Bijwerken naar nieuwe infrastructuur |
| Art. 4.2 (Doorbelasting) | **Vervalt** — Dinck betaalt providers rechtstreeks |
| Art. 4.3 (Betalingstermijn) | **Vervalt** — geen facturen meer van Opdrachtnemer |
| Art. 4.4 (Specificatie op factuur) | **Vervalt** — geen facturen meer van Opdrachtnemer |
| Art. 4.5 (Migratie) | Uitgevoerd — dit document is de infrastructuurdocumentatie |
| Art. 4.6 (Wijzigingen) | Blijft van kracht (Dinck bewaakt zelf) |

### Art. 10.3 — Toegangswijzigingen

Peter behoudt toegang tot alle infrastructuur als collaborator/member zolang de KTLO-overeenkomst van kracht is. Wijzigingen in toegangsrechten uitsluitend in overleg (Art. 10.3).

---

## 10. Tijdlijn en geschatte inspanning

| Fase | Omschrijving | Geschatte uren | Afhankelijkheid |
|------|-------------|---------------|-----------------|
| 0 | Voorbereiding + inventarisatie | 2 uur | Dinck levert accounts |
| 1 | Hetzner + Kamal opzetten | 3-4 uur | Fase 0 |
| 2 | GitHub-repository migreren | 1 uur | dinckbv org aangemaakt |
| 3 | Objectopslag R2 → Hetzner | 2-3 uur actief + 3-5 dagen wachttijd | Hetzner-account |
| 4 | Databasemigratie + DNS-cutover | 3-4 uur | Fase 1-3 voltooid |
| 5 | Opruimen oude infrastructuur | 1 uur | 7 dagen stabiel na fase 4 |
| **Totaal** | | **12-15 uur** | |

Deze migratie wordt verricht zonder aanvullende kosten conform Art. 4.5 van de KTLO-overeenkomst.

---

## 11. Risico's en mitigatie

| Risico | Impact | Mitigatie |
|--------|--------|----------|
| Downtime tijdens cutover | Gebruikers kunnen niet inloggen (~35 min) | Zondagavond uitvoeren, onderhoudspagina tonen |
| R2→Hetzner transfer mislukt halverwege | Onvolledige data op Hetzner | rclone hervat automatisch; integriteitscontrole achteraf |
| DNS-propagatie vertraagd | Sommige gebruikers bereiken oude server | TTL vooraf verlagen naar 60s; oude server 7 dagen actief houden |
| PostgreSQL-versieverschil | Restore mislukt of data-incompatibiliteit | Dry run vooraf; zelfde PostgreSQL-versie op Hetzner |
| Ontbrekende omgevingsvariabele | Applicatie start niet op na deploy | Volledige export uit Hatchbox; checklist voor alle variabelen |
| Let's Encrypt rate limit | Geen SSL-certificaat bij eerste poging | Staging-certificaat eerst testen; rate limits ruim voldoende |
| Hetzner Object Storage S3-compatibiliteit | Active Storage werkt niet correct | Testen in staging vóór cutover; R2 als terugval beschikbaar |
| Egress bij onverwacht hoog verkeer | Extra kosten boven 1 TB/maand | Bij huidig niveau onwaarschijnlijk; €1/TB is beheersbaar |
