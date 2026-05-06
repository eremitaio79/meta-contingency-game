# Design Técnico: Interface dos Jogadores

## 1. Arquitetura do Componente `GameBoard`

O tabuleiro será construído como um componente React altamente parametrizado para permitir o reuso tanto na tela dos jogadores quanto no espelho do pesquisador.

```typescript
interface GameBoardProps {
  mode: 'interactive' | 'mirror';
  showFeedback: boolean; // Ativado apenas em Condições A e C para jogadores
  gameState: GameState;
  onLineClick?: (line: number) => void;
}
```

## 2. Layout do Grid (CSS Grid)

O tabuleiro utilizará CSS Grid para garantir alinhamento perfeito.

- **Container**: `display: grid; grid-template-columns: 50px repeat(10, 1fr);` (50px para os botões de linha).
- **Células**: Aspect ratio 1:1 para manter as bolas circulares.
- **Bolas**:
    - **Cheia**: Círculo com preenchimento sólido (ex: cor preta ou cinza escuro).
    - **Vazia**: Círculo apenas com borda (outline).

## 3. Feedback Visual de Seleção

Quando um jogador seleciona uma linha e a máquina responde com uma coluna:

1.  **Linha**: A linha inteira recebe um leve overlay ou borda colorida para indicar que foi a linha da vez.
2.  **Célula (L, C)**: A interseção específica deve receber um efeito de "pulse" ou um ícone de destaque (ex: um anel dourado) para atrair a atenção do jogador para o resultado da máquina.

## 4. Overlay de Mensagens (Conditions A/C)

As mensagens não devem bloquear o tabuleiro completamente, mas devem ser proeminentes.

- **Estilo**: Modal centralizado com fundo semi-transparente ou uma faixa (banner) no topo/centro.
- **Tipografia**: Grande e legível, com cores positivas (verde para parabéns) e neutras/alerta (cinza/laranja para desaprovação).

## 5. Sons (Opcional, mas Recomendado)

Embora não esteja explicitamente nas regras, para uma experiência "Premium", sugerimos:
- **Clique**: Som curto e seco.
- **Sucesso (Culturante)**: Som harmônico de validação.
- **Erro**: Som neutro de "tente novamente".
*(Nota: Estes devem ser configuráveis pelo pesquisador no painel).*

## 6. Sincronização via LocalStorage

A janela do tabuleiro escuta o `mcg_game_state`.
- Quando `activePlayerIndex` muda -> Atualiza o indicador de "Vez de...".
- Quando `lastAction` é recebido -> Inicia a animação de destaque na célula correspondente.
- Quando `conditionTransition` ocorre -> Reseta o tabuleiro visualmente.

## 7. Diretriz de Economia Vertical

- A tela dos jogadores deve manter o tabuleiro e o indicador de turno visíveis com o mínimo possível de rolagem.
- Mensagens, instruções auxiliares ou detalhes não críticos devem preferir overlays leves, modais curtos ou banners temporários em vez de expandir permanentemente a altura da tela.
