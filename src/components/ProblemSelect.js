import { useRef } from "react";
import {
  defaultContent,
  pathFindingContent,
  searchingContent,
  sortingContent,
  encryptionContent,
  sudokuSolverDescription,
} from "../Scripts/strings";
const problemExplainations = [
  defaultContent,
  pathFindingContent,
  searchingContent,
  sortingContent,
  encryptionContent,
  sudokuSolverDescription,
];
export default function ProblemSelect(props) {
  const problemSelectRef = useRef(null);
  return (
    <div className="problemSelectDiv">
      <select
        name="ProblemSelect"
        className="problemSelectSelect"
        ref={problemSelectRef}
        onChange={() => {
          props.setProblemType(Number.parseInt(problemSelectRef.current.value));
          props.setContent(
            problemExplainations[
              Number.parseInt(problemSelectRef.current.value)
            ]
          );
        }}
      >
        <option value={0}>Select a Problem</option>
        <option value={1}>PathFinding</option>
        <option value={2}>Search</option>
        <option value={3}>Sort</option>
        <option value={4}>Encryption</option>
        <option value={5}>BackTracking</option>
      </select>
    </div>
  );
}
