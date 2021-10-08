import { useRef } from "react";

export default function ProblemSelect(props) {
  const problemSelectRef = useRef(null);
  return (
    <div className="problemSelectDiv">
      <select
        name="ProblemSelect"
        className="problemSelectSelect"
        ref={problemSelectRef}
        onChange={() => {
          props.setAlgoType(Number.parseInt(problemSelectRef.current.value));
        }}
      >
        <option value={0}>Select a Problem</option>
        <option value={1}>PathFinding</option>
        <option value={2}>Search</option>
        <option value={3}>Sort</option>
      </select>
    </div>
  );
}
