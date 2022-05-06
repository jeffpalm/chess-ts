import { Fen, FenPiece, FenRows, pieceFromFen } from '../fen'
import { Square } from './square'
import { IPiece } from '../pieces/piece'
import { Game } from '../game'
import { Move } from '../move'

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
  constructor(
    fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  ) {
    const _fen = new Fen(fen)
    this._board = Board.createBoard(_fen.rows)
  }

  private _board: Square[][] = []

  get board(): Square[][] {
    return this._board
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

  public print(): void {
    console.table(this._board)
  }

  public makeMove(move: Move) {
    if (!move.from.piece) throw new Error('No piece on from square')
    const { x: fromX, y: fromY } = move.from.position
    const { x: toX, y: toY } = move.to.position
    this._board[fromY][fromX].removePiece()
    this._board[toY][toX].movePiece(move.from.piece)
    return move
  }

  public undoMove(move: Move) {
    const { x: fromX, y: fromY } = move.from.position
    const { x: toX, y: toY } = move.to.position
    this._board[fromY][fromX] = move.from
    this._board[toY][toX] = move.to
  }

  public async generateMoves(game: Game): Promise<Move[]> {
    const allSquares = this._board.flat(2)
    const squaresWithCorrectPieces = allSquares.filter(
      (sq) => sq.piece?.color === game.turn
    )
    const potentialDestinationSquares = allSquares.filter(
      (sq) => !squaresWithCorrectPieces.includes(sq)
    )

    const promises: (Move | false)[] = await Promise.all(
      squaresWithCorrectPieces.flatMap((from) =>
        potentialDestinationSquares.map(
          (to) =>
            new Promise<Move | false>(async (resolve, reject) => {
              const move = await Move.getValidatedMove(from, to, game)
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
    return promises.filter((m) => m !== false) as Move[]
  }

  public async generateCaptures(game: Game): Promise<Move[]> {
    return (await this.generateMoves(game)).filter((mv) => mv.isCapture)
  }
}
