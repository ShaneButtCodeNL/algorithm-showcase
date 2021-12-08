import { useState } from "react";
import EncryptionField from "./EncryptionField";
import EncryptionToolBar from "./EncryptionToolBar";

export default function Encryption(props) {
  const [message, setMessage] = useState("Hello World");
  const [messageCharacter, setMessageCharacter] = useState("");
  const [processedCharacter, setProcessedCharacter] = useState("");
  const [result, setResult] = useState("");
  const [algoID, setAlgoID] = useState(1);
  const [position, setPosition] = useState(-1);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [animation, setAnimation] = useState(null);
  //Shift Encryption
  const [transposeLength, setTransposeLength] = useState(1);
  const [transposeHeight, setTransposeHeight] = useState(1);
  //Transpose Encryption
  const [shift, setShift] = useState(3);
  return (
    <>
      <EncryptionToolBar
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <EncryptionField
        isAnimated={animation !== null}
        message={message}
        setMessage={setMessage}
        messageCharacter={messageCharacter}
        setMessageCharacter={setMessageCharacter}
        processedCharacter={processedCharacter}
        setProcessedCharacter={setProcessedCharacter}
        result={result}
        setResult={setResult}
        algoID={algoID}
        setAlgoID={setAlgoID}
        position={position}
        setPosition={setPosition}
        transposeHeight={transposeHeight}
        settransposeHeight={setTransposeHeight}
        transposeLength={transposeLength}
        settransposeLength={setTransposeLength}
        shift={shift}
        setShift={setShift}
        setContent={props.setContent}
      />
    </>
  );
}
