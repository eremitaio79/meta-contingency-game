import { describe, expect, it, vi } from 'vitest'

import type { ConditionLetter } from '../types/game'
import {
  advanceCondition,
  checkCulturant,
  createInitialGameState,
  getMachineResponse,
  processPlayerTurn,
} from './gameEngine'

describe('gameEngine', () => {
  function createState() {
    return createInitialGameState({
      researcherName: 'Dr. Spock',
      playerNames: ['Ana', 'Bia', 'Caio'],
      conditionSequence: 'ADBDCD',
    })
  }

  it('returns only candidate columns and correct values for even lines', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.8)

    const response = getMachineResponse(2)

    expect(['A', 'C', 'E', 'G', 'I']).toContain(response.column)
    expect(response.value).toBe(0.05)
    expect(response.ballType).toBe('EMPTY')
  })

  it('detects culturant only for three even lines with distinct colors', () => {
    const isCulturant = checkCulturant([
      {
        playerId: 'p1',
        playerName: 'Ana',
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
        playerName: 'Bia',
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
        playerName: 'Caio',
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
    ])

    expect(isCulturant).toBe(true)
  })

  it('completes a play after three turns and updates state', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)

    const initial = createState()

    const afterTurnOne = processPlayerTurn(initial, 2)
    const afterTurnTwo = processPlayerTurn(afterTurnOne, 4)
    const afterTurnThree = processPlayerTurn(afterTurnTwo, 6)

    expect(afterTurnThree.roundPlayCount).toBe(1)
    expect(afterTurnThree.culturantCount).toBe(1)
    expect(afterTurnThree.lastCompletedPlay?.isCulturant).toBe(true)
    expect(afterTurnThree.feedbackOverlay).toBe('Parabéns! Vocês se saíram bem desta vez.')
    expect(afterTurnThree.researcherSignal).toBe('X de culturante registrado para a condição A.')
    expect(afterTurnThree.players.every((player) => player.totalScore >= 0.05)).toBe(true)
  })

  it('keeps condition B silent for players and researcher signal only on culturant', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)

    let state = createState()
    state = advanceCondition(state)
    expect(state.conditionSequence[state.conditionIndex]).toBe('D')
    state = advanceCondition(state)
    expect(state.conditionSequence[state.conditionIndex]).toBe('B')

    const afterTurnOne = processPlayerTurn(state, 2)
    const afterTurnTwo = processPlayerTurn(afterTurnOne, 4)
    const afterTurnThree = processPlayerTurn(afterTurnTwo, 6)

    expect(afterTurnThree.feedbackOverlay).toBeNull()
    expect(afterTurnThree.researcherSignal).toBe('X de culturante registrado para a condição B.')
  })

  it('transitions out of condition D at play 25 when culturants stay below one third of prior last ten', () => {
    const state = {
      ...createState(),
      conditionSequence: ['A', 'D', 'B'] as ConditionLetter[],
      conditionIndex: 1,
      roundPlayCount: 24,
      totalPlayCount: 24,
      culturantCount: 2,
      previousConditionLast10Culturants: 9,
      currentTurnOrder: ['player-1', 'player-2', 'player-3'],
      activeTurnIndex: 0,
      currentChoices: [],
      history: [],
    }

    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)

    const afterTurnOne = processPlayerTurn(state, 1)
    const afterTurnTwo = processPlayerTurn(afterTurnOne, 3)
    const afterTurnThree = processPlayerTurn(afterTurnTwo, 5)

    expect(afterTurnThree.conditionSequence[afterTurnThree.conditionIndex]).toBe('B')
    expect(afterTurnThree.roundPlayCount).toBe(0)
    expect(afterTurnThree.lastCompletedPlay?.transitionReason).toContain('Transição antecipada da condição D')
  })

  it('advances condition A when reaching 48 culturants within the first 60 plays', () => {
    const state = {
      ...createState(),
      roundPlayCount: 47,
      totalPlayCount: 47,
      culturantCount: 47,
      currentTurnOrder: ['player-1', 'player-2', 'player-3'],
      activeTurnIndex: 0,
      currentChoices: [],
      history: [],
    }

    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)

    const afterTurnOne = processPlayerTurn(state, 2)
    const afterTurnTwo = processPlayerTurn(afterTurnOne, 4)
    const afterTurnThree = processPlayerTurn(afterTurnTwo, 6)

    expect(afterTurnThree.conditionSequence[afterTurnThree.conditionIndex]).toBe('D')
    expect(afterTurnThree.roundPlayCount).toBe(0)
    expect(afterTurnThree.lastCompletedPlay?.transitionReason).toContain('48 culturantes')
  })

  it('advances condition A at 100 plays even without reaching the culturant threshold', () => {
    const state = {
      ...createState(),
      roundPlayCount: 99,
      totalPlayCount: 99,
      culturantCount: 0,
      currentTurnOrder: ['player-1', 'player-2', 'player-3'],
      activeTurnIndex: 0,
      currentChoices: [],
      history: [],
    }

    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)

    const afterTurnOne = processPlayerTurn(state, 1)
    const afterTurnTwo = processPlayerTurn(afterTurnOne, 3)
    const afterTurnThree = processPlayerTurn(afterTurnTwo, 5)

    expect(afterTurnThree.conditionSequence[afterTurnThree.conditionIndex]).toBe('D')
    expect(afterTurnThree.lastCompletedPlay?.transitionReason).toContain('100 jogadas')
  })

  it('finishes the session when the final condition D reaches 100 plays', () => {
    const state = {
      ...createState(),
      conditionSequence: ['D'] as ConditionLetter[],
      conditionIndex: 0,
      roundPlayCount: 99,
      totalPlayCount: 99,
      culturantCount: 0,
      currentTurnOrder: ['player-1', 'player-2', 'player-3'],
      activeTurnIndex: 0,
      currentChoices: [],
      history: [],
    }

    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)

    const afterTurnOne = processPlayerTurn(state, 1)
    const afterTurnTwo = processPlayerTurn(afterTurnOne, 3)
    const afterTurnThree = processPlayerTurn(afterTurnTwo, 5)

    expect(afterTurnThree.phase).toBe('FINISHED')
    expect(afterTurnThree.finishedAt).not.toBeNull()
    expect(afterTurnThree.lastCompletedPlay?.transitionReason).toContain('D final')
  })
})
