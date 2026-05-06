# SDD README

Este diretorio e a base canonica para iniciar qualquer novo projeto com SDD e Harness Engineering.

## Objetivo
- concentrar o contexto essencial do projeto
- reduzir ambiguidade para humanos e IAs
- manter rastreabilidade entre contexto, SPEC, contrato, decisao, execucao e teste
- permitir leitura progressiva, nao leitura total da arvore

## Ordem minima de leitura para IA
1. `sdd/README.md`
2. `sdd/ai-manifest.yaml`
3. `sdd/IGNITION-PROMPT-CODEX.md` ou `sdd/IGNITION-PROMPT.md`
4. `sdd/PROJECT-INIT-lite.md`
5. `sdd/PROJECT-INIT.md`
6. `sdd/AGENTS.md`
7. `sdd/WORKFLOW.md`

## Estrutura final

### `context/`
Contexto estavel do projeto.
- `product/`: visao, regras de negocio, roadmap e riscos
- `architecture/`: stack, limites, dominio e decisoes tecnicas de base
- `source-material/`: material bruto e consolidado vindo de fora

### `specs/`
Fonte de verdade funcional.
- cada demanda relevante deve viver em um diretorio proprio
- estrutura padrao: `requirements.md`, `design.md`, `tasks.md`
- `_template/` contem o modelo canonicamente reutilizavel
- `_archive/` guarda material descontinuado

### `contracts/`
Contratos tecnicos reutilizaveis por backend, frontend, testes e agentes.
- `api/`: OpenAPI ou contrato equivalente
- `schemas/`: JSON Schema, DTOs ou payload shapes
- `events/`: catalogo de eventos
- `errors/`: catalogo de erros

### `decisions/`
ADRs e registros de decisao com impacto estrutural.

### `execution/`
Sequenciamento, dependencia, plano e status macro.
- `handoffs/`: memoria operacional numerada entre execucoes e chats

### `chat-operations.md`
Protocolo de organizacao de chats do projeto.
- define quando continuar no chat atual
- define quando abrir novo chat
- exige sugestao explicita de titulo para revisao futura
- exige instrucao inicial pronta para colar no novo chat

### `reviews/`
Revisoes formais, pareceres tecnicos e validacoes de consistencia.

### `tests/`
Casos de teste derivados das SPECs.

### `templates/`
Guias genericos e referencias reutilizaveis. Nao sao fonte de verdade do projeto.

## Convencoes obrigatorias
- regra de negocio compartilhada fica em `context/product/business-rules.md`
- feature relevante nasce em `specs/`
- contrato usado por implementacao deve existir em `contracts/`
- decisao estrutural relevante vira ADR
- teste importante deve referenciar SPEC e criterio de aceite
- status de execucao deve ser consolidado em arquivo, nao em pasta espalhada
- toda execucao relevante concluida deve registrar um handoff numerado em `execution/handoffs/`
- todo novo chat operacional deve consultar o handoff mais recente antes de continuar
- quando um novo chat for recomendado, o agente deve informar explicitamente o titulo sugerido
- quando um novo chat for recomendado, o agente deve entregar tambem a instrucao inicial do novo chat
- quando uma execucao absorver mais de um handoff anterior, o fechamento deve explicitar quais handoffs foram absorvidas
- handoff operacional e slice funcional nao devem ser tratados como a mesma coisa

## Antipadroes
- duplicar a mesma verdade em varios arquivos
- manter exemplos que parecem artefatos reais
- organizar specs por camada tecnica em vez de capacidade de negocio
- criar subpastas vazias sem funcao operacional clara
- retomar trabalho em chat novo sem consultar o handoff mais recente
- abrir chats novos sem criterio, sem titulo claro ou sem amarracao com a frente de trabalho
- recomendar novo chat sem fornecer a instrucao inicial correspondente
- encerrar execucao sem declarar handoffs absorvidas quando houver consolidacao de mais de uma continuidade anterior
- tratar numero de handoff como se fosse numero automatico de slice

## Como usar em novo projeto
1. copiar a pasta `sdd/`
2. preencher `PROJECT-INIT-lite.md` ou `PROJECT-INIT.md`
3. usar `IGNITION-PROMPT-CODEX.md` no Codex ou `IGNITION-PROMPT.md` como ponto de partida da IA
4. registrar contexto base em `context/`
5. criar a primeira SPEC real em `specs/`
6. definir contratos e ADRs necessarios
7. derivar plano, reviews e testes
