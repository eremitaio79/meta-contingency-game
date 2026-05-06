## Execucao 024 - Ajuste de transparencia e alinhamento na home

### Resumo

Foi refinada a composicao da tela inicial para corrigir tres pontos visuais:

1. aumentar a percepcao real de transparencia dos cards;
2. alinhar o topo do card de titulo com o topo do card de configuracao;
3. mover o bloco de sessoes registradas para baixo do card de titulo.

### Arquivos alterados

- `src/pages/ConfigPage.tsx`
- `src/index.css`

### Ajustes aplicados

- Criada uma coluna esquerda dedicada para empilhar `hero` e `sessoes registradas`.
- Alterado o alinhamento vertical da grade principal para `start`.
- Reduzida a opacidade base dos paineis e reforcado o efeito de blur/saturacao para evidenciar o fundo.
- Tornado o card do formulario e o card de sessoes visualmente mais leves.
- Mantida rolagem interna do bloco de sessoes quando necessario.

### Validacao executada

- `npm run test` -> ok.
- `npm run build` -> ok.
- Verificacao visual no navegador local em `http://127.0.0.1:4173` -> ok.
