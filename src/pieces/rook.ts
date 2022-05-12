import { AbstractPiece, IPiece } from './piece'
import { PieceColor } from '../game'
import { PotentialMove } from '../move'

export class Rook extends AbstractPiece implements IPiece {
  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'r' : 'R'
    super(color, symbol, 'rook')
  }

  public canMove(move: PotentialMove): boolean {
    const { dx, dy } = move.deltas
    return dx === 0 || dy === 0
  }
}
