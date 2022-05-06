import {describe, test, expect} from 'vitest'
import { Fen } from './fen'

describe('Fen Parsing', () => {
  test('Parses base position', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const position = Fen.parse(fen)
    expect(position[0]).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
    expect(position[1]).toEqual('w')
    expect(position[2]).toEqual('KQkq')
    expect(position[3]).toEqual('-')
    expect(position[4]).toEqual('0')
    expect(position[5]).toEqual('1')
  })
})