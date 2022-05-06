import React, { Component } from 'react'
import { SquareName } from '../lib/chess/board/board'
import { FenPiece } from '../lib/chess/fen'
import { Rank, File } from '../lib/chess/game'
type Props = {
  color: 'light' | 'dark'
  piece: FenPiece
  square: SquareName
  rotation: 'rotW' | 'rotB'
  action: () => void
  marker: File | Rank
  pms: 'move' | 'selected' | 'not-move' | 'invalid' | '' // Pre-move style
}

export default class Square extends Component<Props> {
  render() {
    const { color, piece, rotation, square, action, marker, pms } = this.props
    // console.log(action)
    return (
      <div
        className={`Square flex ${color} ${piece} ${rotation} ${pms}`}
        onClick={action}
        id={square}
      >
        {marker ? (
          <span id="square-marker" className={`marker ${color}`}>
            {marker}
          </span>
        ) : null}
      </div>
    )
  }
}
