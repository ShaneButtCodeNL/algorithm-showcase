import { useRef } from "react";

const maxInput = 100,
  minInput = -100;
const basic =
  "Searching is the problem of finding if a certain object exists in a collection of items./br";
const linear =
  "Linear search iterates over the list one item at a time until either it reaches the end of the list or finds an item that matches the search criteria./br" +
  "This algorithm runs in O(n), Linear time";
const binary =
  "Binary search only works on a sorted list./br" +
  "It works by making a window of the entire collection and looking at the middle value./br" +
  "If the search value equals the middle value we are done./br" +
  "If the middle value is less than the search value, the value is to right of the current middle and we shrink the window so the new start is to the right of the current middle./br" +
  "If the middle value is larger than the search value then if it exists it must be between middle and left positions. So we move the left end of the window to the middle position./br" +
  "This will continue until either a value is found or the left side of the window moves beyond the right side of the window. If the left side extends beyond the right side, the value does not exist in the collection./br" +
  "This algorithm runs in O( Log(n) ), Logritmic time.";
const jump =
  "Jump search only works on a sorted list./br" +
  "Jump search works by createing a window of length 'm'./br" +
  "It the compares the search value to the first and last values of the window./br" +
  "If the left value is larger than the search value,the value doesn't exist. If it is equal to the search value we are done. Otherwise continue./br" +
  "If the right value is equal to the search value we are done. If the right value is larger than the search value the value is in this window if it exists, we then use a linear search from the left position of the window. If the right positions value is smaller the the seach value we move the window from [left,right] to [right+1,min(right+m,endOfList)]./br" +
  "This algorithm runs in O((n/m) + m-1), Linear time.";
const content = [basic + linear, basic + binary, basic + jump];
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
        <div className="controlBarValueItem">
          <label htmlFor="searchAlgorithm">Algorithm:</label>
          <br />
          <select
            className="searchAlgoSelect"
            name="searchAlgorithm"
            ref={algoSelectRef}
            onChange={() => {
              props.setAlgoID(Number.parseInt(algoSelectRef.current.value));
              props.setContent(
                content[Number.parseInt(algoSelectRef.current.value) - 1]
              );
            }}
          >
            <option value={1}>Linear Search</option>
            <option value={2}>Binary Search</option>
            <option value={3}>Jump Search</option>
          </select>
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
