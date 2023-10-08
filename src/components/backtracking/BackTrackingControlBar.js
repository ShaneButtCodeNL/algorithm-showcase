import { useRef } from "react";
import { sudokuSolverDescription } from "../../Scripts/strings";

const content = [sudokuSolverDescription];
export default function BackTrackingControlBar(props) {
  const probSelectRef = useRef(null);
  return (
    <fieldset className="backtrackControlBar">
      <legend>Controls</legend>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="searchAlgorithm">Algorithm:</label>
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
      {
        //TODO add show none if not selected
      }
      <div className="controlBarValueContainer" style={{ display: "flex" }}>
        <div className="selectInputSudokuContainer">
          <select>
            <option value={1}>Board</option>
            <option value={2}>String</option>
          </select>
        </div>
      </div>
    </fieldset>
  );
}
