import { describe, expect, test } from 'vitest'
import { Queen } from './queen'
import { PieceColor } from '../game'
import { Square } from '../board/square'
import {
  east,
  north,
  northEast,
  northWest,
  south,
  southEast,
  southWest,
  west,
} from '../directions'

describe('queen movement', () => {
  test('can move north', () => {
    const queen = new Queen(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })

    for (const square of north) {
      expect(queen.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move south', () => {
    const queen = new Queen(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })

    for (const square of south) {
      expect(queen.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move east', () => {
    const queen = new Queen(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })

    for (const square of east) {
      expect(queen.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move west', () => {
    const queen = new Queen(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })

    for (const square of west) {
      expect(queen.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move northwest', () => {
    const queen = new Queen(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })

    for (const square of northWest) {
      expect(queen.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move southwest', () => {
    const queen = new Queen(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 7 })

    for (const square of southWest) {
      expect(queen.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move northeast', () => {
    const queen = new Queen(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })

    for (const square of northEast) {
      expect(queen.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move southeast', () => {
    const queen = new Queen(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })

    for (const square of southEast) {
      expect(queen.canMove(squareOne, square)).toBe(true)
    }
  })
  // test('cannot move to same square', () => {
  //   const queen = new Queen(PieceColor.WHITE)
  //   const squareOne = new Square({ y: 7, x: 0 }, queen)
  //
  //   expect(queen.canMove(squareOne, squareOne)).toBe(false)
  // })
  // test('cannot move to square with same color piece', () => {
  //   const queen = new Queen(PieceColor.WHITE)
  //   const pawn = new Pawn(PieceColor.WHITE)
  //   const squareOne = new Square({ y: 0, x: 0 }, queen)
  //   const squareTwo = new Square({ y: 1, x: 0 }, pawn)
  //   expect(queen.canMove(squareOne, squareTwo)).toBe(false)
  // })
  // test('cannot make illegal moves', () => {
  //   const queen = new Queen(PieceColor.WHITE)
  //   const queensSquare = new Square({ y: 4, x: 4 }, queen)
  //   expect(queen.canMove(queensSquare, new Square({ y: 6, x: 5 }))).toBe(false)
  // })
})
