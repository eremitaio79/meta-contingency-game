# IGNITION PROMPT CODEX

Use este arquivo como prompt curto de ignicao para o Codex em um projeto novo que contenha a pasta `sdd/`.

---

## Prompt

Assuma o bootstrap deste projeto a partir da pasta `sdd/`.

Leia nesta ordem:
1. `sdd/README.md`
2. `sdd/ai-manifest.yaml`
3. `sdd/PROJECT-INIT-lite.md`
4. `sdd/PROJECT-INIT.md`
5. `sdd/AGENTS.md`
6. `sdd/WORKFLOW.md`

Regras:
- nao leia a arvore inteira sem necessidade
- nao invente regra de negocio
- trate `PROJECT-INIT-lite.md` e `PROJECT-INIT.md` como gate de bootstrap
- se ambos estiverem vazios, incompletos ou com placeholders, faca apenas as perguntas minimas de alto impacto
- se houver base suficiente, nao peca permissao desnecessaria para iniciar o bootstrap documental
- nao implemente codigo antes da aprovacao humana
- consulte o ultimo handoff em `sdd/execution/handoffs/` antes de continuar trabalho, especialmente em chat novo
- ao final de cada execucao relevante, gere um `.md` numerado em `sdd/execution/handoffs/`
- quando recomendar novo chat, informe o titulo sugerido
- quando recomendar novo chat, entregue tambem a instrucao inicial pronta para colar

Voce deve operar em dois estagios:

### Estagio 1: bootstrap documental

Se houver base suficiente, crie, preencha ou atualize tudo que for necessario nas pastas corretas da `sdd/`, incluindo quando aplicavel:
- `context/`
- `specs/<feature-slug>/requirements.md`
- `specs/<feature-slug>/design.md`
- `specs/<feature-slug>/tasks.md`
- `contracts/`
- `decisions/`
- `execution/plan.yaml`
- `execution/handoffs/`
- `reviews/`
- `tests/`

Fluxo esperado:
1. diagnosticar o estado do briefing
2. consolidar o contexto necessario
3. identificar a primeira feature prioritaria
4. criar a primeira SPEC
5. revisar tecnicamente a SPEC
6. registrar ADR se houver decisao estrutural
7. atualizar plano inicial
8. criar contratos iniciais se necessarios
9. criar testes derivados iniciais
10. registrar handoff numerado em `execution/handoffs/`
11. encerrar com resumo do que foi criado, do que ficou pendente e do que depende de aprovacao humana

### Estagio 2: implementacao aprovada

Somente depois da aprovacao humana do bootstrap documental ou da SPEC priorizada, inicie implementacao.

Ao perguntar algo, siga estas regras:
- pergunte pouco
- pergunte apenas o que muda escopo, regra de negocio, arquitetura ou sucesso do MVP
- agrupe perguntas por prioridade
- nao pergunte o que pode ser inferido com seguranca

Classifique o projeto em um destes estados:
- `Estado 1: sem briefing suficiente`
- `Estado 2: briefing parcial, bootstrap com pendencias`
- `Estado 3: briefing suficiente, pronto para bootstrap documental`

Considere como minimo necessario:
- problema central claro
- objetivo principal claro
- MVP ou escopo inicial claro
- regras de negocio conhecidas
- ao menos 1 fluxo principal compreensivel
- contexto tecnico inicial minimamente definido

Formato da sua primeira resposta:
1. estado atual do bootstrap
2. leitura sintetica do briefing
3. lacunas ou pendencias
4. acao imediata
5. se houver base suficiente, iniciar imediatamente o bootstrap documental

Se `PROJECT-INIT-lite.md` ou `PROJECT-INIT.md` estiver preenchido o suficiente, comece agora.

---

## Uso

- cole este prompt no primeiro comando do Codex apos copiar a pasta `sdd/`
- use `IGNITION-PROMPT.md` quando quiser a versao completa
