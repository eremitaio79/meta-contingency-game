# Handoff 003: Detalhamento da Lógica de Condições (Foco em D)

## Data:
Fri May 01 2026

## Estado do Projeto:
- **Lógica de Condições**: Totalmente especificada em `sdd/specs/logica-de-condicoes/`.
- **Condição D**: Definida a lógica de transição na jogada 25 baseada em 1/3 do desempenho das últimas 10 jogadas da fase anterior.
- **Culturantes**: Critério de "3 linhas pares de cores diferentes" detalhado com mapeamento de cores oficial.

## Detalhes de Implementação:
- Criado o algoritmo de verificação de cores e paridade.
- Definida a query SQLite para buscar histórico de culturantes entre condições.
- Mapeado o comportamento de feedback para cada uma das 4 condições (A, B, C, D).

## Próximos Passos Recomendados:
1.  **Spec da Feature 003 (Motor de Jogadas)**: Detalhar como a máquina escolhe o jogador aleatório e como processa a escolha da coluna (bola cheia/vazia).
2.  **Spec de Exportação (Feature 009)**: Detalhar o mapeamento exato das 16 colunas do Excel.
3.  **Bootstrap Técnico**: Já temos especificações suficientes para as funcionalidades mais complexas (Configuração e Lógica de Transição). Podemos iniciar a implementação da base React.

## Handoffs Absorvidos:
- Absorveu orientações do `Handoff 002`.
