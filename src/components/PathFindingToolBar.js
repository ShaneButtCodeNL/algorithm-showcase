import { useRef, useState } from "react";

const min = 2;
const max = 25;
const maxSpeed = 5;
const minSpeed = 0;
const speedRate = 100;
const getSpeed = (num) => (num === 0 ? 10 : speedRate * num);
const getSpeedSetting = (num) => (num === 10 ? 0 : num / speedRate);
export default function PathFindingToolBar(props) {
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
            defaultValue={getSpeedSetting(props.speed)}
            min={minSpeed}
            max={maxSpeed}
            disabled={props.isAnimationPlaying}
            onChange={() => {
              let s = getSpeed(Number.parseInt(speedInputRef.current.value));
              props.setSpeed(s);
              speedSlideRef.current.value = getSpeedSetting(s);
            }}
          />
          <input
            ref={speedSlideRef}
            type="range"
            id="speedSlider"
            name="speedSlider"
            defaultValue={getSpeedSetting(props.speed)}
            min={minSpeed}
            max={maxSpeed}
            disabled={props.isAnimationPlaying}
            onChange={() => {
              let s = getSpeed(Number.parseInt(speedSlideRef.current.value));
              props.setSpeed(s);
              speedInputRef.current.value = getSpeedSetting(s);
            }}
          />
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
