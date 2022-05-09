// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
import { Board, SquareName } from './board/board'
import { Fen } from './fen'
import { IPiece } from './pieces/piece'
import { PotentialMove, ValidatedMove } from './move'
import { Square } from './board/square'

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

  public perft(depth: number) {
    let moves = this.generateMoves()

    if (depth === 1) return moves.length

    let nodeCount = 0

    for (const move of moves) {
      this.makeMove(move)
      nodeCount += this.perft(depth - 1)
      this.undoMove()
    }
    return nodeCount
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

  public isMoveCheck(move: PotentialMove) {
    this.makeMove(move)
    const checks = this.board.getActiveChecks(this)
    this.undoMove()
    return checks.length > 0
  }

  public getActiveChecks(): PotentialMove[] {
    const output: PotentialMove[] = []
    const squaresWithEnemyPieces = this.getSquaresWithEnemyPieces()
    const friendlyKingSquare = this.getFriendlyKingSquare()
    for (const square of squaresWithEnemyPieces) {
      const move = PotentialMove.getValidatedMoveFromSquares(square, friendlyKingSquare, this)
      if (move.isValid) {
        output.push(move)
      }
    }
    return output
  }

  public generateMoves(): PotentialMove[] {
    const squaresWithCorrectPieces = this._board.squares.filter(
      (sq) => sq.piece !== null && sq.piece.color === this.turn
    )
    const potentialDestinationSquares = this._board.squares.filter(
      (sq) => !squaresWithCorrectPieces.includes(sq)
    )

    const output: PotentialMove[] = []
    for (const from of squaresWithCorrectPieces) {
      for (const to of potentialDestinationSquares) {
        const move = ValidatedMove.getValidatedMove(
          {
            coords: {
              from: from.position,
              to: to.position,
            },
            names: {
              from: from.name,
              to: to.name,
            },
            piece: from.piece as IPiece,
            capture: to.piece,
          },
          this._board,
          this.enPassantTarget
        )
        if (move.isValid) {
          output.push(move)
        }
      }
    }
    return output
  }

  private getSquaresWithEnemyPieces(): Square[] {
    return this._board.squares.filter((sq) => !!sq.piece && sq.piece.color !== this.turn)
  }

  private getFriendlyKingSquare(): Square {
    const square = this._board.squares.find(
      (sq) => sq.piece?.name === 'king' && sq.piece?.color === this.friendlyColor
    )
    if (!square) throw new Error('No friendly king found')
    return square
  }
}
