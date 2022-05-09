import { Square } from './board/square'
import { IPiece } from './pieces/piece'
import { Board, SquareName, SquarePosition } from './board/board'
import { Knight } from './pieces/knight'
import { intBetween } from './utils'
import { Game, PieceColor } from './game'

//region types
export type PositionDeltas = {
  dx: number
  dy: number
}

export type MovePayload = {
  names: {
    from: SquareName
    to: SquareName
  }
  coords: {
    from: SquarePosition
    to: SquarePosition
  }
  piece: IPiece
  capture: IPiece | null
}

//endregion

export class PotentialMove {
  //region properties
  public readonly deltas: PositionDeltas
  public readonly isCapture: boolean
  public readonly enPassantTarget: SquareName | null = null
  public readonly payload: MovePayload

  //endregion

  public constructor(payload: MovePayload) {
    const { coords, capture } = payload
    this.payload = payload

    this.deltas = {
      dx: coords.to.x - coords.from.x,
      dy: coords.to.y - coords.from.y,
    }
    this.isCapture = capture !== null
    this.enPassantTarget = this.getEnPassantTarget()
  }

  public static getValidatedMoveFromSquares(from: Square, to: Square, game: Game): ValidatedMove {
    if (!from.piece) throw new Error('From square must have piece')
    const movePayload = {
      names: {
        from: from.name,
        to: to.name,
      },
      coords: {
        from: from.position,
        to: to.position,
      },
      piece: from.piece,
      capture: to.piece,
    }
    return ValidatedMove.getValidatedMove(movePayload, game.board, game.enPassantTarget)
  }

  private getEnPassantTarget(): SquareName | null {
    const { piece, coords } = this.payload
    if (piece.name !== 'pawn' || Math.abs(this.deltas.dy) !== 2) return null
    const y = piece.color === PieceColor.WHITE ? coords.from.y - 1 : coords.from.y + 1
    const epTargetSquare = new Square({ x: coords.from.x, y })
    return epTargetSquare.name
  }
}

type ValidationPayload = {
  isValid: boolean
  isCheck: boolean
  isLegal: boolean
}

type ValidatedMovePayload = {
  move: MovePayload
  validation: ValidationPayload
}

export class ValidatedMove extends PotentialMove {
  public readonly isValid: boolean
  public readonly isCheck: boolean
  public readonly isLegal: boolean

  protected constructor(payload: ValidatedMovePayload) {
    super(payload.move)
    const { isValid, isCheck, isLegal } = payload.validation
    this.isValid = isValid
    this.isCheck = isCheck
    this.isLegal = isLegal
  }

  public static getValidatedMove(
    movePayload: MovePayload,
    board: Board,
    enPassantTarget: SquareName | null
  ) {
    const payload: ValidatedMovePayload = {
      move: movePayload,
      validation: {
        isValid: false,
        isCheck: false,
        isLegal: false,
      },
    }
    const potentialMove = new PotentialMove(movePayload)
    payload.validation.isValid = ValidatedMove._validate(potentialMove, board, enPassantTarget)

    return new ValidatedMove(payload)
  }

  private static _validate(
    move: PotentialMove,
    board: Board,
    enPassantTarget: SquareName | null
  ): boolean {
    const { piece, capture, names } = move.payload
    if (!piece.canMove(move)) return false

    const isOccupiedBySameColor = piece.color === capture?.color
    const isSameSquare = names.to === names.from

    if (isOccupiedBySameColor || isSameSquare) return false

    if (piece.name === 'pawn' && enPassantTarget === names.to) return true

    if (piece instanceof Knight) return true

    return this.isNoPiecesInBetween(move, board)
  }

  private static isNoPiecesInBetween(move: PotentialMove, board: Board) {
    const { coords } = move.payload
    let xBetween = intBetween(coords.from.x, coords.to.x)
    let yBetween = intBetween(coords.from.y, coords.to.y)

    if (xBetween.length === 0 && yBetween.length > 0) {
      xBetween = [coords.from.x]
    } else if (yBetween.length === 0 && xBetween.length > 0) {
      yBetween = [coords.from.y]
    }
    if (yBetween.length === 0 && xBetween.length === 0) return true
    let betweenSquaresValid: boolean[]
    if (xBetween.length === yBetween.length) {
      betweenSquaresValid = xBetween.map((xB, i) => {
        const piece = board.getPieceByPosition({ x: xB, y: yBetween[i] })
        return !piece
      })
    } else {
      betweenSquaresValid = yBetween.flatMap((yB) =>
        xBetween.map((xB) => {
          const piece = board.getPieceByPosition({ x: xB, y: yB })
          return !piece
        })
      )
    }

    return !betweenSquaresValid.includes(false)
  }
}
