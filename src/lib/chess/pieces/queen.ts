import { Square } from '../board/square'
import { AbstractPiece, IPiece } from './piece'
import { PieceColor } from '../game'

export class Queen extends AbstractPiece implements IPiece {
  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'q' : 'Q'
    super(color, symbol, 'queen')
  }

  public canMove(from: Square, to: Square): boolean {
    const { y, x } = to.position
    const { y: y2, x: x2 } = from.position
    const dy = Math.abs(y - y2)
    const dx = Math.abs(x - x2)
    return dy === 0 || dx === 0 || dy === dx
  }
}
