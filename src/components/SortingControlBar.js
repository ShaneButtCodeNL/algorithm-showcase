import { useRef } from "react";

const bubble =
  "Sorting is the problem of arranging the items of a collection in a certain order./br" +
  "Bubble Sort works by iterateing through the list and compareing the current value to the next value, moving the largest/smallest element towards the end of the list./br" +
  "The RunTime of Bubble sort is O(n^2).";
const selection =
  "Sorting is the problem of arranging the items of a collection in a certain order./br" +
  "Selection sort works by iterating over an array from [0,n] finding the minimum/maximum value and swapping it with position 0. It will then iterate over [1,n] and do the same swaping the minimum value with position 1 and so on until all thats left is [n,n]./br" +
  "The runtime is O(n^2).";
const insertion =
  "Sorting is the problem of arranging the items of a collection in a certain order./br" +
  "Insertion sort works by logically divideing the list into two parts, the sorted and unsorted parts./br" +
  "The sorted list starts at [0,0] and the unsorted starts at [1,n] as the sorted list only has 1 value it is sorted. we then take the value at 1 and add it to the sorted list at is correct position. Now the sorted list is [0,1] and the unsorted list is [2,n]. We continue this until every value is in the sorted list./br" +
  "The runtime is O(n^2).";
const merge =
  "Sorting is the problem of arranging the items of a collection in a certain order./br" +
  "Merge sort works by spliting the list into n lists of size one. We then start merging the lists together to get n/2 sorted lists. Repeat this givening us n/4, n/8,n/16,...,1 sorted lists./br" +
  "The merge operation works by compareing the first values of a pair of lists and taking the smallest/largest value and putting it first and removing it from it's list. Repeat until a list is empty then just add the remaining values to the end resulting in a sorted list./br" +
  "The runtime is O(nlog(n))";
const content = [bubble, selection, insertion, merge];

export default function SortingControlBar(props) {
  const algoSelectRef = useRef(null);

  return (
    <fieldset
      className="searchControlBar"
      style={{ marginBottom: props.algoID === 4 ? "1.2em" : "0em" }}
    >
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
              props.resetPointers();
              props.setContent(
                content[Number.parseInt(algoSelectRef.current.value) - 1]
              );
              props.setCollection(props.resetSearchState(props.collection));
              props.resetPointers();
            }}
          >
            <option value={1}>Bubble Sort</option>
            <option value={2}>Selection Sort</option>
            <option value={3}>Insertion Sort</option>
            <option value={4}>Merge Sort</option>
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          props.applySort(props.algoID);
        }}
        disabled={props.isAnimated}
      >
        Start
      </button>
      <button
        type="button"
        onClick={() => {
          props.stopAnimation();
        }}
      >
        Stop Animation
      </button>
    </fieldset>
  );
}
