import { useRef } from "react";

const maxInput = 100,
  minInput = -100;

export default function SearchControlBar(props) {
  const searchValueRef = useRef(null);
  const jumpRef = useRef(null);
  const algoSelectRef = useRef(null);
  return (
    <fieldset className="searchControlBar">
      <legend>Controls</legend>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="searchValueInput">Search Value:</label>
          <br />
          <input
            type="number"
            name="searchValueInput"
            ref={searchValueRef}
            max={maxInput}
            min={minInput}
            defaultValue={props.searchValue}
            onChange={() => {
              let value = Math.min(
                100,
                Math.max(-100, Number.parseInt(searchValueRef.current.value))
              );
              searchValueRef.current.value = value;
              props.setSearchValue(value);
            }}
          />
        </div>
        <div className="controlBarValueItem">
          <label htmlFor="searchAlgorithm">Algorithm:</label>
          <br />
          <select
            className="searchAlgoSelect"
            name="searchAlgorithm"
            ref={algoSelectRef}
            onChange={() => {
              props.setAlgoID(Number.parseInt(algoSelectRef.current.value));
            }}
          >
            <option value={1}>Linear Search</option>
            <option value={2}>Binary Search</option>
            <option value={3}>Jump Search</option>
          </select>
        </div>
        <div className="controlBarValueItem" hidden={props.algoID !== 3}>
          <label htmlFor="jumpInput">Set Jump Size: </label>
          <br />
          <input
            ref={jumpRef}
            type="number"
            max={maxInput}
            min={0}
            defaultValue={props.jumpSize}
            onChange={() =>
              props.setJumpSize(Number.parseInt(jumpRef.current.value))
            }
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => props.applySearch(props.algoID)}
        disabled={props.isAnimated}
      >
        Start
      </button>
    </fieldset>
  );
}
