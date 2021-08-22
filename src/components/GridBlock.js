import { useState } from "react";

export default function GridBlock(props) {
  const [wall, setWall] = useState(props.isWall);
  const [checked, setChecked] = useState(props.checked);
  const [traveled, setTraveled] = useState(props.traveled);
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
