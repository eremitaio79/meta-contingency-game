# Design Técnico: Lógica de Condições e Transições

## 1. Modelo de Dados de Execução

Para suportar as regras de transição (especialmente a Condição D), o estado do jogo deve rastrear o histórico detalhado de culturantes.

### Estrutura do Objeto de Rodada (`RoundContext`)
```typescript
interface RoundContext {
  condition: 'A' | 'B' | 'C' | 'D';
  isLastCondition: boolean;
  plays: PlayRecord[];
  culturantCount: number;
  // Cache para regra da Condição D
  prevConditionLast10Culturants?: number; 
}

interface PlayRecord {
  playNumber: number;
  playerChoices: { playerId: string, line: number, color: string }[];
  isCulturant: boolean;
}
```

## 2. Algoritmo de Verificação de Culturante

```typescript
function checkCulturant(choices: PlayerChoice[]): boolean {
  // 1. Todas as linhas devem ser pares
  const allEven = choices.every(c => c.line % 2 === 0);
  if (!allEven) return false;

  // 2. Todas as cores devem ser diferentes
  const colors = choices.map(c => getLineColor(c.line));
  const uniqueColors = new Set(colors);
  
  return uniqueColors.size === 3;
}
```

## 3. Lógica de Transição (Engine)

O motor do jogo deve executar o `checkTransition` ao final de cada jogada (3 jogadores escolheram).

### Fluxograma de Transição
1.  **Sempre:** Incrementa `playCount`.
2.  **Se Condição A, B ou C:**
    - Se `playCount <= 60` AND `culturantCount >= 48` -> **TRIGGER_TRANSITION**.
    - Se `playCount == 100` -> **TRIGGER_TRANSITION**.
3.  **Se Condição D (Não Final):**
    - Se `playCount == 25`:
        - `target = prevConditionLast10Culturants / 3`
        - Se `culturantCount <= target` -> **TRIGGER_TRANSITION**.
    - Se `playCount == 100` -> **TRIGGER_TRANSITION**.
4.  **Se Condição D (Final):**
    - Se `playCount == 100` -> **END_GAME**.

## 4. Integração com Persistência (SQLite)

Para suportar a regra "últimas 10 jogadas da condição anterior" mesmo após um reboot:

- Ao iniciar uma nova condição, o sistema executa uma query:
  ```sql
  SELECT count(*) as culturants 
  FROM plays 
  WHERE condition = ? -- condição anterior
  ORDER BY play_number DESC 
  LIMIT 10 
  WHERE is_culturant = 1;
  ```
- O resultado é armazenado no `RoundContext` para comparação na jogada 25.

## 5. Interface de Feedback

- **Componente `FeedbackOverlay`**: Um componente React que escuta o estado da jogada.
- **Duração**: A mensagem deve ficar visível até que o pesquisador ou o sistema inicie o próximo ciclo de jogada (seleção do próximo jogador aleatório).
- **Sinal do Pesquisador**: Um elemento visual (ex: um círculo verde piscante ou um ícone de check) no painel do pesquisador que "limpa" a cada nova jogada.
