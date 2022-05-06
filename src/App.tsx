import { useEffect } from 'react'
import './App.css'
import { Board } from './lib/chess/board/board'
import useChessGame from './hooks/useChessGame'

function App() {
  const { squares } = useChessGame()

  return (
    <div className="App flex center col">
      <div>
        <div id="chess-board" className="Board flex rotW">
          {squares.map((square) => {
            return (
              <div
                key={square.name}
                className="Square flex light rotW"
                id={square.name}
              >
                {square.name}
                <br />
                X: {square.position.x}
                <br />
                Y: {square.position.y}
                <br />
                <br />
                {square.piece?.symbol ?? ''}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
