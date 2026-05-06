import {
  CANDIDATE_COLUMNS,
  LINE_COLORS,
  PLAYER_FEEDBACK,
  RESEARCHER_SIGNAL_BY_CONDITION,
} from '../constants/game'
import type {
  BallType,
  ConditionLetter,
  GameState,
  HighlightCell,
  PlaySummary,
  Player,
  SessionConfig,
  TurnRecord,
} from '../types/game'

function shuffle<T>(items: T[]) {
  const clone = [...items]

  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]]
  }

  return clone
}

function createPlayers(names: string[]): Player[] {
  return names.map((name, index) => ({
    id: `player-${index + 1}`,
    name,
    totalScore: 0,
    lastScore: 0,
  }))
}

function currentTimestamp() {
  return new Date().toISOString()
}

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `session-${Date.now()}`
}

function getCurrentCondition(state: GameState): ConditionLetter {
  return state.conditionSequence[state.conditionIndex]
}

export function getLineColor(line: number) {
  return LINE_COLORS[line]
}

export function getBallType(line: number, column: string): BallType {
  const columnIndex = column.charCodeAt(0) - 64
  return (line + columnIndex) % 2 === 0 ? 'FULL' : 'EMPTY'
}

export function getMachineResponse(line: number) {
  const column = CANDIDATE_COLUMNS[Math.floor(Math.random() * CANDIDATE_COLUMNS.length)]
  const value = line % 2 === 0 ? 0.05 : 0.15

  return {
    column,
    value,
    ballType: getBallType(line, column),
  }
}

export function checkCulturant(choices: TurnRecord[]) {
  if (choices.length !== 3) {
    return false
  }

  const allEven = choices.every((choice) => choice.line % 2 === 0)
  if (!allEven) {
    return false
  }

  const uniqueColors = new Set(choices.map((choice) => choice.color))
  return uniqueColors.size === 3
}

function countLast10CulturantsForCondition(history: PlaySummary[], condition: ConditionLetter) {
  const filtered = history.filter((play) => play.condition === condition).slice(-10)
  return filtered.reduce((total, play) => total + (play.isCulturant ? 1 : 0), 0)
}

function buildHighlights(choices: TurnRecord[]): HighlightCell[] {
  return choices.map((choice) => ({
    line: choice.line,
    column: choice.column,
    playerName: choice.playerName,
  }))
}

function buildFeedback(condition: ConditionLetter, isCulturant: boolean) {
  const playerFeedback = isCulturant
    ? PLAYER_FEEDBACK[condition].positive
    : PLAYER_FEEDBACK[condition].negative

  const researcherFeedback = isCulturant ? RESEARCHER_SIGNAL_BY_CONDITION[condition] : null

  return {
    playerFeedback,
    researcherFeedback,
  }
}

function createNextTurnOrder(players: Player[]) {
  return shuffle(players.map((player) => player.id))
}

export function createInitialGameState(config: SessionConfig): GameState {
  const players = createPlayers(config.playerNames)
  const now = currentTimestamp()

  return {
    sessionId: createSessionId(),
    phase: 'RUNNING',
    researcherName: config.researcherName,
    conditionSequence: config.conditionSequence.split('') as ConditionLetter[],
    conditionIndex: 0,
    players,
    syncState: 'PLAYER_TURN',
    currentTurnOrder: createNextTurnOrder(players),
    activeTurnIndex: 0,
    roundPlayCount: 0,
    totalPlayCount: 0,
    culturantCount: 0,
    currentChoices: [],
    history: [],
    lastCompletedPlay: null,
    boardHighlights: [],
    lastAction: null,
    feedbackOverlay: null,
    researcherSignal: null,
    previousConditionLast10Culturants: 0,
    createdAt: now,
    updatedAt: now,
    finishedAt: null,
  }
}

function transitionToNextCondition(
  state: GameState,
  history: PlaySummary[],
  players: Player[],
  boardHighlights: HighlightCell[],
  feedbackOverlay: string | null,
  researcherSignal: string | null,
  lastAction: TurnRecord,
  lastCompletedPlay: PlaySummary,
  transitionReason: string,
) {
  const isLastCondition = state.conditionIndex >= state.conditionSequence.length - 1
  const currentCondition = getCurrentCondition(state)

  if (isLastCondition) {
    return {
      ...state,
      phase: 'FINISHED' as const,
      syncState: 'IDLE' as const,
      history,
      players,
      boardHighlights,
      feedbackOverlay,
      researcherSignal,
      lastAction,
      lastCompletedPlay: {
        ...lastCompletedPlay,
        transitionReason,
      },
      currentChoices: [],
      activeTurnIndex: 0,
      updatedAt: currentTimestamp(),
      finishedAt: currentTimestamp(),
    }
  }

  return {
    ...state,
    conditionIndex: state.conditionIndex + 1,
    roundPlayCount: 0,
    culturantCount: 0,
    currentChoices: [],
    currentTurnOrder: createNextTurnOrder(players),
    activeTurnIndex: 0,
    syncState: 'PLAYER_TURN' as const,
    history,
    players,
    boardHighlights,
    feedbackOverlay,
    researcherSignal,
    lastAction,
    lastCompletedPlay: {
      ...lastCompletedPlay,
      transitionReason,
    },
    previousConditionLast10Culturants: countLast10CulturantsForCondition(history, currentCondition),
    updatedAt: currentTimestamp(),
  }
}

function shouldAdvanceCondition(
  condition: ConditionLetter,
  roundPlayCount: number,
  culturantCount: number,
  previousConditionLast10Culturants: number,
  isLastCondition: boolean,
) {
  if (condition === 'D') {
    if (isLastCondition && roundPlayCount >= 100) {
      return 'Condição D final concluída após 100 jogadas.'
    }

    if (!isLastCondition && roundPlayCount === 25) {
      const threshold = previousConditionLast10Culturants / 3
      if (culturantCount <= threshold) {
        return `Transição antecipada da condição D na jogada 25 (meta <= ${threshold.toFixed(2)}).`
      }
    }

    if (!isLastCondition && roundPlayCount >= 100) {
      return 'Condição D avançou ao atingir 100 jogadas.'
    }

    return null
  }

  if (roundPlayCount <= 60 && culturantCount >= 48) {
    return `Condição ${condition} avançou ao atingir 48 culturantes dentro de 60 jogadas.`
  }

  if (roundPlayCount >= 100) {
    return `Condição ${condition} avançou ao atingir 100 jogadas.`
  }

  return null
}

export function processPlayerTurn(state: GameState, selectedLine: number): GameState {
  if (state.phase !== 'RUNNING') {
    return state
  }

  const condition = getCurrentCondition(state)
  const activePlayerId = state.currentTurnOrder[state.activeTurnIndex]
  const activePlayer = state.players.find((player) => player.id === activePlayerId)

  if (!activePlayer) {
    return state
  }

  const machineResponse = getMachineResponse(selectedLine)
  const timestamp = currentTimestamp()
  const currentChoices = state.activeTurnIndex === 0 ? [] : state.currentChoices

  const turnRecord: TurnRecord = {
    playerId: activePlayer.id,
    playerName: activePlayer.name,
    line: selectedLine,
    color: getLineColor(selectedLine),
    column: machineResponse.column,
    value: machineResponse.value,
    ballType: machineResponse.ballType,
    condition,
    playNumber: state.roundPlayCount + 1,
    turnNumberWithinPlay: currentChoices.length + 1,
    timestamp,
  }

  const updatedPlayers = state.players.map((player) =>
    player.id === activePlayer.id
      ? {
          ...player,
          totalScore: Number((player.totalScore + machineResponse.value).toFixed(2)),
          lastScore: machineResponse.value,
        }
      : player,
  )

  const updatedChoices = [...currentChoices, turnRecord]

  if (updatedChoices.length < 3) {
    return {
      ...state,
      players: updatedPlayers,
      currentChoices: updatedChoices,
      boardHighlights: buildHighlights(updatedChoices),
      lastAction: turnRecord,
      activeTurnIndex: state.activeTurnIndex + 1,
      syncState: 'PLAYER_TURN',
      feedbackOverlay: null,
      researcherSignal: null,
      updatedAt: timestamp,
    }
  }

  const isCulturant = checkCulturant(updatedChoices)
  const nextRoundPlayCount = state.roundPlayCount + 1
  const nextCulturantCount = state.culturantCount + (isCulturant ? 1 : 0)
  const feedback = buildFeedback(condition, isCulturant)
  const playSummary: PlaySummary = {
    playNumber: nextRoundPlayCount,
    condition,
    choices: updatedChoices,
    isCulturant,
    playerFeedback: feedback.playerFeedback,
    researcherFeedback: feedback.researcherFeedback,
    transitionReason: null,
  }

  const history = [...state.history, playSummary]
  const boardHighlights = buildHighlights(updatedChoices)
  const transitionReason = shouldAdvanceCondition(
    condition,
    nextRoundPlayCount,
    nextCulturantCount,
    state.previousConditionLast10Culturants,
    state.conditionIndex >= state.conditionSequence.length - 1,
  )

  if (transitionReason) {
    return transitionToNextCondition(
      {
        ...state,
        roundPlayCount: nextRoundPlayCount,
        totalPlayCount: state.totalPlayCount + 1,
        culturantCount: nextCulturantCount,
      },
      history,
      updatedPlayers,
      boardHighlights,
      feedback.playerFeedback,
      feedback.researcherFeedback,
      turnRecord,
      playSummary,
      transitionReason,
    )
  }

  return {
    ...state,
    players: updatedPlayers,
    roundPlayCount: nextRoundPlayCount,
    totalPlayCount: state.totalPlayCount + 1,
    culturantCount: nextCulturantCount,
    currentChoices: [],
    currentTurnOrder: createNextTurnOrder(updatedPlayers),
    activeTurnIndex: 0,
    syncState: 'PLAYER_TURN',
    history,
    lastCompletedPlay: playSummary,
    boardHighlights: [],
    lastAction: turnRecord,
    feedbackOverlay: feedback.playerFeedback,
    researcherSignal: feedback.researcherFeedback,
    updatedAt: timestamp,
  }
}

export function advanceCondition(state: GameState): GameState {
  if (state.phase !== 'RUNNING') {
    return state
  }

  const reason = 'Transição manual acionada pelo pesquisador.'

  return transitionToNextCondition(
    state,
    state.history,
    state.players,
    state.boardHighlights,
    null,
    null,
    state.lastAction ??
      ({
        playerId: 'system',
        playerName: 'Sistema',
        line: 0,
        color: 'N/A',
        column: 'N/A',
        value: 0,
        ballType: 'EMPTY',
        condition: getCurrentCondition(state),
        playNumber: state.roundPlayCount,
        turnNumberWithinPlay: 0,
        timestamp: currentTimestamp(),
      } as TurnRecord),
    state.lastCompletedPlay ?? {
      playNumber: state.roundPlayCount,
      condition: getCurrentCondition(state),
      choices: [],
      isCulturant: false,
      playerFeedback: null,
      researcherFeedback: null,
      transitionReason: null,
    },
    reason,
  )
}

export function finishGame(state: GameState): GameState {
  return {
    ...state,
    phase: 'FINISHED',
    syncState: 'IDLE',
    feedbackOverlay: 'Experimento encerrado pelo pesquisador.',
    researcherSignal: null,
    updatedAt: currentTimestamp(),
    finishedAt: currentTimestamp(),
  }
}

export function getActivePlayer(state: GameState) {
  const activeId = state.currentTurnOrder[state.activeTurnIndex]
  return state.players.find((player) => player.id === activeId) ?? null
}

export function getCurrentConditionLabel(state: GameState) {
  return getCurrentCondition(state)
}
