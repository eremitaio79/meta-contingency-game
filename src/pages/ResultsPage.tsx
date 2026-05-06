import { ArrowLeft, Download } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'

import { useGameState } from '../hooks/useGameState'
import { exportGameSession } from '../services/exportService'
import { calculateResultsSummary, classifyChoice } from '../services/reporting'

function currency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function ResultsPage() {
  const navigate = useNavigate()
  const gameState = useGameState()

  if (!gameState) {
    return <Navigate to="/" replace />
  }

  const summary = calculateResultsSummary(gameState)

  return (
    <main className="screen screen--results">
      <section className="panel panel--dashboard">
        <header className="panel__header">
          <div>
            <p className="eyebrow">Resultados da sessão</p>
            <h1>Leitura imediata do experimento</h1>
            <p className="hero-copy">
              Pesquisador: {gameState.researcherName || 'Pesquisador'} · Sessão {gameState.sessionId.slice(0, 8)} ·
              {' '}
              {summary.totalPlays} jogadas concluídas.
            </p>
          </div>
          <div className="results-actions">
            <button type="button" className="button button--secondary" onClick={() => navigate('/researcher')}>
              <ArrowLeft size={18} />
              Voltar ao painel
            </button>
            <button type="button" className="button button--primary" onClick={() => exportGameSession(gameState)}>
              <Download size={18} />
              Exportar Excel
            </button>
          </div>
        </header>

        <div className="results-summary">
          <article className="metric-card">
            <h3>Jogadas</h3>
            <p className="results-summary__value">{summary.totalPlays}</p>
          </article>
          <article className="metric-card">
            <h3>Culturantes</h3>
            <p className="results-summary__value">{summary.totalCulturants}</p>
          </article>
          <article className="metric-card">
            <h3>Pontuação total</h3>
            <p className="results-summary__value">{currency(summary.totalScore)}</p>
          </article>
        </div>

        <section className="panel panel--nested">
          <header className="panel__header panel__header--compact">
            <div>
              <h2>Tabela dinâmica</h2>
              <p>As jogadas aparecem agrupadas por ciclo e com destaque visual para culturantes.</p>
            </div>
          </header>

          <div className="table-shell table-shell--results">
            <table>
              <thead>
                <tr>
                  <th>Jogada</th>
                  <th>Condição</th>
                  <th>Participante 1</th>
                  <th>Participante 2</th>
                  <th>Participante 3</th>
                  <th>Escolha</th>
                  <th>Culturante</th>
                </tr>
              </thead>
              <tbody>
                {gameState.history.map((play) => (
                  <tr key={`${play.condition}-${play.playNumber}`} className={play.isCulturant ? 'row--culturant' : ''}>
                    <td>{play.playNumber}</td>
                    <td>{play.condition}</td>
                    {play.choices.map((choice) => (
                      <td key={`${play.playNumber}-${choice.playerId}`}>
                        <strong>{choice.playerName}</strong>
                        <div className="choice-cell">
                          <span className="color-dot" style={{ backgroundColor: colorHex(choice.color) }} />
                          Linha {choice.line} · {choice.color} · {currency(choice.value)}
                        </div>
                      </td>
                    ))}
                    <td>{play.choices.map((choice) => classifyChoice(choice.line)).join(', ')}</td>
                    <td>{play.isCulturant ? 'Sim' : 'Não'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  )
}

function colorHex(color: string) {
  switch (color) {
    case 'Amarelo':
      return '#f4c542'
    case 'Verde':
      return '#2f9e44'
    case 'Vermelho':
      return '#e03131'
    case 'Azul':
      return '#1c7ed6'
    case 'Rosa':
      return '#d63384'
    default:
      return '#f8f6f2'
  }
}
