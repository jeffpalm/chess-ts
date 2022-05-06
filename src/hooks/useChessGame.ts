import React, { useState, useEffect, useReducer, useMemo } from 'react'
import { Game } from '../lib/chess/game'

enum GameActions {
  NEXT_TURN,
}

const reducer: React.Reducer<Game, GameActions> = (prev, action) => {
  return prev
}

export default function useChessGame() {
  const [game, dispatch] = useReducer(reducer, new Game())

  const squares = useMemo(
    () => Object.values(game.board.board).flat(2),
    [game.board]
  )

  return {
    game,
    squares,
  }
}
