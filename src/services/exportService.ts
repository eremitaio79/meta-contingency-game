import { listSessionPlays } from './sessionRepository'
import { mapPlaysToExportRows } from './reporting'
import { listSqlitePlays } from './sqliteRepository'
import type { GameState } from '../types/game'

export async function exportGameSession(state: GameState) {
  const [{ default: ExcelJS }, sqlitePlays, persistedPlays] = await Promise.all([
    import('exceljs'),
    listSqlitePlays(state.sessionId),
    listSessionPlays(state.sessionId),
  ])
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Jogadas')
  const plays =
    sqlitePlays.length > 0
      ? sqlitePlays.map((record) => record.payload)
      : persistedPlays.length > 0
        ? persistedPlays.map((record) => record.payload)
        : state.history
  const rows = mapPlaysToExportRows(plays)

  sheet.columns = [
    { header: 'Número da Jogada', key: 'playNumber', width: 16 },
    { header: 'Participante 1', key: 'player1', width: 18 },
    { header: 'Linha Escolhida 1', key: 'line1', width: 16 },
    { header: 'Cor Escolhida 1', key: 'color1', width: 16 },
    { header: 'Valor Recebido 1', key: 'value1', width: 16 },
    { header: 'Participante 2', key: 'player2', width: 18 },
    { header: 'Linha Escolhida 2', key: 'line2', width: 16 },
    { header: 'Cor Escolhida 2', key: 'color2', width: 16 },
    { header: 'Valor Recebido 2', key: 'value2', width: 16 },
    { header: 'Participante 3', key: 'player3', width: 18 },
    { header: 'Linha Escolhida 3', key: 'line3', width: 16 },
    { header: 'Cor Escolhida 3', key: 'color3', width: 16 },
    { header: 'Valor Recebido 3', key: 'value3', width: 16 },
    { header: 'Condição', key: 'condition', width: 10 },
    { header: 'Escolha', key: 'choiceProfile', width: 36 },
    { header: 'Culturante', key: 'isCulturant', width: 14 },
  ]

  rows.forEach((row) => sheet.addRow(row))

  sheet.getRow(1).font = { bold: true }
  sheet.views = [{ state: 'frozen', ySplit: 1 }]
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE8E8E8' },
  }

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  const safeResearcherName = (state.researcherName || 'Pesquisador').replace(/\s+/g, '_')
  const dateStamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
  anchor.download = `MCG_Resultados_${safeResearcherName}_${dateStamp}.xlsx`
  anchor.click()
  URL.revokeObjectURL(url)
}
