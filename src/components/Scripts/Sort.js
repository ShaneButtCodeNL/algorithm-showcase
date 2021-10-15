const cloneCollection = (collection) =>
  collection.map((v) => {
    return { ...v };
  });
const swap = (pos1, pos2, collection) => {
  console.log("SWapping ", pos1, pos2);
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

export function MergeSort(
  collection,
  asending,
  setCollection,
  setAnimation,
  animationSpeed
) {
  let length = collection.length,
    merged = [],
    mergeLeft = null,
    mergeRight = null,
    state = 0;
  const clone = cloneCollection(collection);
  let tempcopy = [...clone];
  tempcopy.sort((a, b) => a.order - b.order);
  const copy = [];
  for (let i = 0; i < length; i++) {
    const item = tempcopy[i];
    item.order = i * length;
    item.state = i + 1;
    copy.push([item]);
  }
  tempcopy = null;
  var animation = setInterval(() => {
    setCollection(cloneCollection(clone));
    //Sorted
    if (copy.length === 1 && mergeLeft === null && mergeRight === null) {
      clearInterval(animation);
      setAnimation(null);
      for (let item of clone) {
        item.state = 0;
      }
      setCollection(cloneCollection(clone));
    } else {
      //mergeing
      if (mergeLeft || mergeRight) {
        //Left is empty
        if (mergeLeft.length === 0) {
          let order = merged[merged.length - 1].order;
          for (let i = 0; i < mergeRight.length; i++) {
            mergeRight[i].state = state;
            mergeRight[i].order = order + 1 + i;
          }
          for (let item of merged) {
            item.state = state;
          }
          merged = [...merged, ...mergeRight];
          copy.push(merged);
          mergeLeft = null;
          mergeRight = null;
          merged = null;
        }
        //Right Empty
        else if (mergeRight.length === 0) {
          let order = merged[merged.length - 1].order;
          for (let i = 0; i < mergeLeft.length; i++) {
            mergeLeft[i].state = state;
            mergeLeft[i].order = order + 1 + i;
          }
          for (let item of merged) {
            item.state = state;
          }
          merged = [...merged, ...mergeLeft];
          copy.push(merged);
          mergeLeft = null;
          mergeRight = null;
          merged = null;
        } else {
          let item1 = mergeLeft[0],
            item2 = mergeRight[0],
            order = merged[merged.length - 1].order + 1;
          if (comparator(item1, item2, asending) <= 0) {
            item1.state = 0;
            item1.order = order;
            merged.push(mergeLeft.shift());
          } else {
            item2.state = 0;
            item2.order = order;
            merged.push(mergeRight.shift());
          }
        }
      } else {
        mergeLeft = copy.shift();
        mergeRight = copy.shift();

        let item1 = mergeLeft[0],
          item2 = mergeRight[0];
        if (comparator(item1, item2, asending) <= 0) {
          state = item1.state;
          item1.state = 0;
          merged = [mergeLeft.shift()];
        } else {
          state = item2.state;
          item2.state = 0;
          merged = [mergeRight.shift()];
        }
        for (let i = 1; i <= mergeLeft.length; i++)
          mergeLeft[i - 1].order =
            merged[0].order + 2 * mergeLeft.length + mergeRight.length + i;
        for (let i = 1; i <= mergeRight.length; i++)
          mergeRight[i - 1].order =
            merged[0].order + 2 * mergeLeft.length + 2 * mergeRight.length + i;
      }
    }
  }, animationSpeed);
  setAnimation(animation);
}

export function SelectionSort(
  collection,
  asending,
  setCollection,
  setPosition,
  setLeftPosition,
  setAnimation,
  animationSpeed,
  beginPos
) {
  setAnimationSpeed(animationSpeed);
  let length = collection.length,
    begin = beginPos === -1 ? 0 : beginPos,
    pos = begin,
    minPos = begin;
  const clone = cloneCollection(collection);
  const copy = [...clone];
  copy.sort((a, b) => a.order - b.order);
  var animation = setInterval(() => {
    setPosition(pos);
    setLeftPosition(begin);
    setCollection(clone);
    //Collection is sorted
    if (begin >= length - 1) {
      copy[length - 1].state = 1;
      setCollection(clone);
      clearInterval(animation);
      setAnimation(null);
      setPosition(-1);
      setLeftPosition(-1);
    } else {
      const com = comparator(copy[pos], copy[minPos], asending);
      if (com < 0) {
        copy[minPos].state = 0;
        copy[pos].state = -1;
        minPos = pos;
      }
      //At end of collection
      if (pos === length - 1) {
        swap(begin, minPos, copy);
        copy[begin].state = 1;
        begin++;
        pos = begin;
        minPos = begin;
        copy[minPos].state = -1;
      } else {
        pos++;
      }
    }
  }, animationSpeed);
  setAnimation(animation);
}
export function InsertionSort(
  collection,
  asending,
  setCollection,
  setPosition,
  setRightPosition,
  setAnimation,
  animationSpeed,
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
    end = rightPos === -1 ? 1 : rightPos,
    pos = 0;
  const clone = cloneCollection(collection);
  const copy = [...clone];
  copy.sort((a, b) => a.order - b.order);
  copy[0].state = 1;
  copy[end].state = -1;
  var animation = setInterval(() => {
    //Sorted
    if (end === length) {
      clearInterval(animation);
      setAnimation(null);
      setPosition(-1);
      setRightPosition(-1);
      setCollection(clone);
    } else {
      setPosition(pos);
      setRightPosition(end);
      setCollection(clone);

      if (pos < end) {
        //Found insertion
        if (copy[end].value <= copy[pos].value) {
          copy[end].state = 1;
          //Move rest up 1 space
          for (let i = pos; i <= end; i++) {
            copy[i].order = copy[i].order + 1;
          }
          //Insert value
          copy[end].order = pos;
          copy.sort((a, b) => a.order - b.order);
          end++;
          if (end < length) copy[end].state = -1;
          pos = 0;
        } else {
          pos++;
        }
      } else {
        copy[end].state = 1;
        end++;
        if (end < length) copy[end].state = -1;

        pos = 0;
      }
    }
  }, animationSpeed);
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
  copy[pos === -1 ? 0 : pos].state = -1;
  var animation = setInterval(() => {
    if (end === 0 || sorted) {
      setCollection(clone);
      clearInterval(animation);
      setAnimation(null);
      setPosition(-1);
      setRightPosition(-1);
      return;
    }
    setPosition(pos);
    setRightPosition(end);
    setCollection(clone);

    if (pos < end) {
      let com = comparator(copy[pos], copy[pos + 1], asending);
      if (com > 0) {
        swap(pos, pos + 1, copy);
        swaped = true;
      }
      copy[pos].state = 0;
      copy[pos + 1].state = -1;
      pos++;
      if (pos === end) {
        copy[end].state = 1;
        pos = 0;
        copy[0].state = -1;
        end--;
        if (!swaped) {
          sorted = true;
          for (let item of copy) item.state = 1;
        }
        swaped = false;
      }
    }
  }, animationSpeed);
  setAnimation(animation);
}
