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
      } ${props.isOrigin ? "gridBlockOrigin" : ""} ${
        props.isEnd ? "gridBlockEnd" : ""
      }`}
      onClick={() => props.blockClick(props.index)}
    ></div>
  );
}
