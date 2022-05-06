import { Square } from './board/square'

export const north: Square[] = [
  new Square({ y: 0, x: 1 }),
  new Square({ y: 0, x: 2 }),
  new Square({ y: 0, x: 3 }),
  new Square({ y: 0, x: 4 }),
  new Square({ y: 0, x: 5 }),
  new Square({ y: 0, x: 6 }),
  new Square({ y: 0, x: 7 }),
]
export const south: Square[] = [
  new Square({ y: 0, x: 6 }),
  new Square({ y: 0, x: 5 }),
  new Square({ y: 0, x: 4 }),
  new Square({ y: 0, x: 3 }),
  new Square({ y: 0, x: 2 }),
  new Square({ y: 0, x: 1 }),
  new Square({ y: 0, x: 0 }),
]
export const east: Square[] = [
  new Square({ y: 1, x: 0 }),
  new Square({ y: 2, x: 0 }),
  new Square({ y: 3, x: 0 }),
  new Square({ y: 4, x: 0 }),
  new Square({ y: 5, x: 0 }),
  new Square({ y: 6, x: 0 }),
  new Square({ y: 7, x: 0 }),
]
export const west: Square[] = [
  new Square({ y: 6, x: 0 }),
  new Square({ y: 5, x: 0 }),
  new Square({ y: 4, x: 0 }),
  new Square({ y: 3, x: 0 }),
  new Square({ y: 2, x: 0 }),
  new Square({ y: 1, x: 0 }),
  new Square({ y: 0, x: 0 }),
]
export const northEast: Square[] = [
  new Square({ y: 1, x: 1 }),
  new Square({ y: 2, x: 2 }),
  new Square({ y: 3, x: 3 }),
  new Square({ y: 4, x: 4 }),
  new Square({ y: 5, x: 5 }),
  new Square({ y: 6, x: 6 }),
  new Square({ y: 7, x: 7 }),
]
export const northWest: Square[] = [
  new Square({ y: 1, x: 6 }),
  new Square({ y: 2, x: 5 }),
  new Square({ y: 3, x: 4 }),
  new Square({ y: 4, x: 3 }),
  new Square({ y: 5, x: 2 }),
  new Square({ y: 6, x: 1 }),
  new Square({ y: 7, x: 0 }),
]
export const southEast: Square[] = [
  new Square({ y: 6, x: 1 }),
  new Square({ y: 5, x: 2 }),
  new Square({ y: 4, x: 3 }),
  new Square({ y: 3, x: 4 }),
  new Square({ y: 2, x: 5 }),
  new Square({ y: 1, x: 6 }),
  new Square({ y: 0, x: 7 }),
]
export const southWest: Square[] = [
  new Square({ y: 6, x: 6 }),
  new Square({ y: 5, x: 5 }),
  new Square({ y: 4, x: 4 }),
  new Square({ y: 3, x: 3 }),
  new Square({ y: 2, x: 2 }),
  new Square({ y: 1, x: 1 }),
  new Square({ y: 0, x: 0 }),
]
