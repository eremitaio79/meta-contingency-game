# Requisitos da Feature: Lógica de Condições e Feedback

## 1. Visão Geral

Esta feature define o "cérebro" do experimento: como o sistema interpreta as escolhas dos jogadores para gerar culturantes, como fornece feedback visual baseado na condição atual (A, B, C ou D) e sob quais critérios o jogo avança para a próxima fase.

## 2. Definição de Culturante (Feedback Positivo)

Um **Culturante** é gerado em uma jogada se, e somente se, todos os critérios abaixo forem atendidos:
1.  Os 3 jogadores escolheram uma **linha par** (2, 4, 6, 8 ou 10).
2.  As 3 linhas escolhidas possuem **cores diferentes** entre si.
    - *Cores das linhas:* 1/6 (Amarelo), 2/7 (Verde), 3/8 (Vermelho), 4/9 (Azul), 5/10 (Rosa).
    - Exemplo válido: Jogador 1 (Linha 2 - Verde), Jogador 2 (Linha 4 - Azul), Jogador 3 (Linha 6 - Amarelo).
    - Exemplo inválido: Jogador 1 (Linha 2 - Verde), Jogador 2 (Linha 7 - Verde), Jogador 3 (Linha 4 - Azul) -> Mesma cor.

## 3. Comportamento das Condições (Feedback)

| Condição | Feedback para Jogadores (Mensagem) | Feedback para Pesquisador |
| :--- | :--- | :--- |
| **A** | **Culturante**: "Parabéns! Vocês se saíram bem desta vez"<br>**Não-Culturante**: "Isso não foi bom! Vocês não se saíram bem desta vez" | Sinal de "X" na tela em caso de Culturante. |
| **B** | Nenhuma mensagem. | Sinal de "X" na tela em caso de Culturante. |
| **C** | **Culturante**: "Parabéns! Vocês se saíram bem desta vez"<br>**Não-Culturante**: "Isso não foi bom! Vocês não se saíram bem desta vez" | Nenhuma sinalização específica (apenas log padrão). |
| **D** | Nenhuma mensagem independente da escolha. | Nenhuma sinalização específica. |

*Nota: Em todas as condições, o pesquisador sempre vê o log técnico e a pontuação atualizada.*

## 4. Regras de Transição de Condição

O jogo deve monitorar o progresso para decidir o momento de avançar na sequência escolhida pelo pesquisador.

### 4.1. Condições A, B e C
O jogo avança para a próxima condição se:
- **Critério 1:** Os jogadores atingirem **48 culturantes** dentro das primeiras **60 jogadas**.
- **Critério 2:** O total de **100 jogadas** for atingido (caso o Critério 1 não seja cumprido).

### 4.2. Condição D (Intermediária)
Se a condição atual for **D** e **não for a última** da sequência:
- Após as primeiras **25 jogadas**, o sistema realiza um cálculo comparativo:
    - `C_prev` = Quantidade de culturantes nas **últimas 10 jogadas** da condição imediatamente anterior.
    - `C_curr` = Quantidade de culturantes nas primeiras **25 jogadas** da condição D atual.
    - **Regra:** Se `C_curr <= (C_prev / 3)`, o jogo **avança imediatamente**.
    - **Caso contrário:** O jogo continua até completar **100 jogadas**.

### 4.3. Condição D (Final)
Se a condição atual for **D** e for a **última** da sequência:
- O jogo **sempre** completa **100 jogadas** antes de encerrar.

## 5. Requisitos Não Funcionais

- **NFR1: Precisão Matemática**: O cálculo de culturantes deve ser exato e auditável.
- **NFR2: Latência de Feedback**: A mensagem de feedback deve aparecer em menos de 200ms após a última escolha da jogada.
- **NFR3: Consistência de Estado**: Em caso de pausa/retorno (SQLite), o contador de jogadas e culturantes da rodada deve ser restaurado perfeitamente.

## 6. Critérios de Aceite (BDD)

### Cenário: Geração de Culturante Válido
- **Dado** que a condição atual é "A"
- **Quando** Player 1 escolhe Linha 2 (Verde)
- **E** Player 2 escolhe Linha 4 (Azul)
- **E** Player 3 escolhe Linha 6 (Amarelo)
- **Então** um culturante deve ser contabilizado
- **E** a mensagem "Parabéns!..." deve ser exibida para os jogadores
- **E** o sinal "X" deve aparecer para o pesquisador

### Cenário: Transição Antecipada na Condição D
- **Dado** que na condição anterior os jogadores fizeram 9 culturantes nas últimas 10 jogadas
- **E** a condição atual é "D" (não final)
- **Quando** o jogo atinge a jogada 25 da rodada atual
- **E** o total de culturantes nestas 25 jogadas for igual a 2 (Note: 2 <= 9/3)
- **Então** o jogo deve avançar para a próxima condição imediatamente após a jogada 25.
