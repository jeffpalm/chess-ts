// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
import { Board, SquareName } from './board/board'
import { Fen } from './fen'
import { IPiece } from './pieces/piece'
import { Move } from './move'

export type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'

export enum SquareColor {
  LIGHT,
  DARK,
}

export enum PieceColor {
  WHITE,
  BLACK,
}

export interface IGame {
  generateLegalMoves(): Move[]
}

export interface IGame {
  board: Board
}

export class Game {
  private prevState = {
    moves: [],
  }
  private readonly _fen: Fen

  constructor(
    fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  ) {
    this._fen = new Fen(fen)
    this._board = new Board(fen)
    this._pieces = this._board.board
      .flat(2)
      .filter((sq) => !!sq.piece)
      .map((sq) => sq.piece as IPiece)
    this._turn =
      this._fen.sideToMove === 'w' ? PieceColor.WHITE : PieceColor.BLACK
    this._halfMoveClock = this._fen.halfMoveClock
    this._fullMoveClock = this._fen.fullMoveClock
  }

  private _kingInCheck = false

  get kingInCheck(): boolean {
    return this._kingInCheck
  }

  private _halfMoveClock: 1 | 0

  get halfMoveClock(): 1 | 0 {
    return this._halfMoveClock
  }

  private _board: Board

  get board(): Board {
    return this._board
  }

  private _turn: PieceColor

  get turn(): PieceColor {
    return this._turn
  }

  get fen(): Fen {
    return this._fen
  }

  private _moves: Move[] = []

  get moves(): Move[] {
    return this._moves
  }

  private _pieces: IPiece[]

  get pieces(): IPiece[] {
    return this._pieces
  }

  private _fullMoveClock: number

  get fullMoveClock(): number {
    return this._fullMoveClock
  }

  private _enPassantTarget: SquareName | null = null

  get enPassantTarget(): SquareName | null {
    return this._enPassantTarget
  }

  public async perft(depth: number) {
    let moves = await this._board.generateMoves(this)

    if (depth === 1) return moves.length

    let node_count = 0

    for (const move of moves) {
      this.makeMove(move)
      node_count += await this.perft(depth - 1)
      this.undoMove()
    }
    return node_count
  }

  public async generateLegalMoves() {
    return await this._board.generateMoves(this)
  }

  public makeMove(move: Move) {
    this._board.makeMove(move)
    this._moves.push(move)
    this._turn =
      this._turn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE
    if (this._halfMoveClock === 1) {
      this._fullMoveClock++
    }
    this._halfMoveClock = this._halfMoveClock === 1 ? 0 : 1
    this._enPassantTarget = move.enPassantTarget
  }

  public undoMove() {
    const prevMove = this._moves.pop()
    if (!prevMove) return false
    this._turn =
      this._turn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE
    if (this._halfMoveClock === 0) {
      this._fullMoveClock--
    }
    this._halfMoveClock = this._halfMoveClock === 1 ? 0 : 1
    this._board.undoMove(prevMove)
    this._enPassantTarget = prevMove.enPassantTarget
    return prevMove
  }

  public async willPutKingInCheck(move: Move) {
    this._board.makeMove(move)
    const captures = await this._board.generateCaptures(this)
    const kingCaptures = captures
      .map((mv) => mv.capture?.name ?? 'empty')
      .filter((name) => name === 'king')

    this.undoMove()

    return kingCaptures.length > 0
  }
}
