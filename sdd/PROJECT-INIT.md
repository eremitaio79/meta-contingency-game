# PROJECT-INIT

> Artefato fundador canonico para inicializacao de projetos com SDD e Harness Engineering.
>
> Objetivo:
> consolidar o briefing mestre do projeto em um formato legivel por humanos e operacionalizavel por qualquer stack de execucao assistida por IA.
>
> Regras de uso:
> - Campos marcados como `Obrigatorio` devem ser preenchidos para bootstrap sem bloqueio.
> - Campos marcados como `Condicional` devem ser preenchidos quando o contexto do projeto exigir.
> - Campos marcados como `Opcional` podem ficar vazios no inicio, mas a stack de execucao pode registrá-los como pendencia.
> - Listas devem usar bullets simples.
> - Quando uma secao nao se aplicar, usar `Nao se aplica`.
> - Evite respostas vagas como `gerenciar sistema`, `fazer cadastro`, `melhorar performance`.

---

## 0. Metadados do briefing

**Obrigatorio**

- Nome do projeto:
- Codigo curto do projeto:
- Responsavel:
- Data de criacao do briefing:
- Versao do briefing:
- Idioma principal:
- Status do briefing:
  - Rascunho
  - Em refinamento
  - Aprovado para bootstrap

**Condicional**

- Revisado por:
- Data da ultima revisao:

---

## 1. Resumo executivo

**Obrigatorio**

- Descricao curta do projeto:
- Problema central que o projeto resolve:
- Resultado de negocio ou operacional esperado:
- Publico principal impactado:

**Orientacao**

Escreva um resumo em linguagem direta, com no maximo 10 linhas.

---

## 2. Problema e motivacao

**Obrigatorio**

- Qual e o problema real?
- Qual dor atual existe no processo, produto ou operacao?
- Quem sofre com esse problema?
- Como esse problema e resolvido hoje?
- O que acontece se nada for feito?

**Condicional**

- Existe solucao legado ou parcial ja em uso?
- Existem restricoes politicas, organizacionais ou contratuais ligadas ao problema?

---

## 3. Objetivo do produto

**Obrigatorio**

- Objetivo principal:
- Objetivos secundarios:
- Como saberemos, na pratica, que o projeto foi bem-sucedido?
- O que este sistema deve permitir que antes era impossivel, caro ou lento?

**Condicional**

- Objetivos explicitamente nao desejados:

---

## 4. Tipo de sistema e classificacao

**Obrigatorio**

- Categoria principal:
  - CLI
  - API
  - Web App
  - Backoffice
  - ETL
  - Automacao
  - Multiagente / IA
  - Biblioteca / SDK
  - Outro
- Descricao do tipo de sistema:
- Modo principal de uso:
  - Interativo
  - Batch
  - Evento
  - Agendado
  - Misto

**Condicional**

- Plataformas alvo:
  - Windows
  - Linux
  - Web
  - Mobile
  - Container
  - On-premise
  - Cloud

---

## 5. Escopo funcional inicial

**Obrigatorio**

- Funcionalidades obrigatorias do MVP:
- Funcionalidades importantes, mas nao obrigatorias no MVP:
- Funcionalidades explicitamente fora de escopo:

**Orientacao**

Descreva funcionalidades observaveis, com verbo de acao.

**Exemplo**

- Criar novo projeto a partir de briefing estruturado
- Gerar `PROJECT-INIT.md` por wizard, formulario ou fluxo guiado
- Validar consistencia semantica do briefing
- Gerar estrutura `sdd` inicial
- Criar tasks iniciais roteadas por agente

---

## 6. Fluxos principais do usuario

**Obrigatorio**

Descreva os fluxos principais no formato:

- Fluxo:
  - Ator principal:
  - Gatilho:
  - Passos resumidos:
  - Resultado esperado:

**Quantidade minima recomendada**

- 3 fluxos principais

**Condicional**

- Fluxos administrativos:
- Fluxos de excecao:
- Fluxos recorrentes:

---

## 7. Perfis de usuario e atores

**Obrigatorio**

Para cada ator relevante, informar:

- Nome do ator:
- Tipo:
  - Usuario humano
  - Sistema externo
  - Agente interno
  - Administrador
- Objetivo principal:
- Acoes permitidas:
- Restricoes ou limites:

**Condicional**

- Hierarquia entre atores:
- Regras de aprovacao ou autorizacao:

---

## 8. Regras de negocio conhecidas

**Obrigatorio**

Liste regras objetivas e verificaveis.

- Regra:
  - Descricao:
  - Impacto:
  - Obrigatoriedade:
    - Obrigatoria
    - Condicional
    - Opcional

**Orientacao**

Regra de negocio nao e preferencia de interface nem detalhe tecnico.

**Exemplo**

- O bootstrap oficial so pode iniciar quando o `PROJECT-INIT.md` atingir nivel minimo de suficiencia.
- Toda demanda relevante deve gerar ao menos registro da demanda, task e referencia de contexto.
- Tasks de `backend_implementation` devem ser roteadas ao papel `Spock`.

---

## 9. Requisitos comportamentais iniciais

**Obrigatorio**

Registrar os comportamentos ja claros o suficiente para posterior traducao ou geracao em EARS.

Separar em:

- Comportamentos ubiquitarios:
- Comportamentos dirigidos por evento:
- Comportamentos dirigidos por estado:
- Comportamentos opcionais:
- Comportamentos de erro ou excecao:

**Condicional**

- Requisitos ja prontos em formato EARS:

---

## 10. Dados, entidades e objetos centrais

**Obrigatorio**

Para cada entidade relevante:

- Nome da entidade:
- Finalidade:
- Dados importantes:
- Origem:
- Destino:
- Relacoes conhecidas:
- Sensibilidade:
  - Publica
  - Interna
  - Sensivel
  - Sigilosa

**Condicional**

- Volumetria estimada:
- Frequencia de leitura:
- Frequencia de escrita:

---

## 11. Integracoes externas

**Condicional**

Preencher se houver qualquer dependencia de sistema, servico ou API externa.

- Nome da integracao:
- Tipo:
  - API
  - Banco
  - Fila
  - Arquivo
  - Webhook
  - Autenticacao
  - Outro
- Finalidade:
- Obrigatoria para MVP?:
- Direcao do fluxo:
  - Entrada
  - Saida
  - Bidirecional
- Dados trafegados:
- Risco principal:
- Responsavel externo:

**Se nao houver**

- Nao se aplica

---

## 12. Contexto tecnico inicial

**Obrigatorio**

- Linguagem principal desejada:
- Framework principal desejado:
- Banco de dados preferido:
- Estrategia de persistencia:
- Interface principal:
- Provider inicial de IA, se aplicavel:
- Ambientes previstos:
  - Local
  - Homologacao
  - Producao
  - Outro

**Condicional**

- Bibliotecas ou stacks obrigatorias:
- Restricoes de infraestrutura:
- Restricoes de sistema operacional:
- Necessidade de container:
- Necessidade de GPU:

---

## 13. Arquitetura e diretrizes tecnicas iniciais

**Condicional**

- Estilo arquitetural desejado:
  - Monolito
  - Modular
  - Hexagonal
  - Event-driven
  - Pipeline
  - Outro
- Separacoes obrigatorias:
- Limites entre modulos:
- Diretrizes de qualidade de codigo:
- Convencoes de naming:
- Convencoes de versionamento:
- Regras de testes:
- Estrategia de logs:
- Estrategia de observabilidade:

---

## 14. Segurança, privacidade e conformidade

**Obrigatorio**

- Existem dados sensiveis?:
- Existe necessidade de controle de acesso?:
- Existe necessidade de trilha de auditoria?:
- Existe necessidade de mascaramento ou criptografia?:
- Existe exigencia regulatoria?:

**Condicional**

- Politicas especificas de seguranca:
- Requisitos de LGPD:
- Requisitos de retencao:
- Requisitos de segregacao:
- Riscos de abuso:
- Riscos de vazamento:

---

## 15. Performance, escala e operacao

**Condicional**

- Volume inicial esperado de uso:
- Crescimento estimado:
- Limites de tempo de resposta:
- Janelas de processamento:
- Operacoes criticas de performance:
- Gargalos previstos:
- Politica de cache desejada:
- Politica de retries:
- Politica de timeouts:

---

## 16. UX, usabilidade e experiencia

**Obrigatorio** para sistemas com interface humana direta.

- Quem usa a interface no dia a dia?:
- Qual o nivel tecnico medio desse usuario?:
- Qual deve ser a experiencia principal?:
  - Rapida
  - Guiada
  - Segura
  - Exploratória
  - Operacional
- Quais erros de uso o sistema deve prevenir?:
- Quais feedbacks visuais ou textuais sao obrigatorios?:

**Condicional**

- Requisitos de acessibilidade:
- Requisitos de responsividade:
- Requisitos de terminal UX:
- Menus obrigatorios:
- Progress bars obrigatorias:
- Exemplos contextuais obrigatorios:

---

## 17. Observabilidade e suporte

**Condicional**

- Logs obrigatorios:
- Eventos auditaveis:
- Metricas importantes:
- Alertas desejados:
- Necessidade de diagnostico local:
- Necessidade de modo verbose ou debug:

---

## 18. Riscos conhecidos

**Obrigatorio**

Para cada risco:

- Risco:
- Categoria:
  - Negocio
  - Tecnico
  - Operacional
  - Seguranca
  - Dependencia externa
  - Prazo
- Impacto:
- Probabilidade:
  - Baixa
  - Media
  - Alta
- Mitigacao inicial:

---

## 19. Premissas e restricoes

**Obrigatorio**

- Premissas aceitas no momento:
- Restricoes obrigatorias:
- Decisoes ja tomadas:
- Limites de escopo tecnico:
- Limites de escopo de negocio:

---

## 20. Dependencias iniciais

**Condicional**

- Dependencias humanas:
- Dependencias de fornecedor:
- Dependencias de infraestrutura:
- Dependencias de credenciais:
- Dependencias documentais:
- Dependencias de aprovacao:

---

## 21. Prioridades e fases

**Obrigatorio**

- O que precisa existir no MVP:
- O que pode ficar para a V1 apos MVP:
- O que pode ficar para fases futuras:
- Ordem de prioridade entre os blocos:

**Condicional**

- Marco critico:
- Deadline externo:
- Entrega parcial obrigatoria:

---

## 22. Critérios de sucesso e aceite do projeto

**Obrigatorio**

- Criterios objetivos de sucesso:
- O que precisa estar funcionando para considerar o projeto utilizavel:
- O que seria considerado falha de entrega:

**Condicional**

- Indicadores de adocao:
- Indicadores de eficiencia:
- Indicadores de reducao de custo:

---

## 23. Fora de escopo

**Obrigatorio**

- O que explicitamente nao sera feito agora:
- O que o usuario pode erroneamente esperar, mas nao faz parte desta fase:

---

## 24. Dúvidas em aberto

**Obrigatorio**

- Perguntas que ainda precisam de resposta:
- Itens que impedem detalhamento tecnico:
- Itens que nao bloqueiam bootstrap, mas geram pendencia:

---

## 25. Material de referência

**Condicional**

- Documentos existentes:
- Links:
- Prints ou wireframes:
- Repositorios:
- Sistemas legados:
- Padrões ou normas externas:

---

## 26. Estrategia inicial de decomposicao em demandas

**Condicional**

Se ja houver clareza, informar:

- Demandas iniciais esperadas:
- Demandas que exigem SPEC propria:
- Demandas que podem iniciar so com task:
- Demandas com multiplos agentes:

---

## 27. Estrategia inicial de roteamento por agente

**Condicional**

Se ja houver clareza, informar:

- O que deve ir para `Red`:
- O que deve ir para `Data`:
- O que deve ir para `Spock`:
- O que deve ir para `Picasso`:
- O que deve ir para `Maestro`:

---

## 28. Configuracao operacional inicial da stack de execucao

**Condicional**

- Provider inicial:
- Modelo preferido por papel:
- Idioma padrao das respostas:
- Nivel de rigor desejado:
  - Alto
  - Medio
  - Flexivel
- Politica de refinamento:
- Quantidade maxima de tentativas por bloco:
- Permitir pendencias nao criticas?:
- Persistencia local desejada:
- Modo verbose da CLI:

---

## 29. Aprovação para bootstrap

**Obrigatorio**

- Briefing possui informacao suficiente para bootstrap?:
  - Sim
  - Nao
  - Sim, com pendencias
- Principais pendencias remanescentes:
- Justificativa para iniciar agora:
- Aprovador humano:
- Data da aprovacao:

---

## 30. Resumo canônico para ingestão

**Obrigatorio**

Fornecer um resumo final consolidado de ate 20 linhas contendo:

- o que sera construido
- para quem
- por que isso importa
- quais sao os blocos principais
- quais sao os riscos centrais
- o que compoe o MVP

---

## 31. Anexos opcionais

**Opcional**

- Glossario:
- Mapa de termos do dominio:
- Exemplos de entrada:
- Exemplos de saida:
- Estruturas preliminares:
- Consideracoes adicionais:

---

## 32. Checklist de suficiência minima para bootstrap

> Esta secao serve como autocheck antes da stack de execucao iniciar o bootstrap.

Marcar:

- [ ] O problema central esta claro.
- [ ] O objetivo do produto esta claro.
- [ ] O MVP esta definido.
- [ ] Ha funcionalidades observaveis suficientes.
- [ ] Os atores principais foram identificados.
- [ ] As regras de negocio conhecidas foram listadas.
- [ ] As principais restricoes tecnicas foram registradas.
- [ ] Os riscos mais obvios foram registrados.
- [ ] O fora de escopo foi declarado.
- [ ] As duvidas em aberto foram registradas.
- [ ] Ha base suficiente para gerar contexto, specs iniciais e tasks.

---

## Notas para a stack de execucao

Interpretacao operacional sugerida:

- Secoes criticas para bloqueio:
  - `1. Resumo executivo`
  - `2. Problema e motivacao`
  - `3. Objetivo do produto`
  - `5. Escopo funcional inicial`
  - `6. Fluxos principais do usuario`
  - `7. Perfis de usuario e atores`
  - `8. Regras de negocio conhecidas`
  - `12. Contexto tecnico inicial`
  - `21. Prioridades e fases`
  - `22. Critérios de sucesso e aceite do projeto`
  - `23. Fora de escopo`
  - `24. Dúvidas em aberto`
  - `29. Aprovação para bootstrap`
  - `30. Resumo canônico para ingestão`

- Secoes geralmente permitidas com pendencia:
  - `11. Integracoes externas`
  - `13. Arquitetura e diretrizes tecnicas iniciais`
  - `15. Performance, escala e operacao`
  - `17. Observabilidade e suporte`
  - `20. Dependencias iniciais`
  - `26. Estrategia inicial de decomposicao em demandas`
  - `27. Estrategia inicial de roteamento por agente`
  - `28. Configuracao operacional inicial da stack de execucao`

- Secoes condicionais obrigatorias por contexto:
  - `16. UX, usabilidade e experiencia` para sistemas com interface humana
  - `11. Integracoes externas` para sistemas com dependencias externas
  - `14. Segurança, privacidade e conformidade` para qualquer sistema com dados sensiveis

---

## Observação final

Este template deve ser tratado como o schema canonico do `PROJECT-INIT.md`. O wizard, o validador semantico, o bootstrap documental e a geracao inicial de specs, tarefas e contratos devem partir desta estrutura como contrato de entrada oficial.
