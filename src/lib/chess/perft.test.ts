import { describe, it, expect } from 'vitest'
import { Game } from './game'

describe.concurrent('perft tests', () => {
  it('perft depth 1', () => {
    const game = new Game()

    expect(game.perft(1)).toBe(20)
  })

  it('perft depth 2', () => {
    const game = new Game()

    expect(game.perft(2)).toBe(400)
  })
  it('perft depth 3', () => {
    const game = new Game()

    expect(game.perft(3)).toBe(8902)
  })
  it('perft depth 4', () => {
    const game = new Game()
  
    expect(game.perft(4)).toBe(197281)
  })
})
