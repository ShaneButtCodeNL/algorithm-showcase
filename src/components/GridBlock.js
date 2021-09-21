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
      } ${props.isMidPoint ? "gridBlockMidWay" : ""}`}
      onClick={async () => await props.blockClick(props.index)}
    >
      <div
        className="gridBlockPath"
        style={{
          maxHeight: props.path ? "100%" : "0%",
          maxWidth: props.path ? "100%" : "0%",
        }}
      ></div>
    </div>
  );
}
