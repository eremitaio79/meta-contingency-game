import type { ConditionLetter } from '../types/game'

export const STORAGE_KEY = 'mcg_game_state'

export const STORAGE_EVENT = 'mcg:game-state-updated'

export const DB_NAME = 'mcg-lab-db'

export const DB_VERSION = 2

export const SESSIONS_STORE = 'sessions'

export const PLAYS_STORE = 'plays'

export const SQLITE_BINARY_STORE = 'sqlite-binaries'

export const SQLITE_BINARY_KEY = 'mcg-main-db'

export const CONDITION_SEQUENCES = [
  'ADBDCD',
  'ADCDBD',
  'BDCDAD',
  'BDADCD',
  'CDBDAD',
  'CDADBD',
]

export const LINE_COLORS: Record<number, string> = {
  1: 'Amarelo',
  2: 'Verde',
  3: 'Vermelho',
  4: 'Azul',
  5: 'Rosa',
  6: 'Amarelo',
  7: 'Verde',
  8: 'Vermelho',
  9: 'Azul',
  10: 'Rosa',
}

export const LINE_COLOR_HEX: Record<number, string> = {
  1: '#f4c542',
  2: '#2f9e44',
  3: '#e03131',
  4: '#1c7ed6',
  5: '#d63384',
  6: '#f4c542',
  7: '#2f9e44',
  8: '#e03131',
  9: '#1c7ed6',
  10: '#d63384',
}

export const BOARD_COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export const CANDIDATE_COLUMNS = ['A', 'C', 'E', 'G', 'I']

export const PLAYER_FEEDBACK: Record<ConditionLetter, { positive: string | null; negative: string | null }> = {
  A: {
    positive: 'Parabéns! Vocês se saíram bem desta vez.',
    negative: 'Isso não foi bom! Vocês não se saíram bem desta vez.',
  },
  B: {
    positive: null,
    negative: null,
  },
  C: {
    positive: 'Parabéns! Vocês se saíram bem desta vez.',
    negative: 'Isso não foi bom! Vocês não se saíram bem desta vez.',
  },
  D: {
    positive: null,
    negative: null,
  },
}

export const RESEARCHER_SIGNAL_BY_CONDITION: Record<ConditionLetter, string | null> = {
  A: 'X de culturante registrado para a condição A.',
  B: 'X de culturante registrado para a condição B.',
  C: null,
  D: null,
}
