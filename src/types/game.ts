export type ConditionLetter = 'A' | 'B' | 'C' | 'D'

export type BallType = 'FULL' | 'EMPTY'

export type GamePhase = 'CONFIG' | 'RUNNING' | 'FINISHED'

export type SyncState = 'IDLE' | 'PLAYER_TURN' | 'ANIMATING' | 'CHECKING_ROUND'

export interface Player {
  id: string
  name: string
  totalScore: number
  lastScore: number
}

export interface TurnRecord {
  playerId: string
  playerName: string
  line: number
  color: string
  column: string
  value: number
  ballType: BallType
  condition: ConditionLetter
  playNumber: number
  turnNumberWithinPlay: number
  timestamp: string
}

export interface PlaySummary {
  playNumber: number
  condition: ConditionLetter
  choices: TurnRecord[]
  isCulturant: boolean
  playerFeedback: string | null
  researcherFeedback: string | null
  transitionReason: string | null
}

export interface HighlightCell {
  line: number
  column: string
  playerName: string
}

export interface GameState {
  sessionId: string
  phase: GamePhase
  researcherName: string
  conditionSequence: ConditionLetter[]
  conditionIndex: number
  players: Player[]
  syncState: SyncState
  currentTurnOrder: string[]
  activeTurnIndex: number
  roundPlayCount: number
  totalPlayCount: number
  culturantCount: number
  currentChoices: TurnRecord[]
  history: PlaySummary[]
  lastCompletedPlay: PlaySummary | null
  boardHighlights: HighlightCell[]
  lastAction: TurnRecord | null
  feedbackOverlay: string | null
  researcherSignal: string | null
  previousConditionLast10Culturants: number
  createdAt: string
  updatedAt: string
  finishedAt: string | null
}

export interface SessionConfig {
  researcherName: string
  playerNames: string[]
  conditionSequence: string
}

export interface PersistedSessionRecord {
  id: string
  researcherName: string
  conditionSequence: string
  phase: GamePhase
  createdAt: string
  updatedAt: string
  finishedAt: string | null
  snapshot: GameState
}

export interface PersistedPlayRecord {
  id: string
  sessionId: string
  playNumber: number
  condition: ConditionLetter
  payload: PlaySummary
  createdAt: string
}
