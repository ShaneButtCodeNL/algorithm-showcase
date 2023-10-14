import {
  isBoardSolved,
  isBoardValid,
  isColumnSolved,
  isColumnValid,
  isRowSolved,
  isRowValid,
  isSubBoardSolved,
  isSubBoardValid,
} from "./Sudoku";

const solvedBoard =
  "827154396" +
  "965327148" +
  "341689752" +
  "593468271" +
  "472513689" +
  "618972435" +
  "786235914" +
  "154796823" +
  "239841567";
const doubleValueRowZeroColumnFourBoard =
  "827184396" +
  "965327148" +
  "341689752" +
  "593468271" +
  "472513689" +
  "618972435" +
  "786235914" +
  "154796823" +
  "239841567";
const missingValueRowZeroColumnSevenBoard =
  "8271543.6" +
  "965327148" +
  "341689752" +
  "593468271" +
  "472513689" +
  "618972435" +
  "786235914" +
  "154796823" +
  "239841567";

//Check solved board
test("Check if row valid for rows [0-8] in solved board. . .", () => {
  expect(isRowValid(0, solvedBoard)).toBeTruthy();
  expect(isRowValid(1, solvedBoard)).toBeTruthy();
  expect(isRowValid(2, solvedBoard)).toBeTruthy();
  expect(isRowValid(3, solvedBoard)).toBeTruthy();
  expect(isRowValid(4, solvedBoard)).toBeTruthy();
  expect(isRowValid(5, solvedBoard)).toBeTruthy();
  expect(isRowValid(6, solvedBoard)).toBeTruthy();
  expect(isRowValid(7, solvedBoard)).toBeTruthy();
  expect(isRowValid(8, solvedBoard)).toBeTruthy();
});

test("Check if row solved for rows [0-8] in solved board. . .", () => {
  expect(isRowSolved(0, solvedBoard)).toBeTruthy();
  expect(isRowSolved(1, solvedBoard)).toBeTruthy();
  expect(isRowSolved(2, solvedBoard)).toBeTruthy();
  expect(isRowSolved(3, solvedBoard)).toBeTruthy();
  expect(isRowSolved(4, solvedBoard)).toBeTruthy();
  expect(isRowSolved(5, solvedBoard)).toBeTruthy();
  expect(isRowSolved(6, solvedBoard)).toBeTruthy();
  expect(isRowSolved(7, solvedBoard)).toBeTruthy();
  expect(isRowSolved(8, solvedBoard)).toBeTruthy();
});

test("Check if column valid for columns [0-8] in solved board. . .", () => {
  expect(isColumnValid(0, solvedBoard)).toBeTruthy();
  expect(isColumnValid(1, solvedBoard)).toBeTruthy();
  expect(isColumnValid(2, solvedBoard)).toBeTruthy();
  expect(isColumnValid(3, solvedBoard)).toBeTruthy();
  expect(isColumnValid(4, solvedBoard)).toBeTruthy();
  expect(isColumnValid(5, solvedBoard)).toBeTruthy();
  expect(isColumnValid(6, solvedBoard)).toBeTruthy();
  expect(isColumnValid(7, solvedBoard)).toBeTruthy();
  expect(isColumnValid(8, solvedBoard)).toBeTruthy();
});

test("Check if column solved for columns [0-8] in solved board. . .", () => {
  expect(isColumnSolved(0, solvedBoard)).toBeTruthy();
  expect(isColumnSolved(1, solvedBoard)).toBeTruthy();
  expect(isColumnSolved(2, solvedBoard)).toBeTruthy();
  expect(isColumnSolved(3, solvedBoard)).toBeTruthy();
  expect(isColumnSolved(4, solvedBoard)).toBeTruthy();
  expect(isColumnSolved(5, solvedBoard)).toBeTruthy();
  expect(isColumnSolved(6, solvedBoard)).toBeTruthy();
  expect(isColumnSolved(7, solvedBoard)).toBeTruthy();
  expect(isColumnSolved(8, solvedBoard)).toBeTruthy();
});

test("Check if sub-board valid for sub-board [0-8] in solved board. . .", () => {
  expect(isSubBoardValid(0, solvedBoard)).toBeTruthy();
  expect(isSubBoardValid(1, solvedBoard)).toBeTruthy();
  expect(isSubBoardValid(2, solvedBoard)).toBeTruthy();
  expect(isSubBoardValid(3, solvedBoard)).toBeTruthy();
  expect(isSubBoardValid(4, solvedBoard)).toBeTruthy();
  expect(isSubBoardValid(5, solvedBoard)).toBeTruthy();
  expect(isSubBoardValid(6, solvedBoard)).toBeTruthy();
  expect(isSubBoardValid(7, solvedBoard)).toBeTruthy();
  expect(isSubBoardValid(8, solvedBoard)).toBeTruthy();
});

test("Check if sub-board solved for sub-board [0-8] in solved board. . .", () => {
  expect(isSubBoardSolved(0, solvedBoard)).toBeTruthy();
  expect(isSubBoardSolved(1, solvedBoard)).toBeTruthy();
  expect(isSubBoardSolved(2, solvedBoard)).toBeTruthy();
  expect(isSubBoardSolved(3, solvedBoard)).toBeTruthy();
  expect(isSubBoardSolved(4, solvedBoard)).toBeTruthy();
  expect(isSubBoardSolved(5, solvedBoard)).toBeTruthy();
  expect(isSubBoardSolved(6, solvedBoard)).toBeTruthy();
  expect(isSubBoardSolved(7, solvedBoard)).toBeTruthy();
  expect(isSubBoardSolved(8, solvedBoard)).toBeTruthy();
});

test("Valid boards checks should return true for solved puzzles. . .", () => {
  expect(isBoardSolved(solvedBoard)).toBeTruthy();
  expect(isBoardValid(solvedBoard)).toBeTruthy();
});

//Check for a double value
test("row check for validity of row 0 should return false for a double value all others should be true . . .", () => {
  expect(isRowValid(0, doubleValueRowZeroColumnFourBoard)).toBeFalsy();
  expect(isRowValid(1, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowValid(2, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowValid(3, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowValid(4, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowValid(5, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowValid(6, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowValid(7, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowValid(8, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
});

test("row check for solution of row 0 should return false for a double value all others should be true . . .", () => {
  expect(isRowSolved(0, doubleValueRowZeroColumnFourBoard)).toBeFalsy();
  expect(isRowSolved(1, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowSolved(2, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowSolved(3, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowSolved(4, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowSolved(5, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowSolved(6, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowSolved(7, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isRowSolved(8, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
});

test("Column check for validity of column 4 should return false for a double value all others should be true . . .", () => {
  expect(isColumnValid(4, doubleValueRowZeroColumnFourBoard)).toBeFalsy();
  expect(isColumnValid(0, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnValid(1, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnValid(2, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnValid(3, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnValid(5, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnValid(6, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnValid(7, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnValid(8, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
});

test("Column check for Solution of column 4 should return false for a double value all others should be true . . .", () => {
  expect(isColumnSolved(4, doubleValueRowZeroColumnFourBoard)).toBeFalsy();
  expect(isColumnSolved(0, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnSolved(1, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnSolved(2, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnSolved(3, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnSolved(5, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnSolved(6, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnSolved(7, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isColumnSolved(8, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
});

test("subBoard check for validity of Board 1 should return false for a double value all others should be true . . .", () => {
  expect(isSubBoardValid(1, doubleValueRowZeroColumnFourBoard)).toBeFalsy();
  expect(isSubBoardValid(0, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardValid(2, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardValid(3, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardValid(4, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardValid(5, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardValid(6, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardValid(7, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardValid(8, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
});

test("subBoard check for solution of Board 1 should return false for a double value all others should be true . . .", () => {
  expect(isSubBoardSolved(1, doubleValueRowZeroColumnFourBoard)).toBeFalsy();
  expect(isSubBoardSolved(0, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardSolved(2, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardSolved(3, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardSolved(4, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardSolved(5, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardSolved(6, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardSolved(7, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
  expect(isSubBoardSolved(8, doubleValueRowZeroColumnFourBoard)).toBeTruthy();
});

test("Should return false for a board with a double value", () => {
  expect(isBoardSolved(doubleValueRowZeroColumnFourBoard)).toBeFalsy();
  expect(isBoardValid(doubleValueRowZeroColumnFourBoard)).toBeFalsy();
});

// Check with a missing value
test("Row 0 missing a value and should fail solution but should pass validity . . .", () => {
  expect(isRowSolved(0, missingValueRowZeroColumnSevenBoard)).toBeFalsy();
  expect(isRowValid(0, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
});

test("Column 7 mising a value and should fail solution but should pass validity . . .", () => {
  expect(isColumnSolved(7, missingValueRowZeroColumnSevenBoard)).toBeFalsy();
  expect(isColumnValid(7, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
});

test("Board 2 should fail solution from missing value but should pass validity . . .", () => {
  expect(isSubBoardSolved(2, missingValueRowZeroColumnSevenBoard)).toBeFalsy();
  expect(isSubBoardValid(2, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
});
test("Should return false for solution for a board with a missing value but validity should pass . . .", () => {
  expect(isBoardSolved(missingValueRowZeroColumnSevenBoard)).toBeFalsy();
  expect(isBoardValid(missingValueRowZeroColumnSevenBoard)).toBeTruthy();
});
