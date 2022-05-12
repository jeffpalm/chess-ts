import { describe, expect, it } from 'vitest'
import { MoveValidator, PotentialMove } from './move'
import { Game } from './game'

describe.concurrent('move tests', () => {
  it('invalid capture if same color piece in between', () => {
    const game = new Game('4k2b/8/8/8/8/8/1R6/B3K3 w - - 0 1')
    const move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[7][0],
      game.board.board[0][7],
      game
    )

    expect(move.isValid).toBe(false)
  })
  it('invalid capture if opp color piece in between', () => {
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
      const move = PotentialMove.getValidatedMoveFromSquares(
        game.board.board[7][0],
        game.board.board[0][7],
        game
      )

      expect(move.isValid).toBe(false)
    }
  })

  it('will not allow castling through pieces', () => {
    const game = new Game('rnbqk1nr/pppp1ppp/8/2b1p3/4P3/8/PPPPBPPP/RNBQK1NR w KQkq - 2 3')

    const move = MoveValidator.validate(new PotentialMove(game.board.board[7][4], game.board.board[7][6]), game)
  
    expect(move.isValid).toBe(false)
    expect(move.isCastle).toBe(false)
    expect(move.isLegal).toBe(false)

  })

  it('will correctly flag legal castling move', () => {
    const game = new Game('rnbqk1nr/ppp2ppp/3p4/2b1p3/4P3/5N2/PPPPBPPP/RNBQK2R w KQkq - 0 4')

    const move = MoveValidator.validate(new PotentialMove(game.board.board[7][4], game.board.board[7][6]), game)

    expect(move.isValid).toBe(true)
    expect(move.isCastle).toBe(true)
    expect(move.isLegal).toBe(true)

    const game2 = new Game('rnbqk2r/pp2nppp/3bp3/2pp4/2PP4/2N1B3/PPQ1PPPP/R3KBNR w KQkq - 4 6')

    const move2 = MoveValidator.validate(new PotentialMove(game2.board.board[7][4], game2.board.board[7][2]), game2)

    expect(move2.isValid).toBe(true)
    expect(move2.isCastle).toBe(true)
    expect(move2.isLegal).toBe(true)

    const game3 = new Game('rnbqk2r/pp2nppp/3bp3/2pp4/2PP4/2N1B3/PPQ1PPPP/2KR1BNR b kq - 5 6')

    const blackKingSideMove = MoveValidator.validate(new PotentialMove(game3.board.board[0][4], game3.board.board[0][6]), game3)

    expect(blackKingSideMove.isValid).toBe(true)
    expect(blackKingSideMove.isCastle).toBe(true)
    expect(blackKingSideMove.isLegal).toBe(true)

    const game4 = new Game('r3kbnr/pppqpppp/2n1b3/3p4/3P4/N1P5/PPQBPPPP/R3KBNR b KQkq - 6 5')

    const blackQueenSideMove = MoveValidator.validate(new PotentialMove(game4.board.board[0][4], game4.board.board[0][2]), game4)

    expect(blackQueenSideMove.isValid).toBe(true)
    expect(blackQueenSideMove.isCastle).toBe(true)
    expect(blackQueenSideMove.isLegal).toBe(true)
  })

  it('will not allow castling if king has moved', () => {
    const game = new Game('2kr2nr/pppqpp1p/2n1b1p1/3p4/3P4/N1P1bNP1/PPQ1PPBP/R3K2R b - - 3 10')

    const illegalMove = MoveValidator.validate(new PotentialMove(game.board.board[7][4], game.board.board[7][6]), game)

    expect(illegalMove.isValid).toBe(false)
    expect(illegalMove.isCastle).toBe(false)
    expect(illegalMove.isLegal).toBe(false)
  })
  // it('will handle check correctly',  () => {
  //   const game = new Game('rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3')
  //   const move =  PotentialMove.getValidatedMoveFromSquares(
  //     game.board.board[7][3],
  //     game.board.board[4][0],
  //     game
  //   )
  //   expect(move.isCheck).toBe(true)
  // })
})
