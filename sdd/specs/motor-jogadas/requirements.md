# Requisitos da Feature: Motor de Jogadas

## 1. Visão Geral

O Motor de Jogadas gerencia o ciclo de vida de uma jogada individual, desde a escolha do jogador inicial pela máquina até a resposta automática da máquina (seleção de coluna) e atribuição de pontos.

## 2. Ciclo de uma Jogada (Sequence)

Uma **Jogada** consiste em 3 turnos (um para cada jogador configurado).
1.  **Início da Jogada:** A máquina escolhe aleatoriamente a ordem dos 3 jogadores para esta jogada específica (ou apenas quem inicia, e segue a ordem circular). 
    - *Nota:* Segundo as regras, a máquina escolhe quem inicia. Assumiremos uma ordem aleatória completa a cada jogada para evitar viés.
2.  **Turno do Jogador:**
    - O sistema indica visualmente de quem é a vez.
    - O jogador ativo clica em uma das 10 linhas do tabuleiro.
3.  **Resposta da Máquina:**
    - Imediatamente após o clique na linha, a máquina seleciona uma coluna (A-J) baseada na regra de paridade.
    - A interseção (Linha x Coluna) é destacada.
4.  **Atribuição de Pontos:**
    - O valor correspondente à bola (cheia ou vazia) é somado ao saldo do jogador e ao saldo total da sessão.
5.  **Próximo Turno:** O processo se repete para os outros 2 jogadores.
6.  **Fim da Jogada:** Após os 3 jogadores terem jogado, o sistema avalia se houve um **Culturante** (ver SPEC de Lógica de Condições).

## 3. Regras de Seleção de Coluna

A máquina deve escolher uma coluna aleatória que contenha o tipo de bola exigido pela linha escolhida:

| Tipo de Linha | Regra de Bola | Colunas Candidatas (A-J) | Valor da Jogada |
| :--- | :--- | :--- | :--- |
| **Linha Par** (2, 4, 6, 8, 10) | **Bola Vazia** | A, C, E, G, I | R$ 0,05 |
| **Linha Ímpar** (1, 3, 5, 7, 9) | **Bola Cheia** | A, C, E, G, I | R$ 0,15 |

*Padrão do Tabuleiro:*
- Linhas Ímpares: A(Cheia), B(Vazia), C(Cheia), D(Vazia)...
- Linhas Pares: A(Vazia), B(Cheia), C(Vazia), D(Cheia)...

## 4. Requisitos Funcionais

- **FR1: Aleatoriedade de Início**: A cada nova jogada, o sistema deve sortear qual dos 3 jogadores começa.
- **FR2: Bloqueio de Turno**: Apenas o jogador da vez pode interagir com o tabuleiro. Os botões das linhas devem ficar desabilitados para os outros.
- **FR3: Feedback de Resposta**: O tabuleiro deve mostrar visualmente qual coluna a máquina escolheu (ex: um brilho ou destaque na célula).
- **FR4: Acúmulo de Pontos**: As pontuações devem ser atualizadas em tempo real no painel do pesquisador.

## 5. Requisitos Não Funcionais

- **NFR1: Determinismo de Regra**: A máquina **nunca** deve escolher uma bola vazia para uma linha ímpar, ou cheia para uma linha par.
- **NFR2: UI State**: O tabuleiro deve resetar visualmente (limpar seleções anteriores) apenas no início de uma nova **Jogada** (após os 3 terminarem).

## 6. Critérios de Aceite (BDD)

### Cenário: Resposta da Máquina para Linha Par
- **Dado** que é a vez do Player 1
- **Quando** o Player 1 clica na **Linha 2** (Par)
- **Então** a máquina deve escolher aleatoriamente uma coluna entre **A, C, E, G ou I**
- **E** o valor creditado ao Player 1 deve ser **R$ 0,05**

### Cenário: Resposta da Máquina para Linha Ímpar
- **Dado** que é a vez do Player 2
- **Quando** o Player 2 clica na **Linha 3** (Ímpar)
- **Então** a máquina deve escolher aleatoriamente uma coluna entre **A, C, E, G ou I**
- **E** o valor creditado au Player 2 deve ser **R$ 0,15**
