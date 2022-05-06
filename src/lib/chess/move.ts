import { Square } from './board/square'
import { IPiece } from './pieces/piece'
import { Board, SquareName } from './board/board'
import { Knight } from './pieces/knight'
import { intBetween } from './utils'
import { Game, PieceColor } from './game'

type PositionDeltas = {
  dx: number
  dy: number
}

export class Move {
  get isCheck(): boolean {
    return this._isCheck
  }
  get isCapture(): boolean {
    return this._isCapture
  }
  get isValid(): boolean {
    return this._isValid
  }
  public readonly from: Square
  public readonly to: Square
  public readonly piece: IPiece
  public readonly capture: IPiece | null
  private _isValid: boolean
  private _isCapture: boolean
  private _isCheck: boolean
  public readonly notation: string
  public readonly enPassantTarget: SquareName | null = null
  public readonly positionDeltas: PositionDeltas

  protected constructor(from: Square, to: Square) {
    if (!from.piece) throw new Error('Move must include from square with piece')
    this.from = new Square(from.position, from.piece)
    this.to = new Square(to.position, to.piece)
    this.positionDeltas = {
      dx: to.position.x - from.position.x,
      dy: to.position.y - from.position.y,
    }
    this.piece = from.piece
    this.capture = to.piece
    this.notation = this.moveNotation()
    this.enPassantTarget = this.getEnPassantTarget()
    this._isValid = false
    this._isCapture = false
    this._isCheck = to.piece?.name === 'king'
  }

  public static async getValidatedMove(from: Square, to: Square, game: Game) {
    const instance = new Move(from, to)
    const isValid = await instance._validate(game)
    instance._isValid = isValid
    instance._isCapture = isValid && instance.to.piece !== null
    return instance
  }

  private async _validate(game: Game): Promise<boolean> {
    if (!this.piece.canMove(this.from, this.to)) return false

    const isOccupiedBySameColor =
      this.from.piece?.color === this.to.piece?.color
    const isSameSquare = this.to.name === this.from.name

    if (isOccupiedBySameColor || isSameSquare || !this.from.piece) return false

    if (
      this.from.piece.name === 'pawn' &&
      game.enPassantTarget === this.to.name
    )
      return true

    if (this.piece instanceof Knight) return true

    return await this.isPieceInTheWay(game.board)

    // return !(await game.willPutKingInCheck(this))
  }

  private async isPieceInTheWay(board: Board) {
    let xBetween = intBetween(this.from.position.x, this.to.position.x)
    let yBetween = intBetween(this.from.position.y, this.to.position.y)

    if (xBetween.length === 0 && yBetween.length > 0) {
      xBetween = [this.from.position.x]
    } else if (yBetween.length === 0 && xBetween.length > 0) {
      yBetween = [this.from.position.y]
    }
    if (yBetween.length === 0 && xBetween.length === 0) return true
    let betweenSquaresValid: boolean[]
    if (xBetween.length === yBetween.length) {
      betweenSquaresValid = await Promise.all(
        xBetween.map(
          (xB, i) =>
            new Promise<boolean>((resolve) => {
              const piece = board.getPieceByPosition({ x: xB, y: yBetween[i] })
              resolve(!piece)
            })
        )
      )
    } else {
      betweenSquaresValid = await Promise.all(
        yBetween.flatMap((yB) =>
          xBetween.map(
            (xB) =>
              new Promise<boolean>((resolve, reject) => {
                const piece = board.getPieceByPosition({ x: xB, y: yB })
                resolve(!piece)
              })
          )
        )
      )
    }

    return !betweenSquaresValid.includes(false)
  }

  private moveNotation() {
    if (!this._isValid) return ''
    return `${
      this.from.piece?.name === 'pawn'
        ? ''
        : this.from.piece?.symbol.toUpperCase()
    }${this._isCapture ? 'x' : ''}${this.to.name}`
  }

  private getEnPassantTarget(): SquareName | null {
    if (this.piece.name !== 'pawn' || Math.abs(this.positionDeltas.dy) !== 2)
      return null
    const y =
      this.piece.color === PieceColor.WHITE
        ? this.from.position.y - 1
        : this.from.position.y + 1
    const epTargetSquare = new Square({ x: this.from.position.x, y })
    return epTargetSquare.name
  }
}
