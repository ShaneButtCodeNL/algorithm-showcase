import {
  isBoardSolved,
  isColumnValid,
  isRowValid,
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
test("Valid row checks as valid row for rows [0-8]. . .", () => {
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

test("Valid column checks should return true for cols [0-8]. . .", () => {
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

test("Valid sub boards checks should return true for sub boards [0-8]. . .", () => {
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

test("Valid boards checks should return true for solved puzzles. . .", () => {
  expect(isBoardSolved(solvedBoard)).toBeTruthy();
});

//Check for a double value
test("row check for row 0 should return false for a double value all others should be true . . .", () => {
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

test("Column check for column 4 should return false for a double value all others should be true . . .", () => {
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

test("subBoard check for Board 1 should return false for a double value all others should be true . . .", () => {
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

test("Should return false for a board with a double value", () => {
  expect(isBoardSolved(doubleValueRowZeroColumnFourBoard)).toBeFalsy();
});

// Check with a missing value
test("Row 0 missing a value and should fail rest should pass . . .", () => {
  expect(isRowValid(0, missingValueRowZeroColumnSevenBoard)).toBeFalsy();
  expect(isRowValid(7, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isRowValid(1, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isRowValid(2, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isRowValid(3, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isRowValid(4, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isRowValid(5, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isRowValid(6, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isRowValid(8, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
});

test("Column 7 mising a value and should fail rest should pass . . .", () => {
  expect(isColumnValid(7, missingValueRowZeroColumnSevenBoard)).toBeFalsy();
  expect(isColumnValid(0, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isColumnValid(1, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isColumnValid(2, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isColumnValid(3, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isColumnValid(4, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isColumnValid(5, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isColumnValid(6, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isColumnValid(8, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
});

test("Board 2 should fail from missing value rest should pass. . .", () => {
  expect(isSubBoardValid(2, missingValueRowZeroColumnSevenBoard)).toBeFalsy();
  expect(isSubBoardValid(0, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isSubBoardValid(1, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isSubBoardValid(3, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isSubBoardValid(4, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isSubBoardValid(5, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isSubBoardValid(6, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isSubBoardValid(7, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
  expect(isSubBoardValid(8, missingValueRowZeroColumnSevenBoard)).toBeTruthy();
});
test("Should return false for a board with a missing value", () => {
  expect(isBoardSolved(missingValueRowZeroColumnSevenBoard)).toBeFalsy();
});
