import { useState } from "react";
import EncryptionField from "./EncryptionField";
import EncryptionToolBar from "./EncryptionToolBar";

/**
 * Creates a 2d Array to place characters of a string into
 * @param {String} msg The message to be encrypted
 * @param {Number} h The number of rows to place it in
 * @param {Boolean} empty make an empty box
 * @returns {Number[][]} The transpose box
 */
const makeTransposeBox = (msg, h) => {
  const l = Math.ceil(msg.length / h);
  return Array.from({ length: l }, (_) =>
    Array.from({ length: h }, (_) => " ")
  );
};

export default function Encryption(props) {
  const [message, setMessage] = useState("Hello World");
  const [messageCharacter, setMessageCharacter] = useState("");
  const [processedCharacter, setProcessedCharacter] = useState("");
  const [result, setResult] = useState("");
  const [algoID, setAlgoID] = useState(1);
  const [position, setPosition] = useState(-1);
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [animation, setAnimation] = useState(null);
  //Transpose Encryption
  const [transposeHeight, setTransposeHeight] = useState(1);
  const [transposeBox, setTransposeBox] = useState(() =>
    makeTransposeBox(message, transposeHeight)
  );
  //Shift Encryption
  const [shift, setShift] = useState(3);

  const reset = () => {
    setMessageCharacter("");
    setProcessedCharacter("");
    setResult("");
    setPosition(-1);
    setTransposeHeight(1);
    setTransposeBox(() => makeTransposeBox(message, 1));
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
        makeTransposeBox={makeTransposeBox}
        message={message}
        messageCharacter={messageCharacter}
        position={position}
        processedCharacter={processedCharacter}
        reset={reset}
        result={result}
        shift={shift}
        transposeBox={transposeBox}
        transposeHeight={transposeHeight}
        setAlgoID={setAlgoID}
        setAnimation={setAnimation}
        setContent={props.setContent}
        setMessage={setMessage}
        setMessageCharacter={setMessageCharacter}
        setPosition={setPosition}
        setProcessedCharacter={setProcessedCharacter}
        setResult={setResult}
        setShift={setShift}
        setTransposeBox={setTransposeBox}
        setTransposeHeight={setTransposeHeight}
      />
    </>
  );
}
