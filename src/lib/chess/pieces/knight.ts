import { Square } from '../board/square'
import { AbstractPiece } from './piece'
import { PieceColor } from '../game'

export class Knight extends AbstractPiece {
  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'n' : 'N'
    super(color, symbol, 'knight')
  }

  public canMove(from: Square, to: Square): boolean {
    const { y, x } = to.position
    const { y: y2, x: x2 } = from.position
    const dy = Math.abs(y - y2)
    const dx = Math.abs(x - x2)
    return (dy === 1 && dx === 2) || (dy === 2 && dx === 1)
  }
}
