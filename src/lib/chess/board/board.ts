import { Fen, FenPiece, FenRows, pieceFromFen } from '../fen'
import { Square } from './square'
import { IPiece } from '../pieces/piece'
import { Game } from '../game'
import { PotentialMove } from '../move'

// region types
export type SquarePosition = { y: number; x: number }
export type SquareName =
  | 'a1'
  | 'a2'
  | 'a3'
  | 'a4'
  | 'a5'
  | 'a6'
  | 'a7'
  | 'a8'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'b4'
  | 'b5'
  | 'b6'
  | 'b7'
  | 'b8'
  | 'c1'
  | 'c2'
  | 'c3'
  | 'c4'
  | 'c5'
  | 'c6'
  | 'c7'
  | 'c8'
  | 'd1'
  | 'd2'
  | 'd3'
  | 'd4'
  | 'd5'
  | 'd6'
  | 'd7'
  | 'd8'
  | 'e1'
  | 'e2'
  | 'e3'
  | 'e4'
  | 'e5'
  | 'e6'
  | 'e7'
  | 'e8'
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'g1'
  | 'g2'
  | 'g3'
  | 'g4'
  | 'g5'
  | 'g6'
  | 'g7'
  | 'g8'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'h8'

//endregion

const fenPieces = ['p', 'P', 'n', 'N', 'b', 'B', 'r', 'R', 'q', 'Q', 'k', 'K']
const fenNumbers = ['1', '2', '3', '4', '5', '6', '7', '8']

export class Board {
  constructor(fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    const _fen = new Fen(fen)
    this._board = Board.createBoard(_fen.rows)
    this.getActiveChecks.bind(this)
    this.getSquaresWithFriendlyPieces.bind(this)
    this.getSquaresWithEnemyPieces.bind(this)
    this.getEnemyKingSquare.bind(this)
    this.makeMove.bind(this)
    this.undoMove.bind(this)
  }

  private _board: Square[][] = []

  get board(): Square[][] {
    return this._board
  }

  get squares(): Square[] {
    return this._board.flat(2)
  }

  private static createBoard(fen: FenRows): Square[][] {
    const board: Square[][] = []
    for (let y = 0; y < 8; y++) {
      board[y] = new Array(8).fill(null).map((e, i) => new Square({ y, x: i }))
      let i = 0
      for (let x = 0; i < 8; x++) {
        const fenPiece = fen[y][x] ?? null
        let piece = null
        if (!!fenPiece && fenNumbers.includes(fenPiece)) {
          i += +fenPiece
          continue
        }
        if (!!fenPiece && fenPieces.includes(fenPiece)) {
          piece = pieceFromFen(fen[y][x] as FenPiece)
        }

        board[y][i] = new Square({ y, x: i }, piece)
        i++
      }
    }
    return board
  }

  public getPieceByPosition(position: SquarePosition): IPiece | null {
    return this._board[position.y][position.x].piece
  }

  public getSquareByPosition(position: SquarePosition): Square {
    return this._board[position.y][position.x]
  }

  public makeMove(move: PotentialMove) {
    const { x: fromX, y: fromY } = move.payload.coords.from
    const { x: toX, y: toY } = move.payload.coords.to
    this._board[fromY][fromX].piece = null
    this._board[toY][toX].piece = move.payload.piece
    return move
  }

  public undoMove(move: PotentialMove) {
    const { x: fromX, y: fromY } = move.payload.coords.from
    const { x: toX, y: toY } = move.payload.coords.to
    this._board[fromY][fromX].piece = move.payload.piece
    this._board[toY][toX].piece = move.payload.capture
  }

  public async generateMoves(game: Game): Promise<PotentialMove[]> {
    const allSquares = this._board.flat(2)
    const squaresWithCorrectPieces = allSquares.filter((sq) => sq.piece?.color === game.turn)
    const potentialDestinationSquares = allSquares.filter(
      (sq) => !squaresWithCorrectPieces.includes(sq)
    )

    const promises: (PotentialMove | false)[] = await Promise.all(
      squaresWithCorrectPieces.flatMap((from) =>
        potentialDestinationSquares.map(
          (to) =>
            new Promise<PotentialMove | false>(async (resolve, reject) => {
              const move = await PotentialMove.getValidatedMoveFromSquares(from, to, game)
              if (move.isValid) {
                resolve(move)
                return
              }
              resolve(false)
              return
            })
        )
      )
    )
    return promises.filter((m) => m !== false) as PotentialMove[]
  }

  public async getActiveChecks(game: Game): Promise<PotentialMove[]> {
    const output: PotentialMove[] = []
    const squaresWithEnemyPieces = this.getSquaresWithEnemyPieces(game)
    const friendlyKingSquare = this.getFriendlyKingSquare(game)
    for (const square of squaresWithEnemyPieces) {
      const move = await PotentialMove.getValidatedMoveFromSquares(square, friendlyKingSquare, game)
      if (move.isValid) {
        output.push(move)
      }
    }
    return output
  }

  private getSquaresWithFriendlyPieces(game: Game): Square[] {
    return this.squares.filter((sq) => sq.piece?.color === game.friendlyColor)
  }

  private getSquaresWithEnemyPieces(game: Game): Square[] {
    return this.squares.filter((sq) => !!sq.piece && sq.piece.color !== game.turn)
  }

  private getEnemyKingSquare(game: Game): Square {
    const square = this.squares.find(
      (sq) => sq.piece?.name === 'king' && sq.piece?.color === game.enemyColor
    )
    if (!square) throw new Error('No enemy king found')
    return square
  }

  private getFriendlyKingSquare(game: Game): Square {
    const square = this.squares.find(
      (sq) => sq.piece?.name === 'king' && sq.piece?.color === game.friendlyColor
    )
    if (!square) throw new Error('No friendly king found')
    return square
  }
}
