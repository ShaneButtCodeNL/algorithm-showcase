import { useRef } from "react";
import { useState } from "react/cjs/react.development";

import {
  Shift,
  FinishShift,
  AnimatedShift,
  Transpose,
} from "./Scripts/Encryption.js";

const shift = "Shift",
  tranposition = "Transposition";
const content = [shift, tranposition];
export default function EncryptionControlBar(props) {
  const algoSelectRef = useRef(null);
  const messageRef = useRef(null);
  const shiftRef = useRef(null);
  const transposeHeightRef = useRef(null);
  const [decyrption, setDecryption] = useState(false);
  const [tPosition, setTPosition] = useState(-1);
  const [transposeX, setTransposeX] = useState(-1);
  const [transposeY, setTransposeY] = useState(-1);
  const [isTransposed, setIsTransposed] = useState(false);
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
          <label htmlFor="transposeHeight">Transpose Box Height:</label>
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
              props.setTransposeBox(() =>
                props.makeTransposeBox(
                  props.message,
                  Number.parseInt(transposeHeightRef.current.value)
                )
              );
            }}
          />
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
              setDecryption((d) => !d);
              props.setPosition(-1);
              props.setStep(0);
              props.setResult("");
            }}
          >
            {decyrption ? "Decrypt" : "Encrypt"}
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
                props.setTransposeBox(() =>
                  props.makeTransposeBox(messageRef.current.value, 1)
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
                  decyrption
                );
              if (props.algoID === 2)
                Transpose(
                  props.message,
                  props.position,
                  tPosition,
                  props.step,
                  props.setResult,
                  isTransposed,
                  props.transposeBox,
                  transposeX,
                  transposeY,
                  props.setPosition,
                  props.setStep,
                  setTPosition,
                  props.setTransposeBox,
                  setTransposeX,
                  setTransposeY,
                  setIsTransposed
                );
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
              if (props.algoID === 1)
                if (props.isAnimated) {
                  clearInterval(props.animation);
                  props.setAnimation(null);
                } else
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
                    decyrption,
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
              props.setStep(0);
              if (props.algoID === 1)
                FinishShift(
                  props.message,
                  props.shift,
                  props.setResult,
                  decyrption
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
