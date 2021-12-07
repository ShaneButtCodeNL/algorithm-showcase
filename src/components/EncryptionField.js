import EncryptionControlBar from "./EncryptionControlBar";

export default function EncryptionField(props) {
  return (
    <div className="encryptionFieldContainer">
      <EncryptionControlBar
        setContent={props.setContent}
        isAnimated={props.isAnimated}
        setAlgoID={props.setAlgoID}
      />
      <div id="encryptionField">
        {props.algoID === 2 ? (
          <>
            <div id="messageField" className="encryptionFieldItem">
              <div className="messageContainer">
                {props.message.split("").map((v, i) => {
                  return (
                    <div className="messageCharacterContainer" key={i}>
                      <span className="messageCharacter">{v}</span>
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
                value="T"
                style={{ width: "2ch", textAlign: "center" }}
              />
              <span>Tranpose :</span>
              <input
                type="text"
                disabled={true}
                value="T"
                style={{ width: "2ch", textAlign: "center" }}
              />
              <span>Output:</span>
              <input
                type="text"
                disabled={true}
                value="T"
                style={{ width: "2ch", textAlign: "center" }}
              />
            </div>
            <div id="resultsField" className="encryptionFieldItem">
              <div className="resultsContainer">
                <label>Result:</label>
                <input type="text" className="resultingString" />
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
