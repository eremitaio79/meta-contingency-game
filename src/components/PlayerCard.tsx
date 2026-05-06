import { LINE_COLOR_HEX } from '../constants/game'
import type { Player } from '../types/game'

interface PlayerCardProps {
  player: Player
  isActive: boolean
}

export function PlayerCard({ player, isActive }: PlayerCardProps) {
  const playerIndex = parseInt(player.id.split('-')[1]) || 1
  const playerColor = LINE_COLOR_HEX[playerIndex]

  return (
    <article
      className={`metric-card ${isActive ? 'metric-card--active' : ''}`}
      style={isActive ? { backgroundColor: playerColor, color: '#091018' } : {}}
    >
      <div className="metric-card__header">
        <h3>{player.name}</h3>
        <span>{isActive ? 'Na vez' : 'Aguardando'}</span>
      </div>
      <dl>
        <div>
          <dt style={isActive ? { color: 'rgba(0,0,0,0.6)' } : {}}>Total</dt>
          <dd>R$ {player.totalScore.toFixed(2)}</dd>
        </div>
        <div>
          <dt style={isActive ? { color: 'rgba(0,0,0,0.6)' } : {}}>Última jogada</dt>
          <dd>R$ {player.lastScore.toFixed(2)}</dd>
        </div>
      </dl>
    </article>
  )
}
