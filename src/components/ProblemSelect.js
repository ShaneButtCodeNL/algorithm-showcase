import { useRef } from "react";
const defaultContent = "You need to select a problem first.",
  pathFindingContent =
    "Path finding is given some graph finding a path between two points./brFinding a shortest path between two points is important part of this problem.",
  searchingContent =
    "Searching is the problem of finding if a certain object exists in a collection of items./br Linear search iterates over the list one item at a time until either it reaches the end of the list or finds an item that matches the search criteria./brThis algorithm runs in O(n), Linear time",
  sortingContent =
    "Sorting is the problem of arranging the items of a collection in a certain order./br";

const problemExplainations = [
  defaultContent,
  pathFindingContent,
  searchingContent,
  sortingContent,
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
      </select>
    </div>
  );
}
