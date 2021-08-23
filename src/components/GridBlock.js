import { useState } from "react";

export default function GridBlock(props) {
  const [wall] = useState(props.isWall);
  const [checked] = useState(props.checked);
  const [traveled] = useState(props.traveled);
  return (
    <div
      className={`gridBlock ${wall ? "gridBlockWall" : ""} ${
        checked ? (traveled ? "gridBlockTraveled" : "gridBlockChecked") : ""
      } ${props.isOrigin ? "gridBlockOrigin" : ""} ${
        props.isEnd ? "gridBlockEnd" : ""
      }`}
    ></div>
  );
}
