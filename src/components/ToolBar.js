import { useRef, useState } from "react";

const min = 2;
const max = 25;
const minSpeed = 50;
const maxSpeed = 500;
export default function ToolBar(props) {
  const [slide, setSlide] = useState(0);
  const lengthSlideRef = useRef(null);
  const lengthInputRef = useRef(null);
  const speedSlideRef = useRef(null);
  const speedInputRef = useRef(null);
  const widthSlideRef = useRef(null);
  const widthInputRef = useRef(null);
  const algoSelectRef = useRef(null);
  const stepRef = useRef(null);
  return (
    <>
      <div
        className="sideBar"
        style={{
          maxWidth: `${slide ? "0%" : "20ch"}`,
        }}
      >
        <div className="sideToolBar">
          <label htmlFor="lengthSlider">{`Length: `}</label>
          <input
            className="toolBarInput"
            ref={lengthInputRef}
            type="number"
            defaultValue={props.length}
            min={min}
            max={max}
            onChange={() => {
              if (
                !lengthInputRef.current.value ||
                lengthInputRef.current.value < min
              )
                lengthInputRef.current.value = min;
              if (lengthInputRef.current.value > max)
                lengthInputRef.current.value = max;
              props.setLength(parseInt(lengthInputRef.current.value));
              lengthSlideRef.current.value = lengthInputRef.current.value;
            }}
          />
          <input
            ref={lengthSlideRef}
            type="range"
            id="lengthSlider"
            name="lengthSlider"
            defaultValue={props.length || 10}
            onChange={() => {
              props.setLength(parseInt(lengthSlideRef.current.value));
              lengthInputRef.current.value = lengthSlideRef.current.value;
            }}
            min={min}
            max={max}
          />
          <label htmlFor="widthSlider">{`Width: `}</label>
          <input
            className="toolBarInput"
            ref={widthInputRef}
            type="number"
            defaultValue={props.width}
            min={min}
            max={max}
            onChange={() => {
              if (!widthInputRef.current.value)
                widthInputRef.current.value = min;
              if (widthInputRef.current.value > max)
                widthInputRef.current.value = max;
              props.setWidth(parseInt(widthInputRef.current.value));
              widthSlideRef.current.value = widthInputRef.current.value;
            }}
          />
          <input
            ref={widthSlideRef}
            type="range"
            id="widthSlider"
            name="widthSlider"
            defaultValue={props.width || 10}
            onChange={() => {
              props.setWidth(parseInt(widthSlideRef.current.value));
              widthInputRef.current.value = widthSlideRef.current.value;
            }}
            min={min}
            max={max}
          />
          <label htmlFor="speedSlider">{`Speed :`}</label>
          <input
            className="toolBarInput"
            type="number"
            ref={speedInputRef}
            defaultValue={props.speed}
            min={minSpeed}
            max={maxSpeed}
            disabled={props.isAnimationPlaying}
            onChange={() => {
              props.setSpeed(parseInt(speedInputRef.current.value));
              speedSlideRef.current.value = speedInputRef.current.value;
            }}
          />
          <input
            ref={speedSlideRef}
            type="range"
            id="speedSlider"
            name="speedSlider"
            defaultValue={props.speed}
            min={minSpeed}
            max={maxSpeed}
            disabled={props.isAnimationPlaying}
            onChange={() => {
              props.setSpeed(speedSlideRef.current.value);
              speedInputRef.current.value = speedSlideRef.current.value;
            }}
          />
          <div id="toggleModeDiv">
            <div
              className={`toggleModeItem ${
                props.addWall ? "activeToggleItem" : ""
              }`}
              onClick={() => props.toggleAddWall()}
            >
              Add Wall
            </div>
            <div
              className={`toggleModeItem ${
                props.changeOrigin ? "activeToggleItem" : ""
              }`}
              onClick={() => props.toggleChangeOrigin()}
            >
              Move Origin
            </div>
            <div
              className={`toggleModeItem ${
                props.changeEnd ? "activeToggleItem" : ""
              }`}
              onClick={() => props.toggleChangeEnd()}
            >
              Move End
            </div>
            <div
              className={`toggleModeItem ${
                props.changeMidPoint ? "activeToggleItem" : ""
              }`}
              onClick={() => props.toggleChangeMid()}
            >
              Set MidWay
            </div>
          </div>

          <select
            className="gridSearchSelect"
            ref={algoSelectRef}
            onChange={() => {
              props.setAlgo(parseInt(algoSelectRef.current.value));
              props.stopAnimation();
              props.setStarted(false);
              props.changeStep(0);
              props.setSolved(false);
            }}
          >
            <option value={1}>Bredth First Search</option>
            <option value={2}>A*</option>
            <option value={3}>Heuristic Search</option>
          </select>
          <div
            className={`${props.started ? "shrinkVert" : "growVert"}Div`}
            style={{ width: "20ch" }}
          >
            <button
              style={{ width: "92%" }}
              disabled={props.started}
              onClick={async () => {
                props.setStarted(true);
                await props.applySearch(
                  props.algo,
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
            className={`gridAnimationButtonContainer ${
              !props.started ? "shrinkVert" : "growVert"
            }Div`}
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
            className={`${props.started ? "growVert" : "shrinkVert"}Div`}
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
              defaultValue={props.step}
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
        </div>
      </div>
      <div
        className="sideBarSlide"
        onClick={() => setSlide((v) => (v + 1) % 2)}
      >
        <span>{`${slide ? ">" : "<"}`}</span>
        <span>{`${slide ? ">" : "<"}`}</span>
      </div>
    </>
  );
}
