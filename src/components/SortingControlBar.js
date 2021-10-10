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
            disabled={props.isAnimated}
            style={{ opacity: props.isAnimated ? "0.5" : "1" }}
            ref={algoSelectRef}
            onChange={() => {
              props.setAlgoID(Number.parseInt(algoSelectRef.current.value));
            }}
          >
            <option value={1}>Bubble Sort</option>
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          console.log("ALGOID:", props.algoID);
          props.applySort(props.algoID);
        }}
        disabled={props.isAnimated}
      >
        Start
      </button>
    </fieldset>
  );
}
