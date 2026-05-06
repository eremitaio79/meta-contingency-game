# Meta Contingency Game

A deployed psychology research application built with React, TypeScript, and an embedded SDD workflow.

## Live application
- URL: [https://codelib.com.br/app/](https://codelib.com.br/app/)

## What it does
This application supports a multi-participant experimental flow for metacontingency research.

It provides:
- an initial configuration flow for researcher and players
- a dedicated player board experience
- a researcher control panel with experiment controls
- live session results and summary views
- Excel export for collected session data
- browser persistence for session recovery

## Why this project matters
This project is a real validation case for the SDD blueprint maintained in:
- `D:\IA DEV Tools\sdd-blueprint\sdd`

It was not used only as a planning aid. The blueprint shaped:
- feature decomposition
- progressive execution
- handoff continuity across sessions
- implementation of domain logic, reporting, persistence, and UI flows

## Technical stack
- React 19
- TypeScript
- Vite
- React Router
- `sql.js` for browser-side SQLite persistence
- `exceljs` for `.xlsx` export
- Vitest for automated tests

## Key implementation areas
- `src/pages/ConfigPage.tsx`: experiment setup, instructions modal, session recovery
- `src/pages/PlayerPage.tsx`: player-facing board flow
- `src/pages/ResearcherPage.tsx`: researcher controls, monitoring, export actions
- `src/pages/ResultsPage.tsx`: immediate session readout and export access
- `src/services/gameEngine.ts`: domain rules and condition transitions
- `src/services/storage.ts`: browser persistence coordination
- `src/services/exportService.ts`: Excel export pipeline
- `src/services/reporting.ts`: result mapping and summaries

## Validation signals
- production deployment available publicly
- `npm test` passes with 12 tests
- `npm run build` completes successfully
- project contains an embedded `sdd/` folder with feature specs and execution handoffs

## Running locally
```bash
npm install
npm run dev
```

## Build and test
```bash
npm test
npm run build
```

## Architecture note
This repository is intentionally interesting for more than UI output. It demonstrates how a structured SDD approach can survive contact with a real application and still remain useful through delivery, persistence, reporting, and deployment.
