import EncryptionControlBar from "./EncryptionControlBar";
import { useState } from "react";
const oOffset = 0.3;
const oFunction = (v) => 1 - v * (v < 0 ? oOffset * -1 : oOffset);
export default function EncryptionField(props) {
  const [step, setStep] = useState(0);

  return (
    <div className="encryptionFieldContainer">
      <div id="encryptionFieldDisplay">
        <EncryptionControlBar
          algoID={props.algoID}
          animation={props.animation}
          animationSpeed={props.animationSpeed}
          isAnimated={props.isAnimated}
          message={props.message}
          position={props.position}
          reset={props.reset}
          shift={props.shift}
          step={step}
          transposeHeight={props.transposeHeight}
          transposeLength={props.transposeLength}
          setAlgoID={props.setAlgoID}
          setAnimation={props.setAnimation}
          setContent={props.setContent}
          setMessage={props.setMessage}
          setMessageCharacter={props.setMessageCharacter}
          setPosition={props.setPosition}
          setProcessedCharacter={props.setProcessedCharacter}
          setProcessedMessage={props.setProcessedMessage}
          setResult={props.setResult}
          setShift={props.setShift}
          setStep={setStep}
          setTransposeHeight={props.setTransposeHeight}
          setTransposeLength={props.setTransposeLength}
        />
        <div id="encryptionField">
          <div id="messageField" className="encryptionFieldItem">
            <div className="messageContainer">
              {props.message.split("").map((v, i) => {
                const pos = props.position - i;
                const dValue =
                  props.position === -1
                    ? "block"
                    : pos >= -2 && pos <= 2
                    ? "block"
                    : "none";
                const oValue = props.position === -1 ? 1 : oFunction(pos);
                const colorBG = pos ? "rgb(85, 85, 85)" : "rgb(16, 247, 8)";
                return (
                  <div
                    className="messageCharacterContainer"
                    key={i}
                    style={{
                      display: dValue,
                      opacity: oValue,
                      backgroundColor: colorBG,
                    }}
                  >
                    <div
                      className="messageCharacter"
                      style={{
                        display: dValue,
                        opacity: oValue,
                        backgroundColor: colorBG,
                        ...(pos === 0 ? { color: "black" } : {}),
                      }}
                    >
                      {v}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {
            //For shift encryption
          }
          <div
            id="shiftEncryptionContainer"
            className="encryptionFieldItem"
            style={{ display: props.algoID === 1 ? "inline" : "none" }}
          >
            <div className="encryptionFieldItem encryptionBox">
              <span>Value:</span>
              <input
                type="text"
                disabled={true}
                value={props.messageCharacter}
                style={{
                  width: "2ch",
                  textAlign: "center",
                  boxShadow: step === 1 ? "0px 0px 10px yellow" : "none",
                }}
              />
              <span>Shift :</span>
              <input
                type="text"
                disabled={true}
                value={props.shift}
                style={{
                  width: "2ch",
                  textAlign: "center",
                  boxShadow: step === 2 ? "0px 0px 10px yellow" : "none",
                }}
              />
              <span>Output:</span>
              <input
                type="text"
                disabled={true}
                value={props.processedCharacter}
                style={{
                  width: "2ch",
                  textAlign: "center",
                  boxShadow: step === 3 ? "0px 0px 10px yellow" : "none",
                }}
              />
            </div>
          </div>
          <div id="resultsField" className="encryptionFieldItem">
            <div className="resultsContainer">
              <label>Result:</label>
              <input
                type="text"
                className="resultingString"
                disabled={true}
                defaultValue={props.result}
                style={{ display: "none" }}
              />
              <div className="messageContainer">
                {props.result.split("").map((v, i) => {
                  const pos = props.position - i;
                  const dValue =
                    props.position === -1
                      ? "block"
                      : pos >= -2 && pos <= 2
                      ? "block"
                      : "none";
                  const oValue = props.position === -1 ? 1 : oFunction(pos);
                  const colorBG = pos ? "rgb(85, 85, 85)" : "rgb(16, 247, 8)";
                  return (
                    <div className="messageCharacterContainer" key={i}>
                      <div className="messageCharacter">{v}</div>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                style={{
                  maxWidth: "14ch",
                  minWidth: "5ch",
                  width: "100%",
                  margin: "1ch auto",
                }}
                onClick={() => navigator.clipboard.writeText(props.result)}
              >
                COPY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
