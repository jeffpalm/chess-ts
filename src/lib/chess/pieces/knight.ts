import { AbstractPiece } from './piece'
import { PieceColor } from '../game'
import { PotentialMove } from '../move'

const abs = Math.abs

export class Knight extends AbstractPiece {
  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'n' : 'N'
    super(color, symbol, 'knight')
  }

  public canMove(move: PotentialMove): boolean {
    const { dx, dy } = move.deltas
    return (abs(dy) === 1 && abs(dx) === 2) || (abs(dy) === 2 && abs(dx) === 1)
  }
}
