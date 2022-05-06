import { Square } from '../board/square'
import { AbstractPiece, IPiece } from './piece'
import { PieceColor } from '../game'

export class King extends AbstractPiece implements IPiece {
  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'k' : 'K'
    super(color, symbol, 'king')
  }

  public canMove(from: Square, to: Square): boolean {
    const { y, x } = to.position
    const { y: y1, x: x1 } = from.position
    const dy = Math.abs(y - y1)
    const dx = Math.abs(x - x1)
    return dy <= 1 && dx <= 1
  }
}
