import { useRef } from "react";
import { useState } from "react/cjs/react.development";

import {
  Shift,
  FinishShift,
  AnimatedShift,
  Transpose,
  finishTranspose,
  animatedTranspose,
} from "./Scripts/Encryption.js";

const shift = "Shift",
  tranposition = "Transposition";
const content = [shift, tranposition];
export default function EncryptionControlBar(props) {
  const algoSelectRef = useRef(null);
  const messageRef = useRef(null);
  const shiftRef = useRef(null);
  const transposeHeightRef = useRef(null);
  const [tPosition, setTPosition] = useState(-1);
  const [isTransposed, setIsTransposed] = useState(false);
  const resetTranspose = () => {
    setIsTransposed(false);
    setTPosition(-1);
    props.setTransposeX(-1);
    props.setTransposeY(-1);
    props.setStep(0);
    props.setPosition(-1);
  };
  return (
    <fieldset
      className="searchControlBar"
      style={{ marginBottom: props.algoID === 4 ? "1.2em" : "0em" }}
    >
      <legend>Controls</legend>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="searchAlgorithm">Algorithm:</label>
          <br />
          <select
            className="searchAlgoSelect"
            name="searchAlgorithm"
            disabled={props.isAnimated}
            style={{ opacity: props.isAnimated ? "0.5" : "1" }}
            ref={algoSelectRef}
            onChange={() => {
              props.setAlgoID(Number.parseInt(algoSelectRef.current.value));
              props.setContent(
                content[Number.parseInt(algoSelectRef.current.value) - 1]
              );
              props.reset();
              transposeHeightRef.current.value = 1;
              shiftRef.current.value = 3;
            }}
          >
            <option value={1}>Shift Encryption</option>
            <option value={2}>Transposition Encryption</option>
          </select>
        </div>
      </div>
      {
        //Used for transposition encryption
      }
      <div
        className="controlBarValueContainer"
        style={{ display: props.algoID === 2 ? "flex" : "none" }}
      >
        <div className="controlBarValueItem">
          <label htmlFor="transposeHeight">
            Transpose Box {props.decryption ? "Width" : "Height"}:
          </label>
          <br />
          <input
            type="number"
            defaultValue={props.transposeHeight}
            min={1}
            max={props.message.length || 1}
            ref={transposeHeightRef}
            onChange={() => {
              props.setTransposeHeight(
                Number.parseInt(transposeHeightRef.current.value)
              );
              resetTranspose();
              props.setTransposeBox(() =>
                props.makeTransposeBox(
                  props.message,
                  props.decryption
                    ? Math.ceil(
                        props.message.length /
                          Number.parseInt(transposeHeightRef.current.value)
                      )
                    : Number.parseInt(transposeHeightRef.current.value)
                )
              );
              props.setResult("");
            }}
          />
        </div>
        <div className="controlBarValueItem">
          <label htmlFor="en/decrypt">Action:</label>
          <br />
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              props.setDecryption((d) => !d);
              props.setPosition(-1);
              props.setStep(0);
              props.setTransposeBox(
                props.makeTransposeBox(props.message, props.transposeBox.length)
              );
              resetTranspose();
              props.setResult("");
            }}
          >
            {props.decryption ? "Decrypt" : "Encrypt"}
          </button>
        </div>
      </div>
      {
        //Used for Shift encryption
      }
      <div
        className="controlBarValueContainer"
        style={{ display: props.algoID === 1 ? "flex" : "none" }}
      >
        <div className="controlBarValueItem">
          <label htmlFor="shiftAmmount">Shift By:</label>
          <br />
          <input
            name="shiftAmmount"
            disabled={props.isAnimated}
            defaultValue={props.shift}
            type="number"
            min="1"
            max="25"
            ref={shiftRef}
            onChange={() => {
              if (Number.parseInt(shiftRef.current.value) > 25)
                shiftRef.current.value = 25;
              if (Number.parseInt(shiftRef.current.value) < 1)
                shiftRef.current.value = 1;
              props.setShift(Number.parseInt(shiftRef.current.value));
              props.setPosition(-1);
              props.setStep(0);
              props.setResult("");
            }}
          />
        </div>
        <div className="controlBarValueItem">
          <label htmlFor="en/decrypt">Action:</label>
          <br />
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              props.setDecryption((d) => !d);
              props.setPosition(-1);
              props.setStep(0);
              props.setResult("");
            }}
          >
            {props.decryption ? "Decrypt" : "Encrypt"}
          </button>
        </div>
      </div>
      {
        //Used for Message input
      }
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="message">Message:</label>
          <br />
          <div>
            <input
              type="text"
              name="message"
              defaultValue={props.message}
              style={{ width: "20ch" }}
              ref={messageRef}
              onChange={() => {
                props.setMessage(messageRef.current.value);
                props.setPosition(-1);
                transposeHeightRef.current.value = "1";
                props.setTransposeHeight(1);
                resetTranspose();
                props.setTransposeBox(() =>
                  props.makeTransposeBox(
                    messageRef.current.value,
                    props.decryption ? messageRef.current.value.length : 1
                  )
                );
              }}
            />
            <button
              type="button"
              style={{ width: "fit-content", marginLeft: "1ch" }}
              onClick={() => navigator.clipboard.writeText(props.message)}
            >
              COPY
            </button>
          </div>
        </div>
      </div>
      {
        //The buttons to interact with the app
      }
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          {
            //Proceeds the animation one stage
          }
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              console.log("NEXT CLICKED . . .", props.algoID);
              //Shift encryption
              if (props.algoID === 1)
                Shift(
                  props.message,
                  props.shift,
                  props.position,
                  props.step,
                  props.setPosition,
                  props.setMessageCharacter,
                  props.setStep,
                  props.setProcessedCharacter,
                  props.setResult,
                  props.decryption
                );
              if (props.algoID === 2) {
                if (props.position === -1 && !isTransposed) {
                  props.setTransposeBox(() =>
                    props.makeTransposeBox(
                      props.message,
                      props.decryption
                        ? Math.ceil(
                            props.message.length /
                              Number.parseInt(transposeHeightRef.current.value)
                          )
                        : Number.parseInt(transposeHeightRef.current.value)
                    )
                  );
                  resetTranspose();
                }
                Transpose(
                  props.message,
                  props.position,
                  tPosition,
                  props.step,
                  props.setResult,
                  isTransposed,
                  props.transposeBox,
                  props.transposeX,
                  props.transposeY,
                  props.setPosition,
                  props.setStep,
                  setTPosition,
                  props.setTransposeBox,
                  props.setTransposeX,
                  props.setTransposeY,
                  setIsTransposed
                );
              }
            }}
          >
            {props.position !== -1 || isTransposed ? "Next >>" : "Start"}
          </button>
        </div>
        <div className="controlBarValueItem">
          {
            //Plays the animation
          }
          <button
            type="button"
            onClick={() => {
              if (props.isAnimated) {
                clearInterval(props.animation);
                props.setAnimation(null);
              } else if (props.algoID === 1)
                AnimatedShift(
                  props.message,
                  props.shift,
                  props.position,
                  props.step,
                  props.setPosition,
                  props.setMessageCharacter,
                  props.setStep,
                  props.setProcessedCharacter,
                  props.setResult,
                  props.decryption,
                  props.setAnimation,
                  props.animationSpeed
                );
              else if (props.algoID === 2)
                animatedTranspose(
                  props.message,
                  props.position,
                  tPosition,
                  props.step,
                  props.setResult,
                  isTransposed,
                  props.transposeBox,
                  props.transposeX,
                  props.transposeY,
                  props.setPosition,
                  props.setStep,
                  setTPosition,
                  props.setTransposeBox,
                  props.setTransposeX,
                  props.setTransposeY,
                  setIsTransposed,
                  props.setAnimation,
                  props.animationSpeed
                );
            }}
          >{`${props.isAnimated ? "Stop " : ""}Animate`}</button>
        </div>
        <div className="controlBarValueItem">
          {
            //Proceds to completed state
          }
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              props.reset();
              resetTranspose();
              props.setStep(0);
              if (props.algoID === 1)
                FinishShift(
                  props.message,
                  props.shift,
                  props.setResult,
                  props.decryption
                );
              if (props.algoID === 2)
                finishTranspose(
                  props.message,
                  props.transposeBox,
                  props.setTransposeBox,
                  props.setResult
                );
            }}
          >
            Finish
          </button>
        </div>
      </div>
    </fieldset>
  );
}
