import React, { useRef } from "react";
import { sudokuSolverDescription } from "../../Scripts/strings";
import { text } from "@fortawesome/fontawesome-svg-core";

const content = [sudokuSolverDescription];
export default function BackTrackingControlBar(props) {
  const probSelectRef = useRef(null);
  return (
    <fieldset className="backtrackControlBar">
      <legend>Controls</legend>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="Back-Tracking-Problem-Select">Algorithm:</label>
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
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="Sudoku-Input-Grid">Input:</label>
          <div
            className="sudokuBoardInput"
            name="Sudoku-Input-Grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(9,2em)" }}
          >
            {props.sudokuBoard.map((c, i) => {
              const ref = React.createRef();
              return (
                <select
                  key={`sudoku-input-${i}`}
                  defaultValue={c}
                  ref={ref}
                  onChange={(e) => {
                    console.log("HERE");
                    const newBoard = `${props.sudokuBoard
                      .slice(0, i)
                      .join("")}${e.target.value}${props.sudokuBoard
                      .slice(i + 1)
                      .join("")}`;
                    console.log("newBoard", newBoard);

                    props.setBoards([newBoard]);
                  }}
                >
                  {["", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
                    (v, j) => (
                      <option value={v === "" ? "." : v} key={`opt-${i}-${j}`}>
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
            value={props.sudokuBoard.join("")}
            style={{ width: "21rem", padding: ".5rem .5rem" }}
            readOnly
          />
          <button type="button">Copy</button>
          <button type="button">Paste</button>
        </div>
      </div>
      {
        //TODO add show none if not selected
      }
    </fieldset>
  );
}
