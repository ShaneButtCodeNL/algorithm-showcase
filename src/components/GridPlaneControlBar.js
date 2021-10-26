import { useRef } from "react";
export default function GridPlaneControlBar(props) {
  const algoSelectRef = useRef(null);
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
            }}
          >
            <option value={1}>Dicktras</option>
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
    </fieldset>
  );
}
