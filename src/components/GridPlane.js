import GridBlock from "./GridBlock";
import GridPlaneControlBar from "./GridPlaneControlBar";

export default function GridPlane(props) {
  document.documentElement.style.setProperty("--row-nums", props.length);
  document.documentElement.style.setProperty("--col-nums", props.width);

  return (
    <div
      className="pathFindingDisplayWindow"
      style={{ overflow: "auto", flexGrow: "1" }}
    >
      <GridPlaneControlBar
        algoID={props.algoID}
        setAlgo={props.setAlgo}
        startAnimation={props.startAnimation}
        stopAnimation={props.stopAnimation}
        isAnimationPlaying={props.isAnimationPlaying}
        setSolved={props.setSolved}
        toggleAddWall={props.toggleAddWall}
        toggleChangeEnd={props.toggleChangeEnd}
        toggleChangeOrigin={props.toggleChangeOrigin}
        toggleChangeMid={props.toggleChangeMid}
        applySearch={props.applySearch}
        changeStep={props.changeStep}
        addWall={props.addWall}
        changeEnd={props.changeEnd}
        changeMidPoint={props.changeMidPoint}
        changeOrigin={props.changeOrigin}
        toggleAddWall={props.toggleAddWall}
        toggleChangeEnd={props.toggleChangeEnd}
        toggleChangeOrigin={props.toggleChangeOrigin}
        toggleChangeMid={props.toggleChangeMid}
      />
      <div className="gridPlaneWrapper">
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
      </div>
    </div>
  );
}
