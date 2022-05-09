import { describe, expect, it, test } from 'vitest'
import { Game, PieceColor } from './game'
import { PotentialMove } from './move'

test('New game creates 16 pieces', () => {
  const game = new Game()

  expect(game.pieces.length).toBe(32)
})

describe.concurrent('game behavior', () => {
  it('alternates turn color', async () => {
    const game = new Game()
    let move = await PotentialMove.getValidatedMoveFromSquares(
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
    move = await PotentialMove.getValidatedMoveFromSquares(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.turn).toBe(PieceColor.WHITE)
  })

  it('alternates half move clock correctly', async () => {
    const game = new Game()
    let move = await PotentialMove.getValidatedMoveFromSquares(
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
    move = await PotentialMove.getValidatedMoveFromSquares(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.halfMoveClock).toBe(0)
  })

  it('increments full move clock correctly', async () => {
    const game = new Game()
    let move = await PotentialMove.getValidatedMoveFromSquares(
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
    move = await PotentialMove.getValidatedMoveFromSquares(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.fullMoveClock).toBe(2)
  })

  it('updates en passant target correctly', async () => {
    const game = new Game()
    let move = await PotentialMove.getValidatedMoveFromSquares(
      game.board.board[6][4],
      game.board.board[4][4],
      game
    )
    game.makeMove(move)
    expect(game.enPassantTarget).toBe('e3')
    move = await PotentialMove.getValidatedMoveFromSquares(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.enPassantTarget).toBe('e6')
  })

  it('updates move list correctly', async () => {
    const game = new Game()
    let move = await PotentialMove.getValidatedMoveFromSquares(
      game.board.board[6][4],
      game.board.board[4][4],
      game
    )
    game.makeMove(move)
    expect(game.moves.length).toBe(1)
    move = await PotentialMove.getValidatedMoveFromSquares(
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

  it('determines if move will put enemy king in check', async () => {
    const game = new Game('rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3')
    const checkMove = await PotentialMove.getValidatedMoveFromSquares(
      game.board.board[7][3],
      game.board.board[4][0],
      game
    )
    expect(await game.isMoveCheck(checkMove)).toBe(true)
    const nonCheckMove = await PotentialMove.getValidatedMoveFromSquares(
      game.board.board[7][3],
      game.board.board[5][1],
      game
    )
    expect(await game.isMoveCheck(nonCheckMove)).toBe(false)
  })
  // it('will handle pinned pieces correctly', async () => {
  //   const pinnedKnight = {
  //     fen: 'r1bqkbnr/ppp2ppp/2n1p3/3p4/Q1PP1B2/8/PP2PPPP/RN2KBNR b KQkq - 0 1',
  //     pinnedPosition: {
  //       x: 2,
  //       y: 2,
  //     },
  //     attempt: {
  //       x: 1,
  //       y: 4,
  //     },
  //   }
  //   const scenarios = [pinnedKnight]
  //
  //   for (const {
  //     fen,
  //     pinnedPosition: { x, y },
  //     attempt: { x: aX, y: aY },
  //   } of scenarios) {
  //     const game = new Game(fen)
  //     const move = await Move.getValidatedMove(
  //       game.board.board[y][x],
  //       game.board.board[aY][aX],
  //       game
  //     )
  //     expect(move.isValid).toBe(false)
  //   }
  // })
})

describe.concurrent('perft tests', () => {
  it('perft depth 1', async () => {
    const game = new Game()

    expect(await game.perft(1)).toBe(20)
  })

  it('perft depth 2', async () => {
    const game = new Game()

    expect(await game.perft(2)).toBe(400)
  })
  it('perft depth 3', async () => {
    const game = new Game()

    expect(await game.perft(3)).toBe(8902)
  })
  // test('perft depth 4', async () => {
  //   const game = new Game()
  //
  //   expect(await game.perft(4)).toBe(197281)
  // })
})
