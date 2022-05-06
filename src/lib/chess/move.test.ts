import { describe, expect, it } from 'vitest'
import { Move } from './move'
import { Game } from './game'

describe.concurrent('move tests', () => {
  it('diagonal capture across the board', async () => {
    const game = new Game('4k2b/8/8/8/8/8/8/B3K3 w - - 0 1')
    const move = await Move.getValidatedMove(
      game.board.board[7][0],
      game.board.board[0][7],
      game
    )

    expect(move.isValid).toBe(true)
    expect(move.isCapture).toBe(true)
  })
  it('invalid capture if same color piece in between', async () => {
    const game = new Game('4k2b/8/8/8/8/8/1R6/B3K3 w - - 0 1')
    const move = await Move.getValidatedMove(
      game.board.board[7][0],
      game.board.board[0][7],
      game
    )

    expect(move.isValid).toBe(false)
    expect(move.isCapture).toBe(false)
  })
  it('invalid capture if opp color piece in between', async () => {
    const games = [
      '4k2b/6r1/8/8/8/8/8/B3K3 w - - 0 1',
      '4k2b/8/5r2/8/8/8/8/B3K3 w - - 0 1',
      '4k2b/8/8/4r3/8/8/8/B3K3 w - - 0 1',
      '4k2b/8/8/8/3r4/8/8/B3K3 w - - 0 1',
      '4k2b/8/8/8/8/2r5/8/B3K3 w - - 0 1',
      '4k2b/8/8/8/8/8/1r6/B3K3 w - - 0 1',
    ]
    for (const fen of games) {
      const game = new Game(fen)
      const move = await Move.getValidatedMove(
        game.board.board[7][0],
        game.board.board[0][7],
        game
      )

      expect(move.isValid).toBe(false)
      expect(move.isCapture).toBe(false)
    }
  })
  it('will handle pinned pieces correctly', async () => {
    const pinnedKnight = {
      fen: 'r1bqkbnr/ppp2ppp/2n1p3/3p4/Q1PP1B2/8/PP2PPPP/RN2KBNR b KQkq - 0 1',
      pinnedPosition: {
        x: 2,
        y: 2,
      },
      attempt: {
        x: 1,
        y: 4,
      },
    }
    const scenarios = [pinnedKnight]

    for (const {
      fen,
      pinnedPosition: { x, y },
      attempt: { x: aX, y: aY },
    } of scenarios) {
      const game = new Game(fen)
      const move = await Move.getValidatedMove(
        game.board.board[y][x],
        game.board.board[aY][aX],
        game
      )
      expect(move.isValid).toBe(false)
    }
  })
})
