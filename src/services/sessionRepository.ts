import { DB_NAME, DB_VERSION, PLAYS_STORE, SESSIONS_STORE, SQLITE_BINARY_STORE } from '../constants/game'
import type { GameState, PersistedPlayRecord, PersistedSessionRecord } from '../types/game'

function hasIndexedDb() {
  return typeof indexedDB !== 'undefined'
}

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = () => {
      const database = request.result

      if (!database.objectStoreNames.contains(SESSIONS_STORE)) {
        database.createObjectStore(SESSIONS_STORE, { keyPath: 'id' })
      }

      if (!database.objectStoreNames.contains(PLAYS_STORE)) {
        const playsStore = database.createObjectStore(PLAYS_STORE, { keyPath: 'id' })
        playsStore.createIndex('sessionId', 'sessionId', { unique: false })
      }

      if (!database.objectStoreNames.contains(SQLITE_BINARY_STORE)) {
        database.createObjectStore(SQLITE_BINARY_STORE, { keyPath: 'id' })
      }
    }
  })
}

function resolveRequest<T>(request: IDBRequest<T>, resolve: (value: T) => void, reject: (error?: unknown) => void) {
  request.onsuccess = () => resolve(request.result)
  request.onerror = () => reject(request.error)
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

export async function persistSnapshot(state: GameState) {
  if (!hasIndexedDb()) {
    return
  }

  const plays = state.history.map<PersistedPlayRecord>((play) => ({
    id: `${state.sessionId}-${play.playNumber}`,
    sessionId: state.sessionId,
    playNumber: play.playNumber,
    condition: play.condition,
    payload: play,
    createdAt: play.choices.at(-1)?.timestamp ?? state.updatedAt,
  }))

  const database = await openDatabase()

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction([SESSIONS_STORE, PLAYS_STORE], 'readwrite')
    const sessionsStore = transaction.objectStore(SESSIONS_STORE)
    const playsStore = transaction.objectStore(PLAYS_STORE)

    sessionsStore.put(sessionRecordFromState(state))
    plays.forEach((play) => playsStore.put(play))

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

export async function loadSessionRecord(sessionId: string) {
  if (!hasIndexedDb()) {
    return null
  }

  const database = await openDatabase()

  return new Promise<PersistedSessionRecord | null>((resolve, reject) => {
    const transaction = database.transaction(SESSIONS_STORE, 'readonly')
    const store = transaction.objectStore(SESSIONS_STORE)
    const request = store.get(sessionId)

    resolveRequest(request, (result) => {
      database.close()
      resolve((result as PersistedSessionRecord | undefined) ?? null)
    }, (error) => {
      database.close()
      reject(error)
    })
  })
}

export async function listSessionRecords() {
  if (!hasIndexedDb()) {
    return [] as PersistedSessionRecord[]
  }

  const database = await openDatabase()

  return new Promise<PersistedSessionRecord[]>((resolve, reject) => {
    const transaction = database.transaction(SESSIONS_STORE, 'readonly')
    const store = transaction.objectStore(SESSIONS_STORE)
    const request = store.getAll()

    resolveRequest(request, (result) => {
      database.close()
      const records = (result as PersistedSessionRecord[]).sort((left, right) =>
        right.updatedAt.localeCompare(left.updatedAt),
      )
      resolve(records)
    }, (error) => {
      database.close()
      reject(error)
    })
  })
}

export async function listSessionPlays(sessionId: string) {
  if (!hasIndexedDb()) {
    return [] as PersistedPlayRecord[]
  }

  const database = await openDatabase()

  return new Promise<PersistedPlayRecord[]>((resolve, reject) => {
    const transaction = database.transaction(PLAYS_STORE, 'readonly')
    const store = transaction.objectStore(PLAYS_STORE)
    const index = store.index('sessionId')
    const request = index.getAll(sessionId)

    resolveRequest(request, (result) => {
      database.close()
      const records = (result as PersistedPlayRecord[]).sort((left, right) => left.playNumber - right.playNumber)
      resolve(records)
    }, (error) => {
      database.close()
      reject(error)
    })
  })
}

export async function deleteSession(sessionId: string) {
  if (!hasIndexedDb()) {
    return
  }

  const database = await openDatabase()

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction([SESSIONS_STORE, PLAYS_STORE], 'readwrite')
    const sessionsStore = transaction.objectStore(SESSIONS_STORE)
    const playsStore = transaction.objectStore(PLAYS_STORE)
    const index = playsStore.index('sessionId')
    const request = index.openCursor(IDBKeyRange.only(sessionId))

    request.onsuccess = () => {
      const cursor = request.result
      if (cursor) {
        cursor.delete()
        cursor.continue()
      }
    }
    request.onerror = () => reject(request.error)

    sessionsStore.delete(sessionId)

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
