export default function SudokuSolverDisplay(props) {
  return (
    <div id="sudokuSolverDisplay">
      {props.board.split("").map((v, i) => (
        <div
          className={`sudokuBoardTile ${
            props.sudokuPointer === i ? "sudokuCheck" : ""
          }`}
          key={`sudoku-tile-${i}`}
        >
          {v === "." ? " " : v}
        </div>
      ))}
    </div>
  );
}
