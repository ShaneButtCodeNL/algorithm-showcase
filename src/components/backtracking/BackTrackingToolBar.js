import { useState, useRef } from "react";

const maxSpeed = 5;
const minSpeed = 1;
const speedRate = 100;
const getSpeed = (num) => speedRate * num;
const getSpeedSetting = (num) => num / speedRate;

export default function BackTrackingToolBar(props) {
  const [slide, setSlide] = useState(0);
  const speedSliderRef = useRef(null);
  const speedInputRef = useRef(null);
  return (
    <>
      <div
        className="sideBar"
        style={{
          maxWidth: `${slide ? "0%" : "20ch"}`,
        }}
      >
        <div className="sideToolBar">
          <label htmlFor="animationSpeedSlider">Animation Speed:</label>
          <input
            className="toolBarInput"
            type="number"
            ref={speedInputRef}
            max={maxSpeed}
            min={minSpeed}
            defaultValue={getSpeedSetting(props.animationSpeed)}
            onChange={() => {
              let s = getSpeed(Number.parseInt(speedInputRef.current.value));
              props.setAnimationSpeed(s);
              speedSliderRef.current.value = getSpeedSetting(s);
            }}
          />
          <input
            type="range"
            ref={speedSliderRef}
            max={maxSpeed}
            min={minSpeed}
            defaultValue={getSpeedSetting(props.animationSpeed)}
            onChange={() => {
              let s = getSpeed(Number.parseInt(speedSliderRef.current.value));
              props.setAnimationSpeed(s);
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
