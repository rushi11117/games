import React, { useState } from 'react';
import Board from './Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Game.css';

const Game = () => {
  const [history, setHistory] = useState([Array(16).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];

  const handleClick = (i, size) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    if (calculateWinner(squares) || squares[i]) return;

    const newValue = {
      piece: xIsNext ? 'X' : 'O',
      size: size,
    };

    squares[i] = newValue;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move} className="list-group-item">
          <button className="btn btn-outline-primary btn-block" onClick={() => jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

  const winner = calculateWinner(current);
  const status = winner ? `Winner: ${winner.piece} (${winner.size})` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <Board squares={current} onClick={(i, size) => handleClick(i, size)} />
        </div>
        <div className="col-md-6">
          <div className="game-info">
            <div className="alert alert-info">{status}</div>
            <ul className="list-group">{renderMoves()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // rows
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // columns
    [0, 5, 10, 15], [3, 6, 9, 12] // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[b] &&
      squares[c] &&
      squares[a].piece === squares[b].piece &&
      squares[a].piece === squares[c].piece &&
      squares[a].size === squares[b].size &&
      squares[a].size === squares[c].size &&
      // Check if the line contains exactly 3 consecutive pieces
      (squares[d] === null || squares[d].piece !== squares[a].piece || squares[d].size !== squares[a].size)
    ) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
