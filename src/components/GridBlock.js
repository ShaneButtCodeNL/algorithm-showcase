import { useState } from "react";

export default function GridBlock(props) {
  return (
    <div
      className={`gridBlock ${props.isWall ? "gridBlockWall" : ""} ${
        props.checked
          ? props.traveled
            ? "gridBlockTraveled"
            : "gridBlockChecked"
          : ""
      } ${props.isEnd ? "gridBlockEnd" : ""} ${
        props.isOrigin ? "gridBlockOrigin" : ""
      } ${props.path ? "gridBlockPath" : ""} ${
        props.isMidPoint ? "gridBlockMidWay" : ""
      }`}
      onClick={async () => await props.blockClick(props.index)}
    >
      {`Index:${props.index}\nhCost:${props.hCost}\nfCost:${props.fCost}\nCost:${props.cost}`}
    </div>
  );
}
