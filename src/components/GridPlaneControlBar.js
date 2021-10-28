import { useRef } from "react";

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
