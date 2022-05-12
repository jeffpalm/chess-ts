import { AbstractPiece, IPiece } from './piece'
import { PieceColor } from '../game'
import { SquareName } from '../board/board'
import { PotentialMove } from '../move'

const abs = Math.abs

export class Pawn extends AbstractPiece implements IPiece {
  public enPassantTarget: SquareName | null = null

  constructor(color: PieceColor) {
    const symbol = color === PieceColor.BLACK ? 'p' : 'P'
    super(color, symbol, 'pawn')
  }

  public canMove(move: PotentialMove): boolean {
    const { dx: _dx, dy } = move.deltas
    const { capture, names, coords } = move
    const dyAbs = abs(dy)
    const dx = abs(_dx)

    if (dx > 1 || dyAbs > 2 || dy === 0) return false
    // dx === 1 || dx === 0
    // dy === 1 || dy === 2 || dy === -1 || dy === -2

    if (dyAbs === 2 && dx === 1) return false
    // dx === 1 && (dy === 1 || dy === -1)
    // dx === 0 && (dy === 2 || dy === 1 || dy === -1 || dy === -2)

    // Cannot move forward into another piece
    if (dx === 0 && !!capture) return false

    // Can only attack diagonal
    if (dx === 1 && capture === null) return false

    // // Handle en passant
    // if (dx === 1 && this.enPassantTarget === names.to) return true

    const isInOriginalPosition =
      this.color === PieceColor.WHITE ? coords.from.y === 6 : coords.from.y === 1

    // Cannot move 2 squares unless sitting on starting square
    if (!isInOriginalPosition && dyAbs === 2) return false

    // Must be in correct direction based on color
    return this.color === PieceColor.WHITE ? dy < 0 : dy > 0
  }
}
