# Design

## Overview
A feature `project-bootstrap` organiza o arranque documental de qualquer novo projeto usando uma estrutura fixa, leitura progressiva e rastreabilidade explicita.

## Architecture Impact
- Modules:
  - `README.md` como indice canonico
  - `PROJECT-INIT.md` como contrato de briefing
  - `AGENTS.md` como autoridade de papeis
  - `ai-manifest.yaml` e `traceability.yaml` como camada machine-readable
- Data:
  - briefing inicial
  - contexto consolidado
  - catalogos de contrato
  - mapa de execucao
- Integrations:
  - nenhuma obrigatoria
- Security:
  - sem exposicao automatica de dados
  - depende do projeto preencher criterios sensiveis no briefing
- Performance:
  - otimiza custo de contexto por reduzir leitura redundante

## Contracts
- API:
  - `sdd/contracts/api/openapi.yaml` como placeholder inicial
- Schemas:
  - `sdd/contracts/schemas/` para payloads futuros
- Events:
  - `sdd/contracts/events/event-catalog.yaml`
- Errors:
  - `sdd/contracts/errors/error-catalog.yaml`

## Data and State
- Entities:
  - project briefing
  - feature spec
  - decision record
  - review record
  - test suite
- Persistence:
  - markdown e yaml versionaveis
- State transitions:
  - draft -> reviewed -> approved -> implemented -> validated

## Failure Modes
- Failure: iniciar execucao sem briefing suficiente
- Mitigation: usar `PROJECT-INIT.md` como gate minimo
- Failure: provider ler artefatos secundarios antes dos canonicos
- Mitigation: manter `README.md` e `ai-manifest.yaml` como entrypoints obrigatorios

## Testing Strategy
- Unit:
  - nao se aplica
- Integration:
  - validar ligacoes entre spec, review, adr e testes
- Acceptance:
  - validar se um novo projeto consegue iniciar pela ordem de leitura definida
- Security:
  - validar se requisitos sensiveis podem ser registrados no briefing

## Traceability
- Source requirements: `sdd/specs/project-bootstrap/requirements.md`
- ADRs: `sdd/decisions/ADR-001-universal-sdd-structure.md`
