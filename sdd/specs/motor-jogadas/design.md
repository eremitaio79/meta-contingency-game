# Design Técnico: Motor de Jogadas

## 1. Máquina de Estados da Jogada

Para garantir a sincronização entre as janelas e a integridade das regras, o motor utilizará os seguintes estados:

- `IDLE`: Aguardando início de uma nova jogada.
- `PLAYER_TURN`: Aguardando clique de um jogador específico em uma linha.
- `ANIMATING`: Curto período após a escolha da máquina para exibir visualmente o resultado.
- `CHECKING_ROUND`: Momento entre turnos de jogadores ou fim da jogada para validar culturantes e transições.

## 2. Lógica de Sorteio de Coluna

A máquina utilizará uma função pura para determinar a coluna, garantindo que o requisito de "Bola Vazia/Cheia" seja cumprido conforme a paridade da linha.

```typescript
type BallType = 'FULL' | 'EMPTY';

const CANDIDATE_COLUMNS = ['A', 'C', 'E', 'G', 'I']; // Colunas que cumprem o padrão de cores/bolas nas regras

function getMachineResponse(line: number): { column: string, value: number } {
  const isEven = line % 2 === 0;
  
  // Escolhe aleatoriamente uma das colunas candidatas
  const randomIndex = Math.floor(Math.random() * CANDIDATE_COLUMNS.length);
  const column = CANDIDATE_COLUMNS[randomIndex];
  
  // Define o valor baseado na paridade (Even=Empty=0.05, Odd=Full=0.15)
  const value = isEven ? 0.05 : 0.15;
  
  return { column, value };
}
```

## 3. Mapeamento Visual do Tabuleiro (10x10)

O tabuleiro será renderizado como um grid onde cada célula (L, C) possui uma propriedade `ballType`.

| Linha | Col A | Col B | Col C | ... |
| :--- | :--- | :--- | :--- | :--- |
| **1 (Ímpar)** | Cheia | Vazia | Cheia | ... |
| **2 (Par)** | Vazia | Cheia | Vazia | ... |

**Regra de Renderização:**
- Se `(Linha + ColunaIndex) % 2 === 0` -> **Bola Cheia** (para indexação começando em 1).
- Se `(Linha + ColunaIndex) % 2 !== 0` -> **Bola Vazia**.

## 4. Comunicação de Estado (Sync)

Ao atualizar o `mcg_game_state` no `localStorage`, o motor deve enviar o payload completo para que a janela do tabuleiro possa destacar a linha e a coluna escolhida:

```json
{
  "activePlayerIndex": 1,
  "lastAction": {
    "playerId": "UUID",
    "line": 4,
    "column": "C",
    "value": 0.05,
    "timestamp": "..."
  }
}
```

## 5. UI/UX do Tabuleiro

- **Linhas**: Botões horizontais grandes, coloridos conforme a regra de cores (Amarelo, Verde, Vermelho, Azul, Rosa).
- **Feedback de Vez**: O nome do jogador cuja vez é atual deve aparecer em destaque no topo do tabuleiro.
- **Destaque de Seleção**: Quando a máquina escolhe a coluna, a célula deve piscar ou mudar de borda para que os jogadores percebam o resultado.
