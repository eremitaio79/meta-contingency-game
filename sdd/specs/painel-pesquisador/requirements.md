# Requisitos da Feature: Painel do Pesquisador

## 1. Visão Geral

O Painel do Pesquisador é o centro de comando do experimento. Ele permite monitorar o progresso dos jogadores em tempo real, controlar o fluxo do jogo e exportar os dados finais. Esta interface é visível apenas para o pesquisador.

## 2. Componentes de Monitoramento

### 2.1. Status dos Jogadores (Cards individuais)
Para cada um dos 3 jogadores, o painel deve exibir:
- **Nome**: Definido na configuração.
- **Pontuação Total**: Soma acumulada de todas as rodadas em Reais (BRL).
- **Última Pontuação**: Valor recebido na jogada mais recente (R$ 0,05 ou R$ 0,15).
- **Status de Turno**: Indicador visual (ex: um ícone ou borda) mostrando se é a vez deste jogador.

### 2.2. Métricas da Rodada Atual
- **Condição Atual**: A, B, C ou D.
- **Contador de Jogadas**: Ex: "Jogada 24 / 100".
- **Número de Culturantes**: Total acumulado na rodada atual.
- **Sinal de Culturante ("X")**: Um indicador visual de destaque (ex: um ícone "X" vermelho ou verde) que aparece momentaneamente quando um culturante é gerado (obrigatório para condições A e B).

### 2.3. Espelho do Tabuleiro (Mirror)
- Uma versão visualmente idêntica (porém reduzida e não-clicável) do tabuleiro dos jogadores.
- Deve mostrar as seleções dos jogadores e da máquina em tempo real.

## 3. Controles do Pesquisador

| Botão | Ação / Função |
| :--- | :--- |
| **Abrir Tabuleiro** | Abre a janela secundária para os jogadores (se fechada). |
| **Próxima Condição** | Força o avanço imediato para a próxima letra da sequência. |
| **Encerrar Jogo** | Interrompe o experimento e retorna à tela de configuração ou gera relatório final. |
| **Processar Dados** | Dispara a geração da planilha Excel com as jogadas até o momento. |

## 4. Requisitos Funcionais

- **FR1: Sincronização em Tempo Real**: Qualquer ação no tabuleiro dos jogadores deve refletir no espelho do pesquisador em menos de 500ms.
- **FR2: Persistência Visual**: Ao atualizar ou reabrir o painel, os dados de pontuação e progresso devem ser recuperados do SQLite/LocalStorage.
- **FR3: Bloqueio de Ação**: O botão "Próxima Condição" deve pedir confirmação (modal) para evitar cliques acidentais.

## 5. Requisitos Não Funcionais

- **NFR1: Layout Profissional**: A interface deve ser organizada, com contraste adequado para facilitar a leitura rápida de métricas.
- **NFR2: Robustez de Janela**: Se a janela do tabuleiro for fechada acidentalmente, o pesquisador deve ser notificado ou o botão "Abrir Tabuleiro" deve ser destacado.

## 6. Critérios de Aceite (BDD)

### Cenário: Monitoramento de Culturante
- **Dado** que o jogo está na Condição "A"
- **Quando** os jogadores geram um culturante válido
- **Então** o contador "Número de Culturantes" deve incrementar no painel
- **E** o sinal "X" deve piscar na tela do pesquisador
- **E** a "Última Pontuação" de cada jogador deve ser atualizada para R$ 0,05.

### Cenário: Avanço Manual de Condição
- **Dado** que o jogo está na jogada 10 da Condição "B"
- **Quando** o pesquisador clica em "Próxima Condição" e confirma
- **Então** o sistema deve zerar os contadores de jogadas e culturantes da rodada
- **E** atualizar o indicador de "Condição Atual" para a próxima letra da sequência.
