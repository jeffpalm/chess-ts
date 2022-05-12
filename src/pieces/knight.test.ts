import { describe, expect, test } from 'vitest'
import { Knight } from './knight'
import { PieceColor } from '../game'
import { Square } from '../board/square'
import { directions } from '../directions'
import { PotentialMove } from '../move'

describe('knight movement', function () {
  test('cannot move north', () => {
    const knight = new Knight(PieceColor.WHITE)

    for (const payload of directions(knight).north) {
      expect(knight.canMove(payload)).toBe(false)
    }
  })
  test('cannot move south', () => {
    const knight = new Knight(PieceColor.WHITE)

    for (const payload of directions(knight).south) {
      expect(knight.canMove(payload)).toBe(false)
    }
  })
  test('cannot move east', () => {
    const knight = new Knight(PieceColor.WHITE)

    for (const payload of directions(knight).east) {
      expect(knight.canMove(payload)).toBe(false)
    }
  })
  test('cannot move west', () => {
    const knight = new Knight(PieceColor.WHITE)

    for (const payload of directions(knight).west) {
      expect(knight.canMove(payload)).toBe(false)
    }
  })
  test('cannot move northwest', () => {
    const knight = new Knight(PieceColor.WHITE)

    for (const payload of directions(knight).northWest) {
      expect(knight.canMove(payload)).toBe(false)
    }
  })
  test('cannot move southwest', () => {
    const knight = new Knight(PieceColor.WHITE)

    for (const payload of directions(knight).southWest) {
      expect(knight.canMove(payload)).toBe(false)
    }
  })
  test('cannot move northeast', () => {
    const knight = new Knight(PieceColor.WHITE)

    for (const payload of directions(knight).northEast) {
      expect(knight.canMove(payload)).toBe(false)
    }
  })
  test('cannot move southeast', () => {
    const knight = new Knight(PieceColor.WHITE)

    for (const payload of directions(knight).southEast) {
      expect(knight.canMove(payload)).toBe(false)
    }
  })
  test('can move like a knight 1', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    const squareTwo = new Square({ y: 6, x: 5 })
    const move = new PotentialMove({
      piece: knight,
      coords: {
        from: squareOne.position,
        to: squareTwo.position,
      },
      names: {
        from: squareOne.name,
        to: squareTwo.name,
      },
      capture: null,
    })
    expect(knight.canMove(move)).toBe(true)
  })
  test('can move like a knight 2', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    const squareTwo = new Square({ y: 6, x: 3 })
    const move = new PotentialMove({
      piece: knight,
      coords: {
        from: squareOne.position,
        to: squareTwo.position,
      },
      names: {
        from: squareOne.name,
        to: squareTwo.name,
      },
      capture: null,
    })
    expect(knight.canMove(move)).toBe(true)
  })
  test('can move like a knight 3', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    const squareTwo = new Square({ y: 5, x: 6 })
    const move = new PotentialMove({
      piece: knight,
      coords: {
        from: squareOne.position,
        to: squareTwo.position,
      },
      names: {
        from: squareOne.name,
        to: squareTwo.name,
      },
      capture: null,
    })
    expect(knight.canMove(move)).toBe(true)
  })
  test('can move like a knight 4', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    const squareTwo = new Square({ y: 5, x: 2 })
    const move = new PotentialMove({
      piece: knight,
      coords: {
        from: squareOne.position,
        to: squareTwo.position,
      },
      names: {
        from: squareOne.name,
        to: squareTwo.name,
      },
      capture: null,
    })
    expect(knight.canMove(move)).toBe(true)
  })
  test('can move like a knight 5', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    const squareTwo = new Square({ y: 3, x: 6 })
    const move = new PotentialMove({
      piece: knight,
      coords: {
        from: squareOne.position,
        to: squareTwo.position,
      },
      names: {
        from: squareOne.name,
        to: squareTwo.name,
      },
      capture: null,
    })
    expect(knight.canMove(move)).toBe(true)
  })
  test('can move like a knight 6', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    const squareTwo = new Square({ y: 3, x: 2 })
    const move = new PotentialMove({
      piece: knight,
      coords: {
        from: squareOne.position,
        to: squareTwo.position,
      },
      names: {
        from: squareOne.name,
        to: squareTwo.name,
      },
      capture: null,
    })
    expect(knight.canMove(move)).toBe(true)
  })
  test('can move like a knight 7', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    const squareTwo = new Square({ y: 2, x: 5 })
    const move = new PotentialMove({
      piece: knight,
      coords: {
        from: squareOne.position,
        to: squareTwo.position,
      },
      names: {
        from: squareOne.name,
        to: squareTwo.name,
      },
      capture: null,
    })
    expect(knight.canMove(move)).toBe(true)
  })
  test('can move like a knight 8', () => {
    const knight = new Knight(PieceColor.WHITE)
    const squareOne = new Square({ y: 4, x: 4 })
    const squareTwo = new Square({ y: 2, x: 3 })
    const move = new PotentialMove({
      piece: knight,
      coords: {
        from: squareOne.position,
        to: squareTwo.position,
      },
      names: {
        from: squareOne.name,
        to: squareTwo.name,
      },
      capture: null,
    })
    expect(knight.canMove(move)).toBe(true)
  })
})
