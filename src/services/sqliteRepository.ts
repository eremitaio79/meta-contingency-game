import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import initSqlJs from 'sql.js'

import {
  DB_NAME,
  DB_VERSION,
  SQLITE_BINARY_KEY,
  SQLITE_BINARY_STORE,
} from '../constants/game'
import type { GameState, PersistedPlayRecord, PersistedSessionRecord, PlaySummary } from '../types/game'

type SqlDatabase = InstanceType<Awaited<ReturnType<typeof initSqlJs>>['Database']>

let sqliteDbPromise: Promise<SqlDatabase> | null = null
let sqliteWriteQueue = Promise.resolve()

function hasIndexedDb() {
  return typeof indexedDB !== 'undefined'
}

function openMetadataDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(SQLITE_BINARY_STORE)) {
        database.createObjectStore(SQLITE_BINARY_STORE, { keyPath: 'id' })
      }
    }
  })
}

async function readBinary() {
  if (!hasIndexedDb()) {
    return null
  }

  const database = await openMetadataDatabase()

  return new Promise<Uint8Array | null>((resolve, reject) => {
    const transaction = database.transaction(SQLITE_BINARY_STORE, 'readonly')
    const store = transaction.objectStore(SQLITE_BINARY_STORE)
    const request = store.get(SQLITE_BINARY_KEY)

    request.onsuccess = () => {
      database.close()
      const payload = request.result as { id: string; bytes: Uint8Array } | undefined
      resolve(payload?.bytes ?? null)
    }
    request.onerror = () => {
      database.close()
      reject(request.error)
    }
  })
}

async function writeBinary(bytes: Uint8Array) {
  if (!hasIndexedDb()) {
    return
  }

  const database = await openMetadataDatabase()

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(SQLITE_BINARY_STORE, 'readwrite')
    const store = transaction.objectStore(SQLITE_BINARY_STORE)
    store.put({ id: SQLITE_BINARY_KEY, bytes })

    transaction.oncomplete = () => {
      database.close()
      resolve()
    }
    transaction.onerror = () => {
      database.close()
      reject(transaction.error)
    }
  })
}

function ensureSchema(database: SqlDatabase) {
  database.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      researcher_name TEXT NOT NULL,
      condition_sequence TEXT NOT NULL,
      phase TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      finished_at TEXT,
      snapshot_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS plays (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      play_number INTEGER NOT NULL,
      condition_letter TEXT NOT NULL,
      created_at TEXT NOT NULL,
      payload_json TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_plays_session_number
      ON plays(session_id, play_number);
  `)
}

async function getDatabase() {
  if (!sqliteDbPromise) {
    sqliteDbPromise = (async () => {
      const SQL = await initSqlJs({
        locateFile: () => wasmUrl,
      })
      const binary = await readBinary()
      const database = binary ? new SQL.Database(binary) : new SQL.Database()
      ensureSchema(database)
      return database
    })()
  }

  return sqliteDbPromise
}

function persistSqliteBytes(database: SqlDatabase) {
  const binary = database.export()
  return writeBinary(binary)
}

function sessionRecordFromState(state: GameState): PersistedSessionRecord {
  return {
    id: state.sessionId,
    researcherName: state.researcherName,
    conditionSequence: state.conditionSequence.join(''),
    phase: state.phase,
    createdAt: state.createdAt,
    updatedAt: state.updatedAt,
    finishedAt: state.finishedAt,
    snapshot: state,
  }
}

function playRecordFromSummary(sessionId: string, play: PlaySummary, fallbackCreatedAt: string): PersistedPlayRecord {
  return {
    id: `${sessionId}-${play.playNumber}`,
    sessionId,
    playNumber: play.playNumber,
    condition: play.condition,
    payload: play,
    createdAt: play.choices.at(-1)?.timestamp ?? fallbackCreatedAt,
  }
}

export async function persistStateToSqlite(state: GameState) {
  if (!hasIndexedDb()) {
    return
  }

  sqliteWriteQueue = sqliteWriteQueue.then(async () => {
    const database = await getDatabase()
    const sessionRecord = sessionRecordFromState(state)

    database.run(
      `INSERT OR REPLACE INTO sessions
        (id, researcher_name, condition_sequence, phase, created_at, updated_at, finished_at, snapshot_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sessionRecord.id,
        sessionRecord.researcherName,
        sessionRecord.conditionSequence,
        sessionRecord.phase,
        sessionRecord.createdAt,
        sessionRecord.updatedAt,
        sessionRecord.finishedAt,
        JSON.stringify(sessionRecord.snapshot),
      ],
    )

    database.run('DELETE FROM plays WHERE session_id = ?', [state.sessionId])

    const statement = database.prepare(
      `INSERT OR REPLACE INTO plays
        (id, session_id, play_number, condition_letter, created_at, payload_json)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )

    try {
      state.history.forEach((play) => {
        const playRecord = playRecordFromSummary(state.sessionId, play, state.updatedAt)
        statement.run?.([
          playRecord.id,
          playRecord.sessionId,
          playRecord.playNumber,
          playRecord.condition,
          playRecord.createdAt,
          JSON.stringify(playRecord.payload),
        ])
      })
    } finally {
      statement.free()
    }

    await persistSqliteBytes(database)
  })

  return sqliteWriteQueue
}

export async function listSqliteSessions() {
  if (!hasIndexedDb()) {
    return [] as PersistedSessionRecord[]
  }

  const database = await getDatabase()
  const statement = database.prepare(
    'SELECT snapshot_json FROM sessions ORDER BY updated_at DESC',
  )
  const sessions: PersistedSessionRecord[] = []

  try {
    while (statement.step()) {
      const row = statement.getAsObject()
      const snapshot = JSON.parse(String(row.snapshot_json)) as GameState
      sessions.push(sessionRecordFromState(snapshot))
    }
  } finally {
    statement.free()
  }

  return sessions
}

export async function listSqlitePlays(sessionId: string) {
  if (!hasIndexedDb()) {
    return [] as PersistedPlayRecord[]
  }

  const database = await getDatabase()
  const statement = database.prepare(
    'SELECT id, session_id, play_number, condition_letter, created_at, payload_json FROM plays WHERE session_id = ? ORDER BY play_number ASC',
    [sessionId],
  )
  const plays: PersistedPlayRecord[] = []

  try {
    while (statement.step()) {
      const row = statement.getAsObject()
      plays.push({
        id: String(row.id),
        sessionId: String(row.session_id),
        playNumber: Number(row.play_number),
        condition: String(row.condition_letter) as PersistedPlayRecord['condition'],
        createdAt: String(row.created_at),
        payload: JSON.parse(String(row.payload_json)) as PlaySummary,
      })
    }
  } finally {
    statement.free()
  }

  return plays
}

export async function loadSqliteSession(sessionId: string) {
  if (!hasIndexedDb()) {
    return null
  }

  const database = await getDatabase()
  const statement = database.prepare('SELECT snapshot_json FROM sessions WHERE id = ? LIMIT 1', [sessionId])

  try {
    if (!statement.step()) {
      return null
    }

    const row = statement.getAsObject()
    return JSON.parse(String(row.snapshot_json)) as GameState
  } finally {
    statement.free()
  }
}

export async function deleteSqliteSession(sessionId: string) {
  if (!hasIndexedDb()) {
    return
  }

  sqliteWriteQueue = sqliteWriteQueue.then(async () => {
    const database = await getDatabase()
    database.run('DELETE FROM plays WHERE session_id = ?', [sessionId])
    database.run('DELETE FROM sessions WHERE id = ?', [sessionId])
    await persistSqliteBytes(database)
  })

  return sqliteWriteQueue
}
