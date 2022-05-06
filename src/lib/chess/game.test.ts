import { describe, expect, it, test } from 'vitest'
import { Game, PieceColor } from './game'
import { Move } from './move'

test('New game creates 16 pieces', () => {
  const game = new Game()

  expect(game.pieces.length).toBe(32)
})

describe.concurrent('game behavior', () => {
  it('alternates turn color', async () => {
    const game = new Game()
    let move = await Move.getValidatedMove(
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
    move = await Move.getValidatedMove(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.turn).toBe(PieceColor.WHITE)
  })

  it('alternates half move clock correctly', async () => {
    const game = new Game()
    let move = await Move.getValidatedMove(
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
    move = await Move.getValidatedMove(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.halfMoveClock).toBe(0)
  })

  it('increments full move clock correctly', async () => {
    const game = new Game()
    let move = await Move.getValidatedMove(
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
    move = await Move.getValidatedMove(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.fullMoveClock).toBe(2)
  })

  it('updates en passant target correctly', async () => {
    const game = new Game()
    let move = await Move.getValidatedMove(
      game.board.board[6][4],
      game.board.board[4][4],
      game
    )
    game.makeMove(move)
    expect(game.enPassantTarget).toBe('e3')
    move = await Move.getValidatedMove(
      game.board.board[1][4],
      game.board.board[3][4],
      game
    )
    game.makeMove(move)
    expect(game.enPassantTarget).toBe('e6')
  })
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
  test('perft depth 4', async () => {
    const game = new Game()

    expect(await game.perft(4)).toBe(197281)
  })
})
