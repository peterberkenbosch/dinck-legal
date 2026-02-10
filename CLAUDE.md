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
