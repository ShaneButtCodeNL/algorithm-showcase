import { useRef } from "react";
import { useState } from "react/cjs/react.development";

import { Shift, FinishShift } from "./Scripts/Encryption.js";

const shift = "Shift",
  tranposition = "Transposition";
const content = [shift, tranposition];
export default function EncryptionControlBar(props) {
  const algoSelectRef = useRef(null);
  const messageRef = useRef(null);
  const shiftRef = useRef(null);
  const [nextButtonText, setNextButtonText] = useState("NEXT >>");
  const [step, setStep] = useState(0);
  const [decyrption, setDecryption] = useState(false);
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
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="shiftAmmount">Shift By:</label>
          <br />
          <input
            name="shiftAmmount"
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
            }}
          />
        </div>
        <div className="controlBarValueItem">
          <label htmlFor="en/decrypt">Action:</label>
          <br />
          <button type="button" onClick={() => setDecryption((d) => !d)}>
            {decyrption ? "Decrypt" : "Encrypt"}
          </button>
        </div>
      </div>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="message">Message:</label>
          <br />
          <input
            type="text"
            name="message"
            defaultValue={props.message}
            style={{ width: "20ch" }}
            ref={messageRef}
            onChange={() => {
              props.setMessage(messageRef.current.value);
              props.setPosition(-1);
            }}
          />
        </div>
      </div>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              console.log("NEXT CLICKED . . .", props.algoID);
              if (props.algoID === 1)
                Shift(
                  props.message,
                  props.shift,
                  props.position,
                  step,
                  props.setPosition,
                  props.setMessageCharacter,
                  setStep,
                  props.setProcessedCharacter,
                  props.setResult,
                  decyrption
                );
            }}
          >
            {nextButtonText}
          </button>
        </div>
        <div className="controlBarValueItem">
          <button type="button">{`${
            props.isAnimated ? "Stop " : ""
          }Animate`}</button>
        </div>
        <div className="controlBarValueItem">
          <button
            type="button"
            onClick={() => {
              props.reset();
              setStep(0);
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
