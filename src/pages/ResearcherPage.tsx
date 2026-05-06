import { useState } from 'react'
import { Download, Eye, FastForward, MonitorUp, SquareX } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'

import { Board } from '../components/Board'
import { PlayerCard } from '../components/PlayerCard'
import { useGameState } from '../hooks/useGameState'
import { advanceCondition, finishGame, getActivePlayer, getCurrentConditionLabel } from '../services/gameEngine'
import { exportGameSession } from '../services/exportService'
import { clearGameState, writeGameState } from '../services/storage'

export function ResearcherPage() {
  const navigate = useNavigate()
  const gameState = useGameState()
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false)

  if (!gameState) {
    return <Navigate to="/" replace />
  }

  const activePlayer = getActivePlayer(gameState)

  const handleOpenBoard = () => {
    const basePath = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`
    window.open(`${basePath}players`, 'mcg-players', 'popup,width=1400,height=960')
  }

  const handleAdvanceCondition = () => {
    writeGameState(advanceCondition(gameState))
    setIsAdvanceModalOpen(false)
  }

  const handleFinishGame = () => {
    writeGameState(finishGame(gameState))
    setIsFinishModalOpen(false)
  }

  const handleReset = () => {
    clearGameState()
    navigate('/')
  }

  return (
    <main className="screen screen--researcher">
      <section className="panel panel--dashboard">
        <header className="panel__header">
          <div>
            <p className="eyebrow">Painel do pesquisador</p>
            <h1>Condição {getCurrentConditionLabel(gameState)}</h1>
            <p className="hero-copy">
              Pesquisador: {gameState.researcherName || 'Pesquisador'} ·
              {' '}
              Rodada {gameState.roundPlayCount} concluída, {gameState.culturantCount} culturantes acumulados e
              jogador ativo: {activePlayer?.name ?? 'nenhum'}.
            </p>
          </div>
          <div className="signal-box">
            <span>Sinal</span>
            <strong>{gameState.researcherSignal ?? 'Aguardando novo culturante'}</strong>
          </div>
        </header>

        <div className="metrics-grid">
          {gameState.players.map((player) => (
            <PlayerCard key={player.id} player={player} isActive={activePlayer?.id === player.id} />
          ))}
        </div>

        <div className="panel-row">
          <article className="panel panel--nested">
            <header className="panel__header panel__header--compact">
              <div>
                <h2>Espelho do tabuleiro</h2>
                <p>As últimas seleções permanecem destacadas para leitura rápida.</p>
              </div>
            </header>

            <Board
              highlights={gameState.boardHighlights}
              disabled
              compact
              headline="Espelho não interativo do ambiente dos jogadores."
            />
          </article>

          <aside className="panel panel--nested panel--controls">
            <h2>Comando</h2>
            <button type="button" className="button button--secondary" onClick={handleOpenBoard}>
              <MonitorUp size={18} />
              Abrir tabuleiro
            </button>
            <button type="button" className="button button--secondary" onClick={() => exportGameSession(gameState)}>
              <Download size={18} />
              Processar dados
            </button>
            {gameState.history.length > 0 ? (
              <button type="button" className="button button--secondary" onClick={() => navigate('/results')}>
                <Eye size={18} />
                Ver resultados
              </button>
            ) : null}
            {gameState.phase === 'RUNNING' ? (
              <>
                <button type="button" className="button button--secondary" onClick={() => setIsAdvanceModalOpen(true)}>
                  <FastForward size={18} />
                  Próxima condição
                </button>
                <button type="button" className="button button--danger" onClick={() => setIsFinishModalOpen(true)}>
                  <SquareX size={18} />
                  Encerrar jogo
                </button>
              </>
            ) : (
              <button type="button" className="button button--primary" onClick={handleReset}>
                Nova sessão
              </button>
            )}
          </aside>
        </div>

        <section className="panel panel--nested">
          <header className="panel__header panel__header--compact">
            <div>
              <h2>Últimas jogadas</h2>
              <p>Auditoria rápida das últimas rodadas processadas.</p>
            </div>
          </header>

          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>Jogada</th>
                  <th>Condição</th>
                  <th>Jogadores</th>
                  <th>Culturante</th>
                  <th>Transição</th>
                </tr>
              </thead>
              <tbody>
                {gameState.history.slice(-8).reverse().map((play, index) => (
                  <tr key={`${play.condition}-${play.playNumber}-${index}`}>
                    <td>{play.playNumber}</td>
                    <td>{play.condition}</td>
                    <td>{play.choices.map((choice) => `${choice.playerName}: L${choice.line}${choice.column}`).join(' · ')}</td>
                    <td>{play.isCulturant ? 'Sim' : 'Não'}</td>
                    <td>{play.transitionReason ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      {isFinishModalOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsFinishModalOpen(false)}>
          <section
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="finish-title"
            onClick={(event) => event.stopPropagation()}
            style={{ width: 'min(480px, 100%)' }}
          >
            <div className="modal-card__header">
              <div>
                <p className="eyebrow">Confirmação</p>
                <h2 id="finish-title">Encerrar experimento?</h2>
              </div>
            </div>

            <div className="modal-card__content" style={{ gridTemplateColumns: '1fr', margin: '16px 0 24px' }}>
              <p>Esta ação interromperá a sessão atual para todos os jogadores. Os dados coletados até agora serão preservados.</p>
            </div>

            <div className="modal-card__footer">
              <button type="button" className="button button--secondary" onClick={() => setIsFinishModalOpen(false)}>
                Cancelar
              </button>
              <button type="button" className="button button--danger" onClick={handleFinishGame}>
                Encerrar agora
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {isAdvanceModalOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsAdvanceModalOpen(false)}>
          <section
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="advance-title"
            onClick={(event) => event.stopPropagation()}
            style={{ width: 'min(480px, 100%)' }}
          >
            <div className="modal-card__header">
              <div>
                <p className="eyebrow">Atenção</p>
                <h2 id="advance-title">Avançar condição?</h2>
              </div>
            </div>

            <div className="modal-card__content" style={{ gridTemplateColumns: '1fr', margin: '16px 0 24px' }}>
              <p>Os contadores da rodada atual e os registros temporários serão reiniciados para a nova fase.</p>
            </div>

            <div className="modal-card__footer">
              <button type="button" className="button button--secondary" onClick={() => setIsAdvanceModalOpen(false)}>
                Cancelar
              </button>
              <button type="button" className="button button--primary" onClick={handleAdvanceCondition}>
                Confirmar avanço
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  )
}
