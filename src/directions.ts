import { PotentialMove } from './move'
import { IPiece } from './pieces/piece'
import { SquareName, SquarePosition } from './board/board'

type CardinalDirection =
  | 'north'
  | 'northEast'
  | 'east'
  | 'southEast'
  | 'south'
  | 'southWest'
  | 'west'
  | 'northWest'

type Directions = {
  [key in CardinalDirection]: PotentialMove[]
}

type StartSquares = {
  [key in CardinalDirection]: SquarePosition & {
    name: SquareName
  }
}

export const startSquares: StartSquares = {
  north: {
    x: 0,
    y: 7,
    name: 'a1',
  },
  northEast: {
    x: 0,
    y: 7,
    name: 'a1',
  },
  east: {
    x: 0,
    y: 0,
    name: 'a8',
  },
  southEast: {
    x: 0,
    y: 0,
    name: 'a8',
  },
  south: {
    x: 0,
    y: 0,
    name: 'a8',
  },
  southWest: {
    x: 7,
    y: 0,
    name: 'h8',
  },
  west: {
    x: 7,
    y: 0,
    name: 'h8',
  },
  northWest: {
    x: 7,
    y: 7,
    name: 'h1',
  },
}

export const directions = (piece: IPiece): Directions => ({
  north: [
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.north,
        to: {
          x: 0,
          y: 6,
        },
      },
      names: {
        from: startSquares.north.name,
        to: 'a2',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.north,
        to: {
          x: 0,
          y: 4,
        },
      },
      names: {
        from: startSquares.north.name,
        to: 'a4',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.north,
        to: {
          x: 0,
          y: 0,
        },
      },
      names: {
        from: startSquares.north.name,
        to: 'a8',
      },
    }),
  ],
  northEast: [
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.northEast,
        to: {
          x: 1,
          y: 6,
        },
      },
      names: {
        from: startSquares.northEast.name,
        to: 'b2',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.northEast,
        to: {
          x: 3,
          y: 4,
        },
      },
      names: {
        from: startSquares.northEast.name,
        to: 'd4',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.northEast,
        to: {
          x: 7,
          y: 0,
        },
      },
      names: {
        from: startSquares.northEast.name,
        to: 'h8',
      },
    }),
  ],
  east: [
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.east,
        to: {
          x: 1,
          y: 0,
        },
      },
      names: {
        from: startSquares.east.name,
        to: 'b8',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.east,
        to: {
          x: 3,
          y: 0,
        },
      },
      names: {
        from: startSquares.east.name,
        to: 'd8',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.east,
        to: {
          x: 7,
          y: 0,
        },
      },
      names: {
        from: startSquares.east.name,
        to: 'h8',
      },
    }),
  ],
  southEast: [
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.southEast,
        to: {
          x: 1,
          y: 1,
        },
      },
      names: {
        from: startSquares.southEast.name,
        to: 'b7',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.southEast,
        to: {
          x: 3,
          y: 3,
        },
      },
      names: {
        from: startSquares.southEast.name,
        to: 'd5',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.southEast,
        to: {
          x: 7,
          y: 7,
        },
      },
      names: {
        from: startSquares.southEast.name,
        to: 'h1',
      },
    }),
  ],
  south: [
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.south,
        to: {
          x: 0,
          y: 1,
        },
      },
      names: {
        from: startSquares.south.name,
        to: 'a7',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.south,
        to: {
          x: 0,
          y: 4,
        },
      },
      names: {
        from: startSquares.south.name,
        to: 'a4',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.south,
        to: {
          x: 0,
          y: 7,
        },
      },
      names: {
        from: startSquares.south.name,
        to: 'a1',
      },
    }),
  ],
  southWest: [
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.southWest,
        to: {
          x: 6,
          y: 1,
        },
      },
      names: {
        from: startSquares.southWest.name,
        to: 'g7',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.southWest,
        to: {
          x: 4,
          y: 3,
        },
      },
      names: {
        from: startSquares.southWest.name,
        to: 'e5',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.southWest,
        to: {
          x: 0,
          y: 7,
        },
      },
      names: {
        from: startSquares.southWest.name,
        to: 'a1',
      },
    }),
  ],
  west: [
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.west,
        to: {
          x: 6,
          y: 0,
        },
      },
      names: {
        from: startSquares.west.name,
        to: 'g8',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.west,
        to: {
          x: 4,
          y: 0,
        },
      },
      names: {
        from: startSquares.west.name,
        to: 'e8',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.west,
        to: {
          x: 0,
          y: 0,
        },
      },
      names: {
        from: startSquares.west.name,
        to: 'a8',
      },
    }),
  ],
  northWest: [
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.northWest,
        to: {
          x: 6,
          y: 6,
        },
      },
      names: {
        from: startSquares.northWest.name,
        to: 'g2',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.northWest,
        to: {
          x: 4,
          y: 4,
        },
      },
      names: {
        from: startSquares.northWest.name,
        to: 'e4',
      },
    }),
    new PotentialMove({
      capture: null,
      piece,
      coords: {
        from: startSquares.northWest,
        to: {
          x: 0,
          y: 0,
        },
      },
      names: {
        from: startSquares.northWest.name,
        to: 'a8',
      },
    }),
  ],
})
