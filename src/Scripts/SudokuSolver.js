import { useRef } from "react";
import {
  isBoardSolved,
  isColumnSolved,
  isRowSolved,
  isSubBoardSolved,
} from "./Sudoku";
const sudokuValueCheck = useRef(1);
const sudokuLookback = useRef([]);
function getColumnFromPosition(pos) {
  return pos % 9;
}
function getRowFromPosition(pos) {
  return Math.floor(pos / 9);
}
function getSubBoardFromPosition(pos) {
  const rowOffset = Math.floor(pos / 27) * 3;
  const colOffset = Math.floor((pos % 9) / 3);
  return rowOffset + colOffset;
}
function isValidMove(pos, board) {
  return (
    isRowSolved(getRowFromPosition(pos), board) &&
    isColumnSolved(getColumnFromPosition(pos), board) &&
    isSubBoardSolved(getSubBoardFromPosition(pos), board)
  );
}

export default function sudokuSolver(
  animationSpeed,
  board,
  setAnimation,
  setSudokuPointer,
  sudokuPointer
) {
  let cloneBoard = board.substring(0);
  var animation = setInterval(() => {
    //solved
    if (isBoardSolved(clone)) {
      clearInterval(animation);
      setAnimation(null);
      //TODO cleanup
    } else {
      let copyOfCloneBoard = `${cloneBoard.substring(0, sudokuPointer)}${
        sudokuValueCheck.current
      }${cloneBoard.substring(sudokuPointer + 1)}`;
      if (isValidMove(pos, copyOfCloneBoard)) {
        //TODO
      }
    }
  }, animationSpeed);
}
