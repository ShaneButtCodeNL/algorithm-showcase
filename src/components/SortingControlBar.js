import { useRef } from "react";

export default function SortingControlBar(props) {
  const algoSelectRef = useRef(null);

  return (
    <fieldset className="searchControlBar">
      <legend>Controls</legend>
      <div className="controlBarValueContainer">
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
            <option value={1}>Bubble Sort</option>
          </select>
        </div>
      </div>
    </fieldset>
  );
}
