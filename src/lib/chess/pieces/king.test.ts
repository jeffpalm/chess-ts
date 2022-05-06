import { describe, expect, test } from 'vitest'
import { King } from './king'
import { PieceColor } from '../game'
import { Square } from '../board/square'
import { Pawn } from './pawn'
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

describe('king movement', () => {
  test('can move north', () => {
    const king = new King(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })
    let i = 0
    for (const square of north) {
      expect(king.canMove(squareOne, square)).toBe(i < 1)
      i++
    }
  })
  test('can move south', () => {
    const king = new King(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })
    let i = 0
    for (const square of south) {
      expect(king.canMove(squareOne, square)).toBe(i < 1)
      i++
    }
  })
  test('can move east', () => {
    const king = new King(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })
    let i = 0
    for (const square of east) {
      expect(king.canMove(squareOne, square)).toBe(i < 1)
      i++
    }
  })
  test('can move west', () => {
    const king = new King(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })
    let i = 0
    for (const square of west) {
      expect(king.canMove(squareOne, square)).toBe(i < 1)
      i++
    }
  })
  test('can move northwest', () => {
    const king = new King(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })
    let i = 0
    for (const square of northWest) {
      expect(king.canMove(squareOne, square)).toBe(i < 1)
      i++
    }
  })
  test('can move southwest', () => {
    const king = new King(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 7 })
    let i = 0
    for (const square of southWest) {
      expect(king.canMove(squareOne, square)).toBe(i < 1)
      i++
    }
  })
  test('can move northeast', () => {
    const king = new King(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })
    let i = 0
    for (const square of northEast) {
      expect(king.canMove(squareOne, square)).toBe(i < 1)
      i++
    }
  })
  test('can move southeast', () => {
    const king = new King(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })
    let i = 0
    for (const square of southEast) {
      expect(king.canMove(squareOne, square)).toBe(i < 1)
      i++
    }
  })
  // test('cannot move to same square', () => {
  //   const king = new King(PieceColor.WHITE)
  //   const squareOne = new Square({ y: 7, x: 0 }, king)
  //
  //   expect(king.canMove(squareOne, squareOne)).toBe(false)
  // })
  // test('cannot move to square with same color piece', () => {
  //   const king = new King(PieceColor.WHITE)
  //   const pawn = new Pawn(PieceColor.WHITE)
  //   const squareOne = new Square({ y: 0, x: 0 }, king)
  //   const squareTwo = new Square({ y: 1, x: 0 }, pawn)
  //   expect(king.canMove(squareOne, squareTwo)).toBe(false)
  // })
  test('cannot make illegal moves', () => {
    const king = new King(PieceColor.WHITE)
    const kingsSquare = new Square({ y: 4, x: 4 }, king)
    expect(king.canMove(kingsSquare, new Square({ y: 6, x: 5 }))).toBe(false)
  })
})
