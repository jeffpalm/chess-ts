import exp from 'constants'
import {describe, test, expect} from 'vitest'
import { Fen } from './fen'
import { Game } from './game'

const basePosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' 

describe('Fen Parsing', () => {
  test('Parses base position', () => {
    const position = Fen.parse(basePosition)
    expect(position[0]).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
    expect(position[1]).toEqual('w')
    expect(position[2]).toEqual('KQkq')
    expect(position[3]).toEqual('-')
    expect(position[4]).toEqual('0')
    expect(position[5]).toEqual('1')
  })

  test('assigns properties in constructor correctly', () => {
    const fen = new Fen(basePosition)
    
    expect(fen.rows.length).toBe(8)
    expect(fen.rowsToString()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
    expect(fen.toString()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    expect(fen.sideToMove).toEqual('w')
    expect(fen.castlingAbility).toEqual('KQkq')
    expect(fen.enPassantTarget).toEqual('-')
    expect(fen.halfMoveClock).toEqual(0)
    expect(fen.fullMoveClock).toEqual(1)
  })

  test('game to fen', () => {
    const game = new Game()
    
    const fen = new Fen(game)

    expect(fen.toString()).toBe(basePosition)
  })

})
