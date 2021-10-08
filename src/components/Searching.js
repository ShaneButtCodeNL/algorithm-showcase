import { useState } from "react";
import SearchingToolBar from "./SearchingToolBar";
import SearchNodeList from "./SearchNodeList";

import { BinarySearch, JumpSeaarch, LinearSearch } from "./Scripts/Search";
const maxValue = 100,
  minValue = -100;

/**
 * Make a collection from 0-num-1
 * @param {Number} num Length of collection
 * @returns {Object[]} A collection of values from [0 , num)
 */
const makeCollection = (num) =>
  Array.from({ length: num }, (_, i) => {
    return { value: i, order: i, state: 0 };
  });
export default function Searching(props) {
  //Collection item state => 0:not looked at,-1:Looked at no value, 1 Looked at is value
  const [collection, setCollection] = useState(() => makeCollection(10));
  const [collectionSize, setCollectionSize] = useState(10);
  const [searchValue, setSearchValue] = useState(0);
  const [algoID, setAlgoID] = useState(1);
  const [position, setPosition] = useState(-1);
  const [leftPosition, setLeftPosition] = useState(-1);
  const [rightPosition, setRightPosition] = useState(-1);
  const [jumpSize, setJumpSize] = useState(5);
  const [animation, setAnimation] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const resetSearchState = (c) => {
    setLeftPosition(-1);
    setRightPosition(-1);
    setPosition(-1);
    let cloned = (c ? c : collection).map((v) => {
      return { ...v };
    });
    for (let item of cloned) {
      item.state = 0;
    }
    return cloned;
  };

  const sortCollection = (collection) => {
    let cloned = [...collection];
    cloned.sort((a, b) => a.value - b.value);
    cloned.forEach((v, i) => (v.order = i));
  };
  const randomizeCollection = () => {
    stopAnimation();
    let cloned = collection.map((v) => {
      return { ...v };
    });
    for (let item of cloned) {
      item.value = Math.floor(
        Math.random() *
          (Math.floor(Math.random() * 2) === 0 ? maxValue : minValue)
      );
    }
    setCollection(resetSearchState(cloned));
  };

  const updateCollection = (num) => {
    setCollection(() => makeCollection(num));
    setCollectionSize(num);
    setPosition(0);
  };

  const stopAnimation = () => {
    if (animation === null) return;
    clearInterval(animation);
    setAnimation(null);
  };

  const applySearch = (id) => {
    let cloned = resetSearchState();
    setRightPosition(-1);
    setLeftPosition(-1);
    setPosition(-1);
    switch (id) {
      case 1:
        LinearSearch(
          searchValue,
          cloned,
          setCollection,
          setPosition,
          animationSpeed,
          setAnimation
        );
        break;
      case 2:
        sortCollection(cloned);
        BinarySearch(
          searchValue,
          cloned,
          sortCollection,
          setCollection,
          setPosition,
          setLeftPosition,
          setRightPosition,
          animationSpeed,
          setAnimation
        );
        break;
      case 3:
        sortCollection(cloned);
        JumpSeaarch(
          searchValue,
          cloned,
          jumpSize,
          sortCollection,
          setCollection,
          setPosition,
          setLeftPosition,
          setRightPosition,
          animationSpeed,
          setAnimation
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <SearchingToolBar
        size={collectionSize}
        updateCollection={updateCollection}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        isAnimated={animation !== null}
        mainPosition={position}
        leftPosition={leftPosition}
        rightPosition={rightPosition}
        setMainPosition={setPosition}
        setLeftPosition={setLeftPosition}
        setRightPosition={setRightPosition}
        randomizeCollection={randomizeCollection}
      />

      <SearchNodeList
        maxValue={maxValue}
        minValue={minValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        algoID={algoID}
        setAlgoID={setAlgoID}
        collection={collection}
        size={collectionSize}
        mainPos={position}
        leftPos={leftPosition}
        rightPos={rightPosition}
        jumpSize={jumpSize}
        setJumpSize={setJumpSize}
        applySearch={applySearch}
        animation={animation}
        isAnimated={animation !== null}
        setAnimation={setAnimation}
        stopAnimation={stopAnimation}
      />
    </>
  );
}
