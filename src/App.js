import { useEffect, useState } from "react";
import "./App.css";
import GridPlane from "./components/GridPlane";
import ToolBar from "./components/ToolBar";
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
      cost: 0,
    };
  });
};
function App() {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(20);
  const [grids, setGrids] = useState([makeGrid(length, width)]);
  const [step, setStep] = useState(0);
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
    setOrigin(0);
    setEnd(length * width - 1);
    setAddWall(false);
    setChangeEnd(false);
    setChangeOrigin(false);
    setGrids([makeGrid(length, width)]);
  };
  const blockClick = (index) => {
    const block = grids[step][index];
    if (addWall) {
      if (index === origin || index === end) return;
      block.isWall = !block.isWall;
      setS(!s);
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
  useEffect(() => {
    resetGrids();
  }, [length, width]);
  return (
    <div className="App">
      <ToolBar
        width={width}
        length={length}
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
        grid={grids[step]}
        origin={origin}
        end={end}
        blockClick={blockClick}
      />
    </div>
  );
}

export default App;
