import { useRef } from "react";
import { useState } from "react/cjs/react.development";

import { Shift } from "./Scripts/Encryption.js";

const shift = "Shift",
  tranposition = "Transposition";
const content = [shift, tranposition];
export default function EncryptionControlBar(props) {
  const algoSelectRef = useRef(null);
  const messageRef = useRef(null);
  const [nextButtonText, setNextButtonText] = useState("NEXT >>");
  const [step, setStep] = useState(0);
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
                  props.setResult
                );
            }}
          >
            {nextButtonText}
          </button>
        </div>
      </div>
    </fieldset>
  );
}
