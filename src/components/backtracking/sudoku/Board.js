import Tile from "./Tile";
export default function Board(props) {
  const values = props.values;
  return (
    <div className="sudoku-board">
      {values.map((rows, i) =>
        rows.map((value, j) => <Tile value={value} key={`tile-${i}-${j}`} />)
      )}
    </div>
  );
}
