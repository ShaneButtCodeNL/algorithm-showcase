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
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [animation, setAnimation] = useState(null);
  //Shift Encryption
  const [transposeLength, setTransposeLength] = useState(1);
  const [transposeHeight, setTransposeHeight] = useState(1);
  //Transpose Encryption
  const [shift, setShift] = useState(3);

  const reset = () => {
    setMessageCharacter("");
    setProcessedCharacter("");
    setResult("");
    setPosition(-1);
  };
  return (
    <>
      <EncryptionToolBar
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <EncryptionField
        algoID={algoID}
        animation={animation}
        animationSpeed={animationSpeed}
        isAnimated={animation !== null}
        message={message}
        messageCharacter={messageCharacter}
        position={position}
        processedCharacter={processedCharacter}
        reset={reset}
        result={result}
        shift={shift}
        transposeHeight={transposeHeight}
        transposeLength={transposeLength}
        setAlgoID={setAlgoID}
        setAnimation={setAnimation}
        setContent={props.setContent}
        setMessage={setMessage}
        setMessageCharacter={setMessageCharacter}
        setPosition={setPosition}
        setProcessedCharacter={setProcessedCharacter}
        setResult={setResult}
        setShift={setShift}
        setTransposeHeight={setTransposeHeight}
        setTransposeLength={setTransposeLength}
      />
    </>
  );
}
