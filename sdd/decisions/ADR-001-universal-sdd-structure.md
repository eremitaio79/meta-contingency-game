# ADR-001 - Universal SDD Structure

## Status
- Accepted

## Context
A estrutura anterior da `sdd` continha duplicacoes, exemplos que pareciam reais, organizacao de specs por camada tecnica e excesso de arquivos com pouca utilidade operacional para IA.

## Decision
Adotar uma estrutura canonica, enxuta e capability-first para qualquer novo projeto, com:
- entrypoints fixos
- manifesto legivel por maquina
- rastreabilidade explicita
- `specs/` por feature
- `execution/` orientado por arquivo consolidado

## Consequences
- positivas
  - menor custo de contexto
  - menor ambiguidade para providers
  - maior previsibilidade de bootstrap
- negativas
  - times antigos precisarao desaprender a arvore numerada anterior
  - exemplos genericos foram removidos em favor de referencia real
- custos
  - manutencao disciplinada da rastreabilidade

## References
- Related specs:
  - `sdd/specs/project-bootstrap/requirements.md`
  - `sdd/specs/project-bootstrap/design.md`
- Related contracts:
  - `sdd/contracts/api/openapi.yaml`
- Related reviews:
  - `sdd/reviews/2026-04-28-project-bootstrap-review.md`
