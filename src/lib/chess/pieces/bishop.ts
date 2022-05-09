import { AbstractPiece, IPiece } from './piece'
import { PieceColor } from '../game'
import { PotentialMove } from '../move'

const abs = Math.abs

export class Bishop extends AbstractPiece implements IPiece {
  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'b' : 'B'
    super(color, symbol, 'bishop')
  }

  public canMove(move: PotentialMove): boolean {
    const { dx, dy } = move.deltas

    return abs(dy) === abs(dx)
  }
}
