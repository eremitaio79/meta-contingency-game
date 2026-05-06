# Visão Geral do Projeto: Meta Contingency Game (MCG)

O "Meta Contingency Game" (MCG) é uma aplicação desenvolvida para fins de pesquisa em psicologia, especificamente para o estudo de metacontingências. O jogo simula um ambiente controlado onde três jogadores interagem com um tabuleiro, e suas escolhas, em conjunto, geram resultados que são observados por um pesquisador.

## Objetivos Principais

- **Experimentação Controlada:** Fornecer uma plataforma interativa para a realização de experimentos sobre metacontingência com múltiplas condições e regras de feedback.
- **Coleta de Dados:** Registrar de forma detalhada todas as interações dos jogadores e os resultados gerados, permitindo a análise precisa dos padrões comportamentais.
- **Interface Dupla:** Oferecer uma interface de controle completa para o pesquisador e uma interface de jogo clara para os participantes.

## Componentes Essenciais

1.  **Configuração Inicial:** O pesquisador define os nomes dos jogadores e a sequência de condições do experimento.
2.  **Tabuleiro:** Uma matriz 10x10 com linhas numeradas (cores alternadas) e colunas nomeadas, contendo bolas cheias ou vazias em posições específicas.
3.  **Lógica de Jogo:** Os jogadores escolhem linhas; a máquina responde com colunas baseadas no tipo de linha e bola. A pontuação é atribuída por bola (cheia/vazia).
4.  **Condições (A, B, C, D):** Quatro (na verdade cinco, mas uma delas é a D final) conjuntos de regras que determinam os feedbacks para os jogadores e/ou pesquisador, e critérios de transição entre as condições.
5.  **Painel do Pesquisador:** Uma janela principal que exibe pontuações individuais, contagem de culturantes (feedbacks positivos), um espelho do tabuleiro dos jogadores, e botões para controle do fluxo do jogo.
6.  **Tela dos Jogadores:** Uma janela secundária que exibe o tabuleiro interativo e os feedbacks visuais, dependendo da condição atual.
7.  **Geração de Relatórios:** Exportação dos dados de todas as jogadas para uma planilha, com informações detalhadas para cada participante.

## Fluxo de Interação

- **Pesquisador:** Inicia a configuração, acompanha o experimento, avança condições e encerra o jogo. Também é responsável por processar os dados finais.
- **Jogadores:** Em turnos aleatórios, escolhem uma linha do tabuleiro, recebem feedback visual (em algumas condições) e acumulam pontuação.