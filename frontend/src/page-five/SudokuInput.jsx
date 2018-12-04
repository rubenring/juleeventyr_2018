import React from 'react';

export const SudokuInput = ({input, changeValue}) => {
  return (
    <div className='sudoku-input-container'>
      <input maxLength='1' type="text" onChange={(e) => changeValue(e, input)} value={input.value} className='sudoku-input' />
    </div>
  )
}

export default SudokuInput;