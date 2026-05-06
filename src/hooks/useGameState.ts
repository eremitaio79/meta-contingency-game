import { useCallback, useEffect, useState } from 'react'

import { STORAGE_EVENT } from '../constants/game'
import { readGameState } from '../services/storage'
import type { GameState } from '../types/game'

export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>(() => readGameState())

  const syncState = useCallback(() => {
    setGameState(readGameState())
  }, [])

  useEffect(() => {
    const onStorage = () => {
      syncState()
    }

    const onInternalSync = () => {
      syncState()
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener(STORAGE_EVENT, onInternalSync)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(STORAGE_EVENT, onInternalSync)
    }
  }, [syncState])

  return gameState
}
