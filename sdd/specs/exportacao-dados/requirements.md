# Requisitos da Feature: Exportação de Dados (Excel)

## 1. Visão Geral

O sistema deve permitir que o pesquisador exporte todos os dados coletados durante o experimento para uma planilha Excel (.xlsx). Este arquivo é a base para a análise científica da pesquisa de metacontingência.

## 2. Momento da Exportação

- A exportação é disparada manualmente pelo pesquisador através do botão **"Processar Dados"** no Painel de Controle.
- Pode ser feita a qualquer momento (durante o jogo ou após o encerramento).

## 3. Estrutura da Planilha (Mapeamento de Colunas)

A planilha deve conter uma linha de cabeçalho e uma linha para cada **Jogada** (conjunto de 3 turnos).

| Coluna | Título | Descrição / Regra |
| :--- | :--- | :--- |
| **1** | Número da Jogada | Contador sequencial (1, 2, 3...) |
| **2** | Participante 1 | Nome do primeiro jogador a jogar no ciclo |
| **3** | Linha Escolhida 1 | Número da linha (1-10) escolhida pelo P1 |
| **4** | Cor Escolhida 1 | Cor da linha escolhida pelo P1 |
| **5** | Valor Recebido 1 | R$ 0,05 ou R$ 0,15 |
| **6** | Participante 2 | Nome do segundo jogador a jogar no ciclo |
| **7** | Linha Escolhida 2 | Número da linha (1-10) escolhida pelo P2 |
| **8** | Cor Escolhida 2 | Cor da linha escolhida pelo P2 |
| **9** | Valor Recebido 2 | R$ 0,05 ou R$ 0,15 |
| **10** | Participante 3 | Nome do terceiro jogador a jogar no ciclo |
| **11** | Linha Escolhida 3 | Número da linha (1-10) escolhida pelo P3 |
| **12** | Cor Escolhida 3 | Cor da linha escolhida pelo P3 |
| **13** | Valor Recebido 3 | R$ 0,05 ou R$ 0,15 |
| **14** | Condição | Letra da condição atual (A, B, C ou D) |
| **15** | Escolha | Classificação da jogada (ver regra abaixo) |
| **16** | Culturante | "Sim" se gerou culturante, "Não" caso contrário |

### Regra da Coluna 15 (Escolha)
A coluna "Escolha" classifica a tendência da jogada. Como a jogada envolve 3 escolhas individuais, o sistema registrará a classificação de cada um separada por vírgula (ex: "Autocontrole, Impulsivo, Autocontrole") seguindo a regra:
- **Linha Par**: "Autocontrole"
- **Linha Ímpar**: "Impulsivo"

## 4. Requisitos Funcionais

- **FR1: Geração de Arquivo**: O sistema deve gerar um arquivo válido no formato `.xlsx`.
- **FR2: Nome do Arquivo**: O nome padrão deve ser `MCG_Resultados_[NOME_DO_PESQUISADOR]_[DATA].xlsx`.
- **FR3: Dados de Sessão**: A planilha deve incluir todas as jogadas registradas no SQLite para a sessão atual.

## 5. Requisitos Não Funcionais

- **NFR1: Integridade**: Nenhuma jogada concluída pode ser omitida da exportação.
- **NFR2: Performance**: A exportação de uma sessão de 500 jogadas deve levar menos de 5 segundos.
- **NFR3: Formatação**: O cabeçalho deve estar em negrito para facilitar a leitura.

## 6. Critérios de Aceite (BDD)

### Cenário: Exportação de uma Jogada com Culturante
- **Dado** que a jogada 1 teve:
    - P1: João, Linha 2 (Verde), R$ 0,05
    - P2: Maria, Linha 4 (Azul), R$ 0,05
    - P3: Pedro, Linha 6 (Amarelo), R$ 0,05
    - Condição: A
- **Quando** o pesquisador clica em "Processar Dados"
- **Então** o arquivo Excel gerado deve ter na primeira linha de dados:
    - Col 15: "Autocontrole, Autocontrole, Autocontrole"
    - Col 16: "Sim"
