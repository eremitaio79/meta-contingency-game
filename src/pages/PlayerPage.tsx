import { Navigate } from 'react-router-dom'

import { Board } from '../components/Board'
import { FeedbackOverlay } from '../components/FeedbackOverlay'
import { useGameState } from '../hooks/useGameState'
import { getActivePlayer, getCurrentConditionLabel, processPlayerTurn } from '../services/gameEngine'
import { writeGameState } from '../services/storage'

export function PlayerPage() {
  const gameState = useGameState()

  if (!gameState) {
    return <Navigate to="/" replace />
  }

  const activePlayer = getActivePlayer(gameState)

  const handleLineSelect = (line: number) => {
    writeGameState(processPlayerTurn(gameState, line))
  }

  return (
    <main className="screen screen--players">
      <section className="panel panel--wide">
        <header className="panel__header panel__header--compact">
          <div>
            <p className="eyebrow">Condição {getCurrentConditionLabel(gameState)}</p>
            <h1>Vez de: {activePlayer?.name ?? 'Aguardando'}</h1>
          </div>
          <div className="status-pill">
            Jogada {gameState.roundPlayCount + 1} · Turno {gameState.currentChoices.length + 1}/3
          </div>
        </header>

        <Board
          highlights={gameState.boardHighlights}
          onLineSelect={gameState.phase === 'RUNNING' ? handleLineSelect : undefined}
          disabled={gameState.phase !== 'RUNNING'}
          headline="Escolha uma linha. A máquina responde com a coluna e o valor da jogada."
        />
      </section>

      <FeedbackOverlay
        message={gameState.feedbackOverlay}
        tone={gameState.feedbackOverlay?.includes('não') ? 'neutral' : 'positive'}
      />
    </main>
  )
}
