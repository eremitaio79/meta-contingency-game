import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CONDITION_SEQUENCES } from '../constants/game'
import { createInitialGameState } from '../services/gameEngine'
import { summarizeSessionRecord } from '../services/reporting'
import { listSessionRecords } from '../services/sessionRepository'
import { deleteSqliteSession, listSqliteSessions } from '../services/sqliteRepository'
import { discardGameState, readGameState, restoreGameState, writeGameState } from '../services/storage'
import { deleteSession } from '../services/sessionRepository'
import type { PersistedSessionRecord, SessionConfig } from '../types/game'

const INITIAL_NAMES = ['', '', '']

export function ConfigPage() {
  const navigate = useNavigate()
  const existingSession = readGameState()
  const [savedSessions, setSavedSessions] = useState<PersistedSessionRecord[]>([])
  const [isInstructionsOpen, setInstructionsOpen] = useState(false)
  const [researcherName, setResearcherName] = useState('')
  const [playerNames, setPlayerNames] = useState(INITIAL_NAMES)
  const [conditionSequence, setConditionSequence] = useState(CONDITION_SEQUENCES[0])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    void Promise.allSettled([listSqliteSessions(), listSessionRecords()]).then((results) => {
      const sqliteSessions = results[0].status === 'fulfilled' ? results[0].value : []
      const indexedDbSessions = results[1].status === 'fulfilled' ? results[1].value : []
      const merged = [...sqliteSessions, ...indexedDbSessions].reduce<PersistedSessionRecord[]>((accumulator, session) => {
        if (!accumulator.some((item) => item.id === session.id)) {
          accumulator.push(session)
        }
        return accumulator
      }, [])

      merged.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
      setSavedSessions(merged)
    })
  }, [])

  const updatePlayerName = (index: number, value: string) => {
    setPlayerNames((current) => current.map((name, nameIndex) => (nameIndex === index ? value : name)))
  }

  const openPlayersWindow = () => {
    const basePath = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`
    window.open(`${basePath}players`, 'mcg-players', 'popup,width=1400,height=960')
  }

  const handleStart = () => {
    const trimmedNames = playerNames.map((name) => name.trim())
    const trimmedResearcher = researcherName.trim() || 'Pesquisador'

    if (trimmedNames.some((name) => !name)) {
      setErrorMessage('Preencha os nomes dos três jogadores antes de iniciar.')
      return
    }

    const config: SessionConfig = {
      researcherName: trimmedResearcher,
      playerNames: trimmedNames,
      conditionSequence,
    }

    writeGameState(createInitialGameState(config))
    openPlayersWindow()
    navigate('/researcher')
  }

  const handleResume = async (sessionId?: string) => {
    if (sessionId && (!existingSession || existingSession.sessionId !== sessionId)) {
      await restoreGameState(sessionId)
    }

    navigate('/researcher')
    openPlayersWindow()
  }

  const handleDiscardExisting = () => {
    discardGameState()
    window.location.reload()
  }

  const handleDeleteSavedSession = async (sessionId: string) => {
    const targetSession = savedSessions.find((session) => session.id === sessionId)
    const label = targetSession?.researcherName || 'Pesquisador'
    const confirmed = window.confirm(
      `Apagar a sessão salva de ${label}? Esta ação remove o snapshot e o histórico persistido no navegador.`,
    )

    if (!confirmed) {
      return
    }

    await Promise.allSettled([deleteSqliteSession(sessionId), deleteSession(sessionId)])
    setSavedSessions((current) => current.filter((session) => session.id !== sessionId))
    if (existingSession?.sessionId === sessionId) {
      discardGameState()
      window.location.reload()
    }
  }

  return (
    <>
      <main className="screen screen--config screen--config-stage">
        <div className="config-stage__background" aria-hidden="true" />
        <div className="config-column config-column--left">
          <section className="hero-panel hero-panel--config">
            <p className="eyebrow">Meta Contingency Game</p>
            <h1>Laboratório pronto para o experimento coletivo</h1>
            <p className="hero-copy">
              Configure os participantes, escolha a sequência experimental e solte a ferramenta em órbita.
              Sem firula. Só o essencial para o pesquisador comandar e os jogadores reagirem.
            </p>
            <div className="hero-highlights" aria-label="Resumo operacional">
              <span className="status-pill">3 jogadores sincronizados</span>
              <span className="status-pill">Condições A, B, C e D</span>
              <span className="status-pill">Persistência local com SQLite</span>
            </div>
            <div className="hero-actions">
              <button type="button" className="button button--secondary" onClick={() => setInstructionsOpen(true)}>
                Instruções do jogo
              </button>
              {savedSessions.length > 0 ? (
                <span className="hero-note">{savedSessions.length} sessão(ões) registrada(s) pronta(s) para retomada.</span>
              ) : (
                <span className="hero-note">Fluxo enxuto para configurar e lançar a sessão sem rolagem desnecessária.</span>
              )}
            </div>
          </section>

          {savedSessions.length > 0 ? (
            <section className="panel panel--sessions">
              <div className="session-list__header">
                <h3>Sessões registradas</h3>
                <span className="hero-note">Últimas 4 sessões persistidas no navegador.</span>
              </div>
              <div className="session-list__items">
                {savedSessions.slice(0, 4).map((session) => {
                  const summary = summarizeSessionRecord(session)

                  return (
                    <article className="session-card" key={session.id}>
                      <div>
                        <strong>{session.researcherName || 'Pesquisador'}</strong>
                        <p>ID {session.id.slice(0, 8)}</p>
                        <p>
                          Sequência {session.conditionSequence} · {summary.phaseLabel} · Condição {summary.currentCondition}
                        </p>
                        <p>
                          {summary.totalPlays} jogadas · {summary.totalCulturants} culturantes · Atualizado em{' '}
                          {new Date(session.updatedAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="session-card__actions">
                        <button type="button" className="button button--secondary" onClick={() => void handleResume(session.id)}>
                          Carregar
                        </button>
                        <button type="button" className="button button--danger" onClick={() => void handleDeleteSavedSession(session.id)}>
                          Apagar
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ) : null}
        </div>

        <section className="panel panel--form panel--form-compact">
          <header className="panel__header panel__header--compact">
            <div>
              <h2>Configuração inicial</h2>
              <p>Defina os participantes, a sequência experimental e deixe o pesquisador no comando.</p>
            </div>
          </header>

          {existingSession ? (
            <div className="resume-banner">
              <div>
                <strong>Sessão encontrada.</strong>
                <p>
                  Pesquisador: {existingSession.researcherName || 'Pesquisador'} · Condição{' '}
                  {existingSession.conditionSequence[existingSession.conditionIndex]} · Jogada {existingSession.roundPlayCount + 1}
                </p>
              </div>
              <div className="action-row action-row--stacked">
                <button type="button" className="button button--secondary" onClick={() => void handleResume()}>
                  Retomar sessão
                </button>
                <button type="button" className="button button--danger" onClick={handleDiscardExisting}>
                  Descartar sessão
                </button>
              </div>
            </div>
          ) : null}

          <div className="form-grid form-grid--config">
            <label className="field field--wide">
              <span>Pesquisador</span>
              <input
                id="researcher-name"
                name="researcherName"
                value={researcherName}
                onChange={(event) => setResearcherName(event.target.value)}
                placeholder="Nome do pesquisador"
              />
            </label>

            <label className="field">
              <span>Sequência de condições</span>
              <select
                id="condition-sequence"
                name="conditionSequence"
                value={conditionSequence}
                onChange={(event) => setConditionSequence(event.target.value)}
              >
                {CONDITION_SEQUENCES.map((sequence) => (
                  <option key={sequence} value={sequence}>
                    {sequence}
                  </option>
                ))}
              </select>
            </label>

            {playerNames.map((name, index) => (
              <label className="field" key={`player-${index + 1}`}>
                <span>Jogador {index + 1}</span>
                <input
                  id={`player-${index + 1}-name`}
                  name={`player${index + 1}Name`}
                  value={name}
                  onChange={(event) => updatePlayerName(index, event.target.value)}
                  placeholder={`Nome do jogador ${index + 1}`}
                />
              </label>
            ))}
          </div>

          {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

          <div className="action-row action-row--spread">
            <p className="panel-note">A janela dos jogadores abre automaticamente ao iniciar ou retomar uma sessão.</p>
            <button type="button" className="button button--primary" onClick={handleStart}>
              Iniciar jogo
            </button>
          </div>
        </section>
      </main>

      {isInstructionsOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setInstructionsOpen(false)}>
          <section
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="instructions-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-card__header">
              <div>
                <p className="eyebrow">Manual de bordo</p>
                <h2 id="instructions-title">Como o experimento funciona</h2>
              </div>
              <button
                type="button"
                className="button button--secondary button--icon"
                aria-label="Fechar instruções"
                onClick={() => setInstructionsOpen(false)}
              >
                Fechar
              </button>
            </div>

            <div className="modal-card__content">
              <article className="instruction-block">
                <h3>1. Preparação</h3>
                <p>Informe o pesquisador, nomeie os três jogadores e escolha a sequência de condições experimentais.</p>
              </article>
              <article className="instruction-block">
                <h3>2. Janelas sincronizadas</h3>
                <p>Ao iniciar, o painel do pesquisador assume o controle e a janela dos jogadores abre automaticamente com o tabuleiro compartilhado.</p>
              </article>
              <article className="instruction-block">
                <h3>3. Dinâmica das jogadas</h3>
                <p>Cada rodada recebe até três respostas, uma por jogador. O sistema marca escolhas, calcula culturantes e aplica o feedback da condição vigente.</p>
              </article>
              <article className="instruction-block">
                <h3>4. Encerramento e análise</h3>
                <p>O pesquisador acompanha a fase atual, avança condições quando necessário, retoma sessões salvas e exporta os dados para análise posterior.</p>
              </article>
            </div>

            <div className="modal-card__footer">
              <p className="panel-note">Resumo da ópera: menos improviso humano, mais consistência experimental.</p>
              <button type="button" className="button button--primary" onClick={() => setInstructionsOpen(false)}>
                Entendi
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  )
}
