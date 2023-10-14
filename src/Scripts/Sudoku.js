const rangeFromOneToNineString = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Checks if a row on a sudoku board is filled with valid values or empty values.
 * @param {number} rowNumber The Row of the board we are checking.
 * @param {string} board The Sudoku Board
 * @returns {boolean} Is The row valid.
 */
export function isRowValid(rowNumber, board) {
  if (rowNumber >= 9 || rowNumber < 0)
    throw new Error(
      `Row must be in range [0,8] inclusive. You gave "${rowNumber}"`
    );
  const setValues = new Set();
  for (let i = 0; i < 9; i++) {
    let val = board[i + rowNumber * 9];
    if (val === ".") continue;
    if (setValues.has(val)) return false;
    setValues.add(val);
  }
  return true;
}

/**
 * Checks if a column on a sudoku board is filled with valid values or empty values.
 * @param {number} colNumber The Column to be checked.
 * @param {string} board The Sudoku Board
 * @returns {boolean} Is the column valid.
 */
export function isColumnValid(colNumber, board) {
  if (colNumber >= 9 || colNumber < 0)
    throw new Error(
      `Column must be in range [0,8] inclusive. You gave "${colNumber}"`
    );
  const setValues = new Set();
  for (let i = 0; i < 9; i++) {
    const val = board[i * 9 + colNumber];
    if (val === ".") continue;
    if (setValues.has(val)) return false;
    setValues.add(val);
  }
  return true;
}

/**
 * Checks if a 3x3 sub board is filled with valid values or empty values. Sub boards are numbered 0-8 starting in top left going right then down.
 * [0,1,2]
 * [3,4,5]
 * [6,7,8]
 * Where each value is a 3x3 board.
 * @param {number} subBoardNumber The sub board to be checked. 0 being the top left, 2 being top right, 6 being bottom left, and 8 being bottom right.
 * @param {string} board The sudoku board.
 * @returns {boolean} Is this sub bord valid.
 */
export function isSubBoardValid(subBoardNumber, board) {
  if (subBoardNumber >= 9 || subBoardNumber < 0)
    throw new Error(
      `SubBoard must be in range [0,8] inclusive. You gave "${subBoardNumber}"`
    );
  const boardOffset = 27 * Math.floor(subBoardNumber / 3);
  const boardMod = 3 * (subBoardNumber % 3);
  const setValues = new Set();

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const val = board[boardOffset + boardMod + 9 * i + j];
      if (val === ".") continue;
      if (setValues.has(val)) return false;
      setValues.add(val);
    }
  }
  return true;
}

/**
 * Checks if any rules of sudoku are being broken in a sudoku board
 * @param {string} board The sudoku board
 * @returns
 */
export function isBoardValid(board) {
  for (let i = 0; i < 9; i++) {
    if (
      !isRowValid(i, board) ||
      !isColumnValid(i, board) ||
      !isSubBoardValid(i, board)
    )
      return false;
  }
  return true;
}

/**
 * Checks if a row on a sudoku board is filled with valid values.
 * @param {number} rowNumber The Row of the board we are checking.
 * @param {string} board The Sudoku Board
 * @returns {boolean} Is The row valid.
 */
export function isRowSolved(rowNumber, board) {
  if (rowNumber >= 9 || rowNumber < 0)
    throw new Error(
      `Row must be in range [0,8] inclusive. You gave "${rowNumber}"`
    );
  const setValues = new Set([...rangeFromOneToNineString]);
  for (let i = 0; i < 9; i++) {
    let val = board[i + rowNumber * 9];
    if (!val || val === ".") return false;
    if (!setValues.has(val)) return false;
    setValues.delete(val);
  }
  return true;
}

/**
 * Checks if a column on a sudoku board is filled with valid values.
 * @param {number} colNumber The Column to be checked.
 * @param {number[][]} board The Sudoku Board
 * @returns {boolean} Is the column valid.
 */
export function isColumnSolved(colNumber, board) {
  if (colNumber >= 9 || colNumber < 0)
    throw new Error(
      `Column must be in range [0,8] inclusive. You gave "${colNumber}"`
    );
  const setValues = new Set([...rangeFromOneToNineString]);
  for (let i = 0; i < 9; i++) {
    const val = board[i * 9 + colNumber];
    if (!val || val === ".") return false;
    if (!setValues.has(val)) return false;
    setValues.delete(val);
  }
  return true;
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
export function isSubBoardSolved(subBoardNumber, board) {
  if (subBoardNumber >= 9 || subBoardNumber < 0)
    throw new Error(
      `SubBoard must be in range [0,8] inclusive. You gave "${subBoardNumber}"`
    );
  const boardOffset = 27 * Math.floor(subBoardNumber / 3);
  const boardMod = 3 * (subBoardNumber % 3);
  const setValues = new Set([...rangeFromOneToNineString]);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const val = board[boardOffset + boardMod + 9 * i + j];
      if (!val || val === ".") return false;
      if (!setValues.has(val)) return false;
      setValues.delete(val);
    }
  }
  return true;
}

/**
 * Checks if a sudoku board is in a solved state.
 * @param {number[][]} board The Sudoku Board
 * @returns {boolean} Is board solved
 */
export function isBoardSolved(board) {
  for (let i = 0; i < 9; i++) {
    let solved =
      isColumnSolved(i, board) &&
      isRowSolved(i, board) &&
      isSubBoardSolved(i, board);
    if (!solved) return false;
  }
  return true;
}
