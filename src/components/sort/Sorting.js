import { useState } from "react";
import {
  BubbleSort,
  InsertionSort,
  MergeSort,
  SelectionSort,
} from "../../Scripts/Sort";
import SortingNodeList from "./SortingNodeList";
import SortingToolBar from "./SortingToolBar";

const maxValue = 200,
  minValue = 0;
/**
 * Make a collection from 0-num-1
 * @param {Number} num Length of collection
 * @returns {Object[]} A collection of values from [0 , num)
 */
const makeCollection = (num) =>
  Array.from({ length: num }, (_, i) => {
    return { value: i, order: i, state: 0 };
  });

const cloneCollection = (collection) =>
  collection.map((v) => {
    return { ...v };
  });
export default function Sorting(props) {
  const [collection, setCollection] = useState(() => makeCollection(10));
  const [size, setSize] = useState(10);
  const [algoID, setAlgoID] = useState(1);
  const [displayType, setDisplayType] = useState(0);
  const [mainPointer, setMainPointer] = useState(-1);
  const [rightPosition, setRightPosition] = useState(-1);
  const [leftPosition, setLeftPosition] = useState(-1);
  const [asending, setAsending] = useState(true);
  const [animation, setAnimation] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const resetSearchState = (c) => {
    setMainPointer(-1);
    let cloned = (c ? c : collection).map((v) => {
      return { ...v };
    });
    cloned.sort((a, b) => a.order - b.order);
    cloned.forEach((item, index) => {
      item.state = 0;
      item.order = index;
    });
    return cloned;
  };
  const resetPointers = () => {
    setMainPointer(-1);
    setLeftPosition(-1);
    setRightPosition(-1);
  };
  const randomizeCollection = () => {
    stopAnimation();
    let cloned = collection.map((v) => {
      return { ...v };
    });
    for (let item of cloned) {
      item.value = Math.floor(Math.random() * (maxValue + 1));
    }
    setCollection(resetSearchState(cloned));
    resetPointers();
  };
  const updateCollection = (num) => {
    setCollection(() => makeCollection(num));
    setSize(num);
    resetPointers();
  };
  const stopAnimation = () => {
    if (animation === null) return;
    clearInterval(animation);
    setAnimation(null);
  };

  const applySort = (id) => {
    let clone = cloneCollection(collection);
    switch (id) {
      case 1:
        BubbleSort(
          collection,
          asending,
          setCollection,
          setMainPointer,
          setRightPosition,
          setAnimation,
          animationSpeed,
          mainPointer,
          rightPosition
        );
        break;
      case 2:
        SelectionSort(
          collection,

          asending,
          setCollection,
          setMainPointer,
          setLeftPosition,
          setAnimation,
          animationSpeed,
          leftPosition
        );
        break;
      case 3:
        InsertionSort(
          collection,
          asending,
          setCollection,
          setMainPointer,
          setRightPosition,
          setAnimation,
          animationSpeed,
          rightPosition
        );
        break;
      case 4:
        MergeSort(
          collection,
          asending,
          setCollection,
          setAnimation,
          animationSpeed
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <SortingToolBar
        size={size}
        algoID={algoID}
        updateCollection={updateCollection}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        isAnimated={animation !== null}
        setMainPointer={setMainPointer}
        randomizeCollection={randomizeCollection}
        displayType={displayType}
        setDisplayType={setDisplayType}
      />
      <SortingNodeList
        displayType={displayType}
        maxValue={maxValue}
        minValue={minValue}
        algoID={algoID}
        setAlgoID={setAlgoID}
        collection={collection}
        setCollection={setCollection}
        resetSearchState={resetSearchState}
        resetPointers={resetPointers}
        size={size}
        mainPointer={mainPointer}
        leftPointer={leftPosition}
        rightPointer={rightPosition}
        animation={animation}
        isAnimated={animation !== null}
        setAnimation={setAnimation}
        stopAnimation={stopAnimation}
        asending={asending}
        setAsending={setAsending}
        applySort={applySort}
        setContent={props.setContent}
      />
    </>
  );
}
