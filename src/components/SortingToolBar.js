import { useRef, useState, useEffect } from "react";
import PopOutDiv from "./PopOutDiv";
const maxSize = 100;
const minSize = 10;
const maxSpeed = 5;
const minSpeed = 1;
const speedRate = 100;
const getSpeed = (num) => speedRate * num;
const getSpeedSetting = (num) => num / speedRate;
const barContent =
  "Colors:/br" +
  "A green block is in a relative sorted position./br" +
  "A red block is the current block we are going to place in a relative sorted position./br" +
  "A blue block means we are currently looking at the value of the block.";
const mergeContent =
  "Colors:/br" +
  "A Yellow bar is the merged part of two lists./br" +
  "All other colors show which bars are grouped together.";
const numberContent =
  "Pointers:/br" +
  "The Right facing carat '>', and Left facing carat '<' shows the window of values we are currently sorting the value in. If they are not present then we are looking at the entire set./br" +
  "The down arrow show a specfic position we are looking at./br" +
  "Colors:/br" +
  "A green block means this value is in a sorted position.";

export default function SortingToolBar(props) {
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState(false);
  const [content, setContent] = useState(numberContent);
  const [bars, setBars] = useState(false);
  const sizeSliderRef = useRef(null);
  const sizeInputRef = useRef(null);
  const speedSliderRef = useRef(null);
  const speedInputRef = useRef(null);
  const displayRef = useRef(null);
  useEffect(() => {
    if (props.algoID === 4) setContent(mergeContent);
    else
      setContent(displayRef.current.value === "1" ? barContent : numberContent);
  }, [props.algoID]);
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
          <label>Display Type</label>
          <select
            ref={displayRef}
            disabled={props.isAnimated}
            style={{ opacity: props.isAnimated ? "0.5" : "1" }}
            onChange={() => {
              props.setDisplayType(Number.parseInt(displayRef.current.value));
              setContent(
                props.algoID === 4
                  ? mergeContent
                  : displayRef.current.value === "1"
                  ? barContent
                  : numberContent
              );
              setBars(displayRef.current.value === "1");
            }}
          >
            <option value={0}>Numbers</option>
            <option value={1}>Bars</option>
          </select>
          <label>Collection Size</label>
          <input
            type="number"
            disabled={props.isAnimated}
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
            disabled={props.isAnimated}
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
            disabled={props.isAnimated}
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
            disabled={props.isAnimated}
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
            disabled={props.isAnimated}
            style={{ opacity: props.isAnimated ? "0.5" : "1" }}
            onClick={() => props.randomizeCollection()}
          >
            Randomize List
          </button>
          <button
            type="button"
            name="keyButton"
            onClick={() => setActive((a) => !a)}
          >
            Key
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
