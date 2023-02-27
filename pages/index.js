import { useState } from 'react'

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]
    }
  }
  return null
}

export default function TicTacToe () {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [isXNext, setIsXNext] = useState(true)
  const [gameEnded, setGameEnded] = useState(false)
  const [winner, setWinner] = useState(null)

  const current = history[stepNumber]

  function handleClick (index) {
    const newHistory = history.slice(0, stepNumber + 1)
    const currentBoard = newHistory[newHistory.length - 1]
    const newBoard = [...currentBoard.squares]
    if (gameEnded || newBoard[index]) return
    newBoard[index] = isXNext ? 'X' : 'O'
    setHistory([...newHistory, { squares: newBoard }])
    setStepNumber(newHistory.length)
    setIsXNext(!isXNext)

    const newWinner = calculateWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      setGameEnded(true)
    } else if (newBoard.every((square) => square !== null)) {
      setGameEnded(true)
    }
  }

  function handleReset () {
    setHistory([{ squares: Array(9).fill(null) }])
    setStepNumber(0)
    setIsXNext(true)
    setGameEnded(false)
    setWinner(null)
  }

  function jumpTo (step) {
    setStepNumber(step)
    setIsXNext(step % 2 === 0)
    setGameEnded(false)
    setWinner(null)
  }

  function renderSquare (index) {
    return (
      <button className='square' onClick={() => handleClick(index)}>
        {current.squares[index]}
      </button>
    )
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  const status = winner
    ? `Winner: ${winner}`
    : gameEnded
      ? 'Tie game!'
      : `Next player: ${isXNext ? 'X' : 'O'}`

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}
