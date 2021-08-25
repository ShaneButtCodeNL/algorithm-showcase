import { useEffect, useState } from "react";
import "./App.css";
import { BFS } from "./PathFinding";
import GridPlane from "./components/GridPlane";
import ToolBar from "./components/ToolBar";
/**
 * Find Eclidian distance between two points
 * @param {Number} x1 X value of first point
 * @param {Number} y1 Y value of first point
 * @param {Number} x2 X value of second point
 * @param {Number} y2 Y value of second point
 * @returns {Number} The Eclidian distance
 */
const getEuclidianDistance = (x1, y1, x2, y2) =>
  Math.sqrt(Math.abs(x2 - x1) ** 2 + Math.abs(y2 - y1) ** 2);
/**
 *  Makes a 2d grid of determined size
 * @param {number} l The Horazontal Length of the grid defaults to 10 if 0 or un defined
 * @param {number} w The Verticle Height of the grid defaults to 10 if 0 or undefined
 * @returns GridBlock[]
 */
const makeGrid = (l, w) => {
  console.log("MakeGrid:", l, w);
  return Array.from({ length: (w || 10) * (l || 10) }, (_, i) => {
    return {
      isWall: false,
      checked: false,
      traveled: false,
      prev: i,
      pos: i,
      cost: 0,
    };
  });
};
function App() {
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(5);
  const [grid, setGrid] = useState(() => makeGrid(5, 5));
  const [grids, setGrids] = useState([grid]);
  const [step, setStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(1);
  const [origin, setOrigin] = useState(0);
  const [end, setEnd] = useState(length * width - 1);
  const [addWall, setAddWall] = useState(false);
  const [changeOrigin, setChangeOrigin] = useState(false);
  const [changeEnd, setChangeEnd] = useState(false);
  const [s, setS] = useState(false);
  const toggleAddWall = () => {
    setAddWall(!addWall);
    setChangeEnd(false);
    setChangeOrigin(false);
  };
  const toggleChangeOrigin = () => {
    setAddWall(false);
    setChangeEnd(false);
    setChangeOrigin(!changeOrigin);
  };
  const toggleChangeEnd = () => {
    setAddWall(false);
    setChangeEnd(!changeEnd);
    setChangeOrigin(false);
  };
  const resetGrids = () => {
    setStep(0);
    setMaxSteps(1);
    setOrigin(0);
    setEnd(length * width - 1);
    setAddWall(false);
    setChangeEnd(false);
    setChangeOrigin(false);
    setGrid(() => makeGrid(length, width));
    setGrids([grid]);
  };
  const applySearch = (id) => {
    if (id === 1) {
      BFS(grid, setGrids, origin, end, length, width);
      console.log("MaxSteps:", maxSteps);
      return;
    }
  };
  const blockClick = (index) => {
    const block = grid[index];
    if (addWall) {
      if (index === origin || index === end) return;
      block.isWall = !block.isWall;
      setGrids([grid]);
      return;
    }
    if (changeEnd) {
      if (index === origin) return;
      if (block.isWall) return;
      setEnd(index);
      return;
    }
    if (changeOrigin) {
      if (index === end) return;
      if (block.isWall) return;
      setOrigin(index);
      return;
    }
    console.log("Clicked Block " + index);
  };
  const costToEnd = (pos) => {
    return getEuclidianDistance(
      Math.floor(pos / length),
      pos % width,
      Math.floor(end / length),
      end % width
    );
  };
  useEffect(() => {
    resetGrids();
  }, [length, width]);
  useEffect(() => {
    setMaxSteps(grids.length - 1);
  }, [grids]);
  useEffect(() => {
    setGrid(grids[step]);
  }, [step]);
  return (
    <div className="App">
      <ToolBar
        width={width}
        length={length}
        step={step}
        maxSteps={maxSteps}
        applySearch={applySearch}
        changeStep={setStep}
        setLength={setLength}
        setWidth={setWidth}
        toggleAddWall={toggleAddWall}
        toggleChangeEnd={toggleChangeEnd}
        toggleChangeOrigin={toggleChangeOrigin}
        addWall={addWall}
        changeEnd={changeEnd}
        changeOrigin={changeOrigin}
      />
      <GridPlane
        length={length}
        width={width}
        grid={grid}
        origin={origin}
        end={end}
        blockClick={blockClick}
      />
    </div>
  );
}

export default App;
