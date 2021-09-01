/**
 * Takes a linear pos and return it's pos in a 2d plane
 * @param {number} pos The linear pos
 * @param {number} w The Horazontal width of the grid
 * @returns {number[]} An array of two numbers.
 */
const posToXY = (pos, w) => [Math.floor(pos / w), pos % w];
/**
 * Takes a 2D plane point and returns a liner pos
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @returns {number} Liner pos
 */
const XYtoPos = (x, y, w) => x * w + y;
const cloneGrid = (grid) =>
  [...grid].map((v) => {
    return { ...v };
  });
const validBlock = (blk) => {
  return !blk.isWall && !blk.checked;
};
const buildPath = (grids, origin, end) => {
  const stack = [];
  let grid = cloneGrid(grids[grids.length - 1]);
  let block = grid[end];
  while (block.prev !== block.pos) {
    stack.push(block.pos);
    block = grid[block.prev];
  }
  stack.push(origin);
  while (stack.length) {
    let pos = stack.pop();
    grid[pos].path = true;
    grids.push(cloneGrid(grid));
  }
  return grids;
};
const processBlock = (grid, steps, queue, block, end, x, y, width, origin) => {
  const pos = XYtoPos(x, y, width);
  if (pos === end) {
    grid[pos].prev = block.pos;
    steps.push(cloneGrid(grid));
    return buildPath(steps, origin, end);
  }
  const newBlock = grid[pos];
  if (validBlock(newBlock)) {
    newBlock.prev = block.pos;
    newBlock.checked = true;
    queue.push(newBlock);
    steps.push(cloneGrid(grid));
  }
  return steps;
};
export async function BFS(grid, origin, end, length, width) {
  //Queue for blocks we can expand
  let queue = [];
  //Current state of the grid
  let currentGrid = cloneGrid(grid);
  //This stores the step we make
  let stepGrid = [cloneGrid(currentGrid)];
  //Set origin to traveled and checked
  currentGrid[origin].checked = true;
  currentGrid.traveled = true;
  //Add origin to the queue
  queue.push(currentGrid[origin]);
  //Begin Search
  while (queue.length) {
    //Block in grid we are looking at
    const block = queue.shift();
    const [x, y] = posToXY(block.pos, width);
    block.traveled = true;
    if (block.pos !== origin) stepGrid.push(cloneGrid(currentGrid));
    //Check for up x-1,y
    if (x > 0) {
      const newPos = XYtoPos(x - 1, y, width);
      console.log("in bfs", newPos);
      //up is End
      if (newPos === end) {
        return processBlock(
          currentGrid,
          stepGrid,
          queue,
          block,
          end,
          x - 1,
          y,
          width,
          origin
        );
      }
      processBlock(currentGrid, stepGrid, queue, block, end, x - 1, y, width);
    }
    //Check Right x y+1
    if (y < width - 1) {
      const newPos = XYtoPos(x, y + 1, width);
      //Right is End
      if (newPos === end) {
        return processBlock(
          currentGrid,
          stepGrid,
          queue,
          block,
          end,
          x,
          y + 1,
          width,
          origin
        );
      }
      processBlock(currentGrid, stepGrid, queue, block, end, x, y + 1, width);
    }
    //Check for down x+1,y
    if (x < length - 1) {
      const newPos = XYtoPos(x + 1, y, width);
      //Down is End
      if (newPos === end) {
        return processBlock(
          currentGrid,
          stepGrid,
          queue,
          block,
          end,
          x + 1,
          y,
          width,
          origin
        );
      }
      processBlock(currentGrid, stepGrid, queue, block, end, x + 1, y, width);
    }
    //Check left x y-1
    if (y > 0) {
      const newPos = XYtoPos(x, y - 1, width);
      //Left is End
      if (newPos === end) {
        return processBlock(
          currentGrid,
          stepGrid,
          queue,
          block,
          end,
          x,
          y - 1,
          width,
          origin
        );
      }
      processBlock(currentGrid, stepGrid, queue, block, end, x, y - 1, width);
    }
  }
  console.log("BFS2 END NO PATH . . .");
  return stepGrid;
}

export function AStar(grids) {}
