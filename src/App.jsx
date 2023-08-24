import { useState } from "react"
import confetti from "canvas-confetti"
import Square from "./components/Square"
import { TURNS} from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"

function App() {
  const [ board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [ turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)


  // Utilizamos de cero los estados que habiamos creado para resetear el juego 
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

  }

  const updateBoard = (index) => {
    // Revisamos si tiene algo en la posicion 
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar aqui partida en localStorage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner) 

      // Revisar si hay un empate
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    
  }

  return (
    <main className="board">
        <h1>
          Tic tac toe
        </h1>
        <button onClick={resetGame} > Reset del juego</button>
        <section className="game">
          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                  >
                   {board[index]}
                </Square>
              )
            })
          }
        </section>
        
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
            </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O} 
            </Square>

        </section>

        <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
