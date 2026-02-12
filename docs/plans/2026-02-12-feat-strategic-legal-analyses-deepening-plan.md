---
title: Deepen Strategic Legal Analyses — Package Deal, MO Decision, Post-1-March, Akte Conditions
type: feat
date: 2026-02-12
---

# Strategic Legal Analyses — Deepening & Refinement

## Overview

Peter's legal position is well-documented across 18 analyses. The lawyer's memo (11 Feb) confirms the position is "overwegend veilig" and identifies three offensive pillars. The meeting of 11 Feb has changed the dynamics — Douwine made a concrete KTLO proposal, Peter showed willingness with conditions, and nothing was committed.

Now, four strategic areas need deeper analysis to prepare for the next phase: negotiation of a package deal before/around 1 March 2026. Additionally, the 14 existing lawyer questions need refinement based on new insights.

**Time pressure**: 1 March (17 days) — Peter's bestuurder role ends. Some leverage elements shift after this date.

## Acceptance Criteria

- [ ] Four new analysis documents in `analyse/` covering each strategic area
- [ ] Updated `vragen-advocaat-maud.md` with refined questions incorporating new analysis insights
- [ ] All analyses cross-referenced with existing documents for consistency
- [ ] Each analysis includes actionable recommendations, not just legal theory
- [ ] All claims verified against source PDFs in `files/`

---

## Phase 1: Package Deal Structuring Analysis

**File**: `analyse/package-deal-structuring.md`

### What this analysis must cover

The package deal is the primary negotiation strategy (recommended in `meeting-11feb-analyse.md` §9.3). It bundles multiple elements where Peter has leverage into one transaction. No existing analysis details how this should work mechanically.

### Content structure

1. **Components of the package deal** — what Peter offers vs. what Peter demands:

   | Peter offers | Peter demands |
   |-------------|---------------|
   | Co-signering akte teruglevering (waiver voorkeursrecht) | Overdracht Peters aandelen (PHBX → Dinck/Freca) tegen faire waarde |
   | Kwijtschelding €100K boete (Art. 10 SHA) | SHA-kwijting (wederzijds, alle verplichtingen incl. Art. 7 non-concurrentie) |
   | Deblokkade vetorecht (medewerking AVA-besluiten) | KTLO-leveranciersovereenkomst met compensatie |
   | KTLO-bereidheid (platform draaiend houden) | Wederzijdse kwijting (PHBX ↔ Dinck, PHBX ↔ Freca) |
   | | Finale afrekening MO (ongerechtvaardigde verrijking-component) |
   | | Beëindiging MO met behoud vrijwaring of overdracht vrijwaring naar KTLO-contract |

2. **Juridische structuur** — one notarial deed or multiple documents?
   - Akte teruglevering (notarieel — notaris Koops)
   - Akte aandelenoverdracht Peter (notarieel — zelfde notaris? andere?)
   - Vaststellingsovereenkomst (onderhands) covering: SHA-kwijting, MO-beëindiging, kwijting, finale afrekening
   - KTLO-leveranciersovereenkomst (onderhands)
   - Simultaneous execution requirement (escrow / simultane ondertekening)

3. **Pricing Peter's shares** — three routes:
   - Onderhandelde prijs (snelst, maar Douwine zal laag willen)
   - Statutaire route Art. 6.2 lid 6: 3 deskundigen (objectief, maar kost tijd)
   - Faire waarde argument: platform vervangingswaarde (€250-350K) minus schuldenlast (€612K) = negatief, BUT Peter's shares represent 33.3% of equity + veto power + platform dependency → goodwill component
   - Cross-reference with `analyse/worst-case-scenarios.md` loss asymmetry

4. **Onderlinge afhankelijkheden** — what if one component fails?
   - If Douwine refuses faire prijs → sommatiebrief (Plan B)
   - If Douwine refuses KTLO terms → Peter stops all work per 1 March (opschortingsrecht)
   - If akte teruglevering not signed → Marlou remains aandeelhouder (status quo)
   - Fallback positions for each component

5. **Timing pressures and sequencing**
   - Akte teruglevering: Douwine wants before 1 March (Peters hoedanigheid b vervalt)
   - Peters aandelenoverdracht: can happen before or after 1 March
   - KTLO: must be in place before Peter does any work post-1-March
   - AVA-besluiten: require Peter's vote while he's still aandeelhouder
   - Recommended sequence: vaststellingsovereenkomst first → KTLO → notariële aktes simultaan

6. **Risico-analyse van het niet bereiken van een deal**
   - Cross-reference with existing scenarios A-E in `strategische-opties.md` and `worst-case-scenarios.md`

### Sources to verify against
- `files/getekend-aandeelhoudersovereenkomst.pdf` (SHA Art. 9, 10, 7)
- `files/Registratie_07_11_2025_Repnr_24482_Koops_Levering aandelen.pdf` (statuten Art. 6.2, 8.6)
- `files/10-feb-2026-Concept- levering aandelen.pdf` (akte teruglevering)
- `analyse/meeting-11feb-analyse.md` §4.5 (voorwaarden tekenen akte)
- `analyse/memo-jurist-11feb2026.md` (lawyer strategy)
- `analyse/voorkeursrecht-strategische-analyse.md` (optie C)

---

## Phase 2: MO Decision Tree Analysis

**File**: `analyse/mo-beslisboom.md`

### What this analysis must cover

The MO question runs through multiple existing documents but no single analysis systematically models the decision tree with all consequences mapped. The three options (terminate, keep, amend) each interact with the leningsovereenkomst, vrijwaring, ongerechtvaardigde verrijking, KTLO, and SHA.

### Content structure

1. **Current state of the MO** — verified against source PDF:
   - Art. 2.1: "feitelijke en dagelijkse leiding" — what does this mean without bestuurdersrol?
   - Art. 2.3: fulltime beschikbaarheid
   - Art. 3.1: "gelijke behandeling" — formal status
   - Art. 4.2: vrijwaring (exact scope, temporal reach)
   - Art. 4.3: aansprakelijkheidsbeperking
   - Art. 5.1: opzegtermijn (3 maanden)
   - Fee status: €0 per AVA 30 nov 2024 (only PHBX's MO; Freca's not formally changed)

2. **Decision tree — three branches, each with sub-scenarios**:

   **Branch A: Terminate MO + new KTLO contract**
   - Timing: opzegtermijn 3 months → effective ~mid-May 2026
   - Immediate effects: fulltime verplichting ends (after opzegtermijn), vrijwaring ends
   - Downstream: Art. 7.1.g staking signal? KTLO contract replaces MO
   - Ongerechtvaardigde verrijking: freezes at current amount (~€108-180K)
   - Package deal impact: one less item to negotiate (MO already terminated)
   - Risk: vrijwaring gap between MO end and KTLO start

   **Branch B: Keep MO alive + separate KTLO contract**
   - Immediate: two overlapping contracts (MO fulltime €0 + KTLO 4hr/wk paid)
   - Juridisch rommelig: can Dinck claim KTLO-work falls under MO (already paid at €0)?
   - Voordeel: vrijwaring active, no staking signal, verrijking keeps accruing
   - Risk: Dinck argues Peter owes fulltime work under MO, KTLO billing is unjust
   - Mitigation: opschortingsrecht Art. 6:262 BW (Dinck pays €0, so Peter can suspend)

   **Branch C: Amend MO to KTLO scope**
   - Requires Douwine's cooperation (bilateral amendment)
   - Scope: Art. 2.3 "fulltime" → "max 4hr/week KTLO"; Art. 3.1 "€0" → "€X/month or €Y/hr"
   - Voordeel: single contract, vrijwaring preserved in amended MO, clean
   - Risk: Douwine refuses; amendment negotiation reveals Peter's hand
   - Can be part of package deal (reduces standalone risk)

3. **Interaction matrix** — how each branch affects other legal relationships:

   | Factor | Branch A (terminate) | Branch B (keep) | Branch C (amend) |
   |--------|---------------------|-----------------|-------------------|
   | Vrijwaring Art. 4.2 | LOST (unless transferred to KTLO) | ACTIVE | ACTIVE (in amended MO) |
   | Ongerechtvaardigde verrijking | Frozen, but claimable | Keeps accruing | Frozen (new terms = consent) |
   | Art. 7.1.g staking trigger | RISK (staking signal) | NO RISK | NO RISK |
   | KTLO billing clean? | YES (separate basis) | RISK (MO overlap argument) | YES (amended basis) |
   | Douwine cooperation needed? | NO (unilateral) | NO (unilateral) | YES (bilateral) |
   | Opzegtermijn | 3 months | n/a | n/a |

4. **Recommendation with conditions**
   - Primary: Branch B if lawyer confirms opschortingsrecht blocks the "but you owe fulltime" argument
   - Alternative: Branch C as part of package deal (cleanest, but requires Douwine)
   - Fallback: Branch A only if vrijwaring can be transferred to KTLO contract

5. **Updated questions for lawyer** — refine questions 1.1-1.3 based on this deeper analysis

### Sources to verify against
- `files/getekend-managementovereenkomst-phbx.pdf` (all articles)
- `files/Getekende notulen wijzigen managementovereenkomst.pdf` (AVA decision)
- `analyse/bestuurdersontslag-vs-managementovereenkomst.md`
- `analyse/meeting-11feb-analyse.md` §3.4, §6
- `analyse/geldlening-analyse.md` (Art. 7.1.g)

---

## Phase 3: Post-1-March Positioning Timeline

**File**: `analyse/post-1-maart-positionering.md`

### What this analysis must cover

After 1 March, Peter's role changes fundamentally: from bestuurder + aandeelhouder to pure aandeelhouder (+ MO party if not terminated). The existing analyses cover individual aspects but no document maps the complete timeline of what Peter should do, can do, and must NOT do — day by day, week by week.

### Content structure

1. **Status change matrix — what shifts on 1 March**

   | Capability/Obligation | Before 1 March | After 1 March |
   |-----------------------|---------------|---------------|
   | Bestuurder Dinck | YES | NO |
   | Fiduciary duty | YES | NO |
   | AVA stemrecht (33.3%) | YES | YES |
   | Vetorecht Art. 8.6 lid 2 | YES (as aandeelhouder) | YES (as aandeelhouder) |
   | Bestuurdersaansprakelijkheid | YES | NO (except for acts during bestuursperiode) |
   | MO fulltime verplichting | YES (but opschortbaar) | YES (if MO not terminated) |
   | Vrijwaring Art. 4.2 MO | YES | YES (if MO not terminated) |
   | Hoedanigheid b akte | YES | NO — cannot sign as bestuurder Dinck |
   | KvK-inschrijving | Bestuurder | Must be uitgeschreven |
   | Informatierecht | Art. 2:217 BW (aandeelhouder) + bestuurder toegang | Art. 2:217 BW only |
   | Signing power for Dinck | YES | NO |
   | KTLO work | Under MO (fulltime, €0) | Only with new contract or amended MO |

2. **Week-by-week action plan (1 March — 28 March)**

   **Week 1 (1-7 March)**:
   - KvK-uitschrijving indienen (zelf, als Douwine het niet doet)
   - Schriftelijke bevestiging aan Douwine/Marlou: "Per vandaag geen bestuurder meer"
   - STOP alle werkzaamheden (tenzij KTLO-contract is getekend)
   - Geen toegang meer tot bankrekening Dinck
   - Documenteer alle lopende hosting/infra die Peter betaalt

   **Week 2 (8-14 March)**:
   - Als geen KTLO-contract: schriftelijke sommatie voor hosting-kosten
   - Formeel Art. 2:217 BW informatieverzoek (jaarrekening, tussentijdse cijfers)
   - Monitor of werknemerssalarissen worden betaald
   - Eerste signalen of Douwine serieus over package deal wil praten

   **Week 3 (15-21 March)**:
   - Beoordeling stand van zaken: deal of geen deal?
   - Als geen voortgang: sommatiebrief (Plan B) overwegen met jurist
   - Voorbereiden op aflossing 28 maart (niet Peters probleem, maar impact op aandelenwaarde)

   **Week 4 (22-28 March)**:
   - Aflossing 28 maart: Dinck in automatisch verzuim (Art. 11.2)
   - Monitoren of Freca opeist (verwachting: nee, MAD-dynamiek)
   - Beoordelen of passief afwachten of actief handelen (sommatiebrief, Art. 2:343)

3. **What Peter MUST do before 1 March** (remaining 17 days):
   - [ ] D&O-verzekering checken
   - [ ] Jaarrekening 2024 deponering verifiëren
   - [ ] Werkuren retroactief documenteren (logboek onbetaald werk)
   - [ ] Alle bestanden/documenten veiligstellen (eigen kopie)
   - [ ] Lopende hosting/infra inventariseren met kosten
   - [ ] Jurist consulteren met verfijnde vragen
   - [ ] Niet tekenen akte zonder juridisch advies
   - [ ] Niet beginnen met KTLO zonder schriftelijke overeenkomst

4. **What Peter must NOT do after 1 March**:
   - Geen enkel werk zonder contract (anders gratis werk = herhaling van het verleden)
   - Geen schriftelijke toezeggingen aan Douwine/Marlou
   - Niet reageren op deadlines die Douwine stelt (jij bepaalt het tempo)
   - Niet ingaan op Grady's telefoontjes/e-mails (alles schriftelijk, via jurist)
   - Niet instemmen met akte teruglevering zonder package deal
   - Geen informatie delen over Peters verdere plannen/werkzaamheden (non-concurrentie risico als SHA herleeft)

5. **Leverage evolution over time** — how Peters hefbomen change:

   | Hefboom | Feb 2026 | March 2026 | Apr-Jun 2026 |
   |---------|----------|------------|--------------|
   | Hoedanigheid b (akte) | ACTIEF | VERVALT 1 mrt | n/a |
   | Co-signering waiver | ACTIEF | ACTIEF (als aandeelhouder) | ACTIEF |
   | Vetorecht | ACTIEF | ACTIEF | ACTIEF |
   | €100K boete SHA | ACTIEF | ACTIEF (loopt door: +€1K/dag) | ACTIEF (steeds hoger) |
   | Platformafhankelijkheid | ACTIEF | STERK (zonder KTLO: degradatie begint) | ZEER STERK (bugs stapelen) |
   | Ongerechtvaardigde verrijking | ~€108-180K | Gelijk of stijgend (als MO doorloopt) | Stijgend |
   | Beklamel-bescherming | ACTIEF | n/a (geen bestuurder) | n/a |
   | Aflossingsdreiging | DREIGEND (28 mrt) | URGENT | Verzuim → druk op Douwine |

   **Key insight**: Most of Peter's leverage IMPROVES over time. The only leverage that diminishes is hoedanigheid b (akte). This means there's no rush to accept a bad deal — time favors Peter.

6. **Decision moments** — triggers for escalation:
   - If no deal by 1 March → stop working, sommatiebrief overwegen
   - If no deal by 28 March → aflossing default, reassess
   - If no deal by 1 May → Art. 2:343 procedure serieus overwegen
   - If Dinck stops paying hosting → Peter stops KTLO (opschortingsrecht)
   - If Douwine sells/transfers assets → emergency: Art. 2:345 enquêteprocedure

### Sources to verify against
- All existing analyses (cross-reference)
- `files/Registratie_28_03_2024_Repnr_21003_Koops_Oprichting BV.pdf` (statuten)
- `analyse/worst-case-scenarios.md` (scenario timeline)
- `analyse/meeting-11feb-analyse.md` §9.3-9.4 (recommended strategy)

---

## Phase 4: Akte Signing Conditions Analysis

**File**: `analyse/akte-tekenvoorwaarden.md`

### What this analysis must cover

The akte co-signering is Peter's strongest tactical lever right now. Existing analysis (`voorkeursrecht-strategische-analyse.md`) identifies five options but doesn't detail the exact conditions for Option C (tekenen onder voorwaarden). This analysis must specify exactly what to demand, in what formulation, and how to protect against each risk.

### Content structure

1. **Why the akte co-signering matters more than any other lever**
   - Without Peter's signature: no teruglevering, Marlou stays aandeelhouder, Douwine's plan fails
   - The notaris himself concluded a new waiver is needed (Art. 3.2 concept akte)
   - After 1 March: hoedanigheid b vervalt → akte must be amended (but waiver can still be withheld)
   - This is a one-shot lever: once signed, the leverage is gone

2. **Minimum conditions for co-signering** (non-negotiable):

   a. **SHA-uitsluiting/kwijting**:
   - Formulering: "Partijen verlenen elkaar over en weer volledige en finale kwijting ter zake van alle rechten en verplichtingen uit de aandeelhoudersovereenkomst d.d. 28 maart 2024, daaronder begrepen doch niet beperkt tot het non-concurrentiebeding (Art. 7), het kettingbeding (Art. 9) en de boeteclausule (Art. 10)."
   - Alternatief: SHA formeel beëindigen met wederzijdse kwijting (per Art. 1.2 SHA: schriftelijke overeenstemming)
   - Risico als niet geregeld: SHA herleeft (Art. 7 non-concurrentie 3 jaar, Art. 10 boete wederkerig)

   b. **Gelijktijdige aandelenoverdracht Peters aandelen**:
   - PHBX's 4 aandelen (33.3%) overdragen aan Freca/Dinck tegen vastgestelde prijs
   - Prijs: to be determined (onderhandeling of deskundigen)
   - Simultane passering (beide aktes in één sessie bij notaris)
   - If not simultaneous: notariële escrow (akte teruglevering geparkeerd totdat aandelenoverdracht Peter is afgerond)

   c. **KTLO-leveranciersovereenkomst getekend**:
   - Ondertekend vóór co-signering akte
   - Minimale scope uit `meeting-11feb-analyse.md` §3.3

   d. **Wederzijdse kwijting**:
   - PHBX ↔ Dinck: kwijting alle vorderingen incl. MO, ongerechtvaardigde verrijking
   - PHBX ↔ Freca: kwijting alle vorderingen incl. SHA-boete
   - Dinck ↔ PHBX: kwijting bestuurdersaansprakelijkheid, tegenvordering MO
   - Scope: "finale kwijting terzake van alle geschillen en vorderingen"

   e. **Beëindiging MO onder voorwaarden**:
   - Vrijwaring Art. 4.2 ofwel behouden in KTLO-contract ofwel expliciete nawerking
   - Finale afrekening: vergoeding voor onbetaald werk (bedrag te onderhandelen, range €50-180K)

3. **Nice-to-have conditions** (negotiable):
   - Afstand non-concurrentiebeding Art. 7 SHA door Freca (redundant als SHA-kwijting)
   - Niet-opeising leningsclausule (Freca bevestigt niet op te eisen ondanks verzuim)
   - Geheimhoudingsbepaling (mutual NDA over de exit-voorwaarden)
   - Draaideur-clausule: Peter niet opnieuw betrokken bij Dinck na exit

4. **Formuleringen** — concept-bepalingen (Dutch legal language):
   - SHA-kwijting clausule
   - Vrijwaring-overdrachtsclausule
   - Simultane-passeringsclausule
   - Finale-kwijtingclausule
   - To be validated by lawyer before use

5. **Risk table: what if Peter signs without each condition?**

   | Condition not secured | Risk | Severity |
   |----------------------|------|----------|
   | No SHA kwijting | SHA herleeft, Art. 7 non-concurrentie binds Peter | HIGH |
   | No simultane aandelenoverdracht | Peter loses signing leverage, stuck as minority shareholder | HIGH |
   | No KTLO contract | Peter works for free again | HIGH |
   | No wederzijdse kwijting | Claims keep hanging over Peter | MEDIUM |
   | No MO-beëindiging/afrekening | Fulltime verplichting €0 continues | MEDIUM |
   | No vrijwaring-overdracht | Peter loses protection against third-party claims | MEDIUM |

6. **Tactical execution** — how to present this to Douwine:
   - Through the lawyer (formele weg via sommatiebrief/vaststellingsvoorstel)
   - Frame as package deal, not as list of demands
   - "Ik ben bereid mee te werken aan de teruglevering, mits wij tegelijkertijd mijn exit regelen"
   - Do NOT negotiate directly with Grady (conflict of interest, see `grady-hofstra-dynamiek.md`)

### Sources to verify against
- `files/10-feb-2026-Concept- levering aandelen.pdf` (akte Art. 3.2)
- `files/getekend-aandeelhoudersovereenkomst.pdf` (SHA Art. 1.2, 7, 9, 10)
- `files/getekend-managementovereenkomst-phbx.pdf` (Art. 4.2, 5.1)
- `analyse/sha-herleving-analyse.md` (herleving + verdedigingslagen)
- `analyse/voorkeursrecht-strategische-analyse.md` (optie C)
- `analyse/concept-akte-teruglevering-analyse.md` (akte details)

---

## Phase 5: Refine Lawyer Questions

**File**: Update `vragen-advocaat-maud.md`

### What this phase covers

Integrate insights from the four new analyses into the existing 14 questions. Refine, sharpen, and add sub-questions where the deeper analysis reveals gaps.

### Specific refinements anticipated

1. **Question 1.1 (MO strategy)**: Add reference to MO beslisboom, specify which branch the lawyer should evaluate
2. **Question 1.2 (vrijwaring transfer)**: Add specific formulation for the transfer clause; ask if nawerking is sufficient
3. **Question 1.3 (ongerechtvaardigde verrijking + MO)**: Add the Branch A/B/C impact on the claim
4. **Question 1.5 (KTLO contract)**: Add package deal context — KTLO as part of bundled deal vs. standalone
5. **Question 2.1 (SHA herleving)**: Sharpen with the "slapend, niet beëindigd" analysis
6. **Question 2.2 (SHA-uitsluiting bedingen)**: Add specific concept-formulering from Phase 4
7. **Question 2.6 (package deal)**: Replace with detailed structure from Phase 1
8. **Question 3.1 (sommatiebrief timing)**: Add post-1-March timeline context from Phase 3
9. **Question 3.3 (aflossing 28 maart)**: Add the "leverage improves over time" insight

### New sub-questions to consider adding:
- Temporal reach of vrijwaring Art. 4.2: does it survive MO termination for acts during MO period?
- Can simultane passering be enforced through escrow if Douwine tries to decouple?
- What is the legal status of Peter's KTLO bereidheid (oral, meeting 11 Feb)?
- Art. 2:343 BW timing: when is it strategically optimal to file? (before or after aflossing default?)

---

## Implementation Sequence

| Step | Phase | Dependency | Estimated Effort |
|------|-------|------------|-----------------|
| 1 | Phase 2: MO Decision Tree | None (foundational) | Analysis document |
| 2 | Phase 4: Akte Signing Conditions | Builds on MO analysis | Analysis document |
| 3 | Phase 1: Package Deal Structuring | Requires MO + Akte analyses | Analysis document |
| 4 | Phase 3: Post-1-March Positioning | Requires all above | Analysis document + action list |
| 5 | Phase 5: Refine Lawyer Questions | Requires all above | Update existing file |

**Rationale**: The MO decision tree is foundational (it affects everything). Akte conditions build on MO choice. Package deal requires both. Post-1-March is the synthesis. Lawyer questions are the final refinement pass.

## References

### Existing analyses (input)
- `analyse/meeting-11feb-analyse.md` — primary context for current situation
- `analyse/memo-jurist-11feb2026.md` — lawyer strategy framework
- `analyse/bestuurdersontslag-vs-managementovereenkomst.md` — MO/ontslag split
- `analyse/sha-herleving-analyse.md` — SHA herleving analysis
- `analyse/voorkeursrecht-strategische-analyse.md` — 5 options for waiver
- `analyse/concept-akte-teruglevering-analyse.md` — akte details
- `analyse/worst-case-scenarios.md` — loss asymmetry, scenarios
- `analyse/strategische-opties.md` — strategic options overview
- `analyse/geldlening-analyse.md` — loan/aflossing dynamics
- `analyse/dossiersynthese-uittreding.md` — comprehensive synthesis

### Source PDFs (verification)
- `files/getekend-managementovereenkomst-phbx.pdf`
- `files/getekend-aandeelhoudersovereenkomst.pdf`
- `files/10-feb-2026-Concept- levering aandelen.pdf`
- `files/getekend-overeenkomst-van-geldlening.pdf`
- `files/Getekend Addendum overeenkomst van geldlening tussen Freca B.V. en Dinc B.V..pdf`
- `files/Registratie_28_03_2024_Repnr_21003_Koops_Oprichting BV.pdf`

### Key legal provisions
- Art. 6:262 BW (opschortingsrecht)
- Art. 6:212 BW (ongerechtvaardigde verrijking)
- Art. 6:248 lid 2 BW (redelijkheid en billijkheid)
- Art. 6:159 BW (contractsoverneming)
- Art. 2:217 BW (informatierecht aandeelhouder)
- Art. 2:343 BW (uittreding vorderen)
- Art. 2:345 BW (enquêteprocedure)
- Art. 2:239 lid 6 BW (tegenstrijdig belang)
- Art. 8.6 lid 2 statuten (unanimiteit)
- Art. 6.2 statuten (blokkeringsregeling)
