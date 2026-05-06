import { describe, expect, it } from 'vitest'

import { createInitialGameState } from './gameEngine'
import {
  calculateResultsSummary,
  classifyChoice,
  mapPlayToExportRow,
  summarizeSessionRecord,
} from './reporting'
import type { PlaySummary } from '../types/game'

describe('reporting', () => {
  it('classifies even and odd lines correctly', () => {
    expect(classifyChoice(2)).toBe('AUTOCONTROLE')
    expect(classifyChoice(3)).toBe('IMPULSIVO')
  })

  it('maps a play to the horizontal export row format', () => {
    const play: PlaySummary = {
      playNumber: 1,
      condition: 'A',
      isCulturant: true,
      playerFeedback: 'Parabéns! Vocês se saíram bem desta vez.',
      researcherFeedback: 'X de culturante registrado para a condição A.',
      transitionReason: null,
      choices: [
        {
          playerId: 'p1',
          playerName: 'João',
          line: 2,
          color: 'Verde',
          column: 'A',
          value: 0.05,
          ballType: 'EMPTY',
          condition: 'A',
          playNumber: 1,
          turnNumberWithinPlay: 1,
          timestamp: new Date().toISOString(),
        },
        {
          playerId: 'p2',
          playerName: 'Maria',
          line: 4,
          color: 'Azul',
          column: 'C',
          value: 0.05,
          ballType: 'EMPTY',
          condition: 'A',
          playNumber: 1,
          turnNumberWithinPlay: 2,
          timestamp: new Date().toISOString(),
        },
        {
          playerId: 'p3',
          playerName: 'Pedro',
          line: 6,
          color: 'Amarelo',
          column: 'E',
          value: 0.05,
          ballType: 'EMPTY',
          condition: 'A',
          playNumber: 1,
          turnNumberWithinPlay: 3,
          timestamp: new Date().toISOString(),
        },
      ],
    }

    const row = mapPlayToExportRow(play)

    expect(row).not.toBeNull()
    expect(row?.choiceProfile).toBe('AUTOCONTROLE, AUTOCONTROLE, AUTOCONTROLE')
    expect(row?.isCulturant).toBe('Sim')
    expect(row?.player2).toBe('Maria')
  })

  it('calculates result summaries from the current state', () => {
    const state = createInitialGameState({
      researcherName: 'Eremita',
      playerNames: ['João', 'Maria', 'Pedro'],
      conditionSequence: 'ADBDCD',
    })

    state.players[0]!.totalScore = 1.5
    state.players[1]!.totalScore = 1.25
    state.players[2]!.totalScore = 2.0
    state.history.push({
      playNumber: 1,
      condition: 'A',
      choices: [],
      isCulturant: true,
      playerFeedback: null,
      researcherFeedback: null,
      transitionReason: null,
    })

    const summary = calculateResultsSummary(state)

    expect(summary.totalPlays).toBe(1)
    expect(summary.totalCulturants).toBe(1)
    expect(summary.totalScore).toBe(4.75)
  })

  it('summarizes saved session metadata for the configuration screen', () => {
    const state = createInitialGameState({
      researcherName: 'Eremita',
      playerNames: ['João', 'Maria', 'Pedro'],
      conditionSequence: 'ADBDCD',
    })

    state.history.push({
      playNumber: 1,
      condition: 'A',
      choices: [],
      isCulturant: false,
      playerFeedback: null,
      researcherFeedback: null,
      transitionReason: null,
    })

    const sessionSummary = summarizeSessionRecord({
      id: state.sessionId,
      researcherName: state.researcherName,
      conditionSequence: state.conditionSequence.join(''),
      phase: state.phase,
      createdAt: state.createdAt,
      updatedAt: state.updatedAt,
      finishedAt: state.finishedAt,
      snapshot: state,
    })

    expect(sessionSummary.phaseLabel).toBe('Em andamento')
    expect(sessionSummary.totalPlays).toBe(1)
    expect(sessionSummary.currentCondition).toBe('A')
  })
})
