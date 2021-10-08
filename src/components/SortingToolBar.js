import { useRef, useState } from "react";
const maxSize = 100;
const minSize = 10;
const maxSpeed = 5;
const minSpeed = 1;
const speedRate = 100;
const getSpeed = (num) => speedRate * num;
const getSpeedSetting = (num) => num / speedRate;
export default function SortingToolBar(props) {
  const [slide, setSlide] = useState(0);
  const sizeSliderRef = useRef(null);
  const sizeInputRef = useRef(null);
  const speedSliderRef = useRef(null);
  const speedInputRef = useRef(null);
  const displayRef = useRef(null);
  return (
    <>
      <div
        className="sideBar"
        style={{
          maxWidth: `${slide ? "0%" : "20ch"}`,
        }}
      >
        <div className="sideToolBar">
          <label>Display Type</label>
          <select
            ref={displayRef}
            onChange={() =>
              props.setDisplayType(Number.parseInt(displayRef.current.value))
            }
          >
            <option value={0}>Numbers</option>
            <option value={1}>Bars</option>
          </select>
          <label>Collection Size</label>
          <input
            type="number"
            ref={sizeInputRef}
            className="toolBarInput"
            min={minSize}
            max={maxSize}
            defaultValue={props.size}
            onChange={() => {
              props.updateCollection(
                Number.parseInt(sizeInputRef.current.value)
              );
              sizeSliderRef.current.value = Number.parseInt(
                sizeInputRef.current.value
              );
            }}
          />
          <input
            type="range"
            ref={sizeSliderRef}
            max={maxSize}
            min={minSize}
            defaultValue={props.size}
            onChange={() => {
              props.updateCollection(
                Number.parseInt(sizeSliderRef.current.value)
              );
              sizeInputRef.current.value = Number.parseInt(
                sizeSliderRef.current.value
              );
            }}
          />
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
          <label htmlFor="randomButton">Randomize Collection</label>
          <button
            type="button"
            name="randomButton"
            onClick={() => props.randomizeCollection()}
          >
            Randomize List
          </button>
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
