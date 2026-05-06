# Design Técnico: Painel do Pesquisador

## 1. Estrutura de Layout (Wireframe Conceitual)

O painel será dividido em 3 zonas principais:

- **Topo (Barra de Status)**: Condição atual, Contador de Jogadas (Total e Round) e Botões de Controle (Exportar, Encerrar).
- **Esquerda (Métricas de Participantes)**: Cards verticais para os 3 jogadores, com destaque para quem está na vez.
- **Centro/Direita (Espelho e Log)**:
    - O Tabuleiro Espelho (Mirror).
    - Um sinal visual de "Culturante" (Ícone X flutuante ou fixo).
    - Mini log das últimas 5 ações realizadas.

## 2. Componente BoardMirror

O `BoardMirror` será uma versão `read-only` do componente `GameBoard`.

- **Props**: Recebe o `gameState` (matriz de escolhas atuais).
- **CSS**: Escala reduzida (`transform: scale(0.7)`) para caber no dashboard sem esconder outras métricas.
- **Interatividade**: Cliques desabilitados.

## 3. Gerenciamento de Janelas Secundárias

Para o botão "Abrir Tabuleiro":

```javascript
const openPlayerWindow = () => {
  const url = '/player-view';
  const name = 'MCG_PlayerBoard';
  const features = 'width=1024,height=768,menubar=no,toolbar=no,location=no';
  
  // Armazena a referência para controle futuro se necessário
  window.playerWindow = window.open(url, name, features);
};
```

## 4. Sinal de Culturante (Feedback Visual)

Para o sinal "X":
- Utilizar uma animação de CSS (ex: `fade-in-out` ou `bounce`) disparada toda vez que `isCulturant` for `true` no estado da jogada.
- O sinal deve permanecer visível por ~2 segundos ou até o próximo jogador iniciar seu turno.

## 5. Integração com SQLite (Hooks de Controle)

Toda vez que o pesquisador clicar em "Próxima Condição" ou "Encerrar", o sistema deve:
1.  Atualizar o estado local.
2.  Persistir a mudança no SQLite (tabela `game_sessions`).
3.  Emitir a mudança via LocalStorage para que a janela dos jogadores seja resetada/atualizada instantaneamente.

## 6. Diretriz de Compactação de Layout

- O painel do pesquisador deve reduzir a dependência de rolagem vertical durante operação ativa.
- Informações secundárias podem ser movidas para:
  - modal de detalhes
  - drawer lateral
  - abas
  - painéis colapsáveis
- O conteúdo acima da dobra deve privilegiar:
  - condição atual
  - jogador da vez
  - métricas centrais
  - comandos críticos
  - espelho do tabuleiro
