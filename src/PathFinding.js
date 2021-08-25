const posToXY = (pos, l, w) => [Math.floor(pos / l), pos % w];
const XYtoPos = (x, y, l) => x * l + y;

export function BFS(grid, setGrids, origin, end, length, width) {
  let queue = [grid[origin]];
  grid[origin].checked = true;
  let stepGrid = [
    grid.map((v) => {
      return { ...v };
    }),
  ];
  console.log(stepGrid);
  console.log("Starting BFS", origin, end);
  while (queue.length) {
    let block = queue.shift();
    const [x, y] = posToXY(block.pos, length, width);

    //Up
    if (x > 0) {
      let newPos = XYtoPos(x - 1, y, length);
      //End Found
      if (newPos === end) {
        grid[newPos].prev = block.pos;
        stepGrid.push(
          grid.map((v) => {
            return { ...v };
          })
        );
        setGrids(stepGrid);
        return;
      }
      if (!grid[newPos].isWall && !grid[newPos].checked) {
        grid[newPos].checked = true;
        grid[newPos].prev = block.pos;
        queue.push(grid[newPos]);
        stepGrid.push(
          grid.map((v) => {
            return { ...v };
          })
        );
        setGrids(stepGrid);
      }
    }
    //Right
    if (y < width - 1) {
      let newPos = XYtoPos(x, y + 1, length);
      //End Found
      if (newPos === end) {
        grid[newPos].prev = block.pos;
        stepGrid.push(
          grid.map((v) => {
            return { ...v };
          })
        );
        setGrids(stepGrid);
        return;
      }
      if (!grid[newPos].isWall && !grid[newPos].checked) {
        grid[newPos].checked = true;
        grid[newPos].prev = block.pos;
        queue.push(grid[newPos]);
        stepGrid.push(
          grid.map((v) => {
            return { ...v };
          })
        );
        setGrids(stepGrid);
      }
    }
    //Down
    if (x < length - 1) {
      let newPos = XYtoPos(x + 1, y, length);
      //End Found
      if (newPos === end) {
        grid[newPos].prev = block.pos;
        stepGrid.push(
          grid.map((v) => {
            return { ...v };
          })
        );
        setGrids(stepGrid);
        return;
      }
      if (!grid[newPos].isWall && !grid[newPos].checked) {
        grid[newPos].checked = true;
        grid[newPos].prev = block.pos;
        queue.push(grid[newPos]);
        stepGrid.push(
          grid.map((v) => {
            return { ...v };
          })
        );
        setGrids(stepGrid);
      }
    }
    //Left
    if (y > 0) {
      let newPos = XYtoPos(x, y - 1, length);
      //End Found
      if (newPos === end) {
        grid[newPos].prev = block.pos;
        stepGrid.push(
          grid.map((v) => {
            return { ...v };
          })
        );
        setGrids(stepGrid);
        return;
      }
      if (!grid[newPos].isWall && !grid[newPos].checked) {
        grid[newPos].checked = true;
        grid[newPos].prev = block.pos;
        queue.push(grid[newPos]);
        stepGrid.push(
          grid.map((v) => {
            return { ...v };
          })
        );
        setGrids(stepGrid);
      }
    }
  }
}

export function AStar(grids) {}
