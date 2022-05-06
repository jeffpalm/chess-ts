import { describe, expect, test } from 'vitest'
import { Bishop } from './bishop'
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

describe('bishop movement', function () {
  test('cannot move north', () => {
    const bishop = new Bishop(PieceColor.WHITE)
    const start = new Square({ y: 0, x: 0 }, bishop)

    for (const square of north) {
      expect(bishop.canMove(start, square)).toBe(false)
    }
  })
  test('cannot move south', () => {
    const bishop = new Bishop(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })

    for (const square of south) {
      expect(bishop.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move east', () => {
    const bishop = new Bishop(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })

    for (const square of east) {
      expect(bishop.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move west', () => {
    const bishop = new Bishop(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })

    for (const square of west) {
      expect(bishop.canMove(squareOne, square)).toBe(false)
    }
  })
  test('can move northwest', () => {
    const bishop = new Bishop(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })

    for (const square of northWest) {
      expect(bishop.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move southwest', () => {
    const bishop = new Bishop(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 7 })

    for (const square of southWest) {
      expect(bishop.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move northeast', () => {
    const bishop = new Bishop(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })

    for (const square of northEast) {
      expect(bishop.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move southeast', () => {
    const bishop = new Bishop(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })

    for (const square of southEast) {
      expect(bishop.canMove(squareOne, square)).toBe(true)
    }
  })
})
