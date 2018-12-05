import React from 'react';

export const SudokuInput = ({input, changeValue}) => {
  return (
    <div className='sudoku-input-container'>
      <input maxLength='1' disabled={input.disabled} type="text" onChange={(e) => changeValue(e, input)} value={input.value} className={`sudoku-input ${input.disabled ? 'disabled' : null}`} />
    </div>
  )
}

export default SudokuInput;