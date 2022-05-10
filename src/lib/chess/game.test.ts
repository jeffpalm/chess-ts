import { describe, expect, it, test } from 'vitest'
import { Game, PieceColor } from './game'
import { MoveValidator, PotentialMove } from './move'
import { Queen } from './pieces/queen'

test('New game creates 16 pieces', () => {
  const game = new Game()

  expect(game.pieces.length).toBe(32)
})

describe.concurrent('game behavior', () => {
  it('alternates turn color', () => {
    const game = new Game()
    let move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[6][4],
      game.board.board[4][4],
      game
    )
    expect(game.turn).toBe(PieceColor.WHITE)
    game.makeMove(move)
    expect(game.turn).toBe(PieceColor.BLACK)
    game.undoMove()
    expect(game.turn).toBe(PieceColor.WHITE)
    game.makeMove(move)
    move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.turn).toBe(PieceColor.WHITE)
  })

  it('alternates half move clock correctly', () => {
    const game = new Game()
    let move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[6][4],
      game.board.board[4][4],
      game
    )
    expect(game.halfMoveClock).toBe(0)
    game.makeMove(move)
    expect(game.halfMoveClock).toBe(1)
    game.undoMove()
    expect(game.halfMoveClock).toBe(0)
    game.makeMove(move)
    move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.halfMoveClock).toBe(0)
  })

  it('increments full move clock correctly', () => {
    const game = new Game()
    let move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[6][4],
      game.board.board[4][4],
      game
    )
    expect(game.fullMoveClock).toBe(1)
    game.makeMove(move)
    expect(game.fullMoveClock).toBe(1)
    game.undoMove()
    expect(game.fullMoveClock).toBe(1)
    game.makeMove(move)
    move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.fullMoveClock).toBe(2)
  })

  it('updates en passant target correctly', () => {
    const game = new Game()
    let move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[6][4],
      game.board.board[4][4],
      game
    )
    game.makeMove(move)
    expect(game.enPassantTarget).toBe('e3')
    move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.enPassantTarget).toBe('e6')
  })

  it('updates move list correctly', () => {
    const game = new Game()
    let move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[6][4],
      game.board.board[4][4],
      game
    )
    game.makeMove(move)
    expect(game.moves.length).toBe(1)
    move = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.moves.length).toBe(2)
    game.undoMove()
    expect(game.moves.length).toBe(1)
    game.undoMove()
    expect(game.moves.length).toBe(0)
  })

  it('determines if move will put enemy king in check', () => {
    const game = new Game('rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3')
    const checkMove = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[7][3],
      game.board.board[4][0],
      game
    )
    expect(game.isMoveCheck(checkMove)).toBe(true)
    const nonCheckMove = PotentialMove.getValidatedMoveFromSquares(
      game.board.board[7][3],
      game.board.board[5][1],
      game
    )
    expect(game.isMoveCheck(nonCheckMove)).toBe(false)
  })
  it('gets active checks', () => {
    const game = new Game('rnbqkbnr/pp2pppp/8/2pp4/Q1PP4/8/PP2PPPP/RNB1KBNR b KQkq - 1 3')

    const activeChecks = game.getActiveChecks()

    expect(activeChecks.length).toBe(1)
    expect(activeChecks[0].names.from).toBe('a4')
    expect(activeChecks[0].names.to).toBe('e8')
  })
  it('toggles king in check correctly', () => {
    const game = new Game('rnbqkbnr/pp2pppp/8/2pp4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq c6 0 3')

    game.makeMove(new PotentialMove(game.board.board[7][3], game.board.board[4][0]))

    expect(game.kingInCheck).toBe(true)
  })
  it('will put king in check', () => {
    const game = new Game('r1bqkbnr/ppp2ppp/2n1p3/3p4/Q1PP1B2/8/PP2PPPP/RN2KBNR b KQkq - 0 1')

    const move = new PotentialMove(game.board.board[2][2], game.board.board[4][1])

    expect(game.willPutKingInCheck(move)).toBe(true)
  })
  it('will handle pinned pieces correctly',  () => {
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
      const move =  new PotentialMove(
        game.board.board[y][x],
        game.board.board[aY][aX],
      )
      const validatedMove = MoveValidator.validate(move, game)
      expect(validatedMove.isLegal).toBe(false)
    }
  })
})

describe.concurrent('perft tests', () => {
  it('perft depth 1', () => {
    const game = new Game()

    expect(game.perft(1)).toBe(20)
  })

  it('perft depth 2', () => {
    const game = new Game()

    expect(game.perft(2)).toBe(400)
  })
  it('perft depth 3', () => {
    const game = new Game()

    expect(game.perft(3)).toBe(8902)
  })
  test('perft depth 4', () => {
    const game = new Game()

    expect(game.perft(4)).toBe(197281)
  })
})
