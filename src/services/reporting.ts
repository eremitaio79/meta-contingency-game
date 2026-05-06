import type { GameState, PersistedSessionRecord, PlaySummary } from '../types/game'

export function classifyChoice(line: number) {
  return line % 2 === 0 ? 'AUTOCONTROLE' : 'IMPULSIVO'
}

export interface ExportRow {
  playNumber: number
  player1: string
  line1: number
  color1: string
  value1: number
  player2: string
  line2: number
  color2: string
  value2: number
  player3: string
  line3: number
  color3: string
  value3: number
  condition: string
  choiceProfile: string
  isCulturant: string
}

export function mapPlayToExportRow(play: PlaySummary): ExportRow | null {
  const [first, second, third] = play.choices
  if (!first || !second || !third) {
    return null
  }

  return {
    playNumber: play.playNumber,
    player1: first.playerName,
    line1: first.line,
    color1: first.color,
    value1: first.value,
    player2: second.playerName,
    line2: second.line,
    color2: second.color,
    value2: second.value,
    player3: third.playerName,
    line3: third.line,
    color3: third.color,
    value3: third.value,
    condition: play.condition,
    choiceProfile: play.choices.map((choice) => classifyChoice(choice.line)).join(', '),
    isCulturant: play.isCulturant ? 'Sim' : 'Não',
  }
}

export function mapPlaysToExportRows(plays: PlaySummary[]) {
  return plays
    .map(mapPlayToExportRow)
    .filter((row): row is ExportRow => row !== null)
}

export function calculateResultsSummary(state: GameState) {
  const totalPlays = state.history.length
  const totalCulturants = state.history.filter((play) => play.isCulturant).length
  const totalScore = state.players.reduce((sum, player) => sum + player.totalScore, 0)

  return {
    totalPlays,
    totalCulturants,
    totalScore,
  }
}

export function summarizeSessionRecord(session: PersistedSessionRecord) {
  const snapshot = session.snapshot

  return {
    totalPlays: snapshot.history.length,
    totalCulturants: snapshot.history.filter((play) => play.isCulturant).length,
    phaseLabel:
      snapshot.phase === 'RUNNING'
        ? 'Em andamento'
        : snapshot.phase === 'FINISHED'
          ? 'Concluída'
          : 'Configuração',
    currentCondition: snapshot.conditionSequence[snapshot.conditionIndex] ?? '-',
  }
}
