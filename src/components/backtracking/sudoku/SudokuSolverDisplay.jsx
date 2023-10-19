import {
  getColumnFromPosition,
  getRowFromPosition,
} from "../../../Scripts/Sudoku";

export default function SudokuSolverDisplay(props) {
  return (
    <div id="sudokuSolverDisplayContainer">
      <div className="sudokuSolverInformationDisplay">
        <div>
          <label>Current Value:</label>
          <span>{props.sudokuValue ? props.sudokuValue : " "}</span>
        </div>
        <div>
          <label>Pointer:</label>
          <span>{props.sudokuPointer === -1 ? " " : props.sudokuPointer}</span>
          <label>Current Position:</label>
          <label>Column:</label>
          <span>
            {props.sudokuPointer === -1
              ? " "
              : getColumnFromPosition(props.sudokuPointer) + 1}
          </span>
          <label>Row:</label>
          <span>
            {props.sudokuPointer === -1
              ? " "
              : getRowFromPosition(props.sudokuPointer) + 1}
          </span>
        </div>
      </div>
      <div id="sudokuSolverBoardDisplay">
        {props.displayBoard.split("").map((v, i) => (
          <div
            className={`sudokuBoardTile ${
              props.sudokuPointer === i ? "sudokuCheck" : ""
            } ${props.inputBoard[i] === "." ? "sudokuGivenValue" : ""}`}
            key={`sudoku-tile-${i}`}
          >
            {v === "." ? " " : v}
          </div>
        ))}
      </div>
    </div>
  );
}
