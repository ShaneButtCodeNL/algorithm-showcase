import BackTrackingControlBar from "./BackTrackingControlBar";
import { useState } from "react";
import SudokuSolverDisplay from "./sudoku/SudokuSolverDisplay";
const emptyBoard = ".".repeat(81);
export default function BackTrackingField(props) {
  const [step, setStep] = useState(0);
  const [inputBoard, setInputBoard] = useState(emptyBoard);
  const [displayBoard, setDisplayBoard] = useState(emptyBoard);
  const [sudokuPointer, setSudokuPointer] = useState(-1);
  //const [sudokuSolutionSteps, setSudokuSolutionSteps] = useState(null);
  const [solved, setSolved] = useState(false);
  return (
    <div className="backTrackingContainer">
      <BackTrackingControlBar
        algoId={props.algoId}
        animation={props.animation}
        animationSpeed={props.animationSpeed}
        inputBoard={inputBoard}
        isAnimated={props.isAnimated}
        setAlgoID={props.setAlgoID}
        setAnimation={props.setAnimation}
        setDisplayBoard={setDisplayBoard}
        setInputBoard={setInputBoard}
        setSolved={setSolved}
        setStep={setStep}
        setSudokuPointer={setSudokuPointer}
        //setSudokuSolutionSteps={setSudokuSolutionSteps}
        solved={solved}
        step={step}
        //sudokuSolutionSteps={sudokuSolutionSteps}
      />
      {props.algoId === 1 ? (
        <SudokuSolverDisplay
          displayBoard={displayBoard}
          sudokuPointer={sudokuPointer}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
