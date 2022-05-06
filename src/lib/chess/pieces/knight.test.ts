import { describe, expect, test } from 'vitest'
import { Knight } from './knight'
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
import { Queen } from './queen'

describe('knight movement', function () {
  test('cannnot move north', () => {
    const knight = new Knight(PieceColor.WHITE)
    const start = new Square({ y: 0, x: 0 }, knight)

    for (const square of north) {
      expect(knight.canMove(start, square)).toBe(false)
    }
  })
  test('cannot move south', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })

    for (const square of south) {
      expect(knight.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move east', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })

    for (const square of east) {
      expect(knight.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move west', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })

    for (const square of west) {
      expect(knight.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move northwest', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })

    for (const square of northWest) {
      expect(knight.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move southwest', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 7 })

    for (const square of southWest) {
      expect(knight.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move northeast', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })

    for (const square of northEast) {
      expect(knight.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move southeast', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })

    for (const square of southEast) {
      expect(knight.canMove(squareOne, square)).toBe(false)
    }
  })
  test('can move like a knight 1', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    expect(knight.canMove(squareOne, new Square({ y: 6, x: 5 })))
  })
  test('can move like a knight 2', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    expect(knight.canMove(squareOne, new Square({ y: 6, x: 3 })))
  })
  test('can move like a knight 3', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    expect(knight.canMove(squareOne, new Square({ y: 5, x: 6 })))
  })
  test('can move like a knight 4', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    expect(knight.canMove(squareOne, new Square({ y: 5, x: 2 })))
  })
  test('can move like a knight 5', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    expect(knight.canMove(squareOne, new Square({ y: 3, x: 6 })))
  })
  test('can move like a knight 6', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    expect(knight.canMove(squareOne, new Square({ y: 3, x: 2 })))
  })
  test('can move like a knight 7', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    expect(knight.canMove(squareOne, new Square({ y: 2, x: 5 })))
  })
  test('can move like a knight 8', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    expect(knight.canMove(squareOne, new Square({ y: 2, x: 3 })))
  })
})
