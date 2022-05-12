import { describe, expect, test } from 'vitest'
import { Queen } from './queen'
import { PieceColor } from '../game'
import { directions } from '../directions'

describe('queen movement', () => {
  test('can move north', () => {
    const queen = new Queen(PieceColor.WHITE)

    for (const payload of directions(queen).north) {
      expect(queen.canMove(payload)).toBe(true)
    }
  })
  test('can move south', () => {
    const queen = new Queen(PieceColor.WHITE)

    for (const payload of directions(queen).south) {
      expect(queen.canMove(payload)).toBe(true)
    }
  })
  test('can move east', () => {
    const queen = new Queen(PieceColor.WHITE)

    for (const payload of directions(queen).east) {
      expect(queen.canMove(payload)).toBe(true)
    }
  })
  test('can move west', () => {
    const queen = new Queen(PieceColor.WHITE)

    for (const payload of directions(queen).west) {
      expect(queen.canMove(payload)).toBe(true)
    }
  })
  test('can move northwest', () => {
    const queen = new Queen(PieceColor.WHITE)

    for (const payload of directions(queen).northWest) {
      expect(queen.canMove(payload)).toBe(true)
    }
  })
  test('can move southwest', () => {
    const queen = new Queen(PieceColor.WHITE)

    for (const payload of directions(queen).southWest) {
      expect(queen.canMove(payload)).toBe(true)
    }
  })
  test('can move northeast', () => {
    const queen = new Queen(PieceColor.WHITE)

    for (const payload of directions(queen).northEast) {
      expect(queen.canMove(payload)).toBe(true)
    }
  })
  test('can move southeast', () => {
    const queen = new Queen(PieceColor.WHITE)

    for (const payload of directions(queen).southEast) {
      expect(queen.canMove(payload)).toBe(true)
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
