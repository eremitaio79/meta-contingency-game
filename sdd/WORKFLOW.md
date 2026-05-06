# WORKFLOW

## Fluxo canonico
1. briefing em `PROJECT-INIT.md`
2. contexto consolidado em `context/`
3. SPEC escrita em `specs/<feature>/requirements.md`
4. design tecnico em `specs/<feature>/design.md`
5. contratos definidos em `contracts/`
6. validacao tecnica e ADRs em `decisions/`
7. tarefas e plano em `specs/<feature>/tasks.md` e `execution/plan.yaml`
8. implementacao
9. testes derivados em `tests/`
10. review e fechamento
11. registro da execucao em `execution/handoffs/`

## Regras operacionais
- atualizar a fonte de verdade antes de derivar outros artefatos
- nao quebrar uma feature em multiplas SPECs sem necessidade real
- preferir SPEC por capacidade de negocio, nao por camada tecnica
- usar arquivo de plano consolidado em vez de mover cards entre pastas
- ao final de qualquer execucao relevante, gerar um handoff `.md` numerado em `execution/handoffs/`
- antes de retomar trabalho, consultar o ultimo handoff em `execution/handoffs/`
- usar um chat central para direcao e chats separados para slices, features, bugs, refactors ou investigacoes quando houver ganho claro de isolamento
- quando recomendar abrir novo chat, informar o titulo sugerido
- quando recomendar abrir novo chat, fornecer tambem a instrucao inicial pronta para colar
- quando uma execucao absorver mais de um handoff anterior, declarar isso explicitamente no fechamento
- separar no fechamento o que e `handoff absorvida`, `slice concluida` e `proxima slice recomendada`

## Mapeamento rapido
- `context/` explica o projeto
- `specs/` define o comportamento
- `contracts/` fixa o acordo tecnico
- `decisions/` registra escolhas e tradeoffs
- `execution/` mostra ordem e status
- `execution/handoffs/` preserva memoria operacional entre chats e sessoes
- `chat-operations.md` governa a abertura e a passagem de contexto entre chats
- `tests/` valida o comportamento esperado
