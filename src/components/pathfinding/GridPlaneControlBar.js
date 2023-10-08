import { useRef } from "react";

const dijkstra =
  "Dijkstra's algorithm is an algorithm for finding the shortest distance between two points./br" +
  "The algorithm expands from the source traveling to the node with least traveling distance from the source./br" +
  "Thinking of the grid as a graph with n*m nodes, and unweighted edges between orthogonal nodes. This just turns into a simple Bredth First Search traversal of the grid./br" +
  "The main advantages of this algorithm are if there exists a path between two nodes it will find it, and it will be guarenteed to be a shortest path./br" +
  "The runtime is O(n*m) where n is the length and m is the height of the grid.";
const aStar =
  "AStar,or A*, algorithm is an algorithm for finding the shortest distance between two points./br" +
  "The algorithm expands from the source block traveling to next block using a rule to determine which block is best./br" +
  "In this case the rule used is the sum to extend to the block, g(n), and the distance from the block to the goal block,heuristic h(n)./br" +
  "Since this is an unweighted n*m graph with orthongonal edges the g(n) cost is g(n) of current block +1, and the h(n) cost we simply use a manhatten distance./br" +
  "The main advantages of this algorithm are if there exists a path between two nodes it will find it, and it will be guarenteed to be a shortest path./br" +
  "The runtime is O(n*m) where n is the length and m is the height of the grid. But since this a greedy algoritm it will find a solution faster than or equal to Dijkstra's";
const hsearch =
  "A heuristic search algorithm is an algorithm for finding a path between two points quickly. It's important to note this path may not be a shortest path./br" +
  "The algorithm expands from the source block traveling to the next block that has the best heuristic cost./br" +
  "Since this is an unweighted n*m graph with orthongonal edges the heuristic cost is the manhatten distance from the block to the end./br" +
  "The main advantage of this algorithm is it is a greedy algorithm so it will tend to be faster than most algorithms./br" +
  "the run time is O(n*m)  where n is the length and m is the height of the grid. But it will tend to finish quicker than this.";
const content = [dijkstra, aStar, hsearch];
export default function GridPlaneControlBar(props) {
  const algoSelectRef = useRef(null);
  const stepRef = useRef(null);

  return (
    <fieldset className="searchControlBar">
      <legend>Controls</legend>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="searchAlgorithm">Algorithm:</label>
          <br />
          <select
            className="searchAlgoSelect"
            name="searchAlgorithm"
            disabled={props.isAnimated}
            style={{ opacity: props.isAnimated ? "0.5" : "1" }}
            ref={algoSelectRef}
            onChange={() => {
              props.setAlgoID(Number.parseInt(algoSelectRef.current.value));
              props.stopAnimation();
              props.setStarted(false);
              props.changeStep(0);
              props.setSolved(false);
              props.setContent(
                content[Number.parseInt(algoSelectRef.current.value) - 1]
              );
            }}
          >
            <option value={1}>Dijkstra's</option>
            <option value={2}>A* </option>
            <option value={3}>Heuristic Best</option>
          </select>
        </div>
        <div className="controlBarValueItem">
          <div className="pathFindingControlToggles">
            <div
              className={`pathFindingControlToggle ${
                props.addWall ? "activeToggleItem" : ""
              }`}
              onClick={() => props.toggleAddWall()}
            >
              <label>Add Walls</label>
            </div>
            <div
              className={`pathFindingControlToggle ${
                props.changeOrigin ? "activeToggleItem" : ""
              }`}
              onClick={() => props.toggleChangeOrigin()}
            >
              <label>Move Origin</label>
            </div>
            <div
              className={`pathFindingControlToggle ${
                props.changeMidPoint ? "activeToggleItem" : ""
              }`}
              onClick={() => props.toggleChangeMid()}
            >
              <label>Move MidPoint</label>
            </div>
            <div
              className={`pathFindingControlToggle ${
                props.changeEnd ? "activeToggleItem" : ""
              }`}
              onClick={() => props.toggleChangeEnd()}
            >
              <label>Move End</label>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "20ch",
          maxHeight: props.started ? "0px" : "100%",
          overflow: "hidden",
        }}
      >
        <button
          style={{ width: "95%" }}
          disabled={props.started}
          onClick={async () => {
            props.setStarted(true);
            await props.applySearch(
              props.algoID,
              props.grids[0],
              props.origin,
              props.midPoint,
              props.end
            );
          }}
        >
          Start
        </button>
      </div>
      <div
        className={`gridAnimationButtonContainer`}
        style={{ maxHeight: props.started ? "100%" : "0px" }}
      >
        <button
          disabled={!props.started}
          onClick={() => {
            props.startAnimation(
              props.step === props.maxSteps ? 0 : props.step,
              props.maxSteps,
              props.grids,
              props.speed
            );
          }}
        >
          Start Animation
        </button>
        <button
          disabled={!props.started}
          onClick={() => {
            props.stopAnimation();
          }}
        >
          Stop Animation
        </button>
      </div>

      <div
        id="stepControlDiv"
        style={{
          maxHeight: props.started ? "100%" : "0px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => {
            stepRef.current.value = 0;
            props.changeStep(0);
          }}
        >
          F
        </button>
        <button
          onClick={() => {
            const newValue = Math.max(
              Number.parseInt(stepRef.current.value) - 1,
              0
            );
            stepRef.current.value = newValue;
            props.changeStep(newValue);
          }}
        >
          P
        </button>
        <button
          onClick={() => {
            const newValue = Math.min(
              Number.parseInt(stepRef.current.value) + 1,
              props.maxSteps
            );
            stepRef.current.value = newValue;
            props.changeStep(newValue);
          }}
        >
          N
        </button>
        <button
          onClick={() => {
            stepRef.current.value = props.maxSteps;
            props.changeStep(props.maxSteps);
          }}
        >
          L
        </button>
        <input
          id="pathStepDisplay"
          type="number"
          hidden={true}
          ref={stepRef}
          value={props.step}
          min={0}
          max={props.maxSteps}
          onChange={() => {
            if (
              stepRef.current.value === "" ||
              stepRef.current.value < 0 ||
              stepRef.current.value > props.maxSteps
            )
              return;
            props.changeStep(stepRef.current.value);
          }}
        />
      </div>
    </fieldset>
  );
}
