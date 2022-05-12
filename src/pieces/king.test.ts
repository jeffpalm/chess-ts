import { describe, expect, test } from 'vitest'
import { King } from './king'
import { PieceColor } from '../game'
import { directions } from '../directions'

describe('king movement', () => {
  test('can move north', () => {
    const king = new King(PieceColor.WHITE)
    let i = 0
    for (const move of directions(king).north) {
      expect(king.canMove(move)).toBe(i < 1)
      i++
    }
  })
  test('can move south', () => {
    const king = new King(PieceColor.WHITE)
    let i = 0
    for (const move of directions(king).south) {
      expect(king.canMove(move)).toBe(i < 1)
      i++
    }
  })
  test('can move east', () => {
    const king = new King(PieceColor.WHITE)
    let i = 0
    for (const move of directions(king).east) {
      expect(king.canMove(move)).toBe(i < 1)
      i++
    }
  })
  test('can move west', () => {
    const king = new King(PieceColor.WHITE)
    let i = 0
    for (const move of directions(king).west) {
      expect(king.canMove(move)).toBe(i < 1)
      i++
    }
  })
  test('can move northwest', () => {
    const king = new King(PieceColor.WHITE)
    let i = 0
    for (const move of directions(king).northWest) {
      expect(king.canMove(move)).toBe(i < 1)
      i++
    }
  })
  test('can move southwest', () => {
    const king = new King(PieceColor.WHITE)
    let i = 0
    for (const move of directions(king).southWest) {
      expect(king.canMove(move)).toBe(i < 1)
      i++
    }
  })
  test('can move northeast', () => {
    const king = new King(PieceColor.WHITE)
    let i = 0
    for (const move of directions(king).northEast) {
      expect(king.canMove(move)).toBe(i < 1)
      i++
    }
  })
  test('can move southeast', () => {
    const king = new King(PieceColor.WHITE)
    let i = 0
    for (const move of directions(king).southEast) {
      expect(king.canMove(move)).toBe(i < 1)
      i++
    }
  })
})
