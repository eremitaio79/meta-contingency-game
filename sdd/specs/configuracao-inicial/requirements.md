# Requisitos da Feature: Configuração e Início do Jogo

## 1. Visão Geral

Esta feature abrange a interface e a lógica para o pesquisador configurar o experimento, incluindo a definição dos nomes dos jogadores e a sequência das condições do jogo. Após a configuração, o pesquisador poderá iniciar o jogo, o que resultará na abertura das duas janelas principais: o painel de controle do pesquisador e a tela do tabuleiro para os jogadores.

## 2. Requisitos Funcionais

### FR1: Tela de Configuração

- **Descrição:** O sistema deve apresentar uma tela inicial para a configuração do experimento pelo pesquisador.
- **Atores:** Pesquisador.
- **Gatilho:** Início da aplicação.
- **Pré-condição:** Nenhuma.
- **Pós-condição:** A tela de configuração é exibida.

### FR2: Entrada de Nomes dos Jogadores

- **Descrição:** A tela de configuração deve permitir ao pesquisador inserir os nomes dos três jogadores (Player 1, Player 2, Player 3).
- **Atores:** Pesquisador.
- **Gatilho:** Interação do pesquisador com campos de entrada.
- **Pós-condição:** Os nomes dos jogadores são registrados pelo sistema.
- **Cenários de Erro:**
    - **ER1.1:** Se um nome de jogador não for fornecido, o sistema deve impedir o avanço e exibir uma mensagem de erro.

### FR3: Seleção da Sequência de Condições

- **Descrição:** A tela de configuração deve apresentar um dropdown (lista suspensa) com opções pré-definidas de sequências de condições para o pesquisador escolher.
- **Opções de Sequência (Exemplos):**
    - ADBDCD
    - ADCDBD
    - BDCDAD
    - BDADCD
    - CDBDAD
    - CDADBD
- **Atores:** Pesquisador.
- **Gatilho:** Interação do pesquisador com o dropdown.
- **Pós-condição:** A sequência de condições selecionada é registrada pelo sistema.

### FR4: Botão "Iniciar Jogo"

- **Descrição:** A tela de configuração deve conter um botão "Iniciar Jogo" que, ao ser clicado, valida as configurações e inicia o experimento.
- **Atores:** Pesquisador.
- **Gatilho:** Clique no botão "Iniciar Jogo".
- **Pré-condição:** Nomes dos jogadores preenchidos e sequência de condições selecionada.
- **Pós-condição:** As janelas do pesquisador e dos jogadores são abertas, e o jogo entra no estado "em andamento".
- **Cenários de Erro:**
    - **ER4.1:** Se as pré-condições não forem atendidas, o sistema deve impedir o início do jogo e exibir uma mensagem de erro informativa.

### FR5: Hero Visual com Imagem de Fundo

- **Descrição:** A tela de configuração deverá incluir uma imagem fixa de fundo posicionada atrás do card principal do título.
- **Atores:** Pesquisador.
- **Gatilho:** Carregamento da tela inicial.
- **Pós-condição:** O usuário visualiza uma composição com imagem de fundo e card frontal com transparência profissional suficiente para manter a legibilidade e ainda revelar a arte ao fundo.

### FR6: Botão "Instruções do Jogo"

- **Descrição:** O card principal da tela inicial deverá conter um botão dedicado para abrir as instruções do jogo.
- **Atores:** Pesquisador.
- **Gatilho:** Clique no botão "Instruções do Jogo".
- **Pós-condição:** Um modal visualmente refinado é aberto com explicação clara sobre objetivo, fluxo da jogada, pontuação, condições e papel do pesquisador.

### FR7: Modal de Instruções

- **Descrição:** O modal de instruções deverá explicar o funcionamento do jogo de forma organizada e elegante.
- **Conteúdo mínimo esperado:**
    - objetivo do experimento
    - configuração inicial
    - dinâmica de uma jogada com 3 turnos
    - regra de pontuação
    - definição de culturante
    - diferença entre as condições A, B, C e D
    - controles do pesquisador
- **Pós-condição:** O pesquisador consegue compreender o fluxo do experimento sem consultar documentação externa.

## 3. Requisitos Não Funcionais

- **NFR1: Usabilidade:** A tela de configuração deve ser intuitiva e fácil de usar para o pesquisador.
- **NFR2: Responsividade (se aplicável):** A interface deve se adaptar a diferentes tamanhos de tela (se for uma aplicação web ou híbrida).
- **NFR3: Confiabilidade:** As configurações inseridas devem ser persistidas corretamente para a sessão de jogo.
- **NFR4: Direção Visual:** A composição entre imagem de fundo e card translúcido deve transmitir aspecto profissional, científico e contemporâneo.
- **NFR5: Legibilidade:** O contraste entre texto, card e imagem deve preservar leitura confortável em desktop e notebook.

## 4. Dependências

- Nenhuma dependência externa para esta feature.

## 5. Critérios de Aceite (BDD)

### Cenário: Configuração Completa e Início do Jogo

- **Dado** que o aplicativo foi iniciado
- **E** o pesquisador está na tela de configuração
- **Quando** o pesquisador insere os nomes "João", "Maria" e "Pedro"
- **E** seleciona a sequência de condições "ADBDCD"
- **E** clica no botão "Iniciar Jogo"
- **Então** as janelas do painel do pesquisador e do tabuleiro dos jogadores devem ser abertas
- **E** o jogo deve estar no estado "em andamento"

### Cenário: Tentativa de Início do Jogo com Nomes Ausentes

- **Dado** que o aplicativo foi iniciado
- **E** o pesquisador está na tela de configuração
- **Quando** o pesquisador insere apenas o nome "João"
- **E** seleciona a sequência de condições "ADBDCD"
- **E** clica no botão "Iniciar Jogo"
- **Então** o jogo não deve iniciar
- **E** uma mensagem de erro informando sobre nomes ausentes deve ser exibida.

### Cenário: Abertura do Modal de Instruções

- **Dado** que o pesquisador está na tela inicial
- **Quando** ele clicar no botão "Instruções do Jogo"
- **Então** um modal deve ser exibido
- **E** o modal deve apresentar explicação organizada sobre o funcionamento do jogo
- **E** o fundo da tela deve permanecer visualmente contextualizado atrás do modal.
