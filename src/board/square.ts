import { File, Rank } from '../game'
import { SquareName, SquarePosition } from './board'
import { IPiece } from '../pieces/piece'

enum SquareColor {
  LIGHT,
  DARK,
}

const squareNameByPosition: SquareName[][] = [
  ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
  ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
  ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
  ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
  ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
  ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
  ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
]
const squareColorByPosition: SquareColor[][] = [
  [
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
  ],
  [
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
  ],
  [
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
  ],
  [
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
  ],
  [
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
  ],
  [
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
  ],
  [
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
  ],
  [
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
    SquareColor.DARK,
    SquareColor.LIGHT,
  ],
]

export class Square {
  public readonly rank: Rank
  public readonly file: File
  public readonly name: SquareName
  public readonly color: SquareColor
  public readonly position: SquarePosition

  constructor(position: SquarePosition, piece?: IPiece | null) {
    this.name = squareNameByPosition[position.y][position.x]
    this.rank = this.name.split('')[1] as Rank
    this.file = this.name.split('')[0] as File
    this.position = position

    this.color = squareColorByPosition[position.y][position.x]
    if (piece) {
      this._piece = piece
    }
  }

  private _piece: IPiece | null = null

  get piece(): IPiece | null {
    return this._piece
  }

  set piece(piece) {
    this._piece = piece
  }
}
