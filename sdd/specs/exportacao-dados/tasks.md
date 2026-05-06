# Tarefas: Exportação de Dados

## Milestone: m4-data-export

### T1: Infraestrutura de Exportação
- [ ] Instalar bibliotecas necessárias (`exceljs`).
- [ ] Criar classe `ExcelGenerator` com método para criar cabeçalho padrão.

### T2: Mapeamento e Transformação
- [ ] Implementar lógica de agrupamento (3 turnos -> 1 linha de Excel).
- [ ] Criar função de classificação "Autocontrole / Impulsivo" baseada na paridade da linha.
- [ ] Mapear as 16 colunas conforme o requisito oficial.

### T3: Interface e Feedback
- [ ] Adicionar botão "Processar Dados" no Painel do Pesquisador.
- [ ] Implementar feedback visual (Spinner de carregamento e Toast de sucesso).
- [ ] Implementar lógica de nomeação dinâmica do arquivo.

### T4: Validação e Testes
- [ ] Testar exportação com 0 jogadas (deve gerar apenas cabeçalho ou dar erro amigável).
- [ ] Testar exportação com 100+ jogadas e validar se o agrupamento de participantes está correto.
- [ ] Validar abertura do arquivo gerado no Microsoft Excel e Google Sheets.
