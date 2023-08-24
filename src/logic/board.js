import { winner_combos } from "../constants"

const checkWinner = (boardToCheck) => {
    for (const combo of winner_combos) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
      return boardToCheck[a]
    }
    // si no hay ganador
    return null
}


const checkEndGame = (newBoard) => {
    // Revisamos si hay empate 
    //si no hay espacios vacios
    return newBoard.every((square) => square !== null)
  }

export default {
    checkWinner,
    checkEndGame
} 