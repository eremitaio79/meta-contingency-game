# PROJECT-INIT-LITE

> Versao enxuta para intake rapido de novos projetos.
>
> Use este arquivo quando voce precisar iniciar com velocidade, mas ainda quiser contexto suficiente para uma IA produzir uma primeira SPEC decente.
>
> Regra:
> - se o projeto crescer, migrar o conteudo para `PROJECT-INIT.md`
> - se houver ambiguidade critica, o lite nao substitui o briefing completo
>
> ---
>
> ## 1. Identificacao
>
> - Nome do projeto: Meta Contingency Game (Jogo de Metacontingência)
> - Codigo curto: MCG
> - Responsavel: A definir (Pesquisador)
> - Data: Fri May 01 2026
> - Status:
>   - Rascunho
>   - Em refinamento
>   - Aprovado para bootstrap
>
> ---
>
> ## 2. Resumo executivo
>
> - O que sera construido: Um jogo com interface gráfica para 3 jogadores e um pesquisador, simulando cenários de metacontingência em um estudo de psicologia.
> - Para quem: Pesquisadores de psicologia e participantes (jogadores) de experimentos.
> - Problema central: Desenvolver uma ferramenta interativa e controlada para estudar a metacontingência em tempo real, coletando dados precisos das escolhas e feedbacks.
> - Resultado esperado: Coleta de dados estruturados para análise psicológica e uma plataforma funcional para execução de experimentos.
>
> ---
>
> ## 3. Objetivo e escopo
>
> - Objetivo principal: Criar um jogo que permita a experimentação controlada de metacontingências com múltiplos jogadores e diferentes condições, registrando todas as interações e resultados para análise.
> - Objetivos secundarios: Fornecer feedback específico aos jogadores de acordo com as condições, exibir um painel de controle detalhado para o pesquisador e gerar relatórios de dados para análise posterior.
> - MVP obrigatorio:
>   - Jogo para 3 jogadores, com 5 condições (A, B, C, D) e um tabuleiro 10x10.
>   - Lógica de jogada: jogador escolhe linha, máquina escolhe coluna com bola específica (cheia/vazia).
>   - Sistema de pontuação individual para cada jogada (0.05/0.15).
>   - Implementação das 4 condições de feedback/culturante (A, B, C, D).
>   - Janela do pesquisador com painel de controle (pontuação, culturantes, espelho do tabuleiro, botões de controle).
>   - Janela dos jogadores com o tabuleiro interativo e feedbacks.
>   - Configuração inicial do jogo (nomes dos jogadores, sequência de condições).
>   - Geração de planilha de dados com todas as informações das jogadas.
> - Fora de escopo agora:
>   - Autenticação de usuários/pesquisadores.
>   - Armazenamento persistente de configurações de jogo (além da sessão atual).
>   - Personalização avançada de tabuleiro ou regras.
>   - Funcionalidades de rede para jogadores remotos (assumir jogadores na mesma máquina ou rede local simples).
>
> ---
>
> ## 4. Fluxos principais
>
> - Fluxo 1: Configuração e Início do Jogo
>   - Ator: Pesquisador
>   - Gatilho: Abrir o aplicativo e clicar em "Iniciar configuração".
>   - Resultado esperado: Pesquisador define nomes dos 3 jogadores e sequência de condições. Clica em "Iniciar jogo" e as janelas (pesquisador e jogadores) são abertas.
>
> - Fluxo 2: Execução de uma Jogada
>   - Ator: Jogador (aleatoriamente escolhido pela máquina) e Máquina
>   - Gatilho: É a vez de um jogador, ele clica em uma linha do tabuleiro.
>   - Resultado esperado: A máquina escolhe uma coluna na linha selecionada (baseado em bola cheia/vazia), calcula a pontuação, aplica a lógica de feedback da condição atual e atualiza as telas.
>
> - Fluxo 3: Acompanhamento e Controle do Pesquisador
>   - Ator: Pesquisador
>   - Gatilho: Jogo em andamento.
>   - Resultado esperado: Pesquisador visualiza pontuações, culturantes, espelho do tabuleiro e pode avançar condições ou encerrar o jogo.
>
> ---
>
> ## 5. Regras de negocio
>
> - Regra 1: Feedback de Culturante: Condições A e C exibem feedback para jogadores e pesquisador se 3 jogadores escolherem linha par de cor diferente. Condição B exibe feedback apenas para pesquisador. Condição D não exibe feedback para ninguém.
> - Regra 2: Escolha da Máquina: Se o jogador escolher linha par, a máquina escolhe coluna com bola vazia. Se escolher linha ímpar, a máquina escolhe coluna com bola cheia.
> - Regra 3: Transição de Condição (A, B, C): A condição avança se 48 culturantes forem atingidos em 60 jogadas OU se 100 jogadas forem completadas.
> - Regra 4: Transição de Condição (D): Após 25 jogadas, se os culturantes gerados forem 1/3 ou menos dos últimos 10 culturantes da condição anterior, a condição avança. Caso contrário, continua até 100 jogadas. A última condição D sempre completa 100 jogadas.
> - Regra 5: Pontuação: Bola vazia = R$0,05; Bola cheia = R$0,15.
> - Regra 6: Geração de Dados: Planilha Excel detalhando cada jogada por participante, incluindo número da jogada, nome do participante, linha/cor escolhida, valor recebido, condição, tipo de escolha (autocontrole/impulsivo) e se gerou culturante.
>
> ---
>
> ## 6. Dados e entidades
>
> - Entidade: Jogo
>   - Finalidade: Gerenciar o estado geral do experimento (condição atual, número de rodadas/jogadas, sequência de condições).
>   - Dados importantes: `id_jogo`, `condicao_atual`, `num_jogadas_rodada`, `num_culturantes_rodada`, `sequencia_condicoes`.
>   - Sensibilidade: Baixa.
>
> - Entidade: Jogador
>   - Finalidade: Representar cada participante do experimento.
>   - Dados importantes: `id_jogador`, `nome`, `pontuacao_total`, `ultima_pontuacao_recebida`.
>   - Sensibilidade: Média (nomes dos participantes).
>
> - Entidade: Tabuleiro
>   - Finalidade: Definir a estrutura visual e lógica do tabuleiro (matriz 10x10).
>   - Dados importantes: `linhas` (número, cor, tipo de bola inicial), `colunas` (nome, tipo de bola).
>   - Sensibilidade: Baixa.
>
> - Entidade: Jogada
>   - Finalidade: Registrar cada ação dos jogadores e da máquina.
>   - Dados importantes: `id_jogada`, `num_jogada`, `jogador_que_iniciou`, `escolhas_jogadores` (linha, cor), `escolhas_maquina` (coluna), `valores_recebidos`, `condicao_da_jogada`, `tipo_escolha` (par/impar), `gerou_culturante`.
>   - Sensibilidade: Média (dados detalhados de interação dos participantes).
>
> ---
>
> ## 7. Contexto tecnico inicial
>
> - Categoria do sistema:
>   - Multiagente / IA (pela escolha da máquina)
>   - Web App (duas janelas, potencial para web)
>   - Desktop App (alternativa para duas janelas)
> - Linguagem principal: JavaScript/TypeScript
> - Framework principal: React
> - Banco de dados: SQLite (para persistência do estado do jogo e dados de experimento, além de CSV/Excel para saída de dados)
> - Interface principal: Duas interfaces gráficas: Painel do Pesquisador e Tabuleiro dos Jogadores.
> - Provider de IA, se houver: N/A (lógica de IA simples, não externa)
>
> ---
>
> ## 8. Integracoes externas
>
> - Integracao: Geração de Planilha
>   - Tipo: Exportação de dados
>   - Finalidade: Salvar os dados do experimento em formato tabular (e.g., Excel/CSV).
>   - Obrigatoria no MVP?: Sim
>
> ---
>
> ## 9. Riscos e restricoes
>
> - Risco 1: Sincronização em Tempo Real: Garantir que as duas janelas (pesquisador e jogadores) estejam sempre sincronizadas com o estado atual do jogo.
> - Risco 2: Complexidade da Lógica de Condições: A lógica de transição e feedback das condições (especialmente D) é complexa e requer implementação cuidadosa e testes extensivos.
> - Restricao 1: Ambiente de Execução: O jogo deve funcionar em um ambiente onde duas janelas podem ser exibidas simultaneamente e interagir de forma eficiente.
> - Restricao 2: Aleatoriedade Controlada: As escolhas aleatórias da máquina (jogador inicial, coluna) devem ser justas e replicáveis para fins de pesquisa.
>
> ---
>
> ## 10. Criterios de sucesso
>
> - O que precisa funcionar para considerar o projeto utilizavel: O jogo deve iniciar, permitir que os jogadores façam escolhas, exibir feedbacks corretos, avançar entre as condições e gerar a planilha de dados com as informações esperadas.
> - Como saberemos que o MVP deu certo:
>   - O jogo pode ser configurado e iniciado sem erros.
>   - Os 3 jogadores conseguem interagir com o tabuleiro e as jogadas são processadas.
>   - O pesquisador consegue acompanhar o progresso e controlar o jogo.
>   - A planilha de dados gerada é precisa e completa, refletindo todas as jogadas.
> - O que seria falha de entrega:
>   - Falhas na lógica das condições ou na transição entre elas.
>   - Dessincronização entre as telas do pesquisador e dos jogadores.
>   - Erros na geração ou na integridade dos dados da planilha.
>   - Impossibilidade de configurar ou iniciar o jogo.
>
> ---
>
> ## 11. Pendencias em aberto
>
> - Pergunta 1: Tecnologia de interface definida como React (Web App).
> - Pergunta 2: Persistência de dados do experimento será tratada com SQLite.
> - Pendencia nao bloqueante: Definir bibliotecas para a geração da planilha em um ambiente React/Node.js.
>
> ---
>
> ## 12. Resumo canonico para IA
>
> Um jogo de simulação para estudo de metacontingência com 3 jogadores e um pesquisador. O objetivo é criar uma plataforma controlada para experimentos psicológicos, coletando dados de interação em tempo real. Os principais blocos são a interface de configuração, o painel do pesquisador, a tela de jogo interativa para jogadores, a lógica de condições e feedback, e a geração de relatórios de dados. Os riscos centrais envolvem a sincronização das interfaces e a complexidade das regras de transição de condições.
>
> ---
>
> ## 13. Checklist minimo
>
> - [x] O problema central esta claro.
> - [x] O objetivo principal esta claro.
> - [x] O MVP esta definido.
> - [x] Ha ao menos 3 regras de negocio conhecidas.
> - [x] Ha ao menos 3 fluxos principais descritos.
> - [x] O fora de escopo foi declarado.
> - [x] Os principais riscos foram registrados.
> - [ ] Existe base suficiente para gerar a primeira SPEC. (Será feita no próximo passo)
>
> ---
>
> ## Quando usar esta versao
>
> Use `PROJECT-INIT-lite.md` quando:
> - voce estiver fazendo descoberta inicial
> - precisar iniciar rapido
> - ainda nao houver detalhes suficientes para o briefing completo
>
> Use `PROJECT-INIT.md` quando:
> - houver multiplos atores ou fluxos complexos
> - existir integracao relevante
> - houver exigencia de seguranca, auditoria ou conformidade
> - o projeto ja tiver saido da fase de exploracao