import { isRowValid } from "./Sudoku";

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
  "827184396965327148341689552593468271472513689618972435786154796823239841567";
const missingValueRowZeroColumnSevenBoard =
  "8271543.6965327148341689552593468271472513689618972435786154796823239841567";

test("Valid row checks as valid row for rows [0-8]. . .", () => {
  expect(isRowValid(1, solvedBoard)).toBeTruthy();
  expect(isRowValid(2, solvedBoard)).toBeTruthy();
  expect(isRowValid(3, solvedBoard)).toBeTruthy();
  expect(isRowValid(4, solvedBoard)).toBeTruthy();
  expect(isRowValid(5, solvedBoard)).toBeTruthy();
  expect(isRowValid(6, solvedBoard)).toBeTruthy();
  expect(isRowValid(7, solvedBoard)).toBeTruthy();
  expect(isRowValid(8, solvedBoard)).toBeTruthy();
});
