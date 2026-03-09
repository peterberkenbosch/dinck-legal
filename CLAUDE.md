# Dinck Legal Dossier — Project Instructions

## Document Generation

**Always use the JS `docx` library** for generating .docx files. Never use pandoc, wkhtmltopdf, weasyprint, or other system tools for document creation.

### How it works

1. Write a Node.js script in `artifacts/` using `require('docx')` (already installed in `artifacts/node_modules/`)
2. Use the helper pattern from existing scripts: `p()`, `heading()`, `bullet()`, `cell()` etc.
3. Generate .docx via `Packer.toBuffer()` → `fs.writeFileSync()`
4. Run with: `node artifacts/generate-<name>.js`
5. PDF conversion: user handles this via LibreOffice (File → Export as PDF)

### Reference scripts

- `artifacts/generate-brief-financiele-zorgen.js` — formal letter (best template for brieven)
- `artifacts/generate-dutch-docs.js` — multi-document generation with tables, headings, bullets
- `artifacts/generate-constatering-10feb.js` — short formal letter

### Key conventions

- Font: Arial, size 22 (11pt body), size 24 (12pt sender name)
- Page margins: 1440 DXA (1 inch) all sides
- Sender block: PHBX Holding B.V., peter@phbxholding.com, KvK: 75861097, **Oosterwolde** (not Appelscha)
- Output files go in `artifacts/` with descriptive names (e.g., `Brief_Financiele_Zorgen_Dinck_BV.docx`)

## Language

- Legal documents and correspondence: **Dutch**
- Strategic assessments and internal analysis: **English** is acceptable
- Tone in all outgoing documents: zakelijk, constructief, chique — let the facts do the work

### Dutch language conventions

Documents must read as if written by a Dutch professional — no anglicisms or hybrid constructions.

**Spelling & grammar**:
- Use trema: beëindiging, financiële, commerciële (never "beeindiging")
- Compound words: dataverlies, databaseonderhoud, broncoderepository (no spaces)
- Adjective inflection: juridische/fiscale/financiële adviseurs (not "juridisch, fiscaal of financieel")
- btw (lowercase, modern Dutch convention)
- back-up / back-ups / back-upverificatie (hyphenated per Dutch spelling rules)

**Anglicisms → Dutch**:
- monitoring → bewaking (en signalering); alerts → meldingen; error tracking → foutregistratie
- uptime → beschikbaarheid; downtime → onbeschikbaarheid
- security patch → beveiligingsupdate; credentials → (inlog/toegangs)gegevens
- secrets manager → wachtwoordbeheerder; onboarding → inwerkbegeleiding
- feature requests → verzoeken tot nieuwe functionaliteit
- performance optimalisatie → prestatie-optimalisatie
- refactoring → herstructurering van code; caching → cache-
- scope (contract) → omvang/reikwijdte; "buiten scope" → **Meerwerk** (standard Dutch contract term)
- Object Storage → Objectopslag; backup → back-up

**Keep unchanged** (universally accepted IT terms): API, SSL, DNS, CVE, bug, server, database, Rails, GitHub, 1Password

**Contract formatting conventions**:
- Article headings: `Artikel N. Titel` (period, not em-dash)
- Cross-references in running text: lowercase (`artikel 2`, `artikel 1.4`), capitalized only in headings
- Abbreviations in tables: `Art. 1.4` is fine
- Overwegingen open with: `Partijen nemen het volgende in aanmerking:`
- Ondertekening: `Aldus in tweevoud opgesteld en ondertekend`
- Final article heading: `Slotbepalingen` (not "Overige Bepalingen")
- Hyphenate compound modifiers: GitHub Team-kosten, SSL-certificaten, DNS-beheer

## Dossier Search

**Always use QMD** to search the dossier before writing analysis or drafting documents. This ensures you work from verified facts rather than assumptions.

- Use `/qmd` (skill) or the QMD MCP tools to search across all 55+ markdown documents in the dossier
- Combine `lex` (keyword) and `vec` (semantic) searches for best results
- Always provide an `intent` parameter to improve search relevance
- Search first, write second — verify claims against the dossier before making assertions

## Document Verification

- Always verify day-of-week + date combinations with `cal` before writing into documents
- Cross-reference claims against source PDFs in `files/` before writing analysis
- When updating one file, check related files for consistency (ripple effect)
- Distinguish feitelijk (factual/accounting) from juridisch (legal/formal)

## Project Structure

```
files/          — source PDFs (contracts, deeds, correspondence)
analyse/        — legal analyses
concepten/      — outgoing letters, meeting guides, drafts
artifacts/      — generated .docx/.pdf + Node.js generation scripts
```
