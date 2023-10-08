import Tile from "./Tile";
export default function Board(props) {
  const values = props.values;
  return (
    <div className="sudoku-board">
      {values.map((rows, i) =>
        rows.map((value, j) => <Tile value={value} key={`tile-${i}-${j}`} />)
      )}
    </div>
  );
}

/**
 * Checks if a row on a sudoku board is filled with valid values.
 * @param {number} rowNumber The Row of the board we are checking.
 * @param {number[][]} board The Sudoku Board
 * @returns {boolean} Is The row valid.
 */
export function isRowValid(rowNumber, board) {
  if (rowNumber >= 9 || rowNumber < 0)
    throw new Error(
      `Row must be in range [0,8] inclusive. You gave "${rowNumber}"`
    );
  const setValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let val of board[rowNumber]) {
    if (!val) return false;
    if (!setValues.has(val)) return false;
    setValues.delete(val);
  }
  return setValues.size() === 0;
}

/**
 * Checks if a column on a sudoku board is filled with valid values.
 * @param {number} colNumber The Column to be checked.
 * @param {number[][]} board The Sudoku Board
 * @returns {boolean} Is the column valid.
 */
export function isColumnValid(colNumber, board) {
  if (colNumber >= 9 || colNumber < 0)
    throw new Error(
      `Column must be in range [0,8] inclusive. You gave "${colNumber}"`
    );
  const setValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let i = 0; i < 9; i++) {
    const val = board[i][colNumber];
    if (!val) return false;
    if (!setValues.has(val)) return false;
    setValues.delete(val);
  }
  return setValues.size() === 0;
}

/**
 * Checks if a 3x3 sub board is filled with valid values. Sub boards are numbered 0-8 starting in top left going right then down.
 * [0,1,2]
 * [3,4,5]
 * [6,7,8]
 * Where each value is a 3x3 board.
 * @param {number} subBoardNumber The sub board to be checked. 0 being the top left, 2 being top right, 6 being bottom left, and 8 being bottom right.
 * @param {number[][]} board The sudoku board.
 * @returns {boolean} Is this sub bord valid.
 */
export function isSubBoardValid(subBoardNumber, board) {
  if (subBoardNumber >= 9 || subBoardNumber < 0)
    throw new Error(
      `SubBoard must be in range [0,8] inclusive. You gave "${subBoardNumber}"`
    );
  const row = 3 * Math.floor(subBoardNumber / 3);
  const col = 3 * subBoardNumber;
  const setValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const val = board[row + i][col + j];
      if (!val) return false;
      if (!setValues.has(val)) return false;
      setValues.delete(val);
    }
  }
  return setValues.size() === 0;
}

/**
 * Checks if a sudoku board is in a solved state.
 * @param {number[][]} board The Sudoku Board
 * @returns {boolean} Is board solved
 */
export function isBoardSolved(board) {
  for (let i = 0; i < 9; i++) {
    let solved =
      isColumnValid(i, board) &&
      isRowValid(i, board) &&
      isSubBoardValid(i, board);
    if (!solved) return false;
  }
  return true;
}

/**
 * Clones a sudoku board.
 * @param {number[][]} board A sudoku board
 * @returns {number[][]} A clone of a sudoku board
 */
export function cloneBoard(board) {
  return board.map((row) => [...row]);
}
