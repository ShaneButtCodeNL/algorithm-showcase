import React, { useRef } from "react";
import {
  sudokuSolverDescription,
  sudokuTemplates,
} from "../../Scripts/strings";

const content = [sudokuSolverDescription];
export default function BackTrackingControlBar(props) {
  const probSelectRef = useRef(null);
  return (
    <fieldset
      className="backtrackControlBar"
      style={{
        height: "fit-content",
        borderRadius: "1em",
        padding: ".5em 1em 1em 1em",
      }}
    >
      <legend style={{ marginLeft: "1em" }}>Controls</legend>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="Back-Tracking-Problem-Select">
            Algorithm:{props.algoId === 0}
          </label>
          <br />
          {
            //TODO add disabled on animation
            //TODO add opacity on animation
            //TODO add setContent to onChange
          }
          <select
            className="backTrackProbSelect"
            name="Back-Tracking-Problem-Select"
            ref={probSelectRef}
          >
            <option value={1}>Sudoku Solver</option>
          </select>
        </div>
      </div>
      <div
        id="sudokuSolverContainer"
        style={props.algoId === 1 ? {} : { display: "none" }}
      >
        <div className="controlBarValueContainer">
          <div className="controlBarValueItem">
            <label htmlFor="Sudoku-Input-Grid">Input:</label>
            <div
              className="sudokuBoardInput"
              name="Sudoku-Input-Grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(9,2em)" }}
            >
              {props.sudokuBoard.split("").map((c, i) => {
                const ref = React.createRef();
                return (
                  <select
                    key={`sudoku-input-${i}-value-${c}`}
                    defaultValue={c}
                    ref={ref}
                    onChange={(e) => {
                      const newBoard = `${props.sudokuBoard.substring(0, i)}${
                        e.target.value
                      }${props.sudokuBoard.substring(i + 1)}`;

                      props.setBoards([newBoard]);
                    }}
                  >
                    {["", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
                      (v, j) => (
                        <option
                          value={v === "" ? "." : v}
                          key={`opt-${i}-${j}`}
                        >
                          {v}
                        </option>
                      )
                    )}
                  </select>
                );
              })}
            </div>
          </div>
        </div>
        <div className="controlBarValueContainer">
          <div className="controlBarValueItem">
            <label htmlFor="Sudoku-Input-String">Input as String:</label>
            <br />
            <input
              type="text"
              value={props.sudokuBoard}
              style={{ width: "21rem", padding: ".5rem .5rem" }}
              readOnly
            />
            <button type="button">Copy</button>
            <button type="button">Paste</button>
          </div>
        </div>
      </div>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          {sudokuTemplates.map((v, i) => (
            <button
              key={`sudoku-templaate-${i}`}
              onClick={() => {
                props.setBoards([v]);
                props.setSudokuPointer(-1);
                props.setCurrentBoard(0);
              }}
            >
              Template {i + 1}
            </button>
          ))}
        </div>
      </div>
    </fieldset>
  );
}
