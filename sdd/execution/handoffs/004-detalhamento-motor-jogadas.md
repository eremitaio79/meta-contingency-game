# Handoff 004: Detalhamento do Motor de Jogadas

## Data:
Fri May 01 2026

## Estado do Projeto:
- **Motor de Jogadas (Feat 003)**: Totalmente especificado em `sdd/specs/motor-jogadas/`.
- **Mecânica de Sorteio**: Definida a regra de paridade (Linha Par -> Bola Vazia | Linha Ímpar -> Bola Cheia) e o conjunto de colunas candidatas {A, C, E, G, I}.
- **Fluxo de Turnos**: Detalhada a alternância entre os 3 jogadores e a ordem aleatória de início.

## Detalhes de Implementação:
- Mapeamento visual do tabuleiro 10x10 com bolas alternadas.
- Estrutura de estado para sincronização entre janelas via LocalStorage.
- Atribuição de valores (R$ 0,05 e R$ 0,15) integrada ao motor.

## Próximos Passos Recomendados:
1.  **Spec de Exportação (Feature 009)**: Detalhar o mapeamento exato das 16 colunas do Excel para garantir que o pesquisador tenha os dados corretos.
2.  **Design de UI (Picasso)**: Iniciar o mockup visual das duas telas (Painel do Pesquisador vs Tabuleiro).
3.  **Bootstrap Técnico**: Com as SPECs de Configuração, Condições e Motor de Jogadas prontas, o core logico do sistema está 100% definido.

## Handoffs Absorvidos:
- Absorveu orientações do `Handoff 003`.
