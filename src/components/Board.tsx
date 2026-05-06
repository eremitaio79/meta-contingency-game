import { BOARD_COLUMNS, LINE_COLOR_HEX } from '../constants/game'
import { getBallType } from '../services/gameEngine'
import type { HighlightCell } from '../types/game'

interface BoardProps {
  highlights: HighlightCell[]
  onLineSelect?: (line: number) => void
  disabled?: boolean
  headline?: string
  compact?: boolean
}

function isHighlighted(line: number, column: string, highlights: HighlightCell[]) {
  return highlights.some((highlight) => highlight.line === line && highlight.column === column)
}

export function Board({ highlights, onLineSelect, disabled, headline, compact = false }: BoardProps) {
  return (
    <section className="board-shell">
      {headline ? <p className="board-headline">{headline}</p> : null}
      <div className={`board-grid ${compact ? 'board-grid--compact' : ''}`} role="grid" aria-label="Tabuleiro 10 por 10">
        <div className="board-corner">Linha</div>
        {BOARD_COLUMNS.map((column) => (
          <div key={column} className="board-column-header">
            {column}
          </div>
        ))}

        {Array.from({ length: 10 }, (_, index) => index + 1).map((line) => (
          <div className="board-row" key={line}>
            <button
              type="button"
              className="line-trigger"
              style={{ background: LINE_COLOR_HEX[line] }}
              disabled={disabled || !onLineSelect}
              onClick={() => onLineSelect?.(line)}
            >
              {line}
            </button>
            {BOARD_COLUMNS.map((column) => {
              const ballType = getBallType(line, column)
              const highlighted = isHighlighted(line, column, highlights)

              return (
                <div
                  key={`${line}-${column}`}
                  className={`board-cell ${highlighted ? 'board-cell--active' : ''}`}
                  style={{ backgroundColor: LINE_COLOR_HEX[line] }}
                  data-ball-type={ballType}
                  title={`Linha ${line}, Coluna ${column}, Bola ${ballType === 'FULL' ? 'Cheia' : 'Vazia'}`}
                >
                  <span className={`ball ${ballType === 'FULL' ? 'ball--full' : 'ball--empty'}`} />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
