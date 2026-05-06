# Design Técnico: Exportação de Dados

## 1. Estratégia de Implementação

A geração do arquivo será feita no lado do cliente (Frontend) ou via backend local, utilizando a biblioteca **ExcelJS**.

### Fluxo de Dados
1.  O Pesquisador clica em "Processar Dados".
2.  O sistema executa uma query `SELECT * FROM plays ORDER BY id ASC` no SQLite.
3.  O serviço `ExportService` transforma os dados brutos (que podem estar em formato "um por linha" no banco) para o formato "um por jogada" exigido pela planilha (mapeamento horizontal).
4.  O buffer do Excel é gerado e oferecido para download ou salvo em uma pasta de resultados.

## 2. Transformação de Dados (Mapping)

O banco de dados armazena cada turno individual. O exportador deve agrupar cada 3 turnos em uma única linha da planilha.

```typescript
function mapPlaysToExcelRows(allPlays: PlayDBRecord[]) {
  // Agrupa jogadas pelo ID da Jogada (que contém 3 participações)
  const grouped = groupBy(allPlays, 'jogada_id');
  
  return Object.values(grouped).map(group => {
    return {
      num_jogada: group[0].play_number,
      p1_name: group[0].player_name,
      p1_line: group[0].line,
      p1_color: group[0].color,
      p1_value: group[0].value,
      // ... repete para p2 e p3
      condicao: group[0].condition,
      escolha: group.map(p => p.line % 2 === 0 ? 'Autocontrole' : 'Impulsivo').join(', '),
      culturante: group[0].is_culturant ? 'Sim' : 'Não'
    };
  });
}
```

## 3. Biblioteca Sugerida: ExcelJS

- **Motivo**: Permite formatação rica (negrito, cores de células) e é robusta para grandes volumes de dados.
- **Formatação**:
    - Header: Fundo cinza claro, Fonte Negrito.
    - Colunas de Valor: Formatar como Moeda (BRL).
    - Colunas de Cor: (Opcional) Colorir a célula com a cor correspondente à escolha do jogador para facilitar auditoria visual.

## 4. Local de Armazenamento

Os arquivos gerados serão salvos em uma pasta local configurável (ex: `~/Documents/MCG_Results/`) para evitar perda de dados e facilitar o acesso do pesquisador sem depender de downloads do navegador.

## 5. Riscos e Mitigações

- **Dados Incompletos**: O botão de exportação deve verificar se existe alguma jogada em "estado pendente" (turno 1 ou 2 concluído mas turno 3 não) e alertar o pesquisador.
- **Corrupção de Arquivo**: Utilizar blocos `try/catch` robustos e garantir que o stream do Excel seja fechado corretamente.
