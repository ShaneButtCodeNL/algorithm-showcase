import { useEffect, useState } from "react";
import {
  BFS,
  AStar,
  HSearch,
  BFSWithMidPoint,
  AStarWithMidPoint,
  HSearchWithMidPoint,
} from "../../Scripts/PathFinding";
import GridPlane from "./GridPlane";
import PathFindingToolBar from "./PathFindingToolBar";

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
  const [midPoint, setMidPoint] = useState(-1);
  const [addWall, setAddWall] = useState(false);
  const [changeOrigin, setChangeOrigin] = useState(false);
  const [changeEnd, setChangeEnd] = useState(false);
  const [changeMidPoint, setChangeMidPoint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [algoID, setAlgoID] = useState(1);
  const [animateRate, setAnimateRate] = useState(300);
  const [animateInterval, setAnimateInterval] = useState(null);
  const [started, setStarted] = useState(false);
  //
  //  Toggles
  //
  const toggleAddWall = () => {
    setAddWall(!addWall);
    setChangeEnd(false);
    setChangeOrigin(false);
    setChangeMidPoint(false);
  };
  const toggleChangeOrigin = () => {
    setAddWall(false);
    setChangeEnd(false);
    setChangeOrigin(!changeOrigin);
    setChangeMidPoint(false);
  };
  const toggleChangeEnd = () => {
    setAddWall(false);
    setChangeEnd(!changeEnd);
    setChangeOrigin(false);
    setChangeMidPoint(false);
  };
  const toggleChangeMid = () => {
    setAddWall(false);
    setChangeEnd(false);
    setChangeOrigin(false);
    setChangeMidPoint(!changeMidPoint);
  };
  const changeStep = (num) => {
    setStep(num);
    setGrid(grids[num]);
  };
  const changeSpeed = (num) => {
    const r = document.querySelector(":root");
    r.style.setProperty("--animation-speed", `${Math.min(num - 50, 300)}ms`);
    setAnimateRate(num);
  };
  const resetGrids = () => {
    stopAnimation();
    setStarted(false);
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
  const startAnimation = (pos, maxPos, posGrids, speed) => {
    if (!animateInterval) {
      var inter = setInterval(() => {
        if (pos < maxPos) {
          pos++;
          setStep(pos);
          setGrid(posGrids[pos]);
        } else {
          clearInterval(inter);
          setAnimateInterval(null);
        }
      }, speed);
      setAnimateInterval(inter);
    }
  };
  const stopAnimation = () => {
    clearInterval(animateInterval);
    setAnimateInterval(null);
  };
  /**
   * Applies the search to the grid
   * @param {number} id The id for the algo
   * @param {Object[]} grid The initial state of the grid
   * @param {number} origin the starting point
   * @param {number} end the goal space
   * @returns
   */
  const applySearch = async (id, grid, origin, mid, end) => {
    let newGrid = [...grid].map((v) => {
      return { ...v };
    });
    if (id === 1) {
      let res =
        mid === -1
          ? await BFS(newGrid, origin, end, length, width)
          : await BFSWithMidPoint(newGrid, origin, mid, end, length, width);
      setGrids(res);
      setMaxSteps(res.length - 1);
      setStep(solved ? res.length - 1 : 0);
      setGrid(res[solved ? res.length - 1 : 0]);
      if (!solved) startAnimation(0, res.length - 1, res, animateRate);
      setSolved(true);
      return res;
    }
    if (id === 2) {
      let res =
        mid === -1
          ? await AStar(newGrid, origin, end, length, width)
          : await AStarWithMidPoint(newGrid, origin, mid, end, length, width);
      setGrids(res);
      setMaxSteps(res.length - 1);
      setStep(solved ? res.length - 1 : 0);
      setGrid(res[solved ? res.length - 1 : 0]);
      if (!solved) startAnimation(0, res.length - 1, res, animateRate);
      setSolved(true);
      return res;
    }
    if (id === 3) {
      let res =
        mid === -1
          ? await HSearch(newGrid, origin, end, length, width)
          : await HSearchWithMidPoint(newGrid, origin, mid, end, length, width);
      setGrids(res);
      setMaxSteps(res.length - 1);
      setStep(solved ? res.length - 1 : 0);
      setGrid(res[solved ? res.length - 1 : 0]);
      if (!solved) startAnimation(0, res.length - 1, res, animateRate);
      setSolved(true);
      return res;
    }
  };
  /**
   * Handeles the event of clicking a block
   * @param {Number} index the linear position in the grid
   * @returns null
   */
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
        applySearch(algoID, newGrid, origin, midPoint, end).then((res) => {
          setGrids(res);
          setGrid(res[res.length - 1]);
        });
      }
      if (changeEnd) {
        if (index === origin || index === end || grid[index].isWall) return;
        setEnd(index);
        await resetSearch();
        const newGrid = grids[0].map((v) => {
          return { ...v };
        });
        applySearch(algoID, newGrid, origin, midPoint, index).then((res) => {
          setGrids(res);
          setGrid(res[res.length - 1]);
        });
      }
      if (changeOrigin) {
        if (index === origin || index === end || grid[index].isWall) return;
        setOrigin(index);
        await resetSearch();
        const newGrid = grids[0].map((v) => {
          return { ...v };
        });
        applySearch(algoID, newGrid, index, midPoint, end).then((res) => {
          setGrids(res);
          setGrid(res[res.length - 1]);
        });
      }
      if (changeMidPoint) {
        if (index === origin || index === end || grid[index].isWall) return;
        index = midPoint === index ? -1 : index;
        setMidPoint(index);
        await resetSearch();
        const newGrid = grids[0].map((v) => {
          return { ...v };
        });
        applySearch(algoID, newGrid, origin, index, end).then((res) => {
          setGrids(res);
          setGrid(res[res.length - 1]);
        });
      }
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
    if (changeMidPoint) {
      if (index === origin || index === end) return;
      if (block.isWall) return;
      setMidPoint(index === midPoint ? -1 : index);
    }
  };
  useEffect(() => {
    resetGrids();
  }, [length, width]);
  useEffect(() => {
    document.getElementById("pathStepDisplay").value = step;
  }, [step]);
  return (
    <>
      <PathFindingToolBar
        width={width}
        length={length}
        step={step}
        grid={grid}
        grids={grids}
        origin={origin}
        end={end}
        midPoint={midPoint}
        maxSteps={maxSteps}
        speed={animateRate}
        started={started}
        setStarted={setStarted}
        setGrid={setGrid}
        setGrids={setGrids}
        applySearch={applySearch}
        changeStep={changeStep}
        setLength={setLength}
        setWidth={setWidth}
        setSpeed={changeSpeed}
        toggleAddWall={toggleAddWall}
        toggleChangeEnd={toggleChangeEnd}
        toggleChangeOrigin={toggleChangeOrigin}
        toggleChangeMid={toggleChangeMid}
        addWall={addWall}
        changeEnd={changeEnd}
        changeOrigin={changeOrigin}
        changeMidPoint={changeMidPoint}
        algo={algoID}
        setAlgo={setAlgoID}
        startAnimation={startAnimation}
        stopAnimation={stopAnimation}
        isAnimationPlaying={animateInterval !== null}
        setSolved={setSolved}
      />
      <GridPlane
        length={length}
        width={width}
        grid={grid}
        grids={grids}
        step={step}
        maxSteps={maxSteps}
        speed={animateRate}
        origin={origin}
        midPoint={midPoint}
        end={end}
        blockClick={blockClick}
        addWall={addWall}
        changeEnd={changeEnd}
        changeMidPoint={changeMidPoint}
        changeOrigin={changeOrigin}
        toggleAddWall={toggleAddWall}
        toggleChangeEnd={toggleChangeEnd}
        toggleChangeOrigin={toggleChangeOrigin}
        toggleChangeMid={toggleChangeMid}
        algoID={algoID}
        setAlgoID={setAlgoID}
        startAnimation={startAnimation}
        stopAnimation={stopAnimation}
        isAnimationPlaying={animateInterval !== null}
        setSolved={setSolved}
        applySearch={applySearch}
        changeStep={changeStep}
        started={started}
        setStarted={setStarted}
        setGrid={setGrid}
        setGrids={setGrids}
        setContent={props.setContent}
      />
    </>
  );
}
