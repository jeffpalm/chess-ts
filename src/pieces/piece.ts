import { FenPiece } from '../fen'
import { Square } from '../board/square'
import { PieceColor } from '../game'
import { MovePayload, PositionDeltas, PotentialMove } from '../move'

export type PieceName = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'

export interface IPiece {
  color: PieceColor
  name: PieceName
  symbol: FenPiece

  canMove(move: PotentialMove): boolean
}

export abstract class AbstractPiece implements IPiece {
  public readonly color: PieceColor
  public readonly symbol: FenPiece
  public readonly name: PieceName

  protected constructor(color: PieceColor, symbol: FenPiece, name: PieceName) {
    this.color = color
    this.symbol = symbol
    this.name = name
  }

  public abstract canMove(move: PotentialMove): boolean
}
