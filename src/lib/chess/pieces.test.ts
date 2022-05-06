import { describe, expect, test } from 'vitest'
import { Bishop } from './pieces/bishop'
import { King } from './pieces/king'
import { Queen } from './pieces/queen'
import { Knight } from './pieces/knight'
import { Pawn } from './pieces/pawn'
import { Rook } from './pieces/rook'
import { pieceFromFen } from './fen'
import { PieceColor } from './game'

describe('Pieces class returns correct piece', () => {
  test('Returns white pawn', () => {
    const piece = pieceFromFen('P')
    expect(piece).toBeInstanceOf(Pawn)
    expect(piece?.color).toBe(PieceColor.WHITE)
  })
  test('Returns black pawn', () => {
    const piece = pieceFromFen('p')
    expect(piece).toBeInstanceOf(Pawn)
    expect(piece?.color).toBe(PieceColor.BLACK)
  })
  test('Returns white queen', () => {
    const piece = pieceFromFen('Q')
    expect(piece).toBeInstanceOf(Queen)
    expect(piece?.color).toBe(PieceColor.WHITE)
  })
  test('Returns black queen', () => {
    const piece = pieceFromFen('q')
    expect(piece).toBeInstanceOf(Queen)
    expect(piece?.color).toBe(PieceColor.BLACK)
  })
  test('Returns white king', () => {
    const piece = pieceFromFen('K')
    expect(piece).toBeInstanceOf(King)
    expect(piece?.color).toBe(PieceColor.WHITE)
  })
  test('Returns black king', () => {
    const piece = pieceFromFen('k')
    expect(piece).toBeInstanceOf(King)
    expect(piece?.color).toBe(PieceColor.BLACK)
  })
  test('Returns white bishop', () => {
    const piece = pieceFromFen('B')
    expect(piece).toBeInstanceOf(Bishop)
    expect(piece?.color).toBe(PieceColor.WHITE)
  })
  test('Returns black bishop', () => {
    const piece = pieceFromFen('b')
    expect(piece).toBeInstanceOf(Bishop)
    expect(piece?.color).toBe(PieceColor.BLACK)
  })
  test('Returns white knight', () => {
    const piece = pieceFromFen('N')
    expect(piece).toBeInstanceOf(Knight)
    expect(piece?.color).toBe(PieceColor.WHITE)
  })
  test('Returns black knight', () => {
    const piece = pieceFromFen('n')
    expect(piece).toBeInstanceOf(Knight)
    expect(piece?.color).toBe(PieceColor.BLACK)
  })
  test('Returns white rook', () => {
    const piece = pieceFromFen('R')
    expect(piece).toBeInstanceOf(Rook)
    expect(piece?.color).toBe(PieceColor.WHITE)
  })
  test('Returns black rook', () => {
    const piece = pieceFromFen('r')
    expect(piece).toBeInstanceOf(Rook)
    expect(piece?.color).toBe(PieceColor.BLACK)
  })
})
