# Requisitos da Feature: Interface dos Jogadores (Tabuleiro)

## 1. Visão Geral

A Interface dos Jogadores é a tela secundária onde o experimento acontece. Ela contém o tabuleiro 10x10 interativo e exibe os feedbacks visuais de acordo com as condições experimentais. Esta interface é projetada para ser simples e focar inteiramente na tarefa dos participantes.

## 2. Estrutura do Tabuleiro (10x10)

O tabuleiro deve seguir rigorosamente as especificações de cores e padrões de bolas:

### 2.1. Cores das Linhas
- **Linhas 1 e 6**: Amarelo (#FFFF00)
- **Linhas 2 e 7**: Verde (#008000)
- **Linhas 3 e 8**: Vermelho (#FF0000)
- **Linhas 4 e 9**: Azul (#0000FF)
- **Linhas 5 e 10**: Rosa (#FF13F0)

### 2.2. Colunas e Bolas
As colunas são identificadas de **A a J**. Cada interseção contém uma bola (Cheia ou Vazia):
- **Linhas Ímpares (1, 3, 5, 7, 9)**: Começam com Bola Cheia em 'A' e alternam (C, E, V, E...).
- **Linhas Pares (2, 4, 6, 8, 10)**: Começam com Bola Vazia em 'A' e alternam (V, E, V, E...).

## 3. Elementos de Interface

### 3.1. Indicador de Turno
- No topo da tela, deve haver um texto claro indicando de quem é a vez.
- Exemplo: "Vez de: **[NOME_DO_JOGADOR]**".

### 3.2. Botões de Linha
- O número de cada linha (1 a 10) deve ser um botão clicável.
- **Interatividade**: O botão só é clicável quando é a vez do jogador atual e o sistema está no estado `WAITING_FOR_PLAYER`.

### 3.3. Painel de Feedback (Overlay)
- Uma área centralizada ou sobreposta para exibir as mensagens das condições A e C.
- As mensagens devem desaparecer automaticamente no início da próxima **Jogada** (após o ciclo de 3 jogadores).

## 4. Requisitos Funcionais

- **FR1: Seleção de Linha**: Ao clicar no botão de uma linha, o sistema deve registrar a escolha e disparar o Motor de Jogadas.
- **FR2: Feedback Condicional**:
    - **Condições A e C**: Exibir mensagens de aprovação/desaprovação após o 3º jogador completar seu turno.
    - **Condições B e D**: Não exibir mensagens, mantendo a interface limpa.
- **FR3: Destaque da Máquina**: Após a escolha da linha, o sistema deve destacar visualmente a coluna escolhida pela máquina (ex: a bola na interseção brilha ou é circulada).

## 5. Requisitos Não Funcionais

- **NFR1: Acessibilidade Visual**: As cores devem ser nítidas e as bolas (cheias/vazias) claramente distinguíveis.
- **NFR2: Imersão**: Evitar elementos de UI desnecessários (menus, barras de ferramentas) que possam distrair os participantes.
- **NFR3: Responsividade**: O tabuleiro deve ocupar a maior parte da janela disponível, mantendo a proporção 10x10.

## 6. Critérios de Aceite (BDD)

### Cenário: Turno do Jogador e Seleção
- **Dado** que é a vez de "João"
- **Quando** "João" clica no botão da "Linha 2"
- **Então** o sistema deve registrar o clique
- **E** destacar uma bola vazia em uma das colunas A, C, E, G ou I
- **E** passar a vez para o próximo jogador (se houver).

### Cenário: Exibição de Mensagem na Condição A
- **Dado** que a condição atual é "A"
- **E** o 3º jogador acaba de realizar sua jogada
- **E** os critérios de Culturante foram atendidos
- **Quando** o sistema processa a jogada
- **Então** a mensagem "Parabéns! Vocês se saíram bem desta vez" deve aparecer na tela dos jogadores.
