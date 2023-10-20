import React, { useRef } from "react";
import {
  sudokuSolverDescription,
  sudokuTemplates,
} from "../../Scripts/strings";
import { sudokuSolver } from "../../Scripts/Sudoku";

const content = [sudokuSolverDescription];
export default function BackTrackingControlBar(props) {
  const probSelectRef = useRef(null);
  const solutionStepsRef = useRef(null);
  const sudokuStringInputRef = useRef(null);
  const sudokuStringCopyFunction = () => {
    if (sudokuStringInputRef.current)
      navigator.clipboard.writeText(sudokuStringInputRef.current.value);
  };
  const animationFunction = (step) => {
    if (props.isAnimated) {
      stopAnimation();
    } else if (props.algoId === 1) {
      //Sudoku
      if (!props.solved) {
        step = 0;
        solutionStepsRef.current = sudokuSolver(props.inputBoard);
        props.setSolved(true);
      }
      var animation = setInterval(() => {
        console.log("TEST", solutionStepsRef.current.length, props.step);
        if (step === solutionStepsRef.current.length - 1) {
          clearInterval(animation);
          props.setAnimation(null);
        } else {
          const nextStep = step + 1;
          step++;
          props.setStep((s) => s + 1);
          props.setSudokuValue(solutionStepsRef.current[nextStep].checkNumber);
          props.setDisplayBoard(solutionStepsRef.current[nextStep].board);
          props.setSudokuPointer(solutionStepsRef.current[nextStep].currentPos);
        }
      }, props.animationSpeed);
      props.setAnimation(animation);
    }
  };
  const stopAnimation = () => {
    clearInterval(props.animation);
    props.setAnimation(null);
  };
  const fowardAnimation = (step) => {
    const nextStep = step + 1;
    if (
      solutionStepsRef.current &&
      nextStep < solutionStepsRef.current.length
    ) {
      props.setStep(nextStep);
      props.setSudokuValue(solutionStepsRef.current[nextStep].checkNumber);
      props.setDisplayBoard(solutionStepsRef.current[nextStep].board);
      props.setSudokuPointer(solutionStepsRef.current[nextStep].currentPos);
    }
  };
  const backAnimation = (step) => {
    const nextStep = step - 1;
    if (solutionStepsRef.current && nextStep >= 0) {
      props.setStep(nextStep);
      props.setSudokuValue(solutionStepsRef.current[nextStep].checkNumber);
      props.setDisplayBoard(solutionStepsRef.current[nextStep].board);
      props.setSudokuPointer(solutionStepsRef.current[nextStep].currentPos);
    }
  };
  const beginingAnimation = () => {
    if (solutionStepsRef.current) {
      props.setStep(0);
      props.setSudokuValue(solutionStepsRef.current[0].checkNumber);
      props.setDisplayBoard(solutionStepsRef.current[0].board);
      props.setSudokuPointer(solutionStepsRef.current[0].currentPos);
    }
  };
  const endingAnimation = () => {
    if (solutionStepsRef.current) {
      const endPosition = solutionStepsRef.current.length - 1;
      props.setStep(endPosition);
      props.setSudokuValue(solutionStepsRef.current[endPosition].checkNumber);
      props.setDisplayBoard(solutionStepsRef.current[endPosition].board);
      props.setSudokuPointer(solutionStepsRef.current[endPosition].currentPos);
    }
  };
  return (
    <fieldset
      className="backtrackControlBar"
      style={{
        height: "fit-content",
        borderRadius: "1em",
        padding: ".5em 1em 1em 1em",
      }}
    >
      <legend style={{ marginLeft: "1em" }}>Controls</legend>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="Back-Tracking-Problem-Select">
            Algorithm:{props.algoId === 0}
          </label>
          <br />
          <select
            className="backTrackProbSelect"
            name="Back-Tracking-Problem-Select"
            disabled={props.isAnimated}
            ref={probSelectRef}
            style={props.isAnimated ? { opacity: "0.6" } : {}}
          >
            <option value={1}>Sudoku Solver</option>
          </select>
        </div>
      </div>
      <div
        id="sudokuSolverControlContainer"
        style={props.algoId === 1 ? {} : { display: "none" }}
      >
        <div className="controlBarValueContainer sudokuBoardInput">
          <div className="controlBarValueItem">
            <label htmlFor="Sudoku-Input-Grid">Input:</label>
            <div
              className="sudokuBoardInput"
              name="Sudoku-Input-Grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(9,2em)" }}
            >
              {props.inputBoard.split("").map((c, i) => {
                const ref = React.createRef();
                return (
                  <select
                    key={`sudoku-input-${i}-value-${c}`}
                    defaultValue={c}
                    ref={ref}
                    disabled={props.isAnimated}
                    style={props.isAnimated ? { opacity: "0.6" } : {}}
                    onChange={(e) => {
                      const newBoard = `${props.inputBoard.substring(0, i)}${
                        e.target.value
                      }${props.inputBoard.substring(i + 1)}`;

                      props.setDisplayBoard(newBoard);
                      props.setInputBoard(newBoard);
                      props.setSolved(false);
                      props.setStep(0);
                      props.setSudokuPointer(-1);
                      props.setSudokuValue(null);
                    }}
                  >
                    {["", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
                      (v, j) => (
                        <option
                          value={v === "" ? "." : v}
                          key={`opt-${i}-${j}`}
                        >
                          {v}
                        </option>
                      )
                    )}
                  </select>
                );
              })}
            </div>
          </div>
        </div>
        <div className="controlBarValueContainer sudokuStringInputContainer">
          <div className="controlBarValueItem sudokuStringInput">
            <label
              htmlFor="Sudoku-Input-String"
              style={{ gridArea: "sudoku-string-input-label" }}
            >
              Input as String:
            </label>
            <br />
            <input
              type="text"
              value={props.inputBoard}
              ref={sudokuStringInputRef}
              style={{
                width: "81ch",
                padding: ".5rem .5rem",
                gridArea: "sudoku-string-input-input",
                fontFamily: "monospace",
              }}
              readOnly
            />
            <button
              type="button"
              style={{ gridArea: "sudoku-string-input-copy" }}
              disabled={props.isAnimated}
              onClick={sudokuStringCopyFunction}
            >
              Copy
            </button>
          </div>
        </div>
        <div className="controlBarValueContainer sudokuTemplateContainer">
          <div className="controlBarValueItem sudokuTemplate">
            {sudokuTemplates.map((v, i) => (
              <button
                key={`sudoku-template-${i}`}
                disabled={props.isAnimated}
                onClick={() => {
                  props.setDisplayBoard(v);
                  props.setInputBoard(v);
                  props.setSudokuPointer(-1);
                  props.setSolved(false);
                  props.setStep(0);
                }}
              >
                Template {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="controlBarValueContainer sudokuAnimationControls">
          <div className="controlBarValueItem">
            {props.solved ? (
              <>
                <button
                  disabled={props.isAnimated}
                  onClick={() => animationFunction(props.step)}
                >
                  Start
                </button>
                <button disabled={!props.isAnimated} onClick={stopAnimation}>
                  Stop
                </button>
                <button
                  disabled={props.isAnimated}
                  onClick={() => fowardAnimation(props.step)}
                >
                  Foward
                </button>
                <button
                  disabled={props.isAnimated}
                  onClick={() => backAnimation(props.step)}
                >
                  Back
                </button>
                <button disabled={props.isAnimated} onClick={beginingAnimation}>
                  Beginning
                </button>
                <button disabled={props.isAnimated} onClick={endingAnimation}>
                  End
                </button>
              </>
            ) : (
              <button onClick={() => animationFunction(props.step)}>
                Start
              </button>
            )}
          </div>
        </div>
      </div>
    </fieldset>
  );
}
