# Tasks

## Implementation Strategy
Executar primeiro a consolidacao dos artefatos canonicos, depois validar rastreabilidade e por fim criar a primeira feature real de referencia.

## Task List
- [x] consolidar estrutura canonica da `sdd`
- [x] criar manifesto legivel por maquina
- [x] remover pastas e exemplos redundantes
- [x] criar template capability-first em `specs/_template/`
- [x] criar feature real de referencia `project-bootstrap`
- [ ] revisar a base com um projeto real futuro

## Dependencies
- Depends on:
  - `sdd/README.md`
  - `sdd/ai-manifest.yaml`
  - `sdd/traceability.yaml`

## Validation
- Tests to run:
  - revisar se a arvore final possui apenas artefatos canonicos e de apoio
  - validar referencias entre spec, adr, review e testes
- Documents to update:
  - `sdd/execution/plan.yaml`
  - `sdd/reviews/`

## Status
- Current state: ready as reusable template
- Next step: aplicar em um projeto real e ajustar lacunas
- Blockers: nenhum no blueprint
