import { useState } from "react";
import GridBlock from "./GridBlock";

/**
 *  Makes a 2d grid of determined size
 * @param {number} l The Horazontal Length of the grid defaults to 10 if 0 or un defined
 * @param {number} w The Verticle Height of the grid defaults to 10 if 0 or undefined
 * @returns GridBlock[]
 */
const makeGrid = (l, w) => {
  return Array.from({ length: (w || 10) * (l || 10) }, (_, i) => {
    return {
      isWall: false,
      checked: false,
      traveled: false,
      prev: i,
    };
  });
};

export default function GridPlane(props) {
  const [grid, setGrid] = useState([makeGrid(props.length, props.width)]);
  const [step, setStep] = useState(0);
  const [origin, setOrigin] = useState(0);
  const [end, setEnd] = useState(props.length * props.width - 1);

  const stepIn = () => setStep(step + 1);
  const stepOut = () => setStep(step ? 0 : step - 1);
  const resetGrid = (l, w) =>
    setGrid(makeGrid(l || props.length, w || props.width));

  document.documentElement.style.setProperty("--row-nums", props.length);
  document.documentElement.style.setProperty("--col-nums", props.width);

  return (
    <div id="gridPlane">
      {grid[step].map((block, index) => (
        <GridBlock
          key={index}
          isOrigin={index === origin}
          isEnd={index === end}
          isWall={block.isWall}
          traveled={block.traveled}
          checked={block.checked}
          setWall={() => (grid[step].isWall = !grid[step].isWall)}
          setTraveled={() => (grid[step].traveled = !grid[step].traveled)}
          setChecked={() => (grid[step].checked = !grid[step].checked)}
        />
      ))}
    </div>
  );
}
