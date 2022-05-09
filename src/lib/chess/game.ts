// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
import { Board, SquareName } from './board/board'
import { Fen } from './fen'
import { IPiece } from './pieces/piece'
import { PotentialMove } from './move'

//region types
export type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'

export enum SquareColor {
  LIGHT,
  DARK,
}

export enum PieceColor {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
}

export interface IGame {
  generateLegalMoves(): PotentialMove[]
}

export interface IGame {
  board: Board
}
//endregion

export class Game {
  constructor(fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    this._fen = new Fen(fen)
    this._board = new Board(fen)
    this._pieces = this._board.board
      .flat(2)
      .filter((sq) => !!sq.piece)
      .map((sq) => sq.piece as IPiece)
    this._turn = this._fen.sideToMove === 'w' ? PieceColor.WHITE : PieceColor.BLACK
    this._halfMoveClock = this._fen.halfMoveClock
    this._fullMoveClock = this._fen.fullMoveClock
    this.makeMove.bind(this)
    this.undoMove.bind(this)
    this.isMoveCheck.bind(this)
    this.generateLegalMoves.bind(this)
  }

  //region properties
  private _fen: Fen

  get fen(): Fen {
    return this._fen
  }

  get friendlyColor(): PieceColor {
    return this.turn
  }

  get enemyColor(): PieceColor {
    return this.turn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE
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

  private _moves: PotentialMove[] = []

  get moves(): PotentialMove[] {
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

  //endregion

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

  public makeMove(move: PotentialMove) {
    this._moves.push(this._board.makeMove(move))
    this._turn = this._turn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE
    if (this._halfMoveClock === 1) {
      this._fullMoveClock++
    }
    this._halfMoveClock = this._halfMoveClock === 1 ? 0 : 1
    this._enPassantTarget = move.enPassantTarget
    // this._kingInCheck = move.isCheck
  }

  public undoMove() {
    const prevMove = this._moves.pop()
    if (!prevMove) return false
    this._turn = this._turn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE
    if (this._halfMoveClock === 0) {
      this._fullMoveClock--
    }
    this._halfMoveClock = this._halfMoveClock === 1 ? 0 : 1
    this._board.undoMove(prevMove)
    this._enPassantTarget = prevMove.enPassantTarget
    // this._kingInCheck = prevMove.isCheck
    return prevMove
  }

  public async isMoveCheck(move: PotentialMove) {
    this.makeMove(move)
    const checks = await this.board.getActiveChecks(this)
    this.undoMove()
    return checks.length > 0
  }
}
