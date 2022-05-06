import { describe, expect, test } from 'vitest'
import { Rook } from './rook'
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

describe('rook movement', function () {
  test('can move north', () => {
    const rook = new Rook(PieceColor.WHITE)
    const start = new Square({ y: 0, x: 0 }, rook)

    for (const square of north) {
      expect(rook.canMove(start, square)).toBe(true)
    }
  })
  test('can move south', () => {
    const rook = new Rook(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })

    for (const square of south) {
      expect(rook.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move east', () => {
    const rook = new Rook(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })

    for (const square of east) {
      expect(rook.canMove(squareOne, square)).toBe(true)
    }
  })
  test('can move west', () => {
    const rook = new Rook(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })

    for (const square of west) {
      expect(rook.canMove(squareOne, square)).toBe(true)
    }
  })
  test('cannot move northwest', () => {
    const rook = new Rook(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 7 })

    for (const square of northWest) {
      expect(rook.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move southwest', () => {
    const rook = new Rook(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 7 })

    for (const square of southWest) {
      expect(rook.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move northeast', () => {
    const rook = new Rook(PieceColor.WHITE)
    const squareOne = new Square({ y: 0, x: 0 })

    for (const square of northEast) {
      expect(rook.canMove(squareOne, square)).toBe(false)
    }
  })
  test('cannot move southeast', () => {
    const rook = new Rook(PieceColor.WHITE)
    const squareOne = new Square({ y: 7, x: 0 })

    for (const square of southEast) {
      expect(rook.canMove(squareOne, square)).toBe(false)
    }
  })
})
