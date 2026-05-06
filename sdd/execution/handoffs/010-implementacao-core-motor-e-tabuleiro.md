# Handoff 010: Detalhamento Planejado do Core (Motor e Tabuleiro)

## Data:
Fri May 01 2026

## Estado do Projeto:
- **Natureza deste registro**: Este handoff descreve a arquitetura e os comportamentos previstos para o core do jogo. Nao deve ser lido como implementacao concluida.
- **Motor de Jogadas Planejado**:
    - Servico dedicado para validacao de culturante, resposta da maquina e transicoes de condicao.
- **Tabuleiro 10x10 Planejado**:
    - Componente interativo com suporte a modo espelho para o pesquisador.
- **Fluxo de Jogo Pretendido**:
    - `PlayerPage.tsx`: Gerenciar turnos, pontuacao e feedbacks visuais.
    - `ResearcherPage.tsx`: Exibir espelho do tabuleiro, culturantes e controles de sessao.
- **Sincronização Prevista**: Compartilhamento de estado entre janelas via LocalStorage para o MVP local.

## Detalhes de Implementação:
- Transicao automatica de condicao (48/60 para A, B e C) definida como requisito de implementacao.
- Logica da **Condicao D** permanece especificada, mas ainda depende de implementacao e validacao pratica.
- Sistema de feedback visual segue como objetivo da proxima fase de desenvolvimento.

## Próximos Passos Recomendados:
1.  **Exportação de Dados (Feature 009)**: Finalizar o `ExportService` usando `exceljs` para gerar a planilha de 16 colunas.
2.  **Polimento Visual Final**: Ajustar detalhes de responsividade e animações conforme o Design System.
3.  **Testes de Condição D**: Realizar um teste real forçando a condição D para validar o gatilho de transição automática na jogada 25.

## Handoffs Absorvidos:
- Absorveu orientações do `Handoff 009`.
