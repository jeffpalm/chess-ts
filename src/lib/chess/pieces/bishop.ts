import { Square } from '../board/square'
import { AbstractPiece, IPiece } from './piece'
import { PieceColor } from '../game'

export class Bishop extends AbstractPiece implements IPiece {
  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'b' : 'B'
    super(color, symbol, 'bishop')
  }

  public canMove(from: Square, to: Square): boolean {
    const { y, x } = to.position
    const { y: y2, x: x2 } = from.position
    const dy = Math.abs(y - y2)
    const dx = Math.abs(x - x2)
    return dy === dx
  }
}
