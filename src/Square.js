import React, { useState } from 'react';
import './Square.css';

const Square = ({ value, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="square"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`square-content ${value ? value.size : ''}`}>
        {value ? (
          <div className={`icon icon-${value.size}`}>
            {value.piece}
          </div>
        ) : (
          ''
        )}
      </div>
      {hover && !value && (
        <div className="hover-menu">
          <button className="btn btn-outline-success btn-sm" onClick={() => onClick('large')}>
            Small
          </button>
          <button className="btn btn-outline-success btn-sm" onClick={() => onClick('small')}>
            Large
          </button>
        </div>
      )}
    </div>
  );
};

export default Square;
