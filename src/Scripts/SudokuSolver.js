//TODO remove
import { useRef } from "react";
import {
  isBoardSolved,
  isBoardValid,
  isColumnSolved,
  isColumnValid,
  isRowSolved,
  isRowValid,
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
function isValidMove(board) {
  return (
    // isRowValid(getRowFromPosition(pos), board) &&
    // isColumnValid(getColumnFromPosition(pos), board) &&
    // isSubBoardValid(getSubBoardFromPosition(pos), board)
    isBoardValid(board)
  );
}

export default function sudokuSolver() {
  let sudokuStepsToSolution = [];
}
