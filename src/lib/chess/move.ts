import { Square } from './board/square'
import { IPiece } from './pieces/piece'
import { Board, SquareName, SquarePosition } from './board/board'
import { Knight } from './pieces/knight'
import { intBetween } from './utils'
import { Game, PieceColor } from './game'
import { King } from './pieces/king'
import { Pawn } from './pieces/pawn'

const abs = Math.abs

const isMovePayload = (param: MovePayload | Square): param is MovePayload =>
  !(param instanceof Square)

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

type ValidationPayload = {
  isValid: boolean
  isCheck: boolean
  isLegal: boolean
}

type ValidatedMovePayload = {
  move: MovePayload
  validation: ValidationPayload
}

type ValidCastleMove = {
  key: 'K' | 'Q' | 'k' | 'q'
  names: MovePayload['names']
  validityTestMove(game: Game): PotentialMove
}

//endregion

const validCastlingMoves: ValidCastleMove[] = [
  {
    key: 'K',
    names: { from: 'e1', to: 'g1' },
    validityTestMove(game: Game): PotentialMove {
      return new PotentialMove(game.board.board[7][7], game.board.board[7][5])
    }
  },
  {
    key: 'Q',
    names: { from: 'e1', to: 'c1' },
    validityTestMove(game: Game): PotentialMove {
      return new PotentialMove(game.board.board[7][0], game.board.board[7][3])
    }
  },
  {
    key: 'k',
    names: { from: 'e8', to: 'g8' },
    validityTestMove(game: Game): PotentialMove {
      return new PotentialMove(game.board.board[0][7], game.board.board[0][5])
    }
  },
  {
    key: 'q',
    names: { from: 'e8', to: 'c8' },
    validityTestMove(game: Game): PotentialMove {
      return new PotentialMove(game.board.board[0][0], game.board.board[0][3])
    }
  },
]

export class PotentialMove {
  //region properties
  public readonly deltas: PositionDeltas
  public readonly isCapture: boolean
  public readonly enPassantTarget: SquareName | null = null
  public readonly coords: MovePayload['coords']
  public readonly names: MovePayload['names']
  public readonly piece: IPiece
  public readonly capture: IPiece | null

  //endregion

  public constructor(from: Square, to: Square)
  public constructor(payload: MovePayload)
  public constructor(paramOne: MovePayload | Square, to: Square | null = null) {
    if (paramOne instanceof Square && !to) throw new Error('Must include to square')
    if (paramOne instanceof Square && !paramOne.piece)
      throw new Error('From square does not have piece')

    let _payload: MovePayload
    if (paramOne instanceof Square && !!to && !!paramOne.piece) {
      _payload = {
        coords: { from: paramOne.position, to: to.position },
        names: { from: paramOne.name, to: to.name },
        piece: paramOne.piece,
        capture: to.piece,
      }
    } else if (isMovePayload(paramOne)) {
      _payload = paramOne
    } else {
      throw new Error('unknown param')
    }
    const { coords, names, piece, capture } = _payload
    this.coords = coords
    this.names = names
    this.piece = piece
    this.capture = capture

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
    const potentialMove = new PotentialMove(movePayload)
    return new ValidatedMove(potentialMove, game)
  }

  private getEnPassantTarget(): SquareName | null {
    const { piece, coords } = this
    if (piece.name !== 'pawn' || Math.abs(this.deltas.dy) !== 2) return null
    const y = piece.color === PieceColor.WHITE ? coords.from.y - 1 : coords.from.y + 1
    const epTargetSquare = new Square({ x: coords.from.x, y })
    return epTargetSquare.name
  }
}

export class MoveValidator {
  public static validate(move: PotentialMove, game: Game) {
    return new ValidatedMove(move, game)
  }
}

class ValidatedMove extends PotentialMove {
  public readonly isValid: boolean = false
  public readonly isLegal: boolean = false
  public readonly isCastle: boolean = false

  public constructor(move: PotentialMove, game: Game) {
    super({ ...move })
    this.isCastle = this.isValidCastleMove(move, game)

    this.isValid = this.isCastle || this._validate(game.board, game.enPassantTarget)
    if (!this.isValid) return this

    this.isLegal = this.determineLegality(move, game)

    return this
  }
  private isValidCastleMove(move: PotentialMove, game: Game): boolean {
    let isPotentialCastleMove = false
    for (const validCastleMove of validCastlingMoves) {
      if (
        validCastleMove.names.from === move.names.from &&
        validCastleMove.names.to === move.names.to &&
        move.capture === null
      ) {
        if (!game.castlingAbility.includes(validCastleMove.key)) return false

        isPotentialCastleMove = this.validate(validCastleMove.validityTestMove(game), game)
        break
      }
    }
    if (!isPotentialCastleMove) return false
    if (game.castlingAbility === '-') return false
    return true
  }

  private determineLegality(move: PotentialMove, game: Game) {
    if (move.capture instanceof King) return false
    return !game.willPutKingInCheck(move)
  }

  private _validate(board: Board, enPassantTarget: SquareName | null): boolean {
    const {
      piece,
      capture,
      names,
      deltas: { dx },
    } = this
    if (!piece.canMove(this)) return false

    const isOccupiedBySameColor = capture && piece.color === capture.color
    const isSameSquare = names.to === names.from

    if (isOccupiedBySameColor || isSameSquare) return false

    if (piece instanceof Pawn) {
      const isValidEnPassant = abs(dx) === 1 && !capture && names.to === enPassantTarget
      if (isValidEnPassant) return true
      if (abs(dx) === 1 && !capture) return false
    }

    if (piece instanceof Knight) return true

    return this.isNoPiecesInBetween(board)
  }

  private validate(move: PotentialMove, game: Game): boolean {
    const {piece, capture, names, deltas: {dx}} = move
    const {enPassantTarget, board} = game
    if (!piece.canMove(this)) return false

    const isOccupiedBySameColor = capture && piece.color === capture.color
    const isSameSquare = names.to === names.from

    if (isOccupiedBySameColor || isSameSquare) return false

    if (piece instanceof Pawn) {
      const isValidEnPassant = abs(dx) === 1 && !capture && names.to === enPassantTarget
      if (isValidEnPassant) return true
      if (abs(dx) === 1 && !capture) return false
    }

    if (piece instanceof Knight) return true

    return this.isNoPiecesInBetween(board)
  }

  private isNoPiecesInBetween(board: Board) {
    const { from, to } = this.coords
    let xBetween = intBetween(from.x, to.x)
    let yBetween = intBetween(from.y, to.y)

    if (xBetween.length === 0 && yBetween.length > 0) {
      xBetween = [from.x]
    } else if (yBetween.length === 0 && xBetween.length > 0) {
      yBetween = [from.y]
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
