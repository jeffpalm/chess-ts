import { describe, expect, test } from 'vitest'
import { Bishop } from './bishop'
import { PieceColor } from '../game'
import { directions } from '../directions'

describe('bishop movement', function () {
  test('cannot move north', () => {
    const bishop = new Bishop(PieceColor.WHITE)

    for (const payload of directions(bishop).north) {
      expect(bishop.canMove(payload)).toBe(false)
    }
  })
  test('cannot move south', () => {
    const bishop = new Bishop(PieceColor.WHITE)

    for (const payload of directions(bishop).south) {
      expect(bishop.canMove(payload)).toBe(false)
    }
  })
  test('cannot move east', () => {
    const bishop = new Bishop(PieceColor.WHITE)

    for (const payload of directions(bishop).east) {
      expect(bishop.canMove(payload)).toBe(false)
    }
  })
  test('cannot move west', () => {
    const bishop = new Bishop(PieceColor.WHITE)

    for (const payload of directions(bishop).west) {
      expect(bishop.canMove(payload)).toBe(false)
    }
  })
  test('can move northwest', () => {
    const bishop = new Bishop(PieceColor.WHITE)

    for (const payload of directions(bishop).northWest) {
      expect(bishop.canMove(payload)).toBe(true)
    }
  })
  test('can move southwest', () => {
    const bishop = new Bishop(PieceColor.WHITE)

    for (const payload of directions(bishop).southWest) {
      expect(bishop.canMove(payload)).toBe(true)
    }
  })
  test('can move northeast', () => {
    const bishop = new Bishop(PieceColor.WHITE)

    for (const payload of directions(bishop).northEast) {
      expect(bishop.canMove(payload)).toBe(true)
    }
  })
  test('can move southeast', () => {
    const bishop = new Bishop(PieceColor.WHITE)

    for (const payload of directions(bishop).southEast) {
      expect(bishop.canMove(payload)).toBe(true)
    }
  })
})
