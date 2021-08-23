import { useRef } from "react";

const min = 2;
const max = 100;
export default function ToolBar(props) {
  const lengthSlideRef = useRef(null);
  const lengthInputRef = useRef(null);
  const widthSlideRef = useRef(null);
  const widthInputRef = useRef(null);
  return (
    <div>
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
          props.setLength(lengthInputRef.current.value);
          lengthSlideRef.current.value = "" + lengthInputRef.current.value;
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
          if (!widthInputRef.current.value) widthInputRef.current.value = min;
          if (widthInputRef.current.value > max)
            widthInputRef.current.value = max;
          props.setWidth(widthInputRef.current.value);
          widthSlideRef.current.value = "" + widthInputRef.current.value;
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
      </div>
    </div>
  );
}
