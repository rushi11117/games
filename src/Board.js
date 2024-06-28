import React from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onClick={(size) => onClick(i, size)} />
  );

  return (
    <div className="board">
      {[0, 1, 2, 3].map(row => (
        <div key={row} className="board-row">
          {[0, 1, 2, 3].map(col => renderSquare(row * 4 + col))}
        </div>
      ))}
    </div>
  );
};

export default Board;
