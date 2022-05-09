import { describe, expect, it } from 'vitest'
import { PotentialMove } from './move'
import { Game } from './game'

describe.concurrent('move tests', () => {
  it('invalid capture if same color piece in between', async () => {
    const game = new Game('4k2b/8/8/8/8/8/1R6/B3K3 w - - 0 1')
    const move = await PotentialMove.getValidatedMoveFromSquares(
      game.board.board[7][0],
      game.board.board[0][7],
      game
    )

    expect(move.isValid).toBe(false)
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
      const move = await PotentialMove.getValidatedMoveFromSquares(
        game.board.board[7][0],
        game.board.board[0][7],
        game
      )

      expect(move.isValid).toBe(false)
    }
  })
  // it('will handle check correctly', async () => {
  //   const game = new Game('rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3')
  //   const move = await PotentialMove.getValidatedMoveFromSquares(
  //     game.board.board[7][3],
  //     game.board.board[4][0],
  //     game
  //   )
  //   expect(move.isCheck).toBe(true)
  // })
})
