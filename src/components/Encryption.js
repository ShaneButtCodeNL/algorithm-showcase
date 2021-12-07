import { useState } from "react";
import EncryptionField from "./EncryptionField";
import EncryptionToolBar from "./EncryptionToolBar";

export default function Encryption(props) {
  const [message, setMessage] = useState("TEST DATA");
  const [result, setResult] = useState("");
  const [algoID, setAlgoID] = useState(1);
  const [position, setPosition] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [animation, setAnimation] = useState(null);
  //Shift Encryption
  const [shiftLength, setShiftLength] = useState(1);
  const [shiftHeight, setShiftHeight] = useState(1);
  //Transpose Encryption
  const [transpose, setTranspose] = useState(0);
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
        result={result}
        setResult={setResult}
        algoID={algoID}
        setAlgoID={setAlgoID}
        position={position}
        setPosition={setPosition}
        shiftHeight={shiftHeight}
        setShiftHeight={setShiftHeight}
        shiftLength={shiftLength}
        setShiftLength={setShiftLength}
        transpose={transpose}
        setTranspose={setTranspose}
        setContent={props.setContent}
      />
    </>
  );
}
