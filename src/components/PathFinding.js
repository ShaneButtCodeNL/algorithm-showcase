import { useEffect, useState } from "react";
import { BFS, AStar, HSearch } from "./Scripts/PathFinding";
import GridPlane from "./GridPlane";
import ToolBar from "./ToolBar";

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
      path: false,
      cost: 0,
      costToTravelTo: 0,
      costToTravelFrom: 0,
    };
  });
};
export default function PathFinding(props) {
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
  const [solved, setSolved] = useState(false);
  const [algoID, setAlgoID] = useState(1);
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
  const changeStep = (num) => {
    setStep(num);
    setGrid(grids[num]);
  };
  const resetGrids = () => {
    const newGrid = makeGrid(length, width);
    setStep(0);
    setMaxSteps(1);
    setOrigin(0);
    setEnd(length * width - 1);
    setAddWall(false);
    setChangeEnd(false);
    setChangeOrigin(false);
    setGrid(newGrid);
    setGrids([newGrid]);
    setSolved(false);
  };
  const resetSearch = async () => {
    let newGrid = grid.map((v, i) => {
      let block = { ...v };
      block.prev = i;
      block.traveled = false;
      block.checked = false;
      block.cost = 0;
      return block;
    });
    setStep(0);
    setMaxSteps(1);
    setGrid(newGrid);
    setGrids([newGrid]);
    setSolved(false);
  };
  const applySearch = async (id, grid, origin, end) => {
    let newGrid = [...grid].map((v) => {
      return { ...v };
    });
    if (id === 1) {
      let res = await BFS(newGrid, origin, end, length, width);
      setSolved(true);
      setMaxSteps(res.length - 1);
      setStep(res.length - 1);
      return res;
    }
    if (id === 2) {
      let res = await AStar(newGrid, origin, end, length, width);
      setSolved(true);
      setMaxSteps(res.length - 1);
      setStep(res.length - 1);
      return res;
    }
    if (id === 3) {
      let res = await HSearch(newGrid, origin, end, length, width);
      setSolved(true);
      setMaxSteps(res.length - 1);
      setStep(res.length - 1);
      return res;
    }
  };
  const blockClick = async (index) => {
    if (solved) {
      console.log(
        "Entered blockClick solved block \ngrids:",
        grids.length,
        grid
      );
      if (addWall) {
        if (index === origin || index === end) return;
        await resetSearch();
        const newGrid = grids[0].map((v) => {
          return { ...v };
        });
        let block = newGrid[index];
        block.isWall = !block.isWall;
        applySearch(algoID, newGrid, origin, end).then((res) => {
          setGrids(res);
          setGrid(res[res.length - 1]);
          setStep(res.length - 1);
          setMaxSteps(res.length - 1);
        });
      }
      if (changeEnd) {
        if (index === origin || index === end || grid[index].isWall) return;
        setEnd(index);
        await resetSearch();
        const newGrid = grids[0].map((v) => {
          return { ...v };
        });
        applySearch(algoID, newGrid, origin, index).then((res) => {
          setGrids(res);
          setGrid(res[res.length - 1]);
          setStep(res.length - 1);
          setMaxSteps(res.length - 1);
        });
      }
      if (changeOrigin) {
        if (index === origin || index === end || grid[index].isWall) return;
        setOrigin(index);
        await resetSearch();
        const newGrid = grids[0].map((v) => {
          return { ...v };
        });
        applySearch(algoID, newGrid, index, end).then((res) => {
          setGrids(res);
          setGrid(res[res.length - 1]);
          setStep(res.length - 1);
          setMaxSteps(res.length - 1);
        });
      }
      //setGrid(newGrid);
      //setGrids([newGrid]);
      //await applySearch(algoID);
      console.log("SolvedBlockClickEnd: ", grids.length, grid);
      return;
    }
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
  useEffect(() => {
    resetGrids();
  }, [length, width]);
  useEffect(() => {
    document.getElementById("pathStepDisplay").value = step;
  }, [step]);
  return (
    <div>
      <ToolBar
        width={width}
        length={length}
        step={step}
        grid={grid}
        origin={origin}
        end={end}
        maxSteps={maxSteps}
        setGrid={setGrid}
        setGrids={setGrids}
        applySearch={applySearch}
        changeStep={changeStep}
        setLength={setLength}
        setWidth={setWidth}
        toggleAddWall={toggleAddWall}
        toggleChangeEnd={toggleChangeEnd}
        toggleChangeOrigin={toggleChangeOrigin}
        addWall={addWall}
        changeEnd={changeEnd}
        changeOrigin={changeOrigin}
        algo={algoID}
        setAlgo={setAlgoID}
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
