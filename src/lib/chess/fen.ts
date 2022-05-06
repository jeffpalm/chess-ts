import { Board, SquareName } from './board/board'
import { PieceColor, Rank } from './game'
import { Pawn } from './pieces/pawn'
import { Knight } from './pieces/knight'
import { Bishop } from './pieces/bishop'
import { Rook } from './pieces/rook'
import { Queen } from './pieces/queen'
import { King } from './pieces/king'
import { IPiece } from './pieces/piece'

export type CastlingAbility =
  | '-'
  | 'K'
  | 'Q'
  | 'k'
  | 'q'
  | 'KQkq'
  | 'KQk'
  | 'KQq'
  | 'Kkq'
  | 'Qkq'
  | 'KQ'
  | 'Kk'
  | 'Qk'
  | 'Qq'
  | 'kq'
  | 'Kq'
export type EnPassantTarget = '-' | SquareName
export type HalfMoveClock = 1 | 0
export type FullMoveClock = number
export type SideToMove = 'w' | 'b'
export type FenPiece =
  | 'p'
  | 'n'
  | 'b'
  | 'r'
  | 'q'
  | 'k'
  | 'P'
  | 'N'
  | 'B'
  | 'R'
  | 'Q'
  | 'K'
  | Rank
export type FenRow = [
  FenPiece,
  FenPiece?,
  FenPiece?,
  FenPiece?,
  FenPiece?,
  FenPiece?,
  FenPiece?,
  FenPiece?
]
export type FenArray = [
  string,
  SideToMove,
  CastlingAbility,
  EnPassantTarget,
  HalfMoveClock,
  FullMoveClock
]
export type FenRows = [
  FenRow,
  FenRow,
  FenRow,
  FenRow,
  FenRow,
  FenRow,
  FenRow,
  FenRow
]

export class Fen {
  public readonly rows: FenRows
  public readonly sideToMove: SideToMove
  public readonly castlingAbility: CastlingAbility
  public readonly enPassantTarget: EnPassantTarget
  public readonly halfMoveClock: HalfMoveClock
  public readonly fullMoveClock: FullMoveClock

  constructor(fen: string) {
    const fenArray = fen.split(' ')
    this.rows = this.parseRows(fenArray[0])
    this.sideToMove = fenArray[1] as SideToMove
    this.castlingAbility = fenArray[2] as CastlingAbility
    this.enPassantTarget = fenArray[3] as EnPassantTarget
    this.halfMoveClock = parseInt(fenArray[4]) as HalfMoveClock
    this.fullMoveClock = parseInt(fenArray[5]) as FullMoveClock
  }

  static parse(fen: string): FenArray {
    const fenArray: FenArray = fen.split(' ') as FenArray
    return [
      fenArray[0],
      fenArray[1],
      fenArray[2],
      fenArray[3],
      fenArray[4],
      fenArray[5],
    ]
  }

  static parseRow(fenRow: string): FenRow {
    return fenRow.split('') as FenRow
  }

  static stringify(fenArray: FenArray): string {
    return fenArray.join(' ')
  }

  private parseRows(rowsString: string): FenRows {
    const splits = rowsString.split('/')
    if (splits.length !== 8) {
      throw new Error('Invalid FEN')
    }
    return splits as unknown as FenRows
  }
}

export class FenAdapter {
  public static from(fen: string): Board {
    return new Board(fen)
  }
}

export function pieceFromFen(fenPiece: FenPiece): IPiece | null {
  switch (fenPiece) {
    case 'p':
      return new Pawn(PieceColor.BLACK)
    case 'P':
      return new Pawn(PieceColor.WHITE)
    case 'n':
      return new Knight(PieceColor.BLACK)
    case 'N':
      return new Knight(PieceColor.WHITE)
    case 'b':
      return new Bishop(PieceColor.BLACK)
    case 'B':
      return new Bishop(PieceColor.WHITE)
    case 'r':
      return new Rook(PieceColor.BLACK)
    case 'R':
      return new Rook(PieceColor.WHITE)
    case 'q':
      return new Queen(PieceColor.BLACK)
    case 'Q':
      return new Queen(PieceColor.WHITE)
    case 'k':
      return new King(PieceColor.BLACK)
    case 'K':
      return new King(PieceColor.WHITE)
    default:
      return null
  }
}
