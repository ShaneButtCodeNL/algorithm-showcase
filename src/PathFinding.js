const posToXY = (pos, l, w) => [Math.floor(pos / l), pos % w];
const XYtoPos = (x, y, l) => x * l + y;

export function BFS(grids, setGrids, origin, end, length, width) {
  let grid = [...grids[0]];
  let stepGrid = [...grids];
  let queue = [grid[origin]];
  while (queue.length) {
    let block = queue.shift();
    const [x, y] = posToXY(block.pos, length, width);
    //Up
    if (x > 0) {
      let newPos = XYtoPos(x - 1, y, length);
      //End Found
      if (newPos === end) {
        grid[newPos].prev = block.pos;
        stepGrid.push([...grid]);
        setGrids(stepGrid);
        return;
      }
      if (!grid[newPos].isWall && !grid[newPos].checked) {
        grid[newPos].checked = true;
        grid[newPos].prev = block.pos;
        queue.push(grid[newPos]);
        stepGrid.push([...grid]);
        setGrids(stepGrid);
        continue;
      }
    }
    //Right
    if (y < width) {
      let newPos = XYtoPos(x, y + 1, length);
      //End Found
      if (newPos === end) {
        grid[newPos].prev = block.pos;
        stepGrid.push([...grid]);
        setGrids(stepGrid);
        return;
      }
      if (!grid[newPos].isWall && !grid[newPos].checked) {
        grid[newPos].checked = true;
        grid[newPos].prev = block.pos;
        queue.push(grid[newPos]);
        stepGrid.push([...grid]);
        setGrids(stepGrid);
        continue;
      }
    }
    //Down
    if (x < length) {
      let newPos = XYtoPos(x + 1, y, length);
      //End Found
      if (newPos === end) {
        grid[newPos].prev = block.pos;
        stepGrid.push([...grid]);
        setGrids(stepGrid);
        return;
      }
      if (!grid[newPos].isWall && !grid[newPos].checked) {
        grid[newPos].checked = true;
        grid[newPos].prev = block.pos;
        queue.push(grid[newPos]);
        stepGrid.push([...grid]);
        setGrids(stepGrid);
        continue;
      }
    }
    //Left
    if (y > 0) {
      let newPos = XYtoPos(x, y - 1, length);
      //End Found
      if (newPos === end) {
        grid[newPos].prev = block.pos;
        stepGrid.push([...grid]);
        setGrids(stepGrid);
        return;
      }
      if (!grid[newPos].isWall && !grid[newPos].checked) {
        grid[newPos].checked = true;
        grid[newPos].prev = block.pos;
        queue.push(grid[newPos]);
        stepGrid.push([...grid]);
        setGrids(stepGrid);
        continue;
      }
    }
  }
}

export function AStar(grids) {}
