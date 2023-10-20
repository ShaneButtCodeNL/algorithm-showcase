import {
  getColumnFromPosition,
  getRowFromPosition,
} from "../../../Scripts/Sudoku";

export default function SudokuSolverDisplay(props) {
  return (
    <div id="sudokuSolverDisplayContainer">
      <div className="sudokuSolverInformationDisplay">
        <div>
          <label>Current Value:&nbsp;</label>
          <br />
          <span>
            {props.sudokuValue
              ? props.sudokuValue < 10
                ? props.sudokuValue
                : "Go Back"
              : " "}
          </span>
        </div>
        <div>
          <label>Current Position:</label>
          <br />
          <label>Column:&nbsp;</label>
          <span>
            {props.sudokuPointer === -1
              ? " "
              : getColumnFromPosition(props.sudokuPointer) + 1}
          </span>
          <br />
          <label>Row:&nbsp;</label>
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
