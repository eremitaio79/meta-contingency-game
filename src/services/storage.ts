import { STORAGE_EVENT, STORAGE_KEY } from '../constants/game'
import { deleteSession, loadSessionRecord, persistSnapshot } from './sessionRepository'
import { deleteSqliteSession, loadSqliteSession, persistStateToSqlite } from './sqliteRepository'
import type { GameState } from '../types/game'

export function readGameState(): GameState | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as GameState
  } catch {
    return null
  }
}

export function writeGameState(nextState: GameState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT))
  void persistSnapshot(nextState)
  void persistStateToSqlite(nextState)
}

export function clearGameState() {
  window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT))
}

export function discardGameState() {
  const existingState = readGameState()
  clearGameState()
  if (existingState) {
    void deleteSession(existingState.sessionId)
    void deleteSqliteSession(existingState.sessionId)
  }
}

export async function restoreGameState(sessionId: string) {
  const sqliteSnapshot = await loadSqliteSession(sessionId)
  if (sqliteSnapshot) {
    writeGameState(sqliteSnapshot)
    return sqliteSnapshot
  }

  const sessionRecord = await loadSessionRecord(sessionId)
  if (!sessionRecord) {
    return null
  }

  writeGameState(sessionRecord.snapshot)
  return sessionRecord.snapshot
}
