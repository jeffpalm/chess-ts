import { AbstractPiece, IPiece } from './piece'
import { PieceColor } from '../game'
import { PotentialMove } from '../move'

const abs = Math.abs

export class King extends AbstractPiece implements IPiece {
  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'k' : 'K'
    super(color, symbol, 'king')
  }

  public canMove(move: PotentialMove): boolean {
    const { dx, dy } = move.deltas
    return abs(dy) <= 1 && abs(dx) <= 1
  }
}
