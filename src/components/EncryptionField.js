import EncryptionControlBar from "./EncryptionControlBar";
const oOffset = 0.3;
const oFunction = (v) => 1 - v * (v < 0 ? oOffset * -1 : oOffset);
export default function EncryptionField(props) {
  return (
    <div className="encryptionFieldContainer">
      <EncryptionControlBar
        algoID={props.algoID}
        message={props.message}
        position={props.position}
        setPosition={props.setPosition}
        setMessageCharacter={props.setMessageCharacter}
        setResult={props.setResult}
        setContent={props.setContent}
        isAnimated={props.isAnimated}
        setAlgoID={props.setAlgoID}
        message={props.message}
        setMessage={props.setMessage}
        shift={props.shift}
        setShift={props.setShift}
        setProcessedMessage={props.setProcessedMessage}
        setProcessedCharacter={props.setProcessedCharacter}
      />
      <div id="encryptionField">
        {props.algoID === 1 ? (
          <>
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
            <div id="encryptionBox" className="encryptionFieldItem">
              <span>Value:</span>
              <input
                type="text"
                disabled={true}
                value={props.messageCharacter}
                style={{ width: "2ch", textAlign: "center" }}
              />
              <span>Shift :</span>
              <input
                type="text"
                disabled={true}
                value={props.transpose}
                style={{ width: "2ch", textAlign: "center" }}
              />
              <span>Output:</span>
              <input
                type="text"
                disabled={true}
                value={props.processedCharacter}
                style={{ width: "2ch", textAlign: "center" }}
              />
            </div>
            <div id="resultsField" className="encryptionFieldItem">
              <div className="resultsContainer">
                <label>Result:</label>
                <input
                  type="text"
                  className="resultingString"
                  disabled={true}
                  defaultValue={props.result}
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
