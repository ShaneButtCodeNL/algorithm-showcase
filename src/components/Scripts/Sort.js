const cloneCollection = (collection) =>
  collection.map((v) => {
    return { ...v };
  });
const swap = (pos1, pos2, collection) => {
  const p1 = collection[pos1],
    p2 = collection[pos2];
  let temp = p1.order;
  p1.order = p2.order;
  p2.order = temp;
  collection[pos2] = p1;
  collection[pos1] = p2;
};
const comparator = (v1, v2, flag) => {
  return flag ? v1.value - v2.value : v2.value - v1.value;
};
const setAnimationSpeed = (sp) =>
  document.documentElement.style.setProperty("--animation-time", `${sp}ms`);
export function InsertionSort(
  collection,
  asending,
  setCollection,
  setPosition,
  setRightPosition,
  setAnimation,
  animationSpeed,
  mainPos,
  rightPos
) {
  setAnimationSpeed(animationSpeed);
  console.log(
    "InsertionSortStarted",
    asending ? "Ascending" : "Descending",
    "AS :",
    animationSpeed
  );
  let length = collection.length,
    end = endPos === -1 ? 1 : endPos,
    pos = mainPos === -1 ? 0 : mainPos;
  const isSorting = () => pos < end;
  const clone = cloneCollection(collection);
  const copy = [...clone];
  copy.sort((a, b) => a.order - b.order);
  var animation = setInterval(() => {}, animationSpeed);
  setAnimation(animation);
}
export function BubbleSort(
  collection,
  asending,
  setCollection,
  setPosition,
  setRightPosition,
  setAnimation,
  animationSpeed,
  mainPos,
  endPos
) {
  setAnimationSpeed(animationSpeed);
  console.log("BubbleSortStarted", asending, animationSpeed);
  let length = collection.length,
    end = endPos === -1 ? length - 1 : endPos,
    pos = mainPos === -1 ? 0 : mainPos,
    sorted = false,
    swaped = false;
  const clone = cloneCollection(collection);
  const copy = [...clone];
  copy.sort((a, b) => a.order - b.order);
  var animation = setInterval(() => {
    if (end === 0 || sorted) {
      clearInterval(animation);
      setAnimation(null);
      setPosition(-1);
      setRightPosition(-1);
      return;
    }
    setPosition(pos);
    setRightPosition(end);
    if (pos < end) {
      let com = comparator(copy[pos], copy[pos + 1], asending);
      if (com > 0) {
        swap(pos, pos + 1, copy);
        swaped = true;
      }
      pos++;
      if (pos === end) {
        pos = 0;
        end--;
        if (!swaped) sorted = true;
        swaped = false;
      }
    }
    setCollection(clone);
  }, animationSpeed);
  setAnimation(animation);
}
