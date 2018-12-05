import React from 'react';
import SudokuBoardRow from './SudokuBoardRow';

export const SudokuBoard = ({sudokuBoard, changeValue}) => {
  let copy = [...sudokuBoard]
  let newArray = []
  var i,j,temparray,chunk = 6;
  for (i=0,j=copy.length; i<j; i+=chunk) {
      temparray = copy.slice(i,i+chunk);
      newArray.push(temparray);
  }
  return (
    <div className='sudoku-board'>
        {newArray.map((x, i) => {
          return <SudokuBoardRow changeValue={changeValue} key={x.length + i} row={x} />})}
    </div>
  );
}

export default SudokuBoard;