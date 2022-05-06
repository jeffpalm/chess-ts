import { describe, expect, it } from 'vitest'
import { intBetween } from './lib/chess/utils'

describe.concurrent('intBetween tests', () => {
  it('returns positive start/end', () => {
    expect(intBetween(0, 6)).toEqual([1, 2, 3, 4, 5])
  })
  it('returns negative start/end', () => {
    expect(intBetween(6, 0)).toEqual([5, 4, 3, 2, 1])
  })
  it('returns empty array for any distance of 1', () => {
    expect(intBetween(0, 1)).toEqual([])
    expect(intBetween(4, 3)).toEqual([])
    expect(intBetween(0, 0)).toEqual([])
  })
})
