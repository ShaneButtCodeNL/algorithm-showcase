import BackTrackingControlBar from "./BackTrackingControlBar";
import { useState } from "react";
import SudokuSolverDisplay from "./sudoku/SudokuSolverDisplay";
const emptyBoard = ".".repeat(81);
export default function BackTrackingField(props) {
  const [step, setStep] = useState(0);
  const [boards, setBoards] = useState([emptyBoard]);
  const [currentBoard, setCurrentBoard] = useState(0);
  const [sudokuPointer, setSudokuPointer] = useState(-1);
  const addBoardToBoards = (aBoard) => {
    setBoards((currentBoards) => currentBoards.push(aBoard));
  };
  return (
    <div className="backTrackingContainer">
      <BackTrackingControlBar
        algoId={props.algoId}
        animation={props.animation}
        animationSpeed={props.animationSpeed}
        isAnimated={props.isAnimated}
        setAlgoID={props.setAlgoID}
        setAnimation={props.setAnimation}
        setBoards={setBoards}
        setCurrentBoard={setCurrentBoard}
        setStep={setStep}
        setSudokuPointer={setSudokuPointer}
        sudokuBoard={boards[0]}
      />
      {props.algoId === 1 ? (
        <SudokuSolverDisplay
          board={boards[currentBoard]}
          sudokuPointer={sudokuPointer}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
