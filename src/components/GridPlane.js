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
          isMidPoint={index === props.midPoint}
          isEnd={index === props.end}
          isWall={block.isWall}
          traveled={block.traveled}
          checked={block.checked}
          path={block.path}
          blockClick={props.blockClick}
          hCost={block.costToTravelTo}
          fCost={block.costToTravelFrom}
          cost={block.cost}
        />
      ))}
    </div>
  );
}
