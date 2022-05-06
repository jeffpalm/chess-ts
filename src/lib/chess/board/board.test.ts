import { describe, expect, it } from 'vitest'
import { Board } from './board'
import { Square } from './square'
import { Game, PieceColor } from '../game'
import { Bishop } from '../pieces/bishop'
import { King } from '../pieces/king'

const defaultPositions = {
  a1: 'R',
  b1: 'N',
  c1: 'B',
  d1: 'Q',
  e1: 'K',
  f1: 'B',
  g1: 'N',
  h1: 'R',
  a2: 'P',
  b2: 'P',
  c2: 'P',
  d2: 'P',
  e2: 'P',
  f2: 'P',
  g2: 'P',
  h2: 'P',
  a3: null,
  b3: null,
  c3: null,
  d3: null,
  e3: null,
  f3: null,
  g3: null,
  h3: null,
  a4: null,
  b4: null,
  c4: null,
  d4: null,
  e4: null,
  f4: null,
  g4: null,
  h4: null,
  a5: null,
  b5: null,
  c5: null,
  d5: null,
  e5: null,
  f5: null,
  g5: null,
  h5: null,
  a6: null,
  b6: null,
  c6: null,
  d6: null,
  e6: null,
  f6: null,
  g6: null,
  h6: null,
  a7: 'p',
  b7: 'p',
  c7: 'p',
  d7: 'p',
  e7: 'p',
  f7: 'p',
  g7: 'p',
  h7: 'p',
  a8: 'r',
  b8: 'n',
  c8: 'b',
  d8: 'q',
  e8: 'k',
  f8: 'b',
  g8: 'n',
  h8: 'r',
}

describe('Square constructors', () => {
  it('Should create a1', () => {
    const square = new Square({ y: 7, x: 0 })
    expect(square.name).toEqual('a1')
    expect(square.rank).toEqual('1')
    expect(square.file).toEqual('a')
    expect(square.color).toEqual(PieceColor.BLACK)
  })
  it('Should create h8', () => {
    const square = new Square({ y: 0, x: 7 })
    expect(square.name).toEqual('h8')
    expect(square.rank).toEqual('8')
    expect(square.file).toEqual('h')
    expect(square.color).toEqual(PieceColor.BLACK)
  })
  it('Should create a8', () => {
    const square = new Square({ y: 0, x: 0 })
    expect(square.name).toEqual('a8')
    expect(square.rank).toEqual('8')
    expect(square.file).toEqual('a')
    expect(square.color).toEqual(PieceColor.WHITE)
  })
  it('Should create h1', () => {
    const square = new Square({ y: 7, x: 7 })
    expect(square.name).toEqual('h1')
    expect(square.rank).toEqual('1')
    expect(square.file).toEqual('h')
    expect(square.color).toEqual(PieceColor.WHITE)
  })
})

it('Pieces are in correct default position', () => {
  const board = new Board()

  for (const row of board.board) {
    for (const square of row) {
      if (square.piece) {
        expect(square.piece.symbol).toEqual(defaultPositions[square.name])
      } else {
        expect(defaultPositions[square.name]).toEqual(null)
      }
    }
  }
})

it('can use custom fen', () => {
  const board = new Board('4k2b/8/8/8/8/8/8/B3K3 w - - 0 1')
  expect(board.board[7][0].piece).toBeInstanceOf(Bishop)
  expect(board.board[0][7].piece).toBeInstanceOf(Bishop)
  expect(board.board[0][4].piece).toBeInstanceOf(King)
  expect(board.board[7][4].piece).toBeInstanceOf(King)
  expect(board.board[0][3].piece).toBeNull()
  expect(board.board[7][3].piece).toBeNull()
})
