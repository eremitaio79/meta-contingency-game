# Requirements

## Metadata
- Feature: execution-handoffs-governance
- Owner: Red
- Status: Draft
- Priority: High

## Problem
A plataforma pode gerar uma SDD tecnicamente correta, mas ainda assim falhar no uso real se o projeto ficar preso a um unico chat ou se novos chats comecarem sem contexto da ultima execucao concluida. Alem disso, a numeracao de handoffs pode ser confundida com slices funcionais se o fechamento nao explicitar o que foi absorvido.

## Objective
Garantir que toda SDD gerada pela blueprint inclua governanca operacional por chat e handoffs numerados para continuidade entre execucoes, incluindo titulo e instrucao de arranque para novos chats e declaracao explicita de handoffs absorvidas quando aplicavel.

## Scope
- In scope:
  - gerar protocolo operacional por chat
  - gerar `execution/handoffs/README.md`
  - incluir regra de handoff numerado no fluxo da SDD
  - orientar leitura do handoff mais recente antes de novo chat operacional
  - incluir naming pattern de chats operacionais
  - incluir regra de entrega de `titulo + instrucao inicial` para novo chat
  - exigir declaracao de handoffs absorvidas no fechamento quando houver mais de uma
  - separar semanticamente handoff operacional e slice funcional
- Out of scope:
  - sincronizacao automatica entre chats do provider
  - criacao automatica de chats pela plataforma
  - analytics avancado de historico de chat no MVP

## Business Rules
- Rule: toda SDD gerada pela blueprint deve incluir protocolo operacional por chat.
- Rule: toda SDD gerada pela blueprint deve incluir pasta `execution/handoffs/` com `README.md`.
- Rule: todo handoff deve usar numeracao crescente com tres digitos.
- Rule: o protocolo gerado deve exigir leitura do handoff mais recente antes de novo chat operacional.
- Rule: o protocolo gerado deve exigir titulo explicito para novos chats operacionais.
- Rule: o protocolo gerado deve exigir instrucao inicial sugerida junto com o titulo de qualquer novo chat operacional recomendado.
- Rule: todo fechamento de execucao deve declarar explicitamente quais handoffs anteriores foram absorvidas naquela execucao, quando houver mais de uma.
- Rule: todo fechamento de execucao deve distinguir handoffs absorvidas de slice funcional concluida ou recomendada.

## Requirements (EARS)
- Quando a blueprint gerar uma nova SDD, o sistema documental deve incluir artefatos de governanca de chat e handoff.
- Quando a blueprint gerar a pasta `execution/`, o sistema deve incluir instrucoes de nomeacao e distribuicao de chats.
- Quando um novo handoff for criado manualmente pelo time, o sistema documental gerado deve oferecer padrao de numeracao e estrutura recomendada.
- Quando a SDD orientar abertura de novo chat operacional, o sistema deve fornecer titulo e instrucao inicial sugerida para esse chat.
- Quando uma execucao consumir trabalho vindo de multiplas handoffs anteriores, o sistema documental deve exigir declaracao explicita dessas handoffs absorvidas no fechamento.
- Se a numeracao de handoffs puder ser confundida com slices funcionais, o sistema documental deve orientar separacao explicita entre ambos.
- Se a plataforma exportar uma SDD sem esses artefatos, o sistema deve tratar a geracao como incompleta para o padrao MSP.

## Acceptance Criteria
- Dado um novo projeto exportado, quando a equipe abrir `execution/`, entao deve encontrar protocolo de chats e pasta de handoffs.
- Dado um novo chat operacional, quando a equipe seguir a SDD gerada, entao deve existir orientacao clara para ler o handoff mais recente.
- Dado uma execucao concluida, quando a equipe gerar um handoff, entao deve haver naming pattern e estrutura recomendada.
- Dado uma recomendacao de novo chat, quando a equipe consultar o handoff ou o protocolo, entao deve encontrar titulo e instrucao inicial sugerida.
- Dado uma execucao que absorveu mais de um handoff anterior, quando a equipe ler o fechamento, entao deve encontrar essa lista explicitada no documento.
- Dado um handoff numerado e uma slice funcional, quando a equipe ler o fechamento, entao deve conseguir distinguir com clareza que handoff nao equivale a slice.

## Traceability
- Related context:
  - `sdd/README.md`
  - `sdd/WORKFLOW.md`
- Related decisions:
  - `sdd/decisions/ADR-006-operational-governance-in-generated-sdd.md`
- Related tests:
  - `sdd/tests/acceptance/execution-handoffs-governance.md`
