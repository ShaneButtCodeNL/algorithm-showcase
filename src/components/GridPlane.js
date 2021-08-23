import GridBlock from "./GridBlock";

export default function GridPlane(props) {
  document.documentElement.style.setProperty("--row-nums", props.length);
  document.documentElement.style.setProperty("--col-nums", props.width);

  return (
    <div id="gridPlane">
      {props.grid.map((block, index) => (
        <GridBlock
          key={index}
          index={index}
          isOrigin={index === props.origin}
          isEnd={index === props.end}
          isWall={block.isWall}
          traveled={block.traveled}
          checked={block.checked}
          blockClick={props.blockClick}
        />
      ))}
    </div>
  );
}
