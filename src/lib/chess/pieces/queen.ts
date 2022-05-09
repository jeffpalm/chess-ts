import { AbstractPiece, IPiece } from './piece'
import { PieceColor } from '../game'
import { PotentialMove } from '../move'

const abs = Math.abs

export class Queen extends AbstractPiece implements IPiece {
  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'q' : 'Q'
    super(color, symbol, 'queen')
  }

  public canMove(move: PotentialMove): boolean {
    const { dx, dy } = move.deltas
    return dy === 0 || dx === 0 || abs(dx) === abs(dy)
  }
}
