import { describe, expect, test } from 'vitest'
import { Pawn } from './pawn'
import { PieceColor } from '../game'
import { Square } from '../board/square'
import { PotentialMove } from '../move'

describe.concurrent('pawn movement', () => {
  test('white pawn only moves in correct direction', () => {
    const pawn = new Pawn(PieceColor.WHITE)
    const startSquare = new Square({ x: 4, y: 6 })
    const forwardMove = new PotentialMove({
      coords: {
        from: startSquare.position,
        to: {
          x: 4,
          y: 5,
        },
      },
      names: {
        from: startSquare.name,
        to: 'e3',
      },
      piece: pawn,
      capture: null,
    })
    const backwardMove = new PotentialMove({
      coords: {
        from: startSquare.position,
        to: {
          x: 4,
          y: 7,
        },
      },
      names: {
        from: startSquare.name,
        to: 'e1',
      },
      piece: pawn,
      capture: null,
    })

    expect(pawn.canMove(forwardMove)).toBe(true)
    expect(pawn.canMove(backwardMove)).toBe(false)
  })
  test('black pawn only moves in correct direction', () => {
    const pawn = new Pawn(PieceColor.BLACK)
    const startSquare = new Square({ x: 4, y: 1 })

    const forwardMove = new PotentialMove({
      coords: {
        from: startSquare.position,
        to: {
          x: 4,
          y: 2,
        },
      },
      names: {
        from: startSquare.name,
        to: 'e6',
      },
      piece: pawn,
      capture: null,
    })
    const backwardMove = new PotentialMove({
      coords: {
        from: startSquare.position,
        to: {
          x: 4,
          y: 0,
        },
      },
      names: {
        from: startSquare.name,
        to: 'e8',
      },
      piece: pawn,
      capture: null,
    })
    expect(pawn.canMove(forwardMove)).toBe(true)
    expect(pawn.canMove(backwardMove)).toBe(false)
  })
  test('white pawn can only move 2 spaces at the start', () => {
    const whitePawn = new Pawn(PieceColor.WHITE)
    const legalMove = new PotentialMove({
      coords: {
        from: { x: 4, y: 6 },
        to: { x: 4, y: 4 },
      },
      names: {
        from: 'e2',
        to: 'e4',
      },
      piece: whitePawn,
      capture: null,
    })
    const illegalMove = new PotentialMove({
      coords: {
        from: { x: 4, y: 5 },
        to: { x: 4, y: 3 },
      },
      names: {
        from: 'e3',
        to: 'e5',
      },
      piece: whitePawn,
      capture: null,
    })
    expect(whitePawn.canMove(legalMove)).toBe(true)
    expect(whitePawn.canMove(illegalMove)).toBe(false)
  })
  test('black pawn can only move 2 spaces at the start', () => {
    const blackPawn = new Pawn(PieceColor.BLACK)
    const legalMove = new PotentialMove({
      coords: {
        from: { x: 4, y: 1 },
        to: { x: 4, y: 3 },
      },
      names: {
        from: 'e7',
        to: 'e5',
      },
      piece: blackPawn,
      capture: null,
    })
    const illegalMove = new PotentialMove({
      coords: {
        from: { x: 4, y: 2 },
        to: { x: 4, y: 4 },
      },
      names: {
        from: 'e6',
        to: 'e4',
      },
      piece: blackPawn,
      capture: null,
    })

    expect(blackPawn.canMove(legalMove)).toBe(true)
    expect(blackPawn.canMove(illegalMove)).toBe(false)
  })
  test('pawn cannot move into another piece', () => {
    const pawn = new Pawn(PieceColor.WHITE)
    const pawn2 = new Pawn(PieceColor.BLACK)
    const move = new PotentialMove({
      coords: {
        from: { x: 4, y: 6 },
        to: { x: 4, y: 5 },
      },
      names: {
        from: 'e2',
        to: 'e3',
      },
      piece: pawn,
      capture: pawn2,
    })

    expect(pawn.canMove(move)).toBe(false)
  })
  test('pawn can only attack diagonally', () => {
    const pawn = new Pawn(PieceColor.WHITE)
    const pawn2 = new Pawn(PieceColor.BLACK)

    const legalMove = new PotentialMove({
      coords: {
        from: { x: 4, y: 6 },
        to: { x: 3, y: 5 },
      },
      names: {
        from: 'e2',
        to: 'd3',
      },
      piece: pawn,
      capture: pawn2,
    })
    const illegalMove = new PotentialMove({
      coords: {
        from: { x: 4, y: 6 },
        to: { x: 3, y: 5 },
      },
      names: {
        from: 'e2',
        to: 'd3',
      },
      piece: pawn,
      capture: null,
    })
    expect(pawn.canMove(illegalMove)).toBe(false)
    expect(pawn.canMove(legalMove)).toBe(true)
  })
})
