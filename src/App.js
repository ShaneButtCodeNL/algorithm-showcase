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
  const resetGrids = () => {
    setStep(0);
    setOrigin(0);
    setEnd(length * width - 1);
    setGrids([makeGrid(length, width)]);
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
      />
      <GridPlane
        length={length}
        width={width}
        grid={grids[step]}
        origin={origin}
        end={end}
      />
    </div>
  );
}

export default App;
