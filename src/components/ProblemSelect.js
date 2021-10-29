import { useRef } from "react";
const defaultContent = "You need to select a problem first.",
  pathFindingContent =
    "Dijkstra's algorithm is an algorithm for finding the shortest distance between two points./br" +
    "The algorithm expands from the source traveling to the node with least traveling distance from the source./br" +
    "Thinking of the grid as a graph with n*m nodes, and unweighted edges between orthogonal nodes. This just turns into a simple Bredth First Search traversal of the grid./br" +
    "The main advantages of this algorithm are if there exists a path between two nodes it will find it, and it will be guarenteed to be a shortest path./br" +
    "The runtime is O(n*m) where n is the length and m is the height of the grid.",
  searchingContent =
    "Searching is the problem of finding if a certain object exists in a collection of items./br Linear search iterates over the list one item at a time until either it reaches the end of the list or finds an item that matches the search criteria./brThis algorithm runs in O(n), Linear time",
  sortingContent =
    "Sorting is the problem of arranging the items of a collection in a certain order./brBubble Sort works by iterateing through the list and compareing the current value to the next value, moving the largest/smallest element towards the end of the list./brThe RunTime of Bubble sort is O(n^2).";

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
