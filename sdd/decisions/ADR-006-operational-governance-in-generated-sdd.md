# ADR-006 - Operational Governance In Generated SDD

## Status
- Accepted

## Context
A blueprint gera SDD para ser usada por devs e agentes em fluxos reais. Sem governanca de continuidade entre chats, a estrutura perde parte do valor operacional e volta a depender de memoria informal. Sem regra explicita de handoffs absorvidas, a equipe pode confundir continuidade operacional com slices funcionais pendentes.

## Decision
- a SDD gerada pela blueprint deve incluir protocolo operacional por chat
- a SDD gerada pela blueprint deve incluir pasta `execution/handoffs/` com regra de numeracao
- a SDD gerada deve orientar leitura do handoff mais recente antes de novo chat operacional
- a SDD gerada deve fornecer `titulo + instrucao inicial` quando recomendar novo chat operacional
- a SDD gerada deve exigir que fechamentos explicitem handoffs absorvidas quando uma execucao consolidar mais de uma continuidade anterior
- a SDD gerada deve separar semanticamente handoff operacional e slice funcional

## Consequences
- positivas
  - maior continuidade entre execucoes
  - menor perda de contexto entre chats
  - melhor revisao futura por frente de trabalho
- negativas
  - aumenta um pouco a disciplina exigida do time
  - adiciona mais estrutura ao fechamento das execucoes

## References
- Related specs:
  - `sdd/specs/execution-handoffs-governance/requirements.md`
  - `sdd/specs/execution-handoffs-governance/design.md`
