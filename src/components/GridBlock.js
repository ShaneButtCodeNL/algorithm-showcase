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
      } ${props.path ? "gridBlockPath" : ""}`}
      onClick={async () => await props.blockClick(props.index)}
    >
      {props.index}
    </div>
  );
}
