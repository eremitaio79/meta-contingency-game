## Execucao 023 - UX da tela inicial com fundo fixo e onboarding

### Resumo

Foi implementado o pacote de refinamento visual e operacional da tela inicial do Meta Contingency Game. A pagina de configuracao agora usa uma imagem de fundo fixa com atmosfera de laboratorio, card principal translúcido, bloco de highlights operacionais, botao de instrucoes do jogo e modal de onboarding com explicacao do fluxo experimental.

Tambem foi feita uma reorganizacao do formulario para reduzir rolagem vertical em desktop, mantendo a tela mais compacta e mais adequada ao uso rapido do pesquisador.

### Arquivos alterados

- `index.html`
- `public/images/config-hero-background.png`
- `src/index.css`
- `src/pages/ConfigPage.tsx`
- `sdd/execution/plan.yaml`

### Entregas desta iteracao

1. Inclusao de imagem fixa de fundo para a tela inicial.
2. Tratamento visual do card principal com transparencia e blur.
3. Inclusao do botao `Instrucoes do jogo` dentro da area hero.
4. Criacao de modal de onboarding com 4 blocos de orientacao do experimento.
5. Reorganizacao do formulario em grid para caber melhor no viewport desktop.
6. Compactacao da area de sessoes registradas com rolagem interna controlada.
7. Inclusao explicita de favicon SVG no `index.html`.

### Validacao executada

- `npm run test` -> ok, 12 testes passando.
- `npm run build` -> ok.
- Navegador local em `http://127.0.0.1:4173`:
  - tela inicial renderizada com fundo e card translúcido;
  - modal de instrucoes abrindo e fechando corretamente;
  - viewport desktop mostrando hero e formulario lado a lado;
  - sem erros novos de console na navegacao atual.

### Observacoes

- A imagem de fundo foi gerada especificamente para a ambientacao da tela inicial e adicionada em `public/images/config-hero-background.png`.
- Em larguras menores a tela continua responsiva e empilha os blocos verticalmente, preservando legibilidade.
- A reducao adicional de rolagem em telas menores ainda pode evoluir com drawers, tabs ou secoes recolhiveis em iteracoes futuras.

### Proximo alvo sugerido

1. Refinar o painel do pesquisador com a mesma linguagem visual da tela inicial.
2. Reduzir densidade vertical nas telas operacionais com secoes colapsaveis.
3. Revisar o fluxo completo em multiplas resolucoes com testes manuais guiados.
