import { describe, expect, test } from 'vitest'
import { Pawn } from './pawn'
import { PieceColor } from '../game'
import { Square } from '../board/square'

describe.concurrent('pawn movement', () => {
  test('white pawn only moves in correct direction', () => {
    const pawn = new Pawn(PieceColor.WHITE)
    const startSquare = new Square({ x: 4, y: 6 })

    expect(pawn.canMove(startSquare, new Square({ x: 4, y: 5 }))).toBe(true)
    expect(pawn.canMove(startSquare, new Square({ x: 4, y: 7 }))).toBe(false)
  })
  test('black pawn only moves in correct direction', () => {
    const pawn = new Pawn(PieceColor.BLACK)
    const startSquare = new Square({ x: 4, y: 1 })

    expect(pawn.canMove(startSquare, new Square({ x: 4, y: 2 }))).toBe(true)
    expect(pawn.canMove(startSquare, new Square({ x: 4, y: 0 }))).toBe(false)
  })
  test('white pawn can only move 2 spaces at the start', () => {
    const whitePawn = new Pawn(PieceColor.WHITE)
    expect(
      whitePawn.canMove(new Square({ x: 4, y: 6 }), new Square({ x: 4, y: 4 }))
    ).toBe(true)
    expect(
      whitePawn.canMove(new Square({ x: 4, y: 5 }), new Square({ x: 4, y: 3 }))
    ).toBe(false)
  })
  test('black pawn can only move 2 spaces at the start', () => {
    const blackPawn = new Pawn(PieceColor.BLACK)

    expect(
      blackPawn.canMove(new Square({ x: 4, y: 1 }), new Square({ x: 4, y: 3 }))
    ).toBe(true)
    expect(
      blackPawn.canMove(new Square({ x: 4, y: 2 }), new Square({ x: 4, y: 4 }))
    ).toBe(false)
  })
  test('pawn cannot move into another piece', () => {
    const pawn = new Pawn(PieceColor.WHITE)
    const pawn2 = new Pawn(PieceColor.BLACK)

    expect(
      pawn.canMove(
        new Square({ x: 4, y: 6 }),
        new Square({ x: 4, y: 5 }, pawn2)
      )
    ).toBe(false)
  })
  test('pawn can only attack diagonally', () => {
    const pawn = new Pawn(PieceColor.WHITE)

    expect(
      pawn.canMove(new Square({ x: 4, y: 6 }), new Square({ x: 3, y: 5 }))
    ).toBe(false)
  })
})
