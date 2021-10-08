import { useState } from "react";
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
export default function Sorting(props) {
  const [collection, setCollection] = useState(() => makeCollection(10));
  const [size, setSize] = useState(10);
  const [algoID, setAlgoID] = useState(0);
  const [displayType, setDisplayType] = useState(0);
  const [mainPointer, setMainPointer] = useState(-1);
  const [animation, setAnimation] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const resetSearchState = (c) => {
    setMainPointer(-1);
    let cloned = (c ? c : collection).map((v) => {
      return { ...v };
    });
    for (let item of cloned) {
      item.state = 0;
    }
    return cloned;
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
  };
  const updateCollection = (num) => {
    setCollection(() => makeCollection(num));
    setSize(num);
    setMainPointer(-1);
  };
  const stopAnimation = () => {
    if (animation === null) return;
    clearInterval(animation);
    setAnimation(null);
  };
  return (
    <>
      <SortingToolBar
        size={size}
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
        size={size}
        mainPointer={mainPointer}
        animation={animation}
        isAnimated={animation !== null}
        setAnimation={setAnimation}
        stopAnimation={stopAnimation}
      />
    </>
  );
}
