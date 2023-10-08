import BackTrackingControlBar from "./BackTrackingControlBar";
import { useEffect, useState } from "react";

const emptyBoard = ".".repeat(81);
export default function BackTrackingField(props) {
  const [step, setStep] = useState(0);
  const [boards, setBoards] = useState([emptyBoard]);
  return (
    <>
      <BackTrackingControlBar
        algoId={props.algoId}
        animation={props.animation}
        animationSpeed={props.animationSpeed}
        isAnimated={props.isAnimated}
        setAlgoID={props.setAlgoID}
        setAnimation={props.setAnimation}
        setBoards={setBoards}
        setStep={setStep}
        sudokuBoard={boards[0].split("")}
      />
    </>
  );
}
