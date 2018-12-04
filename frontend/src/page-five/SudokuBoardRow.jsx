import React from 'react';
import SudokuInput from './SudokuInput';

export const SudokuBoardRow = ({row, changeValue}) => {
    return (
      <div className='sudoku-board-row'>
        {row.map( x => <SudokuInput key={x.id} changeValue={changeValue} input={x} />)}
      </div>
    );
}

export default SudokuBoardRow;