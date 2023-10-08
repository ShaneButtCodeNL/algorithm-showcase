import { useRef, useState } from "react";
import PopOutDiv from "../PopOutDiv";
const maxSpeed = 5;
const minSpeed = 1;
const speedRate = 100;
const getSpeed = (num) => speedRate * num;
const getSpeedSetting = (num) => num / speedRate;
const content =
  "Pointers:/br" +
  "The Right facing carat '>', and Left facing carat '<' shows that the search window we are currently searching for the value in. If they are not present then we are looking at the entire set./br" +
  "The down arrow show a specfic position we are looking at./br" +
  "Colors:/br" +
  "If the block is faded this means the value is currently not in the search window./br" +
  "If the background is red this means this value was checked but wasn't the value we are looking for./br" +
  "If the background is green then this value was checked and was the value we are looking for.";

export default function EncryptionToolBar(props) {
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState(false);
  const speedSliderRef = useRef(null);
  const speedInputRef = useRef(null);
  return (
    <>
      <PopOutDiv active={active} setActive={setActive} content={content} />

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
