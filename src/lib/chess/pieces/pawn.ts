import { Square } from '../board/square'
import { AbstractPiece, IPiece } from './piece'
import { PieceColor } from '../game'
import { SquareName } from '../board/board'

export class Pawn extends AbstractPiece implements IPiece {
  public enPassantTarget: SquareName | null = null

  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'p' : 'P'
    super(color, symbol, 'pawn')
  }

  public canMove(from: Square, to: Square): boolean {
    const { y, x } = to.position
    const { y: y1, x: x1 } = from.position
    const dy = y - y1
    const dyAbs = Math.abs(dy)
    const dx = Math.abs(x - x1)

    if (dx > 1 || dyAbs > 2 || dy === 0) return false
    // dx === 1 || dx === 0
    // dy === 1 || dy === 2 || dy === -1 || dy === -2

    // Cannot move forward into another piece
    if (dx === 0 && !!to.piece) return false

    // Cannot move diagonal if piece is same color
    if (dx === 1 && to.piece?.color === this.color) return false

    // Can only attack diagonal
    if (dx === 1 && !to.piece) return false

    // Handle en passant
    if (dx === 1 && this.enPassantTarget === to.name) return true

    const isInOriginalPosition =
      this.color === PieceColor.WHITE ? y1 === 6 : y1 === 1

    // Cannot move 2 squares unless sitting on starting square
    if (!isInOriginalPosition && dyAbs === 2) return false

    // Must be in correct direction based on color
    return this.color === PieceColor.WHITE ? dy < 0 : dy > 0
  }
}
