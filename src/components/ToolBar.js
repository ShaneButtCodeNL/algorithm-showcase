import { useRef, useState } from "react";

const min = 2;
const max = 25;
export default function ToolBar(props) {
  const [slide, setSlide] = useState(0);
  const lengthSlideRef = useRef(null);
  const lengthInputRef = useRef(null);
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
            ref={algoSelectRef}
            onChange={() =>
              props.setAlgo(parseInt(algoSelectRef.current.value))
            }
          >
            <option value={1}>Bredth First Search</option>
            <option value={2}>A*</option>
            <option value={3}>Heuristic Search</option>
          </select>
          <button
            onClick={async () =>
              props
                .applySearch(
                  props.algo,
                  props.grids[0],
                  props.origin,
                  props.midPoint,
                  props.end
                )
                .then((res) => {
                  props.setGrids([...res]);
                  props.setGrid([...res][res.length - 1]);
                })
            }
          >
            Solve
          </button>

          <div id="stepControlDiv">
            <input
              id="pathStepDisplay"
              type="number"
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
