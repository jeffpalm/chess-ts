import { describe, expect, test } from 'vitest'
import { Rook } from './rook'
import { PieceColor } from '../game'
import { directions } from '../directions'

describe('rook movement', function () {
  test('can move north', () => {
    const rook = new Rook(PieceColor.WHITE)

    for (const payload of directions(rook).north) {
      expect(rook.canMove(payload)).toBe(true)
    }
  })
  test('can move south', () => {
    const rook = new Rook(PieceColor.WHITE)

    for (const payload of directions(rook).south) {
      expect(rook.canMove(payload)).toBe(true)
    }
  })
  test('can move east', () => {
    const rook = new Rook(PieceColor.WHITE)

    for (const payload of directions(rook).east) {
      expect(rook.canMove(payload)).toBe(true)
    }
  })
  test('can move west', () => {
    const rook = new Rook(PieceColor.WHITE)

    for (const payload of directions(rook).west) {
      expect(rook.canMove(payload)).toBe(true)
    }
  })
  test('cannot move northwest', () => {
    const rook = new Rook(PieceColor.WHITE)

    for (const payload of directions(rook).northWest) {
      expect(rook.canMove(payload)).toBe(false)
    }
  })
  test('cannot move southwest', () => {
    const rook = new Rook(PieceColor.WHITE)

    for (const payload of directions(rook).southWest) {
      expect(rook.canMove(payload)).toBe(false)
    }
  })
  test('cannot move northeast', () => {
    const rook = new Rook(PieceColor.WHITE)

    for (const payload of directions(rook).northEast) {
      expect(rook.canMove(payload)).toBe(false)
    }
  })
  test('cannot move southeast', () => {
    const rook = new Rook(PieceColor.WHITE)

    for (const payload of directions(rook).southEast) {
      expect(rook.canMove(payload)).toBe(false)
    }
  })
})
