import { useRef, useState } from "react";
import PopOutDiv from "../PopOutDiv";
const min = 2;
const max = 25;
const maxSpeed = 5;
const minSpeed = 0;
const speedRate = 100;
const content =
  "Each block represents a 1x1 area of a grid./br" +
  "The Grey blocks are free spaces that haven't been added to a path or contain a wall, origin, mid-point, or end./br" +
  "The Green block represents the origin or initial position of our path. The origin can be moved anywhere in the grid where there is an unoccupyed space. There can only be one origin./br" +
  "The Purple block represents the mid-point. This is an optional space that can be placed anywhere there is an empty space and can also be removed. There can only be one mid-point./br" +
  "The Red block represents the goal or end position of the path. The goal can be moved to any unoccupied space. There can only be one goal./br" +
  "The Black blocks represent walls or positions the path cannot enter. Walls can be placed anywhere the is unoccupied space and can also be removed. There can be mutiple walls./br" +
  "The Yellow blocks are blocks that a path from origin has been found./br" +
  "The Blue blocks are blacks that have been checked to see if they are the end and will be expanded on.";
const getSpeed = (num) => (num === 0 ? 10 : speedRate * num);
const getSpeedSetting = (num) => (num === 10 ? 0 : num / speedRate);
export default function PathFindingToolBar(props) {
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState(false);
  const lengthSlideRef = useRef(null);
  const lengthInputRef = useRef(null);
  const speedSlideRef = useRef(null);
  const speedInputRef = useRef(null);
  const widthSlideRef = useRef(null);
  const widthInputRef = useRef(null);
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
          <button type="button" onClick={() => setActive((a) => !a)}>
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
