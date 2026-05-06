# Design

## Overview
Essa capacidade amplia a blueprint para incluir governanca operacional minima. A estrutura base nao entrega apenas artefatos de analise e execucao; entrega tambem o protocolo para continuidade entre chats e a regra de diferenciar handoff operacional de slice funcional.

## Generated Artifacts
- `sdd/chat-operations.md`
- `sdd/execution/README.md`
- `sdd/execution/handoffs/README.md`
- referencias cruzadas em `README.md` e `WORKFLOW.md`
- handoffs com campos de `titulo sugerido` e `instrucao inicial`
- handoffs com campos de `handoffs absorvidas nesta execucao`, `slice concluida` e `proxima slice recomendada`, quando aplicavel

## Generation Rules
- os templates devem incluir naming pattern para chats
- os templates devem incluir regra de leitura do ultimo handoff
- os templates devem incluir regra de entrega de `titulo + instrucao de arranque`
- os templates devem incluir regra de declarar handoffs absorvidas quando a execucao consolidar mais de uma continuidade anterior
- os templates devem explicitar que handoff numerado e trilha operacional, nao nome automatico de slice funcional
- a pasta `handoffs/` deve nascer pronta para receber o primeiro registro

## Traceability
- Source requirements: `sdd/specs/execution-handoffs-governance/requirements.md`
- Related ADRs:
  - `sdd/decisions/ADR-006-operational-governance-in-generated-sdd.md`
