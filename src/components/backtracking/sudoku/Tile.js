export default function Tile(props) {
  return <div className="sudoku-tile">{props.value ? props.value : " "}</div>;
}
