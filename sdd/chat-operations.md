# CHAT OPERATIONS

Este arquivo define como organizar chats durante a execucao de um projeto.

## Objetivo
- evitar concentrar tudo em um unico chat
- reduzir gargalo cognitivo
- preservar historico limpo por frente de trabalho
- facilitar revisao futura

## Regra principal
- usar um chat central para direcao
- abrir novos chats quando houver ganho claro de foco, isolamento ou rastreabilidade

## Chat central

O chat central deve concentrar:
- decisoes de produto
- arquitetura macro
- priorizacao
- aprovacoes
- checkpoints de andamento

## Quando abrir novo chat

Abrir novo chat quando:
- a frente tiver objetivo proprio e entregavel proprio
- o contexto acumulado comecar a misturar produto, arquitetura e implementacao
- a execucao exigir muitas interacoes tecnicas de baixo nivel
- a mudanca puder ser trabalhada quase isoladamente do restante
- for importante preservar historico limpo para revisao futura
- houver bug profundo, incidente ou refactor grande

## Tipos comuns de chat

- chat central do projeto
- chat por slice
- chat por feature relevante
- chat por bug ou incidente
- chat por refactor grande
- chat por investigacao tecnica

## Regra de titulo

Quando um novo chat for recomendado, o agente deve informar explicitamente o titulo sugerido.
Quando um novo chat for recomendado, o agente tambem deve entregar a instrucao inicial pronta para colar.

O titulo deve ser:
- curto
- especifico
- bom para revisao futura
- consistente com a frente de trabalho

## Regra de instrucao inicial

A instrucao inicial do novo chat deve:
- resumir o objetivo da frente
- dizer quais arquivos ou artefatos devem ser lidos primeiro
- dizer qual entregavel e esperado
- citar o handoff mais recente quando aplicavel
- evitar contexto desnecessario

## Padrao sugerido

- `<project-code> Central - Product And Architecture`
- `<project-code> Slice N - <short-purpose>`
- `<project-code> Feature - <short-purpose>`
- `<project-code> Incident - <short-purpose>`

## Relacao com handoffs

- todo novo chat operacional deve ler o handoff mais recente em `sdd/execution/handoffs/`
- toda execucao relevante concluida deve gerar novo handoff numerado
- o handoff pode registrar o proximo titulo de chat e a instrucao recomendada
- se a execucao tiver consolidado trabalho vindo de mais de um handoff anterior, o fechamento deve declarar explicitamente `handoffs absorvidas nesta execucao`
- o fechamento deve separar claramente `handoffs absorvidas` de `slice funcional concluida` e de `proxima slice recomendada`
- handoff numerado e trilha operacional; slice e frente funcional. Nunca tratar os dois como sinonimos

## Regra operacional curta

- 1 chat para direcao
- 1 chat por frente relevante
- 1 handoff ao fim de cada execucao relevante
- 1 titulo + 1 instrucao inicial sempre que um novo chat for recomendado
