const cloneCollection = (collection) =>
  collection.map((v) => {
    return { ...v };
  });

export function LinearSearch(
  value,
  collection,
  setCollection,
  setPosition,
  animationSpeed,
  setAnimation
) {
  document.documentElement.style.setProperty(
    "--animation-time",
    `${animationSpeed}ms`
  );
  let length = collection.length,
    flag = true,
    position = 0;
  let copy = [...collection];
  copy.sort((a, b) => a.order - b.order);
  var animation = setInterval(() => {
    if (position >= length || !flag) {
      clearInterval(animation);
      setAnimation(null);
    } else {
      setPosition(position);
      if (value === copy[position].value) {
        flag = false;
        copy[position].state = 1;
      } else {
        copy[position].state = -1;
      }
      setCollection(cloneCollection(collection));
      position++;
    }
  }, animationSpeed);
  setAnimation(animation);
}
export function JumpSeaarch(
  value,
  collection,
  jumpSize,
  sort,
  setCollection,
  setPosition,
  setLeftPosition,
  setRightPosition,
  animationSpeed,
  setAnimation
) {
  let clone = cloneCollection(collection);
  sort(clone);
  setCollection(clone);
  let copy = [...clone];
  copy.sort((a, b) => a.order - b.order);
  document.documentElement.style.setProperty(
    "--animation-time",
    `${animationSpeed}ms`
  );
  let length = collection.length,
    flag = true,
    leftPosition = 0,
    rightPosition = Math.min(jumpSize - 1, length - 1),
    position = -1,
    foundBlock = false;
  var animation = setInterval(() => {
    console.log(jumpSize, rightPosition, leftPosition, position);
    if (flag) flag = leftPosition < length - 1;
    if (leftPosition > length || !flag) {
      clearInterval(animation);
      setAnimation(null);
    } else {
      setPosition(position);
      setRightPosition(rightPosition);
      setLeftPosition(leftPosition);
      if (foundBlock) {
        if (copy[position].value === value) {
          flag = false;
          copy[position].state = 1;
        } else {
          copy[position].state = -1;
          position++;
          flag = position < rightPosition;
          if (flag && position < length - 1 && copy[position].value > value) {
            flag = false;
            copy[position].state = -1;
          }
        }
        setCollection(clone);
        setPosition(position);
      } else {
        foundBlock = value <= copy[rightPosition].value;
        if (copy[leftPosition].value === value) {
          copy[leftPosition].state = 1;
          flag = false;
        } else copy[leftPosition].state = -1;
        if (copy[leftPosition].value > value) {
          flag = false;
        }
        if (flag) {
          if (copy[rightPosition].value === value) {
            copy[rightPosition].state = 1;
            flag = false;
          } else copy[rightPosition].state = -1;
          if (copy[rightPosition].value > value) {
            foundBlock = true;
            position = leftPosition + 1;
            if (copy[position].value > value) {
              flag = false;
              copy[position].state = -1;
            }
            setPosition(position);
          }
        }
        if (!foundBlock) {
          leftPosition = rightPosition + 1;
          rightPosition = Math.min(rightPosition + jumpSize, length - 1);
        }
        setCollection(clone);
      }
    }
  }, animationSpeed);
  setAnimation(animation);
}

export function BinarySearch(
  value,
  collection,
  sort,
  setCollection,
  setPosition,
  setLeftPosition,
  setRightPosition,
  animationSpeed,
  setAnimation
) {
  let clone = cloneCollection(collection);
  //Sort
  sort(clone);
  setCollection(clone);
  let copy = [...clone];
  copy.sort((a, b) => a.order - b.order);
  document.documentElement.style.setProperty(
    "--animation-time",
    `${animationSpeed}ms`
  );
  let length = collection.length,
    flag = true,
    leftPosition = 0,
    rightPosition = length - 1,
    position = Math.floor((rightPosition + leftPosition) / 2);
  var animation = setInterval(() => {
    if (leftPosition > rightPosition || !flag) {
      clearInterval(animation);
      setAnimation(null);
    } else {
      setPosition(position);
      setRightPosition(rightPosition);
      setLeftPosition(leftPosition);
      flag = rightPosition > leftPosition;
      if (copy[position].value === value) {
        flag = false;
        copy[position].state = 1;
      } else if (copy[position].value < value) {
        copy[position].state = -1;
        leftPosition = position + 1;
        position = Math.floor((rightPosition + leftPosition) / 2);
      } else {
        copy[position].state = -1;
        rightPosition = position;
        position = Math.floor((rightPosition + leftPosition) / 2);
      }
      setCollection(clone);
    }
  }, animationSpeed);
  setAnimation(animation);
}
